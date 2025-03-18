import { api } from "../utils/api";

export const getDoctors = async () => {
  const response = await api.get("/doctor");
  return response.data.data;
};

export const addDoctor = async (doctor: {
  doctor_name: string;
  address: string;
  city: string;
  country: string;
  kategori: string;
  contact_phone: string;
}) => {
  const response = await api.post("/doctor", doctor);
  return response.data;
};

export const updateDoctor = async (
  id: number,
  doctor: {
    doctor_name: string;
    address: string;
    city: string;
    country: string;
    kategori: string;
    contact_phone: string;
  }
) => {
  const response = await api.put(`/doctor/${id}`, doctor);
  return response.data;
};

export const deleteDoctor = async (id: number) => {
  const response = await api.delete(`/doctor/${id}`);
  return response.data;
};
