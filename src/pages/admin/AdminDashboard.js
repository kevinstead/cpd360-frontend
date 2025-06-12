import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../../components/Sidebar";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid
} from "recharts";

export default function AdminDashboard() {
  const [appointments, setAppointments] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    cancelled: 0,
    thisWeek: 0,
    byStatus: [],
    byDay: []
  });

  const token = localStorage.getItem("token");
  const headers = { Authorization: `Bearer ${token}` };

  const fetchAppointments = async () => {
    try {
      const res = await axios.get("/api/appointments", { headers });
      setAppointments(res.data);
    } catch (err) {
      console.error("Error fetching admin dashboard data", err);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  useEffect(() => {
    if (appointments.length === 0) return;

    const now = new Date();
    const weekStart = new Date();
    weekStart.setDate(now.getDate() - 7);

    const statusCount = {};
    const dayCount = {};

    let completed = 0;
    let cancelled = 0;
    let thisWeek = 0;

    for (const appt of appointments) {
      const status = appt.status || "Scheduled";
      statusCount[status] = (statusCount[status] || 0) + 1;

      const date = new Date(appt.date);
      const dayKey = date.toISOString().split("T")[0];
      dayCount[dayKey] = (dayCount[dayKey] || 0) + 1;

      if (status === "Completed") completed++;
      if (status === "Cancelled") cancelled++;
      if (date >= weekStart) thisWeek++;
    }

    const byStatus = Object.entries(statusCount).map(([key, value]) => ({
      status: key,
      count: value
    }));

    const byDay = Object.entries(dayCount)
      .sort((a, b) => new Date(a[0]) - new Date(b[0]))
      .map(([day, count]) => ({ date: day, count }));

    setStats({
      total: appointments.length,
      completed,
      cancelled,
      thisWeek,
      byStatus,
      byDay
    });
  }, [appointments]);

  return (
    <div className="flex min-h-screen">
      <Sidebar role="admin" />
      <div className="p-6 flex-1">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

        {/* Summary Cards */}
        <div className="grid gap-6 grid-cols-2 sm:grid-cols-4 mb-10">
          <Card title="Total" value={stats.total} />
          <Card title="Completed" value={stats.completed} />
          <Card title="Cancelled" value={stats.cancelled} />
          <Card title="This Week" value={stats.thisWeek} />
        </div>

        {/* Charts */}
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
          <div className="bg-white p-4 rounded-xl shadow">
            <h2 className="text-lg font-semibold mb-4">By Status</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={stats.byStatus}>
                <XAxis dataKey="status" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white p-4 rounded-xl shadow">
            <h2 className="text-lg font-semibold mb-4">By Day</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={stats.byDay}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="count" stroke="#3b82f6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

// Reusable Card Component
function Card({ title, value }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow text-center">
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-2xl font-bold text-blue-600">{value}</p>
    </div>
  );
}
