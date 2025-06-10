import React from "react";
import Sidebar from "../../components/Sidebar"; // ✅ Make sure Sidebar.js exists here

function AdminDashboard() {
  return (
    <div className="flex min-h-screen">
      <Sidebar role="admin" />
      <div className="p-6 flex-1">
        <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
        <p className="text-gray-700">
          Welcome, Admin. Manage users, settings, and reports here.
        </p>
      </div>
    </div>
  );
}

export default AdminDashboard;

