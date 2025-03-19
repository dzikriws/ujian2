import { api } from "../utils/api";

export const getTransactions = async () => {
  try {
    const response = await api.get("/transactions");
    return response.data.data;
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return [];
  }
};

export const getTransaction = async (id: number) => {
  try {
    const response = await api.get(`/transactions/${id}`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching transaction:", error);
    throw error;
  }
}

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
  try {
    const response = await api.post("/transactions", transaction);
    return response.data;
  } catch (error) {
    console.error("Error creating transaction:", error);
    throw error;
  }
};