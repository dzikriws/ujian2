import { api } from "../utils/api";

export const getPriceLists = async () => {
  const response = await api.get("/price-list");
  return response.data.data;
};

export const addPriceList = async (priceList: {
  product_id: number;
  uom_id: number;
  price: string;
}) => {
  await api.post("/price-list", priceList);
};

export const updatePriceList = async (
  id: number,
  priceList: {
    product_id: number;
    uom_id: number;
    price: string;
  }
) => {
  await api.put(`/price-list/${id}`, priceList);
};

export const deletePriceList = async (id: number) => {
  await api.delete(`/price-list/${id}`);
};
