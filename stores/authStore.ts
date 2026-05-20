import { logoutUser } from '@/lib/apis/auth.api';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Role = 'student' | 'warden' | 'worker' | 'superadmin';

export interface User {
  id: string;
  fullName: string;
  userName: string;
  role: Role;
  avatar?: string;
  mobileNumber?: string;
}

export interface StudentUser extends User {
  role: 'student';
  hostelNumber: string;
  registrationNumber: string;
}
export interface WardenUser extends User {
  role: 'warden';
  hostelNumber: number;
}
export interface WorkerUser extends User {
  role: 'worker';
  department: string;
}
export interface SuperAdminUser extends User {
  role: 'superadmin';
}

interface AuthState {
   user: User | null;
  accessToken: string | null;

  setAuth: (user: User, token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
  (set) => ({
  user: null,
  accessToken: null,

  setAuth: (user, token) => set({ user, accessToken: token }),

  logout: async () => {
    await logoutUser()
    set({ user: null, accessToken: null })
  },
}),{
  name: 'auth-storage',
}
)
);