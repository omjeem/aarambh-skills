import { useState } from 'react';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import { toast } from 'react-toastify';

const AddTopic = () => {
  const [topics, setTopics] = useState([
    { id: 1, title: 'HTML Basics' },
    { id: 2, title: 'CSS Fundamentals' },
    { id: 3, title: 'JavaScript Introduction' }
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTopic, setCurrentTopic] = useState({ title: '' });
  const [isEditing, setIsEditing] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      // Update existing topic
      setTopics(topics.map(topic => 
        topic.id === currentTopic.id ? { ...topic, title: currentTopic.title } : topic
      ));
      toast.success('Topic updated successfully');
    } else {
      // Add new topic
      const newTopic = {
        id: topics.length + 1,
        title: currentTopic.title
      };
      setTopics([...topics, newTopic]);
      toast.success('Topic added successfully');
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
    if (window.confirm('Are you sure you want to delete this topic?')) {
      setTopics(topics.filter(topic => topic.id !== id));
      toast.success('Topic deleted successfully');
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
              {topics.map((topic) => (
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
              ))}
            </tbody>
          </table>
        </div>
      </div>

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
    </div>
  );
};

export default AddTopic;
