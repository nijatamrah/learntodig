'use client';

import { useState } from 'react';
import Link from 'next/link';

const eclipseConcepts = [
  {
    id: 'simulation',
    name: 'Rezervuar Simulyasiyası',
    color: '#F97316',
    icon: '⚙️',
    desc: 'Eclipse rezervuarın gələcəkdəki davranışını simulyasiya edir. Neft, qaz və su hərəkəti modelləşdirilir.',
    detail: 'Eclipse BLACK OIL, COMPOSITIONAL və THERMAL simulyasiya rejimləri dəstəkləyir. Hər hüceyrə üçün təzyiq, temperatur və maye doyumluğu hesablanır.',
  },
  {
    id: 'forecast',
    name: 'Hasilat Proqnozu',
    color: '#10B981',
    icon: '📈',
    desc: 'Eclipse ilə quyunun 10-30 illik hasilat proqnozu qurulur. Bu məlumat investisiya qərarları üçün vacibdir.',
    detail: 'Hasilat proqnozu decline curve analysis, material balance və tam simulyasiya metodları ilə hazırlanır.',
  },
  {
    id: 'recovery',
    name: 'Hasilat Əmsalı (Recovery Factor)',
    color: '#8B5CF6',
    icon: '🛢️',
    desc: 'Rezervuardakı neftin neçə faizini çıxarmaq mümkündür. Tipik dəyər 20-60% arasındadır.',
    detail: 'Primary recovery (təzyiq enerjisi): 5-30%. Secondary recovery (su vurma): +10-20%. Tertiary (EOR): +5-15%.',
  },
  {
    id: 'pressure',
    name: 'Rezervuar Təzyiqi',
    color: '#EF4444',
    icon: '🔴',
    desc: 'Hasilat artdıqca rezervuar təzyiqi azalır. Eclipse bu düşüşü modelləşdirir.',
    detail: 'Təzyiq düşdükcə qaz çıxır (bubble point), hasilat azalır. Su vurma təzyiqi saxlayır.',
  },
];

const years = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

function generateProduction(wells: number, porosity: number, recovery: number) {
  const initial = wells * porosity * recovery * 10;
  return years.map((y) => ({
    year: y,
    oil: Math.round(initial * Math.exp(-0.18 * (y - 1))),
    water: Math.round(initial * 0.1 * (1 - Math.exp(-0.25 * (y - 1)))),
    pressure: Math.round(3000 - (y - 1) * 180),
  }));
}

const quizQuestions = [
  {
    q: 'Eclipse proqramı nə üçün istifadə edilir?',
    options: ['Quyu qazımaq üçün', 'Rezervuar simulyasiyası üçün', 'Neft satmaq üçün', 'Loq analizi üçün'],
    correct: 1,
  },
  {
    q: 'Hasilat əmsalı (Recovery Factor) nəyi göstərir?',
    options: ['Quyunun dərinliyini', 'Rezervuardakı neftin neçə faizini çıxarmaq olduğunu', 'Təzyiqi', 'Məsaməliliyi'],
    correct: 1,
  },
  {
    q: 'Hasilat artdıqca rezervuar təzyiqi nə olur?',
    options: ['Artır', 'Dəyişmir', 'Azalır', 'Sıfıra düşür'],
    correct: 2,
  },
  {
    q: 'Secondary recovery nədir?',
    options: ['İlkin hasilat', 'Su və ya qaz vurma ilə əlavə hasilat', 'Kimyəvi hasilat', 'Termal hasilat'],
    correct: 1,
  },
  {
    q: 'Tipik primary recovery əmsalı neçədir?',
    options: ['1-5%', '5-30%', '50-70%', '90-100%'],
    correct: 1,
  },
];

