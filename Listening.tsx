import Layout from "@/components/Layout";
import { useState } from "react";
import { CheckCircle, XCircle, Volume2, Headphones } from "lucide-react";

interface ListeningQuestion {
  question: string;
  questionAr: string;
  options: string[];
  correct: number;
}

interface ListeningActivity {
  id: number;
  titleIt: string;
  titleAr: string;
  level: string;
  transcript: string;
  transcriptAr: string;
  questions: ListeningQuestion[];
}

const activities: ListeningActivity[] = [
  {
    id: 1,
    titleIt: "Al bar — Una colazione italiana",
    titleAr: "في المقهى — فطور إيطالي",
    level: "A1",
    transcript:
      "— Buongiorno! Cosa desidera?\n— Buongiorno! Vorrei un cappuccino e un cornetto, per favore.\n— Certo. Il cornetto lo vuole alla crema o alla marmellata?\n— Alla crema, grazie.\n— Benissimo. Vuole altro?\n— No, grazie. Quant'è?\n— Sono tre euro e cinquanta.\n— Ecco a Lei. Grazie!\n— Grazie a Lei. Buona giornata!",
    transcriptAr:
      "— صباح الخير! ماذا تريد؟\n— صباح الخير! أريد كابتشينو وكرواسون، من فضلك.\n— بالتأكيد. تريد الكرواسون بالكريمة أم بالمربى؟\n— بالكريمة، شكراً.\n— ممتاز. تريد شيئاً آخر؟\n— لا، شكراً. كم الثمن؟\n— ثلاثة يورو وخمسون سنتاً.\n— تفضّل. شكراً!\n— شكراً لك. يوماً سعيداً!",
    questions: [
      { question: "Dove si svolge il dialogo?", questionAr: "أين يدور الحوار؟", options: ["Al ristorante", "Al bar", "A scuola", "In ufficio"], correct: 1 },
      { question: "Cosa ordina il cliente da bere?", questionAr: "ماذا يطلب الزبون للشرب؟", options: ["Un tè", "Un caffè", "Un cappuccino", "Un succo"], correct: 2 },
      { question: "Che tipo di cornetto sceglie?", questionAr: "أي نوع كرواسون يختار؟", options: ["Alla marmellata", "Al cioccolato", "Vuoto", "Alla crema"], correct: 3 },
      { question: "Quanto costa in totale?", questionAr: "كم يكلّف المجموع؟", options: ["2,50 €", "3,50 €", "4,00 €", "3,00 €"], correct: 1 },
      { question: "Il cliente ordina qualcos'altro?", questionAr: "هل يطلب الزبون شيئاً آخر؟", options: ["Sì, un'acqua", "Sì, un panino", "No", "Sì, un dolce"], correct: 2 },
      { question: "Come saluta il barista alla fine?", questionAr: "كيف يودّع النادل في النهاية؟", options: ["Arrivederci", "Buona giornata", "Ciao", "A presto"], correct: 1 },
    ],
  },
  {
    id: 2,
    titleIt: "In stazione — Comprare un biglietto",
    titleAr: "في المحطة — شراء تذكرة",
    level: "A2",
    transcript:
      "— Buongiorno, vorrei un biglietto per Firenze.\n— Andata e ritorno o solo andata?\n— Andata e ritorno, per favore.\n— Per quando?\n— Per domani mattina. C'è un treno alle otto?\n— Sì, c'è un regionale alle 8:15. Arriva a Firenze alle 10:30.\n— Perfetto! Quanto costa?\n— Sono venticinque euro.\n— Posso pagare con la carta?\n— Certo. Ecco il suo biglietto. Buon viaggio!\n— Grazie mille!",
    transcriptAr:
      "— صباح الخير، أريد تذكرة إلى فلورنسا.\n— ذهاب وعودة أم ذهاب فقط؟\n— ذهاب وعودة، من فضلك.\n— لأي وقت؟\n— لصباح الغد. هل يوجد قطار في الثامنة؟\n— نعم، يوجد قطار محلي في 8:15. يصل إلى فلورنسا في 10:30.\n— ممتاز! كم يكلّف؟\n— خمسة وعشرون يورو.\n— هل يمكنني الدفع بالبطاقة؟\n— بالتأكيد. تفضّل تذكرتك. رحلة سعيدة!\n— شكراً جزيلاً!",
    questions: [
      { question: "Dove vuole andare il viaggiatore?", questionAr: "إلى أين يريد المسافر الذهاب؟", options: ["Roma", "Milano", "Firenze", "Napoli"], correct: 2 },
      { question: "Che tipo di biglietto chiede?", questionAr: "أي نوع تذكرة يطلب؟", options: ["Solo andata", "Andata e ritorno", "Abbonamento", "Prima classe"], correct: 1 },
      { question: "A che ora parte il treno?", questionAr: "في أي ساعة يغادر القطار؟", options: ["Alle 8:00", "Alle 8:15", "Alle 9:00", "Alle 10:30"], correct: 1 },
      { question: "A che ora arriva a destinazione?", questionAr: "في أي ساعة يصل إلى الوجهة؟", options: ["Alle 9:30", "Alle 10:00", "Alle 10:30", "Alle 11:00"], correct: 2 },
      { question: "Quanto costa il biglietto?", questionAr: "كم تكلّف التذكرة؟", options: ["15 €", "20 €", "25 €", "30 €"], correct: 2 },
      { question: "Come paga il viaggiatore?", questionAr: "كيف يدفع المسافر؟", options: ["In contanti", "Con la carta", "Con il telefono", "Non paga"], correct: 1 },
    ],
  },
];

