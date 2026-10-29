import api from "./api";

interface LoginData {
  email : string,
  password : string
}
export const LoginAPI = async (data : LoginData) => {
  const response = await api.post("/auth/login/", data);
  return response.data;
};