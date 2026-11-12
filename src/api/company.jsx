import api from "./api";

export const GetTagsAPI = async (search) => {
  const response = await api.get("tags/", {
    params: { search },
  });

  return response.data;
};

export const RemoveTagAPI = async (companyId, tagId) => {
  const response = await api.patch(
    `comapanies/${companyId}/tags/remove/`,
    { tags: [tagId] }
  );

  return response.data;
};

export const AddTagAPI = async (companyId, tagId) => {
  const response = await api.patch(
    `comapanies/${companyId}/tags/add/`,
    { tags: [tagId] }
  );

  return response.data;
};

export const CompanyListAPI = async (
  page,
  search,
  ordering,
  priority
) => {
  const response = await api.get("companies/", {
    params: {
      page,
      search,
      ordering,
      priority,
    },
  });

  return response.data;
};

export const CreateCompanyAPI = async (data) => {
  const response = await api.post("companies/", data);

  return response.data;
};

export const GetCompanyAPI = async (companyId) => {
  const response = await api.get(`companies/${companyId}/`);

  return response.data;
};

export const UpdateCompanyAPI = async (payload, companyId) => {
  const response = await api.patch(
    `companies/${companyId}/`,
    payload
  );

  return response.data;
};

export const DeleteCompanyAPI = async (companyId) => {
  const response = await api.delete(`companies/${companyId}/`);

  return response.data;
};

export const GetDashboard = async () => {
  const response = await api.get("dashboard/");

  return response.data;
};