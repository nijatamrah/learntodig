'use client';

import { useState } from 'react';
import Link from 'next/link';

const drillingConcepts = [
  {
    id: 'bit',
    name: 'Qazma Biti',
    color: '#F59E0B',
    icon: '⚙️',
    desc: 'Bit quyunun dibini qazıyan alətdir. Süxurun növündən asılı olaraq fərqli bit növləri seçilir.',
    detail: 'PDC bit: yumşaq-orta süxurlar üçün, sürətli qazma. Roller cone bit: sərt süxurlar üçün. Diamond bit: çox sərt formasyonlar üçün. Bit seçimi qazma xərclərini 30-40% azalda bilər.',
  },
  {
    id: 'mud',
    name: 'Qazma Məhlulu (Mud)',
    color: '#10B981',
    icon: '🟢',
    desc: 'Qazma məhlulu kəsilmiş süxurları səthi qaldırır, quyunu soyudur və təzyiqi tənzimləyir.',
    detail: 'Su əsaslı, yağ əsaslı və sintетik məhlullar var. Sıxlıq (ppg), viskozitet və filtrасiya xüsusiyyətləri mühümdür. Düzgün məhlul olmadan quyu çökə bilər.',
  },
  {
    id: 'bha',
    name: 'BHA (Bottom Hole Assembly)',
    color: '#8B5CF6',
    icon: '🔧',
    desc: 'BHA qazma kəmərinin alt hissəsidir. Bit, stabilizator, MWD/LWD alətləri daxildir.',
    detail: 'MWD (Measurement While Drilling) qazma zamanı istiqaməti ölçür. LWD (Logging While Drilling) loq datası toplayır. Directional drilling üçün motor da BHA-ya əlavə edilir.',
  },
  {
    id: 'casing',
    name: 'Casing Proqramı',
    color: '#EF4444',
    icon: '🏗️',
    desc: 'Casing quyunu möhkəmləndirir və müxtəlif təzyiqli zonalar arasında izolyasiya yaradır.',
    detail: 'Conductor casing: 30-100 fut. Surface casing: 300-2000 fut. Intermediate casing: problem zonalarını bağlayır. Production casing: son hədəf dərinliyinə qədər.',
  },
];

const drillingProblems = [
  {
    id: 'stuck',
    name: 'Stuck Pipe',
    severity: 'Kritik',
    color: '#EF4444',
    desc: 'Qazma kəməri quyuda ilişib qalır. Ən bahalı qazma problemlərindən biridir.',
    solution: '1. Dərhal əməliyyatı dayandır. 2. Yağ bazlı pill vur. 3. Jarring əməliyyatı həyata keçir. 4. Backoff əməliyyatını planlaşdır. Profilaktika: Düzgün mud çəkisi, müntəzəm quyuyu süpür.',
  },
  {
    id: 'lost',
    name: 'Lost Circulation',
    severity: 'Ciddi',
    color: '#F59E0B',
    desc: 'Qazma məhlulu formasiyaya axır, dövriyyə itirilir.',
    solution: '1. Məhlul axınını azalt. 2. LCM (Lost Circulation Material) vur. 3. Cement squeeze et. 4. Quyunu möhkəmləndir. Profilaktika: Məhlul sıxlığını düzgün tənzimlə.',
  },
  {
    id: 'kick',
    name: 'Kick / Blow-out',
    severity: 'Təcili',
    color: '#DC2626',
    desc: 'Formasiya mayesi quyuya axır. Ən təhlükəli vəziyyətdir.',
    solution: '1. DƏRHAL BOP-u bağla. 2. Kill sheet hazırla. 3. Well kill əməliyyatını başlat. 4. Driller\'s method və ya Wait & Weight method istifadə et. Profilaktika: Mud çəkisini formаsiya təzyiqindən 0.2-0.5 ppg yüksək saxla.',
  },
  {
    id: 'washout',
    name: 'Bit Washout',
    severity: 'Orta',
    color: '#6B7280',
    desc: 'Bit nozulları aşınır, qazma sürəti azalır.',
    solution: '1. Pump təzyiqini izlə — düşüş washout işarəsidir. 2. Biti dəyişmək üçün POOH et. 3. Yeni bit seç. Profilaktika: Düzgün nozul ölçüsü seç, hidravlika optimizasiya et.',
  },
];

