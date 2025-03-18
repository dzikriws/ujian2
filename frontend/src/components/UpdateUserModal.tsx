import React, { useState, useEffect } from "react";

interface UpdateUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (
    id: number,
    updatedUser: { username: string; role: string }
  ) => void;
  user?: {
    role_id: number;
    username: string;
    role: string;
  };
}

const UpdateUserModal: React.FC<UpdateUserModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  user,
}) => {
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    if (user) {
      setUsername(user.username);
      setRole(user.role);
    }
  }, [user]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (user) {
      onSubmit(user.role_id, { username, role });
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-base-200 p-6 rounded shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4 text-white">Update User</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="input w-full mb-2"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="text"
            className="input w-full mb-2"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          />
          <div className="flex justify-end gap-2">
            <button type="button" className="btn" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateUserModal;
