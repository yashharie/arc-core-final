import { Suspense } from "react";
import EditQuizClientPage from "./ClientPage";

export const instant = false;

export default function MemberEditQuizPage() {
  return (
    <Suspense fallback={
      <div className="animate-pulse space-y-4">
        <div className="h-6 w-40 rounded" style={{ background: "rgba(148,184,216,0.1)" }} />
        <div className="rounded-2xl p-5" style={{ background: "#0a1628", border: "1px solid rgba(30,58,110,0.4)", height: 300 }} />
        <div className="rounded-2xl p-5" style={{ background: "#0a1628", border: "1px solid rgba(30,58,110,0.4)", height: 400 }} />
      </div>
    }>
      <EditQuizClientPage />
    </Suspense>
  );
}
