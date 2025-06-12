import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Import pages
import Login from "./pages/Login";
import Register from "./pages/Register";
import RegisterProvider from "./pages/RegisterProvider";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ProviderAppointments from "./pages/provider/ProviderAppointments";
import PatientAppointments from "./pages/patient/PatientAppointments";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/register-provider" element={<RegisterProvider />} />

        {/* Admin */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />

        {/* Provider */}
        <Route path="/provider/appointments" element={<ProviderAppointments />} />

        {/* Patient */}
        <Route path="/patient/appointments" element={<PatientAppointments />} />

        {/* Optional: Add a fallback for unknown routes */}
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </Router>
  );
}
