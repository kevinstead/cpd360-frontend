import React from "react";
import Sidebar from "../../components/Sidebar";

function ProviderDashboard() {
  return (
    <div className="flex min-h-screen">
      <Sidebar role="provider" />
      <div className="p-6 flex-1">
        <h1 className="text-3xl font-bold mb-4">Provider Dashboard</h1>
        <p className="text-gray-700">
          Welcome, Provider. View patient data and manage your schedule.
        </p>
      </div>
    </div>
  );
}

export default ProviderDashboard;


