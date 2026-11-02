export default function QuizzesLoading() {
  return (
    <div style={{ background: "#050c1a", minHeight: "100vh" }}>
      <div className="h-14" style={{ background: "rgba(5,12,26,0.95)", borderBottom: "1px solid rgba(30,58,110,0.3)" }} />
      <div className="max-w-5xl mx-auto px-5 pt-8 animate-pulse">
        <div className="flex justify-between mb-8">
          <div><div className="h-7 w-28 rounded mb-1" style={{ background: "rgba(148,184,216,0.1)" }} /><div className="h-3 w-40 rounded" style={{ background: "rgba(148,184,216,0.06)" }} /></div>
        </div>
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="rounded-2xl p-5" style={{ background: "#0a1628", border: "1px solid rgba(30,58,110,0.4)", height: 76 }} />
          ))}
        </div>
      </div>
    </div>
  );
}
