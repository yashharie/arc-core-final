"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function MemberNewQuizPage() {
  const router = useRouter();
  const [title,       setTitle]       = useState("");
  const [description, setDescription] = useState("");
  const [timeLimit,   setTimeLimit]   = useState("");
  const [deadline,    setDeadline]    = useState("");
  const [error,       setError]       = useState("");
  const [loading,     setLoading]     = useState(false);

  async function handleSubmit() {
    if (!title.trim()) { setError("Title is required."); return; }
    setError(""); setLoading(true);

    const res = await fetch("/api/quizzes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        description: description || undefined,
        timeLimitMinutes: timeLimit ? Number(timeLimit) : undefined,
        deadline: deadline ? new Date(deadline).toISOString() : undefined,
      }),
    });
    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setError(data.issues?.map((i: { message: string }) => i.message).join(", ") || data.error || "Something went wrong.");
      return;
    }
    // Go to edit page inside dashboard layout
    router.push(`/dashboard/quizzes/${data.quiz.id}/edit`);
  }

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <Link href="/dashboard/quizzes" className="text-xs text-[#4db8ff] hover:underline">← Quizzes</Link>
        <span className="text-[#4a7098]">/</span>
        <h1 className="text-xl font-extrabold text-white">Create New Quiz</h1>
      </div>

      <div className="max-w-xl">
        <div className="arc-card p-7 space-y-5">
          <div>
            <label className="block text-xs font-semibold text-[#94b8d8] mb-1.5">
              Title <span className="text-[#ff4d6d]">*</span>
            </label>
            <input className="arc-input" placeholder="e.g. JavaScript Fundamentals Quiz"
              value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#94b8d8] mb-1.5">Description</label>
            <textarea rows={3} className="arc-input resize-none" placeholder="What is this quiz about?"
              value={description} onChange={(e) => setDescription(e.target.value)} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#94b8d8] mb-1.5">Time Limit (minutes)</label>
              <input type="number" min={1} className="arc-input" placeholder="e.g. 30"
                value={timeLimit} onChange={(e) => setTimeLimit(e.target.value)} />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#94b8d8] mb-1.5">Deadline</label>
              <input type="datetime-local" className="arc-input"
                value={deadline} onChange={(e) => setDeadline(e.target.value)} />
            </div>
          </div>

          {error && (
            <div className="rounded-xl px-4 py-3 text-xs" style={{ background: "rgba(255,77,109,0.1)", border: "1px solid rgba(255,77,109,0.2)", color: "#ff8099" }}>
              {error}
            </div>
          )}

          <button onClick={handleSubmit} disabled={loading} className="arc-btn w-full justify-center py-2.5">
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                Creating…
              </span>
            ) : "Create Quiz & Add Questions →"}
          </button>
        </div>
      </div>
    </div>
  );
}
