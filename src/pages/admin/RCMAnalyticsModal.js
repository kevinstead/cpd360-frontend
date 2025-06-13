// src/pages/mockups/RCMAnalyticsModal.js
import React from 'react';
import Layout from '../../layouts/Layout';

export default function RCMAnalyticsModal() {
  return (
    <Layout title="RCM Analytics">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="rcm-title"
        className="fixed inset-0 bg-black/50 flex items-center justify-center p-md"
      >
        <div className="w-full max-w-3xl bg-surface rounded-lg shadow-lg overflow-auto">
          <header className="flex justify-between items-center p-md border-b border-border">
            <h3 id="rcm-title" className="text-lg font-semibold text-textPrimary">
              RCM Analytics
            </h3>
            <button aria-label="Close modal" className="text-textSecondary hover:text-textPrimary">
              ✕
            </button>
          </header>

          <div className="p-md space-y-lg">
            {/* Charge Capture Rate */}
            <section aria-labelledby="ccr-title">
              <h4 id="ccr-title" className="font-medium text-textPrimary mb-sm">
                Charge Capture Rate
              </h4>
              <div className="h-32 bg-background rounded-md flex items-center justify-center">
                Gauge Chart Placeholder
              </div>
            </section>

            {/* Charge Trends */}
            <section aria-labelledby="trends-title">
              <h4 id="trends-title" className="font-medium text-textPrimary mb-sm">
                Charge Trends
              </h4>
              <div className="h-32 bg-background rounded-md flex items-center justify-center">
                Line Chart Placeholder
              </div>
            </section>

            {/* Denial Reasons */}
            <section aria-labelledby="denials-title">
              <h4 id="denials-title" className="font-medium text-textPrimary mb-sm">
                Denial Reasons
              </h4>
              <div className="h-32 bg-background rounded-md flex items-center justify-center">
                Bar Chart + List Placeholder
              </div>
            </section>
          </div>

          <footer className="flex justify-end p-md border-t border-border">
            <button className="px-md py-sm bg-primary text-textOnPrimary rounded-md">
              View Report
            </button>
          </footer>
        </div>
      </div>
    </Layout>
  );
}
