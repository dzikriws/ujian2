import { api } from "../utils/api";

export const getSuppliers = async () => {
  const response = await api.get("/suppliers");
  return response.data.data;
};

export const getSupplierById = async (id: number) => {
  const response = await api.get(`/suppliers/${id}`);
  return response.data.data; // Mengambil data supplier dari response
};

export const addSupplier = async (supplier: {
  suplier_name: string;
  address: string;
  city: string;
  country: string;
  payment_terms: string;
  bank_name: string;
  bank_account: string;
  contact_name: string;
  contact_phone: string;
  contact_email: string;
}) => {
  const response = await api.post("/suppliers", supplier);
  return response.data;
};

export const updateSupplier = async (
  id: number,
  supplier: {
    suplier_name: string;
    address: string;
    city: string;
    country: string;
    payment_terms: string;
    bank_name: string;
    bank_account: string;
    contact_name: string;
    contact_phone: string;
    contact_email: string;
  }
) => {
  const response = await api.put(`/suppliers/${id}`, supplier);
  return response.data;
};

export const deleteSupplier = async (id: number) => {
  const response = await api.delete(`/suppliers/${id}`);
  return response.data;
};
