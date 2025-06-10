import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);


// 📁 src/App.js
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Navbar from './components/Navbar';
import { isAuthenticated } from './utils/auth';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      {isAuthenticated() && <Navbar />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={isAuthenticated() ? <Dashboard /> : <Navigate to="/login" />}
        />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </div>
  );
}

export default App;


// 📁 src/pages/Login.js
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../api/auth';
import { setToken } from '../utils/auth';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await login({ email, password });
      setToken(res.token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.msg || 'Login failed');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-80"
      >
        <h2 className="text-xl font-bold mb-4">CPD360 Login</h2>
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-3 p-2 border rounded"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-3 p-2 border rounded"
          required
        />
        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">
          Log In
        </button>
      </form>
    </div>
  );
}

export default Login;


// 📁 src/pages/Dashboard.js
function Dashboard() {
  const user = JSON.parse(localStorage.getItem('user'));
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Welcome, {user?.name || 'User'}!</h1>
      <p className="text-gray-600">Role: {user?.role}</p>
    </div>
  );
}

export default Dashboard;


// 📁 src/components/Navbar.js
import { useNavigate } from 'react-router-dom';
import { clearToken } from '../utils/auth';

function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    clearToken();
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow p-4 flex justify-between items-center">
      <span className="font-semibold">CPD360</span>
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-600">{user?.email}</span>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-3 py-1 rounded"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;


// 📁 src/api/auth.js
import axios from 'axios';

const API = 'http://localhost:5000/api/auth';

export const login = async (credentials) => {
  const res = await axios.post(`${API}/login`, credentials);
  localStorage.setItem('user', JSON.stringify(res.data.user));
  return res.data;
};


// 📁 src/utils/auth.js
export const setToken = (token) => {
  localStorage.setItem('token', token);
};

export const getToken = () => {
  return localStorage.getItem('token');
};

export const clearToken = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

export const isAuthenticated = () => {
  return !!localStorage.getItem('token');
};
