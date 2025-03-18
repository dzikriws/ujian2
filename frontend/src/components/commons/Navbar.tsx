import React from "react";
import LogoutButton from "./LogoutButton";

const Navbar: React.FC = () => {
  return (
    <div className="navbar bg-base-600 shadow-md">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li>
              <a href="/dashboard">Dashboard</a>
            </li>
            <li>
              <a href="/service-categories">Service Categories</a>
            </li>
            <li>
              <a href="/doctors">Doctors</a>
            </li>
            <li>
              <a href="/services">Services</a>
            </li>
            <li>
              <a href="/transactions">Transactions</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="navbar-center">
        <a className="text-xl">Clinic Service Management</a>
      </div>
      <div className="navbar-end">
            <LogoutButton />
      </div>
    </div>
  );
};

export default Navbar;
