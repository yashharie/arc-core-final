export default function LeaderboardLoading() {
  return (
    <div style={{ background: "#050c1a", minHeight: "100vh" }}>
      <div className="h-14" style={{ background: "rgba(5,12,26,0.95)", borderBottom: "1px solid rgba(30,58,110,0.3)" }} />
      <div className="max-w-2xl mx-auto px-5 pt-8 animate-pulse">
        <div className="text-center mb-8"><div className="h-7 w-44 rounded mx-auto mb-2" style={{ background: "rgba(148,184,216,0.1)" }} /><div className="h-3 w-64 rounded mx-auto" style={{ background: "rgba(148,184,216,0.06)" }} /></div>
        <div className="rounded-2xl overflow-hidden" style={{ background: "#0a1628", border: "1px solid rgba(30,58,110,0.4)" }}>
          <div className="h-10" style={{ background: "rgba(30,58,110,0.25)" }} />
          {[...Array(6)].map((_, i) => (<div key={i} className="h-14" style={{ borderBottom: "1px solid rgba(30,58,110,0.15)", background: i % 2 === 0 ? "transparent" : "rgba(10,22,40,0.2)" }} />))}
        </div>
      </div>
    </div>
  );
}
