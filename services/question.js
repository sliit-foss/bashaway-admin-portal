import { apiRequest, axiosInstance } from "./core/axios";

export const addQuestion = async (data, showLoader) => {
  return await apiRequest(() => axiosInstance.post(`/api/questions`, data), showLoader);
};

export const updateQuestion = async (id, data, showLoader) => {
  return await apiRequest(() => axiosInstance.patch(`/api/questions/${id}`, data), showLoader);
};

export const getAllQuestions = async (filterQuery = "", sortQuery = "", page, showLoader) => {
  return await apiRequest(
    () => axiosInstance.get(`/api/questions?${filterQuery}&${sortQuery}&page=${page}&limit=5`),
    showLoader
  );
};

export const getQuestionById = async (id, showLoader) => {
  return await apiRequest(() => axiosInstance.get(`/api/questions/${id}`), showLoader);
};
