export default function Loading() {
  return (
    <div className="animate-pulse">
      <div className="flex justify-between mb-6">
        <div>
          <div className="h-6 w-24 rounded mb-1" style={{ background: "rgba(148,184,216,0.12)" }} />
          <div className="h-3 w-36 rounded" style={{ background: "rgba(148,184,216,0.07)" }} />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="rounded-2xl p-5" style={{ background: "#0a1628", border: "1px solid rgba(30,58,110,0.4)", height: 160 }}>
            <div className="flex gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl shrink-0" style={{ background: "rgba(30,58,110,0.4)" }} />
              <div className="flex-1">
                <div className="h-4 w-3/4 rounded mb-1.5" style={{ background: "rgba(148,184,216,0.12)" }} />
                <div className="h-3 w-1/2 rounded" style={{ background: "rgba(148,184,216,0.07)" }} />
              </div>
            </div>
            <div className="h-1.5 rounded-full mb-4" style={{ background: "rgba(30,58,110,0.4)" }} />
            <div className="h-8 rounded-full" style={{ background: "rgba(77,184,255,0.1)" }} />
          </div>
        ))}
      </div>
    </div>
  );
}
