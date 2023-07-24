import { axiosInstance, apiRequest } from "./core/axios";

export const getRegistrationInfo = async (showLoader) => {
  return await apiRequest(
    () => axiosInstance.get(`/api/dashboard/registrations`),
    showLoader
  );
};

export const getQuestionSubmissions = async (showLoader) => {
  return await apiRequest(
    () => axiosInstance.get(`/api/dashboard/submissions`),
    showLoader
  );
};
