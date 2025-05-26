import React, { useState, useEffect } from 'react';
import { FaFileExport, FaFilter, FaCalendarAlt } from 'react-icons/fa';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const Content = () => {
  const [activeTab, setActiveTab] = useState('pending');
  const [startDate, setStartDate] = useState(new Date('2025-04-01'));
  const [endDate, setEndDate] = useState(new Date('2025-04-30'));
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [filteredPayouts, setFilteredPayouts] = useState([]);

  // Static data for pending payouts
  const pendingPayouts = [
    {
      id: 1,
      name: 'James Mariyati',
      email: 'instructor@example.com',
      amount: '₹ 100',
      date: '2025-04-12',
      avatar: 'https://ui-avatars.com/api/?name=James+Mariyati'
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      email: 'sarah.j@example.com',
      amount: '₹ 250',
      date: '2025-04-14',
      avatar: 'https://ui-avatars.com/api/?name=Sarah+Johnson'
    },
    {
      id: 3,
      name: 'Michael Chen',
      email: 'michael.c@example.com',
      amount: '₹ 175',
      date: '2025-04-16',
      avatar: 'https://ui-avatars.com/api/?name=Michael+Chen'
    }
  ];

  // Static data for completed payouts
  const completedPayouts = [
    {
      id: 1,
      name: 'Emma Wilson',
      email: 'emma.w@example.com',
      amount: '₹ 300',
      date: '2025-04-05',
      avatar: 'https://ui-avatars.com/api/?name=Emma+Wilson'
    },
    {
      id: 2,
      name: 'David Kumar',
      email: 'david.k@example.com',
      amount: '₹ 150',
      date: '2025-04-07',
      avatar: 'https://ui-avatars.com/api/?name=David+Kumar'
    }
  ];

  // Filter payouts based on date range
  useEffect(() => {
    const currentPayouts = activeTab === 'pending' ? pendingPayouts : completedPayouts;
    const filtered = currentPayouts.filter(payout => {
      const payoutDate = new Date(payout.date);
      return payoutDate >= startDate && payoutDate <= endDate;
    });
    setFilteredPayouts(filtered);
  }, [activeTab, startDate, endDate]);

  const currentPayouts = filteredPayouts;
  const totalAmount = currentPayouts.reduce((sum, payout) => {
    const amount = parseInt(payout.amount.replace('₹', '').trim());
    return sum + amount;
  }, 0);

  const handleExport = () => {
    console.log('Exporting data...');
  };

  const handleDateFilter = () => {
    setShowDatePicker(!showDatePicker);
  };

  const handlePay = (instructorId) => {
    console.log('Processing payment for instructor:', instructorId);
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <div className="p-6 shadow-lg rounded-lg">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#020A47] mb-2">Payout Management</h1>
        <p className="text-gray-600">Manage and process instructor payouts</p>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm mb-6">
        <div className="flex gap-6 p-4">
          <button
            className={`pb-3 px-4 transition-colors duration-200 ${
              activeTab === 'pending'
                ? 'text-[#020A47] border-b-2 border-[#020A47] font-semibold'
                : 'text-gray-500 hover:text-[#020A47]'
            }`}
            onClick={() => setActiveTab('pending')}
          >
            Pending Payouts
          </button>
          <button
            className={`pb-3 px-4 transition-colors duration-200 ${
              activeTab === 'completed'
                ? 'text-[#020A47] border-b-2 border-[#020A47] font-semibold'
                : 'text-gray-500 hover:text-[#020A47]'
            }`}
            onClick={() => setActiveTab('completed')}
          >
            Completed Payouts
          </button>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <button
          onClick={handleExport}
          className="flex items-center gap-2 text-[#020A47] hover:text-[#020A47]/80 transition-colors duration-200"
        >
          <FaFileExport className="text-lg" />
          <span>Export Data</span>
        </button>

        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaCalendarAlt className="text-gray-400" />
            </div>
            <input
              type="text"
              value={`${formatDate(startDate)} - ${formatDate(endDate)}`}
              onClick={handleDateFilter}
              className="border rounded-lg pl-10 pr-4 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-[#020A47]/20 focus:border-[#020A47] cursor-pointer"
              readOnly
            />
            {showDatePicker && (
              <div className="absolute right-0 mt-2 bg-white p-4 rounded-lg shadow-lg z-10">
                <div className="flex flex-col gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                    <DatePicker
                      selected={startDate}
                      onChange={date => setStartDate(date)}
                      className="border rounded-lg px-3 py-2 w-full"
                      dateFormat="MM/dd/yyyy"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                    <DatePicker
                      selected={endDate}
                      onChange={date => setEndDate(date)}
                      className="border rounded-lg px-3 py-2 w-full"
                      dateFormat="MM/dd/yyyy"
                      minDate={startDate}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
          <button
            onClick={handleDateFilter}
            className="flex items-center gap-2 bg-[#020A47] text-white px-6 py-2 rounded-lg hover:bg-[#020A47]/90 transition-colors duration-200"
          >
            <FaFilter />
            <span>Filter</span>
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  #
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentPayouts.map((payout) => (
                <tr key={payout.id} className="hover:bg-gray-50 transition-colors duration-150">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {payout.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0">
                        <img
                          className="h-10 w-10 rounded-full object-cover"
                          src={payout.avatar}
                          alt={payout.name}
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {payout.name}
                        </div>
                        <div className="text-sm text-gray-500">{payout.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-semibold text-green-600">
                      {payout.amount}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(new Date(payout.date))}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    {activeTab === 'pending' ? (
                      <button
                        onClick={() => handlePay(payout.id)}
                        className="text-white bg-[#020A47] hover:bg-[#020A47]/90 px-4 py-2 rounded-lg transition-colors duration-200"
                      >
                        Pay Now
                      </button>
                    ) : (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                        Paid
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot className="bg-gray-50">
              <tr>
                <td colSpan="5" className="px-6 py-4 text-right">
                  <div className="text-sm font-medium text-gray-900">
                    Total Amount: <span className="text-green-600">₹ {totalAmount}</span>
                  </div>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* Pagination Info */}
      <div className="mt-4 text-sm text-gray-500">
        Showing {currentPayouts.length} of {currentPayouts.length} entries
      </div>
    </div>
  );
};

export default Content;
