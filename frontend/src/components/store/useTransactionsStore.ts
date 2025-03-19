import { create } from "zustand";

export interface Detail {
  service_id: number;
  category_id: number;
  qty: number;
  price: number;
}

interface TransactionState {
  details: Detail[];
  beforeTax: number;
  taxValue: number;
  afterTax: number;
  setDetails: (details: Detail[]) => void;
  updateDetail: (index: number, field: keyof Detail, value: any) => void;
  calculateTotals: (taxRate: number) => void;
}

export const useTransactionStore = create<TransactionState>((set) => ({
  details: [],
  beforeTax: 0,
  taxValue: 0,
  afterTax: 0,
  setDetails: (details) => set({ details }),
  updateDetail: (index, field, value) =>
    set((state) => {
      const updatedDetails = [...state.details];
      updatedDetails[index] = { ...updatedDetails[index], [field]: value };

      return { details: updatedDetails };
    }),
  calculateTotals: (taxRate) =>
    set((state) => {
      const beforeTax = state.details.reduce(
        (acc, detail) => acc + detail.price * detail.qty,
        0
      );
      const taxValue = beforeTax * taxRate;
      const afterTax = beforeTax + taxValue;

      return { beforeTax, taxValue, afterTax };
    }),
}));
