import React, { useState, useMemo } from 'react';
import { FaUserEdit } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const usersData = [
  {  
    id: 1,
    user: 'Cameron Schofield',
    role: 'Student',
    group: '-',
    refCode: '422536',
    regIncome: 40,
    salesCommission: 6.5,
    status: 'Yes',
  },
  {
    id: 2,
    user: 'Robert Ransdell',
    role: 'Instructor',
    group: '-',
    refCode: '822047',
    regIncome: 80,
    salesCommission: 8,
    status: 'Yes',
  },

];

const itemsPerPage = 10;

export default function AffiliateUsers() {
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState('');
  const navigate  = useNavigate();

  // Filtered users by search
  const filteredUsers = useMemo(() => {
    if (!search) return usersData;
    return usersData.filter(row =>
      row.user.toLowerCase().includes(search.toLowerCase()) ||
      row.role.toLowerCase().includes(search.toLowerCase()) ||
      row.refCode.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const currentRows = filteredUsers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // Pagination controls
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) pageNumbers.push(i);

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-2">
        <h1 className="text-xl font-bold text-[#020A47]">Affiliate Users</h1>
       
      </div>

      {/* Table Controls */}
      <div className="flex flex-col sm:flex-row justify-end items-center mb-4 gap-4">
        <div className="w-full sm:w-auto">
          <input
            type="text"
            placeholder="Search User, Role, or Reference Code"
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
              <th className="px-4 py-3 text-left">User</th>
              <th className="px-4 py-3 text-left">Role</th>
              <th className="px-4 py-3 text-left">User Group</th>
              <th className="px-4 py-3 text-left">Reference Code</th>
              <th className="px-4 py-3 text-left">Registration Income</th>
              <th className="px-4 py-3 text-left">Sales Commission</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentRows.length === 0 ? (
              <tr><td colSpan={8} className="text-center py-8 text-gray-400">No data found.</td></tr>
            ) : (
              currentRows.map((row, idx) => (
                <tr key={idx} className="border-t hover:bg-[#F3F6FA] transition">
                  <td className="px-4 py-3">{row.user}</td>
                  <td className="px-4 py-3">{row.role}</td>
                  <td className="px-4 py-3">{row.group}</td>
                  <td className="px-4 py-3">{row.refCode}</td>
                  <td className="px-4 py-3">${row.regIncome}</td>
                  <td className="px-4 py-3">${row.salesCommission}</td>
                  <td className="px-4 py-3">{row.status}</td>
                  <td className="px-4 py-3">
                    <button onClick={() => navigate(`/admin/dashboard/affiliate/users/${row.id}`)} className="text-[#6C63FF] hover:text-[#020A47] text-lg">
                      <FaUserEdit />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4 px-4">
        <div className="text-sm text-gray-600">
          Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredUsers.length)} of {filteredUsers.length} entries
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
