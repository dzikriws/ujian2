import React, { useState } from "react";
import Pagination from "./Pagination";
import SearchBar from "./SearchBar";
import ItemsPerPageSelector from "./ItemsPerPageSelector";

interface User {
  role_id: number;
  username: string;
  role: string;
  ts_insert: string;
  status: string;
}

interface UserTableProps {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (id: number) => void;
}

const UserTable: React.FC<UserTableProps> = ({ users, onEdit, onDelete }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const filteredUsers = users.filter(
    (user) =>
      user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="overflow-x-auto">
      <SearchBar onSearch={setSearchQuery} placeholder="Search Users or Role..." />

      <ItemsPerPageSelector
        itemsPerPage={itemsPerPage}
        onChange={(value) => {
          setItemsPerPage(value);
          setCurrentPage(1);
        }}
      />

      <table className="table w-full">
        <thead>
          <tr>
            <th>Username</th>
            <th>Role</th>
            <th>Date Created</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map((user) => (
            <tr key={user.role_id}>
              <td>{user.username}</td>
              <td>{user.role}</td>
              <td>{user.ts_insert.split("T")[0]}</td>
              <td>
                <span
                  className={`px-2 py-1 rounded text-white text-sm font-semibold ${
                    user.status === "A" ? "bg-green-500" : "bg-red-500"
                  }`}
                >
                  {user.status === "A" ? "Active" : "Inactive"}
                </span>
              </td>
              <td>
                <button
                  className="btn btn-sm btn-warning mr-2"
                  onClick={() => onEdit(user)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => onDelete(user.role_id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Pagination
        totalItems={filteredUsers.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default UserTable;
