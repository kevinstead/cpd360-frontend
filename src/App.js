// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Real application pages
import Login                   from "./pages/Login";
import Register                from "./pages/Register";
import RegisterProvider        from "./pages/RegisterProvider";
import EndOfDayWrapUp          from "./pages/admin/EndOfDayWrapUp";
import HomeOverview            from "./pages/admin/HomeOverview";
import PatientPrep             from "./pages/admin/PatientPrep";
import PopulationHealthPanel   from "./pages/admin/PopulationHealthPanel";
import RCMAnalyticsModal       from "./pages/admin/RCMAnalyticsModal";
import ReferralManagement      from "./pages/admin/ReferralManagement";
import TelehealthSession       from "./pages/admin/TelehealthSession";
import UnifiedInbox            from "./pages/admin/UnifiedInbox";


export default function App() {
  return (
    <Router>
      <Routes>
  {/* Public Routes */}
  <Route path="/login" element={<Login />} />
  <Route path="/register" element={<Register />} />
  <Route path="/register-provider" element={<RegisterProvider />} />

  {/* Admin Routes */}
  <Route path="/admin/dashboard" element={<HomeOverview />} />
  <Route path="/admin/end-of-day" element={<EndOfDayWrapUp />} />
  <Route path="/admin/patient-prep" element={<PatientPrep />} />
  <Route path="/admin/population-health" element={<PopulationHealthPanel />} />
  <Route path="/admin/rcm-analytics" element={<RCMAnalyticsModal />} />
  <Route path="/admin/referrals" element={<ReferralManagement />} />
  <Route path="/admin/telehealth" element={<TelehealthSession />} />
  <Route path="/admin/inbox" element={<UnifiedInbox />} />
</Routes>
    </Router>
  );
}
