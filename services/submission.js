import { axiosInstance, apiRequest } from './core/axios'

export const getAllSubmissions = async (filterQuery = "", sortQuery = "", page, showLoader) => {
  return await apiRequest(() => axiosInstance.get(`/api/submissions?${filterQuery}&${sortQuery}${page ? `&page=${page}&limit=10` : ''}`), showLoader)
}
