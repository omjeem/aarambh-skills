import React, { useState, useMemo } from 'react';
import { FaUsers, FaUserTie, FaMoneyBillWave } from 'react-icons/fa';

const summaryData = [
  {
    label: 'Total Referred Users',
    value: 3,
    icon: <FaUsers className="text-3xl text-white" />, bg: 'bg-blue-500',
  },
  {
    label: 'Total Affiliate Users',
    value: 2,
    icon: <FaUserTie className="text-3xl text-white" />, bg: 'bg-yellow-400',
  },
  {
    label: 'Total Registration Amount',
    value: 190,
    icon: <FaMoneyBillWave className="text-3xl text-white" />, bg: 'bg-green-500',
    prefix: '₹',
  },
  {
    label: 'Total Commission Amount',
    value: 14.5,
    icon: <FaMoneyBillWave className="text-3xl text-white" />, bg: 'bg-green-500',
    prefix: '₹',
  },
];

const dummyRows = [
  {
    affiliate: 'Cameron Schofield',
    referred: 'Robert Travis',
    regBonus: 20,
    commission: 0,
    userBonus: 10,
    date: '2023 Mar 16 | 05:38',
  },
  {
    affiliate: 'Cameron Schofield',
    referred: 'Lewis Erickson',
    regBonus: 20,
    commission: 6.5,
    userBonus: 10,
    date: '2023 Mar 16 | 05:26',
  },
  {
    affiliate: 'Robert Ransdell',
    referred: 'Alex Pmelaa',
    regBonus: 80,
    commission: 8,
    userBonus: 50,
    date: '2021 Dec 13 | 02:00',
  },
  {
    affiliate: 'Cameron Schofield',
    referred: 'Robert Travis',
    regBonus: 20,
    commission: 0,
    userBonus: 10,
    date: '2023 Mar 16 | 05:38',
  },
  {
    affiliate: 'Cameron Schofield',
    referred: 'Lewis Erickson',
    regBonus: 20,
    commission: 6.5,
    userBonus: 10,
    date: '2023 Mar 16 | 05:26',
  },
  {
    affiliate: 'Robert Ransdell',
    referred: 'Alex Pmelaa',
    regBonus: 80,
    commission: 8,
    userBonus: 50,
    date: '2021 Dec 13 | 02:00',
  },

];

const itemsPerPage = 10;

export default function History() {
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState('');

  // Filtered rows by search
  const filteredRows = useMemo(() => {
    if (!search) return dummyRows;
    return dummyRows.filter(row =>
      row.affiliate.toLowerCase().includes(search.toLowerCase()) ||
      row.referred.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  const totalPages = Math.ceil(filteredRows.length / itemsPerPage);
  const currentRows = filteredRows.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // Pagination controls
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) pageNumbers.push(i);

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold text-[#020A47]">Referral History</h1>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {summaryData.map((card, idx) => (
          <div key={idx} className="flex items-center bg-white rounded-lg shadow hover:shadow-xl transition-shadow cursor-pointer p-4 gap-4">
            <div className={`w-14 h-14 flex items-center justify-center rounded-lg ${card.bg}`}>{card.icon}</div>
            <div>
              <div className="text-gray-500 text-sm">{card.label}</div>
              <div className="text-xl font-bold text-[#020A47]">{card.prefix || ''}{card.value}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Table Controls */}
      <div className="flex flex-col sm:flex-row justify-end items-center mb-4 gap-4">
        <div className="w-full sm:w-auto">
          <input
            type="text"
            placeholder="Search Affiliate or Referred User"
            value={search}
            onChange={e => { setSearch(e.target.value); setCurrentPage(1); }}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#020A47]"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left">#</th>
              <th className="px-4 py-3 text-left">Affiliate User</th>
              <th className="px-4 py-3 text-left">Referred User</th>
              <th className="px-4 py-3 text-left">Affiliate Registration Bonus</th>
              <th className="px-4 py-3 text-left">Affiliate Commission</th>
              <th className="px-4 py-3 text-left">Referred User Bonus</th>
              <th className="px-4 py-3 text-left">Date</th>
            </tr>
          </thead>
          <tbody>
            {currentRows.length === 0 ? (
              <tr><td colSpan={7} className="text-center py-8 text-gray-400">No data found.</td></tr>
            ) : (
              currentRows.map((row, idx) => (
                <tr key={idx} className="border-t hover:bg-[#F3F6FA] transition">
                  <td className="px-4 py-3">{(currentPage - 1) * itemsPerPage + idx + 1}</td>
                  <td className="px-4 py-3">{row.affiliate}</td>
                  <td className="px-4 py-3">{row.referred}</td>
                  <td className="px-4 py-3">₹{row.regBonus}</td>
                  <td className="px-4 py-3">₹{row.commission}</td>
                  <td className="px-4 py-3">₹{row.userBonus}</td>
                  <td className="px-4 py-3">{row.date}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4 px-4">
        <div className="text-sm text-gray-600">
          Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredRows.length)} of {filteredRows.length} entries
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-3 py-1 rounded ${currentPage === 1
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-gray-100 hover:bg-gray-200'
              }`}
          >
            Previous
          </button>
          {pageNumbers.map((number) => (
            <button
              key={number}
              onClick={() => setCurrentPage(number)}
              className={`px-3 py-1 rounded ${currentPage === number
                ? 'bg-[#020A47] text-white'
                : 'bg-gray-100 hover:bg-gray-200'
                }`}
            >
              {number}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-3 py-1 rounded ${currentPage === totalPages
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-gray-100 hover:bg-gray-200'
              }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
