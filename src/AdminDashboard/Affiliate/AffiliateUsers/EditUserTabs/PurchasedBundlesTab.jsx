import React, { useState } from 'react';

const bundleOptions = [
  'Full Stack Developer Bundle',
  'Data Science Mastery',
  'Digital Marketing Pro',
  'AI & ML Advanced',
];
const initialManuallyAddedBundles = [
  {
    bundle: 'Full Stack Developer Bundle',
    type: 'Bundle',
    price: '₹120',
    instructor: 'John Doe',
    date: '10 Jul 2024 | 12:00',
  },
];
const initialManuallyRemovedBundles = [
  {
    bundle: 'Data Science Mastery',
    type: 'Bundle',
    price: '₹150',
    instructor: 'Jane Smith',
    date: '',
  },
];
const initialPurchasedBundles = [
  { bundle: 'Digital Marketing Pro', type: 'Bundle', price: '₹99', instructor: 'Alex Brown', date: '5 Jun 2024 | 09:30' },
  { bundle: 'AI & ML Advanced', type: 'Bundle', price: '₹200', instructor: 'Sara Lee', date: '1 May 2024 | 15:45' },
];

export default function PurchasedBundlesTab() {
  const [selectedBundle, setSelectedBundle] = useState('');
  const [manuallyAddedBundles, setManuallyAddedBundles] = useState(initialManuallyAddedBundles);
  const [manuallyRemovedBundles, setManuallyRemovedBundles] = useState(initialManuallyRemovedBundles);
  const [purchasedBundles, setPurchasedBundles] = useState(initialPurchasedBundles);

  const handleAddBundle = (e) => {
    e.preventDefault();
    if (!selectedBundle) return;
    setManuallyAddedBundles([
      ...manuallyAddedBundles,
      {
        bundle: selectedBundle,
        type: 'Bundle',
        price: '-',
        instructor: 'Unknown',
        date: new Date().toLocaleString(),
      },
    ]);
    setSelectedBundle('');
    alert('Bundle added!');
  };

  const handleRemove = (type, idx) => {
    if (type === 'added') {
      setManuallyAddedBundles(manuallyAddedBundles.filter((_, i) => i !== idx));
    } else if (type === 'removed') {
      setManuallyRemovedBundles(manuallyRemovedBundles.filter((_, i) => i !== idx));
    } else if (type === 'purchased') {
      setPurchasedBundles(purchasedBundles.filter((_, i) => i !== idx));
    }
  };

  return (
    <div className="flex flex-col gap-10">
      {/* Add a bundle */}
      <form className="flex flex-col gap-4" onSubmit={handleAddBundle}>
        <div className="flex items-center gap-2 mb-2">
          <span className="font-semibold text-lg">Add a bundle to the user</span>
          <div className="flex-1 border-b border-gray-200 ml-2"></div>
        </div>
        <div className="w-full md:w-1/2">
          <label className="block mb-1 font-medium">Course Bundle</label>
          <select
            value={selectedBundle}
            onChange={e => setSelectedBundle(e.target.value)}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#020A47]"
          >
            <option value="">Search bundles</option>
            {bundleOptions.map(bundle => (
              <option key={bundle} value={bundle}>{bundle}</option>
            ))}
          </select>
        </div>
        <div className="w-full flex justify-start">
          <button type="submit" className=" bg-[#020A47] text-white px-6 py-2 rounded shadow font-semibold ">Save</button>
        </div>
      </form>
      {/* Manually Added Bundles */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <span className="font-semibold text-lg">Manually Added Bundles</span>
          <div className="flex-1 border-b border-gray-200 ml-2"></div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-separate border-spacing-y-2">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2">Course Bundle</th>
                <th className="px-4 py-2">Type</th>
                <th className="px-4 py-2">Price</th>
                <th className="px-4 py-2">Instructor</th>
                <th className="px-4 py-2">Added Date</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {manuallyAddedBundles.map((row, idx) => (
                <tr key={idx} className="bg-white">
                  <td className="px-4 py-2">{row.bundle}</td>
                  <td className="px-4 py-2">{row.type}</td>
                  <td className="px-4 py-2">{row.price}</td>
                  <td className="px-4 py-2">{row.instructor}</td>
                  <td className="px-4 py-2">{row.date}</td>
                  <td className="px-4 py-2">
                    <button type="button" onClick={() => handleRemove('added', idx)} className="text-[#6C63FF] hover:text-red-600 text-lg">&#10006;</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="text-gray-400 text-sm mt-2">List of contents that the student added to them manually.</div>
        </div>
      </div>
      {/* Manually Removed Bundles */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <span className="font-semibold text-lg">Manually Removed Bundles</span>
          <div className="flex-1 border-b border-gray-200 ml-2"></div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-separate border-spacing-y-2">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2">Course Bundle</th>
                <th className="px-4 py-2">Type</th>
                <th className="px-4 py-2">Price</th>
                <th className="px-4 py-2">Instructor</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {manuallyRemovedBundles.map((row, idx) => (
                <tr key={idx} className="bg-white">
                  <td className="px-4 py-2">{row.bundle}</td>
                  <td className="px-4 py-2">{row.type}</td>
                  <td className="px-4 py-2">{row.price}</td>
                  <td className="px-4 py-2">{row.instructor}</td>
                  <td className="px-4 py-2">
                    <button type="button" onClick={() => handleRemove('removed', idx)} className="text-[#6C63FF] hover:text-red-600 text-lg">&#10006;</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="text-gray-400 text-sm mt-2">List of contents that the user purchased but the user's access removed by admin.</div>
        </div>
      </div>
      {/* Purchased */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <span className="font-semibold text-lg">Purchased</span>
          <div className="flex-1 border-b border-gray-200 ml-2"></div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-separate border-spacing-y-2">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2">Course Bundle</th>
                <th className="px-4 py-2">Type</th>
                <th className="px-4 py-2">Price</th>
                <th className="px-4 py-2">Instructor</th>
                <th className="px-4 py-2">Purchase Date</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {purchasedBundles.map((row, idx) => (
                <tr key={idx} className="bg-white">
                  <td className="px-4 py-2">{row.bundle}</td>
                  <td className="px-4 py-2">{row.type}</td>
                  <td className="px-4 py-2">{row.price}</td>
                  <td className="px-4 py-2">{row.instructor}</td>
                  <td className="px-4 py-2">{row.date}</td>
                  <td className="px-4 py-2">
                    <button type="button" onClick={() => handleRemove('purchased', idx)} className="text-[#6C63FF] hover:text-red-600 text-lg">&#10006;</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
} 