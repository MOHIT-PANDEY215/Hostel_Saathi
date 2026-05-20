'use client'
import LoginForm from "@/components/auth/LoginForm";
import { useAuthGuard } from "@/hooks/useAuthGuard";
import { useMounted } from "@/hooks/useMounted";


export default function LoginPage() {
  const mounted = useMounted();
  // useAuthGuard(["student", "warden", "worker", "superadmin"]);
  if (!mounted) return null;
  return <LoginForm />;
}