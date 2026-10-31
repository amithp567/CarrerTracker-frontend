import api from "./api";

export const CompanyListAPI = async (page : number) => {
  const response = await api.get(`companies/?page=${page}`);

  return response.data;
};


export const GetTagsAPI = async(search: string) => {
  const response = await api.get('tags/',{params : search})

  return response.data
}

interface CreateCompanyData {
    name: string;
    description: string;
    company_url: string;
    career_url: string;
    priority: string;
    tags: string[];
}
export const CreateCompanyAPI = async(data: CreateCompanyData) => {
  const response = await api.post('companies/',data)

  return response.data
}

export const GetCompanyAPI = async(companyId : string) =>{
  const response = await api.get(`companies/${companyId}/`)

  return response.data
}

interface UpdateCompanyData{
  name : string;
}

export const UpdateCompanyAPI = async(payload : UpdateCompanyData, companyId : string) =>{
  const response = await api.patch(`companies/${companyId}/`,payload)

  return response.data
}

export const RemoveTagAPI = async(companyId : string, tagId : string) =>{
  const response = await api.patch(`comapanies/${companyId}/tags/remove/`, {tags:[tagId]});

  return response.data;
}

export const AddTagAPI = async(companyId : string, tagId : string) =>{
  const response = await api.patch(`comapanies/${companyId}/tags/add/`, {tags:[tagId]});

  return response.data;
}