import { useMutation, useQuery } from "@tanstack/react-query";
import { useAuthStore, User } from "@/stores/authStore";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { createWarden } from "@/lib/apis/roles/warden.api";
import { getDashboard } from "@/lib/apis/roles/superadmin.api";




export const useGetDashboard = () => {
  return useQuery({
    queryKey: ["superadmin-dashboard"],

    queryFn: getDashboard,

    staleTime: 1000 * 60 * 5, // cache for 5 min
  });
};
