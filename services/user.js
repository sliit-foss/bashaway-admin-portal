import { axiosInstance, apiRequest } from "./core/axios";

export const getAllUsers = async (filterQuery = "", sortQuery = "", page, showLoader) => {
  return await apiRequest(
    () => axiosInstance.get(`/api/users?${filterQuery}&${sortQuery}${page ? `&page=${page}&limit=10` : ''}`),
    showLoader
  );
};

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
