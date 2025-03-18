import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getSupplierById } from "../services/supplierService";

interface Transaction {
  id: number;
  transaction_type: string;
  supplier_id: number;
  customer_name: string | null;
  transaction_date: string;
  tax_rate: string;
  username: string;
}

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
  updated_at: string;
  status: string;
  transactions: Transaction[];
}

const SupplierDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [supplier, setSupplier] = useState<Supplier | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSupplier = async () => {
      try {
        setLoading(true);
        const data = await getSupplierById(Number(id));
        setSupplier(data);
      } catch (err) {
        setError("Failed to fetch supplier details.");
      } finally {
        setLoading(false);
      }
    };

    fetchSupplier();
  }, [id]);

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div className="container mx-auto p-4">
      <button className="btn btn-secondary mb-4" onClick={() => navigate(-1)}>
        Back
      </button>
      <h2 className="text-2xl font-bold mb-4">{supplier?.suplier_name}</h2>
      <div className="bg-base-200 p-4 rounded shadow-md">
        <p>
          <strong>Address:</strong> {supplier?.address}, {supplier?.city},{" "}
          {supplier?.country}
        </p>
        <p>
          <strong>Payment Terms:</strong> {supplier?.payment_terms}
        </p>
        <p>
          <strong>Bank:</strong> {supplier?.bank_name} -{" "}
          {supplier?.bank_account}
        </p>
        <p>
          <strong>Contact:</strong> {supplier?.contact_name} (
          {supplier?.contact_phone})
        </p>
        <p>
          <strong>Email:</strong> {supplier?.contact_email}
        </p>
        <p>
          <strong>Status:</strong> {supplier?.status}
        </p>
        <p>
          <strong>Created At:</strong>{" "}
          {new Date(supplier?.created_at || "").toLocaleString()}
        </p>
      </div>

      <h3 className="text-xl font-bold mt-6">Transactions</h3>
      {supplier?.transactions.length ? (
        <table className="table w-full mt-2">
          <thead>
            <tr>
              <th>ID</th>
              <th>Type</th>
              <th>Tax Rate</th>
              <th>Handled By</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {supplier.transactions.map((txn) => (
              <tr key={txn.id}>
                <td>{txn.id}</td>
                <td>{txn.transaction_type}</td>
                <td>{txn.tax_rate}%</td>
                <td>{txn.username}</td>
                <td>{new Date(txn.transaction_date).toLocaleDateString()}</td>
                <td>
                  <button className="">
                    <button
                      type="button"
                      className="btn btn-sm btn-info"
                      onClick={() => navigate(`/transactions/${txn.id}`)}
                    >
                      More
                    </button>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center text-gray-500 mt-2">No transactions found.</p>
      )}
    </div>
  );
};

export default SupplierDetailPage;
