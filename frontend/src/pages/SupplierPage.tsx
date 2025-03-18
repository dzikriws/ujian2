import React, { useEffect, useState } from "react";
import {
  getSuppliers,
  addSupplier,
  updateSupplier,
  deleteSupplier,
} from "../services/supplierService";
import AddSupplierModal from "../components/AddSupplierModal";
import UpdateSupplierModal from "../components/UpdateSupplierModal";
import SupplierTable from "../components/SupplierTable";
import SearchBar from "../components/SearchBar";

const SupplierPage: React.FC = () => {
  const [suppliers, setSuppliers] = useState<any[]>([]);
  const [filteredSuppliers, setFilteredSuppliers] = useState<any[]>([]);
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState<any>(null);

  useEffect(() => {
    fetchSuppliers();
  }, []);

  useEffect(() => {
    setFilteredSuppliers(suppliers);
  }, [suppliers]);

  const fetchSuppliers = async () => {
    const data = await getSuppliers();
    setSuppliers(data);
  };

  const handleAddSupplier = async (newSupplier: any) => {
    await addSupplier(newSupplier);
    fetchSuppliers();
  };

  const handleEditSupplier = (supplier: any) => {
    setSelectedSupplier(supplier);
    setUpdateModalOpen(true);
  };

  const handleUpdateSupplier = async (id: number, updatedSupplier: any) => {
    await updateSupplier(id, updatedSupplier);
    fetchSuppliers();
  };

  const handleDeleteSupplier = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this supplier?")) {
      await deleteSupplier(id);
      fetchSuppliers();
    }
  };

  const handleSearch = (query: string) => {
    const lowerCaseQuery = query.toLowerCase();
    const filtered = suppliers.filter(
      (supplier) =>
        supplier.suplier_name.toLowerCase().includes(lowerCaseQuery) ||
        supplier.city.toLowerCase().includes(lowerCaseQuery) ||
        supplier.country.toLowerCase().includes(lowerCaseQuery) ||
        supplier.contact_name.toLowerCase().includes(lowerCaseQuery)
    );
    setFilteredSuppliers(filtered);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Supplier List</h1>
        <button
          className="btn btn-primary"
          onClick={() => setAddModalOpen(true)}
        >
          + Add Supplier
        </button>
      </div>

      <SearchBar onSearch={handleSearch} placeholder="Search Suppliers, Location or Contact..." />

      <SupplierTable
        suppliers={filteredSuppliers}
        onEdit={handleEditSupplier}
        onDelete={handleDeleteSupplier}
      />

      <AddSupplierModal
        isOpen={isAddModalOpen}
        onClose={() => setAddModalOpen(false)}
        onSubmit={handleAddSupplier}
      />

      <UpdateSupplierModal
        isOpen={isUpdateModalOpen}
        onClose={() => setUpdateModalOpen(false)}
        onSubmit={handleUpdateSupplier}
        supplier={selectedSupplier}
      />
    </div>
  );
};

export default SupplierPage;