const quizQuestions = [
  {
    q: 'PDC bit hansı süxurlar üçün uyğundur?',
    options: ['Çox sərt qranitlər üçün', 'Yumşaq-orta süxurlar üçün', 'Yalnız duz üçün', 'Karbonatlar üçün'],
    correct: 1,
  },
  {
    q: 'Qazma məhlulunun əsas funksiyası nədir?',
    options: ['Neft çıxarmaq', 'Süxur kəsintilərini qaldırmaq, soyutmaq və təzyiqi tənzimləmək', 'Quyunu sementləmək', 'Bit seçmək'],
    correct: 1,
  },
  {
    q: 'Kick nədir?',
    options: ['Qazma sürətinin artması', 'Formasiya mayesinin quyuya axması', 'Bit dəyişilməsi', 'Casing yeridilməsi'],
    correct: 1,
  },
  {
    q: 'ROP nəyi ifadə edir?',
    options: ['Rezervuar Optimal Parametri', 'Rate of Penetration — qazma sürəti', 'Rotasiya sürəti', 'Məhlul sıxlığı'],
    correct: 1,
  },
  {
    q: 'BHA-da MWD nə üçün istifadə edilir?',
    options: ['Bit seçmək üçün', 'Qazma zamanı istiqaməti ölçmək üçün', 'Sement vurmaq üçün', 'Qazma məhlulunu hazırlamaq üçün'],
    correct: 1,
  },
];

function calcROP(wob: number, rpm: number, mudWeight: number, bitSize: number) {
  const base = (wob * rpm * 0.8) / (mudWeight * bitSize * 0.1);
  return Math.min(Math.round(base * 10) / 10, 150);
}

