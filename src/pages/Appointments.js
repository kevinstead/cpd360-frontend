import React, { useEffect, useState } from "react";
import axios from "axios";

function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [form, setForm] = useState({ date: "", time: "", reason: "" });
  const [editingId, setEditingId] = useState(null);

  const token = localStorage.getItem("token");
  const headers = { Authorization: `Bearer ${token}` };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const res = await axios.get("/api/appointments", { headers });
      setAppointments(res.data);
    } catch (err) {
      alert("Failed to load appointments");
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`/api/appointments/${editingId}`, form, { headers });
        setEditingId(null);
      } else {
        await axios.post("/api/appointments", form, { headers });
      }
      setForm({ date: "", time: "", reason: "" });
      fetchAppointments();
    } catch (err) {
      alert("Error saving appointment");
      console.error(err);
    }
  };

  const handleEdit = (appt) => {
    setForm({ date: appt.date, time: appt.time, reason: appt.reason });
    setEditingId(appt._id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this appointment?")) return;
    try {
      await axios.delete(`/api/appointments/${id}`, { headers });
      fetchAppointments();
    } catch (err) {
      alert("Failed to delete");
      console.error(err);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Manage Appointments</h1>

      <form onSubmit={handleSubmit} className="mb-6 grid gap-4 grid-cols-1 md:grid-cols-3">
        <input
          type="date"
          name="date"
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
          className="p-2 border rounded"
          required
        />
        <input
          type="time"
          name="time"
          value={form.time}
          onChange={(e) => setForm({ ...form, time: e.target.value })}
          className="p-2 border rounded"
          required
        />
        <input
          type="text"
          name="reason"
          placeholder="Reason"
          value={form.reason}
          onChange={(e) => setForm({ ...form, reason: e.target.value })}
          className="p-2 border rounded"
          required
        />
        <button type="submit" className="md:col-span-3 bg-blue-600 text-white py-2 rounded">
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
              <td className="border p-2">{appt.date}</td>
              <td className="border p-2">{appt.time}</td>
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
  );
}

export default Appointments;
