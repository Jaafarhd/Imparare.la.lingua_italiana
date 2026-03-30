import Layout from "@/components/Layout";
import { useState } from "react";
import { CheckCircle, XCircle, BookText } from "lucide-react";

interface ReadingQuestion {
  question: string;
  questionAr: string;
  options: string[];
  correct: number;
}

interface ReadingPassage {
  id: number;
  titleIt: string;
  titleAr: string;
  level: string;
  text: string;
  textAr: string;
  questions: ReadingQuestion[];
}

const passages: ReadingPassage[] = [
  {
    id: 1,
    titleIt: "La mia giornata",
    titleAr: "يومي",
    level: "A1",
    text: "Mi chiamo Giulia e ho ventidue anni. Abito a Roma con la mia famiglia. Ogni mattina mi sveglio alle sette. Faccio colazione con un caffè e un cornetto. Poi vado all'università in autobus. Le lezioni cominciano alle nove. A mezzogiorno pranzo alla mensa con i miei amici. Il pomeriggio studio in biblioteca. La sera torno a casa, ceno con la famiglia e guardo un po' di televisione. Vado a dormire alle undici.",
    textAr: "اسمي جوليا وعمري اثنان وعشرون عاماً. أسكن في روما مع عائلتي. كل صباح أستيقظ في السابعة. أتناول الفطور مع قهوة وكرواسون. ثم أذهب إلى الجامعة بالحافلة. تبدأ الدروس في التاسعة. في الظهيرة أتناول الغداء في المطعم الجامعي مع أصدقائي. بعد الظهر أدرس في المكتبة. في المساء أعود إلى البيت، أتعشى مع العائلة وأشاهد قليلاً من التلفزيون. أذهب للنوم في الحادية عشرة.",
    questions: [
      { question: "Quanti anni ha Giulia?", questionAr: "كم عمر جوليا؟", options: ["20 anni", "21 anni", "22 anni", "23 anni"], correct: 2 },
      { question: "Dove abita Giulia?", questionAr: "أين تسكن جوليا؟", options: ["A Milano", "A Roma", "A Firenze", "A Napoli"], correct: 1 },
      { question: "Come va all'università?", questionAr: "كيف تذهب إلى الجامعة؟", options: ["In treno", "A piedi", "In autobus", "In macchina"], correct: 2 },
      { question: "Dove pranza Giulia?", questionAr: "أين تتناول جوليا الغداء؟", options: ["A casa", "Al bar", "Alla mensa", "Al ristorante"], correct: 2 },
      { question: "Cosa fa il pomeriggio?", questionAr: "ماذا تفعل بعد الظهر؟", options: ["Lavora", "Studia in biblioteca", "Fa sport", "Dorme"], correct: 1 },
      { question: "A che ora va a dormire?", questionAr: "في أي ساعة تذهب للنوم؟", options: ["Alle dieci", "Alle undici", "A mezzanotte", "Alle nove"], correct: 1 },
    ],
  },
  {
    id: 2,
    titleIt: "Una vacanza in Sicilia",
    titleAr: "عطلة في صقلية",
    level: "A2",
    text: "L'estate scorsa sono andato in Sicilia con la mia ragazza. Siamo partiti da Milano in aereo e siamo arrivati a Catania. Abbiamo affittato una macchina e abbiamo visitato molti posti bellissimi. Il primo giorno siamo andati a Taormina, dove abbiamo visto il teatro greco antico. Poi abbiamo visitato Siracusa e le sue rovine. Abbiamo mangiato tanti piatti tipici: arancini, pasta alla norma e cannoli siciliani. Il mare era fantastico, con acqua cristallina. Siamo rimasti una settimana e ci siamo divertiti moltissimo. Voglio tornare in Sicilia il prossimo anno!",
    textAr: "في الصيف الماضي ذهبتُ إلى صقلية مع صديقتي. سافرنا من ميلانو بالطائرة ووصلنا إلى كاتانيا. استأجرنا سيارة وزرنا أماكن جميلة كثيرة. في اليوم الأول ذهبنا إلى تاورمينا حيث رأينا المسرح اليوناني القديم. ثم زرنا سيراكوزا وآثارها. أكلنا أطباقاً تقليدية كثيرة: أرانشيني، باستا ألا نورما وكانولي صقلية. كان البحر رائعاً بمياه صافية. بقينا أسبوعاً واستمتعنا كثيراً. أريد العودة إلى صقلية العام القادم!",
    questions: [
      { question: "Con chi è andato in Sicilia?", questionAr: "مع من ذهب إلى صقلية؟", options: ["Con gli amici", "Con la famiglia", "Con la ragazza", "Da solo"], correct: 2 },
      { question: "Come sono arrivati a Catania?", questionAr: "كيف وصلوا إلى كاتانيا؟", options: ["In treno", "In macchina", "In nave", "In aereo"], correct: 3 },
      { question: "Cosa hanno visto a Taormina?", questionAr: "ماذا رأوا في تاورمينا؟", options: ["Un museo", "Il teatro greco", "Una chiesa", "Un castello"], correct: 1 },
      { question: "Quale piatto NON è menzionato?", questionAr: "أي طبق لم يُذكر؟", options: ["Arancini", "Cannoli", "Pizza", "Pasta alla norma"], correct: 2 },
      { question: "Quanto tempo sono rimasti?", questionAr: "كم من الوقت بقوا؟", options: ["Tre giorni", "Cinque giorni", "Una settimana", "Due settimane"], correct: 2 },
      { question: "Vuole tornare in Sicilia?", questionAr: "هل يريد العودة إلى صقلية؟", options: ["No", "Forse", "Sì, il prossimo anno", "Non sa"], correct: 2 },
    ],
  },
];

