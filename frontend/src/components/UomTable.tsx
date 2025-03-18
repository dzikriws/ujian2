import React, { useState } from "react";
import Pagination from "./Pagination";
import SearchBar from "./SearchBar";
import ItemsPerPageSelector from "./ItemsPerPageSelector";

interface Uom {
  id: number;
  name: string;
  rate_conversion: number;
  created_at: string;
}

interface UomTableProps {
  uoms: Uom[];
  onEdit: (uom: Uom) => void;
  onDelete: (id: number) => void;
}

const UomTable: React.FC<UomTableProps> = ({ uoms, onEdit, onDelete }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const filteredUoms = uoms.filter(
    (uom) =>
      uom.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      uom.rate_conversion.toString().includes(searchQuery)
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUoms = filteredUoms.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="overflow-x-auto">
      <SearchBar onSearch={setSearchQuery} placeholder="Search UOM..." />

      {/* Dropdown Jumlah Item Per Halaman */}
      <ItemsPerPageSelector
        itemsPerPage={itemsPerPage}
        onChange={(value) => {
          setItemsPerPage(value);
          setCurrentPage(1);
        }}
      />

      {/* Tabel */}
      <table className="table table-zebra w-full">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Rate Conversion</th>
            <th>Created At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentUoms.map((uom, index) => (
            <tr key={uom.id}>
              <td>{indexOfFirstItem + index + 1}</td>
              <td>{uom.name}</td>
              <td>{uom.rate_conversion}</td>
              <td>{uom.created_at.split("T")[0]}</td>
              <td>
                <button
                  className="btn btn-sm btn-warning mr-2"
                  onClick={() => onEdit(uom)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => onDelete(uom.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Pagination
        totalItems={filteredUoms.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default UomTable;
