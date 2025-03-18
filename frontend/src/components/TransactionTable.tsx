import React, { useState } from "react";
import Pagination from "../components/Pagination";
import SearchBar from "../components/SearchBar";
import ItemsPerPageSelector from "../components/ItemsPerPageSelector";
import { useNavigate } from "react-router-dom";

interface Transaction {
  id: number;
  transaction_type: string;
  supplier_id: number | null;
  customer_name: string | null;
  transaction_date: string;
  tax_rate: string;
  username: string;
  supplier?: {
    id: number;
    suplier_name: string;
  } | null;
}

interface TransactionTableProps {
  transactions: Transaction[];
}

const TransactionTable: React.FC<TransactionTableProps> = ({
  transactions,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const filteredTransactions = transactions.filter(
    (transaction) =>
      transaction.customer_name
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      transaction.supplier?.suplier_name
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      transaction.transaction_date
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase())
  );

  const navigate = useNavigate();

  const totalItems = filteredTransactions.length;
  //   const totalPages = Math.ceil(totalItems / itemsPerPage);

  const paginatedTransactions = filteredTransactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSeeDetail = (id: number) => {
    navigate(`/transactions/${id}`);
  };

  return (
    <div className="overflow-x-auto">
      <SearchBar
        onSearch={setSearchQuery}
        placeholder="Search by Customer, Supplier, or Date..."
      />
      <ItemsPerPageSelector
        itemsPerPage={itemsPerPage}
        onChange={setItemsPerPage}
      />

      <table className="table w-full">
        <thead>
          <tr>
            <th>ID</th>
            <th>Type</th>
            <th>Customer / Supplier</th>
            <th>Tax Rate</th>
            <th>Handled By</th>
            <th>Transaction Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {paginatedTransactions.map((transaction) => (
            <tr key={transaction.id}>
              <td>{transaction.id}</td>
              <td>
                <span
                  className={`px-2 py-1 rounded text-white text-sm font-semibold ${
                    transaction.transaction_type === "penjualan"
                      ? "bg-green-500" 
                      : "bg-blue-500"
                  }`}
                >
                  {transaction.transaction_type === "penjualan"
                    ? "Sales"
                    : "Purchase"}
                </span>
              </td>
              <td>
                {transaction.customer_name ||
                  transaction.supplier?.suplier_name}
              </td>
              <td>{transaction.tax_rate}</td>
              <td>{transaction.username}</td>
              <td>
                {transaction.transaction_date.split("T")[0]}
              </td>
              <td>
                <button
                  type="button"
                  className="btn btn-sm btn-info"
                  onClick={() => handleSeeDetail(transaction.id)}
                >
                  More
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Pagination
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default TransactionTable;
