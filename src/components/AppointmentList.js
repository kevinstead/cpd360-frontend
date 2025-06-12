import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function AppointmentList({ endpoint }) {
  const [appointments, setAppointments] = useState([]);
  const [error, setError]           = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get(endpoint, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => setAppointments(res.data))
    .catch(err => setError(err.response?.data?.msg || 'Error fetching'));
  }, [endpoint]);

  if (error) return <p className="text-red-500">{error}</p>;
  if (!appointments.length) return <p>No appointments found.</p>;

  return (
    <table className="min-w-full bg-white">
      <thead>
        <tr>
          <th className="px-4 py-2">Patient</th>
          <th className="px-4 py-2">Date</th>
          <th className="px-4 py-2">Reason</th>
        </tr>
      </thead>
      <tbody>
        {appointments.map(a => (
          <tr key={a._id}>
            <td className="border px-4 py-2">{a.patientName}</td>
            <td className="border px-4 py-2">{new Date(a.date).toLocaleString()}</td>
            <td className="border px-4 py-2">{a.reason}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
