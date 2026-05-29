import os
import io
import json
import lasio
import numpy as np
from dotenv import load_dotenv
from groq import Groq
from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel
import psycopg2
from psycopg2.extras import RealDictCursor

load_dotenv()

groq_client = Groq(api_key=os.environ["GROQ_API_KEY"])
MODEL = "llama-3.3-70b-versatile"

app = FastAPI(title="WellLogAI")

ALLOWED_ORIGINS = os.environ.get(
    "ALLOWED_ORIGINS",
    "http://localhost:3000,http://localhost:5173",
).split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_methods=["*"],
    allow_headers=["*"],
)


def get_db():
    db_url = os.environ.get("DATABASE_URL")
    if not db_url:
        return None
    conn = psycopg2.connect(db_url, cursor_factory=RealDictCursor)
    return conn


def init_db():
    conn = get_db()
    if conn is None:
        return
    with conn.cursor() as cur:
        cur.execute("""
            CREATE TABLE IF NOT EXISTS analyses (
                id SERIAL PRIMARY KEY,
                well_name TEXT,
                field_name TEXT,
                filename TEXT,
                ai_summary TEXT,
                curve_names TEXT[],
                zones_count JSONB,
                depth_min FLOAT,
                depth_max FLOAT,
                created_at TIMESTAMP DEFAULT NOW()
            )
        """)
    conn.commit()
    conn.close()


@app.on_event("startup")
def startup():
    init_db()


class QuestionRequest(BaseModel):
    question: str
    depth: float | None = None
    log_data: dict


def classify_zone(gr, resd):
    if gr is None or resd is None:
        return "unknown"
    if gr > 80:
        return "shale"
    if resd > 200:
        return "oil"
    if resd > 50:
        return "gas"
    return "water"


def parse_las(content: bytes) -> dict:
    las = lasio.read(io.StringIO(content.decode("utf-8", errors="replace")))

    curves = {}
    for curve in las.curves:
        name = curve.mnemonic.strip()
        data = las[name].tolist()
        curves[name] = [None if (v is not None and not np.isfinite(v)) else v for v in data]

    depth_key = next((k for k in curves if k.upper() in ("DEPT", "DEPTH", "MD")), None)
    if depth_key is None:
        raise ValueError("LAS faylında dərinlik (DEPT) sütunu tapılmadı")

    depths = curves[depth_key]
    gr_key = next((k for k in curves if k.upper() in ("GR", "GR_EDIT")), None)
    resd_key = next(
        (k for k in curves if k.upper() in ("RESD", "RT", "ILD", "RD", "RESISTIVITY")),
        None,
    )

    zones = [
        classify_zone(
            curves[gr_key][i] if gr_key else None,
            curves[resd_key][i] if resd_key else None,
        )
        for i in range(len(depths))
    ]

    well_info = {
        "well": getattr(getattr(las.well, "WELL", None), "value", "Unknown"),
        "field": getattr(getattr(las.well, "FLD", None), "value", ""),
        "company": getattr(getattr(las.well, "COMP", None), "value", ""),
    }

    return {
        "well_info": well_info,
        "depth_key": depth_key,
        "curves": curves,
        "zones": zones,
        "curve_names": [c for c in curves if c != depth_key],
    }


def ai_chat(prompt: str) -> str:
    response = groq_client.chat.completions.create(
        model=MODEL,
        messages=[{"role": "user", "content": prompt}],
        max_tokens=800,
    )
    return response.choices[0].message.content


def save_analysis(filename: str, data: dict, ai_summary: str):
    conn = get_db()
    if conn is None:
        return
    try:
        depths = data["curves"][data["depth_key"]]
        valid_depths = [d for d in depths if d is not None]
        zones_count: dict = {}
        for z in data["zones"]:
            zones_count[z] = zones_count.get(z, 0) + 1

        with conn.cursor() as cur:
            cur.execute("""
                INSERT INTO analyses (well_name, field_name, filename, ai_summary, curve_names, zones_count, depth_min, depth_max)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
            """, (
                data["well_info"].get("well", "Unknown"),
                data["well_info"].get("field", ""),
                filename,
                ai_summary,
                data["curve_names"],
                json.dumps(zones_count),
                min(valid_depths) if valid_depths else None,
                max(valid_depths) if valid_depths else None,
            ))
        conn.commit()
    finally:
        conn.close()


