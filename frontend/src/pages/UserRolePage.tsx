import React, { useEffect, useState } from "react";
import {
  getUserRoles,
  addUserRole,
  updateUserRole,
  deleteUserRole,
} from "../services/userRoleService";
import UserTable from "../components/UserTable";
import AddUserModal from "../components/AddUserModal";
import UpdateUserModal from "../components/UpdateUserModal";

interface UserRole {
  role_id: number;
  username: string;
  role: string;
  ts_insert: string;
  status: string;
}

const UserRolePage: React.FC = () => {
  const [users, setUsers] = useState<UserRole[]>([]);
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserRole | null>(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const data = await getUserRoles();
    setUsers(data);
  };

  const handleAddUser = async (newUser: { username: string; role: string }) => {
    await addUserRole(newUser);
    fetchUsers();
  };

  const handleEditUser = (user: UserRole) => {
    setSelectedUser(user);
    setUpdateModalOpen(true);
  };

  const handleUpdateUser = async (
    id: number,
    updatedUser: { username: string; role: string }
  ) => {
    await updateUserRole(id, updatedUser);
    fetchUsers();
  };

  const handleDeleteUser = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      await deleteUserRole(id);
      fetchUsers();
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">User Roles</h1>
        <button
          className="btn btn-primary"
          onClick={() => setAddModalOpen(true)}
        >
          + Add User
        </button>
      </div>

      <UserTable
        users={users}
        onEdit={handleEditUser}
        onDelete={handleDeleteUser}
      />

      <AddUserModal
        isOpen={isAddModalOpen}
        onClose={() => setAddModalOpen(false)}
        onSubmit={handleAddUser}
      />

      <UpdateUserModal
        isOpen={isUpdateModalOpen}
        onClose={() => setUpdateModalOpen(false)}
        onSubmit={handleUpdateUser}
        user={selectedUser || undefined}
      />
    </div>
  );
};

export default UserRolePage;
