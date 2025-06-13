// src/pages/mockups/EndOfDayWrapUp.js
import React from 'react';
import Layout from '../../layouts/Layout';

export default function EndOfDayWrapUp() {
  return (
    <Layout title="End-of-Day Wrap-Up">
      <section
        id="wrap-up"
        aria-labelledby="wrap-up-title"
        className="p-md bg-surface rounded-lg shadow-md"
      >
        <h3 id="wrap-up-title" className="text-lg font-medium text-textPrimary mb-sm">
          Today’s Summary
        </h3>
        <div className="flex flex-wrap gap-sm mb-md">
          <button className="px-sm py-xs bg-success text-textOnPrimary rounded-pill">
            Completed
          </button>
          <button className="px-sm py-xs bg-warning text-textOnPrimary rounded-pill">
            Pending
          </button>
          <button className="px-sm py-xs bg-danger text-textOnPrimary rounded-pill">
            No-Shows
          </button>
        </div>
        <ul className="space-y-sm mb-md">
          <li className="p-sm bg-background rounded-md">Patient A ‒ 2:00 PM</li>
          <li className="p-sm bg-background rounded-md">Patient B ‒ 2:30 PM</li>
        </ul>
        <button className="px-md py-sm bg-primary text-textOnPrimary rounded-md">
          Generate Note
        </button>
      </section>
    </Layout>
  );
}
