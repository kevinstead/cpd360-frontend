import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../../components/Sidebar";

export default function AdminAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState(() => {
    return localStorage.getItem("adminStatusFilter") || "";
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const token = localStorage.getItem("token");
  const headers = { Authorization: `Bearer ${token}` };

  const fetchAppointments = async () => {
    try {
      const query = statusFilter ? `?status=${statusFilter}` : "";
      const res = await axios.get(`/api/appointments${query}`, { headers });
      setAppointments(res.data);
    } catch (err) {
      console.error("Error fetching appointments:", err);
    }
  };

  useEffect(() => {
    localStorage.setItem("adminStatusFilter", statusFilter);
    fetchAppointments();
  }, [statusFilter]);

  const filteredAppointments = appointments.filter((appt) => {
    const name = appt.patientName?.toLowerCase() || "";
    const reason = appt.reason?.toLowerCase() || "";
    return (
      name.includes(searchTerm.toLowerCase()) ||
      reason.includes(searchTerm.toLowerCase())
    );
  });

  const totalPages = Math.ceil(filteredAppointments.length / itemsPerPage);
  const displayed = filteredAppointments.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar role="admin" />
      <div className="p-6 flex-1">
        <h1 className="text-3xl font-bold mb-4">All Appointments</h1>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6 items-start sm:items-center">
          <div className="w-full sm:w-auto">
            <label className="block text-sm mb-1 text-gray-700">Filter by Status</label>
            <select
              value={statusFilter}
              onChange={(e) => {
                setCurrentPage(1);
                setStatusFilter(e.target.value);
              }}
              className="p-2 border rounded w-full sm:w-64"
            >
              <option value="">All Statuses</option>
              <option value="Scheduled">Scheduled</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>

          <div className="w-full sm:w-auto">
            <label className="block text-sm mb-1 text-gray-700">Search by Name or Reason</label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setCurrentPage(1);
                setSearchTerm(e.target.value);
              }}
              className="p-2 border rounded w-full sm:w-64"
              placeholder="Search..."
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border rounded shadow">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="py-2 px-4 text-left">Date</th>
                <th className="py-2 px-4 text-left">Time</th>
                <th className="py-2 px-4 text-left">Patient</th>
                <th className="py-2 px-4 text-left">Provider</th>
                <th className="py-2 px-4 text-left">Reason</th>
                <th className="py-2 px-4 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {displayed.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-4 text-gray-500">
                    No appointments found.
                  </td>
                </tr>
              ) : (
                displayed.map((appt) => {
                  const dt = new Date(appt.date);
                  return (
                    <tr key={appt._id} className="border-t">
                      <td className="py-2 px-4">{dt.toLocaleDateString()}</td>
                      <td className="py-2 px-4">
                        {dt.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit"
                        })}
                      </td>
                      <td className="py-2 px-4">{appt.patientName || "N/A"}</td>
                      <td className="py-2 px-4">{appt.providerName || "N/A"}</td>
                      <td className="py-2 px-4">{appt.reason}</td>
                      <td className="py-2 px-4">{appt.status || "Scheduled"}</td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-6 space-x-2">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => handlePageChange(i + 1)}
                className={`px-4 py-2 border rounded ${
                  currentPage === i + 1
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-800"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
