export default function Loading() {
  return (
    <div className="animate-pulse">
      <div className="mb-6">
        <div className="h-6 w-32 rounded mb-1" style={{ background: "rgba(148,184,216,0.12)" }} />
        <div className="h-3 w-44 rounded" style={{ background: "rgba(148,184,216,0.07)" }} />
      </div>
      {/* Podium */}
      <div className="flex items-end justify-center gap-4 mb-8">
        {[52, 80, 40].map((h, i) => (
          <div key={i} className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 rounded-full" style={{ background: "rgba(30,58,110,0.4)" }} />
            <div className="h-3 w-16 rounded" style={{ background: "rgba(148,184,216,0.08)" }} />
            <div className="w-14 rounded-t-xl" style={{ height: h, background: "rgba(30,58,110,0.3)" }} />
          </div>
        ))}
      </div>
      {/* Table */}
      <div className="rounded-2xl overflow-hidden" style={{ background: "#0a1628", border: "1px solid rgba(30,58,110,0.4)" }}>
        <div className="h-10" style={{ background: "rgba(30,58,110,0.25)" }} />
        {[...Array(6)].map((_, i) => (
          <div key={i} className="flex items-center gap-4 px-5 py-3" style={{ borderBottom: "1px solid rgba(30,58,110,0.15)" }}>
            <div className="h-4 w-6 rounded" style={{ background: "rgba(148,184,216,0.08)" }} />
            <div className="w-7 h-7 rounded-full" style={{ background: "rgba(30,58,110,0.4)" }} />
            <div className="h-3 flex-1 rounded" style={{ background: "rgba(148,184,216,0.08)" }} />
            <div className="h-3 w-8 rounded" style={{ background: "rgba(148,184,216,0.08)" }} />
            <div className="h-4 w-10 rounded" style={{ background: "rgba(77,184,255,0.1)" }} />
            <div className="h-1.5 w-20 rounded-full" style={{ background: "rgba(30,58,110,0.4)" }} />
          </div>
        ))}
      </div>
    </div>
  );
}
