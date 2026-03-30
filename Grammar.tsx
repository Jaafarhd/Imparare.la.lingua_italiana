import Layout from "@/components/Layout";
import { useState } from "react";
import { CheckCircle, XCircle, ChevronDown, ChevronUp } from "lucide-react";

interface Exercise {
  question: string;
  questionAr: string;
  options: string[];
  correct: number;
}

interface Lesson {
  id: number;
  titleIt: string;
  titleAr: string;
  level: string;
  explanationIt: string;
  explanationAr: string;
  exercises: Exercise[];
}

const lessons: Lesson[] = [
  {
    id: 1,
    titleIt: "Gli articoli determinativi",
    titleAr: "أدوات التعريف",
    level: "A1",
    explanationIt:
      "In italiano, gli articoli determinativi sono: il, lo, la, i, gli, le. Si usano prima dei nomi per indicare qualcosa di specifico.\n\n• il → maschile singolare (il libro)\n• lo → maschile singolare prima di s+consonante, z, gn (lo studente)\n• la → femminile singolare (la casa)\n• i → maschile plurale (i libri)\n• gli → maschile plurale prima di vocale, s+consonante, z (gli studenti)\n• le → femminile plurale (le case)",
    explanationAr:
      "في الإيطالية، أدوات التعريف هي: il, lo, la, i, gli, le. تُستخدم قبل الأسماء للإشارة إلى شيء محدد.",
    exercises: [
      { question: "___ libro è sul tavolo.", questionAr: "الكتاب على الطاولة.", options: ["Il", "La", "Lo", "Le"], correct: 0 },
      { question: "___ studentessa è brava.", questionAr: "الطالبة ذكية.", options: ["Il", "La", "Lo", "Gli"], correct: 1 },
      { question: "___ zaino è nuovo.", questionAr: "الحقيبة جديدة.", options: ["Il", "La", "Lo", "I"], correct: 2 },
      { question: "___ amici sono italiani.", questionAr: "الأصدقاء إيطاليون.", options: ["I", "Le", "Gli", "Lo"], correct: 2 },
      { question: "___ ragazze studiano italiano.", questionAr: "الفتيات يدرسن الإيطالية.", options: ["I", "Le", "Gli", "La"], correct: 1 },
    ],
  },
  {
    id: 2,
    titleIt: "Il presente indicativo (essere e avere)",
    titleAr: "المضارع (فعل يكون وفعل يملك)",
    level: "A1",
    explanationIt:
      "I verbi 'essere' e 'avere' sono fondamentali:\n\nEssere: io sono, tu sei, lui/lei è, noi siamo, voi siete, loro sono\nAvere: io ho, tu hai, lui/lei ha, noi abbiamo, voi avete, loro hanno",
    explanationAr:
      "الفعلان 'essere' (يكون) و 'avere' (يملك) أساسيان في الإيطالية.",
    exercises: [
      { question: "Io ___ italiano.", questionAr: "أنا إيطالي.", options: ["sono", "ho", "sei", "hai"], correct: 0 },
      { question: "Tu ___ un fratello.", questionAr: "لديك أخ.", options: ["sei", "hai", "sono", "ho"], correct: 1 },
      { question: "Lei ___ una studentessa.", questionAr: "هي طالبة.", options: ["ha", "è", "sono", "hanno"], correct: 1 },
      { question: "Noi ___ fame.", questionAr: "نحن جائعون.", options: ["siamo", "abbiamo", "avete", "sono"], correct: 1 },
      { question: "Voi ___ di Roma.", questionAr: "أنتم من روما.", options: ["avete", "siete", "sono", "hanno"], correct: 1 },
    ],
  },
  {
    id: 3,
    titleIt: "Le preposizioni semplici",
    titleAr: "حروف الجر البسيطة",
    level: "A1",
    explanationIt:
      "Le preposizioni semplici italiane sono: di, a, da, in, con, su, per, tra, fra.\n\n• di → possesso (il libro di Marco)\n• a → direzione (vado a Roma)\n• da → provenienza (vengo da Milano)\n• in → luogo (sono in Italia)\n• con → compagnia (vado con Maria)\n• su → posizione (il libro è sul tavolo)",
    explanationAr:
      "حروف الجر البسيطة في الإيطالية: di, a, da, in, con, su, per, tra, fra.",
    exercises: [
      { question: "Vado ___ scuola.", questionAr: "أذهب إلى المدرسة.", options: ["a", "di", "da", "su"], correct: 0 },
      { question: "Vengo ___ Marocco.", questionAr: "أنا من المغرب.", options: ["a", "in", "dal", "di"], correct: 2 },
      { question: "Il libro è ___ tavolo.", questionAr: "الكتاب على الطاولة.", options: ["in", "a", "sul", "di"], correct: 2 },
      { question: "Studio ___ Maria.", questionAr: "أدرس مع ماريا.", options: ["di", "a", "con", "per"], correct: 2 },
      { question: "Questo è il libro ___ Paolo.", questionAr: "هذا كتاب باولو.", options: ["a", "di", "da", "in"], correct: 1 },
    ],
  },
  {
    id: 4,
    titleIt: "Il passato prossimo",
    titleAr: "الماضي القريب",
    level: "A2",
    explanationIt:
      "Il passato prossimo si forma con: ausiliare (essere/avere) + participio passato.\n\n• Ho mangiato\n• Sono andato/a\n\nCon 'avere': ho parlato, hai parlato, ha parlato, abbiamo parlato\nCon 'essere': sono andato/a, sei andato/a, è andato/a, siamo andati/e",
    explanationAr:
      "يتكوّن الماضي القريب من: فعل مساعد (essere/avere) + اسم المفعول.",
    exercises: [
      { question: "Ieri io ___ una pizza.", questionAr: "أمس أكلتُ بيتزا.", options: ["ho mangiato", "sono mangiato", "mangio", "mangiavo"], correct: 0 },
      { question: "Maria ___ a Roma.", questionAr: "ذهبت ماريا إلى روما.", options: ["ha andata", "è andata", "è andato", "ha andato"], correct: 1 },
      { question: "Noi ___ un film.", questionAr: "شاهدنا فيلماً.", options: ["siamo visto", "abbiamo visto", "abbiamo veduto", "siamo veduto"], correct: 1 },
      { question: "Tu ___ tardi.", questionAr: "وصلتَ متأخراً.", options: ["hai arrivato", "sei arrivato", "ho arrivato", "è arrivato"], correct: 1 },
      { question: "Loro ___ in Italia.", questionAr: "عاشوا في إيطاليا.", options: ["hanno vissuto", "sono vissuto", "ha vissuto", "è vissuto"], correct: 0 },
    ],
  },
  {
    id: 5,
    titleIt: "I verbi riflessivi",
    titleAr: "الأفعال الانعكاسية",
    level: "A2",
    explanationIt:
      "I verbi riflessivi usano i pronomi: mi, ti, si, ci, vi, si.\n\nEsempio: svegliarsi → mi sveglio, ti svegli, si sveglia, ci svegliamo, vi svegliate, si svegliano\n\nAltri verbi: lavarsi, vestirsi, chiamarsi, alzarsi, divertirsi.",
    explanationAr:
      "الأفعال الانعكاسية تستخدم الضمائر: mi, ti, si, ci, vi, si.",
    exercises: [
      { question: "Io ___ alle sette.", questionAr: "أستيقظ في السابعة.", options: ["mi sveglio", "ti svegli", "si sveglia", "sveglio"], correct: 0 },
      { question: "Come ___ tu?", questionAr: "ما اسمك؟", options: ["ti chiami", "mi chiamo", "si chiama", "chiami"], correct: 0 },
      { question: "Lei ___ ogni mattina.", questionAr: "هي تغتسل كل صباح.", options: ["mi lavo", "si lava", "ti lavi", "lava"], correct: 1 },
      { question: "Noi ___ molto alla festa.", questionAr: "استمتعنا كثيراً في الحفلة.", options: ["ci divertiamo", "si divertono", "vi divertite", "divertiamo"], correct: 0 },
      { question: "Loro ___ elegantemente.", questionAr: "يرتدون ملابس أنيقة.", options: ["mi vesto", "si vestono", "ci vestiamo", "vestono"], correct: 1 },
    ],
  },
];

