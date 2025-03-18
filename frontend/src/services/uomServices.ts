import { api } from "../utils/api";

export const getUoms = async () => {
  const response = await api.get("/uoms");
  return response.data.data;
};

export const addUom = async (uom: {
  name: string;
  rate_conversion: number;
}) => {
  const response = await api.post("/uoms", uom);
  return response.data;
};

export const updateUom = async (
  id: number,
  uom: { name: string; rate_conversion: number }
) => {
  const response = await api.put(`/uoms/${id}`, uom);
  return response.data;
};

export const deleteUom = async (id: number) => {
  const response = await api.delete(`/uoms/${id}`);
  return response.data;
};