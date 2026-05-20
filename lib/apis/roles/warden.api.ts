import api from "@/lib/axios";
import { CreateWardenServerInput } from "@/lib/validators/auth.schema";


export const createWarden = async(data:CreateWardenServerInput)=>{
    const res = await api.post("/api/v1/warden/create", data);
    return res.data.data;
}
