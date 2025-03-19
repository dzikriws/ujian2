import React, { useEffect, useState } from "react";
import { getTransactions } from "../services/transactionsService";
import TransactionTable from "../components/tables/TransactionTable";
import { TransactionType } from "../components/types/transaction";
import AddTransactionModal from "../components/modals/AddTransactionModal";

const TransactionPage: React.FC = () => {
  const [transactions, setTransactions] = useState<TransactionType[]>([]);
  const [filteredTransactions, setFilteredTransactions] = useState<
    TransactionType[]
  >([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTransactions();
  }, []);

  useEffect(() => {
    setFilteredTransactions(transactions);
  }, [transactions]);

  const fetchTransactions = async () => {
    setLoading(true);
    const data = await getTransactions();
    setTransactions(data);
    setLoading(false);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Manage Transactions</h1>
        <button className="btn btn-primary">+ Add Transaction</button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <TransactionTable transactions={filteredTransactions} />
      )}
    </div>
  );
};

export default TransactionPage;
