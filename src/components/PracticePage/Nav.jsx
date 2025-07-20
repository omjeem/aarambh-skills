import React, { useState, useEffect } from 'react';
import { FaBook, FaCommentDots, FaUserCircle } from 'react-icons/fa';
import { IoIosSearch } from 'react-icons/io';
import { IoSettingsSharp, IoTriangle } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { FaChalkboardUser } from "react-icons/fa6";
import { RiShareForwardBoxLine } from "react-icons/ri";
import envConfig from '../../utils/envConfig';

const Nav = ({ cours, about, bundle }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  
  const navigate = useNavigate();

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

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login');
  };

  return (
    <nav className="flex cursor-pointer justify-between w-full xl:justify-between h-[6vh] lg:px-[3%] px-[3%] py-[3%]  lg:py-[2%] lg:h-[8vh]  xl:px-[3%] xl:py-[2%] xl:h-[8vh]   relative">
      <div className="flex gap-2 lg:gap-16 font-bold">
        <div onClick={() => navigate('/')} className="text-lg font-bold -translate-y-[53px] lg:-translate-y-[68px] xl:-translate-y-[65px] 2xl:-translate-y-[66px]">
          <img className='h-[130px] w-[110px] md:h-[15vh] md:w-[15vw] lg:h-[150px] lg:w-[150px] xl:h-[150px] 2xl:h-[150px] xl:w-[150px] overflow-hidden ' src="/images/Logo.png" alt="" />
        </div>
        <div onClick={() => navigate('/practice')} className='xl:text-xl hidden md:block'>Prepare</div>

        <div className="relative group hidden md:block" onMouseEnter={() => setShowDropdown(true)} onMouseLeave={() => setShowDropdown(false)}>
          <div onClick={() => navigate('/courses')} style={{ color: cours }} className="cursor-pointer xl:text-xl hover:text-[#020A47]">Courses</div>

          {/* Dropdown menu */}
          {showDropdown && (
            <div className="absolute w-[98vw] -left-[170px] lg:-left-[240px] xl:-left-[250px] 2xl:-left-[270px] top-[35px] lg:top-[35px] xl:top-[40px] 2xl:top-[42px] bg-[#D9D9D9] shadow-lg rounded-sm p-6 z-50">
              <div className='absolute lg:left-[250px] xl:left-[280px] 2xl:left-[300px] left-[190px] text-3xl -top-[16px] lg:-top-[16px] xl:-top-[18px] 2xl:-top-[18px] lg:text-4xl xl:text-2xl text-[#D9D9D9]'>
                <IoTriangle />
              </div>
              <div className="flex flex-wrap gap-4">
                <div className="hover:text-[#3a3737] 2xl:w-[13%] text-[#000000] cursor-pointer">Web Development</div>
                <div className="hover:text-[#3a3737] 2xl:w-[13%] text-[#000000] cursor-pointer">Python</div>
                <div className="hover:text-[#3a3737] 2xl:w-[13%] text-[#000000] cursor-pointer">App Development</div>
                <div className="hover:text-[#3a3737] 2xl:w-[13%] text-[#000000] cursor-pointer">AI/ML</div>
                <div className="hover:text-[#3a3737] 2xl:w-[13%] text-[#000000] cursor-pointer">Graphic Design</div>
                <div className="hover:text-[#3a3737] 2xl:w-[13%] text-[#000000] cursor-pointer">MERN Development</div>
                <div className="hover:text-[#3a3737] 2xl:w-[13%] text-[#000000] cursor-pointer">Full Stack Development</div>
              </div>
            </div>
          )}
        </div>

        <div className='relative'>
          <input className='w-[200px] border-[1px] pr-6 pl-2 h-[35px] relative border-gray-400 rounded-lg' type="text" placeholder='Search' />
          <IoIosSearch className="absolute top-0 right-1 mt-2 text-xl text-gray-500 " />
        </div>
      </div>

      {/* Mobile Menu Button */}
      <button className="md:hidden text-xl" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
        {isMobileMenuOpen ? "✖" : "☰"}
      </button>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-lg z-50 flex flex-col items-center gap-4 p-4">
          <div onClick={() => navigate('/')} className="cursor-pointer w-[80%] flex justify-center items-center border-b-[1px] border-gray-200 py-1 ">Home</div>
          <div onClick={() => navigate('/courses')} className="cursor-pointer w-[80%] flex justify-center items-center border-b-[1px] border-gray-200 py-1 ">Courses</div>
          <div onClick={() => navigate('/bundles')} className="cursor-pointer w-[80%] flex justify-center items-center border-b-[1px] border-gray-200 py-1 ">Bundles</div>
          <div onClick={() => navigate('/practice')} className="cursor-pointer w-[80%] flex justify-center items-center border-b-[1px] border-gray-200 py-1 ">Practice</div>
          <div onClick={() => navigate('/about')} className="cursor-pointer w-[80%] flex justify-center items-center border-b-[1px] border-gray-200 py-1 ">About Us</div>
          {user ? (
            <>
              <div className="w-[80%] border-b-[1px] border-gray-200 py-1">
                <div className="flex items-center justify-center gap-2">
                  <FaUserCircle className='scale-110'/>
                  <span className="font-semibold">{user.name}</span>
                </div>
              </div>
              <div onClick={() => navigate('/dashboard')} className="cursor-pointer w-[80%] flex justify-center items-center border-b-[1px] border-gray-200 py-1 gap-2">
                <FaChalkboardUser className='text-xl' /> Dashboard
              </div>
              <div onClick={() => navigate('/my-courses')} className="cursor-pointer w-[80%] flex justify-center items-center border-b-[1px] border-gray-200 py-1 gap-2">
                <FaBook className='text-xl' /> My Courses
              </div>
              <div onClick={() => navigate('/support')} className="cursor-pointer w-[80%] flex justify-center items-center border-b-[1px] border-gray-200 py-1 gap-2">
                <FaCommentDots className='text-xl' /> Support
              </div>
              <div onClick={() => navigate('/settings')} className="cursor-pointer w-[80%] flex justify-center items-center border-b-[1px] border-gray-200 py-1 gap-2">
                <IoSettingsSharp className='text-xl'/> Settings
              </div>
              <div onClick={handleLogout} className="cursor-pointer w-[80%] flex justify-center items-center border-b-[1px] border-gray-200 py-1 gap-2 text-red-600">
                <RiShareForwardBoxLine className='text-xl'/> Logout
              </div>
            </>
          ) : (
            <div onClick={() => navigate('/login')} className="cursor-pointer flex justify-center items-center gap-2">
              <FaUserCircle className='scale-110'/> Login
            </div>
          )}
        </div>
      )}

      {/* Desktop User Info */}
      <div className='hidden md:flex justify-center items-center h-[2vh] gap-4 mt-1 lg:gap-12'>
        <div className="xl:text-xl font-bold bg-[#020A47] py-1 px-2 rounded text-white text-sm cursor-pointer">Score: {user?.score || 0}</div>

        {/* Display user name and photo if logged in */}
        {user ? (
          <div className="relative" onMouseEnter={() => setShowUserDropdown(true)} >
            <div className="text-lg xl:text-xl flex gap-3 items-center font-bold cursor-pointer">
              <FaUserCircle className='scale-[150%]' />
              <span>{user.name}</span>
            </div>
            {showUserDropdown && (
              <div className="absolute right-0 mt-2  bg-white border border-gray-200 rounded-md translate-x-10 shadow-lg z-50 w-[250px]"  onMouseLeave={() => setShowUserDropdown(false)} >
                <div className="p-4 flex h-14 justify-evenly mt-2 items-center border-[1px] rounded-lg border-black w-[90%] mx-2 ">
                  <FaUserCircle className='scale-[150%]' />
                  <p className="text-center font-semibold">{user.name}</p>
                </div>
                <div className="mt-2 font-semibold">
                  <button onClick={() => navigate('/dashboard')} className="w-full text-left px-4 py-2 flex justify-start gap-2 items-center hover:bg-gray-100"><FaChalkboardUser className='text-2xl' />Dashboard</button>
                  <button onClick={() => navigate('/my-courses')} className="w-full text-left px-4 py-2 flex justify-start gap-2 items-center hover:bg-gray-100"><FaBook className='text-xl' />My Courses</button>
                  <button onClick={() => navigate('/support')} className="w-full text-left px-4 py-2 flex justify-start gap-2 items-center hover:bg-gray-100"><FaCommentDots className='text-2xl' />Support</button>
                  <button onClick={() => navigate('/settings')} className="w-full text-left px-4 py-2 flex justify-start gap-2 items-center hover:bg-gray-100"><IoSettingsSharp className='text-2xl'/>Settings</button>
                  <button onClick={handleLogout} className="w-full text-left px-4 py-2 flex justify-start gap-2 items-center text-red-600 font-semibold hover:bg-gray-100"><RiShareForwardBoxLine className='text-2xl'/>Logout</button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div onClick={() => navigate('/login')} className="text-lg xl:text-xl flex gap-2 items-center font-bold cursor-pointer">
            <FaUserCircle className='scale-[150%]' /> Login
          </div>
        )}
      </div>
    </nav>
  );
};

export default Nav;