export default function Grammar() {
  const [openLesson, setOpenLesson] = useState<number | null>(null);
  const [answers, setAnswers] = useState<Record<string, number | null>>({});
  const [submitted, setSubmitted] = useState<Record<number, boolean>>({});

  const handleAnswer = (lessonId: number, exerciseIdx: number, optionIdx: number) => {
    if (submitted[lessonId]) return;
    setAnswers((prev) => ({ ...prev, [`${lessonId}-${exerciseIdx}`]: optionIdx }));
  };

  const handleSubmit = (lessonId: number) => {
    setSubmitted((prev) => ({ ...prev, [lessonId]: true }));
  };

  const getScore = (lesson: Lesson) => {
    let correct = 0;
    lesson.exercises.forEach((ex, idx) => {
      if (answers[`${lesson.id}-${idx}`] === ex.correct) correct++;
    });
    return correct;
  };

  const allAnswered = (lesson: Lesson) => lesson.exercises.every((_, idx) => answers[`${lesson.id}-${idx}`] !== undefined && answers[`${lesson.id}-${idx}`] !== null);

  return (
    <Layout>
      <section className="bg-gradient-to-br from-[#16324F] to-[#28527A] py-14 text-white">
        <div className="mx-auto max-w-5xl px-4 text-center sm:px-6">
          <h1 className="text-3xl font-bold md:text-5xl">Grammatica</h1>
          <p className="mt-3 text-white/80">Regole, esempi ed esercizi per A1 e A2</p>
          <p className="mt-2 text-sm text-white/70" dir="rtl">قواعد وأمثلة وتمارين لمستويي A1 و A2</p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <div className="space-y-4">
          {lessons.map((lesson) => (
            <div key={lesson.id} className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
              <button onClick={() => setOpenLesson(openLesson === lesson.id ? null : lesson.id)} className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold text-white ${lesson.level === "A1" ? "bg-[#2E7D32]" : "bg-[#1E3A5F]"}`}>{lesson.level}</span>
                  <div>
                    <h3 className="text-lg font-bold text-[#1A1A2E]">{lesson.titleIt}</h3>
                    <p className="text-sm text-gray-400" dir="rtl">{lesson.titleAr}</p>
                  </div>
                </div>
                {openLesson === lesson.id ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
              </button>

              {openLesson === lesson.id && (
                <div className="border-t border-gray-100 p-5">
                  <div className="bg-blue-50 rounded-xl p-4 mb-6">
                    <h4 className="font-bold text-[#1E3A5F] mb-2">Spiegazione — الشرح</h4>
                    <p className="text-gray-700 whitespace-pre-line text-sm mb-3">{lesson.explanationIt}</p>
                    <p className="text-gray-500 text-sm" dir="rtl">{lesson.explanationAr}</p>
                  </div>

                  <h4 className="font-bold text-[#1A1A2E] mb-4">Esercizi — تمارين</h4>
                  <div className="space-y-4">
                    {lesson.exercises.map((ex, idx) => {
                      const key = `${lesson.id}-${idx}`;
                      const selected = answers[key];
                      const isSubmitted = submitted[lesson.id];

                      return (
                        <div key={idx} className="bg-gray-50 rounded-xl p-4">
                          <p className="font-medium text-[#1A1A2E] mb-1">{idx + 1}. {ex.question}</p>
                          <p className="text-xs text-gray-400 mb-3" dir="rtl">{ex.questionAr}</p>
                          <div className="grid grid-cols-2 gap-2">
                            {ex.options.map((opt, optIdx) => {
                              let btnClass = "border-2 rounded-lg px-4 py-2 text-sm font-medium transition-all cursor-pointer text-center ";
                              if (isSubmitted) {
                                if (optIdx === ex.correct) btnClass += "border-green-500 bg-green-50 text-green-700";
                                else if (selected === optIdx && optIdx !== ex.correct) btnClass += "border-red-500 bg-red-50 text-red-700";
                                else btnClass += "border-gray-200 text-gray-400";
                              } else {
                                if (selected === optIdx) btnClass += "border-[#1E3A5F] bg-[#1E3A5F]/10 text-[#1E3A5F]";
                                else btnClass += "border-gray-200 hover:border-[#1E3A5F]/50 text-gray-700";
                              }
                              return (
                                <button key={optIdx} onClick={() => handleAnswer(lesson.id, idx, optIdx)} className={btnClass} disabled={isSubmitted}>{opt}</button>
                              );
                            })}
                          </div>
                          {isSubmitted && selected !== undefined && selected !== null && (
                            <div className="mt-2 flex items-center gap-1 text-sm">
                              {selected === ex.correct ? (
                                <><CheckCircle className="w-4 h-4 text-green-500" /><span className="text-green-600">Corretto! — صحيح!</span></>
                              ) : (
                                <><XCircle className="w-4 h-4 text-red-500" /><span className="text-red-600">Sbagliato — خطأ. La risposta corretta: {ex.options[ex.correct]}</span></>
                              )}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  <div className="mt-6 flex items-center justify-between">
                    {!submitted[lesson.id] ? (
                      <button onClick={() => handleSubmit(lesson.id)} disabled={!allAnswered(lesson)} className="px-6 py-2 bg-[#2E7D32] hover:bg-[#1B5E20] disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-colors">Controlla — تحقّق</button>
                    ) : (
                      <div className="flex items-center gap-2 bg-[#F59E0B]/10 px-4 py-2 rounded-xl">
                        <span className="text-[#F59E0B] font-bold text-lg">★</span>
                        <span className="font-bold text-[#1A1A2E]">{getScore(lesson)} / {lesson.exercises.length}</span>
                        <span className="text-sm text-gray-500" dir="rtl">— النتيجة</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
}
