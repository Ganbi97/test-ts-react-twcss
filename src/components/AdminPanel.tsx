import React, { useState } from "react";
import { User } from "../types";
import UserList from "./UserList";
import AddUserForm from "./AddUserForm";
import EditUserModal from "./EditUserModal";

const AdminPanel: React.FC = () => {
  const initialUsers: User[] = [
    {
      id: 1,
      name: "Roberto Musso",
      email: "elcuarteto@denos.com",
      username: "roberto",
      password: "musso",
      isAdmin: false,
    },
    {
      id: 2,
      name: "Gustavo Cerati",
      email: "soda@lechuga.com",
      username: "gustavo",
      password: "cerati",
      isAdmin: false,
    },
  ];

  const [users, setUsers] = useState<User[]>(initialUsers);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const handleAddUser = (newUser: User) => {
    setUsers([...users, newUser]);
  };

  const handleEditUser = (updatedUser: User) => {
    setUsers(
      users.map((user) => (user.id === updatedUser.id ? updatedUser : user))
    );
    setSelectedUser(null);
  };

  const handleDeleteUser = (userId: number) => {
    setUsers(users.filter((user) => user.id !== userId));
  };

  const openEditModal = (user: User) => {
    setSelectedUser(user);
  };

  const closeEditModal = () => {
    setSelectedUser(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Panel de Administración
        </h1>
        <AddUserForm onAddUser={handleAddUser} />
        <UserList
          users={users}
          onEditUser={openEditModal}
          onDeleteUser={handleDeleteUser}
          isAdmin={true}
        />
        {selectedUser && (
          <EditUserModal
            user={selectedUser}
            onSave={handleEditUser}
            onCancel={closeEditModal}
          />
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
