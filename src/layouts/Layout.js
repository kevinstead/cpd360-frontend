// src/layouts/Layout.js
import React from 'react';
import Sidebar from '../components/Sidebar';

const Layout = ({ children, title }) => (
  <div className="flex min-h-screen bg-background">
    <aside className="w-64 bg-surface border-r border-border p-md">
      {/* ...your sidebar/logo/nav... */}
    </aside>
    <main className="flex-1 p-lg overflow-auto">
      <header className="flex justify-between items-center mb-lg">
        <h2 className="text-xl font-semibold text-textPrimary">{title}</h2>
        {/* ...notifications/avatar... */}
      </header>
      {children}
    </main>
  </div>
);

export default Layout;
