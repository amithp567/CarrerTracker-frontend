import api from "./api";

interface LoginData {
  email : string,
  password : string
}
export const LoginAPI = async (data : LoginData) => {
  const response = await api.post("/auth/login/", data);
  
  return response.data;
};

interface RegisterData {
  full_name : string,
  email : string,
  password : string
}
export const RegisterAPI = async(data : RegisterData) => {
  const response = await api.post('/auth/register/', data);

  return response.data;
}

interface LogoutData{
  refresh : string
}
export const LogoutAPI = async(refresh : LogoutData) => {
  const response = await api.post('auth/logout/', refresh)

  return response.data;

}