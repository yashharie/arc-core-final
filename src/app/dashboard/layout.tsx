// Member layout — wraps all /dashboard/* pages with the sidebar shell
// Suspense boundary ensures the shell renders immediately while page data loads
import { Suspense } from "react";
import { requireAuth } from "@/lib/auth/authorization";
import MemberShellLayout from "./MemberShellLayout";

export const instant = false;

// Dark skeleton shown while page content loads — lives inside the shell
function PageSkeleton() {
  return (
    <div className="animate-pulse space-y-5">
      {/* Hero */}
      <div className="rounded-2xl p-6" style={{ background: "#0a1628", border: "1px solid rgba(30,58,110,0.4)", minHeight: 140 }}>
        <div className="h-3 w-20 rounded mb-2" style={{ background: "rgba(148,184,216,0.08)" }} />
        <div className="h-6 w-52 rounded mb-1" style={{ background: "rgba(148,184,216,0.12)" }} />
        <div className="h-3 w-36 rounded mb-5" style={{ background: "rgba(148,184,216,0.06)" }} />
        <div className="flex gap-3">
          <div className="h-8 w-28 rounded-full" style={{ background: "rgba(77,184,255,0.12)" }} />
          <div className="h-8 w-32 rounded-full" style={{ background: "rgba(30,58,110,0.3)" }} />
        </div>
      </div>
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="rounded-2xl" style={{ background: "#0a1628", border: "1px solid rgba(30,58,110,0.4)", height: 90 }} />
        ))}
      </div>
      {/* Two cols */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 rounded-2xl" style={{ background: "#0a1628", border: "1px solid rgba(30,58,110,0.4)", height: 240 }} />
        <div className="rounded-2xl" style={{ background: "#0a1628", border: "1px solid rgba(30,58,110,0.4)", height: 240 }} />
      </div>
      {/* Bottom */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 rounded-2xl" style={{ background: "#0a1628", border: "1px solid rgba(30,58,110,0.4)", height: 200 }} />
        <div className="rounded-2xl" style={{ background: "#0a1628", border: "1px solid rgba(30,58,110,0.4)", height: 200 }} />
      </div>
    </div>
  );
}

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const user = await requireAuth();
  return (
    <MemberShellLayout user={user}>
      <Suspense fallback={<PageSkeleton />}>
        {children}
      </Suspense>
    </MemberShellLayout>
  );
}
