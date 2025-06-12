// src/pages/Register.js
import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "patient" // default role; adjust if needed
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/auth/register", form);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", form.role);
      navigate(`/${form.role}`);
    } catch (err) {
      alert(err.response?.data?.msg || "Registration failed");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
          Create Account
        </h2>
        <form onSubmit={handleRegister} className="space-y-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Full Name
          </label>
          <input
            id="name"
            type="text"
            name="name"
            autoComplete="name"
            placeholder="John Doe"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />

          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            id="email"
            type="email"
            name="email"
            autoComplete="email"
            placeholder="you@example.com"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />

          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            id="password"
            type="password"
            name="password"
            autoComplete="new-password"
            placeholder="••••••••"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
          >
            Register
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
}
