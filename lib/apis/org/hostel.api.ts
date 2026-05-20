import api from "@/lib/axios";
import { CreateHostelServerInput, SignupInput } from "../../validators/auth.schema";


export const createHostel = async(data:CreateHostelServerInput)=>{
    const res = await api.post("/api/v1/hostel/create", data);
    return res.data.data;
}

export const getHostels = async()=>{
    const res = await api.get("/api/v1/hostel/all");
    return res.data.data;
}