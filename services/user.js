import { axiosInstance, apiRequest } from "./core/axios";

export const updateUser = async (id, data, showLoader) => {
  return await apiRequest(
    () => axiosInstance.put(`/api/users/${id}`, data),
    showLoader
  );
};

export const changePassword = async (data, showLoader) => {
  return await apiRequest(
    () => axiosInstance.put(`/api/users/change_password`, data),
    showLoader
  );
};
