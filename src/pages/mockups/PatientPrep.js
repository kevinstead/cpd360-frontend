// src/pages/mockups/PatientPrep.js
import React from 'react';
import Layout from '../../layouts/Layout';

export default function PatientPrep() {
  return (
    <Layout title="Patient Prep">
      <div className="flex flex-col lg:flex-row gap-md">
        {/* AI Summary */}
        <section
          id="ai-summary"
          aria-labelledby="ai-summary-title"
          className="flex-1 p-md bg-surface rounded-lg shadow-md"
        >
          <h3
            id="ai-summary-title"
            className="text-lg font-medium text-textPrimary mb-sm"
          >
            AI Summary
          </h3>
          <div
            role="region"
            aria-label="Auto-generated patient summary"
            className="h-48 bg-background rounded-md p-sm overflow-auto"
          >
            {/* Replace with real summary */}
            <p>• 65 y/o male with hypertension and diabetes...</p>
            <p>• Last A1c: 8.2% (3 months ago)</p>
            <p>• Intake form completed 2 hours ago</p>
          </div>
        </section>

        {/* Intake Forms */}
        <section
          id="intake-forms"
          aria-labelledby="intake-forms-title"
          className="flex-1 p-md bg-surface rounded-lg shadow-md"
        >
          <h3
            id="intake-forms-title"
            className="text-lg font-medium text-textPrimary mb-sm"
          >
            Intake Forms
          </h3>
          <ul className="space-y-sm">
            <li className="flex items-center justify-between p-sm bg-background rounded-md">
              <span>Pre-Visit Questionnaire</span>
              <button
                className="px-sm py-xs bg-primary text-textOnPrimary rounded-md"
                aria-label="Review Pre-Visit Questionnaire"
              >
                Review
              </button>
            </li>
            <li className="flex items-center justify-between p-sm bg-background rounded-md">
              <span>Medication List Update</span>
              <button
                className="px-sm py-xs bg-primary text-textOnPrimary rounded-md"
                aria-label="Review Medication List Update"
              >
                Review
              </button>
            </li>
          </ul>
        </section>
      </div>
    </Layout>
  );
}
