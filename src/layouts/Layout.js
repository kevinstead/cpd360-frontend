import React from 'react';

// Shared Layout
const Layout = ({ children, title }) => (
  <div className="flex min-h-screen bg-background">
    <aside className="w-64 bg-surface border-r border-border p-md">
      <div className="mb-6">
        <div className="h-8 w-8 bg-primaryDark rounded-md mb-sm"></div>
        <h1 className="text-2xl font-bold text-textPrimary">CPD360</h1>
      </div>
      <nav className="space-y-sm">
        {['Dashboard','Appointments','Patients','Referrals','Inbox','Analytics','Settings'].map(item => (
          <button key={item} className="flex items-center w-full p-2 rounded-md hover:bg-background">
            <span className="ml-2 text-textSecondary">{item}</span>
          </button>
        ))}
      </nav>
    </aside>
    <main className="flex-1 p-lg overflow-auto">
      <header className="flex justify-between items-center mb-lg">
        <h2 className="text-xl font-semibold text-textPrimary">{title}</h2>
        <div className="flex space-x-md">
          <button className="p-2 rounded-full hover:bg-background">🔔</button>
          <button className="p-2 rounded-full hover:bg-background">👤</button>
        </div>
      </header>
      {children}
    </main>
  </div>
);