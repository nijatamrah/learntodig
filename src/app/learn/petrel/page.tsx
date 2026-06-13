'use client';

import { useState } from 'react';
import Link from 'next/link';

const petrelConcepts = [
  {
    id: 'reservoir',
    name: 'Rezervuar Modeli',
    color: '#3B82F6',
    icon: '🗄️',
    desc: 'Petrel yeraltı rezervuarın 3D modelini qurur. Geoloji məlumatlar, seysmik data və quyu loqları birləşdirilir. Model rezervuarın həcmini, formasını və xüsusiyyətlərini göstərir.',
    detail: 'Rezervuar modeli quyuların yerini müəyyən etmək üçün istifadə edilir. Hər hüceyrə məsaməlilik, keçiricilik və su doyumluğu kimi xüsusiyyətlərə malikdir.',
  },
  {
    id: 'porosity',
    name: 'Məsaməlilik (Porosity)',
    color: '#10B981',
    icon: '🕳️',
    desc: 'Məsaməlilik süxurun boş həcminin ümumi həcmə nisbətidir. Yüksək məsaməlilik daha çox neft saxlaya bilən süxur deməkdir.',
    detail: 'Tipik dəyərlər: Qumdaşı 15-35%, Əhəngdaşı 5-20%, Şal 5-15%. Petrel-də məsaməlilik 3D modeldə rənglə göstərilir.',
  },
  {
    id: 'permeability',
    name: 'Keçiricilik (Permeability)',
    color: '#F59E0B',
    icon: '💧',
    desc: 'Keçiricilik mayenin süxur içindən nə qədər asan keçdiyini göstərir. Millidarsi (mD) ilə ölçülür.',
    detail: 'Yüksək keçiricilik (>100 mD) neftin asanlıqla axdığını göstərir. Aşağı keçiricilik (<1 mD) tight reservoir deməkdir.',
  },
  {
    id: 'seismic',
    name: 'Seysmik Data',
    color: '#8B5CF6',
    icon: '📡',
    desc: 'Seysmik dalğalar yeraltı quruluşu aşkar edir. Petrel seysmik datanı geoloji modellə birləşdirir.',
    detail: 'Seysmik interpretasiya antiklinal, qırılma və digər tələ strukturlarını göstərir. Quyu qazımadan əvvəl əsas məlumat mənbəyidir.',
  },
];

const modelLayers = [
  { name: 'Üst örtük (Overburden)', color: '#374151', porosity: '2%', perm: '0.01 mD', fluid: 'Quru' },
  { name: 'Şal (Qapaq)', color: '#4B5563', porosity: '8%', perm: '0.1 mD', fluid: 'Quru' },
  { name: 'Qumdaşı A (Kollektor)', color: '#B45309', porosity: '28%', perm: '250 mD', fluid: 'Neft' },
  { name: 'Keçid Zonası', color: '#92400E', porosity: '18%', perm: '50 mD', fluid: 'Neft+Su' },
  { name: 'Qumdaşı B (Su zonası)', color: '#1D4ED8', porosity: '25%', perm: '180 mD', fluid: 'Su' },
  { name: 'Alt şal', color: '#1F2937', porosity: '5%', perm: '0.05 mD', fluid: 'Quru' },
];

const quizQuestions = [
  {
    q: 'Petrel proqramı nə üçün istifadə edilir?',
    options: ['Quyu qazımaq üçün', 'Rezervuar modelləməsi üçün', 'Neft satmaq üçün', 'Boru kəməri dizaynı üçün'],
    correct: 1,
  },
  {
    q: 'Məsaməlilik nəyi ölçür?',
    options: ['Süxurun möhkəmliyini', 'Süxurun boş həcmini', 'Neftin keyfiyyətini', 'Dərinliyi'],
    correct: 1,
  },
  {
    q: 'Keçiricilik hansı vahidlə ölçülür?',
    options: ['Metr', 'Millidarsi (mD)', 'Paskal', 'Darəcə'],
    correct: 1,
  },
  {
    q: 'Seysmik data nə üçün lazımdır?',
    options: ['Neft satışı üçün', 'Yeraltı quruluşu aşkar etmək üçün', 'Quyu məhsuldarlığı üçün', 'Su analizi üçün'],
    correct: 1,
  },
  {
    q: 'Hansı süxurun məsaməliliyi ən yüksəkdir?',
    options: ['Şal', 'Granit', 'Qumdaşı', 'Duz'],
    correct: 2,
  },
];

