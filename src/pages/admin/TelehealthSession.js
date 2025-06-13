// src/pages/mockups/TelehealthSession.js
import React from 'react';
import Layout from '../../layouts/Layout';

export default function TelehealthSession() {
  return (
    <Layout title="Telehealth Session">
      <section
        id="telehealth"
        aria-labelledby="telehealth-title"
        className="p-md bg-surface rounded-lg shadow-md flex flex-col gap-md"
      >
        <h3 id="telehealth-title" className="text-lg font-medium text-textPrimary">
          Video Call
        </h3>
        <div
          role="region"
          aria-label="Patient video feed"
          className="w-full h-64 bg-background rounded-md flex items-center justify-center"
        >
          {/* Replace with actual video component */}
          Video Feed Placeholder
        </div>
        <div className="flex gap-sm">
          <button className="px-md py-sm bg-warning text-textOnPrimary rounded-md">
            Mute
          </button>
          <button className="px-md py-sm bg-danger text-textOnPrimary rounded-md">
            End Call
          </button>
        </div>
        <textarea
          aria-label="Patient notes"
          className="w-full h-32 p-sm border border-border rounded-md"
          placeholder="Patient Notes..."
        />
      </section>
    </Layout>
  );
}
