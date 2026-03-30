import Layout from "@/components/Layout";
import { useState } from "react";
import { PenTool, CheckCircle } from "lucide-react";

interface WritingTask {
  id: number;
  titleIt: string;
  titleAr: string;
  level: string;
  promptIt: string;
  promptAr: string;
  hints: string[];
  minWords: number;
}

const tasks: WritingTask[] = [
  {
    id: 1,
    titleIt: "Presentati",
    titleAr: "قدّم نفسك",
    level: "A1",
    promptIt: "Scrivi un breve testo per presentarti. Includi: il tuo nome, la tua età, dove abiti, cosa fai (studente/lavoratore) e cosa ti piace fare nel tempo libero.",
    promptAr: "اكتب نصاً قصيراً لتقديم نفسك. أضف: اسمك، عمرك، أين تسكن، ماذا تفعل (طالب/عامل) وماذا تحب أن تفعل في وقت الفراغ.",
    hints: ["Mi chiamo...", "Ho ... anni.", "Abito a...", "Sono studente/studentessa.", "Mi piace..."],
    minWords: 30,
  },
  {
    id: 2,
    titleIt: "La mia famiglia",
    titleAr: "عائلتي",
    level: "A1",
    promptIt: "Descrivi la tua famiglia. Quante persone ci sono? Come si chiamano? Quanti anni hanno? Cosa fanno?",
    promptAr: "صِف عائلتك. كم شخصاً فيها؟ ما أسماؤهم؟ كم أعمارهم؟ ماذا يفعلون؟",
    hints: ["La mia famiglia è composta da...", "Mio padre si chiama...", "Mia madre lavora come...", "Ho un fratello/una sorella..."],
    minWords: 40,
  },
  {
    id: 3,
    titleIt: "Una giornata speciale",
    titleAr: "يوم مميّز",
    level: "A2",
    promptIt: "Racconta una giornata speciale che hai vissuto. Dove sei andato/a? Con chi? Cosa hai fatto? Come ti sei sentito/a?",
    promptAr: "احكِ عن يوم مميّز عشته. أين ذهبت؟ مع من؟ ماذا فعلت؟ كيف شعرت؟",
    hints: ["La settimana scorsa...", "Sono andato/a a...", "Ho visitato...", "Mi sono divertito/a molto.", "È stata un'esperienza bellissima."],
    minWords: 50,
  },
  {
    id: 4,
    titleIt: "Una lettera a un amico",
    titleAr: "رسالة إلى صديق",
    level: "A2",
    promptIt: "Scrivi una lettera informale a un amico italiano. Raccontagli delle tue vacanze, invitalo a visitare il tuo paese e suggerisci attività da fare insieme.",
    promptAr: "اكتب رسالة غير رسمية إلى صديق إيطالي. أخبره عن عطلتك، وادعُه لزيارة بلدك واقترح أنشطة للقيام بها معاً.",
    hints: ["Caro/Cara...", "Come stai?", "Ti scrivo per raccontarti...", "Ti invito a...", "Possiamo...", "Un abbraccio!"],
    minWords: 60,
  },
];

export default function Writing() {
  const [selectedTask, setSelectedTask] = useState<number | null>(null);
  const [texts, setTexts] = useState<Record<number, string>>({});
  const [submittedTasks, setSubmittedTasks] = useState<Record<number, boolean>>({});

  const currentTask = tasks.find((t) => t.id === selectedTask);

  const wordCount = (text: string) => text.trim().split(/\s+/).filter(Boolean).length;

  const handleSubmit = (taskId: number) => {
    setSubmittedTasks((prev) => ({ ...prev, [taskId]: true }));
  };

  return (
    <Layout>
      <section className="relative h-48 md:h-64 overflow-hidden bg-gradient-to-br from-orange-500 to-orange-700">
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4">
          <PenTool className="w-12 h-12 mb-3 opacity-80" />
          <h1 className="text-3xl md:text-5xl font-bold mb-2">Scrittura</h1>
          <p className="text-lg opacity-80" dir="rtl">الكتابة</p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        {!currentTask ? (
          <div className="space-y-4">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-[#1A1A2E] mb-1">Compiti di scrittura</h2>
              <p className="text-gray-500" dir="rtl">مهام الكتابة</p>
            </div>
            {tasks.map((task) => (
              <button key={task.id} onClick={() => setSelectedTask(task.id)} className="w-full bg-white rounded-2xl shadow-md border border-gray-100 p-5 text-left hover:shadow-lg hover:-translate-y-1 transition-all">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-orange-700 flex items-center justify-center"><PenTool className="w-6 h-6 text-white" /></div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-bold text-white ${task.level === "A1" ? "bg-[#2E7D32]" : "bg-[#1E3A5F]"}`}>{task.level}</span>
                      <h3 className="font-bold text-[#1A1A2E]">{task.titleIt}</h3>
                    </div>
                    <p className="text-sm text-gray-400" dir="rtl">{task.titleAr}</p>
                  </div>
                  {submittedTasks[task.id] && <CheckCircle className="w-6 h-6 text-green-500" />}
                </div>
              </button>
            ))}
          </div>
        ) : (
          <div>
            <button onClick={() => setSelectedTask(null)} className="mb-6 text-orange-600 hover:text-orange-800 font-medium text-sm flex items-center gap-1">← Torna alla lista</button>
            <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 mb-6">
              <div className="flex items-center gap-2 mb-4">
                <span className={`px-2 py-0.5 rounded-full text-xs font-bold text-white ${currentTask.level === "A1" ? "bg-[#2E7D32]" : "bg-[#1E3A5F]"}`}>{currentTask.level}</span>
                <h2 className="text-xl font-bold text-[#1A1A2E]">{currentTask.titleIt}</h2>
              </div>

              <div className="bg-orange-50 rounded-xl p-4 mb-4">
                <p className="text-gray-800 mb-2">{currentTask.promptIt}</p>
                <p className="text-gray-500 text-sm" dir="rtl">{currentTask.promptAr}</p>
              </div>

              <div className="mb-4">
                <h4 className="font-medium text-gray-700 mb-2">Suggerimenti utili — اقتراحات مفيدة:</h4>
                <div className="flex flex-wrap gap-2">
                  {currentTask.hints.map((hint, i) => <span key={i} className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm italic">{hint}</span>)}
                </div>
              </div>

              <div className="relative">
                <textarea
                  value={texts[currentTask.id] || ""}
                  onChange={(e) => setTexts((prev) => ({ ...prev, [currentTask.id]: e.target.value }))}
                  placeholder="Scrivi qui il tuo testo..."
                  className="w-full h-48 p-4 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none resize-none text-gray-800 transition-colors"
                  disabled={submittedTasks[currentTask.id]}
                />
                <div className="absolute bottom-3 right-3 text-xs text-gray-400">{wordCount(texts[currentTask.id] || "")} / {currentTask.minWords} parole minime</div>
              </div>

              <div className="mt-4 flex items-center justify-between">
                {!submittedTasks[currentTask.id] ? (
                  <button onClick={() => handleSubmit(currentTask.id)} disabled={wordCount(texts[currentTask.id] || "") < currentTask.minWords} className="px-6 py-2 bg-orange-600 hover:bg-orange-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-colors">Invia</button>
                ) : (
                  <div className="flex items-center gap-2 bg-green-50 px-4 py-2 rounded-xl"><CheckCircle className="w-5 h-5 text-green-500" /><span className="text-green-700 font-medium">Testo inviato con successo</span></div>
                )}
              </div>
            </div>
          </div>
        )}
      </section>
    </Layout>
  );
}
