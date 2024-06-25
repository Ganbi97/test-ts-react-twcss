import React, { useState } from "react";
import { User } from "../types";

interface AddUserFormProps {
  onAddUser: (newUser: User) => void;
}

const AddUserForm: React.FC<AddUserFormProps> = ({ onAddUser }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = () => {
    let valid = true;
    const newErrors: { [key: string]: string } = {};

    if (!name.trim()) {
      newErrors.name = "El nombre es requerido";
      valid = false;
    }

    if (!email.trim()) {
      newErrors.email = "El email es requerido";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "El email no es válido";
      valid = false;
    }

    if (!username.trim()) {
      newErrors.username = "El usuario es requerido";
      valid = false;
    }

    if (!password.trim()) {
      newErrors.password = "La contraseña es requerida";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (validateForm()) {
      const newUser: User = {
        id: Date.now(),
        name,
        email,
        username,
        password,
        isAdmin: false,
      };
      onAddUser(newUser);
      setName("");
      setEmail("");
      setUsername("");
      setPassword("");
      setErrors({});
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col items-center">
        <h2 className="text-xl font-bold mb-4">Agregar Usuario</h2>
        <div className="mb-4 w-full flex justify-between">
          <label htmlFor="name" className="w-1/3 text-right mr-4">
            Nombre:
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={`border border-black p-2 rounded-lg flex-1 ${
              errors.name ? "border-red-500" : ""
            }`}
          />
        </div>
        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        <div className="mb-4 w-full flex justify-between">
          <label htmlFor="email" className="w-1/3 text-right mr-4">
            Email:
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`border border-black p-2 rounded-lg flex-1 ${
              errors.email ? "border-red-500" : ""
            }`}
          />
        </div>
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        <div className="mb-4 w-full flex justify-between">
          <label htmlFor="username" className="w-1/3 text-right mr-4">
            Usuario:
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className={`border border-black p-2 rounded-lg flex-1 ${
              errors.username ? "border-red-500" : ""
            }`}
          />
        </div>
        {errors.username && (
          <p className="text-red-500 text-sm">{errors.username}</p>
        )}
        <div className="mb-4 w-full flex justify-between">
          <label htmlFor="password" className="w-1/3 text-right mr-4">
            Contraseña:
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`border border-black p-2 rounded-lg flex-1 ${
              errors.password ? "border-red-500" : ""
            }`}
          />
        </div>
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password}</p>
        )}
      </div>
      <div className="flex justify-end mt-4">
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 focus:outline-none focus:bg-green-600"
        >
          Agregar
        </button>
      </div>
    </form>
  );
};

export default AddUserForm;
