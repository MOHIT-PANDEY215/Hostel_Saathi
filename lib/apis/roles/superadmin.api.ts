import api from "@/lib/axios";


export const getDashboard = async()=>{
    const res = await api.get("/api/v1/superadmin/dashboard");
    return res.data.data;
}
