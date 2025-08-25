import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { BookOpen, Clock, HelpCircle } from "lucide-react";
import { FaCirclePlay, FaLock } from "react-icons/fa6";
import { RiTimeFill } from "react-icons/ri";
import { FaExclamationCircle } from "react-icons/fa";
import Nav from '../Nav';
import Bannertemp from '../../components/AboutPage/Bannertemp';
import Sidebar from '../Sidebar';
import CertificateSection from './Details-content/CertificateSection';
import ForumSection from './Details-content/ForumSection';
import QuizSection from './Details-content/QuizSection';

// Simulated API data
const DUMMY_COURSES = [
  {
    id: 1,
    title: "Web Development Bootcamp 2024",
    description: "Master the art of web development with our comprehensive course. Learn HTML, CSS, JavaScript, and modern frameworks to build responsive and dynamic websites.",
    lectures: 45,
    duration: "42:15:00 Hours",
    quizzes: 12,
    progress: 43,
    status: "in-progress",
    image: "/images/WebDevelopment1.png",
    instructor: "John Smith",
    rating: 4.8,
    totalStudents: 1234,
    lastUpdated: "2024-03-15",
    price: "$99.99",
    level: "Intermediate",
    syllabus: [
      {
        title: "HTML5 & Modern CSS Techniques",
        duration: "8:15:00",
        completed: true
      },
      {
        title: "JavaScript ES6+ & DOM Manipulation",
        duration: "10:30:00",
        completed: true
      },
      {
        title: "React.js & State Management",
        duration: "12:45:00",
        completed: false
      },
      {
        title: "Backend Integration with Node.js",
        duration: "10:45:00",
        completed: false
      }
    ]
  },
  {
    id: 2,
    title: "Creative Suite Pro Masterclass",
    description: "Unlock your creative potential with Adobe Creative Suite. Master Photoshop, Illustrator, and other essential design tools for professional-grade content creation.",
    lectures: 38,
    duration: "35:10:00 Hours",
    quizzes: 8,
    progress: 92,
    status: "in-progress",
    image: "/images/creative.png",
    instructor: "Sarah Johnson",
    rating: 4.9,
    totalStudents: 856,
    lastUpdated: "2024-03-10",
    price: "$129.99",
    level: "Advanced",
    syllabus: [
      {
        title: "Adobe Suite Fundamentals",
        duration: "6:30:00",
        completed: true
      },
      {
        title: "Advanced Photoshop Techniques",
        duration: "9:00:00",
        completed: true
      },
      {
        title: "Illustrator Vector Mastery",
        duration: "8:45:00",
        completed: true
      },
      {
        title: "Professional Design Portfolio",
        duration: "10:55:00",
        completed: false
      }
    ]
  },
  {
    id: 3,
    title: "Python Programming Mastery 2024",
    description: "Dive into Python programming from basics to advanced concepts. Learn data structures, algorithms, and practical applications in machine learning and data science.",
    lectures: 52,
    duration: "48:30:00 Hours",
    quizzes: 15,
    progress: 100,
    status: "completed",
    image: "/images/pythonimg.png",
    instructor: "Michael Chen",
    rating: 4.7,
    totalStudents: 2156,
    lastUpdated: "2024-03-01",
    price: "$149.99",
    level: "All Levels",
    syllabus: [
      {
        title: "Python Fundamentals & OOP",
        duration: "12:00:00",
        completed: true
      },
      {
        title: "Data Structures & Algorithms",
        duration: "14:30:00",
        completed: true
      },
      {
        title: "Machine Learning Basics",
        duration: "12:45:00",
        completed: true
      },
      {
        title: "Real-world Projects",
        duration: "9:15:00",
        completed: true
      }
    ]
  }
];
const modules = [
  { id: 1, title: "HTML", duration: "05:12", locked: false },
  { id: 2, title: "CSS5", duration: "", locked: true },
  { id: 3, title: "Quiz -1", duration: "", locked: true },
  { id: 4, title: "Mini Project", duration: "", locked: true },
  { id: 5, title: "JavaScrpit", duration: "", locked: true },
  { id: 6, title: "Quiz - 2", duration: "", locked: true },
  { id: 7, title: "HTML", duration: "", locked: true },
  { id: 8, title: "CSS5", duration: "", locked: true },
  { id: 9, title: "Quiz -1", duration: "", locked: true },
  { id: 10, title: "Mini Project", duration: "", locked: true },
  { id: 11, title: "JavaScrpit", duration: "", locked: true },
  { id: 12, title: "Quiz - 2", duration: "", locked: true },
];

