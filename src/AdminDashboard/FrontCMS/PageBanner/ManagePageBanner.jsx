import React, { useState } from 'react';
import { FaUpload, FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import { toast } from 'react-toastify';


const initialBanners = [
  {
    id: 1,
    pageName: 'Home',
    cardType: 'left',
    title: 'Accelerate your career',
    heading: 'We provide GPT Services',
    description: 'Power ahead in your career with certificate courses & from world-class universities.',
    buttonText: 'Click Now',
    buttonLink: '#',
    images: [
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=500&auto=format&fit=crop&q=60',
    
    ],
    status: 'Active'
  },
  {
    id: 2,
    pageName: 'Home',
    cardType: 'right', 
    title: 'ChatGPT in learning',
    heading: '',
    description: 'Learn AI with Aarambh',
    buttonText: 'Register Now',
    buttonLink: '#',
    image: '/images/gpt.png',
    status: 'Active'
  },
  {
    id: 3,
    pageName: 'Home',
    cardType: 'right', 
    title: 'ChatGPT in learning',
    heading: '',
    description: 'Learn AI with Aarambh',
    buttonText: 'Register Now',
    buttonLink: '#',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=500&auto=format&fit=crop&q=60',
    status: 'Active'
  }
];

const initialCourseBanners = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=500&auto=format&fit=crop&q=60',
  },
  {
    id: 2,
    image: 'https://assets-global.website-files.com/5f6b7190797c1e6140ae0d1f/63f5e2c7e6a7c7b3c1e2b2fc_copyai-og-image.png',
  }
];

const initialHomeBanner = {
  id: 'home-banner',
  image: '/images/banner.png',
};

const initialPracticeBanners = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=500&auto=format&fit=crop&q=60',
  },
  {
    id: 2,
    image: 'https://assets-global.website-files.com/5f6b7190797c1e6140ae0d1f/63f5e2c7e6a7c7b3c1e2b2fc_copyai-og-image.png',
  }
];

