import { useMutation } from "@tanstack/react-query";
import { useAuthStore, User } from "@/stores/authStore";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { initSuperAdminUser, loginUser, logoutUser, signupUser } from "@/lib/apis/auth.api";
import { createHostel } from "@/lib/apis/org/hostel.api";
import { createWarden } from "@/lib/apis/roles/warden.api";

export const redirectByRole = (role: string, router: any) => {
  console.log("Redirecting based on role:", role);
  if (role === "student") window.location.href = "/student";
  else if (role === "warden") window.location.href = "/warden";
  else if (role === "worker") window.location.href = "/worker";
  else if (role === "superadmin") window.location.href = "/superadmin";
  else toast.error("Invalid user role, cannot redirect")
};


export const useLogin = () => {
  const router = useRouter();
  const setAuth = useAuthStore((s) => s.setAuth);

  return useMutation({
    mutationFn: loginUser,

    onSuccess: (data) => {
      const { accessToken, user } = data;

      setAuth(user, accessToken);

      toast.success("Login successful");

      redirectByRole(user.role, router);
      // setTimeout(() => {
      // }, 0);
    },

    onError: (err: any) => {
      toast.error(err?.response?.data?.message || "Login failed");
    },
  });
};

export const useSignup = () => {
  const router = useRouter();
  const setAuth = useAuthStore((s) => s.setAuth);

  return useMutation({
    mutationFn: signupUser,

    onSuccess: (data) => {
      const { accessToken, user } = data;

      setAuth(user, accessToken);

      toast.success("Signup successful");
      setTimeout(() => {
        redirectByRole(user.role, router);
      }, 0);
    },

    onError: (err: any) => {
      toast.error(err?.response?.data?.message || "Signup failed");
    },
  });
};

export const useLogout = () => {

  return useMutation({
    mutationFn: logoutUser,

    onSuccess: (data) => {
      window.location.href = "/login";
    },

    onError: (err: any) => {
      toast.error(err?.response?.data?.message || "Logout failed");
    },
  });
}

export const useInitSuperAdmin = (onSuccessCallback?: (data:any)=>void) => {
  const setAuth = useAuthStore((s) => s.setAuth);
  return useMutation({
    mutationFn: initSuperAdminUser,
    onSuccess: (data) => {
      const { accessToken, user } = data;

      setAuth(user, accessToken);
      toast.success('Organization created successfully!');
      onSuccessCallback?.(data);
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message || 'Something went wrong');
    },
  });
};

export const useCreateHostel =  (onSuccessCallback?: (data:any)=>void) => {
  return useMutation({
    mutationFn: createHostel,

    onSuccess: (data) => {
      toast.success('Hostel Created!');
      onSuccessCallback?.(data);
    },

    onError: () => {
      toast.error('Hostel Creation failed');
    },
  });
};

export const useCreateWarden = (onSuccessCallback?: (data:any)=>void) => {
  return useMutation({
    mutationFn: createWarden,

    onSuccess: (data) => {
      toast.success('Warden Created!');
      onSuccessCallback?.(data);
    },

    onError: () => {
      toast.error('Warden Creation failed');
    },
  });
};
