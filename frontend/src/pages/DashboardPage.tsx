import React, { useEffect, useState } from "react";
import { getDashboardStats } from "../services/dashboardService";
import StatCard from "../components/StatCard";

const DashboardPage: React.FC = () => {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getDashboardStats();
        setStats(data);
      } catch (error) {
        console.error("Failed to fetch stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) return <p className="text-center">Loading...</p>;
  if (!stats)
    return <p className="text-center text-red-500">Failed to load stats</p>;

  return (
    <div className="p-6 flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mx-auto border-1 border-indigo-500">
        <StatCard
          title="Total Transactions"
          description="transaction"
          total={stats.transaction.totalTransaction}
          date={stats.transaction.oldestTransaction.transaction_date}
        />
        <StatCard
          title="Total Products"
          description="products"
          total={stats.product.totalProduct}
          date={stats.product.oldestProduct.created_at}
        />
        <StatCard
          title="Total Suppliers"
          description="suppliers"
          total={stats.supplier.totalSupplier}
          date={stats.supplier.oldestSupplier.updated_at}
        />
        <StatCard
          title="Total Users"
          description="users"
          total={stats.employee.totalEmployee}
          date={stats.employee.oldestEmployee.ts_insert}
        />
      </div>
    </div>
  );
};

export default DashboardPage;