export default function Listening() {
  const [selectedActivity, setSelectedActivity] = useState<number | null>(null);
  const [answers, setAnswers] = useState<Record<string, number | null>>({});
  const [submitted, setSubmitted] = useState<Record<number, boolean>>({});
  const [showTranscript, setShowTranscript] = useState<Record<number, boolean>>({});

  const handleAnswer = (actId: number, qIdx: number, optIdx: number) => {
    if (submitted[actId]) return;
    setAnswers((prev) => ({ ...prev, [`${actId}-${qIdx}`]: optIdx }));
  };

  const handleSubmit = (actId: number) => {
    setSubmitted((prev) => ({ ...prev, [actId]: true }));
  };

  const getScore = (activity: ListeningActivity) => {
    let correct = 0;
    activity.questions.forEach((q, idx) => {
      if (answers[`${activity.id}-${idx}`] === q.correct) correct++;
    });
    return correct;
  };

  const allAnswered = (activity: ListeningActivity) => activity.questions.every((_, idx) => answers[`${activity.id}-${idx}`] !== undefined && answers[`${activity.id}-${idx}`] !== null);

  const currentActivity = activities.find((a) => a.id === selectedActivity);

  return (
    <Layout>
      <section className="bg-gradient-to-br from-purple-700 to-purple-900 py-14 text-white">
        <div className="mx-auto max-w-5xl px-4 text-center sm:px-6">
          <h1 className="text-3xl font-bold md:text-5xl">Ascolto</h1>
          <p className="mt-3 text-white/80">Attività di comprensione orale per A1 e A2</p>
          <p className="mt-2 text-sm text-white/70" dir="rtl">أنشطة لفهم المسموع لمستويي A1 و A2</p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        {!currentActivity ? (
          <div className="space-y-4">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-[#1A1A2E] mb-1">Attività di ascolto</h2>
              <p className="text-gray-500" dir="rtl">أنشطة الاستماع</p>
            </div>
            {activities.map((act) => (
              <button key={act.id} onClick={() => setSelectedActivity(act.id)} className="w-full bg-white rounded-2xl shadow-md border border-gray-100 p-5 text-left hover:shadow-lg hover:-translate-y-1 transition-all">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center"><Headphones className="w-6 h-6 text-white" /></div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-bold text-white ${act.level === "A1" ? "bg-[#2E7D32]" : "bg-[#1E3A5F]"}`}>{act.level}</span>
                      <h3 className="font-bold text-[#1A1A2E]">{act.titleIt}</h3>
                    </div>
                    <p className="text-sm text-gray-400" dir="rtl">{act.titleAr}</p>
                  </div>
                  <span className="text-sm text-gray-400">{act.questions.length} domande</span>
                </div>
              </button>
            ))}
          </div>
        ) : (
          <div>
            <button onClick={() => { setSelectedActivity(null); }} className="mb-6 text-purple-600 hover:text-purple-800 font-medium text-sm flex items-center gap-1">← Torna alla lista</button>
            <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 mb-6">
              <div className="flex items-center gap-2 mb-4">
                <span className={`px-2 py-0.5 rounded-full text-xs font-bold text-white ${currentActivity.level === "A1" ? "bg-[#2E7D32]" : "bg-[#1E3A5F]"}`}>{currentActivity.level}</span>
                <h2 className="text-xl font-bold text-[#1A1A2E]">{currentActivity.titleIt}</h2>
              </div>
              <p className="text-sm text-gray-400 mb-4" dir="rtl">{currentActivity.titleAr}</p>

              <div className="bg-purple-50 rounded-xl p-4 mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <Volume2 className="w-5 h-5 text-purple-600" />
                  <span className="font-medium text-purple-700">Leggi il dialogo e rispondi — اقرأ الحوار وأجب</span>
                </div>
                <button onClick={() => setShowTranscript((prev) => ({ ...prev, [currentActivity.id]: !prev[currentActivity.id] }))} className="text-sm text-purple-600 hover:text-purple-800 underline">
                  {showTranscript[currentActivity.id] ? "Nascondi il testo — إخفاء النص" : "Mostra il testo — إظهار النص"}
                </button>
              </div>

              {showTranscript[currentActivity.id] && (
                <div className="bg-gray-50 rounded-xl p-4 mb-4 space-y-3">
                  <p className="text-gray-700 whitespace-pre-line text-sm">{currentActivity.transcript}</p>
                  <hr className="border-gray-200" />
                  <p className="text-gray-500 whitespace-pre-line text-sm" dir="rtl">{currentActivity.transcriptAr}</p>
                </div>
              )}
            </div>

            <div className="space-y-4">
              {currentActivity.questions.map((q, idx) => {
                const key = `${currentActivity.id}-${idx}`;
                const selected = answers[key];
                const isSubmitted = submitted[currentActivity.id];
                return (
                  <div key={idx} className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                    <p className="font-medium text-[#1A1A2E] mb-1">{idx + 1}. {q.question}</p>
                    <p className="text-xs text-gray-400 mb-3" dir="rtl">{q.questionAr}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {q.options.map((opt, optIdx) => {
                        let btnClass = "border-2 rounded-lg px-4 py-2 text-sm font-medium transition-all cursor-pointer text-center ";
                        if (isSubmitted) {
                          if (optIdx === q.correct) btnClass += "border-green-500 bg-green-50 text-green-700";
                          else if (selected === optIdx && optIdx !== q.correct) btnClass += "border-red-500 bg-red-50 text-red-700";
                          else btnClass += "border-gray-200 text-gray-400";
                        } else {
                          if (selected === optIdx) btnClass += "border-purple-500 bg-purple-50 text-purple-700";
                          else btnClass += "border-gray-200 hover:border-purple-300 text-gray-700";
                        }
                        return <button key={optIdx} onClick={() => handleAnswer(currentActivity.id, idx, optIdx)} className={btnClass} disabled={isSubmitted}>{opt}</button>;
                      })}
                    </div>
                    {isSubmitted && selected !== undefined && selected !== null && (
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

            <div className="mt-6 flex items-center justify-between">
              {!submitted[currentActivity.id] ? (
                <button onClick={() => handleSubmit(currentActivity.id)} disabled={!allAnswered(currentActivity)} className="px-6 py-2 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-colors">Controlla le risposte — تحقّق من الإجابات</button>
              ) : (
                <div className="flex items-center gap-2 bg-[#F59E0B]/10 px-4 py-2 rounded-xl">
                  <span className="text-[#F59E0B] font-bold text-lg">★</span>
                  <span className="font-bold text-[#1A1A2E]">{getScore(currentActivity)} / {currentActivity.questions.length}</span>
                  <span className="text-sm text-gray-500" dir="rtl">— النتيجة</span>
                </div>
              )}
            </div>
          </div>
        )}
      </section>
    </Layout>
  );
}
