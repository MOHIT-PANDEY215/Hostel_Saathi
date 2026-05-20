import { getHostels } from "@/lib/apis/org/hostel.api";
import { useQuery } from "@tanstack/react-query";

export const useGetHostels = ()=>{
  return useQuery({
    queryKey: ["superadmin-hostels"],

    queryFn: getHostels,

    staleTime: 1000 * 60 * 5, // 🔥 cache for 5 min
  });
}