export default function Reading() {
  const [selectedPassage, setSelectedPassage] = useState<number | null>(null);
  const [answers, setAnswers] = useState<Record<string, number | null>>({});
  const [submitted, setSubmitted] = useState<Record<number, boolean>>({});

  const handleAnswer = (passId: number, qIdx: number, optIdx: number) => {
    if (submitted[passId]) return;
    setAnswers((prev) => ({ ...prev, [`${passId}-${qIdx}`]: optIdx }));
  };

  const handleSubmit = (passId: number) => {
    setSubmitted((prev) => ({ ...prev, [passId]: true }));
  };

  const getScore = (passage: ReadingPassage) => {
    let correct = 0;
    passage.questions.forEach((q, idx) => {
      if (answers[`${passage.id}-${idx}`] === q.correct) correct++;
    });
    return correct;
  };

  const allAnswered = (passage: ReadingPassage) => passage.questions.every((_, idx) => answers[`${passage.id}-${idx}`] !== undefined && answers[`${passage.id}-${idx}`] !== null);

  const currentPassage = passages.find((p) => p.id === selectedPassage);

  return (
    <Layout>
      <section className="bg-gradient-to-br from-green-700 to-green-900 py-14 text-white">
        <div className="mx-auto max-w-5xl px-4 text-center sm:px-6">
          <h1 className="text-3xl font-bold md:text-5xl">Lettura</h1>
          <p className="mt-3 text-white/80">Testi di lettura con domande di comprensione</p>
          <p className="mt-2 text-sm text-white/70" dir="rtl">نصوص القراءة مع أسئلة الفهم</p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        {!currentPassage ? (
          <div className="space-y-4">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-[#1A1A2E] mb-1">Testi di lettura</h2>
              <p className="text-gray-500" dir="rtl">نصوص القراءة</p>
            </div>
            {passages.map((p) => (
              <button key={p.id} onClick={() => setSelectedPassage(p.id)} className="w-full bg-white rounded-2xl shadow-md border border-gray-100 p-5 text-left hover:shadow-lg hover:-translate-y-1 transition-all">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-green-700 flex items-center justify-center"><BookText className="w-6 h-6 text-white" /></div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-bold text-white ${p.level === "A1" ? "bg-[#2E7D32]" : "bg-[#1E3A5F]"}`}>{p.level}</span>
                      <h3 className="font-bold text-[#1A1A2E]">{p.titleIt}</h3>
                    </div>
                    <p className="text-sm text-gray-400" dir="rtl">{p.titleAr}</p>
                  </div>
                  <span className="text-sm text-gray-400">{p.questions.length} domande</span>
                </div>
              </button>
            ))}
          </div>
        ) : (
          <div>
            <button onClick={() => setSelectedPassage(null)} className="mb-6 text-green-600 hover:text-green-800 font-medium text-sm flex items-center gap-1">← Torna alla lista</button>
            <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 mb-6">
              <div className="flex items-center gap-2 mb-4">
                <span className={`px-2 py-0.5 rounded-full text-xs font-bold text-white ${currentPassage.level === "A1" ? "bg-[#2E7D32]" : "bg-[#1E3A5F]"}`}>{currentPassage.level}</span>
                <h2 className="text-xl font-bold text-[#1A1A2E]">{currentPassage.titleIt}</h2>
              </div>

              <div className="bg-green-50 rounded-xl p-5 mb-4"><p className="text-gray-800 leading-relaxed text-base">{currentPassage.text}</p></div>
              <div className="bg-gray-50 rounded-xl p-5"><p className="text-gray-600 leading-relaxed text-sm" dir="rtl">{currentPassage.textAr}</p></div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-bold text-[#1A1A2E]">Domande di comprensione — أسئلة الفهم</h3>
              {currentPassage.questions.map((q, idx) => {
                const key = `${currentPassage.id}-${idx}`;
                const selected = answers[key];
                const isSubmitted = submitted[currentPassage.id];
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
                          if (selected === optIdx) btnClass += "border-green-500 bg-green-50 text-green-700";
                          else btnClass += "border-gray-200 hover:border-green-300 text-gray-700";
                        }
                        return <button key={optIdx} onClick={() => handleAnswer(currentPassage.id, idx, optIdx)} className={btnClass} disabled={isSubmitted}>{opt}</button>;
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
              {!submitted[currentPassage.id] ? (
                <button onClick={() => handleSubmit(currentPassage.id)} disabled={!allAnswered(currentPassage)} className="px-6 py-2 bg-[#2E7D32] hover:bg-[#1B5E20] disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-colors">Controlla le risposte — تحقّق من الإجابات</button>
              ) : (
                <div className="flex items-center gap-2 bg-[#F59E0B]/10 px-4 py-2 rounded-xl">
                  <span className="text-[#F59E0B] font-bold text-lg">★</span>
                  <span className="font-bold text-[#1A1A2E]">{getScore(currentPassage)} / {currentPassage.questions.length}</span>
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
