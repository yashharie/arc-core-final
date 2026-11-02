// Dark skeleton shown while /dashboard/* pages load
// The MemberShellLayout (sidebar + topbar) renders immediately from layout.tsx
// This only fills the <main> content area

export default function DashboardLoading() {
  return (
    <div className="animate-pulse">
      {/* Hero skeleton */}
      <div className="rounded-2xl mb-6 p-6" style={{ background: "#0a1628", minHeight: 150, border: "1px solid rgba(30,58,110,0.4)" }}>
        <div className="h-3 w-24 rounded mb-2" style={{ background: "rgba(148,184,216,0.1)" }} />
        <div className="h-7 w-56 rounded mb-1" style={{ background: "rgba(148,184,216,0.12)" }} />
        <div className="h-3 w-40 rounded mb-5" style={{ background: "rgba(148,184,216,0.08)" }} />
        <div className="flex gap-3">
          <div className="h-8 w-28 rounded-full" style={{ background: "rgba(77,184,255,0.15)" }} />
          <div className="h-8 w-32 rounded-full" style={{ background: "rgba(30,58,110,0.3)" }} />
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="rounded-2xl p-5" style={{ background: "#0a1628", border: "1px solid rgba(30,58,110,0.4)", height: 96 }} />
        ))}
      </div>

      {/* Two column */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-5">
        <div className="lg:col-span-2 rounded-2xl p-5" style={{ background: "#0a1628", border: "1px solid rgba(30,58,110,0.4)", height: 260 }}>
          <div className="h-4 w-40 rounded mb-4" style={{ background: "rgba(148,184,216,0.1)" }} />
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-lg shrink-0" style={{ background: "rgba(30,58,110,0.4)" }} />
              <div className="flex-1">
                <div className="h-3 w-3/4 rounded mb-1.5" style={{ background: "rgba(148,184,216,0.1)" }} />
                <div className="h-1.5 rounded-full" style={{ background: "rgba(30,58,110,0.4)" }} />
              </div>
              <div className="h-4 w-8 rounded" style={{ background: "rgba(77,184,255,0.1)" }} />
            </div>
          ))}
        </div>
        <div className="rounded-2xl p-5" style={{ background: "#0a1628", border: "1px solid rgba(30,58,110,0.4)", height: 260 }}>
          <div className="h-4 w-32 rounded mb-4" style={{ background: "rgba(148,184,216,0.1)" }} />
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex gap-2.5 mb-3">
              <div className="w-7 h-7 rounded-full shrink-0" style={{ background: "rgba(30,58,110,0.4)" }} />
              <div className="flex-1">
                <div className="h-3 w-full rounded mb-1" style={{ background: "rgba(148,184,216,0.1)" }} />
                <div className="h-2.5 w-2/3 rounded" style={{ background: "rgba(148,184,216,0.07)" }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 rounded-2xl p-5" style={{ background: "#0a1628", border: "1px solid rgba(30,58,110,0.4)", height: 240 }} />
        <div className="rounded-2xl p-5" style={{ background: "#0a1628", border: "1px solid rgba(30,58,110,0.4)", height: 240 }} />
      </div>
    </div>
  );
}
