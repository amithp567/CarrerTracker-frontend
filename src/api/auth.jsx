import api from "./api";

export const LoginAPI = async (data) => {
  const response = await api.post("/auth/login/", data);

  return response.data;
};

export const RegisterAPI = async (data) => {
  const response = await api.post("/auth/register/", data);

  return response.data;
};

export const LogoutAPI = async (refresh) => {
  const response = await api.post("/auth/logout/", refresh);

  return response.data;
};