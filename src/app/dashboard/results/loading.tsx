export default function Loading() {
  return (
    <div className="animate-pulse">
      <div className="mb-6">
        <div className="h-6 w-28 rounded mb-1" style={{ background: "rgba(148,184,216,0.12)" }} />
        <div className="h-3 w-44 rounded" style={{ background: "rgba(148,184,216,0.07)" }} />
      </div>
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="rounded-2xl p-4 text-center" style={{ background: "#0a1628", border: "1px solid rgba(30,58,110,0.4)", height: 72 }} />
        ))}
      </div>
      <div className="space-y-3">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="rounded-2xl p-5 flex items-center gap-4" style={{ background: "#0a1628", border: "1px solid rgba(30,58,110,0.4)", height: 76 }}>
            <div className="w-10 h-10 rounded-xl shrink-0" style={{ background: "rgba(30,58,110,0.4)" }} />
            <div className="flex-1">
              <div className="h-3.5 w-1/2 rounded mb-2" style={{ background: "rgba(148,184,216,0.12)" }} />
              <div className="h-2.5 w-28 rounded-full" style={{ background: "rgba(148,184,216,0.07)" }} />
            </div>
            <div className="h-6 w-10 rounded" style={{ background: "rgba(77,184,255,0.1)" }} />
          </div>
        ))}
      </div>
    </div>
  );
}
