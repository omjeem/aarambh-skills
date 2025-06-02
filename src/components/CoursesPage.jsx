import React, { useState, useEffect } from "react";
import { CgMenuGridO } from "react-icons/cg";
import { FaArrowRight, FaHeart } from "react-icons/fa";
import { FaCirclePlay } from "react-icons/fa6";
import { IoSearch } from "react-icons/io5";
import { IoMdCheckmarkCircle } from "react-icons/io";
import { MdError } from "react-icons/md";
import Nav from "./Common/Nav";
import Bannertemp from "./CoursePage/Bannertemp";
import Slider from "./CoursePage/Slider";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { increment } from './redux/cartSlice';
import { addToWishlist, removeFromWishlist } from './redux/wishlistSlice';
import envConfig from "../utils/envConfig";

const Notification = ({ message, type }) => (
  <div
    className={`fixed top-4 right-4 z-50 min-w-[300px] p-4 rounded-lg shadow-lg animate-slideIn ${
      type === 'success' 
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
      <p className={`font-medium ${
        type === 'success' ? 'text-green-800' : 'text-red-800'
      }`}>
        {message}
      </p>
    </div>
  </div>
);

function CoursesPage() {
  const [courses, setCourses] = useState([]);
  const [hearts, setHearts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [visibleCount, setVisibleCount] = useState(8);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState({ message: '', type: '', show: false });
  const dispatch = useDispatch();
  const wishlistItems = useSelector(state => state.wishlist.items);

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type, show: true });
    setTimeout(() => {
      setNotification({ message: '', type: '', show: false });
    }, 3000);
  };

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch(`${envConfig.backendUrl}/courses/get`);
        const data = await response.json();
        
        if (data.status) {
          const coursesWithValidIds = data.data.map(course => ({
            ...course,
            _id: course._id || course.id 
          }));
          setCourses(coursesWithValidIds);
          setHearts(Array(coursesWithValidIds.length).fill(false));
        } else {
          showNotification(data.message || 'Failed to fetch courses', 'error');
        }
      } catch (err) {
        showNotification('Error fetching courses', 'error');
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  useEffect(() => {
    const initialHearts = courses.map(course => 
      wishlistItems.some(item => item.id === course.id)
    );
    setHearts(initialHearts);
  }, [wishlistItems, courses]);

  const toggleHeart = async (index) => {
    const course = courses[index];
    const token = localStorage.getItem('token');

    if (!token) {
      showNotification('Please login to like courses', 'error');
      return;
    }

    const courseId = course._id || course.id;
    
    if (!courseId) {
      showNotification('Unable to process this course', 'error');
      return;
    }

    try {
      const response = await fetch(`${envConfig.backendUrl}/courses/like/${courseId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });

      if (!response.ok) {
        if (response.status === 401) {
          showNotification('Please login again to continue', 'error');
          return;
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.status) {
        const updatedHearts = [...hearts];
        updatedHearts[index] = !updatedHearts[index];
        setHearts(updatedHearts);
        
        if (updatedHearts[index]) {
          dispatch(addToWishlist(course));
          showNotification('Course added to wishlist successfully');
        } else {
          dispatch(removeFromWishlist(course));
          showNotification('Course removed from wishlist successfully');
        }
      } else {
        throw new Error(data.message || 'Failed to toggle like status');
      }
    } catch (error) {
      showNotification(error.message || 'Failed to update like status', 'error');
    }
  };

  const filteredCourses = courses.filter((course) =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleShowMore = () => {
    setLoading(true);
    setTimeout(() => {
      setVisibleCount((prevCount) => prevCount + 4);
      setLoading(false);
    }, 1000);
  };

  const location = useLocation();
  const isCoursePage = location.pathname === "/courses";

  return (
    <>
      <Nav cours={isCoursePage ? "#020A47" : "#0000"} />
      {notification.show && (
        <Notification message={notification.message} type={notification.type} />
      )}
      <Bannertemp />
      <div className="min-h-screen py-4">
        <div className="flex justify-start items-center pl-2 md:px-6 py-6 gap-4">
          <CgMenuGridO className="border-2 text-4xl border-[#000] rounded-lg" />
          <div className="relative md:w-full max-w-md">
            <input
              placeholder="Search"
              type="text"
              className="pl-4 pr-10 w-[70] h-10 border-[#000] border-[1px] rounded-md"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <IoSearch className="absolute top-2 right-[5%] md:right-[45%] text-2xl text-gray-500" />
          </div>
        </div>

        <div className="flex flex-wrap items-start justify-center gap-6 mx-auto px-6 py-5">
          {loading ? (
            Array.from({ length: 8 }).map((_, index) => (
              <div
                key={index}
                className="bg-white sm:w-[45%] lg:w-[35%] xl:w-[30%] 2xl:w-[22%] animate-pulse relative rounded-lg shadow-md hover:shadow-xl transition duration-300"
              >
                <div className="bg-gray-300 h-52 2xl:h-60 w-full rounded-md mb-4"></div>
                <div className="h-10 2xl:h-16 bg-gray-300 rounded-md mb-2"></div>
                <div className="h-6 2xl:h-10 bg-gray-300 rounded-md mb-2"></div>
                <div className="h-10 2xl:h-16 bg-gray-300 rounded-md mb-2"></div>
              </div>
            ))
          ) : filteredCourses.length > 0 ? (
            filteredCourses.slice(0, visibleCount).map((course, index) => (
              <div
                key={course.id}
                className="bg-white sm:w-[400px] relative rounded-lg shadow-md hover:shadow-xl transition duration-300"
              >
                <div className="relative">
                  <Link to={`/courses/${course.id}`}>
                    <div
                      className="h-[180px] md:h-[240px] bg-no-repeat bg-center bg-contain"
                      style={{ 
                        backgroundImage: `url(${course.image.startsWith('http') ? course.image : `https://arambhskills-1zuo.onrender.com${course.image}`})`,
                        backgroundSize: 'contain'
                      }}
                    ></div>
                  </Link>
                  <button className="absolute end-1 -bottom-3 cursor-pointer p-1 z-30 rounded-full flex justify-center items-center">
                    <FaCirclePlay className="bg-white rounded-full justify-center items-center invert text-5xl drop-shadow-xl" />
                  </button>
                  <div
                    onClick={() => toggleHeart(index)}
                    className={`absolute top-6 md:top-3 right-4 text-xl bg-white p-2 rounded-full cursor-pointer ${
                      hearts[index] ? "text-[#A90AA4]" : "text-pink-200"
                    }`}
                  >
                    <FaHeart />
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex w-full mb-4">
                    <div className="w-full">
                      <Link to={`/courses/${course.id}`} className="text-lg font-semibold">{course.title}</Link>
                    </div>
                    <div className="flex w-[70%] items-start justify-end">
                      <Link
                       to={`/courses/${course.id}`}
                        className="py-2 px-2 flex justify-center items-center gap-2 bg-[#020A47] text-white text-[12px] md:text-sm rounded"
                       
                      >
                        Enroll Now <FaArrowRight />
                      </Link>
                    </div>
                  </div>

                  <div className="flex items-center mb-4">
                    <span className="ml-1 font-semibold text-[#000000]">
                      {course.people_enrolled} Enrolled
                    </span>
                    <span className="ml-1 text-[#000000]">
                      ({course.language})
                    </span>
                  </div>

                  <p className="text-[#000000]">{course.description}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center h-[10vh] flex justify-center items-end text-gray-600 text-xl">
              No results found for "{searchTerm}"
            </div>
          )}
        </div>

        {!loading && visibleCount < filteredCourses.length && (
          <div className="flex justify-center items-center py-4 gap-4">
            <button
              onClick={handleShowMore}
              className="bg-[#020A47] flex justify-center items-center gap-4 text-[#ffff] px-8 py-2 rounded-3xl"
              disabled={loading}
            >
              Show More <FaArrowRight />
            </button>
          </div>
        )}
      </div>
      <div className="w-full items-center justify-center flex">
        <Slider />
      </div>
    </>
  );
}

export default CoursesPage;