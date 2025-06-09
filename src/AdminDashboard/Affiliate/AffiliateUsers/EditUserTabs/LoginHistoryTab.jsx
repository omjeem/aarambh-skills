import React, { useState } from 'react';

const initialSessions = [
  {
    os: 'Windows-10.0',
    browser: 'Chrome',
    device: 'desktop',
    ip: '45.137.198.136',
    country: 'The Netherlands',
    city: 'Amsterdam',
    latlong: '',
    start: '4 Mar 2024 05:01',
    end: '4 Mar 2024 05:02',
    duration: '20 Second',
  },
];

export default function LoginHistoryTab() {
  const [sessions, setSessions] = useState(initialSessions);

  const handleDelete = (idx) => {
    setSessions(sessions.filter((_, i) => i !== idx));
  };

  const handleEndAll = () => {
    setSessions([]);
    alert('All sessions ended!');
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between mb-2">
        <span className="font-semibold text-lg">Login History</span>
        <button type="button" className="bg-[#020A47] text-white px-4 py-2 rounded shadow font-semibold" onClick={handleEndAll}>End All Sessions</button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-separate border-spacing-y-2">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2">OS</th>
              <th className="px-4 py-2">Browser</th>
              <th className="px-4 py-2">Device</th>
              <th className="px-4 py-2">IP Address</th>
              <th className="px-4 py-2">Country</th>
              <th className="px-4 py-2">City</th>
              <th className="px-4 py-2">Lat,Long</th>
              <th className="px-4 py-2">Session Start</th>
              <th className="px-4 py-2">Session End</th>
              <th className="px-4 py-2">Duration</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sessions.map((row, idx) => (
              <tr key={idx} className="bg-white">
                <td className="px-4 py-2">{row.os}</td>
                <td className="px-4 py-2">{row.browser}</td>
                <td className="px-4 py-2">{row.device}</td>
                <td className="px-4 py-2">{row.ip}</td>
                <td className="px-4 py-2">{row.country}</td>
                <td className="px-4 py-2">{row.city}</td>
                <td className="px-4 py-2">{row.latlong}</td>
                <td className="px-4 py-2">{row.start}</td>
                <td className="px-4 py-2">{row.end}</td>
                <td className="px-4 py-2">{row.duration}</td>
                <td className="px-4 py-2">
                  <button type="button" className="text-[#6C63FF] hover:text-red-600 text-lg" title="Delete" onClick={() => handleDelete(idx)}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 