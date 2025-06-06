import React from "react";
import SidebarLayout from "../../layouts/SidebarLayout";

function PatientDashboard() {
  return (
    <SidebarLayout role="patient">
      <h1 className="text-3xl font-bold mb-4">Patient Dashboard</h1>
      <p className="text-gray-700">Welcome, Patient. View your records, appointments, and messages.</p>
    </SidebarLayout>
  );
}

export default PatientDashboard;
