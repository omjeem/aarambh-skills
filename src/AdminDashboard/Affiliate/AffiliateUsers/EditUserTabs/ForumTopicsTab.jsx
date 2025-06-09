import React, { useState } from 'react';

const initialTopics = [
  {
    topic: 'What is social media?',
    category: 'Social Media',
    posts: 4,
    created: '24 Jun 2022 | 16:11',
    updated: '24 Jun 2022 | 16:15',
  },
  {
    topic: 'What favorite food and or beverage do you enjoy',
    category: 'Food & Beverage',
    posts: 3,
    created: '21 Jun 2022 | 01:59',
    updated: '21 Jun 2022 | 02:02',
  },
];

export default function ForumTopicsTab() {
  const [topics, setTopics] = useState(initialTopics);

  const handleDelete = (idx) => {
    setTopics(topics.filter((_, i) => i !== idx));
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center gap-2 mb-2">
        <span className="font-semibold text-lg">Forum topics</span>
        <div className="flex-1 border-b border-gray-200 ml-2"></div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-separate border-spacing-y-2">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2">Topic</th>
              <th className="px-4 py-2">Category</th>
              <th className="px-4 py-2">Posts</th>
              <th className="px-4 py-2">Created Date</th>
              <th className="px-4 py-2">Updated Date</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {topics.map((row, idx) => (
              <tr key={idx} className="bg-white">
                <td className="px-4 py-2 text-[#6C63FF] cursor-pointer hover:underline">{row.topic}</td>
                <td className="px-4 py-2">{row.category}</td>
                <td className="px-4 py-2">{row.posts}</td>
                <td className="px-4 py-2">{row.created}</td>
                <td className="px-4 py-2">{row.updated}</td>
                <td className="px-4 py-2 flex gap-2">
                  {/* Lock icon */}
                  <span className="text-[#6C63FF] cursor-pointer" title="Lock">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c1.104 0 2-.896 2-2V7a2 2 0 10-4 0v2c0 1.104.896 2 2 2zm6 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2v-6a2 2 0 012-2h8a2 2 0 012 2z" /></svg>
                  </span>
                  {/* View icon */}
                  <span className="text-[#6C63FF] cursor-pointer" title="View">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                  </span>
                  {/* Delete icon */}
                  <span className="text-[#6C63FF] cursor-pointer" title="Delete" onClick={() => handleDelete(idx)}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 