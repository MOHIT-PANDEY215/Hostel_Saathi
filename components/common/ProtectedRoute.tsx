'use client';

import { useAuthGuard } from '@/hooks/useAuthGuard';

export default function ProtectedRoute({
  children,
  roles,
}: {
  children: React.ReactNode;
  roles: string[];
}) {
  useAuthGuard(roles);
  return <>{children}</>;
}