@app.post("/upload")
async def upload_las(file: UploadFile = File(...)):
    if not file.filename or not file.filename.lower().endswith(".las"):
        raise HTTPException(status_code=400, detail="Yalnız .las faylı qəbul edilir")

    content = await file.read()
    try:
        data = parse_las(content)
    except Exception as e:
        raise HTTPException(status_code=422, detail=f"LAS parse xətası: {str(e)}")

    zones_count: dict = {}
    for z in data["zones"]:
        zones_count[z] = zones_count.get(z, 0) + 1

    curves = data["curves"]
    depth_key = data["depth_key"]
    depths = curves[depth_key]
    keys = [depth_key] + data["curve_names"][:4]
    n = len(depths)
    indices = list(range(0, n, max(1, n // 60)))[:60]
    header = "  ".join(keys)
    rows = [
        "  ".join(
            f"{curves[k][i]:.1f}" if curves[k][i] is not None else "N/A"
            for k in keys
        )
        for i in indices
    ]
    table = header + "\n" + "\n".join(rows)

    prompt = f"""Sən neft-qaz geofiziki loq analiticisən. Aşağıdakı quyu loq datasını analiz et.

Quyu məlumatı: {json.dumps(data['well_info'], ensure_ascii=False)}
Zona paylanması: {json.dumps(zones_count, ensure_ascii=False)}

Loq datası (seçmə nümunə):
{table}

Azərbaycan dilində 5-8 cümlə ilə proaktiv xülasə ver:
1. Əsas litologiya intervalları (şal, qum, karbonatlı və s.)
2. Potensial neft/qaz/su zonaları (konkret dərinlik aralıqları)
3. Ən maraqlı interval hansıdır və niyə
4. Ümumi qiymətləndirmə

Tələbəyə sadə, aydın dillə izah et."""

    ai_summary = ai_chat(prompt)
    data["ai_summary"] = ai_summary

    save_analysis(file.filename, data, ai_summary)

    return JSONResponse(content=data)


@app.post("/ask")
async def ask_question(req: QuestionRequest):
    curves = req.log_data.get("curves", {})
    depth_key = req.log_data.get("depth_key", "DEPT")
    depths = curves.get(depth_key, [])

    depth_context = ""
    if req.depth is not None and depths:
        diffs = [abs((d or 0) - req.depth) for d in depths]
        idx = diffs.index(min(diffs))
        values = {k: round(curves[k][idx], 2) for k in curves if curves[k][idx] is not None}
        depth_context = f"\nSeçilmiş dərinlik {req.depth} ft üçün dəyərlər: {json.dumps(values, ensure_ascii=False)}"

    prompt = f"""Sən neft-qaz geofiziki loq analiticisən. Tələbənin sualına Azərbaycan dilində cavab ver.

Quyu məlumatı: {json.dumps(req.log_data.get('well_info', {}), ensure_ascii=False)}
{depth_context}

Tələbənin sualı: {req.question}

Sadə, aydın dillə 3-6 cümlə ilə cavab ver. Texniki terminləri izah et."""

    return {"answer": ai_chat(prompt)}


@app.get("/history")
def get_history():
    conn = get_db()
    if conn is None:
        return []
    try:
        with conn.cursor() as cur:
            cur.execute("""
                SELECT id, well_name, field_name, filename, zones_count, depth_min, depth_max, created_at
                FROM analyses ORDER BY created_at DESC LIMIT 20
            """)
            rows = cur.fetchall()
        return [dict(r) for r in rows]
    finally:
        conn.close()


@app.get("/health")
def health():
    return {"status": "ok"}