export default function EclipsePage() {
  const [activeConcept, setActiveConcept] = useState<string | null>(null);
  const [activeLesson, setActiveLesson] = useState(0);
  const [wells, setWells] = useState(3);
  const [porosity, setPorosity] = useState(25);
  const [recovery, setRecovery] = useState(35);
  const [scenario, setScenario] = useState<'base' | 'optimistic' | 'pessimistic'>('base');
  const [quizAnswers, setQuizAnswers] = useState<(number | null)[]>(Array(5).fill(null));
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [chatMessages, setChatMessages] = useState<{ role: string; content: string }[]>([]);
  const [chatInput, setChatInput] = useState('');
  const [chatLoading, setChatLoading] = useState(false);


  const score = quizAnswers.filter((a, i) => a === quizQuestions[i].correct).length;

  const baseData = generateProduction(wells, porosity, recovery);
  const optimisticData = generateProduction(wells + 2, porosity + 5, recovery + 10);
  const pessimisticData = generateProduction(wells - 1, porosity - 5, recovery - 10);

  const currentData = scenario === 'base' ? baseData : scenario === 'optimistic' ? optimisticData : pessimisticData;
  const totalOil = currentData.reduce((sum, d) => sum + d.oil, 0);
  const maxOil = Math.max(...currentData.map(d => d.oil));

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
    setChatMessages((prev) => [...prev, { role: 'user', content: userMsg }]);
    setChatLoading(true);
    try {
      const res = await fetch('/api/eclipse/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg }),
      });
      const data = await res.json();
      setChatMessages((prev) => [...prev, { role: 'assistant', content: data.reply }]);
    } catch {
      setChatMessages((prev) => [...prev, { role: 'assistant', content: 'Xəta baş verdi.' }]);
    }
    setChatLoading(false);
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0f1117', color: '#e2e8f0', fontFamily: 'sans-serif' }}>
      <div style={{ background: '#1a1d2e', borderBottom: '1px solid #2d3748', padding: '12px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontSize: 20 }}>⚡</span>
          <span style={{ fontWeight: 700, color: '#f97316', fontSize: 18 }}>EclipseSim</span>
          <span style={{ color: '#718096', fontSize: 14 }}>Rezervuar simulyasiyası · AI ilə gücləndirilmiş</span>
        </div>
        <Link href="/" style={{ color: '#a0aec0', textDecoration: 'none', fontSize: 14 }}>← LearntoDig</Link>
      </div>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '32px 16px' }}>
        <h1 style={{ fontSize: 28, fontWeight: 700, color: '#f97316', marginBottom: 8 }}>Eclipse — Rezervuar Simulyatoru</h1>
        <p style={{ color: '#718096', marginBottom: 32 }}>3 interaktiv dərs · Hasilat proqnozu · Ssenari müqayisəsi · AI chat · Quiz</p>

        <div style={{ display: 'flex', gap: 8, marginBottom: 32, flexWrap: 'wrap' }}>
          {['Eclipse əsasları', 'Hasilat Proqnozu', 'Ssenari Müqayisəsi'].map((tab, i) => (
            <button key={i} onClick={() => setActiveLesson(i)} style={{ padding: '10px 20px', borderRadius: 8, border: 'none', cursor: 'pointer', background: activeLesson === i ? '#f97316' : '#1a1d2e', color: activeLesson === i ? '#0f1117' : '#a0aec0', fontWeight: activeLesson === i ? 700 : 400, fontSize: 14 }}>
              {tab}
            </button>
          ))}
        </div>

        {/* Lesson 1 */}
        {activeLesson === 0 && (
          <div>
            <h2 style={{ color: '#e2e8f0', fontSize: 20, marginBottom: 16 }}>Eclipse nədir?</h2>
            <div style={{ background: '#1a1d2e', borderRadius: 12, padding: 20, marginBottom: 24 }}>
              <p style={{ color: '#a0aec0', lineHeight: 1.8 }}>
                Eclipse SLB-nin rezervuar simulyasiya proqramıdır. Petrel modeli qurur, <strong style={{ color: '#f97316' }}>Eclipse isə həmin modeli simulyasiya edir</strong> — neftin, qazın və suyun gələcəkdəki hərəkətini proqnozlaşdırır.
              </p>
              <p style={{ color: '#a0aec0', lineHeight: 1.8, marginTop: 12 }}>
                Lisenziyası <strong style={{ color: '#f97316' }}>$30,000-80,000/il</strong> xərcləyir. LearntoDig-də əsas konsepsiyaları pulsuz öyrənərsən.
              </p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
              {eclipseConcepts.map((concept) => (
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

        {/* Lesson 2 */}
        {activeLesson === 1 && (
          <div>
            <h2 style={{ color: '#e2e8f0', fontSize: 20, marginBottom: 8 }}>10 illik hasilat proqnozu</h2>
            <p style={{ color: '#a0aec0', marginBottom: 24 }}>Parametrləri dəyişdir — hasilat qrafiki real vaxtda yenilənir.</p>
            <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: 24 }}>
              <div style={{ background: '#1a1d2e', borderRadius: 12, padding: 20 }}>
                <div style={{ marginBottom: 20 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                    <span style={{ color: '#a0aec0', fontSize: 14 }}>Quyu sayı</span>
                    <span style={{ color: '#f97316', fontWeight: 700 }}>{wells}</span>
                  </div>
                  <input type="range" min={1} max={8} value={wells} onChange={(e) => setWells(+e.target.value)} style={{ width: '100%' }} />
                </div>
                <div style={{ marginBottom: 20 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                    <span style={{ color: '#a0aec0', fontSize: 14 }}>Məsaməlilik (%)</span>
                    <span style={{ color: '#10b981', fontWeight: 700 }}>{porosity}%</span>
                  </div>
                  <input type="range" min={5} max={40} value={porosity} onChange={(e) => setPorosity(+e.target.value)} style={{ width: '100%' }} />
                </div>
                <div style={{ marginBottom: 20 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                    <span style={{ color: '#a0aec0', fontSize: 14 }}>Recovery Factor (%)</span>
                    <span style={{ color: '#8b5cf6', fontWeight: 700 }}>{recovery}%</span>
                  </div>
                  <input type="range" min={10} max={60} value={recovery} onChange={(e) => setRecovery(+e.target.value)} style={{ width: '100%' }} />
                </div>
                <div style={{ background: '#0f1117', borderRadius: 8, padding: 12, textAlign: 'center' }}>
                  <div style={{ fontSize: 12, color: '#718096', marginBottom: 4 }}>10 illik toplam hasilat</div>
                  <div style={{ fontSize: 24, fontWeight: 700, color: '#f97316' }}>{totalOil.toLocaleString()} bbl</div>
                </div>
              </div>
              <div style={{ background: '#1a1d2e', borderRadius: 12, padding: 20 }}>
                <h3 style={{ color: '#a0aec0', fontSize: 14, marginBottom: 16 }}>İllik neft hasilatı (bbl/il)</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {baseData.map((d) => (
                    <div key={d.year} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <span style={{ color: '#718096', fontSize: 13, width: 40 }}>{d.year} il</span>
                      <div style={{ flex: 1, background: '#0f1117', borderRadius: 4, height: 24, position: 'relative' }}>
                        <div style={{ width: `${(d.oil / maxOil) * 100}%`, background: '#f97316', height: '100%', borderRadius: 4, transition: 'width 0.3s' }} />
                      </div>
                      <span style={{ color: '#f97316', fontSize: 13, width: 80, textAlign: 'right' }}>{d.oil.toLocaleString()}</span>
                      <span style={{ color: '#3b82f6', fontSize: 12, width: 60, textAlign: 'right' }}>{d.pressure} psi</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Lesson 3 */}
        {activeLesson === 2 && (
          <div>
            <h2 style={{ color: '#e2e8f0', fontSize: 20, marginBottom: 8 }}>Ssenari müqayisəsi</h2>
            <p style={{ color: '#a0aec0', marginBottom: 24 }}>Eclipse-də müxtəlif ssenarilər müqayisə edilir — optimist, baza və pessimist.</p>
            <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
              {(['base', 'optimistic', 'pessimistic'] as const).map((s) => (
                <button key={s} onClick={() => setScenario(s)} style={{ padding: '8px 16px', borderRadius: 8, border: 'none', cursor: 'pointer', background: scenario === s ? (s === 'optimistic' ? '#10b981' : s === 'pessimistic' ? '#ef4444' : '#f97316') : '#1a1d2e', color: scenario === s ? '#0f1117' : '#a0aec0', fontWeight: 600, fontSize: 13 }}>
                  {s === 'base' ? '📊 Baza' : s === 'optimistic' ? '📈 Optimist' : '📉 Pessimist'}
                </button>
              ))}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 24 }}>
              {[
                { label: 'Baza ssenari', data: baseData, color: '#f97316' },
                { label: 'Optimist', data: optimisticData, color: '#10b981' },
                { label: 'Pessimist', data: pessimisticData, color: '#ef4444' },
              ].map((s) => (
                <div key={s.label} style={{ background: '#1a1d2e', borderRadius: 12, padding: 16, border: scenario === (s.label === 'Baza ssenari' ? 'base' : s.label === 'Optimist' ? 'optimistic' : 'pessimistic') ? `2px solid ${s.color}` : '2px solid #2d3748' }}>
                  <div style={{ color: s.color, fontWeight: 700, marginBottom: 8 }}>{s.label}</div>
                  <div style={{ fontSize: 24, fontWeight: 700, color: '#e2e8f0' }}>{s.data.reduce((sum, d) => sum + d.oil, 0).toLocaleString()}</div>
                  <div style={{ fontSize: 12, color: '#718096' }}>bbl / 10 il</div>
                </div>
              ))}
            </div>
            <div style={{ background: '#1a1d2e', borderRadius: 12, padding: 20 }}>
              <h3 style={{ color: '#a0aec0', fontSize: 14, marginBottom: 16 }}>
                {scenario === 'base' ? '📊 Baza' : scenario === 'optimistic' ? '📈 Optimist' : '📉 Pessimist'} ssenari — illik hasilat
              </h3>
              {currentData.map((d) => (
                <div key={d.year} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                  <span style={{ color: '#718096', fontSize: 13, width: 40 }}>{d.year} il</span>
                  <div style={{ flex: 1, background: '#0f1117', borderRadius: 4, height: 20 }}>
                    <div style={{ width: `${(d.oil / Math.max(...currentData.map(x => x.oil))) * 100}%`, background: scenario === 'optimistic' ? '#10b981' : scenario === 'pessimistic' ? '#ef4444' : '#f97316', height: '100%', borderRadius: 4 }} />
                  </div>
                  <span style={{ fontSize: 13, width: 80, textAlign: 'right', color: scenario === 'optimistic' ? '#10b981' : scenario === 'pessimistic' ? '#ef4444' : '#f97316' }}>{d.oil.toLocaleString()}</span>
                </div>
              ))}
            </div>
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
                  if (quizAnswers[qi] === oi) { bg = '#1a2744'; border = '#f97316'; }
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
            <button onClick={() => setQuizSubmitted(true)} style={{ background: '#f97316', color: '#0f1117', border: 'none', borderRadius: 8, padding: '12px 32px', fontWeight: 700, cursor: 'pointer', fontSize: 16 }}>Yoxla</button>
          ) : (
            <div style={{ background: score >= 4 ? '#064e3b' : '#450a0a', borderRadius: 8, padding: 16, color: score >= 4 ? '#68d391' : '#ef4444', fontWeight: 700, fontSize: 18 }}>
              Nəticə: {score}/5 — {score >= 4 ? 'Əla! Davam et.' : 'Dərslərə qayıt və yenidən cəhd et.'}
            </div>
          )}
        </div>

        {/* AI Chat */}
        <div style={{ marginTop: 32, background: '#1a1d2e', borderRadius: 12, padding: 24 }}>
          <h2 style={{ color: '#f97316', fontSize: 18, marginBottom: 8 }}>AI Eclipse Assistenti</h2>
          <p style={{ color: '#718096', fontSize: 13, marginBottom: 16 }}>Rezervuar simulyasiyası haqqında sual ver — Azərbaycan dilində cavab alacaqsan.</p>
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
            <input value={chatInput} onChange={(e) => setChatInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && sendChat()} placeholder="Məs: Recovery factor nədir?" style={{ flex: 1, background: '#0f1117', border: '1px solid #2d3748', borderRadius: 8, padding: '10px 14px', color: '#e2e8f0', fontSize: 14 }} />
            <button onClick={sendChat} disabled={chatLoading} style={{ background: '#f97316', color: '#0f1117', border: 'none', borderRadius: 8, padding: '10px 20px', fontWeight: 700, cursor: 'pointer' }}>Göndər</button>
          </div>
        </div>
      </div>
    </div>
  );
}