import React, { useEffect, useState } from "react";
import { getTransactions } from "../services/transactionService";
import TransactionTable from "../components/TransactionTable";
import { useNavigate } from "react-router-dom";

const TransactionPage: React.FC = () => {
  const [transactions, setTransactions] = useState([]);
  const [transactionType, setTransactionType] = useState<
    "penjualan" | "pembelian" | "semua"
  >("semua");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const data = await getTransactions(
          transactionType === "semua" ? "" : transactionType
        );
        setTransactions(data);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchTransactions();
  }, [transactionType]);

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Transaction</h1>
        <button
          className="btn btn-primary"
          onClick={() => navigate("/add-transaction")}
        >
          + Add Transaction
        </button>
      </div>

      <div className="flex justify-end mb-4">
        <label className="mr-2 text-sm">Transaction Type:</label>
        <select
          className="border p-1 rounded bg-base-200"
          value={transactionType}
          onChange={(e) =>
            setTransactionType(
              e.target.value as "penjualan" | "pembelian" | "semua"
            )
          }
        >
          <option value="semua">All</option>
          <option value="penjualan">Sales</option>
          <option value="pembelian">Purchase</option>
        </select>
      </div>

      <TransactionTable transactions={transactions} />
    </div>
  );
};

export default TransactionPage;
