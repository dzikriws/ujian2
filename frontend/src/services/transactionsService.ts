import { api } from "../utils/api";

export const getTransactions = async () => {
  const response = await api.get("/transactions");
  console.log(response.data.data);
  return response.data.data;
};

export const createTransaction = async (transaction: {
  doctor_id: number;
  patient_name: number;
  service_id: number;
  date: Date;
  tax_rate: number | null;
  username: string;
  details: {
    category_id: number;
    qty: number;
  }[];
}) => {
  const response = await api.post("/transactions", transaction);
  return response.data;
};
