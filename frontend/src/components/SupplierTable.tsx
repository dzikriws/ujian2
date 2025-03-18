import React, { useState } from "react";
import Pagination from "./Pagination";
import { useNavigate } from "react-router-dom";
import ItemsPerPageSelector from "./ItemsPerPageSelector";

interface Supplier {
  id: number;
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
  created_at: string;
}

interface SupplierTableProps {
  suppliers: Supplier[];
  onEdit: (supplier: Supplier) => void;
  onDelete: (id: number) => void;
}

const SupplierTable: React.FC<SupplierTableProps> = ({
  suppliers,
  onEdit,
  onDelete,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const navigate = useNavigate();

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedSuppliers = suppliers.slice(startIndex, endIndex);

  const handleSeeDetail = (id: number) => {
    navigate(`/suppliers/${id}`);
  };

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
            <th>No.</th>
            <th>ID</th>
            <th>Supplier Name</th>
            <th>City</th>
            <th>Country</th>
            <th>Contact</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {displayedSuppliers.length > 0 ? (
            displayedSuppliers.map((supplier, index) => (
              <tr key={supplier.id}>
                <td>{startIndex + index + 1}</td>
                <td>{supplier.id}</td>
                <td>{supplier.suplier_name}</td>
                <td>{supplier.city}</td>
                <td>{supplier.country}</td>
                <td>{supplier.contact_name}</td>
                <td>{supplier.contact_phone}</td>
                <td className="flex gap-2">
                  <button
                    className="btn btn-sm btn-warning"
                    onClick={() => onEdit(supplier)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => onDelete(supplier.id)}
                  >
                    Delete
                  </button>
                  <button
                    type="button"
                    className="btn btn-sm btn-info"
                    onClick={() => handleSeeDetail(supplier.id)}
                  >
                    More
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7} className="text-center py-4">
                No suppliers available
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <Pagination
        totalItems={suppliers.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default SupplierTable;
