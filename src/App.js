import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import ProviderAppointments from "./pages/provider/ProviderAppointments";

// Public pages
import Login             from "./pages/Login";
import Register          from "./pages/Register";
import RegisterProvider  from "./pages/RegisterProvider";

// Admin pages
import EndOfDayWrapUp          from "./pages/admin/EndOfDayWrapUp";
import HomeOverview            from "./pages/admin/HomeOverview";
import PatientPrep             from "./pages/admin/PatientPrep";
import PopulationHealthPanel   from "./pages/admin/PopulationHealthPanel";
import RCMAnalyticsModal       from "./pages/admin/RCMAnalyticsModal";
import ReferralManagement      from "./pages/admin/ReferralManagement";
import TelehealthSessionWrapper from "./pages/admin/TelehealthSessionWrapper";
import UnifiedInbox            from "./pages/admin/UnifiedInbox";

// Route protection
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/register-provider" element={<RegisterProvider />} />

        {/* Provider Routes */}
        <Route
          path="/provider/appointments"
          element={
            <ProtectedRoute allowedRoles={["provider", "admin"]}>
              <ProviderAppointments />
            </ProtectedRoute>
          }
        />

        {/* Admin & Provider Routes */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <HomeOverview />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/end-of-day"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <EndOfDayWrapUp />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/patient-prep"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <PatientPrep />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/population-health"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <PopulationHealthPanel />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/rcm-analytics"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <RCMAnalyticsModal />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/referrals"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <ReferralManagement />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/telehealth/:roomName"
          element={
            <ProtectedRoute allowedRoles={["provider", "admin"]}>
              <TelehealthSessionWrapper />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/inbox"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <UnifiedInbox />
            </ProtectedRoute>
          }
        />

        {/* Redirect default and unknown paths to login */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}
