import React, { useRef, useState } from 'react';
import { FiDownload, FiTrash2, FiUploadCloud, FiEye, FiEyeOff, FiRefreshCw, FiPlus } from 'react-icons/fi';

function randomKey() {
  return Math.random().toString(36).slice(2, 18).toUpperCase();
}

const initialBackups = [
  {
    name: 'db_ver_7.0.0_2025-05-05_13-40-02.sql',
    date: '2025-05-05 13:40:02',
    size: '2.1 MB',
  },
];

export default function BackupHistory() {
  const [backups, setBackups] = useState(initialBackups);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [cronKey, setCronKey] = useState(randomKey());
  const [cronVisible, setCronVisible] = useState(false);
  const [creating, setCreating] = useState(false);
  const [restoreMsg, setRestoreMsg] = useState('');
  const fileInput = useRef();

  // Create Backup
  const handleCreateBackup = () => {
    setCreating(true);
    setTimeout(() => {
      setBackups((prev) => [
        {
          name: `db_ver_7.0.0_${new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19)}.sql`,
          date: new Date().toLocaleString(),
          size: '2.1 MB',
        },
        ...prev,
      ]);
      setCreating(false);
    }, 1200);
  };

  // Download
  const handleDownload = (name) => {
    // Directly trigger download logic (mock)
    // You can replace this with real download logic
    // For now, just a no-op
  };

  // Restore
  const handleRestore = (name) => {
    setRestoreMsg(`Restoring ${name}...`);
    setTimeout(() => setRestoreMsg(`Restored ${name} successfully!`), 1200);
    setTimeout(() => setRestoreMsg(''), 2500);
  };

  // Delete
  const handleDelete = (name) => {
    // Immediately delete without confirmation
    setBackups((prev) => prev.filter((b) => b.name !== name));
  };

  // Upload
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.name.endsWith('.sql')) {
      setUploadError('Only .sql files allowed');
      return;
    }
    setUploading(true);
    setUploadError('');
    setTimeout(() => {
      setBackups((prev) => [
        {
          name: file.name,
          date: new Date().toLocaleString(),
          size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
        },
        ...prev,
      ]);
      setUploading(false);
    }, 1200);
  };

  // Drag and drop
  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileChange({ target: { files: e.dataTransfer.files } });
    }
  };

  // Generate Cron Key
  const handleGenerateKey = () => setCronKey(randomKey());

  return (
    <div className="w-[95%] mx-auto mt-6 flex flex-col xl:flex-row gap-6">
      {/* Backup History Table */}
      <div className="flex-1 bg-white rounded-2xl shadow-lg border border-gray-50 p-4 min-w-[350px]">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xl font-semibold text-[#020A47]">Backup History</h2>
          <button
            className="flex items-center gap-2 bg-[#020A47] hover:bg-[#1a256b] text-white px-4 py-2 rounded-md shadow text-sm font-semibold transition disabled:opacity-60"
            onClick={handleCreateBackup}
            disabled={creating}
          >
            <FiPlus /> {creating ? 'Creating...' : 'Create Backup'}
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-t border-gray-200">
            <thead>
              <tr className="bg-[#EDF3F5]">
                <th className="text-left py-2 px-2 font-medium text-[#020A47]">Backup Files</th>
                <th className="text-left py-2 px-2 font-medium text-[#020A47]">Date</th>
                <th className="text-left py-2 px-2 font-medium text-[#020A47]">Size</th>
                <th className="text-left py-2 px-2 font-medium text-[#020A47]">Action</th>
              </tr>
            </thead>
            <tbody>
              {backups.length === 0 ? (
                <tr><td colSpan={4} className="text-center py-6 text-gray-400">No backups found.</td></tr>
              ) : (
                backups.map((b) => (
                  <tr key={b.name} className="border-b hover:bg-[#EDF3F5] transition">
                    <td className="py-2 px-2 text-[#020A47] underline cursor-pointer" title={b.name}>{b.name}</td>
                    <td className="py-2 px-2">{b.date}</td>
                    <td className="py-2 px-2">{b.size}</td>
                    <td className="py-2 px-2 flex gap-2">
                      <button className="bg-[#020A47] hover:bg-[#1a256b] text-white px-3 py-1 rounded-md text-xs flex items-center gap-1" onClick={() => handleDownload(b.name)}><FiDownload />Download</button>
                      <button className="bg-[#020A47] hover:bg-[#1a256b] text-white px-3 py-1 rounded-md text-xs flex items-center gap-1" onClick={() => handleRestore(b.name)}><FiRefreshCw />Restore</button>
                      <button className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-xs flex items-center gap-1" onClick={() => handleDelete(b.name)}><FiTrash2 />Delete</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        {restoreMsg && <div className="mt-3 text-center text-[#020A47] font-medium animate-pulse">{restoreMsg}</div>}
      </div>

      {/* Right Side: Upload & Cron Key */}
      <div className="flex flex-col gap-6 w-full lg:w-[350px]">
        {/* Upload */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-50 p-4">
          <h3 className="text-lg font-semibold mb-2 text-[#020A47]">Upload From Local Directory</h3>
          <div
            className="border-2 border-dashed border-gray-500 rounded-md p-4 flex items-center justify-center text-gray-500 cursor-pointer hover:bg-[#EDF3F5] transition mb-2 bg-[#EDF3F5]"
            onClick={() => fileInput.current.click()}
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
          >
            <FiUploadCloud className="text-2xl mr-2" />
            <span>Drag and drop a file here or click</span>
            <input
              type="file"
              accept=".sql"
              className="hidden"
              ref={fileInput}
              onChange={handleFileChange}
            />
          </div>
          {uploadError && <div className="text-red-500 text-xs mb-2">{uploadError}</div>}
          <button
            className="bg-[#020A47] hover:bg-[#1a256b] text-white px-4 py-2 rounded-md shadow text-sm font-semibold w-full transition disabled:opacity-60"
            onClick={() => fileInput.current.click()}
            disabled={uploading}
          >
            {uploading ? 'Uploading...' : 'Upload'}
          </button>
        </div>
        {/* Cron Key */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-50 p-4 flex flex-col gap-2">
          <div className="flex items-center justify-between mb-2">
            <span className="text-lg font-semibold text-[#020A47]">Cron Secret Key</span>
            <button
              className="bg-[#020A47] hover:bg-[#1a256b] text-white px-4 py-1 rounded-md shadow text-sm font-semibold transition"
              onClick={handleGenerateKey}
            >
              Generate
            </button>
          </div>
          <div className="flex items-center gap-2">
            <input
              type={cronVisible ? 'text' : 'password'}
              value={cronKey}
              readOnly
              className="w-full border border-gray-500 rounded-md px-3 py-2 text-lg font-mono bg-[#EDF3F5] focus:outline-none"
            />
            <button
              className="text-[#020A47] hover:text-[#1a256b] p-2"
              onClick={() => setCronVisible((v) => !v)}
              title={cronVisible ? 'Hide' : 'Show'}
              type="button"
            >
              {cronVisible ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
