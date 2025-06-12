import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../../components/Sidebar";

export default function PatientAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [form, setForm] = useState({ date: "", time: "", reason: "" });
  const [editingId, setEditingId] = useState(null);

  const token = localStorage.getItem("token");
  const headers = { Authorization: `Bearer ${token}` };

  // Fetch only this patient’s appointments
  const fetchAppointments = async () => {
    try {
      const res = await axios.get("/api/appointments/me", { headers });
      setAppointments(res.data);
    } catch (err) {
      console.error("Failed to load appointments", err);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        date: form.date,
        // If you want to combine date/time, you can do:
        // date: new Date(`${form.date}T${form.time}`),
        reason: form.reason
      };

      if (editingId) {
        await axios.put(`/api/appointments/${editingId}`, payload, { headers });
        setEditingId(null);
      } else {
        await axios.post("/api/appointments", payload, { headers });
      }

      setForm({ date: "", time: "", reason: "" });
      fetchAppointments();
    } catch (err) {
      console.error("Error saving appointment", err);
    }
  };

  const handleEdit = (appt) => {
    // Pre-fill date & time—assuming appt.date is ISO string
    const dt = new Date(appt.date);
    const isoDate = dt.toISOString().split("T")[0];
    const isoTime = dt.toISOString().split("T")[1].substr(0, 5);

    setForm({ date: isoDate, time: isoTime, reason: appt.reason });
    setEditingId(appt._id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this appointment?")) return;
    try {
      await axios.delete(`/api/appointments/${id}`, { headers });
      fetchAppointments();
    } catch (err) {
      console.error("Failed to delete", err);
    }
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar role="patient" />
      <div className="p-6 flex-1">
        <h1 className="text-3xl font-bold mb-4">My Appointments</h1>

        <form
  onSubmit={handleSubmit}
  className="mb-6 grid gap-4 sm:grid-cols-3"
>
  <input
    type="date"
    name="date"
    autoComplete="off"
    value={form.date}
    onChange={(e) => setForm({ ...form, date: e.target.value })}
    className="p-2 border rounded"
    required
  />

  <input
    type="time"
    name="time"
    autoComplete="off"
    value={form.time}
    onChange={(e) => setForm({ ...form, time: e.target.value })}
    className="p-2 border rounded"
    required
  />

  <input
    type="text"
    name="reason"
    placeholder="Reason"
    autoComplete="reason"
    value={form.reason}
    onChange={(e) => setForm({ ...form, reason: e.target.value })}
    className="p-2 border rounded"
    required
  />

          <button
            type="submit"
            className="sm:col-span-3 bg-blue-600 text-white py-2 rounded"
          >
            {editingId ? "Update Appointment" : "Add Appointment"}
          </button>
        </form>

        <table className="w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">Date</th>
              <th className="border p-2">Time</th>
              <th className="border p-2">Reason</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appt) => (
              <tr key={appt._id}>
                <td className="border p-2">
                  {new Date(appt.date).toLocaleDateString()}
                </td>
                <td className="border p-2">
                  {new Date(appt.date).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit"
                  })}
                </td>
                <td className="border p-2">{appt.reason}</td>
                <td className="border p-2">
                  <button
                    onClick={() => handleEdit(appt)}
                    className="mr-2 text-blue-600 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(appt._id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
