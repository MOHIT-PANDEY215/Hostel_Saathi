

export const ENDPOINTS = {
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/signup",
  },
  STUDENT: {
    GET_ISSUES: ({id}:{id:String})=>`/student/${id}/issues`,
  },
};