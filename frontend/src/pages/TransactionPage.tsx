import React, { useEffect, useState } from "react";
import { getTransactions } from "../services/transactionsService";
import TransactionTable from "../components/tables/TransactionTable";
import SearchBar from "../components/commons/SearchBar";

interface Transaction {
  transaction_id: number;
  doctor_name: string;
  patient_name: string;
  service_group: string;
  date: string;
  tax_rate: number | null;
  username: string;
  grand_total: number;
  details: {
    category_id: number;
    qty: number;
  }[];
}

const TransactionPage: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [filteredTransactions, setFilteredTransactions] = useState<
    Transaction[]
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

  const handleSearch = (query: string) => {
    if (!query) {
      setFilteredTransactions(transactions);
      return;
    }

    const lowerCaseQuery = query.toLowerCase();
    const filtered = transactions.filter(
      (transaction) =>
        transaction.service_group.toLowerCase().includes(lowerCaseQuery) ||
        transaction.patient_name.toLowerCase().includes(lowerCaseQuery)
    );
    setFilteredTransactions(filtered);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Transactions</h1>
        <button className="btn btn-primary">+ Add Transaction</button>
      </div>

      <SearchBar onSearch={handleSearch} placeholder="Search Transactions..." />

      {loading ? (
        <p>Loading...</p>
      ) : (
        <TransactionTable transactions={filteredTransactions} />
      )}
    </div>
  );
};

export default TransactionPage;