export default function PetrelPage() {
  const [activeConcept, setActiveConcept] = useState<string | null>(null);
  const [activeLayer, setActiveLayer] = useState<number | null>(null);
  const [activeLesson, setActiveLesson] = useState(0);
  const [porosity, setPorosity] = useState(25);
  const [permeability, setPermeability] = useState(150);
  const [saturation, setSaturation] = useState(70);
  const [quizAnswers, setQuizAnswers] = useState<(number | null)[]>(Array(5).fill(null));
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [chatMessages, setChatMessages] = useState<{ role: string; content: string }[]>([]);
  const [chatInput, setChatInput] = useState('');
  const [chatLoading, setChatLoading] = useState(false);

  const selectedConcept = petrelConcepts.find((c) => c.id === activeConcept);
  const score = quizAnswers.filter((a, i) => a === quizQuestions[i].correct).length;

  const oilVolume = Math.round((porosity / 100) * (saturation / 100) * 1000000);

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
      const res = await fetch('/api/petrel/chat', {
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
          <span style={{ fontSize: 20 }}>🗺️</span>
          <span style={{ fontWeight: 700, color: '#60a5fa', fontSize: 18 }}>PetrelSim</span>
          <span style={{ color: '#718096', fontSize: 14 }}>Rezervuar modelləməsi · AI ilə gücləndirilmiş</span>
        </div>
        <Link href="/" style={{ color: '#a0aec0', textDecoration: 'none', fontSize: 14 }}>← LearntoDig</Link>
      </div>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '32px 16px' }}>
        <h1 style={{ fontSize: 28, fontWeight: 700, color: '#60a5fa', marginBottom: 8 }}>Petrel — Rezervuar Modelləməsi</h1>
        <p style={{ color: '#718096', marginBottom: 32 }}>3 interaktiv dərs · 3D model simulyatoru · AI chat · Quiz</p>

        <div style={{ display: 'flex', gap: 8, marginBottom: 32, flexWrap: 'wrap' }}>
          {['Petrel əsasları', '3D Model', 'Xüsusiyyət Modelləməsi'].map((tab, i) => (
            <button key={i} onClick={() => setActiveLesson(i)} style={{ padding: '10px 20px', borderRadius: 8, border: 'none', cursor: 'pointer', background: activeLesson === i ? '#60a5fa' : '#1a1d2e', color: activeLesson === i ? '#0f1117' : '#a0aec0', fontWeight: activeLesson === i ? 700 : 400, fontSize: 14 }}>
              {tab}
            </button>
          ))}
        </div>

        {/* Lesson 1 */}
        {activeLesson === 0 && (
          <div>
            <h2 style={{ color: '#e2e8f0', fontSize: 20, marginBottom: 16 }}>Petrel nədir?</h2>
            <div style={{ background: '#1a1d2e', borderRadius: 12, padding: 20, marginBottom: 24 }}>
              <p style={{ color: '#a0aec0', lineHeight: 1.8 }}>
                Petrel SLB (Schlumberger) şirkətinin hazırladığı ən məşhur rezervuar modelləmə proqramıdır. Dünya üzrə böyük neft şirkətlərinin 90%-i Petrel istifadə edir. Lisenziyası <strong style={{ color: '#60a5fa' }}>$50,000-100,000/il</strong> xərcləyir — bu səbəbdən tələbələr üçün əlçatan deyil.
              </p>
              <p style={{ color: '#a0aec0', lineHeight: 1.8, marginTop: 12 }}>
                LearntoDig-də Petrel-in əsas konsepsiyalarını pulsuz öyrənə bilərsən.
              </p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
              {petrelConcepts.map((concept) => (
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
            <h2 style={{ color: '#e2e8f0', fontSize: 20, marginBottom: 16 }}>3D Rezervuar Modeli</h2>
            <p style={{ color: '#a0aec0', marginBottom: 20 }}>Hər qata klik et — məsaməlilik, keçiricilik və maye növünü gör.</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
              <div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                  {modelLayers.map((layer, i) => (
                    <div key={i} onClick={() => setActiveLayer(activeLayer === i ? null : i)} style={{ background: layer.color, padding: '14px 16px', borderRadius: 6, cursor: 'pointer', border: activeLayer === i ? '2px solid #60a5fa' : '2px solid transparent', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontWeight: 600, color: '#fff', fontSize: 14 }}>{layer.name}</span>
                      <span style={{ fontSize: 12, padding: '2px 8px', borderRadius: 10, background: layer.fluid === 'Neft' ? '#92400e' : layer.fluid === 'Su' ? '#1e3a5f' : layer.fluid === 'Neft+Su' ? '#5b3a8e' : '#1f2937', color: '#fff' }}>{layer.fluid}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                {activeLayer !== null ? (
                  <div style={{ background: '#1a1d2e', borderRadius: 12, padding: 20, border: '1px solid #60a5fa' }}>
                    <h3 style={{ color: '#60a5fa', marginBottom: 16 }}>{modelLayers[activeLayer].name}</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                      <div style={{ background: '#0f1117', borderRadius: 8, padding: 12 }}>
                        <div style={{ fontSize: 12, color: '#718096', marginBottom: 4 }}>Məsaməlilik</div>
                        <div style={{ fontSize: 22, fontWeight: 700, color: '#10b981' }}>{modelLayers[activeLayer].porosity}</div>
                      </div>
                      <div style={{ background: '#0f1117', borderRadius: 8, padding: 12 }}>
                        <div style={{ fontSize: 12, color: '#718096', marginBottom: 4 }}>Keçiricilik</div>
                        <div style={{ fontSize: 22, fontWeight: 700, color: '#f59e0b' }}>{modelLayers[activeLayer].perm}</div>
                      </div>
                      <div style={{ background: '#0f1117', borderRadius: 8, padding: 12 }}>
                        <div style={{ fontSize: 12, color: '#718096', marginBottom: 4 }}>Maye növü</div>
                        <div style={{ fontSize: 22, fontWeight: 700, color: '#60a5fa' }}>{modelLayers[activeLayer].fluid}</div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div style={{ background: '#1a1d2e', borderRadius: 12, padding: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', border: '1px dashed #2d3748' }}>
                    <p style={{ color: '#718096', textAlign: 'center' }}>Sol tərəfdən bir qat seç — xüsusiyyətlərini gör</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Lesson 3 */}
        {activeLesson === 2 && (
          <div>
            <h2 style={{ color: '#e2e8f0', fontSize: 20, marginBottom: 16 }}>Xüsusiyyət Modelləməsi</h2>
            <p style={{ color: '#a0aec0', marginBottom: 24 }}>Parametrləri dəyişdir — neft həcmi real vaxtda hesablanır.</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
              <div style={{ background: '#1a1d2e', borderRadius: 12, padding: 24 }}>
                <div style={{ marginBottom: 24 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                    <span style={{ color: '#a0aec0', fontSize: 14 }}>Məsaməlilik (%)</span>
                    <span style={{ color: '#10b981', fontWeight: 700 }}>{porosity}%</span>
                  </div>
                  <input type="range" min={5} max={40} value={porosity} onChange={(e) => setPorosity(+e.target.value)} style={{ width: '100%' }} />
                </div>
                <div style={{ marginBottom: 24 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                    <span style={{ color: '#a0aec0', fontSize: 14 }}>Keçiricilik (mD)</span>
                    <span style={{ color: '#f59e0b', fontWeight: 700 }}>{permeability} mD</span>
                  </div>
                  <input type="range" min={1} max={500} value={permeability} onChange={(e) => setPermeability(+e.target.value)} style={{ width: '100%' }} />
                </div>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                    <span style={{ color: '#a0aec0', fontSize: 14 }}>Neft doyumluğu (%)</span>
                    <span style={{ color: '#60a5fa', fontWeight: 700 }}>{saturation}%</span>
                  </div>
                  <input type="range" min={10} max={95} value={saturation} onChange={(e) => setSaturation(+e.target.value)} style={{ width: '100%' }} />
                </div>
              </div>
              <div style={{ background: '#1a1d2e', borderRadius: 12, padding: 24 }}>
                <h3 style={{ color: '#60a5fa', marginBottom: 20, fontSize: 16 }}>Hesablama nəticəsi</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <div style={{ background: '#0f1117', borderRadius: 8, padding: 16, textAlign: 'center' }}>
                    <div style={{ fontSize: 12, color: '#718096', marginBottom: 4 }}>Ehtiyat həcmi (bbl)</div>
                    <div style={{ fontSize: 28, fontWeight: 700, color: '#10b981' }}>{oilVolume.toLocaleString()}</div>
                  </div>
                  <div style={{ background: '#0f1117', borderRadius: 8, padding: 12 }}>
                    <p style={{ color: '#718096', fontSize: 13, lineHeight: 1.6 }}>
                      {porosity > 25 ? '✅ Yüksək məsaməlilik — əla kollektor' : porosity > 15 ? '⚠️ Orta məsaməlilik — qəbul edilən kollektor' : '❌ Aşağı məsaməlilik — zəif kollektor'}
                    </p>
                    <p style={{ color: '#718096', fontSize: 13, lineHeight: 1.6, marginTop: 8 }}>
                      {permeability > 100 ? '✅ Yüksək keçiricilik — neft asanlıqla axır' : permeability > 10 ? '⚠️ Orta keçiricilik' : '❌ Aşağı keçiricilik — stimulyasiya lazımdır'}
                    </p>
                  </div>
                </div>
              </div>
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
                  if (quizAnswers[qi] === oi) { bg = '#1a2744'; border = '#60a5fa'; }
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
            <button onClick={() => setQuizSubmitted(true)} style={{ background: '#60a5fa', color: '#0f1117', border: 'none', borderRadius: 8, padding: '12px 32px', fontWeight: 700, cursor: 'pointer', fontSize: 16 }}>Yoxla</button>
          ) : (
            <div style={{ background: score >= 4 ? '#064e3b' : '#450a0a', borderRadius: 8, padding: 16, color: score >= 4 ? '#68d391' : '#ef4444', fontWeight: 700, fontSize: 18 }}>
              Nəticə: {score}/5 — {score >= 4 ? 'Əla! Davam et.' : 'Dərslərə qayıt və yenidən cəhd et.'}
            </div>
          )}
        </div>

        {/* AI Chat */}
        <div style={{ marginTop: 32, background: '#1a1d2e', borderRadius: 12, padding: 24 }}>
          <h2 style={{ color: '#60a5fa', fontSize: 18, marginBottom: 8 }}>AI Petrel Assistenti</h2>
          <p style={{ color: '#718096', fontSize: 13, marginBottom: 16 }}>Rezervuar modelləməsi haqqında sual ver — Azərbaycan dilində cavab alacaqsan.</p>
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
            <input value={chatInput} onChange={(e) => setChatInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && sendChat()} placeholder="Məs: Məsaməlilik nədir?" style={{ flex: 1, background: '#0f1117', border: '1px solid #2d3748', borderRadius: 8, padding: '10px 14px', color: '#e2e8f0', fontSize: 14 }} />
            <button onClick={sendChat} disabled={chatLoading} style={{ background: '#60a5fa', color: '#0f1117', border: 'none', borderRadius: 8, padding: '10px 20px', fontWeight: 700, cursor: 'pointer' }}>Göndər</button>
          </div>
        </div>
      </div>
    </div>
  );
}