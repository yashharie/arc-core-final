// Dark skeleton for admin pages — sidebar renders from layout.tsx immediately
// This only fills the <main> content area

export default function AdminLoading() {
  return (
    <div className="animate-pulse">
      <div className="flex justify-between mb-6">
        <div>
          <div className="h-6 w-36 rounded mb-1" style={{ background: "rgba(148,184,216,0.12)" }} />
          <div className="h-3 w-44 rounded" style={{ background: "rgba(148,184,216,0.07)" }} />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="rounded-2xl p-5" style={{ background: "#0a1628", border: "1px solid rgba(30,58,110,0.4)", height: 100 }} />
        ))}
      </div>

      {/* Chart + overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-5">
        <div className="lg:col-span-2 rounded-2xl p-5" style={{ background: "#0a1628", border: "1px solid rgba(30,58,110,0.4)", height: 220 }}>
          <div className="h-4 w-36 rounded mb-4" style={{ background: "rgba(148,184,216,0.1)" }} />
          <div className="h-40 rounded-xl" style={{ background: "rgba(30,58,110,0.2)" }} />
        </div>
        <div className="rounded-2xl p-5" style={{ background: "#0a1628", border: "1px solid rgba(30,58,110,0.4)", height: 220 }}>
          <div className="h-4 w-28 rounded mb-4" style={{ background: "rgba(148,184,216,0.1)" }} />
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-lg shrink-0" style={{ background: "rgba(30,58,110,0.4)" }} />
              <div className="flex-1">
                <div className="h-3 w-3/4 rounded mb-1.5" style={{ background: "rgba(148,184,216,0.1)" }} />
                <div className="h-1.5 rounded-full" style={{ background: "rgba(30,58,110,0.4)" }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="rounded-2xl p-5" style={{ background: "#0a1628", border: "1px solid rgba(30,58,110,0.4)", height: 200 }} />
        ))}
      </div>
    </div>
  );
}
