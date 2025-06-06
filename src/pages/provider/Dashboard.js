import React from "react";
import SidebarLayout from "../../layouts/SidebarLayout";

function ProviderDashboard() {
  return (
    <SidebarLayout role="provider">
      <h1 className="text-3xl font-bold mb-4">Provider Dashboard</h1>
      <p className="text-gray-700">Welcome, Provider. View patient data and manage your schedule.</p>
    </SidebarLayout>
  );
}

export default ProviderDashboard;

