"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, AlertCircle, Bed, BarChart3 } from "lucide-react";
import { ROLES } from "@/lib/validators/auth.schema";

export function MobileBottomNav({ role }: { role: typeof ROLES[number] }) {
  const pathname = usePathname();

  const navConfig = {
    student: [
      { icon: Home, path: "/student" },
      { icon: AlertCircle, path: "/student/issues" },
      { icon: Bed, path: "/student/room" },
    ],
    warden: [
      { icon: Home, path: "/warden" },
      { icon: AlertCircle, path: "/warden/issues" },
      { icon: Bed, path: "/warden/rooms" },
      { icon: BarChart3, path: "/warden/analytics" },
    ],
    worker: [
      { icon: Home, path: "/worker" },
      { icon: AlertCircle, path: "/worker/tasks" },
    ],
    superadmin: [
      { icon: Home, path: "/superadmin" },
      { icon: Bed, path: "/superadmin/hostels" },
      { icon: BarChart3, path: "/superadmin/monitoring" },
    ],
  };

  const navItems = navConfig[role];

  return (
    <div className="fixed bottom-0 left-0 right-0 h-16 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 flex justify-around items-center z-50">
      {navItems.map((item) => {
        const isActive = pathname === item.path;

        return (
          <Link
            key={item.path}
            href={item.path}
            className={`flex flex-col items-center justify-center text-xs ${
              isActive
                ? "text-indigo-600 dark:text-indigo-400"
                : "text-gray-500"
            }`}
          >
            <item.icon className="w-5 h-5 mb-1" />
          </Link>
        );
      })}
    </div>
  );
}