// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Real application pages
import Login                   from "./pages/Login";
import Register                from "./pages/Register";
import RegisterProvider        from "./pages/RegisterProvider";
import AdminDashboard          from "./pages/admin/AdminDashboard";
import ProviderAppointments    from "./pages/provider/ProviderAppointments";
import PatientAppointments     from "./pages/patient/PatientAppointments";

// Mockup “wireframe” pages
import HomeOverview            from "./pages/mockups/HomeOverview";
import PatientPrep             from "./pages/mockups/PatientPrep";
import UnifiedInbox            from "./pages/mockups/UnifiedInbox";
import PopulationHealthPanel   from "./pages/mockups/PopulationHealthPanel";
import EndOfDayWrapUp          from "./pages/mockups/EndOfDayWrapUp";
import ReferralManagement      from "./pages/mockups/ReferralManagement";
import TelehealthSession       from "./pages/mockups/TelehealthSession";
import RCMAnalyticsModal       from "./pages/mockups/RCMAnalyticsModal";

export default function App() {
  return (
    <Router>
      <Routes>
        {/** Redirect root to mockup for quick preview—you can remove this later **/}
        <Route path="/" element={<Navigate to="/mockups/home-overview" replace />} />

        {/** === Mockup Routes === **/}
        <Route path="/mockups/home-overview"       element={<HomeOverview />} />
        <Route path="/mockups/patient-prep"        element={<PatientPrep />} />
        <Route path="/mockups/unified-inbox"       element={<UnifiedInbox />} />
        <Route path="/mockups/population-health"   element={<PopulationHealthPanel />} />
        <Route path="/mockups/end-of-day-wrap-up"  element={<EndOfDayWrapUp />} />
        <Route path="/mockups/referral-management" element={<ReferralManagement />} />
        <Route path="/mockups/telehealth-session"  element={<TelehealthSession />} />
        <Route path="/mockups/rcm-analytics"       element={<RCMAnalyticsModal />} />

        {/** === Public Routes === **/}
        <Route path="/login"              element={<Login />} />
        <Route path="/register"           element={<Register />} />
        <Route path="/register-provider"  element={<RegisterProvider />} />

        {/** === Admin Routes === **/}
        <Route path="/admin/dashboard"    element={<AdminDashboard />} />

        {/** === Provider Routes === **/}
        <Route path="/provider/appointments" element={<ProviderAppointments />} />

        {/** === Patient Routes === **/}
        <Route path="/patient/appointments"  element={<PatientAppointments />} />

        {/** === Fallback === **/}
        <Route path="*" element={<Navigate to="/mockups/home-overview" replace />} />
      </Routes>
    </Router>
  );
}
