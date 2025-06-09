import React, { useRef, useState } from 'react';
import { FiUploadCloud, FiCheckCircle } from 'react-icons/fi';

const logoTypes = [
  {
    key: 'print',
    label: 'Print Logo',
    size: '(170px X 184px)',
    placeholder: '🖨️',
  },
  {
    key: 'admin',
    label: 'Admin Logo',
    size: '(290px X 51px)',
    placeholder: '🏫',
  },
  {
    key: 'adminSmall',
    label: 'Admin Small Logo',
    size: '(32px X 32px)',
    placeholder: '👤',
  },
  {
    key: 'app',
    label: 'App Logo',
    size: '(290px X 51px)',
    placeholder: '📱',
  },
];

function LogoCard({ label, size, image, onImageChange, uploading, success, placeholder }) {
  const fileInput = useRef();

  return (
    <div className="bg-white p-5 rounded-xl shadow-md flex flex-col items-center transition hover:shadow-xl border border-gray-100 relative group">
      <h3 className="text-base font-semibold text-gray-800 mb-2">{label}</h3>
      <div
        className="w-32 h-32 flex items-center justify-center rounded-lg border border-dashed border-gray-300 bg-gray-50 mb-2 cursor-pointer hover:bg-gray-100 transition"
        onClick={() => fileInput.current.click()}
        title="Click to select image"
      >
        {image ? (
          <img src={image} alt={label} className="max-h-28 max-w-28 object-contain" />
        ) : (
          <span className="text-5xl select-none" aria-label={label}>{placeholder}</span>
        )}
      </div>
      <input
        type="file"
        accept="image/*"
        className="hidden"
        ref={fileInput}
        onChange={onImageChange}
      />
      <p className="text-xs text-gray-500 mb-3">{size}</p>
      <button
        className={`w-full flex items-center justify-center gap-2 bg-[#020A47] text-white px-4 py-2 rounded font-semibold text-sm transition hover:bg-[#1a256b] disabled:opacity-60 ${uploading ? 'cursor-not-allowed' : ''}`}
        disabled={uploading}
        onClick={onImageChange ? (e) => { e.preventDefault(); fileInput.current.click(); } : undefined}
      >
        {success ? <FiCheckCircle className="text-lg text-green-400" /> : <FiUploadCloud className="text-lg" />}
        {uploading ? 'Updating...' : success ? 'Updated' : 'Update'}
      </button>
      {uploading && <span className="absolute top-2 right-2 text-xs text-blue-500 animate-pulse">Uploading...</span>}
      {success && <span className="absolute top-2 right-2 text-xs text-green-500">Success!</span>}
    </div>
  );
}

function GeneralSetting() {
  // State for each logo: { preview, uploading, success }
  const [logos, setLogos] = useState({
    print: { preview: '', uploading: false, success: false },
    admin: { preview: '', uploading: false, success: false },
    adminSmall: { preview: '', uploading: false, success: false },
    app: { preview: '', uploading: false, success: false },
  });

  // Handle file change and mock upload
  const handleLogoChange = (key) => (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setLogos((prev) => ({
        ...prev,
        [key]: { ...prev[key], preview: ev.target.result, uploading: true, success: false },
      }));
     
      setTimeout(() => {
        setLogos((prev) => ({
          ...prev,
          [key]: { ...prev[key], uploading: false, success: true },
        }));
        setTimeout(() => {
          setLogos((prev) => ({
            ...prev,
            [key]: { ...prev[key], success: false },
          }));
        }, 2000);
      }, 1500);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="w-[80%] mx-auto h-full bg-white rounded-md shadow-md p-6 mt-4 ">
      <div className="border-b border-gray-200 pb-4 mb-6">
        <h1 className="text-2xl font-bold text-[#020A47]">General Setting</h1>
      </div>
      <form className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="schoolName" className="block text-sm font-medium text-gray-700"> Name </label>
            <input
              type="text"
              className="w-full p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#020A47]/20 focus:border-[#020A47] transition-colors duration-200"
              id="schoolName"
            />
          </div>
      
          <div className="space-y-2">
            <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address *</label>
            <input
              type="text"
              className="w-full p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#020A47]/20 focus:border-[#020A47] transition-colors duration-200"
              id="address"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email *</label>
            <input
              type="email"
              className="w-full p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#020A47]/20 focus:border-[#020A47] transition-colors duration-200"
              id="email"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone *</label>
            <input
              type="text"
              className="w-full p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#020A47]/20 focus:border-[#020A47] transition-colors duration-200"
              id="phone"
            />
          </div>
        </div>

        <hr className="my-6 border-gray-300"/> {/* Separator before File Upload Path */}

        <h4 className="text-xl font-semibold text-[#020A47] mb-4">File Upload Path</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="baseUrl" className="block text-sm font-medium text-gray-700">Base Url *</label>
            <input
              type="url"
              className="w-full p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#020A47]/20 focus:border-[#020A47] transition-colors duration-200"
              id="baseUrl"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="fileUploadPath" className="block text-sm font-medium text-gray-700">File Upload Path *</label>
            <input
              type="url"
              className="w-full p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#020A47]/20 focus:border-[#020A47] transition-colors duration-200"
              id="fileUploadPath"
            />
          </div>
        </div>
      </form>

      {/*  Logo Management Section */}
      <div className="mt-12">
        <div className="border-b border-gray-200 pb-4 mb-8">
          <h2 className="text-2xl font-bold text-[#020A47]">Logo Management</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
          {logoTypes.map((logo) => (
            <LogoCard
              key={logo.key}
              label={logo.label}
              size={logo.size}
              image={logos[logo.key].preview}
              onImageChange={handleLogoChange(logo.key)}
              uploading={logos[logo.key].uploading}
              success={logos[logo.key].success}
              placeholder={logo.placeholder}
            />
          ))}
        </div>
      </div>
      {/* Save button */}
      <div className="flex justify-end items-end py-6 mt-4">
        <button type="submit" className="bg-[#020A47] text-white px-10 py-2 rounded font-semibold text-lg shadow hover:bg-[#1a256b] transition">Save</button>
      </div>
    </div>
  );
}

export default GeneralSetting;
