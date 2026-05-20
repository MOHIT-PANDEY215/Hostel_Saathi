import { useAuthStore } from "@/stores/authStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { redirectByRole } from "./useAuth";

export const useAuthGuard = (allowedRoles: string[]) => {
  const { user,accessToken } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!user || !accessToken) {
      router.push("/login");
    } else if (!allowedRoles.includes(user.role)) {
      router.push("/unauthorized");
    } else {
      redirectByRole(user.role, router);
    }
  }, [user, accessToken]);
};