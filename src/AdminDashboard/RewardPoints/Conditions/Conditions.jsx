import React, { useState } from 'react';
import { FaEdit, FaTimes } from 'react-icons/fa';


const initialConditions = [
    { title: 'Comment on Instructors Articles', reward: 3, status: 'Active', date: '24 Apr 2022' },
    { title: 'Publishing a Blog Post', reward: 5, status: 'Active', date: '24 Apr 2022' },
    { title: 'Posting a Reply in Forum', reward: 1, status: 'Active', date: '21 Apr 2022' },
    { title: 'Create a Forum Topic', reward: 1, status: 'Active', date: '21 Apr 2022' },
    { title: 'Assignment Pass', reward: 50, status: 'Active', date: '6 Apr 2022' },
    { title: 'Purchase Store Products', reward: 50, status: 'Active', date: '26 Mar 2022' },
    { title: 'Course Completion', reward: 20, status: 'Active', date: '5 Jan 2022' },
    { title: 'Referral & Affiliate', reward: 5, status: 'Active', date: '5 Jan 2022' },
    { title: 'Joining Newsletter', reward: 10, status: 'Active', date: '5 Jan 2022' },
    { title: 'Meeting Reservation (Student)', reward: 30, status: 'Active', date: '5 Jan 2022' },
    { title: 'Meeting Reservation (Instructor)', reward: 30, status: 'Active', date: '5 Jan 2022' },
    { title: 'Course Review (Rate)', reward: 15, status: 'Active', date: '5 Jan 2022' },
    { title: 'Registration', reward: 5, status: 'Active', date: '5 Jan 2022' },
];

const conditionOptions = [
    'Comment on Instructors Articles',
    'Publishing a Blog Post',
    'Posting a Reply in Forum',
    'Create a Forum Topic',
    'Assignment Pass',
    'Purchase Store Products',
    'Course Completion',
    'Referral & Affiliate',
    'Joining Newsletter',
    'Meeting Reservation (Student)',
    'Meeting Reservation (Instructor)',
    'Course Review (Rate)',
    'Registration',
    'Publishing a Course',
];

