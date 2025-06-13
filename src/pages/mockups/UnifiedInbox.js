// src/pages/mockups/UnifiedInbox.js
import React from 'react';
import Layout from '../../layouts/Layout';

export default function UnifiedInbox() {
  return (
    <Layout title="Unified Inbox">
      <div className="flex flex-col lg:flex-row gap-md">
        {/* Sidebar Filters/Tabs */}
        <aside
          id="inbox-nav"
          aria-labelledby="inbox-nav-title"
          className="w-full lg:w-1/4 p-md bg-surface rounded-lg shadow-md"
        >
          <h3 id="inbox-nav-title" className="text-lg font-medium text-textPrimary mb-sm">
            Filter / Tabs
          </h3>
          <nav aria-label="Inbox categories" className="space-y-sm mb-md">
            {['Triage queue', 'Messages', 'Results'].map(tab => (
              <button
                key={tab}
                className="w-full text-left px-sm py-xs bg-background hover:bg-background/50 rounded-md"
              >
                {tab}
              </button>
            ))}
          </nav>
          <label htmlFor="inbox-filter" className="block mb-2 text-sm font-medium text-textSecondary">
            Show:
          </label>
          <select
            id="inbox-filter"
            className="w-full p-sm border border-border rounded-md"
            aria-label="Filter inbox items"
          >
            <option>All</option>
            <option>Urgent</option>
            <option>Deferred</option>
          </select>
        </aside>

        {/* Task List */}
        <section
          id="inbox-tasks"
          aria-labelledby="inbox-tasks-title"
          className="flex-1 p-md bg-surface rounded-lg shadow-md overflow-auto"
        >
          <h3 id="inbox-tasks-title" className="text-lg font-medium text-textPrimary mb-sm">
            Tasks
          </h3>
          <table className="w-full text-left text-textSecondary">
            <thead>
              <tr>
                <th className="px-sm py-xs">Select</th>
                <th className="px-sm py-xs">Patient</th>
                <th className="px-sm py-xs">Detail</th>
                <th className="px-sm py-xs">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-danger/10 hover:bg-danger/20">
                <td className="px-sm py-xs">
                  <input type="checkbox" aria-label="Select urgent task" />
                </td>
                <td className="px-sm py-xs">John Doe</td>
                <td className="px-sm py-xs">Needs prescription refill</td>
                <td className="px-sm py-xs">
                  <button className="px-sm py-xs bg-danger text-textOnPrimary rounded-md">
                    Resolve
                  </button>
                </td>
              </tr>
              <tr className="hover:bg-background">
                <td className="px-sm py-xs">
                  <input type="checkbox" aria-label="Select routine task" />
                </td>
                <td className="px-sm py-xs">Jane Smith</td>
                <td className="px-sm py-xs">Normal lab results</td>
                <td className="px-sm py-xs">
                  <button className="px-sm py-xs bg-secondary text-textOnPrimary rounded-md">
                    View
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </section>
      </div>
    </Layout>
  );
}
