import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

const handleLogin = async (e) => {
  e.preventDefault();

  try {
    const res = await axios.post("http://localhost:5000/api/auth/login", form);
    const token = res.data.token;

    localStorage.setItem("token", token);

    const decoded = JSON.parse(atob(token.split(".")[1]));
    const role = decoded.role; console.log("✅ Decoded token:", decoded);
console.log("✅ Role:", role);
console.log("➡️ Navigating to:", role === "provider" ? "/provider" : "/something-else");


    // Role-based redirect
    if (role === "admin") navigate("/admin");
    else if (role === "provider") navigate("/provider");
    else if (role === "patient") navigate("/patient");
    else navigate("/");

  } catch (err) {
    alert(err.response?.data?.msg || "Login failed");
    console.error(err);
  }
};


  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form onSubmit={handleLogin} className="grid gap-4">
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          className="p-2 border rounded"
          required
        />
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Password"
          className="p-2 border rounded"
          required
        />
        <button type="submit" className="bg-blue-600 text-white py-2 rounded">
          Log In
        </button>
      </form>
    </div>
  );
}

export default Login;
