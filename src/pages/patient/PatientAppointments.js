import React from 'react';
import Sidebar from '../../components/Sidebar';
import AppointmentList from '../../components/AppointmentList';

export default function PatientAppointments() {
  return (
    <div className="flex min-h-screen">
      <Sidebar role="patient" />
      <div className="p-6 flex-1">
        <h1 className="text-3xl font-bold mb-4">My Appointments</h1>
        <AppointmentList endpoint="/api/appointments/me" />
      </div>
    </div>
  );
}
