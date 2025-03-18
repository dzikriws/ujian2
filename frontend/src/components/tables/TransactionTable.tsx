import React, { useState } from "react";
import Pagination from "../commons/Pagination";
import ItemsPerPageSelector from "../commons/ItemsPerPageSelector";

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

interface TransactionTableProps {
  transactions: Transaction[];
}

const TransactionTable: React.FC<TransactionTableProps> = ({
  transactions,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedTransactions = transactions.slice(startIndex, endIndex); // ✅ Pastikan ada slicing

  return (
    <div className="overflow-x-auto">
      <ItemsPerPageSelector
        itemsPerPage={itemsPerPage}
        onChange={(value) => {
          setItemsPerPage(value);
          setCurrentPage(1);
        }}
      />

      <table className="table table-zebra w-full">
        <thead>
          <tr>
            <th>Transaction ID</th>
            <th>Doctor Name</th>
            <th>Patient Name</th>
            <th>Service Group</th>
            <th>Tax Rate</th>
            <th>Grand Total</th>
          </tr>
        </thead>
        <tbody>
          {displayedTransactions.length > 0 ? (
            displayedTransactions.map((transaction) => (
              <tr key={transaction.transaction_id}>
                <td>{transaction.transaction_id}</td>
                <td>{transaction.doctor_name}</td>
                <td>{transaction.patient_name}</td>
                <td>{transaction.service_group}</td>
                <td>{transaction.tax_rate}</td>
                <td>{transaction.grand_total}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="text-center">
                No transactions found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <Pagination
        totalItems={transactions.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default TransactionTable;
