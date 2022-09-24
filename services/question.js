import { axiosInstance, apiRequest } from "./core/axios";

export const getAllQuestions = async (page, showLoader) => {
  return await apiRequest(
    () => axiosInstance.get(`/api/questions?page=${page}&limit=5`),
    showLoader
  );
};

export const getQuestionById = async (id, showLoader) => {
  return await apiRequest(
    () => axiosInstance.get(`/api/questions/${id}`),
    showLoader
  );
};
