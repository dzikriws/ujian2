import { api } from "../utils/api";

export const getTransactions = async (type: string) => {
  const url = type ? `/transactions?type=${type}` : "/transactions";
  const response = await api.get(url);
  return response.data.data;
};

export const getDetailTransaction = async (id: number) => {
  const response = await api.get(`/transaction-detail/${id}`);
  return response.data.data;
};

export const addTransaction = async (transactionData: any) => {
  const response = await api.post("/transactions", transactionData);
  return response.data;
};
