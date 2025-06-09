import React, { useState } from 'react';

const mockData = [
    {
        avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
        name: 'Admin',
        phone: '00000000',
        total: 15,
        spent: 0,
        remained: 15,
    },
    {
        avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
        name: 'James Kong',
        phone: '+12085141324',
        total: 139,
        spent: 0,
        remained: 139,
    },
    {
        avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
        name: 'King Pictures',
        phone: '+441632960079',
        total: 145,
        spent: 0,
        remained: 145,
    },
    {
        avatar: 'https://randomuser.me/api/portraits/men/4.jpg',
        name: 'Cactuscat Clothing',
        phone: '+12025550132',
        total: 1116,
        spent: 0,
        remained: 1116,
    },
    {
        avatar: 'https://randomuser.me/api/portraits/men/5.jpg',
        name: 'Owosso',
        phone: '+12025550198',
        total: 115,
        spent: 0,
        remained: 115,
    },
    {
        avatar: 'https://randomuser.me/api/portraits/men/6.jpg',
        name: 'Affogato Media',
        phone: '+12025550131',
        total: 115,
        spent: 0,
        remained: 115,
    },
    {
        avatar: 'https://randomuser.me/api/portraits/men/7.jpg',
        name: 'Light Moon',
        phone: '+12025550151',
        total: 235,
        spent: 0,
        remained: 235,
    },
    {
        avatar: 'https://randomuser.me/api/portraits/men/8.jpg',
        name: 'TechDecomposed',
        phone: '+441632960582',
        total: 15,
        spent: 0,
        remained: 15,
    },
    {
        avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
        name: 'Jessica Wray',
        phone: '+12025550188',
        total: 198,
        spent: 0,
        remained: 198,
    },
    {
        avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
        name: 'John Powe',
        phone: '+61498970158',
        total: 353,
        spent: 0,
        remained: 353,
    },
];

const itemsPerPage = 10;

const RewardPointsTable = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(mockData.length / itemsPerPage);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = mockData.slice(indexOfFirstItem, indexOfLastItem);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-xl font-bold">Reward Points</h1>

            </div>
            <div className="bg-white rounded-lg shadow">
                <table className="w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-4 py-3 text-left">User</th>
                            <th className="px-4 py-3 text-center">Total Points</th>
                            <th className="px-4 py-3 text-center">Spent Points</th>
                            <th className="px-4 py-3 text-center">Remained Points</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.map((user, idx) => (
                            <tr key={idx} className="border-t">
                                <td className="px-4 py-3 flex items-center gap-3">
                                    <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full object-cover border" />
                                    <div>
                                        <div className="font-medium">{user.name}</div>
                                        <div className="text-xs text-blue-500">{user.phone}</div>
                                    </div>
                                </td>
                                <td className="px-4 py-3 text-center">{user.total}</td>
                                <td className="px-4 py-3 text-center">{user.spent}</td>
                                <td className="px-4 py-3 text-center">{user.remained}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {/* Pagination */}
            <div className="flex justify-end items-end mt-4 gap-2">
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`px-3 py-1 rounded ${currentPage === 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-gray-100 hover:bg-gray-200'}`}
                >
                    Previous
                </button>
                {[...Array(totalPages)].map((_, i) => (
                    <button
                        key={i + 1}
                        onClick={() => handlePageChange(i + 1)}
                        className={`px-3 py-1 rounded ${currentPage === i + 1 ? 'bg-[#020A47] text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
                    >
                        {i + 1}
                    </button>
                ))}
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`px-3 py-1 rounded ${currentPage === totalPages ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-gray-100 hover:bg-gray-200'}`}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default RewardPointsTable;
