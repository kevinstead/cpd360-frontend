import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Register from "./pages/Register";
import Login    from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";

// Dashboards
import AdminDashboard    from "./pages/admin/Dashboard";
import ProviderDashboard from "./pages/provider/Dashboard";
import PatientDashboard  from "./pages/patient/Dashboard";

// Sidebar-linked pages
import AdminUsers           from "./pages/admin/AdminUsers";
import ProviderAppointments from "./pages/provider/ProviderAppointments";
import PatientAppointments  from "./pages/patient/PatientAppointments";
import PatientRecords       from "./pages/patient/PatientRecords";


function App() {
  return (
    <Router>
      <Routes>
        {/* Public */}
        <Route path="/"      element={<Navigate to="/login" />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login"    element={<Login />} />

        {/* Admin */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminUsers />
            </ProtectedRoute>
          }
        />

        {/* Provider */}
        <Route
          path="/provider"
          element={
            <ProtectedRoute allowedRoles={["provider"]}>
              <ProviderDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/provider/appointments"
          element={
            <ProtectedRoute allowedRoles={["provider"]}>
              <ProviderAppointments />
            </ProtectedRoute>
          }
        />

        {/* Patient */}
        <Route
          path="/patient"
          element={
            <ProtectedRoute allowedRoles={["patient"]}>
              <PatientDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/patient/appointments"
          element={
            <ProtectedRoute allowedRoles={["patient"]}>
              <PatientAppointments />
            </ProtectedRoute>
          }
        />
        <Route
          path="/patient/records"
          element={
            <ProtectedRoute allowedRoles={["patient"]}>
              <PatientRecords />
            </ProtectedRoute>
          }
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