const Conditions = () => {
    const [conditions, setConditions] = useState(initialConditions);
    const [showModal, setShowModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editIndex, setEditIndex] = useState(null);
    const [newCondition, setNewCondition] = useState({
        title: conditionOptions[0],
        reward: '',
        status: true,
    });
    const [editCondition, setEditCondition] = useState({
        title: '',
        reward: '',
        status: true,
    });

    const handleAddCondition = (e) => {
        e.preventDefault();
        setConditions([
            ...conditions,
            {
                title: newCondition.title,
                reward: newCondition.reward,
                status: newCondition.status ? 'Active' : 'Inactive',
                date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
            },
        ]);
        setShowModal(false);
        setNewCondition({ title: conditionOptions[0], reward: '', status: true });
    };

    const handleEditClick = (idx) => {
        setEditIndex(idx);
        setEditCondition({
            title: conditions[idx].title,
            reward: conditions[idx].reward,
            status: conditions[idx].status === 'Active',
        });
        setShowEditModal(true);
    };

    const handleEditSave = (e) => {
        e.preventDefault();
        setConditions(
            conditions.map((cond, idx) =>
                idx === editIndex
                    ? {
                        ...cond,
                        title: editCondition.title,
                        reward: editCondition.reward,
                        status: editCondition.status ? 'Active' : 'Inactive',
                    }
                    : cond
            )
        );
        setShowEditModal(false);
        setEditIndex(null);
    };

    const handleDelete = (idx) => {
        setConditions(conditions.filter((_, i) => i !== idx));
    };

    return (
        <div className="w-[90%] mx-auto bg-white rounded-md shadow-md p-6 mt-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-[#020A47]">Reward Points</h1>
            </div>
            <button
                className="bg-[#020A47] text-white px-4 py-2 rounded font-semibold mb-4 transition flex items-center gap-2"
                onClick={() => setShowModal(true)}
            >
                <p className="text-2xl flex items-center"> + </p> New Condition
            </button>
            <div className="bg-white rounded-lg shadow overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-4 py-3 text-left">Title</th>
                            <th className="px-4 py-3 text-left">Point Reward</th>
                            <th className="px-4 py-3 text-left">Status</th>
                            <th className="px-4 py-3 text-left">Created Date</th>
                            <th className="px-4 py-3 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {conditions.map((cond, idx) => (
                            <tr key={idx} className={idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                                <td className="px-4 py-3">{cond.title}</td>
                                <td className="px-4 py-3">{cond.reward}</td>
                                <td className="px-4 py-3">{cond.status}</td>
                                <td className="px-4 py-3">{cond.date}</td>
                                <td className="px-4 py-3 flex gap-3 text-[#020A47] text-lg">
                                    <button title="Edit" className="hover:text-blue-600" onClick={() => handleEditClick(idx)}>
                                        <FaEdit />
                                    </button>
                                    <button title="Delete" className="hover:text-red-600" onClick={() => handleDelete(idx)}>
                                        <FaTimes />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Add Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 relative animate-fadeIn">
                        <button className="absolute top-3 right-3 text-gray-400 hover:text-red-500 text-xl" onClick={() => setShowModal(false)}>
                            <FaTimes />
                        </button>
                        <h2 className="text-xl font-semibold text-[#020A47] mb-4">New Condition</h2>
                        <form onSubmit={handleAddCondition} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Condition</label>
                                <select
                                    value={newCondition.title}
                                    onChange={(e) => setNewCondition({ ...newCondition, title: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#020A47]"
                                >
                                    {conditionOptions.map((opt, i) => (
                                        <option key={i} value={opt}>
                                            {opt}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Point Reward</label>
                                <input
                                    type="number"
                                    min={1}
                                    required
                                    value={newCondition.reward}
                                    onChange={(e) => setNewCondition({ ...newCondition, reward: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#020A47]"
                                />
                            </div>
                            <div className="flex items-center gap-2">
                                <label className="font-medium text-[#020A47]">Active</label>
                                <label className="relative inline-block w-11 h-6 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={newCondition.status}
                                        onChange={() => setNewCondition({ ...newCondition, status: !newCondition.status })}
                                        className="sr-only peer"
                                    />
                                    <div className="w-11 h-6 bg-gray-200 rounded-full peer-checked:bg-[#020A47] transition-colors duration-300"></div>
                                    <div className="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow peer-checked:translate-x-5 transition-transform duration-300"></div>
                                </label>
                            </div>
                            <div className="flex justify-end gap-2 mt-4">
                                <button type="button" onClick={() => setShowModal(false)} className="bg-gray-200 text-gray-700 px-5 py-1.5 rounded font-semibold hover:bg-gray-300">
                                    Close
                                </button>
                                <button type="submit" className="bg-[#020A47] text-white px-6 py-1.5 rounded font-semibold hover:bg-[#03105a] shadow">
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Edit Modal */}
            {showEditModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 relative animate-fadeIn">
                        <button className="absolute top-3 right-3 text-gray-400 hover:text-red-500 text-xl" onClick={() => setShowEditModal(false)}>
                            <FaTimes />
                        </button>
                        <h2 className="text-xl font-semibold text-[#020A47] mb-4">Edit Condition</h2>
                        <form onSubmit={handleEditSave} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Condition</label>
                                <select
                                    value={editCondition.title}
                                    onChange={(e) => setEditCondition({ ...editCondition, title: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#020A47]"
                                >
                                    {conditionOptions.map((opt, i) => (
                                        <option key={i} value={opt}>
                                            {opt}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Point Reward</label>
                                <input
                                    type="number"
                                    min={1}
                                    required
                                    value={editCondition.reward}
                                    onChange={(e) => setEditCondition({ ...editCondition, reward: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#020A47]"
                                />
                            </div>
                            <div className="flex items-center gap-2">
                                <label className="font-medium text-[#020A47]">Active</label>
                                <label className="relative inline-block w-11 h-6 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={editCondition.status}
                                        onChange={() => setEditCondition({ ...editCondition, status: !editCondition.status })}
                                        className="sr-only peer"
                                    />
                                    <div className="w-11 h-6 bg-gray-200 rounded-full peer-checked:bg-[#020A47] transition-colors duration-300"></div>
                                    <div className="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow peer-checked:translate-x-5 transition-transform duration-300"></div>
                                </label>
                            </div>
                            <div className="flex justify-end gap-2 mt-4">
                                <button type="button" onClick={() => setShowEditModal(false)} className="bg-gray-200 text-gray-700 px-5 py-1.5 rounded font-semibold hover:bg-gray-300">
                                    Close
                                </button>
                                <button type="submit" className="bg-[#020A47] text-white px-6 py-1.5 rounded font-semibold hover:bg-[#03105a] shadow">
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Conditions;
