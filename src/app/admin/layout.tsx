// Admin layout — sidebar + topbar with Suspense to prevent white flash
import { Suspense } from "react";
import { requireAdmin } from "@/lib/auth/authorization";
import AdminShell from "./AdminShell";

export const instant = false;

function PageSkeleton() {
  return (
    <div className="animate-pulse space-y-5">
      <div className="flex justify-between">
        <div>
          <div className="h-6 w-36 rounded mb-1" style={{ background: "rgba(148,184,216,0.12)" }} />
          <div className="h-3 w-44 rounded" style={{ background: "rgba(148,184,216,0.07)" }} />
        </div>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="rounded-2xl" style={{ background: "#0a1628", border: "1px solid rgba(30,58,110,0.4)", height: 100 }} />
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 rounded-2xl" style={{ background: "#0a1628", border: "1px solid rgba(30,58,110,0.4)", height: 220 }} />
        <div className="rounded-2xl" style={{ background: "#0a1628", border: "1px solid rgba(30,58,110,0.4)", height: 220 }} />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="rounded-2xl" style={{ background: "#0a1628", border: "1px solid rgba(30,58,110,0.4)", height: 200 }} />
        ))}
      </div>
    </div>
  );
}

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const user = await requireAdmin();
  return (
    <AdminShell user={user}>
      <Suspense fallback={<PageSkeleton />}>
        {children}
      </Suspense>
    </AdminShell>
  );
}
