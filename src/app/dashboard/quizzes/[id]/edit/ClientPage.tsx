"use client";

import { useCallback, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

type QType = "MCQ" | "TRUE_FALSE" | "DROPDOWN" | "FILL_BLANK" | "MATCHING";
type Question = { id: string; type: string; text: string; marks: number; order: number };
type Quiz     = { id: string; title: string; status: string; questions: Question[] };

const BLANK      = "___";
const emptyPairs = () => [{ left:"",right:"" },{ left:"",right:"" },{ left:"",right:"" },{ left:"",right:"" }];

export default function MemberEditQuizPage() {
  const { id }  = useParams<{ id: string }>();
  const router  = useRouter();
  const [quiz,         setQuiz]         = useState<Quiz | null>(null);
  const [error,        setError]        = useState("");
  const [type,         setType]         = useState<QType>("MCQ");
  const [text,         setText]         = useState("");
  const [marks,        setMarks]        = useState("1");
  const [choices,      setChoices]      = useState(["","","",""]);
  const [correct,      setCorrect]      = useState(0);
  const [tfValue,      setTfValue]      = useState(true);
  const [caseSensitive,setCaseSensitive]= useState(false);
  const [blankAnswers, setBlankAnswers] = useState<string[]>([]);
  const [pairs,        setPairs]        = useState(emptyPairs());

  const blankCount = text.split(BLANK).length - 1;

  const load = useCallback(async () => {
    const res  = await fetch(`/api/quizzes/${id}`);
    const data = await res.json();
    if (!res.ok) { setError(data.error || "Failed to load quiz."); return; }
    setQuiz(data.quiz);
  }, [id]);

  useEffect(() => { load(); }, [load]);

  function showError(data: { error?: string; issues?: { message: string }[] }) {
    setError(data.issues?.map((i) => i.message).join(", ") || data.error || "Something went wrong.");
  }

  function resetForm() {
    setText(""); setChoices(["","","",""]); setCorrect(0); setBlankAnswers([]); setPairs(emptyPairs());
  }

  function buildBody(): Record<string, unknown> {
    const base = { type, text, marks: Number(marks) || 1 };
    if (type === "MCQ" || type === "DROPDOWN") {
      const options = choices.map((c,i) => ({ id: String.fromCharCode(97+i), text: c.trim() })).filter(c => c.text);
      return { ...base, options, correctAnswer: { optionId: String.fromCharCode(97+correct) } };
    }
    if (type === "TRUE_FALSE")  return { ...base, correctAnswer: { value: tfValue } };
    if (type === "FILL_BLANK") {
      const blanks = Array.from({ length: blankCount }, (_,i) =>
        (blankAnswers[i]??"").split(",").map(s=>s.trim()).filter(Boolean));
      return { ...base, options: { caseSensitive }, correctAnswer: { blanks } };
    }
    const left: { id:string;text:string }[] = [], right: { id:string;text:string }[] = [], correctPairs: { left:string;right:string }[] = [];
    pairs.forEach((p,i) => {
      if (p.left.trim() && p.right.trim()) {
        left.push({ id:`l${i+1}`, text:p.left.trim() });
        right.push({ id:`r${i+1}`, text:p.right.trim() });
        correctPairs.push({ left:`l${i+1}`, right:`r${i+1}` });
      }
    });
    return { ...base, options: { left, right }, correctAnswer: { pairs: correctPairs } };
  }

  async function addQuestion() {
    setError("");
    const res  = await fetch(`/api/quizzes/${id}/questions`, { method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify(buildBody()) });
    const data = await res.json();
    if (!res.ok) return showError(data);
    resetForm(); load();
  }

  async function deleteQuestion(qid: string) {
    const res  = await fetch(`/api/quizzes/${id}/questions/${qid}`, { method:"DELETE" });
    if (!res.ok) return showError(await res.json());
    load();
  }

  async function publish() {
    setError("");
    const res  = await fetch(`/api/quizzes/${id}/publish`, { method:"POST" });
    const data = await res.json();
    if (!res.ok) return showError(data);
    router.push("/dashboard/quizzes");
  }

  if (!quiz) return (
    <div className="text-center py-16">
      {error ? <p className="text-xs" style={{ color: "#ff4d6d" }}>{error}</p> : <p className="text-[#94b8d8] text-sm">Loading quiz…</p>}
    </div>
  );

  const typeLabels: Record<QType,string> = { MCQ:"Multiple Choice", TRUE_FALSE:"True / False", DROPDOWN:"Dropdown", FILL_BLANK:"Fill in the Blank", MATCHING:"Matching" };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <Link href="/dashboard/quizzes" className="text-xs text-[#4db8ff] hover:underline">← Quizzes</Link>
          <span className="text-[#4a7098]">/</span>
          <div>
            <h1 className="text-lg font-extrabold text-white">{quiz.title}</h1>
            <p className="text-xs text-[#94b8d8]">
              <span className={quiz.status === "DRAFT" ? "text-[#f5c842]" : "text-[#00d4aa]"}>{quiz.status}</span>
              {" · "}{quiz.questions.length} question{quiz.questions.length !== 1 ? "s" : ""}
            </p>
          </div>
        </div>
        {quiz.status === "DRAFT" && (
          <button onClick={publish} className="arc-btn text-xs px-5">Publish Quiz ✓</button>
        )}
      </div>

      {/* Question list */}
      {quiz.questions.length > 0 && (
        <div className="arc-card overflow-hidden mb-6">
          {quiz.questions.map((q) => (
            <div key={q.id} className="flex items-center justify-between px-5 py-3"
              style={{ borderBottom: "1px solid rgba(30,58,110,0.2)" }}>
              <span className="text-xs text-white flex-1 min-w-0">
                <span className="text-[#4a7098] mr-2">{q.order}.</span>
                <span className="truncate">{q.text}</span>
                <span className="ml-2 text-[#4a7098]">({q.type}, {q.marks}m)</span>
              </span>
              {quiz.status === "DRAFT" && (
                <button onClick={() => deleteQuestion(q.id)}
                  className="ml-4 shrink-0 text-xs hover:underline" style={{ color: "#ff4d6d" }}>
                  Delete
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Add question form */}
      {quiz.status === "DRAFT" && (
        <div className="arc-card p-6 space-y-4">
          <h2 className="text-sm font-bold text-white">Add Question</h2>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#94b8d8] mb-1.5">Type</label>
              <select className="arc-input" value={type} onChange={(e) => setType(e.target.value as QType)}>
                {(Object.keys(typeLabels) as QType[]).map((t) => (
                  <option key={t} value={t}>{typeLabels[t]}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#94b8d8] mb-1.5">Marks</label>
              <input type="number" min={1} className="arc-input" value={marks} onChange={(e) => setMarks(e.target.value)} />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#94b8d8] mb-1.5">Question Text</label>
            <input className="arc-input"
              placeholder={type === "FILL_BLANK" ? "e.g. The capital of France is ___." : "Question text"}
              value={text} onChange={(e) => setText(e.target.value)} />
          </div>

          {(type === "MCQ" || type === "DROPDOWN") && (
            <div className="space-y-2">
              <p className="text-xs text-[#94b8d8]">Select the radio button next to the correct option.</p>
              {choices.map((c,i) => (
                <div key={i} className="flex items-center gap-2">
                  <input type="radio" name="correct" checked={correct===i} onChange={() => setCorrect(i)} className="accent-[#4db8ff]" />
                  <input className="arc-input flex-1" placeholder={`Option ${i+1}`} value={c}
                    onChange={(e) => setChoices(choices.map((x,j) => j===i ? e.target.value : x))} />
                </div>
              ))}
            </div>
          )}

          {type === "TRUE_FALSE" && (
            <div className="flex gap-6">
              {[true,false].map((v) => (
                <label key={String(v)} className="flex items-center gap-2 text-xs text-white cursor-pointer">
                  <input type="radio" name="tf" checked={tfValue===v} onChange={() => setTfValue(v)} className="accent-[#4db8ff]" />
                  {v ? "True" : "False"}
                </label>
              ))}
            </div>
          )}

          {type === "FILL_BLANK" && (
            <div className="space-y-2">
              <p className="text-xs text-[#94b8d8]">Use ___ for each blank. Blanks: {blankCount}</p>
              {Array.from({ length: blankCount }, (_,i) => (
                <input key={i} className="arc-input"
                  placeholder={`Blank ${i+1} accepted answers (comma-separated)`}
                  value={blankAnswers[i]??""}
                  onChange={(e) => { const n=[...blankAnswers]; n[i]=e.target.value; setBlankAnswers(n); }} />
              ))}
              <label className="flex items-center gap-2 text-xs text-[#94b8d8] cursor-pointer">
                <input type="checkbox" checked={caseSensitive} onChange={(e) => setCaseSensitive(e.target.checked)} />
                Case sensitive
              </label>
            </div>
          )}

          {type === "MATCHING" && (
            <div className="space-y-2">
              <p className="text-xs text-[#94b8d8]">Each row is a correct pair.</p>
              {pairs.map((p,i) => (
                <div key={i} className="flex gap-2">
                  <input className="arc-input flex-1" placeholder={`Left ${i+1}`} value={p.left}
                    onChange={(e) => setPairs(pairs.map((x,j) => j===i ? {...x,left:e.target.value} : x))} />
                  <input className="arc-input flex-1" placeholder={`Right ${i+1}`} value={p.right}
                    onChange={(e) => setPairs(pairs.map((x,j) => j===i ? {...x,right:e.target.value} : x))} />
                </div>
              ))}
            </div>
          )}

          {error && (
            <div className="rounded-xl px-4 py-3 text-xs" style={{ background:"rgba(255,77,109,0.1)", border:"1px solid rgba(255,77,109,0.2)", color:"#ff8099" }}>
              {error}
            </div>
          )}

          <button onClick={addQuestion} className="arc-btn text-xs px-5">+ Add Question</button>
        </div>
      )}
    </div>
  );
}
