import React, { useState } from 'react';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import { toast } from 'react-toastify';

const initialPartners = [
  {
    id: 1,
    name: 'Partner 1',
    logo: '/images/Red_Hat_logo_PNG2 copy.png',
  },
  {
    id: 2,
    name: 'Partner 2',
    logo: '/images/Microsoft_India-Logo.wine.png',
  }
];

const ManagePartners = () => {
  const [partners, setPartners] = useState(initialPartners);
  const [editingPartner, setEditingPartner] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [form, setForm] = useState({
    name: '',
    logo: '',
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
        if (editingPartner) {
          setPreviewUrl(reader.result);
        } else {
          setForm({ ...form, logo: reader.result });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEdit = (partner) => {
    setEditingPartner(partner.id);
    setPreviewUrl(partner.logo);
    setForm({
      name: partner.name,
      logo: partner.logo,
    });
  };

  const handleUpdate = (id) => {
    setPartners(partners.map(p =>
      p.id === id ? {
        ...p,
        ...form,
        logo: previewUrl || form.logo
      } : p
    ));
    setEditingPartner(null);
    setPreviewUrl(null);
    setForm({ name: '', logo: '' });
    toast.success('Partner updated!');
  };

  const handleDelete = (id) => {
    setPartners(partners.filter(p => p.id !== id));
    toast.success('Partner deleted!');
  };

  const handleAddPartner = () => {
    if (!form.name || !form.logo) {
      toast.error('Please fill all fields and upload a logo');
      return;
    }
    setPartners([...partners, {
      ...form,
      id: Date.now(),
    }]);
    setForm({ name: '', logo: '' });
    toast.success('Partner added!');
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-[#020A47] mb-6">Manage Partners</h1>
      
      {/* Add New Partner Card */}
      <div className="bg-white xl:w-1/2 rounded-lg shadow-md overflow-hidden p-6 mb-8">
        <h2 className="text-xl font-semibold text-[#020A47] mb-4">Add New Partner</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Partner Name</label>
            <input
              type="text"
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              placeholder="Enter partner name"
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Partner Logo</label>
            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-[#020A47] rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition">
              <div className="flex flex-col items-center justify-center">
                <span className="text-4xl text-[#020A47] mb-1">+</span>
                <span className="text-sm text-gray-500">Click to upload</span>
                <span className="text-xs text-gray-400">(PNG, JPG, JPEG, max 2MB)</span>
              </div>
              <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
            </label>
            {form.logo && (
              <div className="mt-3">
                <div className="relative group rounded-lg overflow-hidden border bg-gray-50 shadow-sm">
                  <img src={form.logo} alt="Preview" className="w-full h-32 object-contain rounded" />
                  <div className="absolute inset-0 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition bg-black/30">
                    <button
                      onClick={() => setForm({ ...form, logo: '' })}
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
            onClick={handleAddPartner}
            className="px-4 py-2 bg-[#020A47] text-white rounded hover:bg-[#020A47]/90 flex items-center gap-2"
          >
            <FaPlus /> Add Partner
          </button>
        </div>
      </div>

      {/* Partners Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {partners.map((partner) => (
          <div 
            key={partner.id} 
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            {editingPartner === partner.id ? (
              <div className="p-6">
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Partner Name</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    className="w-full px-3 py-2 border rounded mb-2"
                  />
                  <label className="block text-sm font-medium text-gray-700 mb-2">Partner Logo</label>
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
                <div className="flex gap-2">
                  <button
                    onClick={() => handleUpdate(partner.id)}
                    className="px-4 py-2 bg-[#020A47] text-white rounded hover:bg-[#020A47]/90 flex items-center gap-2"
                  >
                    <FaEdit /> Save
                  </button>
                  <button
                    onClick={() => {
                      setEditingPartner(null);
                      setPreviewUrl(null);
                      setForm({ name: '', logo: '' });
                    }}
                    className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="relative h-48 bg-gray-50 flex items-center justify-center p-4">
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-[#020A47] mb-2">{partner.name}</h3>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(partner)}
                      className="px-4 py-2 bg-[#020A47] text-white rounded hover:bg-[#020A47]/90 flex items-center gap-2"
                    >
                      <FaEdit /> Edit
                    </button>
                    <button
                      onClick={() => handleDelete(partner.id)}
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

export default ManagePartners;
