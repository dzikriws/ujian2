import React, { useEffect, useState } from "react";
import {
  getTransactions,
  //  createTransaction
} from "../services/transactionsService";
import TransactionTable from "../components/tables/TransactionTable";
import SearchBar from "../components/commons/SearchBar";
// import { useSnackbar } from "notistack";

interface Transaction {
  transaction_id: number;
  doctor_name: string;
  patient_name: string;
  service_group: string;
  date: string;
  tax_rate: number | null;
  username: string;
  details: {
    category_id: number;
    qty: number;
  }[];
}

const TransactionPage: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>(
    []
  );
  const [loading, setLoading] = useState(true);
  // const [isAddModalOpen, setAddModalOpen] = useState(false);
  // const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
  // const [selectedCategory, setSelectedCategory] =
  //   useState<Transaction | null>(null);

  // const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    fetchTransactions();
  }, []);

  useEffect(() => {
    setFilteredTransactions(transactions);
  }, [setTransactions]);

  const fetchTransactions = async () => {
    setLoading(true);
    const data = await getTransactions();
    setTransactions(data);
    console.log('oi', data);
    setLoading(false);
  };

  // const handleAddCategory = async (newCategory: { category_name: string }) => {
  //   try {
  //     const response = await addServiceCategory(newCategory);
  //     fetchCategories();
  //     enqueueSnackbar(response.message, { variant: "success" });
  //   } catch (error: any) {
  //     const errorMessage =
  //       error.response?.data?.message || "Failed to add category";
  //     enqueueSnackbar(errorMessage, { variant: "error" });
  //   }
  // };

  // const handleEditCategory = (category: ServiceCategory) => {
  //   setSelectedCategory(category);
  //   setUpdateModalOpen(true);
  // };

  // const handleUpdateCategory = async (
  //   id: number,
  //   updatedCategory: { category_name: string }
  // ) => {
  //   try {
  //     const response = await updateServiceCategory(id, updatedCategory);
  //     fetchCategories();
  //     enqueueSnackbar(response.message, { variant: "success" });
  //   } catch (error: any) {
  //     const errorMessage =
  //       error.response?.data?.message || "Failed to update category";
  //     enqueueSnackbar(errorMessage, { variant: "error" });
  //   }
  // };

  // const handleDeleteCategory = async (id: number) => {
  //   if (window.confirm("Are you sure you want to delete this category?")) {
  //     try {
  //       await deleteServiceCategory(id);
  //       fetchCategories();
  //       enqueueSnackbar("Category deleted successfully!", {
  //         variant: "success",
  //       });
  //     } catch (error) {
  //       enqueueSnackbar("Failed to delete category", { variant: "error" });
  //     }
  //   }
  // };

  const handleSearch = (query: string) => {
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
        <button
          className="btn btn-primary"
          // onClick={() => setAddModalOpen(true)}
        >
          + Add Transaction
        </button>
      </div>

      <SearchBar onSearch={handleSearch} placeholder="Search Transactions..." />

      {loading ? (
        <p>Loading...</p>
      ) : (
        <TransactionTable transactions={filteredTransactions} />
      )}

      {/* <AddServiceCategoryModal
        isOpen={isAddModalOpen}
        onClose={() => setAddModalOpen(false)}
        onSubmit={handleAddCategory}
      />

      <UpdateServiceCategoryModal
        isOpen={isUpdateModalOpen}
        onClose={() => setUpdateModalOpen(false)}
        onSubmit={handleUpdateCategory}
        serviceCategory={selectedCategory || undefined}
      /> */}
    </div>
  );
};

export default TransactionPage;