const CourseDetailsSkeleton = () => {
  return (
    <div>
    
      <div className='my-4 flex justify-evenly flex-col lg:flex-row items-center'>
        {/* Video Section Skeleton */}
        <div className="flex justify-center items-center mb-6">
          <div className="relative md:w-[680px] md:h-[400px] lg:w-[600px] lg:h-[350px] xl:w-[900px] xl:h-[500px] px-1">
            <div className="w-full h-full rounded-lg bg-gray-200 animate-pulse"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="w-16 h-16 bg-gray-300 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Module List Skeleton */}
        <div className="mt-4 flex h-[560px] bg-white border-[1px] border-gray-100 p-4 drop-shadow-xl rounded-lg flex-col">
          <div className="w-48 h-6 bg-gray-200 rounded animate-pulse mx-auto mb-4"></div>
          <div className="overflow-y-auto flex-1 pr-2 space-y-4 scrollbar">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((index) => (
              <div key={index} className="flex w-[90vw] lg:w-[350px] xl:w-[28vw] items-center justify-between p-4 bg-white rounded-lg border drop-shadow-xl">
                <div className="flex items-center gap-20 w-full space-x-3">
                  <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
                  <div className="w-24 h-4 bg-gray-200 rounded animate-pulse"></div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-4 bg-gray-200 rounded animate-pulse"></div>
                  <div className="w-4 h-4 bg-gray-200 rounded animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Sections Skeleton */}
      <div className="flex gap-4 md:px-16 py-5 flex-col md:flex-row">
        {/* Quiz Section Skeleton */}
        <div className="bg-white p-6 rounded-xl w-full md:w-1/3 border-[1px] border-gray-50 shadow-lg">
          <div className="w-32 h-6 bg-gray-200 rounded animate-pulse mb-4"></div>
          <div className="space-y-4">
            {[1, 2, 3].map((index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="w-24 h-4 bg-gray-200 rounded animate-pulse"></div>
                <div className="w-16 h-4 bg-gray-200 rounded animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Forum Section Skeleton */}
        <div className="bg-white p-6 rounded-xl w-full md:w-1/3 border-[1px] border-gray-50 shadow-lg">
          <div className="w-32 h-6 bg-gray-200 rounded animate-pulse mb-4"></div>
          <div className="space-y-4">
            {[1, 2, 3].map((index) => (
              <div key={index} className="border-b pb-4">
                <div className="w-full h-4 bg-gray-200 rounded animate-pulse mb-2"></div>
                <div className="w-3/4 h-4 bg-gray-200 rounded animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Certificate Section Skeleton */}
        <div className="bg-white p-6 rounded-xl w-full md:w-1/3 border-[1px] border-gray-50 shadow-lg">
          <div className="w-32 h-6 bg-gray-200 rounded animate-pulse mb-4"></div>
          <div className="flex flex-col items-center space-y-4">
            <div className="w-32 h-32 bg-gray-200 rounded-full animate-pulse"></div>
            <div className="w-48 h-4 bg-gray-200 rounded animate-pulse"></div>
            <div className="w-36 h-8 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function CourseDetails() {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        setLoading(true);
        setError(null);

        const selectedCourse = DUMMY_COURSES.find(c => c.id === parseInt(courseId));

        if (!selectedCourse) {
          throw new Error('Course not found');
        }

        setCourse(selectedCourse);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourseDetails();
  }, [courseId]);

  if (loading) {
    return <CourseDetailsSkeleton />;
  }

  if (error) {
    return (
      <div>
        <Nav />
        <Bannertemp value={"Course Details"} />
        <div className="flex flex-col justify-center items-center min-h-[60vh]">
          <div className="text-red-500 text-xl mb-4">⚠️ {error}</div>
          <p className="text-gray-600">Please try again later or contact support.</p>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div>
        <Nav />
        <Bannertemp value={"Course Details"} />
        <div className="flex flex-col justify-center items-center min-h-[60vh]">
          <div className="text-xl text-[#020A47] mb-4">Course not found</div>
          <p className="text-gray-600">The requested course could not be found.</p>
        </div>
       
      </div>
    );
  }

  return (
    <div className=' '>
      
      <div className='my-4 flex justify-evenly flex-col lg:flex-row items-center'>
        {/* Video Section */}
        <div className="flex justify-center items-center mb-6">
          <div className="relative md:w-[680px] md:h-[400px] lg:w-[600px] lg:h-[350px] xl:w-[900px] xl:h-[500px] px-1">
            <video
              ref={videoRef}
              src="/videos/2278095-hd_1920_1080_30fps.mp4"
              className="w-full h-full rounded-lg object-cover"
              poster={course.image}
              controls
              controlsList="nodownload"
              onEnded={() => setIsPlaying(false)}
            
            />
            {!isPlaying && (
              <button
                onClick={togglePlayPause}
                className="absolute top-1/2 bg-black rounded-full left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10"
              >
                <FaCirclePlay className="text-white text-6xl hover:text-gray-200 transition-colors" />
              </button>
            )}
          </div>
        </div>
        {/* Module List */}
        <div className="mt-4 flex h-[560px] bg-white border-[1px] border-gray-100 p-4 drop-shadow-xl rounded-lg flex-col">
          <h1 className='text-center text-[#020A47] text-lg font-bold mb-4'>Course Content</h1>
          <div className="overflow-y-auto flex-1 pr-2 space-y-4 scrollbar">
            {modules.map((module) => (
              <div
                key={module.id}
                className="flex w-[90vw] lg:w-[350px] xl:w-[28vw] items-center justify-between p-4 bg-white rounded-lg border drop-shadow-xl hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-20 w-full space-x-3">
                  <FaCirclePlay className="w-8 h-8 invert border-[1px] border-[#565151] rounded-full bg-white" />
                  <span className="">{module.title}</span>
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
      </div>
      <div className="flex gap-4 md:px-16 py-5 flex-col md:flex-row">
        <QuizSection />     
        <ForumSection />       
        <CertificateSection />
      </div>
      <style>
        {`
          .scrollbar::-webkit-scrollbar {
            width: 6px;
          }
          .scrollbar::-webkit-scrollbar-track {
            background: #f1f1f1;
            border-radius: 10px;
          }
          .scrollbar::-webkit-scrollbar-thumb {
            background: #020A47;
            border-radius: 10px;
          }
          .scrollbar::-webkit-scrollbar-thumb:hover {
            background: #1a237e;
          }
        `}
      </style>
    </div>
  );
} 