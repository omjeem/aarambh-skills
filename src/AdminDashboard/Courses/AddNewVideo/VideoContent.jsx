import React, { useEffect, useState } from 'react';
import { GoPlus } from 'react-icons/go';
import { FaUpload } from 'react-icons/fa';
import apiService from '../../../api';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const VideoContent = () => {
  const [selectedCourse, setSelectedCourse] = useState('');
  const [videos, setVideos] = useState([{ title: '', description: '', video_url: "" }]);
  const [courses, setCourses] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const handleCourseChange = (e) => {
    setSelectedCourse(e.target.value);
  };


  useEffect(() => {
    (async () => {
      const response = await apiService.course.fetchCourse()
      if (response.status) setCourses(response.data)
      else toast.error(response.error)
    })()
  }, [])


  const handleVideoChange = async (index, field, value) => {
    console.log("Index is ", index)
    console.log("Field is ", field)
    console.log("Value is ", value)
    let dataValue = value
    if (field === "video_url") {
      console.log("Hit >>>>>>>>>>>>>>>>>>> ", value)
      const formData = new FormData()
      formData.append("file", value)
      setIsLoading(true)
      const response = await apiService.course.uploadVideo(formData)
      if (response.status) {
        dataValue = response.data
      } else {
        toast.error(response.error)
        return;
      }
      setIsLoading(false)
    }

    const newVideos = [...videos];
    newVideos[index][field] = dataValue;
    setVideos(newVideos);
  };
  console.log("Selected ", selectedCourse)

  const handleAddVideo = () => {
    setVideos([...videos, { title: '', description: '', video_url: null }]);
  };

  const handleRemoveVideo = (index) => {
    setVideos(videos.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    // Implement submit functionality
    const response = await apiService.course.uploadVideoWithTitleAndDes(videos, selectedCourse)
    if (response.status) {
      toast.success("Succes")
    } else {
      toast.error(response.error)
    }
    console.log('Submitting videos:', videos);
    navigate("/admin/dashboard/manageCourse")
  };
  console.log("is loading , ", isLoading)
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#020A47] mb-2">Add New Videos</h1>
        <p className="text-gray-600">Select a course and upload videos</p>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div >
            <select
              value={selectedCourse}
              onChange={handleCourseChange}
              className="w-full px-4 py-2   border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#020A47]/20 focus:border-[#020A47]"
            >
              <option value="">Select a course</option>
              {/* Add course options dynamically */}
              {
                courses.map((co, index) => {
                  {
                    return <option key={index} value={co.id}>{co.title}</option>
                  }
                })
              }
              {/* <option value="course1">Course 1</option>
              <option value="course2">Course 2</option> */}
            </select>
          </div>
        </div>
      </div>

      {videos.map((video, index) => (
        <div key={index} className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Video Title</label>
            <input
              type="text"
              value={video.title}
              onChange={(e) => handleVideoChange(index, 'title', e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#020A47]/20 focus:border-[#020A47]"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea
              value={video.description}
              onChange={(e) => handleVideoChange(index, 'description', e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#020A47]/20 focus:border-[#020A47]"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Upload Video</label>
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  {
                    !isLoading ? (
                      <>
                        <FaUpload className="w-8 h-8 mb-4 text-gray-500" />
                        <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                        <p className="text-xs text-gray-500">MP4, AVI, MOV</p>
                      </>
                    ) : <div>Uploading</div>
                  }
                  {
                    video.video_url && (
                      <div>{video.video_url}</div>
                    )
                  }
                </div>
                <input
                  type="file"
                  onChange={(e) => handleVideoChange(index, 'video_url', e.target.files[0])}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {videos.length > 1 && (
            <button
              onClick={() => handleRemoveVideo(index)}
              className="flex items-center gap-2 px-4 py-2 bg-[#020a47d3] hover:bg-[#020A47] text-white rounded-lg  shadow-md"
            >
              Remove Video
            </button>
          )}
        </div>
      ))}

      <div className="flex justify-between items-center">
        <button
          onClick={handleAddVideo}
          className="flex items-center gap-2 px-4 py-2 bg-[#020A47] text-white rounded-lg hover:bg-[#020A47]/90 transition-colors duration-200"
        >
          <GoPlus className="text-xl" /> Add Another Video
        </button>
        <button
          onClick={handleSubmit}
          className="flex items-center gap-2 px-4 py-2 bg-[#020A47] text-white rounded-lg hover:bg-[#020A47]/90 transition-colors duration-200"
        >
          Submit Videos
        </button>
      </div>
    </div>
  );
};

export default VideoContent;
