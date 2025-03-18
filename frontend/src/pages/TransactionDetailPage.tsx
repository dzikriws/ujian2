import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getTransactionDetail } from "../services/transactionDetailService";
import TransactionDetailTable from "../components/TransactionDetailTable";

interface TransactionDetailData {
  id: number;
  transaction_type: string;
  supplier_id: number | null;
  customer_name: string | null;
  transaction_date: string;
  tax_rate: string;
  username: string;
  supplier?: {
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
  } | null;
  transaction_detail: {
    id: number;
    quantity: string;
    price: string;
    amount: string;
    product: { id: number; product_name: string; description: string };
    uom: { id: number; name: string; rate_conversion: string };
  }[];
}

const TransactionDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [transaction, setTransaction] = useState<TransactionDetailData | null>(
    null
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransactionDetail = async () => {
      try {
        const response = await getTransactionDetail(Number(id));
        setTransaction(response.data);
      } catch (error) {
        console.error("Failed to fetch transaction detail:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactionDetail();
  }, [id]);

  if (loading) return <p>Loading transaction detail...</p>;
  if (!transaction) return <p>Transaction not found.</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">Transaction Detail</h2>
      <div className="border p-4 rounded mb-4">
        <p>
          <strong>Transaction ID:</strong> {transaction.id}
        </p>
        <p>
          <strong>Type:</strong> {transaction.transaction_type}
        </p>
        {transaction.transaction_type === "penjualan" &&
          transaction.customer_name && (
            <p>
              <strong>Customer Name:</strong> {transaction.customer_name}
            </p>
          )}
        <p>
          <strong>Transaction Date:</strong>{" "}
          {new Date(transaction.transaction_date).toLocaleDateString()}
        </p>
        <p>
          <strong>Tax Rate:</strong> {transaction.tax_rate}
        </p>
        <p>
          <strong>Processed by:</strong> {transaction.username}
        </p>

        {transaction.supplier && (
          <>
            <h3 className="mt-4 font-semibold">Supplier Information</h3>
            <p>
              <strong>Name:</strong> {transaction.supplier.suplier_name}
            </p>
            <p>
              <strong>Address:</strong> {transaction.supplier.address},{" "}
              {transaction.supplier.city}, {transaction.supplier.country}
            </p>
            <p>
              <strong>Contact:</strong> {transaction.supplier.contact_name} (
              {transaction.supplier.contact_phone}){" "}
              {transaction.supplier.contact_email}
            </p>
            <h3 className="mt-4 font-semibold">Payment Information</h3>
            <p>
              <strong>Payment Terms:</strong>{" "}
              {transaction.supplier.payment_terms}
            </p>
            <p>
              <strong>Bank Name:</strong> {transaction.supplier.bank_name}
            </p>
            <p>
              <strong>Bank Account:</strong> {transaction.supplier.bank_account}
            </p>
          </>
        )}
      </div>

      <h3 className="text-lg font-semibold mb-2">Products</h3>
      <TransactionDetailTable
        details={transaction.transaction_detail}
        taxRate={transaction.tax_rate}
      />
    </div>
  );
};

export default TransactionDetailPage;
