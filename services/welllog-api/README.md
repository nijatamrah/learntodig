# WellLog API (FastAPI)

LAS upload, zone classification, and Groq-powered analysis for the LearntoDig well-log module.

## Setup

```bash
cd services/welllog-api
python -m venv .venv
# Windows: .venv\Scripts\activate
# macOS/Linux: source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
# Edit .env and set GROQ_API_KEY
```

## Run

```bash
uvicorn main:app --reload --port 8000
```

Health check: http://localhost:8000/health
