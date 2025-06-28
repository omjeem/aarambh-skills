import { useEffect, useState } from "react";
import { AiOutlineProject } from "react-icons/ai";
import { FaGraduationCap, FaUsers, FaBook, FaHeart, FaCog, FaHistory, FaUser, FaComments, FaMoneyBill, FaShoppingCart, FaCommentDots } from "react-icons/fa";
import { HiMiniDocumentCurrencyRupee } from "react-icons/hi2";
import { FaChalkboardUser } from "react-icons/fa6";
import { IoSettingsSharp } from "react-icons/io5";
import { LiaAwardSolid } from "react-icons/lia";
import { PiCertificateFill } from "react-icons/pi";
import { RiShareForwardBoxLine } from "react-icons/ri";
import { useNavigate, useLocation } from "react-router-dom";
import { IoMenu, IoClose } from "react-icons/io5";
import envConfig from "../utils/envConfig";

const Sidebar = ({ col }) => {
  const [user, setUser] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`${envConfig.backendUrl}/user/get_user`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });

        if (response.ok) {
          const data = await response.json();
          if (data.status && data.user) {
            setUser({
              id: data.user.id,
              name: data.user.username,
              email: data.user.email,
              isActive: data.user.is_active,
              dateJoined: data.user.date_joined,
              loginMethod: data.user.login_method,
              score: data.user.score
            });
          } else {
            setUser(null);
          }
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        setUser(null);
      }
    };

    fetchUserData();
  }, []);

  const handleNavigation = (path) => {
    navigate(path);
    setIsOpen(false);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button 
        onClick={() => setIsOpen(true)}
        className="lg:hidden relative top-4 mb-4 left-[85%] z-50 p-2 h-10 rounded-md bg-white shadow-md"
      >
        <IoMenu className="h-6 w-6 text-[#020A47]" />
      </button>

      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed lg:static top-0 right-0 z-50 w-64 h-full bg-white shadow-lg border-gray-50 border-[1px] rounded-l-2xl p-6 transform transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'
      }`}>
        {/* Close Button */}
        <button 
          onClick={() => setIsOpen(false)}
          className="lg:hidden absolute  top-4 right-4 p-2 rounded-md hover:bg-gray-100"
        >
          <IoClose className="h-6 w-6 text-[#020A47]" />
        </button>

        <div className="flex flex-col items-center justify-center rounded">
          <img
            src="https://images.unsplash.com/photo-1562572159-4efc207f5aff?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjJ8fG1vZGVsfGVufDB8fDB8fHww"
            alt="User"
            className="h-14 w-14 rounded-full mb-2"
          />
          {user && (
            <>
              <h3 className="text-lg font-semibold">{user.name}</h3>
              <p className="text-gray-500 text-sm">{user.email}</p>
            </>
          )}
        </div>

        {/* Navigation Menu */}
        <ul className="mt-6 space-y-2 overflow-y-auto h-[60vh] lg:h-fit scrollbar-hide">
          <li onClick={() => handleNavigation('/dashboard')} className={`flex items-center space-x-2 text-[#020A47] hover:bg-gray-100 p-2 rounded-lg cursor-pointer ${location.pathname === '/dashboard' ? col : ''}`}>
            <FaChalkboardUser />
            <span>Dashboard</span>
          </li>
          <li onClick={() => handleNavigation('/dashboard/practice')} className={`flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 cursor-pointer ${location.pathname === '/dashboard/practice' ? col : ''}`}>
            <FaBook />
            <span>Practice</span>
          </li>
          <li onClick={() => handleNavigation('/dashboard/mycourses')} className={`flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 cursor-pointer ${location.pathname === '/dashboard/mycourses' ? col : ''}`}>
            <FaUsers />
            <span>My Courses</span>
          </li>
          <li onClick={() => handleNavigation('/dashboard/projects')} className={`flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 cursor-pointer ${location.pathname === '/dashboard/projects' ? col : ''}`}>
            <AiOutlineProject className="text-xl font-semibold" />
            <span>My Projects</span>
          </li>
          <li onClick={() => handleNavigation('/dashboard/wishlist')} className={`flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 cursor-pointer ${location.pathname === '/dashboard/wishlist' ? col : ''}`}>
            <FaHeart className="text-xl font-semibold" />
            <span>Wishlist</span>
          </li>
          <li onClick={() => handleNavigation('/dashboard/certification')} className={`flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 cursor-pointer ${location.pathname === '/dashboard/certification' ? col : ''}`}>
            <PiCertificateFill className="text-xl font-semibold" />
            <span>Certification</span>
          </li>
          <li onClick={() => handleNavigation('/dashboard/award-points')} className={`flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 cursor-pointer ${location.pathname === '/dashboard/award-points' ? col : ''}`}>
            <LiaAwardSolid className="text-xl font-semibold" />
            <span>Award Points</span>
          </li>
          <li onClick={() => handleNavigation('/dashboard/purchase-history')} className={`flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 cursor-pointer ${location.pathname === '/dashboard/purchase-history' ? col : ''}`}>
            <HiMiniDocumentCurrencyRupee className="text-xl font-semibold" />
            <span>Purchase History</span>
          </li>
          <li onClick={() => handleNavigation('/dashboard/affiliate')} className={`flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 cursor-pointer ${location.pathname === '/dashboard/affiliate' ? col : ''}`}>
            <FaHistory />
            <span>Affiliate</span>
          </li>
          <li onClick={() => handleNavigation('/dashboard/setting')} className={`flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 cursor-pointer ${location.pathname === '/dashboard/setting' ? col : ''}`}>
            <IoSettingsSharp />
            <span>Setting</span>
          </li>
          <li onClick={() => handleNavigation('/dashboard/support')} className={`flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 cursor-pointer ${location.pathname === '/dashboard/support' ? col : ''}`}>
            <FaCommentDots />
            <span>Support</span>
          </li>
          <li onClick={() => {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            handleNavigation('/');
          }} className="flex items-center space-x-2 p-2 text-red-600 rounded-lg hover:bg-gray-100 cursor-pointer">
            <RiShareForwardBoxLine />
            <span>Logout</span>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;