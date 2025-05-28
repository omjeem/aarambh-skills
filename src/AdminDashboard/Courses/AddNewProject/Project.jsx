import React, { useEffect, useState } from 'react';
import { FaUpload, FaPlus } from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';
import { IoMdCheckmarkCircle } from "react-icons/io";
import { MdError } from "react-icons/md";
import apiService from '../../../api';
import { useNavigate } from 'react-router-dom';

const Notification = ({ message, type }) => (
  <div
    className={`fixed top-4 right-4 z-50 min-w-[300px] p-4 rounded-lg shadow-lg animate-slideIn ${type === 'success'
      ? 'bg-green-50 border-l-4 border-green-500'
      : 'bg-red-50 border-l-4 border-red-500'
      }`}
  >
    <div className="flex items-center space-x-3">
      {type === 'success' ? (
        <IoMdCheckmarkCircle className="text-2xl text-green-500" />
      ) : (
        <MdError className="text-2xl text-red-500" />
      )}
      <p className={`font-medium ${type === 'success' ? 'text-green-800' : 'text-red-800'
        }`}>
        {message}
      </p>
    </div>
  </div>
);

const Project = () => {
  const [courses, setCourses] = useState([]);

  const [selectedCourse, setSelectedCourse] = useState('');
  const [projectTitle, setProjectTitle] = useState('');
  const [projectType, setProjectType] = useState('minor');
  const [projectDescription, setProjectDescription] = useState('');
  const [projectFiles, setProjectFiles] = useState([]);
  const [notification, setNotification] = useState({ message: '', type: '', show: false });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type, show: true });
    setTimeout(() => {
      setNotification({ message: '', type: '', show: false });
    }, 3000);
  };

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    console.log("Files are ")
    setProjectFiles(prevFiles => [...prevFiles, ...files]);
  };

  const removeFile = (index) => {
    setProjectFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
  };

  useEffect(() => {
    (async () => {
      const coursesData = await apiService.course.fetchCourse()
      console.log("Coysre data ", coursesData)
      if (coursesData.status) {
        setCourses(coursesData.data)
      }
    })()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedCourse || !projectTitle || !projectDescription) {
      showNotification('Please fill all required fields', 'error');
      navigate("/admin/dashboard/manageCourse")
      return;
    }

    setLoading(true);
    const filesData = await Promise.all(
      projectFiles.map(async (proj) => {
        const formData = new FormData();
        formData.append("file", proj);
        console.log("Api hitting >> ");
        const responseData = await apiService.course.uploadVideo(formData);
        if (responseData.status) {
          return responseData.data;
        } else {
          console.log("Error in uploading >> ");
          return null;
        }
      })
    );
    const filteredFilesData = filesData.filter(Boolean);

    console.log("File data >>>> ", filesData)
    const data = {
      title: projectTitle,
      description: projectDescription,
      meta_data: {
        files: filteredFilesData,
        type: projectType
      },
      project_url: null
    }
    console.log("Data is >>>>>>>>>> ", data)
    const uploadCourse = await apiService.course.uploadProject(data, selectedCourse)
    if (uploadCourse.status) {
      showNotification('Project added successfully');
      setProjectTitle('');
      setProjectDescription('');
      setProjectFiles([]);
      setSelectedCourse('');
    } else {
      showNotification('Error adding project', 'error');
    }
    setLoading(false);

  };

  return (
    <div className="p-6  ">
      {notification.show && (
        <Notification message={notification.message} type={notification.type} />
      )}

      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-6 text-[#020A47]">Add New Project</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Course
              </label>
              <select
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#020A47] focus:border-[#020A47]"
                required
              >
                <option value="">Select a course</option>
                {courses.map(course => (
                  <option key={course.id} value={course.id}>
                    {course.title}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Project Title
              </label>
              <input
                type="text"
                value={projectTitle}
                onChange={(e) => setProjectTitle(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#020A47] focus:border-[#020A47]"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Project Type
              </label>
              <select
                value={projectType}
                onChange={(e) => setProjectType(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#020A47] focus:border-[#020A47]"
              >
                <option value="minor">Minor Project</option>
                <option value="major">Major Project</option>
              </select>
            </div>

            <div className="flex justify-center items-center">
              <label className="text-md font-medium text-gray-700">
                Upload Project Files
              </label>
              <div className="ml-4 relative">
                <input
                  type="file"
                  multiple
                  onChange={handleFileUpload}
                  className="hidden"
                  id="project-upload"
                />
                <label
                  htmlFor="project-upload"
                  className="cursor-pointer bg-[#020A47] text-white px-4 py-2 rounded-md hover:bg-[#020A47]/90 flex items-center gap-2"
                >
                  <FaUpload /> Upload Files
                </label>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Project Description
            </label>
            <textarea
              value={projectDescription}
              onChange={(e) => setProjectDescription(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#020A47] focus:border-[#020A47] h-32"
              required
            />
          </div>

          {projectFiles.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-gray-700">Uploaded Files:</h3>
              <div className="space-y-2">
                {projectFiles.map((file, index) => (
                  <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                    <span className="text-sm text-gray-600">{file.name}</span>
                    <button
                      type="button"
                      onClick={() => removeFile(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <IoMdClose />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="bg-[#020A47] text-white py-2 px-6 rounded-md hover:bg-[#020A47]/90 disabled:bg-[#020A47]/50 flex items-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Uploading...
                </>
              ) : (
                'Save Project'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Project; 