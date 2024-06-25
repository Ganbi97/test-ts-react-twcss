import React, { useState, useEffect } from "react";
import "./App.css";
import { User } from "./types";
import UserList from "./components/UserList";
import AddUserForm from "./components/AddUserForm";
import { AuthProvider, useAuth } from "./context/AuthContext";
import LoginPage from "./components/LoginPage";
import EditUserModal from "./components/EditUserModal";
import UserPanel from "./components/UserPanel";

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
    {
      id: 3,
      name: "Admin User",
      email: "admin@example.com",
      username: "admin",
      password: "password",
      isAdmin: true,
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

const App: React.FC = () => {
  const { user, isAuthenticated, login, logout, setUser } = useAuth();
  const [users] = useState<User[]>([
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
    {
      id: 3,
      name: "Admin User",
      email: "admin@example.com",
      username: "admin",
      password: "password",
      isAdmin: true,
    },
  ]);

  const handleLogin = async (username: string, password: string) => {
    try {
      await login(username, password);
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
    }
  };

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, [setUser]);

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  return (
    <div className="App">
      <header className="App-header">
        {isAuthenticated && (
          <div className="flex justify-end">
            <button
              onClick={() => {
                logout();
              }}
              className="logout-button  bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 focus:outline-none focus:bg-red-600"
            >
              Cerrar Sesión
            </button>
          </div>
        )}
      </header>
      {isAuthenticated ? (
        user && user.isAdmin ? (
          <AdminPanel />
        ) : (
          user && <UserPanel currentUser={user} users={users} />
        )
      ) : (
        <LoginPage onLogin={handleLogin} />
      )}
    </div>
  );
};

const AppWithProviders: React.FC = () => (
  <AuthProvider>
    <App />
  </AuthProvider>
);

export default AppWithProviders;
