import React, { useState, useEffect } from "react";
import { GoPlus } from "react-icons/go";
import { RiDeleteBin5Line } from "react-icons/ri";
import { FaSliders } from "react-icons/fa6";
import axios from "axios";
import envConfig from "../../utils/envConfig";
import { authToken } from "../../utils/constants";
import toast from "react-hot-toast";

const Category = [
  {
    title: "Web Development",
    count: 5,
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500&auto=format&fit=crop&q=60",
    skills: [
      "HTML",
      "CSS",
      "JavaScript",
      "React",
      "Node.js"
    ]
  },
  {
    title: "Graphics Design",
    count: 4,
    image: "https://images.unsplash.com/photo-1626785774625-ddcddc3445e9?w=500&auto=format&fit=crop&q=60",
    skills: [
      "Photoshop",
      "Adobe Illustrator",
      "Drawing",
      "Logo Design",
      " Digital Art",]
  },
  {
    title: "User Experience",
    count: 6,
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=500&auto=format&fit=crop&q=60",
    skills: [
      "User Experience Design",
      "Mobile App Design",
      "User Interface",
      "Design Thinking",
      "Figma",
      "Prototyping"
    ]
  },
 
  {
    title: "Iterior DeInsign",
    count: 5,
    image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=500&auto=format&fit=crop&q=60",
    skills: [
      "Interior Design",
      "Lighting Design",
      "Sketch Up",
      "Home Improvement",
      " 3D Lighting",]
  },
  {
    title: "3D and Animation",
    count: 6,
    image: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=500&auto=format&fit=crop&q=60",
    skills: [
      "Blender",
      "Motion Graphics",
      "After Effects",
      "Maya",
      "ZBrush",
      "Character Modeling"
    ]
  },
  {
    title: "Fashion",
    count: 4,
    image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=500&auto=format&fit=crop&q=60",
    skills: ["Fashion Design", "Sewing", "T-shirt Design", "Jewelry Design"]
  },
  {
    title: "Yoga",
    count: 3,
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500&auto=format&fit=crop&q=60",
    skills: ["Vinyasa Yoga", "Restorative Yoga", "Tantra"]
  },
  {
    title: "Music",
    count: 2,
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=500&auto=format&fit=crop&q=60",
    skills: ["Learning Guitar", "Basic Piano"]
  },
];

