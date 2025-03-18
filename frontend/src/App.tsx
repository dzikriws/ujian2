import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Layout from "./components/Layout";
import DashboardPage from "./pages/DashboardPage";
import NotFoundPage from "./pages/NotFoundPage";
import ProductsPage from "./pages/ProductsPage";
import UomPage from "./pages/UomPage";
import SupplierPage from "./pages/SupplierPage";
import TransactionPage from "./pages/TransactionPage";
import TransactionDetailPage from "./pages/TransactionDetailPage";
import PriceListPage from "./pages/PriceListPage";
import SupplierDetailPage from "./pages/SupplierDetailPage";
import UserRolePage from "./pages/UserRolePage";
import AddTransactionPage from "./pages/AddTransactionPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />

        <Route path="/" element={<Layout />}>
          <Route path="dashboard" index element={<DashboardPage />} />
          <Route path="products" index element={<ProductsPage />} />
          <Route path="uoms" index element={<UomPage />} />
          <Route path="suppliers" index element={<SupplierPage />} />
          <Route path="suppliers/:id" element={<SupplierDetailPage />} />
          <Route path="users" index element={<UserRolePage/>} />
          <Route path="transactions" index element={<TransactionPage />} />
          <Route path="transactions/:id" element={<TransactionDetailPage />} />
          <Route path="pricelists" index element={<PriceListPage />} />
          <Route path="add-transaction" index element={<AddTransactionPage />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
