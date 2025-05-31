import React, { useState, useEffect } from 'react';
import { FaPaperPlane, FaEdit, FaTrash, FaPlus, FaChevronDown } from 'react-icons/fa';
import envConfig from '../../utils/envConfig';
import toast from 'react-hot-toast';

const ManageLetters = () => {
  const [newsletters, setNewsletters] = useState([]);
  const [expandedId, setExpandedId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [newSubject, setNewSubject] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [editModal, setEditModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [editSubject, setEditSubject] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [loading, setLoading] = useState(true);

  // Fetch newsletters
  useEffect(() => {
    const fetchNewsletters = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          toast.error('Please login to view newsletters');
          setLoading(false);
          return;
        }

        const response = await fetch(`${envConfig.backendUrl}/courses/admin/get_newsletter`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        const data = await response.json();
        
        if (response.ok && data.status) {
          setNewsletters(data.data);
        } else {
          toast.error(data.message || 'Failed to fetch newsletters');
        }
      } catch (error) {
        console.error('Error fetching newsletters:', error);
        toast.error('An error occurred while fetching newsletters');
      } finally {
        setLoading(false);
      }
    };

    fetchNewsletters();
  }, []);

  // Accordion expand/collapse
  const handleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  // Add newsletter
  const handleAddNewsletter = async (e) => {
    e.preventDefault();
    if (!newSubject.trim() || !newDescription.trim()) {
      toast.error('Please fill in all fields');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('Please login to add newsletter');
        return;
      }

      const response = await fetch(`${envConfig.backendUrl}/courses/admin/newsleter`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          subject: newSubject,
          description: newDescription
        })
      });

      const data = await response.json();

      if (response.ok && data.status) {
        // Add the new newsletter to the state
        const newLetter = {
          id: newsletters.length + 1,
          subject: newSubject,
          description: newDescription,
        };
        setNewsletters([newLetter, ...newsletters]);
        setShowModal(false);
        setNewSubject('');
        setNewDescription('');
        toast.success('Newsletter added successfully');
      } else {
        toast.error(data.message || 'Failed to add newsletter');
      }
    } catch (error) {
      console.error('Error adding newsletter:', error);
      toast.error('An error occurred while adding the newsletter');
    }
  };

  // Edit newsletter
  const handleEdit = (id) => {
    const letter = newsletters.find((n) => n.id === id);
    if (letter) {
      setEditId(id);
      setEditSubject(letter.subject);
      setEditDescription(letter.description);
      setEditModal(true);
      setShowModal(false);
    }
  };
  const handleEditNewsletter = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('Please login to edit newsletter');
        return;
      }

      const response = await fetch(`${envConfig.backendUrl}/courses/admin/update_newsletter/${editId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          subject: editSubject,
          description: editDescription
        })
      });

      const data = await response.json();

      if (response.ok && data.status) {
        // Update the newsletter in the state
        setNewsletters(newsletters.map((n) => 
          n.id === editId 
            ? { ...n, subject: editSubject, description: editDescription }
            : n
        ));
        setEditModal(false);
        setEditId(null);
        setEditSubject('');
        setEditDescription('');
        toast.success('Newsletter updated successfully');
      } else {
        toast.error(data.message || 'Failed to update newsletter');
      }
    } catch (error) {
      console.error('Error updating newsletter:', error);
      toast.error('An error occurred while updating the newsletter');
    }
  };

  // Dummy actions
  const handleSend = (id) => {
    alert('Newsletter sent! (dummy action)');
  };
  const handleDelete = (id) => {
    setNewsletters(newsletters.filter((n) => n.id !== id));
  };

  return (
    <>
     <div className="p-4 md:p-8 max-w-5xl mx-auto w-full">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-[#020A47]">Newsletter</h1>
            <button
              onClick={() => setShowModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-[#020A47] text-white rounded-lg shadow  transition-colors"
            >
              <FaPlus /> Add Newsletter
            </button>
          </div>

          {/* Newsletter List */}
          <div className="space-y-4">
            {loading ? (
              // Skeleton Loading
              Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className="bg-white rounded-xl shadow animate-pulse border border-gray-100 p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-6 bg-gray-300 rounded w-48"></div>
                    </div>
                    <div className="flex items-center gap-4">
                       <div className="h-6 bg-gray-300 rounded w-6"></div>
                       <div className="h-6 bg-gray-300 rounded w-6"></div>
                       <div className="h-6 bg-gray-300 rounded w-6"></div>
                       <div className="h-6 bg-gray-300 rounded w-6"></div>
                    </div>
                  </div>
                   <div className="mt-4 h-4 bg-gray-300 rounded w-full"></div>
                   <div className="mt-2 h-4 bg-gray-300 rounded w-5/6"></div>
                </div>
              ))
            ) : newsletters.length === 0 ? (
              <div className="text-center text-gray-500">No newsletters found.</div>
            ) : (
              newsletters.map((letter, idx) => (
                <div
                  key={letter.id}
                  className="bg-white rounded-xl shadow hover:shadow-lg transition-shadow border border-gray-100"
                >
                  <div
                    className="flex items-center justify-between px-4 py-3 cursor-pointer select-none"
                    onClick={() => handleExpand(letter.id)}
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-semibold text-[#020A47] text-base md:text-lg">
                        {idx + 1}. {letter.subject}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => { e.stopPropagation(); handleSend(letter.id); }}
                        className="p-2 rounded text-[#020A47]"
                        title="Send"
                      >
                        <FaPaperPlane />
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); handleEdit(letter.id); }}
                        className="p-2 rounded text-[#020A47]"
                        title="Edit"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); handleDelete(letter.id); }}
                        className="p-2 rounded hover:bg-red-50 text-red-600"
                        title="Delete"
                      >
                        <FaTrash />
                      </button>
                      <span className={`transition-transform duration-300 ml-2 ${expandedId === letter.id ? 'rotate-180' : 'rotate-0'}`}>
                        <FaChevronDown />
                      </span>
                    </div>
                  </div>
                  {/* Description (expand/collapse) */}
                  {expandedId === letter.id && (
                    <div className="px-6 pb-4 text-gray-700 text-sm md:text-base">
                      {letter.description}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>

          {/* Data count */}
          <div className="mt-4 text-sm text-gray-500">
            Showing {newsletters.length} of {newsletters.length} data
          </div>
        </div>

        {/* Add Newsletter Modal */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
            <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-lg relative">
              <button
                className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-xl"
                onClick={() => setShowModal(false)}
              >
                ×
              </button>
              <h2 className="text-xl font-bold mb-4 text-[#020A47]">Add Newsletter</h2>
              <form onSubmit={handleAddNewsletter}>
                <div className="mb-4">
                  <label className="block font-semibold mb-1">Subject</label>
                  <input
                    type="text"
                    className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#020A47]"
                    value={newSubject}
                    onChange={(e) => setNewSubject(e.target.value)}
                    placeholder="Subject"
                  />
                </div>
                <div className="mb-4">
                  <label className="block font-semibold mb-1">Description</label>
                  <textarea
                    className="w-full border rounded-lg px-3 py-2 min-h-[100px] focus:outline-none focus:ring-2 focus:ring-[#020A47]"
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                    placeholder="Description"
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-lg bg-[#020A47] text-white "
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Edit Newsletter Modal */}
        {editModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
            <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-lg relative">
              <button
                className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-xl"
                onClick={() => setEditModal(false)}
              >
                ×
              </button>
              <h2 className="text-xl font-bold mb-4 text-[#020A47]">Edit Newsletter</h2>
              <form onSubmit={handleEditNewsletter}>
                <div className="mb-4">
                  <label className="block font-semibold mb-1">Subject</label>
                  <input
                    type="text"
                    className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#020A47]"
                    value={editSubject}
                    onChange={(e) => setEditSubject(e.target.value)}
                    placeholder="Subject"
                  />
                </div>
                <div className="mb-4">
                  <label className="block font-semibold mb-1">Description</label>
                  <textarea
                    className="w-full border rounded-lg px-3 py-2 min-h-[100px] focus:outline-none focus:ring-2 focus:ring-[#020A47]"
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                    placeholder="Description"
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200"
                    onClick={() => setEditModal(false)}
                  >
                    Close
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-lg bg-[#020A47] text-white "
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
    </>
  );
};

export default ManageLetters;
