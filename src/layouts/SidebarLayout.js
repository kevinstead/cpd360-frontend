import React from "react";
import { Link, useNavigate } from "react-router-dom";

function SidebarLayout({ role, children }) {
  const navigate = useNavigate();

  const menu = {
    admin: [
      { name: "Dashboard", path: "/admin" },
      { name: "Manage Users", path: "/admin/users" }
    ],
    provider: [
      { name: "Dashboard", path: "/provider" },
      { name: "Appointments", path: "/provider/appointments" }
    ],
    patient: [
      { name: "Dashboard", path: "/patient" },
      { name: "My Records", path: "/patient/records" }
    ]
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const links = menu[role] || [];

  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside className="w-64 bg-white shadow-lg">
        <div className="p-6 text-xl font-bold border-b">CPD360</div>
        <nav className="p-4 space-y-2">
          {links.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="block px-4 py-2 rounded hover:bg-blue-100 text-gray-800"
            >
              {link.name}
            </Link>
          ))}
          <button
            onClick={handleLogout}
            className="mt-6 block w-full text-left px-4 py-2 rounded bg-red-100 text-red-600 hover:bg-red-200"
          >
            Logout
          </button>
        </nav>
      </aside>
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}

export default SidebarLayout;

