import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Layout from "./components/Layout";
import DashboardPage from "./pages/DashboardPage";
import NotFoundPage from "./pages/NotFoundPage";
// import UomPage from "./pages/UomPage";
// import SupplierPage from "./pages/SupplierPage";
// import TransactionPage from "./pages/TransactionPage";
// import TransactionDetailPage from "./pages/TransactionDetailPage";
// import SupplierDetailPage from "./pages/SupplierDetailPage";
// import UserRolePage from "./pages/UserRolePage";
// import AddTransactionPage from "./pages/AddTransactionPage";

import ProtectedRoute from "./components/ProtectedRoute";

import ServiceCategoryPage from "./pages/ServiceCategoryPage";
import DoctorPage from "./pages/DoctorPage";
import ServicePage from "./pages/ServicePage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />

        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="service-categories" element={<ServiceCategoryPage />} />
            <Route path="doctors" element={<DoctorPage />} />
            <Route path="services" element={<ServicePage />}/>
            {/* <Route path="transactions" element={}/> */}




            {/* <Route path="uoms" element={<UomPage />} />
            <Route path="suppliers" element={<SupplierPage />} />
            <Route path="suppliers/:id" element={<SupplierDetailPage />} />
            <Route path="users" element={<UserRolePage />} />
            <Route path="transactions" element={<TransactionPage />} />
            <Route
              path="transactions/:id"
              element={<TransactionDetailPage />}
            />
            <Route path="add-transaction" element={<AddTransactionPage />} /> */}
          </Route>
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
