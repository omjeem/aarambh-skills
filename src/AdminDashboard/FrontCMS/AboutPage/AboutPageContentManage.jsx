import React, { useState } from 'react';
import { toast } from 'react-toastify';

const AboutPageContentManage = () => {
  const [aboutHowTitle, setAboutHowTitle] = useState('How it Started');
  const [aboutHowSubtitle, setAboutHowSubtitle] = useState('Our Dream is Global Learning Transformation');
  const [aboutHowDesc, setAboutHowDesc] = useState('');
  const [aboutStatsImage, setAboutStatsImage] = useState('');
  const [aboutStats, setAboutStats] = useState([
    { value: '3.5', label: 'Years Experience' },
    { value: '23', label: 'Global Course' },
    { value: '830+', label: 'Positive Reviews' },
    { value: '100K', label: 'Trusted Students' }
  ]);
  const [aboutVision, setAboutVision] = useState('');
  const [aboutMission, setAboutMission] = useState('');

  const handleAboutStatsImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast.error('File size should be less than 2MB');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => setAboutStatsImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleAboutStatChange = (idx, key, value) => {
    setAboutStats(stats => stats.map((s, i) => i === idx ? { ...s, [key]: value } : s));
  };

  return (
    <div className="mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-2xl font-bold text-[#020A47] mb-6">About Page Cards</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {/* Card 1: How it Started */}
        <div className="bg-white rounded-2xl shadow-lg flex flex-col p-8 min-h-[300px]">
          <label className="block text-lg font-semibold text-[#020A47] mb-2">How it Started</label>
          <input type="text" value={aboutHowTitle || ''} onChange={e => setAboutHowTitle(e.target.value)} placeholder="Title" className="w-full px-3 py-2 border rounded mb-2" />
          <input type="text" value={aboutHowSubtitle || ''} onChange={e => setAboutHowSubtitle(e.target.value)} placeholder="Subtitle" className="w-full px-3 py-2 border rounded mb-2" />
          <textarea value={aboutHowDesc || ''} onChange={e => setAboutHowDesc(e.target.value)} placeholder="Description" className="w-full px-3 py-2 border rounded mb-2 min-h-[200px]" />
          <div className="flex justify-end mt-auto">
            <button onClick={() => toast.success('Saved!')} className="px-4 py-2 bg-[#020A47] text-white rounded hover:bg-[#020A47]/90">Save</button>
          </div>
        </div>
        {/* Card 2: Stats & Image */}
        <div className="bg-white rounded-2xl shadow-lg flex flex-col p-8 min-h-[300px]">
          <label className="block text-lg font-semibold text-[#020A47] mb-2">Stats & Image</label>
          <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-[#020A47] rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition mb-4">
            <div className="flex flex-col items-center justify-center">
              <span className="text-4xl text-[#020A47] mb-1">+</span>
              <span className="text-sm text-gray-500">Click to upload</span>
              <span className="text-xs text-gray-400">(PNG, JPG, JPEG, max 2MB)</span>
            </div>
            <input type="file" accept="image/*" onChange={handleAboutStatsImage} className="hidden" />
          </label>
          {aboutStatsImage && (
            <div className="flex justify-center mb-4">
              <img src={aboutStatsImage} alt="Stats" className="h-36 w-auto object-cover rounded-xl shadow" />
            </div>
          )}
          <div className="grid grid-cols-2 gap-4 mb-4">
            {aboutStats.map((stat, idx) => (
              <div key={idx} className="flex flex-col gap-1 bg-gray-50 p-3 rounded shadow-sm">
                <input type="text" value={stat.value} onChange={e => handleAboutStatChange(idx, 'value', e.target.value)} placeholder="Value" className="px-2 py-1 border rounded" />
                <input type="text" value={stat.label} onChange={e => handleAboutStatChange(idx, 'label', e.target.value)} placeholder="Label" className="px-2 py-1 border rounded" />
              </div>
            ))}
          </div>
          <div className="flex justify-end mt-auto">
            <button onClick={() => toast.success('Saved!')} className="px-4 py-2 bg-[#020A47] text-white rounded hover:bg-[#020A47]/90">Save</button>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
        {/* Card 3: Vision */}
        <div className="bg-white rounded-2xl shadow-lg flex flex-col p-8 min-h-[180px]">
          <label className="block text-lg font-semibold text-[#020A47] mb-2">Our Vision</label>
          <textarea value={aboutVision || ''} onChange={e => setAboutVision(e.target.value)} placeholder="Vision Description" className="w-full px-3 py-2 border rounded mb-2 min-h-[80px]" />
          <div className="flex justify-end mt-auto">
            <button onClick={() => toast.success('Saved!')} className="px-4 py-2 bg-[#020A47] text-white rounded hover:bg-[#020A47]/90">Save</button>
          </div>
        </div>
        {/* Card 4: Mission */}
        <div className="bg-white rounded-2xl shadow-lg flex flex-col p-8 min-h-[180px]">
          <label className="block text-lg font-semibold text-[#020A47] mb-2">Our Mission</label>
          <textarea value={aboutMission || ''} onChange={e => setAboutMission(e.target.value)} placeholder="Mission Description" className="w-full px-3 py-2 border rounded mb-2 min-h-[80px]" />
          <div className="flex justify-end mt-auto">
            <button onClick={() => toast.success('Saved!')} className="px-4 py-2 bg-[#020A47] text-white rounded hover:bg-[#020A47]/90">Save</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPageContentManage;
