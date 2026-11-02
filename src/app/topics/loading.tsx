export default function TopicsLoading() {
  return (
    <div style={{ background: "#050c1a", minHeight: "100vh" }}>
      <div className="h-14" style={{ background: "rgba(5,12,26,0.95)", borderBottom: "1px solid rgba(30,58,110,0.3)" }} />
      <div className="max-w-6xl mx-auto px-5 pt-8 animate-pulse">
        <div className="flex justify-between mb-8">
          <div><div className="h-7 w-24 rounded mb-1" style={{ background: "rgba(148,184,216,0.1)" }} /><div className="h-3 w-44 rounded" style={{ background: "rgba(148,184,216,0.06)" }} /></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="rounded-2xl overflow-hidden" style={{ background: "#0a1628", border: "1px solid rgba(30,58,110,0.4)" }}>
              <div className="h-28" style={{ background: "rgba(30,58,110,0.3)" }} />
              <div className="p-4"><div className="h-4 w-3/4 rounded mb-2" style={{ background: "rgba(148,184,216,0.1)" }} /><div className="h-8 rounded-full mt-3" style={{ background: "rgba(77,184,255,0.08)" }} /></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
