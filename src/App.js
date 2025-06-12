import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Public pages
import Login    from "./pages/Login";
import Register from "./pages/Register";

// Auth wrapper
import ProtectedRoute from "./components/ProtectedRoute";

// Admin pages
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminUsers     from "./pages/admin/AdminUsers";

// Provider pages
import ProviderDashboard    from "./pages/provider/Dashboard";
import ProviderAppointments from "./pages/provider/ProviderAppointments";

// Patient pages
import PatientDashboard    from "./pages/patient/Dashboard";
import PatientAppointments from "./pages/patient/PatientAppointments";
import PatientRecords      from "./pages/patient/PatientRecords";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public */}
        <Route path="/"        element={<Navigate to="/login" />} />
        <Route path="/login"   element={<Login />} />
        <Route path="/register" element={<Register />} />

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
