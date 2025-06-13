import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function RegisterProvider() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const navigate = useNavigate();
  const { name, email, password, confirmPassword } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      const res = await axios.post('/api/auth/register', {
        name,
        email,
        password,
        role: 'provider'
      });

      const { token, user } = res.data;
      // Persist authentication
      localStorage.setItem('token', token);
      localStorage.setItem('role', user.role);
      localStorage.setItem('userName', user.name);

      // Redirect to provider dashboard
      navigate('/appointments/provider');
    } catch (err) {
      console.error('Registration error:', err);
      alert(err.response?.data?.msg || 'Registration failed');
    }
  };

  return (
    <form onSubmit={onSubmit} className="max-w-md mx-auto p-6 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Register as Provider</h2>

      <div className="mb-4">
        <label htmlFor="name" className="block text-sm font-medium mb-1">Name</label>
        <input
          id="name"
          name="name"
          type="text"
          required
          value={name}
          onChange={onChange}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          required
          value={email}
          onChange={onChange}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="password" className="block text-sm font-medium mb-1">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          required
          value={password}
          onChange={onChange}
          autoComplete="new-password"
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="confirmPassword" className="block text-sm font-medium mb-1">Confirm Password</label>
        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          required
          value={confirmPassword}
          onChange={onChange}
          autoComplete="new-password"
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
      >
        Register as Provider
      </button>
    </form>
  );
}
