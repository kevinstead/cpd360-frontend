// src/pages/mockups/ReferralManagement.js
import React from 'react';
import Layout from '../../layouts/Layout';

export default function ReferralManagement() {
  return (
    <Layout title="Referral Management">
      <section
        id="referrals"
        aria-labelledby="referrals-title"
        className="p-md bg-surface rounded-lg shadow-md"
      >
        <h3 id="referrals-title" className="text-lg font-medium text-textPrimary mb-sm">
          Filter by Status
        </h3>
        <div className="flex flex-wrap gap-sm mb-md">
          {['Sent', 'Pending', 'Responded'].map(status => (
            <button
              key={status}
              className="px-sm py-xs bg-info text-textOnPrimary rounded-pill"
              aria-pressed="false"
            >
              {status}
            </button>
          ))}
        </div>
        <table className="w-full text-left text-textSecondary mb-md">
          <thead>
            <tr>
              <th className="px-sm py-xs">Patient</th>
              <th className="px-sm py-xs">Status</th>
              <th className="px-sm py-xs">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr className="hover:bg-background">
              <td className="px-sm py-xs">Patient A</td>
              <td className="px-sm py-xs">Pending</td>
              <td className="px-sm py-xs">
                <button className="px-sm py-xs bg-primary text-textOnPrimary rounded-md">
                  Manage
                </button>
              </td>
            </tr>
            <tr className="hover:bg-background">
              <td className="px-sm py-xs">Patient B</td>
              <td className="px-sm py-xs">Responded</td>
              <td className="px-sm py-xs">
                <button className="px-sm py-xs bg-primary text-textOnPrimary rounded-md">
                  Manage
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </section>
    </Layout>
  );
}
