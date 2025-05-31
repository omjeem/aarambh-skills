import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';

const initialStats = [
  { id: 1, number: '8+', label: 'Happy Student' },
  { id: 2, number: '6+', label: 'Quality Trainers' },
  { id: 3, number: '11+', label: 'Premium Courses' },
  { id: 4, number: '5+', label: 'Cost-free Courses' },
];

const ManageWhyArambhStats = () => {
  const [stats, setStats] = useState(initialStats);
  const [editingStat, setEditingStat] = useState(null);
  const [form, setForm] = useState({ number: '', label: '' });

  const handleAddStat = () => {
    if (!form.number.trim() || !form.label.trim()) {
      toast.error('Please fill in both number and label');
      return;
    }
    setStats([...stats, { id: Date.now(), ...form }]);
    setForm({ number: '', label: '' });
    toast.success('Stat added successfully!');
  };

  const handleEdit = (stat) => {
    setEditingStat(stat.id);
    setForm({ number: stat.number, label: stat.label });
  };

  const handleUpdate = (id) => {
    if (!form.number.trim() || !form.label.trim()) {
      toast.error('Please fill in both number and label');
      return;
    }
    setStats(stats.map(stat => stat.id === id ? { ...stat, ...form } : stat));
    setEditingStat(null);
    setForm({ number: '', label: '' });
    toast.success('Stat updated successfully!');
  };

  const handleDelete = (id) => {
    setStats(stats.filter(stat => stat.id !== id));
    toast.success('Stat deleted successfully!');
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-[#020A47] mb-6">Manage Why Arambh Skills Stats</h1>
      {/* Add New Stat Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-lg font-semibold text-[#020A47] mb-4">Add New Stat</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Number</label>
            <input
              type="text"
              value={form.number}
              onChange={e => setForm({ ...form, number: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#020A47]"
              placeholder="e.g. 8+"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Label</label>
            <input
              type="text"
              value={form.label}
              onChange={e => setForm({ ...form, label: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#020A47]"
              placeholder="e.g. Happy Student"
            />
          </div>
          <button
            onClick={handleAddStat}
            className="px-4 py-2 bg-[#020A47] text-white rounded-md hover:bg-[#020A47]/90 flex items-center gap-2"
          >
            <FaPlus /> Add Stat
          </button>
        </div>
      </div>
      {/* Stats List */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-lg font-semibold text-[#020A47] mb-4">Existing Stats</h2>
        <div className="space-y-4">
          {stats.map(stat => (
            <div key={stat.id} className="border border-gray-200 rounded-lg p-4">
              {editingStat === stat.id ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Number</label>
                    <input
                      type="text"
                      value={form.number}
                      onChange={e => setForm({ ...form, number: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#020A47]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Label</label>
                    <input
                      type="text"
                      value={form.label}
                      onChange={e => setForm({ ...form, label: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#020A47]"
                    />
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleUpdate(stat.id)}
                      className="px-4 py-2 bg-[#020A47] text-white rounded-md hover:bg-[#020A47]/90 flex items-center gap-2"
                    >
                      <FaEdit /> Save
                    </button>
                    <button
                      onClick={() => {
                        setEditingStat(null);
                        setForm({ number: '', label: '' });
                      }}
                      className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-lg flex items-center justify-center relative">
                      
                      <span className="text-3xl font-bold relative z-10">{stat.number}</span>
                    </div>
                    <span className="font-semibold text-lg">{stat.label}</span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(stat)}
                      className="p-2 text-[#020A47] hover:bg-[#020A47]/10 rounded-md"
                      title="Edit"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(stat.id)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-md"
                      title="Delete"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ManageWhyArambhStats; 