const CategoryCard = ({
  thumbnail, name, keyword, description, count = 0, onAdd, onDelete }) => {
  const skills = keyword.split(",")
  return (
    <div className="relative rounded-xl overflow-hidden shadow-lg bg-white w-full max-w-sm h-[500px] group hover:shadow-xl transition-all duration-300">
      <div className="relative h-48 overflow-hidden">
        <img
          src={thumbnail}
          alt={name}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <span className="text-2xl">🖥️</span>
            {name}
          </h2>
          <span className="mt-2 inline-block px-3 py-1 bg-white/20 text-white rounded-full text-sm font-medium backdrop-blur-sm">
            {count} Courses
          </span>
        </div>
      </div>

      <div className="p-6">
        <div className="mb-4">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Description</h3>
          <span className="flex items-center gap-2 text-gray-600">{description}</span>
        </div>
        <div className="mb-4">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Skills Included</h3>
          <ul className="space-y-2">
            {skills.map((skill, index) => (
              <li key={index} className="flex items-center gap-2 text-gray-600">
                <span className="text-[#020A47]">•</span>
                <span className="text-sm">{skill}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100">
        <div className="flex justify-center gap-4">
          <button
            // onClick={onAdd}
            className="flex items-center gap-2 px-4 py-2 text-[#020A47] hover:bg-[#020A47]/5 rounded-lg transition-colors duration-200"
          >
            <GoPlus className="text-xl" />
            <span className="font-medium">Edit</span>
          </button>
          <button
            onClick={onDelete}
            className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
          >
            <RiDeleteBin5Line className="text-lg" />
            <span className="font-medium">Delete</span>
          </button>
        </div>
      </div>
    </div>
  );
};

const AddCategoryForm = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: "",
    icon: "",
    keyword: "",
    description: "",
    thumbnail: null,
    logo: null
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.description === "" || formData.icon === "" || formData.keyword === "" || formData.description === "" || !formData || !formData.logo) {
      alert("Please fill all the fields")
      return;
    }
    const form = new FormData()

    form.append("name", formData.name)
    form.append("icon", formData.icon)
    form.append("description", formData.description)
    form.append("keyword", formData.keyword)
    form.append("thumbnail_file", formData.thumbnail)
    form.append("logo_file", formData.logo)

    try {
      const response = await axios.post(`${envConfig.backendUrl}/courses/admin/create_category`, form, {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      })
      const responseData = response.data.data
      onSubmit(responseData);
      console.log("Response data is ", responseData)
    } catch (error) {
      console.log("Error while Creating category ", error)
      alert("Failed to create category")
    }

  };

  return (
    <form onSubmit={handleSubmit} className="w-full lg:w-[50vw] h-full  bg-white rounded-xl shadow-xl overflow-hidden">
      <div className="p-6 bg-[#020A47] text-white">
        <h2 className="text-xl font-bold">Add New Category</h2>
        <p className="text-sm text-white/80 mt-1">Fill in the details to create a new category</p>
      </div>

      <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Category Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter category name"
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#020A47]/20 focus:border-[#020A47] transition-colors duration-200"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Icon</label>
          <input
            type="text"
            name="icon"
            value={formData.icon}
            onChange={handleChange}
            placeholder="Pick an icon"
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#020A47]/20 focus:border-[#020A47] transition-colors duration-200"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">keyword</label>
          <input
            type="text"
            name="keyword"
            value={formData.keyword}
            onChange={handleChange}
            placeholder="Enter keyword (comma separated)"
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#020A47]/20 focus:border-[#020A47] transition-colors duration-200"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter category description"
            rows="3"
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#020A47]/20 focus:border-[#020A47] transition-colors duration-200 resize-none"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Thumbnail</label>
          <div className="flex items-center justify-center w-full">
            <label className="flex flex-col items-center justify-center w-full  border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors duration-200">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg className="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                </svg>
                <p className="mb-2 text-sm text-gray-500">Click to upload or drag and drop</p>
                <p className="text-xs text-gray-500">PNG, JPG or GIF (MAX. 800x400px)</p>
                {formData.thumbnail && (
                  <div className="mt-2">
                    <img
                      src={URL.createObjectURL(formData.thumbnail)}
                      alt="Thumbnail Preview"
                      className="h-8 object-contain rounded-lg border"
                    />
                  </div>
                )}
              </div>
              <input
                type="file"
                name="thumbnail"
                onChange={handleChange}
                className="hidden"
              />
            </label>
          </div>

        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Logo</label>
          <div className="flex items-center justify-center w-full">
            <label className="flex flex-col items-center justify-center w-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors duration-200">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg className="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                </svg>
                <p className="mb-2 text-sm text-gray-500">Click to upload or drag and drop</p>
                <p className="text-xs text-gray-500">PNG, JPG or GIF (MAX. 800x400px)</p>
                {formData.logo && (
                  <div className="mt-2">
                    <img
                      src={URL.createObjectURL(formData.logo)}
                      alt="Thumbnail Preview"
                      className="h-8 object-contain rounded-lg border"
                    />
                  </div>
                )}
              </div>
              <input
                type="file"
                name="logo"
                onChange={handleChange}
                className="hidden"
              />
            </label>
          </div>
        </div>
      </div>

      <div className="p-6 bg-gray-50 border-t border-gray-100 flex justify-end gap-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-2.5 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-6 py-2.5 bg-[#020A47] text-white rounded-lg hover:bg-[#020A47]/90 transition-colors duration-200"
        >
          Create Category
        </button>
      </div>
    </form>
  );
};

