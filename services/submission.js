import { apiRequest, axiosInstance } from "./core/axios";

export const getAllSubmissions = async (filterQuery = "", sortQuery = "", page, showLoader) => {
  return await apiRequest(
    () => axiosInstance.get(`/api/submissions?${filterQuery}&${sortQuery}${page ? `&page=${page}&limit=10` : ""}`),
    showLoader
  );
};

export const gradeSubmission = async (id, data, showLoader) => {
  return await apiRequest(() => axiosInstance.put(`/api/submissions/${id}`, data), showLoader);
};
