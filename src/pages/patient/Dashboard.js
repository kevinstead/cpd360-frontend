import React from "react";
import Sidebar from "../../components/Sidebar";

function PatientDashboard() {
  return (
    <div className="flex min-h-screen">
      <Sidebar role="patient" />
      <div className="p-6 flex-1">
        <h1 className="text-3xl font-bold mb-4">Patient Dashboard</h1>
        <p className="text-gray-700">
          Welcome, Patient. View your records, appointments, and messages.
        </p>
      </div>
    </div>
  );
}

export default PatientDashboard;

