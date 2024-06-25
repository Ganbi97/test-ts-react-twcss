import React, { useState } from "react";
import { User } from "../types";
import ViewUserModal from "./ViewUserModal";

interface UserPanelProps {
  currentUser: User;
  users: User[];
}

const UserPanel: React.FC<UserPanelProps> = ({ currentUser, users }) => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const handleViewUser = (user: User) => {
    setSelectedUser(user);
  };

  const closeUserDetailsModal = () => {
    setSelectedUser(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Panel de Usuario
        </h1>
        <ul>
          {users
            .filter((user) => !user.isAdmin)
            .map((user) => (
              <li
                key={user.id}
                className="flex justify-between items-center mb-4 p-4 border-b"
              >
                <span>{user.name}</span>
                <button
                  onClick={() => handleViewUser(user)}
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Ver
                </button>
              </li>
            ))}
        </ul>
        {selectedUser && (
          <ViewUserModal user={selectedUser} onClose={closeUserDetailsModal} />
        )}
      </div>
    </div>
  );
};

export default UserPanel;
