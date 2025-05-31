import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { FaPlus } from 'react-icons/fa';
import { FaEdit } from 'react-icons/fa';
import { FaTrash } from 'react-icons/fa';

const initialFAQs = [
  {
    id: 1,
    question: 'What is Aarambh Skills?',
    answer: 'Aarambh Skills is a platform that provides certificate courses and learning opportunities from world-class universities.',
    status: 'Active'
  },
  {
    id: 2,
    question: 'How do I enroll in a course?',
    answer: 'You can enroll in a course by creating an account, browsing our course catalog, and clicking the "Enroll Now" button on your chosen course.',
    status: 'Active'
  }
];

const ManageFAQ = () => {
  const [faqs, setFaqs] = useState(initialFAQs);
  const [editingFaq, setEditingFaq] = useState(null);
  const [form, setForm] = useState({
    question: '',
    answer: ''
  });

  const handleAddFaq = () => {
    if (!form.question.trim() || !form.answer.trim()) {
      toast.error('Please fill in both question and answer');
      return;
    }

    setFaqs([...faqs, {
      id: Date.now(),
      ...form,
      status: 'Active'
    }]);
    setForm({ question: '', answer: '' });
    toast.success('FAQ added successfully!');
  };

  const handleEdit = (faq) => {
    setEditingFaq(faq.id);
    setForm({
      question: faq.question,
      answer: faq.answer
    });
  };

  const handleUpdate = (id) => {
    if (!form.question.trim() || !form.answer.trim()) {
      toast.error('Please fill in both question and answer');
      return;
    }

    setFaqs(faqs.map(faq =>
      faq.id === id ? { ...faq, ...form } : faq
    ));
    setEditingFaq(null);
    setForm({ question: '', answer: '' });
    toast.success('FAQ updated successfully!');
  };

  const handleDelete = (id) => {
    setFaqs(faqs.filter(faq => faq.id !== id));
    toast.success('FAQ deleted successfully!');
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-[#020A47] mb-6">Manage FAQs</h1>

      {/* Add New FAQ Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-lg font-semibold text-[#020A47] mb-4">Add New FAQ</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Question</label>
            <input
              type="text"
              value={form.question}
              onChange={(e) => setForm({ ...form, question: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#020A47]"
              placeholder="Enter your question"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Answer</label>
            <textarea
              value={form.answer}
              onChange={(e) => setForm({ ...form, answer: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#020A47] h-32"
              placeholder="Enter your answer"
            />
          </div>
          <button
            onClick={handleAddFaq}
            className="px-4 py-2 bg-[#020A47] text-white rounded-md hover:bg-[#020A47]/90 flex items-center gap-2"
          >
            <FaPlus /> Add FAQ
          </button>
        </div>
      </div>

      {/* FAQs List */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-lg font-semibold text-[#020A47] mb-4">Existing FAQs</h2>
        <div className="space-y-4">
          {faqs.map((faq) => (
            <div key={faq.id} className="border border-gray-200 rounded-lg p-4">
              {editingFaq === faq.id ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Question</label>
                    <input
                      type="text"
                      value={form.question}
                      onChange={(e) => setForm({ ...form, question: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#020A47]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Answer</label>
                    <textarea
                      value={form.answer}
                      onChange={(e) => setForm({ ...form, answer: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#020A47] h-32"
                    />
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleUpdate(faq.id)}
                      className="px-4 py-2 bg-[#020A47] text-white rounded-md hover:bg-[#020A47]/90 flex items-center gap-2"
                    >
                      <FaEdit /> Save
                    </button>
                    <button
                      onClick={() => {
                        setEditingFaq(null);
                        setForm({ question: '', answer: '' });
                      }}
                      className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-[#020A47]">{faq.question}</h3>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(faq)}
                        className="p-2 text-[#020A47] hover:bg-[#020A47]/10 rounded-md"
                        title="Edit"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(faq.id)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-md"
                        title="Delete"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                  <p className="text-gray-600">{faq.answer}</p>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ManageFAQ;
