import Layout from "@/components/Layout";
import { useState, useEffect, useCallback } from "react";
import { CheckCircle, XCircle, Clock, Trophy } from "lucide-react";

interface QuizQuestion {
  question: string;
  questionAr: string;
  options: string[];
  correct: number;
}

interface Quiz {
  id: number;
  titleIt: string;
  titleAr: string;
  level: string;
  timeLimit: number;
  questions: QuizQuestion[];
}

const quizzes: Quiz[] = [
  {
    id: 1,
    titleIt: "Vocabolario A1 — Parole di base",
    titleAr: "مفردات A1 — كلمات أساسية",
    level: "A1",
    timeLimit: 180,
    questions: [
      { question: "Come si dice 'كتاب' in italiano?", questionAr: "ما ترجمة 'كتاب' بالإيطالية؟", options: ["Penna", "Libro", "Quaderno", "Tavolo"], correct: 1 },
      { question: "Cosa significa 'acqua'?", questionAr: "ما معنى 'acqua'؟", options: ["طعام", "ماء", "هواء", "نار"], correct: 1 },
      { question: "Come si dice 'مدرسة' in italiano?", questionAr: "ما ترجمة 'مدرسة' بالإيطالية؟", options: ["Casa", "Ufficio", "Scuola", "Ospedale"], correct: 2 },
      { question: "Cosa significa 'gatto'?", questionAr: "ما معنى 'gatto'؟", options: ["كلب", "قطة", "طائر", "سمكة"], correct: 1 },
      { question: "Come si dice 'عائلة' in italiano?", questionAr: "ما ترجمة 'عائلة' بالإيطالية؟", options: ["Amico", "Famiglia", "Fratello", "Padre"], correct: 1 },
      { question: "Cosa significa 'bello'?", questionAr: "ما معنى 'bello'؟", options: ["قبيح", "كبير", "جميل", "صغير"], correct: 2 },
      { question: "Come si dice 'شكراً' in italiano?", questionAr: "ما ترجمة 'شكراً' بالإيطالية؟", options: ["Prego", "Grazie", "Scusa", "Ciao"], correct: 1 },
      { question: "Cosa significa 'mangiare'?", questionAr: "ما معنى 'mangiare'؟", options: ["يشرب", "ينام", "يأكل", "يمشي"], correct: 2 },
      { question: "Come si dice 'صباح الخير' in italiano?", questionAr: "ما ترجمة 'صباح الخير' بالإيطالية؟", options: ["Buonasera", "Buonanotte", "Buongiorno", "Arrivederci"], correct: 2 },
      { question: "Cosa significa 'casa'?", questionAr: "ما معنى 'casa'؟", options: ["سيارة", "بيت", "شارع", "حديقة"], correct: 1 },
    ],
  },
  {
    id: 2,
    titleIt: "Grammatica A2 — Verbi e tempi",
    titleAr: "قواعد A2 — الأفعال والأزمنة",
    level: "A2",
    timeLimit: 240,
    questions: [
      { question: "Ieri Maria ___ a casa.", questionAr: "أمس بقيت ماريا في البيت.", options: ["è restata", "ha restato", "resta", "restava"], correct: 0 },
      { question: "Noi ___ in Italia l'anno scorso.", questionAr: "سافرنا إلى إيطاليا العام الماضي.", options: ["andiamo", "siamo andati", "abbiamo andato", "andavamo"], correct: 1 },
      { question: "Tu ___ studiare di più.", questionAr: "يجب أن تدرس أكثر.", options: ["devi", "puoi", "vuoi", "sai"], correct: 0 },
      { question: "Loro ___ la televisione ogni sera.", questionAr: "يشاهدون التلفزيون كل مساء.", options: ["guardano", "guardare", "guarda", "guardiamo"], correct: 0 },
      { question: "Io ___ al cinema domani.", questionAr: "سأذهب إلى السينما غداً.", options: ["vado", "andrò", "sono andato", "andavo"], correct: 1 },
      { question: "Lei ___ molto bene l'italiano.", questionAr: "هي تتكلم الإيطالية جيداً.", options: ["parla", "parlare", "parlano", "parliamo"], correct: 0 },
      { question: "Quando ero piccolo, ___ al parco.", questionAr: "عندما كنت صغيراً، كنت ألعب في الحديقة.", options: ["gioco", "ho giocato", "giocavo", "giocherò"], correct: 2 },
      { question: "Marco e Luca ___ amici da dieci anni.", questionAr: "ماركو ولوكا صديقان منذ عشر سنوات.", options: ["sono", "hanno", "erano", "è"], correct: 0 },
      { question: "___ venire alla festa sabato?", questionAr: "هل تستطيع أن تأتي إلى الحفلة السبت؟", options: ["Devi", "Vuoi", "Puoi", "Sai"], correct: 2 },
      { question: "Prima di uscire, ___ i compiti.", questionAr: "قبل الخروج، أنهيتُ الواجبات.", options: ["ho finito", "finisco", "finirò", "finivo"], correct: 0 },
    ],
  },
];

