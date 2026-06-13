'use client';

import { useState } from 'react';
import Link from 'next/link';

const rockTypes = [
  {
    id: 'sandstone',
    name: 'Qumdaşı',
    color: '#C4A35A',
    gr: '15-45 GAPI',
    resd: '50-500 ohmm',
    porosity: '15-35%',
    desc: 'Qumdaşı ən yaxşı kollektordur. Məsaməliliyi yüksəkdir, neft və qaz saxlaya bilir. GR aşağı, müqavimət yüksəkdir.',
    icon: '🟨',
  },
  {
    id: 'shale',
    name: 'Şal (Gil)',
    color: '#6B7280',
    gr: '80-150 GAPI',
    resd: '1-10 ohmm',
    porosity: '5-15%',
    desc: 'Şal keçiriciliyi aşağı olan gillidir. Qapaq lay kimi nefti saxlayır. GR çox yüksək, müqavimət çox aşağıdır.',
    icon: '⬛',
  },
  {
    id: 'limestone',
    name: 'Əhəngdaşı',
    color: '#93C5FD',
    gr: '10-30 GAPI',
    resd: '100-1000 ohmm',
    porosity: '5-20%',
    desc: 'Əhəngdaşı karbonat süxurudur. Çatlaqlı olduqda yaxşı kollektordur. GR aşağı, müqavimət çox yüksəkdir.',
    icon: '🔵',
  },
  {
    id: 'dolomite',
    name: 'Dolomit',
    color: '#A78BFA',
    gr: '10-25 GAPI',
    resd: '200-2000 ohmm',
    porosity: '10-25%',
    desc: 'Dolomit maqnezium karbonatlı süxurdur. Çox yüksək müqaviməti var. Neft-qaz üçün əla kollektordur.',
    icon: '🟣',
  },
];

const trapTypes = [
  {
    id: 'anticline',
    name: 'Antiklinal',
    desc: 'Ən çox rast gəlinən tələ növü. Süxur qatları yuxarı qalxır, neft ən yüksək nöqtədə toplanır. Azərbaycanın Abşeron yarımadasındakı quyular əsasən antiklinal tələsdədir.',
    color: '#F59E0B',
  },
  {
    id: 'fault',
    name: 'Qırılma Tələsi',
    desc: 'Geoloji qırılma neftin hərəkətini dayandırır. Qırılma səthi qapaq rolunu oynayır. Aşkar edilməsi çətindir.',
    color: '#EF4444',
  },
  {
    id: 'stratigraphic',
    name: 'Stratigrafik Tələ',
    desc: 'Keçiriciliyi aşağı süxur nefti saxlayır. Qumdaşı klinozform şəklində gilə keçəndə yaranır. Azərbaycanda Kürsəngi yatağı bu tipdir.',
    color: '#10B981',
  },
];

const quizQuestions = [
  {
    q: 'Hansı süxur ən yaxşı neft kollektorudur?',
    options: ['Şal', 'Qumdaşı', 'Duz', 'Granit'],
    correct: 1,
  },
  {
    q: 'GR (Gamma Ray) loqu nəyi ölçür?',
    options: ['Təzyiqi', 'Temperaturunu', 'Gil tərkibini', 'Neft miqdarını'],
    correct: 2,
  },
  {
    q: 'Antiklinal tələsdə neft harada toplanır?',
    options: ['Ən dərin nöqtədə', 'Ən yüksək nöqtədə', 'Qırılma boyunca', 'Gil içində'],
    correct: 1,
  },
  {
    q: 'Şalın əsas xüsusiyyəti nədir?',
    options: ['Yüksək məsaməlilik', 'Aşağı keçiricilik', 'Yüksək müqavimət', 'Şəffaflıq'],
    correct: 1,
  },
  {
    q: 'Neft tələsinin 3 əsas komponenti hansıdır?',
    options: ['Qum, gil, su', 'Kollektor, qapaq, tələ', 'Antiklinal, qırılma, stratigrafik', 'GR, RESD, DT'],
    correct: 1,
  },
];

