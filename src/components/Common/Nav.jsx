import React, { useState, useEffect } from 'react';
import { FaBook, FaCommentDots, FaShoppingCart, FaUserCircle } from 'react-icons/fa';
import { FaChalkboardUser } from 'react-icons/fa6';
import { IoSettingsSharp, IoTriangle } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { RiShareForwardBoxLine } from "react-icons/ri";
import { useSelector } from 'react-redux';
import envConfig from '../../utils/envConfig';

const Nav = ({ cours, about, bundle }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showDropdownBundles, setShowDropdownBundles] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(null); // State for user data
  const [showUserDropdown, setShowUserDropdown] = useState(false); // State for user dropdown
  
  const navigate = useNavigate();
  const cartCount = useSelector((state) => state.cart.count);

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

  const handleUserDropdownToggle = () => {
    setShowUserDropdown(!showUserDropdown);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login');
  };

  return (
    <nav className="flex cursor-pointer justify-between w-full xl:justify-between h-[6vh] lg:px-[3%] px-[3%] py-[3%]  lg:py-[2%] lg:h-[8vh]  xl:px-[3%] xl:py-[2%] xl:h-[8vh]   relative">
      <div className="flex gap-8 lg:gap-16 font-bold">
        <div onClick={() => navigate('/')} className="text-lg font-bold -translate-y-[53px] lg:-translate-y-[68px] xl:-translate-y-[65px] 2xl:-translate-y-[66px]">
          <img className='h-[130px] w-[110px] md:h-[15vh] md:w-[15vw] lg:h-[150px] lg:w-[150px] xl:h-[150px] 2xl:h-[150px] 2xl:w-[150px] xl:w-[150px]   overflow-hidden ' src="/images/Logo.png" alt="" />
        </div>

        <div
          className="relative group hidden md:block"
          onMouseEnter={() => setShowDropdown(true)}
          onMouseLeave={() => setShowDropdown(false)}
        >
          <div onClick={() => navigate('/courses')} style={{ color: cours }} className="cursor-pointer text-lg font-semibold hover:text-[#020A47]">Courses</div>

          {/* Dropdown menu */}
          {showDropdown && (
            <div className="absolute w-[98vw] -left-[170px] lg:-left-[240px] xl:-left-[250px] 2xl:-left-[270px] top-[35px] lg:top-[35px] xl:top-[40px] 2xl:top-[42px]  bg-[#D9D9D9] shadow-lg  rounded-sm p-6  z-50">
              <div className=' absolute lg:left-[250px] xl:left-[280px] 2xl:left-[300px] left-[190px] text-3xl -top-[16px]  lg:-top-[16px] xl:-top-[18px] 2xl:-top-[18px] lg:text-4xl xl:text-2xl text-[#D9D9D9]'>  <IoTriangle  /></div>
              <div className="flex   flex-wrap gap-4    ">
                <div className="hover:text-[#3a3737] 2xl:w-[13%]   text-[#000000] cursor-pointer">Web Development</div>
                <div className="hover:text-[#3a3737] 2xl:w-[13%]   text-[#000000] cursor-pointer">Python</div>
                <div className="hover:text-[#3a3737] 2xl:w-[13%]   text-[#000000] cursor-pointer">App Development</div>
                <div className="hover:text-[#3a3737] 2xl:w-[13%]   text-[#000000] cursor-pointer">AI/ML</div>
                <div className="hover:text-[#3a3737] 2xl:w-[13%]   text-[#000000] cursor-pointer">Graphic Design</div>
                <div className="hover:text-[#3a3737] 2xl:w-[13%]   text-[#000000] cursor-pointer">MERN Development</div>
                <div className="hover:text-[#3a3737] 2xl:w-[13%]   text-[#000000] cursor-pointer">Full Stack Development</div>
                <div className="hover:text-[#3a3737] 2xl:w-[13%]   text-[#000000] cursor-pointer">Web Development</div>
                <div className="hover:text-[#3a3737] 2xl:w-[13%]   text-[#000000] cursor-pointer">Python</div>
                <div className="hover:text-[#3a3737] 2xl:w-[13%]   text-[#000000] cursor-pointer">App Development</div>
                <div className="hover:text-[#3a3737] 2xl:w-[13%]   text-[#000000] cursor-pointer">AI/ML</div>
                <div className="hover:text-[#3a3737] 2xl:w-[13%]   text-[#000000] cursor-pointer">Graphic Design</div>
                <div className="hover:text-[#3a3737] 2xl:w-[13%]   text-[#000000] cursor-pointer">MERN Development</div>
                <div className="hover:text-[#3a3737] 2xl:w-[13%]   text-[#000000] cursor-pointer">Full Stack Development</div>
              </div>
            </div>
          )}
        </div>
        <div
          className="relative group hidden md:block"
          onMouseEnter={() => setShowDropdownBundles(true)}
          onMouseLeave={() => setShowDropdownBundles(false)}
        >
          <div onClick={() => navigate('/bundles')} style={{ color: bundle }} className="cursor-pointer text-lg font-semibold hover:text-[#020A47]">Bundles</div>

          {/* Dropdown menu */}
          {showDropdownBundles && (
            <div className="absolute    -left-[270px] lg:-left-[360px] xl:-left-[360px] 2xl:-left-[340px] top-[4vh] lg:top-[40px] xl:top-[40px] 2xl:top-[45px]  bg-[#D9D9D9] shadow-lg  w-[100vw] lg:w-[95vw]  xl:w-[95vw] rounded-sm p-6  z-50">
              <div className=' absolute lg:left-[370px] xl:left-[390px] -top-4 left-[290px] 2xl:left-[370px] 2xl:-top-[24%] 2xl:text-xl text-lg lg:-top-[20px] xl:-top-[16px] lg:text-4xl xl:text-2xl text-[#D9D9D9]'>  <IoTriangle  /></div>
              <div className="flex w-full flex-wrap gap-2 justify-between">
                <div className="hover:text-[#3a3737]   text-[#000000] cursor-pointer">Web Development</div>
                <div className="hover:text-[#3a3737]  text-[#000000] cursor-pointer">Python</div>
                <div className="hover:text-[#3a3737]   text-[#000000] cursor-pointer">App Development</div>
                <div className="hover:text-[#3a3737]   text-[#000000] cursor-pointer">AI/ML</div>
                <div className="hover:text-[#3a3737]   text-[#000000] cursor-pointer">Graphic Design</div>
                <div className="hover:text-[#3a3737]   text-[#000000] cursor-pointer">MERN Development</div>
                <div className="hover:text-[#3a3737]   text-[#000000] cursor-pointer">Full Stack Development</div>
              </div>
            </div>
          )}
        </div>

        <div onClick={() => navigate('/practice')} className='text-lg font-semibold hidden md:block' >Practice</div>
        <div onClick={() => navigate('/about')} style={{ color: about }} className="cursor-pointer text-lg font-semibold hidden md:block hover:text-[#020A47]">About Us</div>
      </div>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden text-xl"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        {
          isMobileMenuOpen ?   "✖" : "☰" 
        }
      </button>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-lg z-50 flex flex-col items-center gap-4 p-4">
          <div onClick={() => navigate('/')} className="cursor-pointer w-[80%]  flex justify-center items-center border-b-[1px] border-gray-200 py-1 ">
            Home
          </div>
          <div onClick={() => navigate('/courses')} className="cursor-pointer w-[80%]  flex justify-center items-center border-b-[1px] border-gray-200 py-1 ">
            Courses
          </div>
          <div onClick={() => navigate('/bundles')} className="cursor-pointer w-[80%]  flex justify-center items-center border-b-[1px] border-gray-200 py-1 ">
            Bundles
          </div>
          <div onClick={() => navigate('/practice')} className="cursor-pointer w-[80%]  flex justify-center items-center border-b-[1px] border-gray-200 py-1 ">
            Practice
          </div>
          <div onClick={() => navigate('/about')} className="cursor-pointer w-[80%]  flex justify-center items-center border-b-[1px] border-gray-200 py-1 ">
            About Us
          </div>
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
      <div className='hidden md:flex  justify-center items-center h-[2vh] gap-8'>
        {user ? (
          <div className="relative" >
            <div className="text-xl font-semibold flex gap-14 items-center cursor-pointer">
             <div className='relative'>
              <FaShoppingCart className='!scale-150' onClick={() => navigate('/checkout')} />
              {cartCount > 0 && (
                <span className='absolute -top-3 -right-3 bg-[#A90AA4] text-lg text-white rounded-full w-6 h-6 flex justify-center items-center'>{cartCount}</span>
              )}
              </div>
              <div className='text-xl font-semibold flex gap-2 items-center cursor-pointer'onMouseEnter={() => setShowUserDropdown(true)} > 
                <FaUserCircle className='scale-125' />
                <span className='text-xl'>{user.name}</span>
              </div>
            </div>
            {showUserDropdown && (
             <div className="absolute right-0 mt-2  bg-white border border-gray-200 rounded-md translate-x-10 shadow-lg z-50 w-[250px]"  onMouseLeave={() => setShowUserDropdown(false)}>
                            <div className="p-4 flex h-14 justify-evenly mt-2 items-center border-[1px] rounded-lg border-black w-[90%] mx-2 ">
                              {/* <img src={user.photoURL} alt={user.name} className="w-12 h-12 rounded-full mx-auto" /> */}
                              <FaUserCircle className='scale-[150%]' />
                              <p className="text-center   font-semibold">{user.name}</p>
                            </div>
                            <div className=" mt-2  font-semibold">
                              <button onClick={() => navigate('/dashboard')} className="w-full text-left px-4 py-2 flex justify-start gap-2 items-center hover:bg-gray-100"><FaChalkboardUser className='text-2xl' />Dashboard</button>
                              <button onClick={() => navigate('/dashboard/mycourses')} className="w-full text-left px-4 py-2 flex justify-start gap-2 items-center hover:bg-gray-100"><FaBook className='text-xl' />My Courses</button>
                              <button onClick={() => navigate('/dashboard/support')} className="w-full text-left px-4 py-2 flex justify-start gap-2 items-center hover:bg-gray-100"><FaCommentDots className='text-2xl' />Support</button>
                              <button onClick={() => navigate('/dashboard/setting')} className="w-full text-left px-4 py-2 flex justify-start gap-2 items-center hover:bg-gray-100"><IoSettingsSharp className='text-2xl'/>Settings</button>
                              <button onClick={handleLogout} className="w-full text-left px-4 py-2 flex justify-start gap-2 items-center text-red-600 font-semibold hover:bg-gray-100"><RiShareForwardBoxLine className='text-2xl'/>Logout</button>
                            </div>
                          </div>
            )}
          </div>
        ) : (
          <>
            <div onClick={() => navigate('/login')} className=" text-lg font-semibold  cursor-pointer">Login</div>
            <div onClick={() => navigate('/joinnow')} className=" text-lg font-semibold  cursor-pointer">Join Now</div>
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