export default function DrillingPage() {
  const [activeConcept, setActiveConcept] = useState<string | null>(null);
  const [activeProblem, setActiveProblem] = useState<string | null>(null);
  const [activeLesson, setActiveLesson] = useState(0);
  const [wob, setWob] = useState(20);
  const [rpm, setRpm] = useState(120);
  const [mudWeight, setMudWeight] = useState(10);
  const [bitSize, setBitSize] = useState(12);
  const [depth, setDepth] = useState(0);
  const [drilling, setDrilling] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState<(number | null)[]>(Array(5).fill(null));
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [chatMessages, setChatMessages] = useState<{ role: string; content: string }[]>([]);
  const [chatInput, setChatInput] = useState('');
  const [chatLoading, setChatLoading] = useState(false);

  const rop = calcROP(wob, rpm, mudWeight, bitSize);
  const score = quizAnswers.filter((a, i) => a === quizQuestions[i].correct).length;
  const selectedProblem = drillingProblems.find(p => p.id === activeProblem);

  const startDrilling = () => {
    if (drilling) return;
    setDrilling(true);
    setDepth(0);
    const interval = setInterval(() => {
      setDepth(prev => {
        if (prev >= 3000) { clearInterval(interval); setDrilling(false); return 3000; }
        return prev + Math.round(rop / 10);
      });
    }, 100);
  };

  const handleQuizAnswer = (qIndex: number, aIndex: number) => {
    if (quizSubmitted) return;
    const newAnswers = [...quizAnswers];
    newAnswers[qIndex] = aIndex;
    setQuizAnswers(newAnswers);
  };

  const sendChat = async () => {
    if (!chatInput.trim()) return;
    const userMsg = chatInput.trim();
    setChatInput('');
    setChatMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setChatLoading(true);
    try {
      const res = await fetch('/api/drilling/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg }),
      });
      const data = await res.json();
      setChatMessages(prev => [...prev, { role: 'assistant', content: data.reply }]);
    } catch {
      setChatMessages(prev => [...prev, { role: 'assistant', content: 'Xəta baş verdi.' }]);
    }
    setChatLoading(false);
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0f1117', color: '#e2e8f0', fontFamily: 'sans-serif' }}>
      <div style={{ background: '#1a1d2e', borderBottom: '1px solid #2d3748', padding: '12px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontSize: 20 }}>🔩</span>
          <span style={{ fontWeight: 700, color: '#fbbf24', fontSize: 18 }}>DrillSim</span>
          <span style={{ color: '#718096', fontSize: 14 }}>Qazma mühəndisliyi · AI ilə gücləndirilmiş</span>
        </div>
        <Link href="/" style={{ color: '#a0aec0', textDecoration: 'none', fontSize: 14 }}>← LearntoDig</Link>
      </div>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '32px 16px' }}>
        <h1 style={{ fontSize: 28, fontWeight: 700, color: '#fbbf24', marginBottom: 8 }}>Drilling — Qazma Mühəndisliyi</h1>
        <p style={{ color: '#718096', marginBottom: 32 }}>3 interaktiv dərs · ROP simulyatoru · Problem ssenarileri · AI chat · Quiz</p>

        <div style={{ display: 'flex', gap: 8, marginBottom: 32, flexWrap: 'wrap' }}>
          {['Qazma əsasları', 'ROP Simulyatoru', 'Problem Ssenarileri'].map((tab, i) => (
            <button key={i} onClick={() => setActiveLesson(i)} style={{ padding: '10px 20px', borderRadius: 8, border: 'none', cursor: 'pointer', background: activeLesson === i ? '#fbbf24' : '#1a1d2e', color: activeLesson === i ? '#0f1117' : '#a0aec0', fontWeight: activeLesson === i ? 700 : 400, fontSize: 14 }}>
              {tab}
            </button>
          ))}
        </div>

        {/* Lesson 1 */}
        {activeLesson === 0 && (
          <div>
            <h2 style={{ color: '#e2e8f0', fontSize: 20, marginBottom: 16 }}>Qazma əsasları</h2>
            <div style={{ background: '#1a1d2e', borderRadius: 12, padding: 20, marginBottom: 24 }}>
              <p style={{ color: '#a0aec0', lineHeight: 1.8 }}>
                Qazma prosesi neft-qaz quyusunun yeraltı hədəf intervalına çatmaq üçün aparılır. <strong style={{ color: '#fbbf24' }}>Azərbaycanda</strong> Xəzər dənizindəki platformalar (Günəşli, Azəri, Çıraq) ən mürəkkəb qazma şəraitlərindən biridir — dəniz dibi 200-500 m dərinlikdə, hədəf 5000-7000 m dərinlikdədir.
              </p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
              {drillingConcepts.map((concept) => (
                <div key={concept.id} onClick={() => setActiveConcept(activeConcept === concept.id ? null : concept.id)} style={{ background: activeConcept === concept.id ? '#1a2744' : '#1a1d2e', border: `2px solid ${activeConcept === concept.id ? concept.color : '#2d3748'}`, borderRadius: 12, padding: 20, cursor: 'pointer' }}>
                  <div style={{ fontSize: 28, marginBottom: 8 }}>{concept.icon}</div>
                  <div style={{ fontWeight: 600, color: concept.color, fontSize: 15, marginBottom: 6 }}>{concept.name}</div>
                  <p style={{ color: '#718096', fontSize: 13, lineHeight: 1.6 }}>{concept.desc}</p>
                  {activeConcept === concept.id && (
                    <div style={{ marginTop: 12, background: '#0f1117', borderRadius: 8, padding: 12, border: `1px solid ${concept.color}` }}>
                      <p style={{ color: '#a0aec0', fontSize: 13, lineHeight: 1.6 }}>{concept.detail}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Lesson 2 - ROP Simulator */}
        {activeLesson === 1 && (
          <div>
            <h2 style={{ color: '#e2e8f0', fontSize: 20, marginBottom: 8 }}>ROP Simulyatoru</h2>
            <p style={{ color: '#a0aec0', marginBottom: 24 }}>Parametrləri dəyişdir, qazma sürətini optimallaşdır, virtual qazmanı başlat.</p>
            <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: 24 }}>
              <div style={{ background: '#1a1d2e', borderRadius: 12, padding: 24 }}>
                <h3 style={{ color: '#fbbf24', fontSize: 15, marginBottom: 20 }}>Qazma parametrləri</h3>
                <div style={{ marginBottom: 20 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                    <span style={{ color: '#a0aec0', fontSize: 13 }}>WOB — Bit yükü (klb)</span>
                    <span style={{ color: '#fbbf24', fontWeight: 700 }}>{wob} klb</span>
                  </div>
                  <input type="range" min={5} max={50} value={wob} onChange={e => setWob(+e.target.value)} style={{ width: '100%' }} />
                </div>
                <div style={{ marginBottom: 20 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                    <span style={{ color: '#a0aec0', fontSize: 13 }}>RPM — Fırlanma sürəti</span>
                    <span style={{ color: '#10b981', fontWeight: 700 }}>{rpm} RPM</span>
                  </div>
                  <input type="range" min={40} max={250} value={rpm} onChange={e => setRpm(+e.target.value)} style={{ width: '100%' }} />
                </div>
                <div style={{ marginBottom: 20 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                    <span style={{ color: '#a0aec0', fontSize: 13 }}>Mud çəkisi (ppg)</span>
                    <span style={{ color: '#8b5cf6', fontWeight: 700 }}>{mudWeight} ppg</span>
                  </div>
                  <input type="range" min={8} max={18} step={0.1} value={mudWeight} onChange={e => setMudWeight(+e.target.value)} style={{ width: '100%' }} />
                </div>
                <div style={{ marginBottom: 24 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                    <span style={{ color: '#a0aec0', fontSize: 13 }}>Bit ölçüsü (inch)</span>
                    <span style={{ color: '#ef4444', fontWeight: 700 }}>{bitSize}&quot;</span>
                  </div>
                  <input type="range" min={6} max={26} step={0.5} value={bitSize} onChange={e => setBitSize(+e.target.value)} style={{ width: '100%' }} />
                </div>
                <div style={{ background: '#0f1117', borderRadius: 8, padding: 16, textAlign: 'center', marginBottom: 16 }}>
                  <div style={{ fontSize: 12, color: '#718096', marginBottom: 4 }}>Hesablanmış ROP</div>
                  <div style={{ fontSize: 32, fontWeight: 700, color: rop > 80 ? '#10b981' : rop > 40 ? '#fbbf24' : '#ef4444' }}>{rop}</div>
                  <div style={{ fontSize: 13, color: '#718096' }}>fut/saat</div>
                </div>
                <button onClick={startDrilling} disabled={drilling} style={{ width: '100%', background: drilling ? '#374151' : '#fbbf24', color: '#0f1117', border: 'none', borderRadius: 8, padding: '12px', fontWeight: 700, cursor: drilling ? 'not-allowed' : 'pointer', fontSize: 15 }}>
                  {drilling ? '⏳ Qazılır...' : '🔩 Virtual qazmaya başla'}
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div style={{ background: '#1a1d2e', borderRadius: 12, padding: 20 }}>
                  <h3 style={{ color: '#a0aec0', fontSize: 14, marginBottom: 16 }}>Virtual quyu dərinliyi</h3>
                  <div style={{ position: 'relative', background: '#0f1117', borderRadius: 8, height: 200, overflow: 'hidden' }}>
                    <div style={{ position: 'absolute', left: '50%', top: 0, transform: 'translateX(-50%)', width: 20, background: '#374151', height: `${(depth / 3000) * 100}%`, transition: 'height 0.1s', borderRadius: '0 0 4px 4px' }} />
                    <div style={{ position: 'absolute', bottom: 8, left: 0, right: 0, textAlign: 'center', color: '#fbbf24', fontWeight: 700, fontSize: 18 }}>{depth} ft</div>
                    <div style={{ position: 'absolute', top: 8, left: 0, right: 0, textAlign: 'center', color: '#718096', fontSize: 12 }}>Hədəf: 3000 ft</div>
                  </div>
                  <div style={{ marginTop: 12, display: 'flex', gap: 8 }}>
                    <div style={{ flex: 1, background: '#0f1117', borderRadius: 8, padding: 12, textAlign: 'center' }}>
                      <div style={{ fontSize: 11, color: '#718096' }}>Tamamlanma</div>
                      <div style={{ fontSize: 18, fontWeight: 700, color: '#10b981' }}>{Math.round((depth / 3000) * 100)}%</div>
                    </div>
                    <div style={{ flex: 1, background: '#0f1117', borderRadius: 8, padding: 12, textAlign: 'center' }}>
                      <div style={{ fontSize: 11, color: '#718096' }}>Təxmini vaxt</div>
                      <div style={{ fontSize: 18, fontWeight: 700, color: '#fbbf24' }}>{Math.round(3000 / rop)} saat</div>
                    </div>
                  </div>
                </div>

                <div style={{ background: '#1a1d2e', borderRadius: 12, padding: 20 }}>
                  <h3 style={{ color: '#a0aec0', fontSize: 14, marginBottom: 12 }}>Parametr qiymətləndirməsi</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    <div style={{ background: '#0f1117', borderRadius: 8, padding: 10, fontSize: 13, color: wob > 40 ? '#ef4444' : wob > 20 ? '#10b981' : '#fbbf24' }}>
                      {wob > 40 ? '⚠️ WOB çox yüksəkdir — bit zədələnə bilər' : wob > 20 ? '✅ WOB optimal aralıqdadır' : '⬆️ WOB artırılması ROP-u yüksəldər'}
                    </div>
                    <div style={{ background: '#0f1117', borderRadius: 8, padding: 10, fontSize: 13, color: rpm > 200 ? '#ef4444' : rpm > 100 ? '#10b981' : '#fbbf24' }}>
                      {rpm > 200 ? '⚠️ RPM çox yüksəkdir — BHA vibrasiyası riski' : rpm > 100 ? '✅ RPM optimal aralıqdadır' : '⬆️ RPM artırılması ROP-u yüksəldər'}
                    </div>
                    <div style={{ background: '#0f1117', borderRadius: 8, padding: 10, fontSize: 13, color: mudWeight > 15 ? '#ef4444' : mudWeight > 10 ? '#10b981' : '#fbbf24' }}>
                      {mudWeight > 15 ? '⚠️ Mud çəkisi yüksəkdir — ROP azalır' : mudWeight > 10 ? '✅ Mud çəkisi balanslaşdırılmışdır' : '⚠️ Mud çəkisi aşağıdır — kick riski'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Lesson 3 - Problems */}
        {activeLesson === 2 && (
          <div>
            <h2 style={{ color: '#e2e8f0', fontSize: 20, marginBottom: 8 }}>Qazma problemləri və həlləri</h2>
            <p style={{ color: '#a0aec0', marginBottom: 24 }}>Real qazmada qarşılaşılan problemlər və onların həlli yolları. Hər problemi klik et.</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16, marginBottom: 24 }}>
              {drillingProblems.map((problem) => (
                <div key={problem.id} onClick={() => setActiveProblem(activeProblem === problem.id ? null : problem.id)} style={{ background: activeProblem === problem.id ? '#1a2744' : '#1a1d2e', border: `2px solid ${activeProblem === problem.id ? problem.color : '#2d3748'}`, borderRadius: 12, padding: 20, cursor: 'pointer' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                    <span style={{ fontWeight: 700, color: problem.color, fontSize: 15 }}>{problem.name}</span>
                    <span style={{ fontSize: 11, padding: '2px 8px', borderRadius: 10, background: problem.color + '33', color: problem.color }}>{problem.severity}</span>
                  </div>
                  <p style={{ color: '#718096', fontSize: 13, lineHeight: 1.6 }}>{problem.desc}</p>
                </div>
              ))}
            </div>
            {selectedProblem && (
              <div style={{ background: '#1a1d2e', border: `1px solid ${selectedProblem.color}`, borderRadius: 12, padding: 24 }}>
                <h3 style={{ color: selectedProblem.color, marginBottom: 16, fontSize: 18 }}>🛠️ {selectedProblem.name} — Həll yolu</h3>
                <div style={{ background: '#0f1117', borderRadius: 8, padding: 16 }}>
                  {selectedProblem.solution.split('\n').map((line, i) => (
                    <p key={i} style={{ color: '#a0aec0', fontSize: 14, lineHeight: 1.8, marginBottom: 4 }}>{line}</p>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Quiz */}
        <div style={{ marginTop: 48, background: '#1a1d2e', borderRadius: 12, padding: 24 }}>
          <h2 style={{ color: '#f6c90e', fontSize: 20, marginBottom: 20 }}>Quiz — Bilikləri yoxla</h2>
          {quizQuestions.map((q, qi) => (
            <div key={qi} style={{ marginBottom: 24 }}>
              <p style={{ color: '#e2e8f0', fontWeight: 600, marginBottom: 12 }}>{qi + 1}. {q.q}</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {q.options.map((opt, oi) => {
                  let bg = '#0f1117', border = '#2d3748';
                  if (quizAnswers[qi] === oi) { bg = '#1a2744'; border = '#fbbf24'; }
                  if (quizSubmitted && oi === q.correct) { bg = '#064e3b'; border = '#10b981'; }
                  if (quizSubmitted && quizAnswers[qi] === oi && oi !== q.correct) { bg = '#450a0a'; border = '#ef4444'; }
                  return (
                    <div key={oi} onClick={() => handleQuizAnswer(qi, oi)} style={{ background: bg, border: `1px solid ${border}`, borderRadius: 8, padding: '10px 16px', cursor: 'pointer', color: '#e2e8f0', fontSize: 14 }}>
                      {opt}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
          {!quizSubmitted ? (
            <button onClick={() => setQuizSubmitted(true)} style={{ background: '#fbbf24', color: '#0f1117', border: 'none', borderRadius: 8, padding: '12px 32px', fontWeight: 700, cursor: 'pointer', fontSize: 16 }}>Yoxla</button>
          ) : (
            <div style={{ background: score >= 4 ? '#064e3b' : '#450a0a', borderRadius: 8, padding: 16, color: score >= 4 ? '#68d391' : '#ef4444', fontWeight: 700, fontSize: 18 }}>
              Nəticə: {score}/5 — {score >= 4 ? 'Əla! Davam et.' : 'Dərslərə qayıt və yenidən cəhd et.'}
            </div>
          )}
        </div>

        {/* AI Chat */}
        <div style={{ marginTop: 32, background: '#1a1d2e', borderRadius: 12, padding: 24 }}>
          <h2 style={{ color: '#fbbf24', fontSize: 18, marginBottom: 8 }}>AI Qazma Assistenti</h2>
          <p style={{ color: '#718096', fontSize: 13, marginBottom: 16 }}>Qazma mühəndisliyi haqqında sual ver — Azərbaycan dilində cavab alacaqsan.</p>
          <div style={{ minHeight: 100, marginBottom: 16 }}>
            {chatMessages.map((msg, i) => (
              <div key={i} style={{ marginBottom: 12, display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start' }}>
                <div style={{ maxWidth: '80%', padding: '10px 14px', borderRadius: 10, fontSize: 14, lineHeight: 1.6, background: msg.role === 'user' ? '#2b4c7e' : '#2d3748', color: '#e2e8f0' }}>
                  {msg.content}
                </div>
              </div>
            ))}
            {chatLoading && <div style={{ color: '#718096', fontSize: 14 }}>AI cavab hazırlayır...</div>}
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <input value={chatInput} onChange={e => setChatInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && sendChat()} placeholder="Məs: Stuck pipe nədir, necə həll edilir?" style={{ flex: 1, background: '#0f1117', border: '1px solid #2d3748', borderRadius: 8, padding: '10px 14px', color: '#e2e8f0', fontSize: 14 }} />
            <button onClick={sendChat} disabled={chatLoading} style={{ background: '#fbbf24', color: '#0f1117', border: 'none', borderRadius: 8, padding: '10px 20px', fontWeight: 700, cursor: 'pointer' }}>Göndər</button>
          </div>
        </div>
      </div>
    </div>
  );
}