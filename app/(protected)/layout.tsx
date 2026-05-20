'use client'
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import { Sidebar } from "@/components/layout/Sidebar";
import { TopNav } from "@/components/layout/TopNav";
import { useAuthStore } from "@/stores/authStore";

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useAuthStore();
  console.log(user)
  if (!user) return null;
  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-950">
      <div className="hidden md:block">
        <Sidebar role={user.role} />
      </div>
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopNav />
        <main className="flex-1 overflow-auto pb-16 md:pb-0">{children}</main>
        <div className="md:hidden">
      <MobileBottomNav role={user.role} />
    </div>
      </div>
    </div>
  );
}