export default function GeologyPage() {
  const [activeRock, setActiveRock] = useState<string | null>(null);
  const [activeTrap, setActiveTrap] = useState<string | null>(null);
  const [activeLesson, setActiveLesson] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<(number | null)[]>(Array(5).fill(null));
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [chatMessages, setChatMessages] = useState<{ role: string; content: string }[]>([]);
  const [chatInput, setChatInput] = useState('');
  const [chatLoading, setChatLoading] = useState(false);

  const selectedRock = rockTypes.find((r) => r.id === activeRock);

  const handleQuizAnswer = (qIndex: number, aIndex: number) => {
    if (quizSubmitted) return;
    const newAnswers = [...quizAnswers];
    newAnswers[qIndex] = aIndex;
    setQuizAnswers(newAnswers);
  };

  const score = quizAnswers.filter((a, i) => a === quizQuestions[i].correct).length;

  const sendChat = async () => {
    if (!chatInput.trim()) return;
    const userMsg = chatInput.trim();
    setChatInput('');
    setChatMessages((prev) => [...prev, { role: 'user', content: userMsg }]);
    setChatLoading(true);
    try {
      const res = await fetch('/api/geology/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg }),
      });
      const data = await res.json();
      setChatMessages((prev) => [...prev, { role: 'assistant', content: data.reply }]);
    } catch {
      setChatMessages((prev) => [...prev, { role: 'assistant', content: 'Xəta baş verdi. Yenidən cəhd edin.' }]);
    }
    setChatLoading(false);
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0f1117', color: '#e2e8f0', fontFamily: 'sans-serif' }}>
      <div style={{ background: '#1a1d2e', borderBottom: '1px solid #2d3748', padding: '12px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontSize: 20 }}>🪨</span>
          <span style={{ fontWeight: 700, color: '#68d391', fontSize: 18 }}>GeologyLab</span>
          <span style={{ color: '#718096', fontSize: 14 }}>Geoloji əsaslar · AI ilə gücləndirilmiş</span>
        </div>
        <Link href="/" style={{ color: '#a0aec0', textDecoration: 'none', fontSize: 14 }}>← LearntoDig</Link>
      </div>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '32px 16px' }}>
        <h1 style={{ fontSize: 28, fontWeight: 700, color: '#68d391', marginBottom: 8 }}>Geologiya modulu</h1>
        <p style={{ color: '#718096', marginBottom: 32 }}>3 interaktiv dərs · AI chat · Quiz</p>

        <div style={{ display: 'flex', gap: 8, marginBottom: 32 }}>
          {['Litologiya', 'Stratigrafiya', 'Neft Tələsi'].map((tab, i) => (
            <button key={i} onClick={() => setActiveLesson(i)} style={{ padding: '10px 20px', borderRadius: 8, border: 'none', cursor: 'pointer', background: activeLesson === i ? '#68d391' : '#1a1d2e', color: activeLesson === i ? '#0f1117' : '#a0aec0', fontWeight: activeLesson === i ? 700 : 400, fontSize: 14 }}>
              {tab}
            </button>
          ))}
        </div>

        {activeLesson === 0 && (
          <div>
            <h2 style={{ color: '#e2e8f0', fontSize: 20, marginBottom: 16 }}>Süxur növləri</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 24 }}>
              {rockTypes.map((rock) => (
                <div key={rock.id} onClick={() => setActiveRock(activeRock === rock.id ? null : rock.id)} style={{ background: activeRock === rock.id ? '#1a2744' : '#1a1d2e', border: `2px solid ${activeRock === rock.id ? rock.color : '#2d3748'}`, borderRadius: 12, padding: 20, cursor: 'pointer' }}>
                  <div style={{ fontSize: 32, marginBottom: 8 }}>{rock.icon}</div>
                  <div style={{ fontWeight: 600, color: rock.color, fontSize: 16, marginBottom: 4 }}>{rock.name}</div>
                  <div style={{ fontSize: 12, color: '#718096' }}>GR: {rock.gr}</div>
                  <div style={{ fontSize: 12, color: '#718096' }}>RESD: {rock.resd}</div>
                </div>
              ))}
            </div>
            {selectedRock && (
              <div style={{ background: '#1a1d2e', border: `1px solid ${selectedRock.color}`, borderRadius: 12, padding: 20 }}>
                <h3 style={{ color: selectedRock.color, marginBottom: 8 }}>{selectedRock.name}</h3>
                <p style={{ color: '#a0aec0', lineHeight: 1.7 }}>{selectedRock.desc}</p>
                <div style={{ marginTop: 12, display: 'flex', gap: 16 }}>
                  <span style={{ background: '#2d3748', padding: '4px 12px', borderRadius: 20, fontSize: 13 }}>Məsaməlilik: {selectedRock.porosity}</span>
                  <span style={{ background: '#2d3748', padding: '4px 12px', borderRadius: 20, fontSize: 13 }}>GR: {selectedRock.gr}</span>
                </div>
              </div>
            )}
          </div>
        )}

        {activeLesson === 1 && (
          <div>
            <h2 style={{ color: '#e2e8f0', fontSize: 20, marginBottom: 16 }}>Geoloji qat ardıcıllığı</h2>
            <div style={{ background: '#1a1d2e', borderRadius: 12, padding: 24 }}>
              <p style={{ color: '#a0aec0', marginBottom: 20 }}>Hər qata klik et — ətraflı məlumat al.</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                {[
                  { name: 'Torpaq / Relyef', depth: '0-50m', color: '#92400E', desc: 'Yer səthi. Üzvi maddələr, torpaq qatı.' },
                  { name: 'Şal (Qapaq lay)', depth: '50-300m', color: '#4B5563', desc: 'Keçiriciliyi aşağı gil qatı. Neftin yuxarı keçməsinin qarşısını alır.' },
                  { name: 'Qumdaşı (Kollektor)', depth: '300-600m', color: '#B45309', desc: 'Neft və qazı saxlayan məsaməli lay. Əsas hədəfimizdir.' },
                  { name: 'Əhəngdaşı', depth: '600-900m', color: '#1D4ED8', desc: 'Karbonat süxuru. Çatlı olduqda əla kollektor ola bilər.' },
                  { name: 'Şal (Alt qapaq)', depth: '900-1200m', color: '#374151', desc: 'Alt keçirməz qat. Neftin daha dərinə enməsini dayandırır.' },
                  { name: 'Kristallik bünövrə', depth: '1200m+', color: '#111827', desc: 'Maqmatik süxurlar. Adətən kollektor deyil.' },
                ].map((layer, i) => (
                  <div key={i} onClick={() => setActiveTrap(activeTrap === layer.name ? null : layer.name)} style={{ background: layer.color, padding: '12px 16px', borderRadius: 6, cursor: 'pointer', border: activeTrap === layer.name ? '2px solid #68d391' : '2px solid transparent', display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontWeight: 600, color: '#fff' }}>{layer.name}</span>
                    <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)' }}>{layer.depth}</span>
                  </div>
                ))}
              </div>
              {activeTrap && (
                <div style={{ marginTop: 16, background: '#0f1117', borderRadius: 8, padding: 16, border: '1px solid #68d391' }}>
                  <p style={{ color: '#a0aec0' }}>
                    {[
                      { name: 'Torpaq / Relyef', desc: 'Yer səthi. Üzvi maddələr, torpaq qatı.' },
                      { name: 'Şal (Qapaq lay)', desc: 'Keçiriciliyi aşağı gil qatı. Neftin yuxarı keçməsinin qarşısını alır.' },
                      { name: 'Qumdaşı (Kollektor)', desc: 'Neft və qazı saxlayan məsaməli lay. Əsas hədəfimizdir.' },
                      { name: 'Əhəngdaşı', desc: 'Karbonat süxuru. Çatlı olduqda əla kollektor ola bilər.' },
                      { name: 'Şal (Alt qapaq)', desc: 'Alt keçirməz qat. Neftin daha dərinə enməsini dayandırır.' },
                      { name: 'Kristallik bünövrə', desc: 'Maqmatik süxurlar. Adətən kollektor deyil.' },
                    ].find(l => l.name === activeTrap)?.desc}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {activeLesson === 2 && (
          <div>
            <h2 style={{ color: '#e2e8f0', fontSize: 20, marginBottom: 16 }}>Neft tələsi növləri</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
              {trapTypes.map((trap) => (
                <div key={trap.id} onClick={() => setActiveTrap(activeTrap === trap.id ? null : trap.id)} style={{ background: '#1a1d2e', border: `2px solid ${activeTrap === trap.id ? trap.color : '#2d3748'}`, borderRadius: 12, padding: 20, cursor: 'pointer' }}>
                  <div style={{ fontWeight: 700, color: trap.color, fontSize: 16, marginBottom: 8 }}>{trap.name}</div>
                  {activeTrap === trap.id ? (
                    <p style={{ color: '#a0aec0', fontSize: 14, lineHeight: 1.7 }}>{trap.desc}</p>
                  ) : (
                    <p style={{ color: '#718096', fontSize: 13 }}>Ətraflı oxumaq üçün klik et</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        <div style={{ marginTop: 48, background: '#1a1d2e', borderRadius: 12, padding: 24 }}>
          <h2 style={{ color: '#f6c90e', fontSize: 20, marginBottom: 20 }}>Quiz — Bilikləri yoxla</h2>
          {quizQuestions.map((q, qi) => (
            <div key={qi} style={{ marginBottom: 24 }}>
              <p style={{ color: '#e2e8f0', fontWeight: 600, marginBottom: 12 }}>{qi + 1}. {q.q}</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {q.options.map((opt, oi) => {
                  let bg = '#0f1117', border = '#2d3748';
                  if (quizAnswers[qi] === oi) { bg = '#1a2744'; border = '#68d391'; }
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
            <button onClick={() => setQuizSubmitted(true)} style={{ background: '#68d391', color: '#0f1117', border: 'none', borderRadius: 8, padding: '12px 32px', fontWeight: 700, cursor: 'pointer', fontSize: 16 }}>Yoxla</button>
          ) : (
            <div style={{ background: score >= 4 ? '#064e3b' : '#450a0a', borderRadius: 8, padding: 16, color: score >= 4 ? '#68d391' : '#ef4444', fontWeight: 700, fontSize: 18 }}>
              Nəticə: {score}/5 — {score >= 4 ? 'Əla! Davam et.' : 'Dərslərə qayıt və yenidən cəhd et.'}
            </div>
          )}
        </div>

        <div style={{ marginTop: 32, background: '#1a1d2e', borderRadius: 12, padding: 24 }}>
          <h2 style={{ color: '#90cdf4', fontSize: 18, marginBottom: 8 }}>AI Geologiya Assistenti</h2>
          <p style={{ color: '#718096', fontSize: 13, marginBottom: 16 }}>Geologiya haqqında istənilən sual ver — Azərbaycan dilində cavab alacaqsan.</p>
          <div style={{ minHeight: 120, marginBottom: 16 }}>
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
            <input value={chatInput} onChange={(e) => setChatInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && sendChat()} placeholder="Məs: Antiklinal tələs nədir?" style={{ flex: 1, background: '#0f1117', border: '1px solid #2d3748', borderRadius: 8, padding: '10px 14px', color: '#e2e8f0', fontSize: 14 }} />
            <button onClick={sendChat} disabled={chatLoading} style={{ background: '#90cdf4', color: '#0f1117', border: 'none', borderRadius: 8, padding: '10px 20px', fontWeight: 700, cursor: 'pointer' }}>Göndər</button>
          </div>
        </div>
      </div>
    </div>
  );
}