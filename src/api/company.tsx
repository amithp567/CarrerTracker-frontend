import api from "./api";

export const CompanyListAPI = async (page) => {
  const response = await api.get(`companies/?page=${page}`);
  return response.data;
};
