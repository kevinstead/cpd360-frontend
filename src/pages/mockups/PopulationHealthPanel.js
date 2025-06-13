// src/pages/mockups/PopulationHealthPanel.js
import React from 'react';
import Layout from '../../layouts/Layout';

export default function PopulationHealthPanel() {
  return (
    <Layout title="Population Health">
      <section
        id="pop-health"
        aria-labelledby="pop-health-title"
        className="p-md bg-surface rounded-lg shadow-md"
      >
        <h3 id="pop-health-title" className="text-lg font-medium text-textPrimary mb-sm">
          Filter by Measure
        </h3>
        <div className="flex flex-wrap gap-sm mb-md">
          {['A1c overdue', 'Colonoscopy due', 'Mammogram due'].map(measure => (
            <button
              key={measure}
              className="px-sm py-xs bg-warning text-textOnPrimary rounded-pill"
              aria-pressed="false"
            >
              {measure}
            </button>
          ))}
        </div>
        <table className="w-full text-left text-textSecondary mb-md">
          <thead>
            <tr>
              <th className="px-sm py-xs">Patient</th>
              <th className="px-sm py-xs">Age</th>
              <th className="px-sm py-xs">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr className="hover:bg-background">
              <td className="px-sm py-xs">John Doe</td>
              <td className="px-sm py-xs">65</td>
              <td className="px-sm py-xs">Overdue</td>
            </tr>
            <tr className="hover:bg-background">
              <td className="px-sm py-xs">Mary Smith</td>
              <td className="px-sm py-xs">58</td>
              <td className="px-sm py-xs">Overdue</td>
            </tr>
          </tbody>
        </table>
        <button
          className="px-md py-sm bg-primary text-textOnPrimary rounded-md"
          aria-disabled="false"
        >
          Send Reminder
        </button>
      </section>
    </Layout>
  );
}
