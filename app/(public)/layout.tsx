'use client'
import PublicNavbar from "@/components/layout/PublicNav";
import { TopNav } from "@/components/layout/TopNav";
import { useAuthStore } from "@/stores/authStore";


export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const {user,accessToken} = useAuthStore()

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900">
      {user&&accessToken ? <TopNav/>:<PublicNavbar />}

      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}