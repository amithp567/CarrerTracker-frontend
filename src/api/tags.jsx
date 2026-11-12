import api from "./api";

export const GetTagsWithCompanyAPI = async (search) => {
  const response = await api.get("list/tags/", {
    params: { search },
  });

  return response.data;
};