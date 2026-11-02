export default function ExamsLoading() {
  return (
    <div style={{ background: "#050c1a", minHeight: "100vh" }}>
      <div className="h-14" style={{ background: "rgba(5,12,26,0.95)", borderBottom: "1px solid rgba(30,58,110,0.3)" }} />
      <div className="max-w-5xl mx-auto px-5 pt-8 animate-pulse">
        <div className="mb-6"><div className="h-7 w-20 rounded mb-1" style={{ background: "rgba(148,184,216,0.1)" }} /></div>
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (<div key={i} className="rounded-2xl p-6" style={{ background: "#0a1628", border: "1px solid rgba(30,58,110,0.4)", height: 120 }} />))}
        </div>
      </div>
    </div>
  );
}
