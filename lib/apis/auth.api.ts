import api from "@/lib/axios";
import { SignupInput } from "../validators/auth.schema";

export const loginUser = async (data: {
    userName: string;
    password: string;
}) => {
    const res = await api.post("/api/v1/auth/login", data, {
        withCredentials: true,
    });
    return res.data.data;
};

export const signupUser = async (data: SignupInput) => {
    const res = await api.post("/api/v1/auth/signup", data, {
        withCredentials: true,
    });
    return res.data.data;
};

export const refreshToken = async () => {
    const res = await api.post("/api/v1/auth/refresh", {}, {
        withCredentials: true,
    });
    return res.data.data;
};

export const logoutUser  = async () => {
    const res = await api.post("/api/v1/auth/logout", {}, {
        withCredentials: true,
        skipAuthRefresh: true, // custom flag to skip refresh logic in axios interceptor
    });
    return res.data.data;
};

export const initSuperAdminUser = async(data:any)=>{
    const res = await api.post("/api/v1/auth/get-started", data, {
        withCredentials: true,
    });
    return res.data.data;
}
