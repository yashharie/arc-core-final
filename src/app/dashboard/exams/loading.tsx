export default function Loading() {
  return (
    <div className="animate-pulse">
      <div className="mb-6">
        <div className="h-6 w-28 rounded mb-1" style={{ background: "rgba(148,184,216,0.12)" }} />
        <div className="h-3 w-44 rounded" style={{ background: "rgba(148,184,216,0.07)" }} />
      </div>
      <div className="space-y-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="rounded-2xl p-6" style={{ background: "#0a1628", border: "1px solid rgba(30,58,110,0.4)", height: 128 }}>
            <div className="h-3.5 w-16 rounded-full mb-3" style={{ background: "rgba(77,184,255,0.12)" }} />
            <div className="h-5 w-1/2 rounded mb-2" style={{ background: "rgba(148,184,216,0.12)" }} />
            <div className="flex gap-4">
              {[...Array(3)].map((_, j) => (
                <div key={j} className="h-3 w-24 rounded" style={{ background: "rgba(148,184,216,0.07)" }} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
