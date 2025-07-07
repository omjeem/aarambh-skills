import React, { useState, useEffect } from "react";
import { FaArrowRight, FaLock, FaUserCircle } from "react-icons/fa";
import { FaCirclePlay } from "react-icons/fa6";
import { GiCheckMark } from "react-icons/gi";
import { ImCross } from "react-icons/im";
import { MdAccessTimeFilled } from "react-icons/md";
import { Link, useParams } from "react-router-dom";
import envConfig from "../../utils/envConfig";

function Bannertemp() {
  const [activeTab, setActiveTab] = useState("curriculum");
  const [courseData, setCourseData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { courseId } = useParams();

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const response = await fetch(`${envConfig.backendUrl}/courses/get`);
        const data = await response.json();
        
        if (data.status) {
          // Find the course that matches the ID from URL
          const matchingCourse = data.data.find(course => 
            course.id === parseInt(courseId)
          );

          if (matchingCourse) {
            setCourseData(matchingCourse);
          } else {
            setError('Course not found');
          }
        } else {
          setError('Failed to fetch course data');
        }
      } catch (err) {
        setError('Error fetching course data');
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourseData();
  }, [courseId]);

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "curriculum", label: "Curriculum" },
    { id: "review", label: "Review" },
  ];

  // Use the modules from the course data if available
  const modules = courseData?.overview?.modules?.map((module, index) => ({
    id: index + 1,
    title: module.name,
    duration: "",
    locked: index > 0, // First module is unlocked, rest are locked
    topics: module.topics
  })) || [];

  const tiers = [
    {
      title: "Course Access",
      price: "₹199",
      plan_id: 1,
      features: [
        { name: "Access Course", included: true },
        { name: "Quizzes", included: true },
        { name: "Certification", included: false },
        { name: "Mini 2 Major Projects", included: false },
        { name: "Freelance Portal", included: false },
        { name: "Placement Portal", included: false },
      ],
    },
    {
      title: "Full Access",
      price: "₹699",
      plan_id: 2,
      features: [
        { name: "Access Course", included: true },
        { name: "Quizzes", included: true },
        { name: "Certification", included: true },
        { name: "Mini 2 Major Projects", included: true },
        { name: "Freelance Portal", included: true },
        { name: "Placement Portal", included: true },
      ],
    },
  ];

  const handleAddToCart = async (planId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
      
        return;
      }

      const requestBody = {
        course_id: parseInt(courseId),
        plan_id: parseInt(planId)
      };

      

      const response = await fetch(`${envConfig.backendUrl}/cart/add_to_cart/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      });

      const responseData = await response.json();
      console.log('API Response:', responseData); // Debug log

      if (!response.ok) {
        throw new Error(responseData.message || 'Failed to add to cart');
      }

      if (responseData.status) {
        // Handle successful addition to cart
        console.log('Added to cart successfully');
        // You can add a success notification here
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      // You can add an error notification here
    }
  };

  if (loading) {
    return (
      <div className="animate-pulse">
        {/* Header skeleton */}
        <div className="relative flex flex-col gap-4 items-center py-4 mt-4 bg-gradient-to-l from-[#a3c3a481] to-[#989fd374]">
          <div className="flex w-full flex-col md:flex-row justify-around items-start py-8 px-4 md:px-10 lg:px-2 mb-8">
            <div className="w-full md:w-1/2">
              {/* Title skeleton */}
              <div className="h-10 bg-gray-300 rounded-md w-3/4 mb-4"></div>
              {/* Description skeleton */}
              <div className="h-4 bg-gray-300 rounded-md w-full mb-2"></div>
              <div className="h-4 bg-gray-300 rounded-md w-5/6 mb-2"></div>
              <div className="h-4 bg-gray-300 rounded-md w-4/6 mb-4"></div>
              
              {/* Stats skeleton */}
              <div className="flex items-center md:gap-12 mb-4 space-x-4">
                <div className="flex gap-2 items-center">
                  <div className="w-6 h-6 rounded-full bg-gray-300"></div>
                  <div className="h-4 bg-gray-300 rounded-md w-20"></div>
                </div>
                <div className="flex gap-2 items-center">
                  <div className="w-6 h-6 rounded-full bg-gray-300"></div>
                  <div className="h-4 bg-gray-300 rounded-md w-20"></div>
                </div>
              </div>
              
              {/* Language/rating skeleton */}
              <div className="flex items-center space-x-4">
                <div className="flex gap-2 items-center">
                  <div className="w-5 h-5 rounded-md bg-gray-300"></div>
                  <div className="h-4 bg-gray-300 rounded-md w-16"></div>
                </div>
                <div className="h-4 bg-gray-300 rounded-md w-24"></div>
              </div>
            </div>
            
            {/* Image skeleton */}
            <div className="relative mt-4 md:mt-0">
              <div className="w-full md:w-72 h-48 bg-gray-300 rounded-lg"></div>
            </div>
          </div>
        </div>
        
        {/* Tabs and content skeleton */}
        <div className="flex justify-between flex-col lg:flex-row gap-8 lg:gap-2 -translate-y-16 left-8 md:mx-10">
          {/* Left panel skeleton */}
          <div className="bg-white p-4 w-[98%] lg:w-[400px] xl:w-[550px] overflow-hidden rounded-lg drop-shadow-2xl">
            {/* Tabs skeleton */}
            <div className="flex border-b mb-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex-1 py-2">
                  <div className="h-6 bg-gray-300 rounded-md w-24 mx-auto"></div>
                </div>
              ))}
            </div>
            
            {/* Modules skeleton */}
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-white rounded-lg border mb-4">
                <div className="flex items-center gap-4 w-full">
                  <div className="w-8 h-8 rounded-full bg-gray-300"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-gray-300 rounded-md w-40 mb-2"></div>
                    <div className="h-3 bg-gray-300 rounded-md w-20"></div>
                  </div>
                  <div className="w-4 h-4 rounded-md bg-gray-300"></div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Right panel skeleton */}
          <div className="bg-white w-[96%] xl:w-[800px] ml-2 md:ml-0 rounded-lg overflow-hidden border-2 drop-shadow-2xl shadow-xl">
            {/* Header skeleton */}
            <div className="bg-gray-300 p-4">
              <div className="h-6 bg-gray-400 rounded-md w-32 mx-auto"></div>
            </div>
            
            {/* Tiers skeleton */}
            <div className="grid grid-cols-2 border-2">
              {[1, 2].map((tier) => (
                <div key={tier} className="p-6 border-r last:border-r-0">
                  <div className="h-6 bg-gray-300 rounded-md w-32 mx-auto mb-4"></div>
                  
                  {/* Features skeleton */}
                  {[1, 2, 3, 4, 5, 6].map((feature) => (
                    <div key={feature} className="flex items-center gap-4 py-2">
                      <div className="w-5 h-5 rounded-md bg-gray-300"></div>
                      <div className="h-4 bg-gray-300 rounded-md w-28"></div>
                    </div>
                  ))}
                  
                  {/* Button skeleton */}
                  <div className="h-12 bg-gray-300 rounded-2xl w-full mt-6"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Bottom banner skeleton */}
        <div className="md:mx-6 mb-10 md:mb-0 lg:mt-10 h-[150px] md:h-[100px] lg:h-[80px] flex flex-col lg:flex-row justify-center lg:justify-between md:items-center px-10 md:px-20 drop-shadow-2xl border rounded-md gap-2 shadow-2xl">
          <div className="h-6 bg-gray-300 rounded-md w-64"></div>
          <div className="h-12 bg-gray-300 rounded-xl w-48"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500 py-8">{error}</div>;
  }

  if (!courseData) {
    return <div className="text-center py-8">No course data available</div>;
  }

  return (
    <div className="">
      <div className="relative flex flex-col gap-4 items-center py-4 mt-4 bg-gradient-to-l from-[#a3c3a481] to-[#989fd374]">
        <div className="flex w-full flex-col md:flex-row justify-between items-start py-8 px-4 md:px-10 lg:px-2 mb-8">
          <div className="w-full  p-10">
            <h1 className="text-3xl font-bold mb-4">{courseData.title}</h1>
            <p className="mb-4 w-full md:w-[80%] xl:w-1/2 md:text-lg font-semibold">
              {courseData.description}
            </p>
            <div className="flex flex-wrap items-center md:gap-12 mb-4 space-x-4">
              <span className="flex gap-2 items-center">
                <MdAccessTimeFilled className="text-2xl" />
                {courseData.overview?.modules?.length || 0} Modules
              </span>
              <span className="flex gap-2 font-medium items-center">
                <FaUserCircle className="scale-[140%]" />
                {courseData.people_enrolled} Enrolled
              </span>
            </div>
            <div className="flex flex-wrap items-center space-x-4">
              <span className="flex md:gap-2 items-center">
                <img
                  className="h-[19px] saturate-200"
                  src="/images/Vector.png"
                  alt=""
                />
                {courseData.language}
              </span>
              <span className="text-[#F0B71A] text-xl md:text-2xl">★★★★★</span>
              <span className="text-sm md:ml-1">(2 Reviews)</span>
            </div>
          </div>
          <div className="w-full md:w-1/2 relative">
            <button className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer p-1 z-30 rounded-full flex justify-center items-center">
              <FaCirclePlay className="bg-white rounded-full justify-center items-center invert text-5xl drop-shadow-xl" />
            </button>
            <div className="w-full h-[200px] md:h-[250px] rounded-lg overflow-hidden">
              <img
                src={courseData.image}
                alt={courseData.title}
                className="w-full h-full object-contain rounded-lg shadow-lg"
                onError={(e) => {
                  e.target.src = "https://arambhskills.onrender.com/images/placeholder.jpg"
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-between flex-col lg:flex-row gap-8 lg:gap-2 -translate-y-16 left-8 md:mx-10">
        {/* Tab Navigation */}
        <div className="bg-white p-4 w-[98%] lg:w-[400px] xl:w-[550px] overflow-hidden rounded-lg drop-shadow-2xl">
          <div className="relative flex xl:gap-4 xl:px-10 border-b">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 xl:px-8 py-2 text-center font-bold transition-colors duration-300 ${
                  activeTab === tab.id
                    ? "text-black font-bold"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab.label}
              </button>
            ))}
            {/* Animated Border */}
            <div
              className="absolute xl:ml-8 w-full lg:ml-2 bottom-0 h-0.5 bg-black transition-all duration-300"
              style={{
                left: `${
                  (tabs.findIndex((tab) => tab.id === activeTab) * 100) / 3
                }%`,
                width: "28%",
              }}
            />
          </div>

          {/* Module List */}
          <div className="mt-4 flex gap-4 drop-shadow-xl flex-col">
            {modules.map((module) => (
              <div
                key={module.id}
                className="flex items-center justify-between p-4 bg-white rounded-lg border hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-20 w-full space-x-3">
                  <FaCirclePlay className="w-8 h-8 invert border-[1px] border-[#565151] rounded-full bg-white" />
                  <div>
                    <span className="font-medium">{module.title}</span>
                    {module.topics && (
                      <div className="text-sm text-gray-600 mt-1">
                        {module.topics.length} topics
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  {module.duration && (
                    <span className="text-sm">{module.duration}</span>
                  )}
                  {module.locked && <FaLock className="w-4 h-4" />}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white w-[96%] xl:w-[800px] ml-2 md:ml-0 rounded-lg overflow-hidden border-2 drop-shadow-2xl shadow-xl border-[#020A47]">
          <div className="bg-[#020A47] drop-shadow-xl text-white p-4 text-center md:text-2xl font-semibold">
            Enrollment
          </div>
          <div className="grid grid-cols-2 border-2">
            {tiers.map((tier, index) => (
              <div
                key={index}
                className="p-6 border-r border-[#000000b5] last:border-r-0"
              >
                <h3 className="text-center text-[13px] md:text-xl font-semibold mb-4">
                  {tier.title}
                </h3>
                <div className="space-y-4 w-full">
                  {tier.features.map((feature, featureIndex) => (
                    <div
                      key={featureIndex}
                      className="flex items-center gap-4 py-2"
                    >
                      {feature.included ? (
                        <GiCheckMark className="w-5 h-5 font-bold text-[#35844F]" />
                      ) : (
                        <ImCross className="w-5 h-5 text-[#A43232]" />
                      )}
                      <span className="text-[12px] md:text-lg">{feature.name}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 w-full flex justify-center items-center ">
                  <Link to={`/checkout`} 
                    onClick={() => handleAddToCart(tier.plan_id)}
                    className="w-full mt-6 bg-[#020A47] text-white py-3 px-7 text-center lg:px-24 md:text-xl rounded-lg hover:bg-[#161d4d] transition-colors"
                  >
                    Pay {tier.price}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="md:mx-6 mb-10 md:mb-0 lg:mt-10 h-[150px] md:h-[100px] lg:h-[80px] flex flex-col lg:flex-row justify-center lg:justify-between md:items-center px-10 md:px-20 drop-shadow-2xl border rounded-md gap-2 shadow-2xl">
        <h1 className="font-bold">
          Confused about which course you should go with ?
        </h1>
        <button className="flex justify-center items-center gap-4 bg-[#020A47] text-white px-6 py-3 rounded-xl">
          As Councilor <FaArrowRight />
        </button>
      </div>
    </div>
  );
}

export default Bannertemp;
