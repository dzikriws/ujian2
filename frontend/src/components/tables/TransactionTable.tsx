import React, { useState } from "react";
import Pagination from "../commons/Pagination";
import ItemsPerPageSelector from "../commons/ItemsPerPageSelector";
import he from "he";  

interface Transaction {
  transaction_id: number;
  doctor_name: string;
  patient_name: number;
  service_group: string;
  date: Date;
  tax_rate: number | null;
  username: string;
  details: {
    category_id: number;
    qty: number;
  }[];
}

interface TransactionTableProps {
  transactions: Transaction[];
}

const TransactionTable: React.FC<TransactionTableProps> = ({
    transactions
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedTransactions = transactions.slice(startIndex, endIndex);

  return (
    <div className="overflow-x-auto">
      <ItemsPerPageSelector
        itemsPerPage={itemsPerPage}
        onChange={(value: React.SetStateAction<number>) => {
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
            <th>Grand Total</th>
          </tr>
        </thead>
        <tbody>
          {displayedTransactions.map((transaction) => (
            <tr key={transaction.transaction_id}>
              <td>{transaction.transaction_id}</td>
              <td>{he.decode(transaction.doctor_name)}</td>
              <td>{transaction.patient_name}</td>
              <td>{transaction.service_group}</td>
              <td>{transaction.tax_rate}</td>
            </tr>
          ))}
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
