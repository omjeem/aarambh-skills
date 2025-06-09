import React, { useState } from 'react';

export default function ImagesTab() {
  const [profileImg, setProfileImg] = useState('');
  const [coverImg, setCoverImg] = useState('');
  const [profilePreview, setProfilePreview] = useState('');
  const [coverPreview, setCoverPreview] = useState('');

  const handleProfileImg = (e) => {
    const file = e.target.files[0];
    setProfileImg(file);
    if (file) setProfilePreview(URL.createObjectURL(file));
  };

  const handleCoverImg = (e) => {
    const file = e.target.files[0];
    setCoverImg(file);
    if (file) setCoverPreview(URL.createObjectURL(file));
  };

  const handleImageSave = (e) => {
    e.preventDefault();
    //  image logic here
    alert('Images updated!');
  };

  return (
    <form className="flex flex-col gap-6" onSubmit={handleImageSave}>
      <div>
        <label className="block mb-2 font-medium">Profile Image</label>
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 rounded-full overflow-hidden border bg-gray-100 flex items-center justify-center">
            {profilePreview ? (
              <img src={profilePreview} alt="Profile Preview" className="object-cover w-full h-full" />
            ) : (
              <span className="text-gray-400">No Image</span>
            )}
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={handleProfileImg}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#020A47] file:text-white "
          />
        </div>
      </div>
      <div>
        <label className="block mb-2 font-medium">Cover Image</label>
        <div className="flex items-center gap-4">
          <div className="w-40 h-20 rounded-lg overflow-hidden border bg-gray-100 flex items-center justify-center">
            {coverPreview ? (
              <img src={coverPreview} alt="Cover Preview" className="object-cover w-full h-full" />
            ) : (
              <span className="text-gray-400">No Image</span>
            )}
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={handleCoverImg}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#020A47] file:text-white "
          />
        </div>
      </div>
      <div className="w-full flex justify-end">
        <button type="submit" className="bg-[#020A47] text-white px-6 py-2 rounded shadow font-semibold transition">Save</button>
      </div>
    </form>
  );
} 