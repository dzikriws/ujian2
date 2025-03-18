import { api } from "../utils/api";

export const getServices = async () => {
  const response = await api.get("/services");
  return response.data.data;
};

export const createService = async (service: {
  service_name: string;
  service_group: string;
  categories: { category_id: number; price: number }[];
}) => {
  const response = await api.post("/services", service);
  return response.data;
};

export const updateService = async (
  id: number,
  service: {
    service_name: string;
    service_group: string;
    categories: { category_id: number; price: number }[];
  }
) => {
  const response = await api.put(`/services/${id}`, service);
  return response.data;
};

export const deleteService = async (id: number) => {
  const response = await api.delete(`/services/${id}`);
  return response.data;
};