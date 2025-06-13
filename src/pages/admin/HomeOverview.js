// src/pages/mockups/HomeOverview.js
import React from 'react';
import Layout from '../../layouts/Layout';

export default function HomeOverview() {
  return (
    <Layout title="Home Overview">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-md">
        {/* Revenue Snapshot */}
        <section
          id="revenue-snapshot"
          aria-labelledby="revenue-snapshot-title"
          className="p-md bg-surface rounded-lg shadow-md"
        >
          <h3
            id="revenue-snapshot-title"
            className="text-lg font-medium text-textPrimary"
          >
            Revenue Snapshot
          </h3>
          <div
            role="img"
            aria-label="Gauge showing 95% charge capture"
            className="mt-md h-24 bg-background rounded-md flex items-center justify-center"
          >
            {/* Replace with your Gauge component */}
            Gauge Placeholder
          </div>
          <p className="mt-sm text-sm text-textSecondary">
            Charge capture: 95%
          </p>
        </section>

        {/* Task Summary */}
        <section
          id="task-summary"
          aria-labelledby="task-summary-title"
          className="p-md bg-surface rounded-lg shadow-md"
        >
          <h3
            id="task-summary-title"
            className="text-lg font-medium text-textPrimary"
          >
            Task Summary
          </h3>
          <ul className="mt-md space-y-sm text-textSecondary">
            <li>
              <span role="img" aria-label="Urgent tasks">
                🔴
              </span>{' '}
              3 Urgent
            </li>
            <li>
              <span role="img" aria-label="Routine tasks">
                🔵
              </span>{' '}
              12 Routine
            </li>
          </ul>
        </section>

        {/* Care-Gap Alerts */}
        <section
          id="care-gap-alerts"
          aria-labelledby="care-gap-alerts-title"
          className="p-md bg-surface rounded-lg shadow-md"
        >
          <h3
            id="care-gap-alerts-title"
            className="text-lg font-medium text-textPrimary"
          >
            Care-Gap Alerts
          </h3>
          <ul className="mt-md space-y-sm text-textSecondary">
            <li>A1c overdue</li>
            <li>Colonoscopy due</li>
            <li>Mammogram due</li>
          </ul>
        </section>
      </div>
    </Layout>
  );
}