const ManagePageBanner = () => {
  const [banners, setBanners] = useState(initialBanners);
  const [courseBanners, setCourseBanners] = useState(initialCourseBanners);
  const [editingBanner, setEditingBanner] = useState(null);
  const [previewUrls, setPreviewUrls] = useState([]);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [form, setForm] = useState({
    title: '',
    heading: '',
    description: '',
    buttonText: '',
    buttonLink: '',
    images: [],
    image: '',
    cardType: 'left',
  });
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [courseBannerPreview, setCourseBannerPreview] = useState(null);
  const [courseBannerFile, setCourseBannerFile] = useState(null);
  const [editingCourseBanner, setEditingCourseBanner] = useState(null);
  const [homeBanner, setHomeBanner] = useState(initialHomeBanner);
  const [editingHomeBanner, setEditingHomeBanner] = useState(false);
  const [homeBannerPreview, setHomeBannerPreview] = useState(null);
  const [homeBannerFile, setHomeBannerFile] = useState(null);
  const [practiceBanners, setPracticeBanners] = useState(initialPracticeBanners);
  const [practiceBannerPreview, setPracticeBannerPreview] = useState(null);
  const [practiceBannerFile, setPracticeBannerFile] = useState(null);
  const [editingPracticeBanner, setEditingPracticeBanner] = useState(null);

  const handleFileChange = (e, isEdit = false, isSingleImage = false) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      const validFiles = files.filter(file => {
        if (file.size > 2 * 1024 * 1024) {
          toast.error(`${file.name} is larger than 2MB`);
          return false;
        }
        return true;
      });

      if (validFiles.length === 0) return;

      if (isSingleImage) {
        const file = validFiles[0];
        const reader = new FileReader();
        reader.onloadend = () => {
          if (isEdit) {
            setPreviewUrl(reader.result);
          } else {
            setForm({ ...form, image: reader.result });
          }
        };
        reader.readAsDataURL(file);
        if (isEdit) setSelectedFile(file);
      } else {
        const newPreviewUrls = [];
        validFiles.forEach(file => {
          const reader = new FileReader();
          reader.onloadend = () => {
            newPreviewUrls.push(reader.result);
            if (isEdit) {
              setPreviewUrls([...previewUrls, ...newPreviewUrls]);
            } else {
              setForm({ ...form, images: [...form.images, ...newPreviewUrls] });
            }
          };
          reader.readAsDataURL(file);
        });

        if (isEdit) {
          setSelectedFiles([...selectedFiles, ...validFiles]);
        }
      }
    }
  };

  const handleEdit = (banner) => {
    setEditingBanner(banner.id);
    if (banner.images) {
      setPreviewUrls(banner.images);
      setForm({
        title: banner.title,
        heading: banner.heading,
        description: banner.description,
        buttonText: banner.buttonText,
        buttonLink: banner.buttonLink,
        images: banner.images,
        cardType: banner.cardType,
      });
    } else {
      setPreviewUrl(banner.image);
      setForm({
        title: banner.title,
        heading: banner.heading,
        description: banner.description,
        buttonText: banner.buttonText,
        buttonLink: banner.buttonLink,
        image: banner.image,
        cardType: banner.cardType,
      });
    }
  };

  const handleUpdate = (id) => {
    setBanners(banners.map(b =>
      b.id === id ? {
        ...b,
        ...form,
        images: b.images ? (previewUrls.length > 0 ? previewUrls : form.images) : undefined,
        image: !b.images ? (previewUrl || form.image) : undefined
      } : b
    ));
    setEditingBanner(null);
    setPreviewUrls([]);
    setPreviewUrl(null);
    setForm({ title: '', heading: '', description: '', buttonText: '', buttonLink: '', images: [], image: '', cardType: 'left' });
    setSelectedFiles([]);
    setSelectedFile(null);
    toast.success('Banner updated!');
  };

  const handleDelete = (id) => {
    setBanners(banners.filter(b => b.id !== id));
    toast.success('Banner deleted!');
  };

  const handleAddBanner = () => {
    if (!form.title && !form.heading && !form.description && form.images.length === 0) {
      toast.error('Please fill at least one field and upload at least one image.');
      return;
    }
    setBanners([...banners, {
      ...form,
      id: Date.now(),
      pageName: 'Home',
      status: 'Active',
    }]);
    setForm({ title: '', heading: '', description: '', buttonText: '', buttonLink: '', images: [], cardType: 'left' });
    toast.success('Banner added!');
  };

  const handleRemoveImage = (index, isEdit = false) => {
    if (isEdit) {
      setPreviewUrls(previewUrls.filter((_, i) => i !== index));
    } else {
      setForm({ ...form, images: form.images.filter((_, i) => i !== index) });
    }
  };

  const handleCourseBannerFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast.error('File size should be less than 2MB');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setCourseBannerPreview(reader.result);
      };
      reader.readAsDataURL(file);
      setCourseBannerFile(file);
    }
  };

  const handleAddCourseBanner = () => {
    if (!courseBannerPreview) {
      toast.error('Please select an image');
      return;
    }
    setCourseBanners([
      ...courseBanners,
      { id: Date.now(), image: courseBannerPreview }
    ]);
    setCourseBannerPreview(null);
    setCourseBannerFile(null);
    toast.success('Banner added!');
  };

  const handleEditCourseBanner = (banner) => {
    setEditingCourseBanner(banner.id);
    setCourseBannerPreview(banner.image);
  };

  const handleUpdateCourseBanner = (id) => {
    setCourseBanners(courseBanners.map(b =>
      b.id === id ? { ...b, image: courseBannerPreview } : b
    ));
    setEditingCourseBanner(null);
    setCourseBannerPreview(null);
    setCourseBannerFile(null);
    toast.success('Banner updated!');
  };

  const handleDeleteCourseBanner = (id) => {
    setCourseBanners(courseBanners.filter(b => b.id !== id));
    toast.success('Banner deleted!');
  };

  const handleHomeBannerFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast.error('File size should be less than 2MB');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setHomeBannerPreview(reader.result);
      };
      reader.readAsDataURL(file);
      setHomeBannerFile(file);
    }
  };

  const handleUpdateHomeBanner = () => {
    setHomeBanner({ ...homeBanner, image: homeBannerPreview });
    setEditingHomeBanner(false);
    setHomeBannerPreview(null);
    setHomeBannerFile(null);
    toast.success('Home banner updated!');
  };

  const handleDeleteHomeBanner = () => {
    setHomeBanner({ ...homeBanner, image: '' });
    setHomeBannerPreview(null);
    setHomeBannerFile(null);
    toast.success('Home banner deleted!');
  };

  const handlePracticeBannerFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast.error('File size should be less than 2MB');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setPracticeBannerPreview(reader.result);
      };
      reader.readAsDataURL(file);
      setPracticeBannerFile(file);
    }
  };

  const handleAddPracticeBanner = () => {
    if (!practiceBannerPreview) {
      toast.error('Please select an image');
      return;
    }
    setPracticeBanners([
      ...practiceBanners,
      { id: Date.now(), image: practiceBannerPreview }
    ]);
    setPracticeBannerPreview(null);
    setPracticeBannerFile(null);
    toast.success('Banner added!');
  };

  const handleEditPracticeBanner = (banner) => {
    setEditingPracticeBanner(banner.id);
    setPracticeBannerPreview(banner.image);
  };

  const handleUpdatePracticeBanner = (id) => {
    setPracticeBanners(practiceBanners.map(b =>
      b.id === id ? { ...b, image: practiceBannerPreview } : b
    ));
    setEditingPracticeBanner(null);
    setPracticeBannerPreview(null);
    setPracticeBannerFile(null);
    toast.success('Banner updated!');
  };

  const handleDeletePracticeBanner = (id) => {
    setPracticeBanners(practiceBanners.filter(b => b.id !== id));
    toast.success('Banner deleted!');
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-[#020A47] mb-6"> Home Page Banners</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 mb-10">
        {/* Home Banner Card */}
        {banners.map((banner, idx) => (
          <div key={banner.id} className="bg-white rounded-lg shadow-md overflow-hidden p-6 flex flex-col justify-between h-[500px]">
            {editingBanner === banner.id ? (
              <div className="overflow-y-auto">
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <input type="text" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} className="w-full px-3 py-2 border rounded mb-2" />
                  <label className="block text-sm font-medium text-gray-700 mb-1">Heading</label>
                  <input type="text" value={form.heading} onChange={e => setForm({ ...form, heading: e.target.value })} className="w-full px-3 py-2 border rounded mb-2" />
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} className="w-full px-3 py-2 border rounded mb-2" />
                  <label className="block text-sm font-medium text-gray-700 mb-1">Button Text</label>
                  <input type="text" value={form.buttonText} onChange={e => setForm({ ...form, buttonText: e.target.value })} className="w-full px-3 py-2 border rounded mb-2" />
                  <label className="block text-sm font-medium text-gray-700 mb-1">Button Link</label>
                  <input type="text" value={form.buttonLink} onChange={e => setForm({ ...form, buttonLink: e.target.value })} className="w-full px-3 py-2 border rounded mb-2" />
                  
                  {/* Image Section */}
                  {banner.images ? (
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Add New Images</label>
                      <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-[#020A47] rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition">
                        <div className="flex flex-col items-center justify-center">
                          <span className="text-4xl text-[#020A47] mb-1">+</span>
                          <span className="text-sm text-gray-500">Click to upload</span>
                          <span className="text-xs text-gray-400">(PNG, JPG, JPEG, max 2MB)</span>
                        </div>
                        <input type="file" accept="image/*" multiple onChange={e => handleFileChange(e, true, false)} className="hidden" />
                      </label>
                      {previewUrls.length > 0 && (
                        <div className="mt-3">
                          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                            {previewUrls.map((url, index) => (
                              <div key={index} className="relative group rounded-lg overflow-hidden border bg-gray-50 shadow-sm">
                                <img src={url} alt={`Preview ${index + 1}`} className="w-full h-24 object-cover rounded transition group-hover:brightness-75" />
                                <div className="absolute inset-0 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition bg-black/30">
                                  <button
                                    onClick={() => handleRemoveImage(index, true)}
                                    className="px-2 py-1 bg-white text-red-600 rounded shadow text-xs hover:bg-red-600 hover:text-white transition"
                                  >
                                    Delete
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Add New Image</label>
                      <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-[#020A47] rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition">
                        <div className="flex flex-col items-center justify-center">
                          <span className="text-4xl text-[#020A47] mb-1">+</span>
                          <span className="text-sm text-gray-500">Click to upload</span>
                          <span className="text-xs text-gray-400">(PNG, JPG, JPEG, max 2MB)</span>
                        </div>
                        <input type="file" accept="image/*" onChange={e => handleFileChange(e, true, true)} className="hidden" />
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
                  )}
                </div>
                <div className="flex gap-2 mt-4">
                  <button onClick={() => handleUpdate(banner.id)} className=" px-4 py-2 bg-[#020A47] text-white rounded hover:bg-[#020A47]/90 flex items-center gap-2"><FaEdit /> Save</button>
                  <button onClick={() => setEditingBanner(null)} className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50">Cancel</button>
                </div>
              </div>
            ) : (
              <>
                <div className="mb-4">
                  <div className="mb-2 text-xs text-gray-500">{banner.pageName} Page</div>
                  <div className="font-bold text-lg mb-1">{banner.title}</div>
                  {banner.heading && <div className="text-2xl font-bold mb-1">{banner.heading}</div>}
                  {banner.description && <div className="mb-2 text-gray-700">{banner.description}</div>}
                  {banner.buttonText && <a href={banner.buttonLink} className="inline-block px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded mb-2">{banner.buttonText}</a>}
                  {banner.images ? (
                    <div className="relative h-40 mb-2">
                      <div className="flex overflow-x-auto snap-x snap-mandatory gap-2">
                        {banner.images.map((image, index) => (
                          <img
                            key={index}
                            src={image}
                            alt={`Banner ${index + 1}`}
                            className="w-full h-40 object-cover rounded snap-center flex-shrink-0"
                          />
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="relative h-40 mb-2">
                      <img
                        src={banner.image}
                        alt="Banner"
                        className="w-full h-40 object-cover rounded"
                      />
                    </div>
                  )}
                </div>
                <div className="flex gap-2 mt-auto">
                  <button onClick={() => handleEdit(banner)} className=" px-4 py-2 bg-[#020A47] text-white rounded hover:bg-[#020A47]/90 flex items-center gap-2"><FaEdit /> Edit</button>
                  <button onClick={() => handleDelete(banner.id)} className="px-4 py-2 border border-red-500 text-red-500 rounded hover:bg-red-50 flex items-center gap-2"><FaTrash /> Delete</button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
      <div className="bg-white xl:w-1/2 mb-5 rounded-lg shadow-md overflow-hidden p-6 flex flex-col justify-between h-full">
          {editingHomeBanner ? (
            <div className="overflow-y-auto">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Upload Home Banner Image</label>
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-[#020A47] rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition">
                  <div className="flex flex-col items-center justify-center">
                    <span className="text-4xl text-[#020A47] mb-1">+</span>
                    <span className="text-sm text-gray-500">Click to upload</span>
                    <span className="text-xs text-gray-400">(PNG, JPG, JPEG, max 2MB)</span>
                  </div>
                  <input type="file" accept="image/*" onChange={handleHomeBannerFile} className="hidden" />
                </label>
                {homeBannerPreview && (
                  <div className="mt-3">
                    <div className="relative group rounded-lg overflow-hidden border bg-gray-50 shadow-sm">
                      <img src={homeBannerPreview} alt="Preview" className="w-full h-32 object-cover rounded" />
                      <div className="absolute inset-0 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition bg-black/30">
                        <button
                          onClick={() => setHomeBannerPreview(null)}
                          className="px-2 py-1 bg-white text-red-600 rounded shadow text-xs hover:bg-red-600 hover:text-white transition"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                )}
                {!homeBannerPreview && homeBanner.image && (
                  <div className="mt-3">
                    <div className="relative group rounded-lg overflow-hidden border bg-gray-50 shadow-sm">
                      <img src={homeBanner.image} alt="Home Banner" className="w-full h-32 object-cover rounded" />
                      <div className="absolute inset-0 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition bg-black/30">
                        <button
                          onClick={handleDeleteHomeBanner}
                          className="px-2 py-1 bg-white text-red-600 rounded shadow text-xs hover:bg-red-600 hover:text-white transition"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="flex  gap-2 mt-4">
                <button onClick={handleUpdateHomeBanner} className="px-4 py-2 bg-[#020A47] text-white rounded hover:bg-[#020A47]/90 flex items-center gap-2"><FaEdit /> Save</button>
                <button onClick={() => { setEditingHomeBanner(false); setHomeBannerPreview(null); }} className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50">Cancel</button>
              </div>
            </div>
          ) : (
            <>
              <div className="mb-4">
                <div className="mb-2 text-xs text-gray-500">Mobile Application Banner</div>
         
                <div className="relative h-40 mb-2">
                  {homeBanner.image ? (
                    <img src={homeBanner.image} alt="Home Banner" className="w-full h-40 object-cover rounded" />
                  ) : (
                    <div className="w-full h-40 flex items-center justify-center bg-gray-100 text-gray-400 rounded">No Image</div>
                  )}
                </div>
              </div>
              <div className="flex gap-2 mt-auto">
                <button onClick={() => setEditingHomeBanner(true)} className=" px-4 py-2 bg-[#020A47] text-white rounded hover:bg-[#020A47]/90 flex items-center gap-2"><FaEdit /> Edit</button>
                <button onClick={() => handleDeleteHomeBanner()} className="px-4 py-2 border border-red-500 text-red-500 rounded hover:bg-red-50 flex items-center gap-2"><FaTrash /> Delete</button>

              </div>
            </>
          )}
        </div>

      {/* Course Page Banners Section */}
      <div className="w-1/2  mb-12">
      <h1 className="text-2xl font-bold text-[#020A47] mb-6"> Course Page Banners (Slider)</h1>
      
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="border-b mb-4" />

          {/* Add Image Dropzone */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Add New Image</label>
            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-[#020A47] rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition">
              <div className="flex flex-col items-center justify-center">
                <span className="text-4xl text-[#020A47] mb-1">+</span>
                <span className="text-sm text-gray-500">Click  to upload</span>
                <span className="text-xs text-gray-400">(PNG, JPG, JPEG, max 2MB)</span>
              </div>
              <input type="file" accept="image/*" onChange={handleCourseBannerFile} className="hidden" />
            </label>
            {courseBannerPreview && (
              <div className="mt-3 flex flex-col items-center">
                <img src={courseBannerPreview} alt="Preview" className="w-full max-w-xs h-32 object-cover rounded-lg border mb-2" />
                <button onClick={handleAddCourseBanner} className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded shadow hover:from-blue-600 hover:to-purple-600 transition">Add Image</button>
              </div>
            )}
          </div>

          {/* Images Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {courseBanners.map((banner) => (
              <div key={banner.id} className="relative group rounded-lg overflow-hidden border bg-gray-50 shadow-sm">
                {editingCourseBanner === banner.id ? (
                  <div className="flex flex-col items-center p-3 bg-white">
                    <input type="file" accept="image/*" onChange={handleCourseBannerFile} className="mb-2" />
                    {courseBannerPreview && <img src={courseBannerPreview} alt="Preview" className="w-full h-24 object-cover rounded mb-2" />}
                    <div className="flex gap-2">
                      <button onClick={() => handleUpdateCourseBanner(banner.id)} className="px-3 py-1 bg-[#020A47] text-white rounded text-xs shadow hover:bg-[#1a256b] transition">Save</button>
                      <button onClick={() => { setEditingCourseBanner(null); setCourseBannerPreview(null); }} className="px-3 py-1 border rounded text-xs shadow">Cancel</button>
                    </div>
                  </div>
                ) : (
                  <>
                    <img src={banner.image} alt="Course Banner" className="w-full h-24 object-cover rounded transition group-hover:brightness-75" />
                    <div className="absolute inset-0 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition bg-black/30">
                      <button title="Edit" onClick={() => handleEditCourseBanner(banner)} className="px-2 py-1 bg-white text-[#020A47] rounded shadow text-xs hover:bg-[#020A47] hover:text-white transition">Edit</button>
                      <button title="Delete" onClick={() => handleDeleteCourseBanner(banner.id)} className="px-2 py-1 bg-white text-red-600 rounded shadow text-xs hover:bg-red-600 hover:text-white transition">Delete</button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Practice Page Banners Section */}
      <div className="w-1/2  mb-12">
        <h1 className="text-2xl font-bold text-[#020A47] mb-6"> Practice Page Banners (Slider)</h1>
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="border-b mb-4" />
          {/* Add Image Dropzone */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Add New Image</label>
            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-[#020A47] rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition">
              <div className="flex flex-col items-center justify-center">
                <span className="text-4xl text-[#020A47] mb-1">+</span>
                <span className="text-sm text-gray-500">Click to upload</span>
                <span className="text-xs text-gray-400">(PNG, JPG, JPEG, max 2MB)</span>
              </div>
              <input type="file" accept="image/*" onChange={handlePracticeBannerFile} className="hidden" />
            </label>
            {practiceBannerPreview && (
              <div className="mt-3 flex flex-col items-center">
                <img src={practiceBannerPreview} alt="Preview" className="w-full max-w-xs h-32 object-cover rounded-lg border mb-2" />
                <button onClick={handleAddPracticeBanner} className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded shadow hover:from-blue-600 hover:to-purple-600 transition">Add Image</button>
              </div>
            )}
          </div>
          {/* Images Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {practiceBanners.map((banner) => (
              <div key={banner.id} className="relative group rounded-lg overflow-hidden border bg-gray-50 shadow-sm">
                {editingPracticeBanner === banner.id ? (
                  <div className="flex flex-col items-center p-3 bg-white">
                    <input type="file" accept="image/*" onChange={handlePracticeBannerFile} className="mb-2" />
                    {practiceBannerPreview && <img src={practiceBannerPreview} alt="Preview" className="w-full h-24 object-cover rounded mb-2" />}
                    <div className="flex gap-2">
                      <button onClick={() => handleUpdatePracticeBanner(banner.id)} className="px-3 py-1 bg-[#020A47] text-white rounded text-xs shadow hover:bg-[#1a256b] transition">Save</button>
                      <button onClick={() => { setEditingPracticeBanner(null); setPracticeBannerPreview(null); }} className="px-3 py-1 border rounded text-xs shadow">Cancel</button>
                    </div>
                  </div>
                ) : (
                  <>
                    <img src={banner.image} alt="Practice Banner" className="w-full h-24 object-cover rounded transition group-hover:brightness-75" />
                    <div className="absolute inset-0 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition bg-black/30">
                      <button title="Edit" onClick={() => handleEditPracticeBanner(banner)} className="px-2 py-1 bg-white text-[#020A47] rounded shadow text-xs hover:bg-[#020A47] hover:text-white transition">Edit</button>
                      <button title="Delete" onClick={() => handleDeletePracticeBanner(banner.id)} className="px-2 py-1 bg-white text-red-600 rounded shadow text-xs hover:bg-red-600 hover:text-white transition">Delete</button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagePageBanner;
