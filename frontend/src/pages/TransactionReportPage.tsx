import React, { useEffect, useState } from "react";
import { getTransactions } from "../services/transactionsService";
import TransactionReportsTable from "../components/tables/TransactionReportTable";
import SearchBar from "../components/commons/SearchBar";
import {TransactionType} from "../components/types/transaction";

const TransactionReportPage: React.FC = () => {
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
        <h1 className="text-2xl font-bold">Transaction Reports</h1>
      </div>

      <SearchBar onSearch={handleSearch} placeholder="Search Transactions..." />

      {loading ? (
        <p>Loading...</p>
      ) : (
        <TransactionReportsTable transactions={filteredTransactions} />
      )}
    </div>
  );
};

export default TransactionReportPage;
