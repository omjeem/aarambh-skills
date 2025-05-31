import React, { useState } from 'react';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import { toast } from 'react-toastify';

const initialExperts = [
  {
    id: 1,
    name: 'John Doe',
    designation: 'CEO & Founder',
    image: '/images/expert1.jpg',
  },
  {
    id: 2,
    name: 'Jane Smith',
    designation: 'CTO',
    image: '/images/expert2.jpg',
  }
];

const ManageExperts = () => {
  const [experts, setExperts] = useState(initialExperts);
  const [editingExpert, setEditingExpert] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [form, setForm] = useState({
    name: '',
    designation: '',
    image: '',
  });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast.error('File size should be less than 2MB');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        if (editingExpert) {
          setPreviewUrl(reader.result);
        } else {
          setForm({ ...form, image: reader.result });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEdit = (expert) => {
    setEditingExpert(expert.id);
    setPreviewUrl(expert.image);
    setForm({
      name: expert.name,
      designation: expert.designation,
      image: expert.image,
    });
  };

  const handleUpdate = (id) => {
    setExperts(experts.map(p =>
      p.id === id ? {
        ...p,
        ...form,
        image: previewUrl || form.image
      } : p
    ));
    setEditingExpert(null);
    setPreviewUrl(null);
    setForm({ name: '', designation: '', image: '' });
    toast.success('Expert updated!');
  };

  const handleDelete = (id) => {
    setExperts(experts.filter(p => p.id !== id));
    toast.success('Expert deleted!');
  };

  const handleAddExpert = () => {
    if (!form.name || !form.designation || !form.image) {
      toast.error('Please fill all fields and upload an image');
      return;
    }
    setExperts([...experts, {
      ...form,
      id: Date.now(),
    }]);
    setForm({ name: '', designation: '', image: '' });
    toast.success('Expert added!');
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-[#020A47] mb-6">Manage Experts</h1>
      
      {/* Add New Expert Card */}
      <div className="bg-white xl:w-1/2 rounded-lg shadow-md overflow-hidden p-6 mb-8">
        <h2 className="text-xl font-semibold text-[#020A47] mb-4">Add New Expert</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              type="text"
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              placeholder="Enter expert name"
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Designation</label>
            <input
              type="text"
              value={form.designation}
              onChange={e => setForm({ ...form, designation: e.target.value })}
              placeholder="Enter designation"
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Expert Image</label>
            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-[#020A47] rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition">
              <div className="flex flex-col items-center justify-center">
                <span className="text-4xl text-[#020A47] mb-1">+</span>
                <span className="text-sm text-gray-500">Click to upload</span>
                <span className="text-xs text-gray-400">(PNG, JPG, JPEG, max 2MB)</span>
              </div>
              <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
            </label>
            {form.image && (
              <div className="mt-3">
                <div className="relative group rounded-lg overflow-hidden border bg-gray-50 shadow-sm">
                  <img src={form.image} alt="Preview" className="w-full h-32 object-cover rounded" />
                  <div className="absolute inset-0 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition bg-black/30">
                    <button
                      onClick={() => setForm({ ...form, image: '' })}
                      className="px-2 py-1 bg-white text-red-600 rounded shadow text-xs hover:bg-red-600 hover:text-white transition"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="flex justify-end mt-4">
          <button
            onClick={handleAddExpert}
            className="px-4 py-2 bg-[#020A47] text-white rounded hover:bg-[#020A47]/90 flex items-center gap-2"
          >
            <FaPlus /> Add Expert
          </button>
        </div>
      </div>

      {/* Experts Grid */}
      <div className="flex flex-wrap gap-6">
        {experts.map((expert) => (
          <div 
            key={expert.id} 
            className="bg-white w-[380px] rounded-lg shadow-md"
          >
            {editingExpert === expert.id ? (
              <div className="p-6">
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    className="w-full px-3 py-2 border rounded mb-2"
                  />
                  <label className="block text-sm font-medium text-gray-700 mb-1">Designation</label>
                  <input
                    type="text"
                    value={form.designation}
                    onChange={e => setForm({ ...form, designation: e.target.value })}
                    className="w-full px-3 py-2 border rounded mb-2"
                  />
                  <label className="block text-sm font-medium text-gray-700 mb-2">Expert Image</label>
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-[#020A47] rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition">
                    <div className="flex flex-col items-center justify-center">
                      <span className="text-4xl text-[#020A47] mb-1">+</span>
                      <span className="text-sm text-gray-500">Click to upload</span>
                      <span className="text-xs text-gray-400">(PNG, JPG, JPEG, max 2MB)</span>
                    </div>
                    <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                  </label>
                  {previewUrl && (
                    <div className="mt-3">
                      <div className="relative group rounded-lg overflow-hidden border bg-gray-50 shadow-sm">
                        <img src={previewUrl} alt="Preview" className="w-full h-32 object-cover rounded" />
                        <div className="absolute inset-0 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition bg-black/30">
                          <button
                            onClick={() => setPreviewUrl(null)}
                            className="px-2 py-1 bg-white text-red-600 rounded shadow text-xs hover:bg-red-600 hover:text-white transition"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleUpdate(expert.id)}
                    className="px-4 py-2 bg-[#020A47] text-white rounded hover:bg-[#020A47]/90 flex items-center gap-2"
                  >
                    <FaEdit /> Save
                  </button>
                  <button
                    onClick={() => {
                      setEditingExpert(null);
                      setPreviewUrl(null);
                      setForm({ name: '', designation: '', image: '' });
                    }}
                    className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="relative">
                  <img
                    src={expert.image}
                    alt={expert.name}
                    className="w-[380px] h-[300px] m-auto object-cover"
                  />
                </div>
                <div className="p-4 mt-28">
                  <h3 className="text-lg font-semibold text-[#020A47]">{expert.name}</h3>
                  <p className="text-gray-600">{expert.designation}</p>
                  <div className="flex gap-2 mt-4">
                    <button
                      onClick={() => handleEdit(expert)}
                      className="px-4 py-2 bg-[#020A47] text-white rounded hover:bg-[#020A47]/90 flex items-center gap-2"
                    >
                      <FaEdit /> Edit
                    </button>
                    <button
                      onClick={() => handleDelete(expert.id)}
                      className="px-4 py-2 border border-red-500 text-red-500 rounded hover:bg-red-50 flex items-center gap-2"
                    >
                      <FaTrash /> Delete
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageExperts;
