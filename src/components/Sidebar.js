import React from "react";
import { Link, useLocation } from "react-router-dom";

function Sidebar({ role }) {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const navItems = {
    admin: [
      { label: "Dashboard", path: "/admin" },
      { label: "User Management", path: "/admin/users" },
    ],
    provider: [
      { label: "Dashboard", path: "/provider" },
      { label: "Appointments", path: "/provider/appointments" },
    ],
    patient: [
      { label: "Dashboard", path: "/patient" },
      { label: "Health Records", path: "/patient/records" },
    ],
  };

  return (
    <div className="w-64 bg-gray-100 min-h-screen p-4 shadow-md">
      <h2 className="text-2xl font-bold mb-6 capitalize">{role} Menu</h2>
      <ul className="space-y-3">
        {navItems[role]?.map((item) => (
          <li key={item.path}>
            <Link
              to={item.path}
              className={`block px-3 py-2 rounded ${
                isActive(item.path)
                  ? "bg-blue-600 text-white font-semibold"
                  : "text-gray-700 hover:bg-blue-100"
              }`}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;
