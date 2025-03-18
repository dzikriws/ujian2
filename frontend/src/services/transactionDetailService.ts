import { api } from "../utils/api";

export const getTransactionDetail = async (id: number) => {
  try {
    const response = await api.get(`/transaction-detail/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching transaction detail:", error);
    throw error;
  }
};
