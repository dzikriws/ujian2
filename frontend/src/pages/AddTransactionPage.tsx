import React, { useState, useEffect } from "react";
import { getSuppliers } from "../services/supplierService";
import { getUserRoles } from "../services/userRoleService";
import { getProducts } from "../services/productService";
import { getUoms } from "../services/uomServices";
import { addTransaction } from "../services/transactionService";
import { useNavigate } from "react-router-dom";

const AddTransactionPage: React.FC = () => {
  const [transactionType, setTransactionType] = useState("penjualan");
  const [customerName, setCustomerName] = useState("");
  const [supplierId, setSupplierId] = useState<number | null>(null);
  const [transactionDate, setTransactionDate] = useState("");
  const [taxRate, setTaxRate] = useState(0);
  const [username, setUsername] = useState("");
  const [transactionDetails, setTransactionDetails] = useState([
    { product_id: 0, uom_id: 0, quantity: 1 },
  ]);

  const [suppliers, setSuppliers] = useState([]);
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [uoms, setUoms] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getSuppliers().then(setSuppliers);
    getUserRoles().then(setUsers);
    getProducts().then(setProducts);
    getUoms().then(setUoms);
  }, []);

  const handleAddTransaction = async () => {
    if (transactionType === "pembelian" && !supplierId) {
      alert("Please select a supplier.");
      return;
    }

    if (transactionType === "penjualan" && !customerName) {
      alert("Please enter a customer name.");
      return;
    }

    if (!transactionDate) {
      alert("Please select a transaction date.");
      return;
    }

    if (!username) {
      alert("Please select a user who handled this transaction.");
      return;
    }

    if (transactionDetails.length === 0) {
      alert("Please add at least one transaction detail.");
      return;
    }

    const transactionData = {
      transaction_type: transactionType,
      customer_name: transactionType === "penjualan" ? customerName : null,
      supplier_id: transactionType === "pembelian" ? supplierId : null,
      transaction_date: new Date(transactionDate).toISOString(),
      tax_rate: taxRate,
      username,
      transaction_detail: transactionDetails.map((detail) => ({
        product_id: detail.product_id,
        uom_id: detail.uom_id,
        quantity: detail.quantity,
      })),
    };

    try {
      const response = await addTransaction(transactionData);
      alert("Transaction added successfully!");
      console.log(response);
      navigate(`/transactions/${response.data.transaction.id}`);
    } catch (error) {
      console.error("Error adding transaction:", error);
      alert("Failed to add transaction.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-base-200 shadow-md rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Add Transaction</h2>

      {/* Master Transaction */}
      <div className="grid grid-cols-2 gap-4">
        {/* Transaction Type */}
        <div>
          <label className="block text-gray-700">Transaction Type</label>
          <select
            className="w-full border rounded p-2 bg-base-200"
            value={transactionType}
            onChange={(e) => setTransactionType(e.target.value)}
          >
            <option value="penjualan">Penjualan</option>
            <option value="pembelian">Pembelian</option>
          </select>
        </div>

        {/* Customer Name / Supplier */}
        {transactionType === "penjualan" ? (
          <div>
            <label className="block text-gray-700">Customer Name</label>
            <input
              required
              type="text"
              className="w-full border rounded p-2"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
            />
          </div>
        ) : (
          <div>
            <label className="block text-gray-700">Supplier</label>
            <select
              className="w-full border rounded p-2 bg-base-200"
              onChange={(e) => setSupplierId(Number(e.target.value))}
            >
              <option value="">Select Supplier</option>
              {suppliers.map((supplier: any) => (
                <option key={supplier.id} value={supplier.id}>
                  {supplier.suplier_name}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Transaction Date */}
        <div>
          <label className="block text-gray-700">Transaction Date</label>
          <input
            type="date"
            className="w-full border rounded p-2"
            value={transactionDate}
            onChange={(e) => setTransactionDate(e.target.value)}
          />
        </div>

        {/* Tax Rate */}
        <div>
          <label className="block text-gray-700">Tax Rate</label>
          <select
            className="w-full border rounded p-2 bg-base-200"
            value={taxRate}
            onChange={(e) => setTaxRate(Number(e.target.value))}
          >
            <option value={0}>0%</option>
            <option value={0.1}>10%</option>
            <option value={0.15}>15%</option>
          </select>
        </div>

        {/* Username */}
        <div>
          <label className="block text-gray-700">Handled By</label>
          <select
            className="w-full border rounded p-2 bg-base-200"
            onChange={(e) => setUsername(e.target.value)}
          >
            <option value="">Select User</option>
            {users.map((user: any) => (
              <option key={user.role_id} value={user.username}>
                {user.username} - {user.role}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Transaction Details */}
      <h3 className="text-lg font-semibold mt-6">Transaction Details</h3>
      <div className="space-y-4">
        {transactionDetails.map((detail, index) => (
          <div key={index} className="flex gap-4">
            {/* Product */}
            <div className="flex-1">
              <label className="block text-gray-700">Product</label>
              <select
                className="w-full border rounded p-2 bg-base-200"
                onChange={(e) =>
                  setTransactionDetails((prev) =>
                    prev.map((d, i) =>
                      i === index
                        ? { ...d, product_id: Number(e.target.value) }
                        : d
                    )
                  )
                }
              >
                <option value="">Select Product</option>
                {products.map((product: any) => (
                  <option key={product.id} value={product.id}>
                    {product.product_name}
                  </option>
                ))}
              </select>
            </div>

            {/* UOM */}
            <div className="flex-1">
              <label className="block text-gray-700">UOM</label>
              <select
                className="w-full border rounded p-2 bg-base-200"
                onChange={(e) =>
                  setTransactionDetails((prev) =>
                    prev.map((d, i) =>
                      i === index ? { ...d, uom_id: Number(e.target.value) } : d
                    )
                  )
                }
              >
                <option value="">Select UOM</option>
                {uoms.map((uom: any) => (
                  <option key={uom.id} value={uom.id}>
                    {uom.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Quantity */}
            <div className="w-24">
              <label className="block text-gray-700">Quantity</label>
              <input
                type="number"
                className="w-full border rounded p-2"
                value={detail.quantity}
                onChange={(e) =>
                  setTransactionDetails((prev) =>
                    prev.map((d, i) =>
                      i === index
                        ? { ...d, quantity: Number(e.target.value) }
                        : d
                    )
                  )
                }
              />
            </div>

            {/* Remove Button */}
            <button
              className="bg-red-500 text-white px-4 py-2 rounded mt-6"
              onClick={() =>
                setTransactionDetails((prev) =>
                  prev.filter((_, i) => i !== index)
                )
              }
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <button
        className="bg-blue-500 text-white px-4 py-2 rounded mt-4 mr-4"
        onClick={() =>
          setTransactionDetails((prev) => [
            ...prev,
            { product_id: 0, uom_id: 0, quantity: 1 },
          ])
        }
      >
        Add Product
      </button>

      <button
        className="bg-green-500 text-white px-4 py-2 rounded mt-4"
        onClick={handleAddTransaction}
      >
        Submit Transaction
      </button>
    </div>
  );
};

export default AddTransactionPage;
