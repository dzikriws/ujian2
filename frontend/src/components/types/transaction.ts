export interface TransactionType {
  transaction_id: number;
  doctor_name: string | null;
  patient_name: string;
  service_group: string;
  date: string;
  tax_rate: number | null;
  username: string;
  grand_total: number;
  sub_total: number;
  transaction_date: string;
  transaction_detail: {
    category_name: string;
    service_name: string;
    price: number;
    quantity: number;
    amount: number;
  }[];
}
