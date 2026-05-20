'use client';

import { Search, Bell, Moon, Sun } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/authStore';
import { useThemeStore } from '@/stores/themeStore';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { toast } from 'sonner';

export function TopNav() {
  const router = useRouter();

  const { user,logout } = useAuthStore();
  const { theme, toggleTheme } = useThemeStore();
  const role = user?.role;
  console.log(user)

  const getRoleName = () => {
    switch (role) {
      case 'student': return 'Student';
      case 'warden': return 'Warden';
      case 'worker': return 'Worker';
      case 'superadmin': return 'Super Admin';
      default: return 'User';
    }
  };

  // const handleRoleChange = (newRole: string) => {
  //   // setRole(newRole as any);

  //   router.push(`/${newRole}`);
  // };

  return (
    <div className="h-16 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between px-6">
      
      {/* Search */}
      <div className="flex-1 max-w-xl">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 text-gray-900 dark:text-white placeholder-gray-500"
          />
        </div>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-3">

        {/* Theme Toggle */}
        {/* <button
          onClick={toggleTheme}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors"
        >
          {theme === 'light' ? (
            <Moon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          ) : (
            <Sun className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          )}
        </button> */}

        {/* Notifications */}
        {/* <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors relative">
          <Bell className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
        </button> */}

        {/* Role Switcher */}
        {/* <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="px-3 py-1.5 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-lg text-sm font-medium hover:bg-indigo-100 dark:hover:bg-indigo-500/20 transition-colors">
              {getRoleName()}
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Switch Role (Demo)</DropdownMenuLabel>
            <DropdownMenuSeparator />

            {['student', 'warden', 'worker', 'superadmin'].map((r) => (
              <DropdownMenuItem key={r} onClick={() => handleRoleChange(r)}>
                {r}
                {role === r && (
                  <Badge className="ml-2" variant="secondary">
                    Active
                  </Badge>
                )}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu> */}

        {/* Profile */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl p-2">
              <Avatar className="w-8 h-8">
                <AvatarFallback className="bg-indigo-500 text-white">
                  {user?.avatar || user?.fullName.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuLabel>
              {role ? `${user?.fullName}` : 'User'}
            </DropdownMenuLabel>

            <DropdownMenuSeparator />

            <DropdownMenuItem onClick={() => router.push('/profile')}>
              Profile
            </DropdownMenuItem>

            <DropdownMenuItem onClick={() => router.push(`/${role}/settings`)}>
              Settings
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              className="text-red-600"
              onClick={async () => {
                try {
                  await logout();
                  router.replace('/login'); 
                  
                } catch (error) {
                  console.error("Logout failed:", error);
                  toast.error("Logout failed, please try again.");
                }
              }}
            >
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}