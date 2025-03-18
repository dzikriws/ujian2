import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar"; // Import Navbar

const Layout: React.FC = () => {
  return (
    <div>
      <Navbar />
      <main className="p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
