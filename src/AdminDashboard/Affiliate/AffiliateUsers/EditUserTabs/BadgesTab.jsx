import React, { useState } from 'react';

const badgeOptions = [
  'Faithful User',
  'Forums Top User',
  'Helpful Contributor',
];
const automaticBadges = [
  {
    title: 'Faithful User',
    image: 'https://img.icons8.com/color/48/000000/medal2.png',
    condition: '365 to 1000',
    description: 'Old Membership',
    created: '6 Jul 2021',
  },
  {
    title: 'Forums Top User',
    image: 'https://img.icons8.com/color/48/000000/prize.png',
    condition: '1 to 5',
    description: 'Has 2 to 5 Topics',
    created: '25 Jun 2022',
  },
];


export default function BadgesTab() {
  const [selectedBadge, setSelectedBadge] = useState(badgeOptions[0]);

  const handleBadgeSave = (e) => {
    e.preventDefault();
    // Save badge logic here
    alert('Badge saved!');
  };

  return (
    <form className="flex flex-col gap-8" onSubmit={handleBadgeSave}>
      <div className="w-full md:w-1/2">
        <select
          value={selectedBadge}
          onChange={e => setSelectedBadge(e.target.value)}
          className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#020A47]"
        >
          {badgeOptions.map(badge => (
            <option key={badge} value={badge}>{badge}</option>
          ))}
        </select>
      </div>
      <div className="w-full flex justify-start">
        <button type="submit" className=" bg-[#020A47] text-white px-6 py-2 rounded shadow font-semibold ">Save</button>
      </div>
      {/* Custom Badges Table */}
      <div>
        <h3 className="font-semibold text-lg mb-2">Custom Badges</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-separate border-spacing-y-2">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2">Title</th>
                <th className="px-4 py-2">Image</th>
                <th className="px-4 py-2">Condition</th>
                <th className="px-4 py-2">Description</th>
                <th className="px-4 py-2">Created Date</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* No custom badges, so empty row */}
            </tbody>
          </table>
        </div>
      </div>
      {/* Automatic Badges Table */}
      <div>
        <h3 className="font-semibold text-lg mb-2 mt-6">Automatic Badges</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-separate border-spacing-y-2">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2">Title</th>
                <th className="px-4 py-2">Image</th>
                <th className="px-4 py-2">Condition</th>
                <th className="px-4 py-2">Description</th>
                <th className="px-4 py-2">Created Date</th>
              </tr>
            </thead>
            <tbody>
              {automaticBadges.map((badge, idx) => (
                <tr key={idx} className="bg-white">
                  <td className="px-4 py-2">{badge.title}</td>
                  <td className="px-4 py-2"><img src={badge.image} alt={badge.title} className="w-8 h-8 inline-block" /></td>
                  <td className="px-4 py-2">{badge.condition}</td>
                  <td className="px-4 py-2">{badge.description}</td>
                  <td className="px-4 py-2">{badge.created}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </form>
  );
} 