// src/pages/RegisterProvider.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

export default function RegisterProvider() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const navigate = useNavigate();

  const onChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmit = async e => {
  e.preventDefault();
  const { name, email, password, confirmPassword } = form;
  if (password !== confirmPassword) {
    return alert('Passwords do not match');
  }

  try {
    const { data } = await axios.post('/api/auth/register', {
      name,
      email,
      password,
      role: 'provider'
    });

    const { token, user } = data;
    localStorage.setItem('token', token);
    localStorage.setItem('role', user.role);
    localStorage.setItem('userName', user.name);

-   navigate('/appointments/provider');
+   navigate('/provider/appointments');
  } catch (err) {
    console.error('Registration error:', err);
    alert(err.response?.data?.msg || 'Registration failed');
  }
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Register as Provider</h2>
        <form onSubmit={onSubmit} className="space-y-4">
          <input
            name="name"
            value={form.name}
            onChange={onChange}
            placeholder="Full Name"
            required
            className="w-full p-2 border rounded"
          />
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={onChange}
            placeholder="Email"
            required
            className="w-full p-2 border rounded"
          />
          <input
            name="password"
            type="password"
            value={form.password}
            onChange={onChange}
            placeholder="Password"
            required
            className="w-full p-2 border rounded"
          />
          <input
            name="confirmPassword"
            type="password"
            value={form.confirmPassword}
            onChange={onChange}
            placeholder="Confirm Password"
            required
            className="w-full p-2 border rounded"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded"
          >
            Register as Provider
          </button>
        </form>
        <p className="mt-4 text-center text-sm">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-600 hover:underline">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
}
