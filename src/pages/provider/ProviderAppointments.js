import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../../components/Sidebar";

export default function ProviderAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [form, setForm] = useState({ date: "", time: "", reason: "", status: "" });
  const [editingId, setEditingId] = useState(null);
  const [filterStatus, setFilterStatus] = useState("");

  const token = localStorage.getItem("token");
  const headers = { Authorization: `Bearer ${token}` };

  const fetchAppointments = async () => {
    try {
      const query = filterStatus ? `?status=${filterStatus}` : "";
      const res = await axios.get(`/api/appointments/provider${query}`, { headers });
      setAppointments(res.data);
    } catch (err) {
      console.error("Error fetching appointments:", err);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, [filterStatus]);

  const handleEdit = (appt) => {
    const dt = new Date(appt.date);
    const isoDate = dt.toISOString().split("T")[0];
    const isoTime = dt.toISOString().split("T")[1].substr(0, 5);

    setForm({
      date: isoDate,
      time: isoTime,
      reason: appt.reason,
      status: appt.status || "Scheduled"
    });
    setEditingId(appt._id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this appointment?")) return;
    try {
      await axios.delete(`/api/appointments/${id}`, { headers });
      fetchAppointments();
    } catch (err) {
      console.error("Failed to delete appointment:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        date: new Date(`${form.date}T${form.time}`),
        reason: form.reason,
        status: form.status
      };

      if (editingId) {
        await axios.put(`/api/appointments/${editingId}`, payload, { headers });
        setEditingId(null);
      }

      setForm({ date: "", time: "", reason: "", status: "" });
      fetchAppointments();
    } catch (err) {
      console.error("Error saving appointment", err);
    }
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar role="provider" />
      <div className="p-6 flex-1">
        <h1 className="text-3xl font-bold mb-4">Patient Appointments</h1>

        {/* Filter Dropdown */}
        <div className="mb-6">
          <label htmlFor="filterStatus" className="block mb-2 text-sm font-medium text-gray-700">
            Filter by Status
          </label>
          <select
            id="filterStatus"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="p-2 border rounded w-full sm:w-64"
          >
            <option value="">All Statuses</option>
            <option value="Scheduled">Scheduled</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>

        {/* Edit Form */}
        {editingId && (
          <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-4 mb-6">
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
              autoComplete="off"
              className="p-2 border rounded"
              required
            />
            <input
              type="time"
              name="time"
              value={form.time}
              onChange={(e) => setForm({ ...form, time: e.target.value })}
              autoComplete="off"
              className="p-2 border rounded"
              required
            />
            <input
              type="text"
              name="reason"
              value={form.reason}
              onChange={(e) => setForm({ ...form, reason: e.target.value })}
              autoComplete="reason"
              placeholder="Reason"
              className="p-2 border rounded"
              required
            />
            <select
              name="status"
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value })}
              className="p-2 border rounded"
              required
            >
              <option value="Scheduled">Scheduled</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
            <button
              type="submit"
              className="sm:col-span-4 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
            >
              Save Changes
            </button>
          </form>
        )}

        {/* Appointment Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border rounded shadow">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="py-2 px-4 text-left">Date</th>
                <th className="py-2 px-4 text-left">Time</th>
                <th className="py-2 px-4 text-left">Patient</th>
                <th className="py-2 px-4 text-left">Reason</th>
                <th className="py-2 px-4 text-left">Status</th>
                <th className="py-2 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {appointments.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-4 text-gray-500">
                    No appointments found.
                  </td>
                </tr>
              ) : (
                appointments.map((appt) => {
                  const dt = new Date(appt.date);
                  return (
                    <tr key={appt._id} className="border-t">
                      <td className="py-2 px-4">{dt.toLocaleDateString()}</td>
                      <td className="py-2 px-4">
                        {dt.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </td>
                      <td className="py-2 px-4">{appt.patientName || "N/A"}</td>
                      <td className="py-2 px-4">{appt.reason}</td>
                      <td className="py-2 px-4">{appt.status || "Scheduled"}</td>
                      <td className="py-2 px-4 space-x-2">
                        <button
                          type="button"
                          className="text-blue-600 hover:underline"
                          onClick={() => handleEdit(appt)}
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          className="text-red-600 hover:underline"
                          onClick={() => handleDelete(appt._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