const CategoryCardSkeleton = () => {
  return (
    <div className="relative rounded-xl overflow-hidden shadow-lg bg-white w-full max-w-sm h-[500px] animate-pulse">
      {/* Image Skeleton */}
      <div className="relative h-48 bg-gray-300">
        <div className="absolute bottom-4 left-4 right-4">
          <div className="h-6 w-32 bg-gray-400 rounded mb-2"></div>
          <div className="h-6 w-24 bg-gray-400 rounded-full"></div>
        </div>
      </div>

      {/* Content Skeleton */}
      <div className="p-6">
        <div className="mb-4">
          <div className="h-4 w-24 bg-gray-300 rounded mb-2"></div>
          <div className="h-4 w-full bg-gray-300 rounded"></div>
        </div>
        <div className="mb-4">
          <div className="h-4 w-32 bg-gray-300 rounded mb-2"></div>
          <div className="space-y-2">
            {[1, 2, 3].map((index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="h-3 w-3 bg-gray-300 rounded-full"></div>
                <div className="h-4 w-24 bg-gray-300 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Skeleton */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100">
        <div className="flex justify-center gap-4">
          <div className="h-10 w-24 bg-gray-300 rounded"></div>
          <div className="h-10 w-24 bg-gray-300 rounded"></div>
        </div>
      </div>
    </div>
  );
};

const CategoryListSkeleton = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Skeleton */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 bg-gray-300 rounded"></div>
            <div className="h-8 w-48 bg-gray-300 rounded"></div>
          </div>
          <div className="h-10 w-40 bg-gray-300 rounded"></div>
        </div>

        {/* Cards Grid Skeleton */}
        <div className="flex flex-wrap justify-center sm:justify-start gap-6">
          {[1, 2, 3, 4].map((index) => (
            <div key={index} className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] xl:w-[calc(25%-18px)]">
              <CategoryCardSkeleton />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const Addcategory = (newCategory) => {
    setCategories([...categories, { ...newCategory, count: 0, skills: [] }]);
    setIsFormOpen(false);
  };

  useEffect(() => {
    const fetchCatagories = async () => {
      try {
        const response = await axios.get(`${envConfig.backendUrl}/courses/admin/get_category`, {
          headers: {
            Authorization: `Bearer ${authToken}`
          }
        })
        const responseData = response.data.data
        setCategories(responseData)
      } catch (error) {
        console.log("Error while fetching categories", error)
        toast.error("Failed to fetch categories")
      } finally {
        setLoading(false)
      }
    }
    fetchCatagories()
  }, [])

  if (loading) {
    return <CategoryListSkeleton />;
  }

  const Deletecategory = async (index) => {
    const upd = categories[index]?.id
    if (!upd) {
      toast.error("Please select a category to delete")
      return
    }
    try {
      const response = await axios.patch(`${envConfig.backendUrl}/courses/admin/delete_category/${upd}`, {}, {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      })
      const responseData = response.data
      if (responseData.status) {
        const upd = categories.filter((_, i) => i !== index);
        setCategories(upd)
        toast.success("Category deleted successfully")
      } else {
        toast.error(responseData.message)
      }
    } catch (error) {
      console.log("Error while deleting category", error)
      toast.error("Failed to delete category")
    }
  };

  return (
    <div className={`min-h-screen bg-gray-50 ${isFormOpen ? 'backdrop-blur-sm' : ''}`}>
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div className="flex items-center gap-3">
            <FaSliders className="text-2xl text-[#020A47]" />
            <h1 className="text-2xl font-bold text-gray-800">
              All Categories
              <span className="ml-2 text-gray-500">({categories.length})</span>
            </h1>
          </div>
          <button
            onClick={() => setIsFormOpen(true)}
            className="flex items-center gap-2 px-6 py-2.5 bg-[#020A47] text-white rounded-lg hover:bg-[#020A47]/90 transition-colors duration-200"
          >
            <GoPlus className="text-xl" />
            <span className="font-medium">Add New Category</span>
          </button>
        </div>

        {isFormOpen && (
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="relative w-full flex justify-center items-center mx-4">
              <button
                onClick={() => setIsFormOpen(false)}
                className="absolute top-1 right-80 text-white hover:text-gray-200 transition-colors duration-200"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <AddCategoryForm
                onSubmit={Addcategory}
                onCancel={() => setIsFormOpen(false)}
              />
            </div>
          </div>
        )}

        <div className="flex flex-wrap justify-center sm:justify-start gap-6">
          {categories.map((category, index) => (
            <div key={index} className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] xl:w-[calc(25%-18px)]">
              <CategoryCard
                {...category}
                count={categories.count}
                onAdd={() => setIsFormOpen(true)}
                onDelete={() => Deletecategory(index)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryList;