"use client";

import {
  Home,
  AlertCircle,
  Bed,
  Settings,
  ChevronLeft,
  ChevronRight,
  BarChart3,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

import { ROLES } from "@/lib/validators/auth.schema";
export function Sidebar({ role }: { role: typeof ROLES[number] }) {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  // 🔥 Role protection
  useEffect(() => {
    if (!pathname.startsWith(`/${role}`)) {
      router.push(`/${role}`);
    }
  }, [role, pathname, router]);

  const navConfig = {
    student: [
      { icon: Home, label: "Dashboard", path: "/student" },
      { icon: AlertCircle, label: "Issues", path: "/student/issues" },
      { icon: Bed, label: "My Room", path: "/student/room" },
    ],
    warden: [
      { icon: Home, label: "Dashboard", path: "/warden" },
      { icon: AlertCircle, label: "Issues", path: "/warden/issues" },
      { icon: Bed, label: "Rooms", path: "/warden/rooms" },
      { icon: BarChart3, label: "Analytics", path: "/warden/analytics" },
    ],
    worker: [
      { icon: Home, label: "Dashboard", path: "/worker" },
      { icon: AlertCircle, label: "Tasks", path: "/worker/tasks" },
    ],
    superadmin: [
      { icon: Home, label: "Dashboard", path: "/superadmin" },
      { icon: Bed, label: "Hostels", path: "/superadmin/hostels" },
      { icon: BarChart3, label: "Monitoring", path: "/superadmin/monitoring" },
    ],
  };

  const navItems = navConfig[role];

  return (
    <div 
      className={`h-screen bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 flex flex-col transition-all duration-300 ${
        collapsed ? 'w-16' : 'w-64'
      }`}
    >
      {/* Logo */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200 dark:border-gray-800">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center">
              <span className="font-bold text-white text-sm">HS</span>
            </div>
            <span className="font-semibold text-gray-900 dark:text-white">HostelSaathi</span>
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
        >
          {collapsed ? (
            <ChevronRight className="w-4 h-4 text-gray-600 dark:text-gray-400" />
          ) : (
            <ChevronLeft className="w-4 h-4 text-gray-600 dark:text-gray-400" />
          )}
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-3 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.path;

          return (
            <Link
              key={item.path}
              href={item.path}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
                isActive
                  ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              <item.icon className="w-5 h-5" />
              {!collapsed && item.label}
            </Link>
          );
        })}
      </nav>

      {/* Settings */}
      <div className="p-3 border-t border-gray-200 dark:border-gray-800">
        <Link href={`/${role}/settings`} className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all">
          <Settings className="w-5 h-5" />
          {!collapsed && "Settings"}
        </Link>
      </div>
    </div>
  );
}