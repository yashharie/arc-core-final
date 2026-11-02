import { requireAuth } from "@/lib/auth/authorization";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Quizzes — ArcCore" };
export const instant = false;

const ICONS = ["🌐", "⚛️", "📐", "🎨", "🐍", "💼", "🔐", "📊", "🔬", "🏗️"];

export default async function MemberQuizzesPage() {
  const user = await requireAuth();

  const [availableQuizzes, myQuizzes, myAttempts] = await Promise.all([
    // Published quizzes assigned to this member
    prisma.quiz.findMany({
      where: {
        status: "PUBLISHED",
        assignments: { some: { OR: [{ assignedToAll: true }, { userId: user.id }] } },
      },
      orderBy: { createdAt: "desc" },
      include: { _count: { select: { questions: true, attempts: true } } },
    }),
    // Quizzes created by this member
    prisma.quiz.findMany({
      where: { createdById: user.id },
      orderBy: { createdAt: "desc" },
      include: { _count: { select: { questions: true, attempts: true } } },
    }),
    // Member's own attempts
    prisma.attempt.findMany({
      where: { userId: user.id },
      select: { quizId: true, status: true, score: true, totalMarks: true },
    }),
  ]);

  const attemptMap = new Map(myAttempts.map((a) => [a.quizId, a]));

  const statusStyle: Record<string, { bg: string; color: string; label: string }> = {
    DRAFT:     { bg: "rgba(245,200,66,0.12)",  color: "#f5c842", label: "Draft"    },
    PUBLISHED: { bg: "rgba(0,212,170,0.12)",   color: "#00d4aa", label: "Live"     },
    ARCHIVED:  { bg: "rgba(148,184,216,0.08)", color: "#94b8d8", label: "Archived" },
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-extrabold text-white">Quizzes</h1>
          <p className="text-xs text-[#94b8d8] mt-0.5">{availableQuizzes.length} available to take</p>
        </div>
        <Link href="/dashboard/quizzes/new" className="arc-btn text-xs">+ Create Quiz</Link>
      </div>

      {/* ── My Created Quizzes ──────────────────────────────────────── */}
      {myQuizzes.length > 0 && (
        <div className="mb-8">
          <h2 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
            <span style={{ color: "#f5c842" }}>✏️</span> My Created Quizzes
          </h2>
          <div className="space-y-2">
            {myQuizzes.map((q) => {
              const s = statusStyle[q.status] ?? statusStyle.DRAFT;
              return (
                <div key={q.id} className="arc-card px-5 py-3.5 flex items-center gap-4 hover:border-[#4db8ff]/30 transition-colors">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="text-sm font-semibold text-white truncate">{q.title}</p>
                      <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold"
                        style={{ background: s.bg, color: s.color }}>{s.label}</span>
                    </div>
                    <p className="text-xs text-[#4a7098] mt-0.5">
                      {q._count.questions} questions · {q._count.attempts} attempts
                    </p>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    {q.status === "DRAFT" && (
                      <Link href={`/dashboard/quizzes/${q.id}/edit`}
                        className="arc-btn-outline text-xs px-3 py-1.5">Edit</Link>
                    )}
                    {q.status === "PUBLISHED" && (
                      <Link href={`/quizzes/${q.id}/leaderboard`}
                        className="arc-btn-outline text-xs px-3 py-1.5">🏆 Board</Link>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ── Available Quizzes ────────────────────────────────────────── */}
      <div>
        <h2 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
          <span style={{ color: "#4db8ff" }}>📝</span> Available to Take
        </h2>

        {availableQuizzes.length === 0 ? (
          <div className="arc-card p-12 text-center">
            <div className="text-4xl mb-3">📝</div>
            <p className="text-[#94b8d8] text-sm mb-4">No quizzes assigned to you yet.</p>
            <Link href="/dashboard/quizzes/new" className="arc-btn text-xs inline-flex">Create your own quiz</Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {availableQuizzes.map((q, i) => {
              const attempt = attemptMap.get(q.id);
              const done    = attempt?.status === "SUBMITTED";
              const pct     = done && attempt.totalMarks > 0
                ? Math.round((attempt.score / attempt.totalMarks) * 100) : null;

              return (
                <div key={q.id} className="arc-card p-5 flex flex-col gap-4 hover:border-[#4db8ff]/30 transition-colors">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0"
                      style={{ background: "rgba(77,184,255,0.1)", border: "1px solid rgba(77,184,255,0.15)" }}>
                      {ICONS[i % ICONS.length]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-white text-sm">{q.title}</p>
                      <p className="text-xs text-[#94b8d8] mt-0.5">
                        {q._count.questions} questions
                        {q.timeLimitMinutes ? ` · ${q.timeLimitMinutes} min` : ""}
                      </p>
                    </div>
                    {done && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold shrink-0"
                        style={{ background: "rgba(0,212,170,0.12)", color: "#00d4aa" }}>Done</span>
                    )}
                  </div>

                  {pct !== null && (
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-[#94b8d8]">Your score</span>
                        <span className="font-bold" style={{ color: pct >= 70 ? "#00d4aa" : pct >= 50 ? "#f5c842" : "#ff4d6d" }}>
                          {pct}%
                        </span>
                      </div>
                      <div className="arc-progress">
                        <div className="arc-progress-fill" style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                  )}

                  <div className="flex gap-2 mt-auto">
                    {!done ? (
                      <Link href={`/quizzes/${q.id}/take`} className="arc-btn text-xs flex-1 justify-center py-2">
                        Start Quiz →
                      </Link>
                    ) : (
                      <>
                        <Link href={`/quizzes/${q.id}/leaderboard`}
                          className="arc-btn-outline text-xs flex-1 justify-center py-2">
                          🏆 Leaderboard
                        </Link>
                        <span className="arc-btn text-xs flex-1 justify-center py-2 opacity-40 cursor-not-allowed"
                          style={{ pointerEvents: "none" }}>Completed</span>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
