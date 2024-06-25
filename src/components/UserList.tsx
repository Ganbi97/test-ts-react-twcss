import React from "react";
import { User } from "../types";

interface UserListProps {
  users: User[];
  onEditUser: (user: User) => void;
  onDeleteUser: (userId: number) => void;
  isAdmin: boolean;
}

const UserList: React.FC<UserListProps> = ({
  users,
  onEditUser,
  onDeleteUser,
  isAdmin,
}) => {
  return (
    <div className="mt-6">
      <h2 className="text-xl font-bold mb-4">Lista de Usuarios</h2>
      {users.length === 0 ? (
        <p>No hay usuarios registrados.</p>
      ) : (
        <ul>
          {users.map((user) => (
            <li
              key={user.id}
              className="flex justify-between items-center mb-2"
            >
              <span>{user.name}</span>
              <div>
                <button
                  onClick={() => onEditUser(user)}
                  className={`${
                    isAdmin ? "bg-yellow-500" : "bg-blue-500"
                  } text-white px-4 py-2 rounded-lg hover:${
                    isAdmin ? "bg-yellow-600" : "bg-blue-600"
                  } focus:outline-none focus:${
                    isAdmin ? "bg-yellow-600" : "bg-blue-600"
                  } mr-2`}
                >
                  {isAdmin ? "Editar" : "Ver"}
                </button>
                {isAdmin && (
                  <button
                    onClick={() => onDeleteUser(user.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 focus:outline-none focus:bg-red-600"
                  >
                    Eliminar
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserList;
