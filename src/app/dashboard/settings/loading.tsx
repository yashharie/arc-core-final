export default function Loading() {
  return (
    <div className="animate-pulse">
      <div className="mb-6">
        <div className="h-6 w-24 rounded mb-1" style={{ background: "rgba(148,184,216,0.12)" }} />
        <div className="h-3 w-44 rounded" style={{ background: "rgba(148,184,216,0.07)" }} />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="rounded-2xl p-6 flex flex-col items-center gap-4" style={{ background: "#0a1628", border: "1px solid rgba(30,58,110,0.4)", height: 220 }}>
          <div className="w-20 h-20 rounded-full" style={{ background: "rgba(30,58,110,0.4)" }} />
          <div className="h-4 w-28 rounded" style={{ background: "rgba(148,184,216,0.1)" }} />
          <div className="h-3 w-36 rounded" style={{ background: "rgba(148,184,216,0.07)" }} />
        </div>
        <div className="lg:col-span-2 space-y-5">
          <div className="rounded-2xl p-6" style={{ background: "#0a1628", border: "1px solid rgba(30,58,110,0.4)", height: 140 }} />
          <div className="rounded-2xl p-6" style={{ background: "#0a1628", border: "1px solid rgba(30,58,110,0.4)", height: 100 }} />
        </div>
      </div>
    </div>
  );
}
