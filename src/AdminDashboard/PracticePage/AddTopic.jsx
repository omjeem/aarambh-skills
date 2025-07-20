import { useState, useEffect } from 'react';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import { toast } from 'react-toastify';
import axios from 'axios';
import envConfig from '../.././utils/envConfig';


const AddTopic = () => {
  const [topics, setTopics] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTopic, setCurrentTopic] = useState({ title: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [loading, setLoading] = useState(true);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = topics.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(topics.length / itemsPerPage);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  useEffect(() => {
    const fetchTopics = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(
          `${envConfig.backendUrl}/prepare/get_topics/`,
          { headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` } }
        );
        // response.data.data is the array of topics
        const topicsArr = Array.isArray(response.data.data)
          ? response.data.data.map(item => ({ id: item.id, title: item.topic }))
          : [];
        setTopics(topicsArr);
      } catch (error) {
        toast.error('Failed to fetch topics');
      } finally {
        setLoading(false);
      }
    };
    fetchTopics();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEditing) {
      // Update existing topic via API
      try {
        const token = localStorage.getItem('token');
        const response = await axios.patch(
          `${envConfig.backendUrl}/prepare/update_topic/${currentTopic.id}`,
          { topic: currentTopic.title },
          { headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` } }
        );
        setTopics(topics.map(topic =>
          topic.id === currentTopic.id ? { ...topic, title: currentTopic.title } : topic
        ));
        toast.success(response.data?.message || 'Topic updated successfully');
      } catch (error) {
        toast.error('Failed to update topic');
      }
    } else {
      // Add new topic
      try {
        const token = localStorage.getItem('token');
        const response = await axios.post(
          `${envConfig.backendUrl}/prepare/create_topic/${encodeURIComponent(currentTopic.title)}`,
          {},
          { headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` } }
        );
        toast.success(response.data?.message || 'Topic added successfully');
        // const data = response.data; // Uncomment if you want to use backend id
        const newTopic = {
          id: topics.length + 1, // Ideally use response.data.id
          title: currentTopic.title
        };
        setTopics([...topics, newTopic]);
        toast.success('Topic added successfully');
      } catch (error) {
        toast.error('Failed to add topic');
      }
    }
    setIsModalOpen(false);
    resetForm();
  };

  const handleEdit = (topic) => {
    setCurrentTopic(topic);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    setConfirmDeleteId(id);
  };

  const confirmDelete = async () => {
    if (!confirmDeleteId) return;
    setDeleteLoading(true);
    try {
      const token = localStorage.getItem('token');
      await axios.patch(
        `${envConfig.backendUrl}/prepare/delete_topic/${confirmDeleteId}`,
        {},
        { headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` } }
      );
      setTopics(topics.filter(topic => topic.id !== confirmDeleteId));
      toast.success('Topic deleted successfully');
    } catch (error) {
      toast.error('Failed to delete topic');
    } finally {
      setDeleteLoading(false);
      setConfirmDeleteId(null);
    }
  };

  const resetForm = () => {
    setCurrentTopic({ title: '' });
    setIsEditing(false);
  };

  return (
    <div className="p-6 w-[80%] ">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-[#020A47]">Practice Topics</h1>
        <button
          onClick={() => {
            resetForm();
            setIsModalOpen(true);
          }}
          className="bg-[#020A47] text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-[#030c5c] transition-colors"
        >
          <FaPlus />
          <span>Add New Topic</span>
        </button>
      </div>

      {/* Topics List */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Topic Name</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200 ">
              {loading ? (
                Array.from({ length: 10 }).map((_, idx) => (
                  <tr key={idx} className="animate-pulse">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-left">
                      <div className="h-4 w-32 bg-gray-200 rounded"></div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-center">
                      <div className="h-4 w-16 bg-gray-200 rounded mx-auto"></div>
                    </td>
                  </tr>
                ))
              ) : (
                currentItems.map((topic) => (
                  <tr key={topic.id} className="hover:bg-gray-50 ">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-left">{topic.title}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-center">
                      <button
                        onClick={() => handleEdit(topic)}
                        className="text-[#020A47] hover:text-[#030c5c] mr-4"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(topic.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination Controls */}
      {totalPages > 0 && (
        <div className="flex justify-between items-center mt-4 px-4">
          <div className="text-sm text-gray-600">
            Showing {topics.length === 0 ? 0 : indexOfFirstItem + 1} to {Math.min(indexOfLastItem, topics.length)} of {topics.length} entries
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
              disabled={currentPage === totalPages || totalPages === 0}
              className={`px-3 py-1 rounded ${currentPage === totalPages || totalPages === 0
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-gray-100 hover:bg-gray-200'
                }`}
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold text-[#020A47] mb-4">
              {isEditing ? 'Edit Topic' : 'Add New Topic'}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Topic Name</label>
                <input
                  type="text"
                  value={currentTopic.title}
                  onChange={(e) => setCurrentTopic({ ...currentTopic, title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#020A47]"
                  required
                />
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false);
                    resetForm();
                  }}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#020A47] text-white rounded-lg hover:bg-[#030c5c] transition-colors"
                >
                  {isEditing ? 'Update' : 'Save'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Custom Delete Confirmation Modal */}
      {confirmDeleteId !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-sm text-center">
            <h2 className="text-xl font-semibold text-[#020A47] mb-4">Confirm Delete</h2>
            <p className="mb-6">Are you sure you want to delete this topic?</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setConfirmDeleteId(null)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 border border-gray-300 rounded"
                disabled={deleteLoading}
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 flex items-center justify-center min-w-[90px]"
                disabled={deleteLoading}
              >
                {deleteLoading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path></svg>
                    Deleting...
                  </span>
                ) : (
                  'Delete'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddTopic;
