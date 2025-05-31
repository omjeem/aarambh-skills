import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { FaArrowRight, FaHeart } from "react-icons/fa";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { increment } from '../redux/cartSlice';
import { addToWishlist, removeFromWishlist } from '../redux/wishlistSlice';
import envConfig from "../../utils/envConfig";

export default function Skills({ skill }) {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hearts, setHearts] = useState([]);
  const dispatch = useDispatch();
  const location = useLocation();
  const wishlistItems = useSelector(state => state.wishlist.items);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch(`${envConfig.backendUrl}/courses/get`);
        if (!response.ok) {
          throw new Error('Failed to fetch courses');
        }
        const data = await response.json();
        if (data.status && data.data) {
          setCourses(data.data);
          setHearts(Array(data.data.length).fill(false));
        }
      } catch (err) {
        setError(err.message);
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
  
  const toggleHeart = (index) => {
    const course = courses[index];
    const updatedHearts = [...hearts];
    updatedHearts[index] = !updatedHearts[index];
    setHearts(updatedHearts);

    if (updatedHearts[index]) {
      dispatch(addToWishlist(course));
    } else {
      dispatch(removeFromWishlist(course));
    }
  };

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);

  if (loading) {
    return (
      <div className="flex flex-col justify-center w-full px-4">
        <h1 className="text-center text-[#020A47] mt-8 md:py-16 text-3xl md:text-4xl font-bold">
          {skill}
        </h1>
        <div className="container mx-auto">
          <Swiper
            slidesPerView={1.2}
            spaceBetween={20}
            breakpoints={{
              640: { slidesPerView: 1.5, spaceBetween: 20 },
              768: { slidesPerView: 2, spaceBetween: 20 },
              1024: { slidesPerView: 2.5, spaceBetween: 20 },
              1440: { slidesPerView: 3, spaceBetween: 20 },
              1500: { slidesPerView: 3.5, spaceBetween: 20 },
            }}
            className="mySwiper min-h-[50vh]"
          >
            {[1, 2, 3, 4].map((_, index) => (
              <SwiperSlide key={index} className="mb-2">
                <div className="bg-white sm:w-[380px] relative rounded-lg shadow-md hover:shadow-lg transition duration-300">
                  <div className="h-[240px] bg-gray-200 animate-pulse"></div>
                  <div className="p-4">
                    <div className="h-6 bg-gray-200 rounded w-3/4 mb-4 animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2 mb-4 animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center w-full px-4">
        <h1 className="text-center text-[#020A47] mt-8 md:py-16 text-3xl md:text-4xl font-bold">
          {skill}
        </h1>
        <div className="text-center text-red-500 p-4">
          <p>Error: {error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-4 py-2 bg-[#020A47] text-white rounded"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center w-full px-4">
      <h1 className="text-center text-[#020A47] mt-8 md:py-16 text-3xl md:text-4xl font-bold">
        {skill}
      </h1>
      <section className="w-full overflow-x-auto py-12">
        <div className="container mx-auto px-4">
          <Swiper
            slidesPerView={1}
            spaceBetween={30}
            breakpoints={{
              640: { slidesPerView: 1.5, spaceBetween: 30 },
              768: { slidesPerView: 2, spaceBetween: 30 },
              1024: { slidesPerView: 2, spaceBetween: 30 },
              1280: { slidesPerView: 3, spaceBetween: 30 },
            }}
            className="mySwiper min-h-[50vh]"
          >
            {courses.map((course, index) => (
              <SwiperSlide key={course.id} className="mb-2 px-2">
                <div className="bg-white w-full relative rounded-lg shadow-md hover:shadow-lg transition duration-300">
                 
                  <div
                    onClick={() => toggleHeart(index)}
                    className={`absolute right-2 md:right-4 top-16 md:top-5 p-2 bg-[#ffff] rounded-full cursor-pointer ${
                      hearts[index] ? "text-[#A90AA4]" : "text-gray-300"
                    }`}
                  >
                    <FaHeart />
                  </div>

                  <Link to={`/courses/${course.id}`}>
                    <div
                      className="h-[180px] md:h-[240px] bg-no-repeat bg-center bg-contain"
                      style={{ 
                        backgroundImage: `url(${course.image.startsWith('http') ? course.image : `https://arambhskills.onrender.com${course.image}`})`,
                        backgroundSize: 'contain'
                      }}
                    ></div>
                  </Link>

                  <div className="p-4">
                    <div className="flex w-full mb-4">
                      <div className="w-full">
                        <Link
                          to={`/courses/${course.id}`}
                          className="text-lg font-semibold"
                        >
                          {course.title}
                        </Link>
                      </div>
                      <div className="flex w-[100%] items-start justify-end">
                        <Link
                          to={`/courses/${course.id}`}
                        
                          className="py-2 cursor-pointer px-2 flex justify-center items-center gap-1 md:gap-2 bg-[#020A47] text-white text-[10px] md:text-sm rounded"
                        >
                          Enroll Now <FaArrowRight />
                        </Link>
                      </div>
                    </div>

                    <div className="flex items-center mb-4">
                      <span className="ml-1 text-[#000000]">
                        {course.people_enrolled} Enrolled
                      </span>
                    </div>

                    <p className="text-[#000000] text-sm">
                      {course.description}
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
    </div>
  );
}