export default function Quizzes() {
  const [selectedQuiz, setSelectedQuiz] = useState<number | null>(null);
  const [answers, setAnswers] = useState<Record<string, number | null>>({});
  const [submitted, setSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [started, setStarted] = useState(false);

  const currentQuiz = quizzes.find((q) => q.id === selectedQuiz);

  const handleStart = useCallback(() => {
    if (currentQuiz) {
      setStarted(true);
      setTimeLeft(currentQuiz.timeLimit);
      setAnswers({});
      setSubmitted(false);
    }
  }, [currentQuiz]);

  useEffect(() => {
    if (!started || submitted || timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setSubmitted(true);
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [started, submitted, timeLeft]);

  const handleAnswer = (qIdx: number, optIdx: number) => {
    if (submitted || !currentQuiz) return;
    setAnswers((prev) => ({ ...prev, [`${currentQuiz.id}-${qIdx}`]: optIdx }));
  };

  const handleSubmit = () => setSubmitted(true);

  const getScore = () => {
    if (!currentQuiz) return 0;
    let correct = 0;
    currentQuiz.questions.forEach((q, idx) => {
      if (answers[`${currentQuiz.id}-${idx}`] === q.correct) correct++;
    });
    return correct;
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  const resetQuiz = () => {
    setSelectedQuiz(null);
    setStarted(false);
    setSubmitted(false);
    setAnswers({});
    setTimeLeft(0);
  };

  return (
    <Layout>
      <section className="relative h-48 md:h-64 overflow-hidden bg-gradient-to-br from-red-600 to-red-800">
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4">
          <Trophy className="w-12 h-12 mb-3 opacity-80" />
          <h1 className="text-3xl md:text-5xl font-bold mb-2">Quiz e Test</h1>
          <p className="text-lg opacity-80" dir="rtl">الاختبارات</p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        {!currentQuiz ? (
          <div className="space-y-4">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-[#1A1A2E] mb-1">Scegli un quiz</h2>
              <p className="text-gray-500" dir="rtl">اختر اختباراً</p>
            </div>
            {quizzes.map((quiz) => (
              <button key={quiz.id} onClick={() => { setSelectedQuiz(quiz.id); setStarted(false); setSubmitted(false); setAnswers({}); }} className="w-full bg-white rounded-2xl shadow-md border border-gray-100 p-5 text-left hover:shadow-lg hover:-translate-y-1 transition-all">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center"><Trophy className="w-6 h-6 text-white" /></div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-bold text-white ${quiz.level === "A1" ? "bg-[#2E7D32]" : "bg-[#1E3A5F]"}`}>{quiz.level}</span>
                      <h3 className="font-bold text-[#1A1A2E]">{quiz.titleIt}</h3>
                    </div>
                    <p className="text-sm text-gray-400" dir="rtl">{quiz.titleAr}</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-sm text-gray-400"><Clock className="w-4 h-4" /><span>{Math.floor(quiz.timeLimit / 60)} min</span></div>
                    <span className="text-xs text-gray-400">{quiz.questions.length} domande</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        ) : !started ? (
          <div className="text-center">
            <button onClick={resetQuiz} className="mb-6 text-red-600 hover:text-red-800 font-medium text-sm flex items-center gap-1">← Torna alla lista</button>
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 max-w-md mx-auto">
              <Trophy className="w-16 h-16 text-red-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-[#1A1A2E] mb-2">{currentQuiz.titleIt}</h2>
              <p className="text-gray-400 mb-4" dir="rtl">{currentQuiz.titleAr}</p>
              <div className="flex justify-center gap-6 mb-6 text-sm text-gray-500">
                <div className="flex items-center gap-1"><Clock className="w-4 h-4" /><span>{Math.floor(currentQuiz.timeLimit / 60)} minuti</span></div>
                <div><span>{currentQuiz.questions.length} domande</span></div>
              </div>
              <button onClick={handleStart} className="px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl transition-colors text-lg">Inizia il quiz</button>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-[#1A1A2E]">{currentQuiz.titleIt}</h2>
              <div className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold ${timeLeft <= 30 && !submitted ? "bg-red-100 text-red-600 animate-pulse" : "bg-gray-100 text-gray-700"}`}><Clock className="w-5 h-5" /><span>{formatTime(timeLeft)}</span></div>
            </div>

            {!submitted && <div className="w-full bg-gray-200 rounded-full h-2 mb-6"><div className="bg-red-500 h-2 rounded-full transition-all" style={{ width: `${((currentQuiz.timeLimit - timeLeft) / currentQuiz.timeLimit) * 100}%` }} /></div>}

            {submitted && (
              <div className="bg-gradient-to-r from-[#F59E0B]/20 to-[#F59E0B]/5 rounded-2xl p-6 mb-6 text-center">
                <Trophy className="w-12 h-12 text-[#F59E0B] mx-auto mb-2" />
                <h3 className="text-2xl font-bold text-[#1A1A2E]">{getScore()} / {currentQuiz.questions.length}</h3>
                <p className="text-gray-500" dir="rtl">النتيجة النهائية — Risultato finale</p>
                <button onClick={resetQuiz} className="mt-4 px-6 py-2 bg-[#1E3A5F] hover:bg-[#162d4a] text-white font-semibold rounded-xl transition-colors">Torna ai quiz</button>
              </div>
            )}

            <div className="space-y-4">
              {currentQuiz.questions.map((q, idx) => {
                const key = `${currentQuiz.id}-${idx}`;
                const selected = answers[key];
                return (
                  <div key={idx} className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                    <p className="font-medium text-[#1A1A2E] mb-1">{idx + 1}. {q.question}</p>
                    <p className="text-xs text-gray-400 mb-3" dir="rtl">{q.questionAr}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {q.options.map((opt, optIdx) => {
                        let btnClass = "border-2 rounded-lg px-4 py-2 text-sm font-medium transition-all cursor-pointer text-center ";
                        if (submitted) {
                          if (optIdx === q.correct) btnClass += "border-green-500 bg-green-50 text-green-700";
                          else if (selected === optIdx && optIdx !== q.correct) btnClass += "border-red-500 bg-red-50 text-red-700";
                          else btnClass += "border-gray-200 text-gray-400";
                        } else {
                          if (selected === optIdx) btnClass += "border-red-500 bg-red-50 text-red-700";
                          else btnClass += "border-gray-200 hover:border-red-300 text-gray-700";
                        }
                        return <button key={optIdx} onClick={() => handleAnswer(idx, optIdx)} className={btnClass} disabled={submitted}>{opt}</button>;
                      })}
                    </div>
                    {submitted && selected !== undefined && selected !== null && (
                      <div className="mt-2 flex items-center gap-1 text-sm">
                        {selected === q.correct ? (
                          <><CheckCircle className="w-4 h-4 text-green-500" /><span className="text-green-600">Corretto! — صحيح!</span></>
                        ) : (
                          <><XCircle className="w-4 h-4 text-red-500" /><span className="text-red-600">Sbagliato — خطأ. Risposta: {q.options[q.correct]}</span></>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {!submitted && <div className="mt-6"><button onClick={handleSubmit} className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl transition-colors">Termina il quiz</button></div>}
          </div>
        )}
      </section>
    </Layout>
  );
}
