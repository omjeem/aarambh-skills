import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { FaPlus, FaEdit, FaTrash, FaStar, FaUpload } from 'react-icons/fa';

const initialTestimonials = [
  {
    id: 1,
    image: 'https://randomuser.me/api/portraits/women/1.jpg',
    name: 'Anjali Verma',
    stars: 5,
    review: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature.'
  },
  {
    id: 2,
    image: 'https://randomuser.me/api/portraits/women/2.jpg',
    name: 'Priya Gupta',
    stars: 4,
    review: 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form.'
  }
];

const ManageTestimonials = () => {
  const [testimonials, setTestimonials] = useState(initialTestimonials);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ image: '', name: '', stars: 5, review: '' });
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast.error('File size should be less than 2MB');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        if (editingId) {
          setPreviewUrl(reader.result);
        } else {
          setForm({ ...form, image: reader.result });
          setPreviewUrl(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAdd = () => {
    if (!form.image || !form.name.trim() || !form.review.trim()) {
      toast.error('Please fill in all fields and upload an image');
      return;
    }
    setTestimonials([...testimonials, { id: Date.now(), ...form }]);
    setForm({ image: '', name: '', stars: 5, review: '' });
    setPreviewUrl(null);
    toast.success('Testimonial added!');
  };

  const handleEdit = (t) => {
    setEditingId(t.id);
    setForm({ image: t.image, name: t.name, stars: t.stars, review: t.review });
    setPreviewUrl(t.image);
  };

  const handleUpdate = (id) => {
    if (!form.name.trim() || !form.review.trim()) {
      toast.error('Please fill in name and review');
      return;
    }
    if (!previewUrl) {
      toast.error('Please upload an image');
      return;
    }
    setTestimonials(testimonials.map(t => t.id === id ? { ...t, ...form, image: previewUrl } : t));
    setEditingId(null);
    setForm({ image: '', name: '', stars: 5, review: '' });
    setPreviewUrl(null);
    toast.success('Testimonial updated!');
  };

  const handleDelete = (id) => {
    setTestimonials(testimonials.filter(t => t.id !== id));
    toast.success('Testimonial deleted!');
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-[#020A47] mb-6">Manage Testimonials</h1>
      {/* Add New Testimonial */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-lg font-semibold text-[#020A47] mb-4">Add New Testimonial</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">User Image</label>
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
                  <img src={previewUrl} alt="Preview" className="w-full h-32 object-contain rounded" />
                  <div className="absolute inset-0 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition bg-black/30">
                    <button
                      onClick={() => { setForm({ ...form, image: '' }); setPreviewUrl(null); }}
                      className="px-2 py-1 bg-white text-red-600 rounded shadow text-xs hover:bg-red-600 hover:text-white transition"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              type="text"
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#020A47]"
              placeholder="Enter Name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Stars</label>
            <select
              value={form.stars}
              onChange={e => setForm({ ...form, stars: Number(e.target.value) })}
              className="w-24 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#020A47]"
            >
              {[1,2,3,4,5].map(n => <option key={n} value={n}>{n}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Review</label>
            <textarea
              value={form.review}
              onChange={e => setForm({ ...form, review: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#020A47] h-24"
              placeholder="Enter review text"
            />
          </div>
          <button
            onClick={handleAdd}
            className="px-4 py-2 bg-[#020A47] text-white rounded-md hover:bg-[#020A47]/90 flex items-center gap-2"
          >
            <FaPlus /> Add Testimonial
          </button>
        </div>
      </div>
      {/* Testimonials List */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-lg font-semibold text-[#020A47] mb-4">Existing Testimonials</h2>
        <div className="space-y-4">
          {testimonials.map(t => (
            <div key={t.id} className="border border-gray-200 rounded-lg p-4">
              {editingId === t.id ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">User Image</label>
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
                          <img src={previewUrl} alt="Preview" className="w-full h-32 object-contain rounded" />
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
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={e => setForm({ ...form, name: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#020A47]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Stars</label>
                    <select
                      value={form.stars}
                      onChange={e => setForm({ ...form, stars: Number(e.target.value) })}
                      className="w-24 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#020A47]"
                    >
                      {[1,2,3,4,5].map(n => <option key={n} value={n}>{n}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Review</label>
                    <textarea
                      value={form.review}
                      onChange={e => setForm({ ...form, review: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#020A47] h-24"
                    />
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleUpdate(t.id)}
                      className="px-4 py-2 bg-[#020A47] text-white rounded-md hover:bg-[#020A47]/90 flex items-center gap-2"
                    >
                      <FaEdit /> Save
                    </button>
                    <button
                      onClick={() => {
                        setEditingId(null);
                        setForm({ image: '', name: '', stars: 5, review: '' });
                        setPreviewUrl(null);
                      }}
                      className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-6">
                  <img src={t.image} alt={t.name} className="w-20 h-20 rounded-full object-cover border-2 border-[#020A47]" />
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold text-lg">{t.name}</span>
                      <span className="flex gap-1 text-yellow-500">
                        {[...Array(5)].map((_, i) => (
                          <FaStar key={i} className={i < t.stars ? '' : 'text-gray-300'} />
                        ))}
                      </span>
                    </div>
                    <div className="text-gray-700">{t.review}</div>
                  </div>
                  <div className="flex flex-col gap-2 ml-4">
                    <button
                      onClick={() => handleEdit(t)}
                      className="p-2 text-[#020A47] hover:bg-[#020A47]/10 rounded-md"
                      title="Edit"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(t.id)}
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

export default ManageTestimonials; 