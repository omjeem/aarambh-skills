import React, { useState, useEffect } from "react";
import {
  FaBell,
  FaBook,
  FaCommentDots,
  FaShoppingCart,
  FaUserCircle,
} from "react-icons/fa";
import { FaChalkboardUser } from "react-icons/fa6";
import { IoSettingsSharp, IoTriangle } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { RiShareForwardBoxLine } from "react-icons/ri";
import { useSelector } from "react-redux";

const Nav = ({ cours, about, bundle }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showDropdownBundles, setShowDropdownBundles] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  const navigate = useNavigate();
  const cartCount = useSelector((state) => state.cart.count);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(
          "https://arambhskills.onrender.com/user/get_user",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

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
              score: data.user.score,
            });
          } else {
            setUser(null);
          }
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setUser(null);
      }
    };

    fetchUserData();
  }, []);

  const handleUserDropdownToggle = () => {
    setShowUserDropdown(!showUserDropdown);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  return (
    <nav className="flex cursor-pointer justify-between w-full xl:justify-between h-[6vh] lg:px-[3%] px-[3%] py-[3%]  lg:py-[2%] lg:h-[8vh]  xl:px-[3%] xl:py-[2%] xl:h-[8vh]   relative">
      <div className="flex gap-8 lg:gap-16 font-bold">
        <div
          onClick={() => navigate("/")}
          className="text-lg font-bold  -translate-y-[53px] lg:-translate-y-[68px] xl:-translate-y-[65px] 2xl:-translate-y-[66px]"
        >
          <img
            className="h-[120px] w-[110px] md:h-[120px] md:w-[18vw] lg:h-[150px] lg:w-[180px] xl:h-[150px] 2xl:h-[150px] 2xl:w-[150px] xl:w-[150px]   overflow-hidden "
            src="/images/Logo.png"
            alt=""
          />
        </div>
        <div
          onClick={() => navigate("/")}
          className="xl:text-lg font-semibold hidden lg:block"
        >
          Home
        </div>

        <div
          className="relative group hidden lg:block"
          onMouseEnter={() => setShowDropdown(true)}
          onMouseLeave={() => setShowDropdown(false)}
        >
          <div
            onClick={() => navigate("/courses")}
            style={{ color: cours }}
            className="cursor-pointer xl:text-lg font-semibold hover:text-[#020A47]"
          >
            Courses
          </div>

          {/* Dropdown menu */}
          {showDropdown && (
            <div className="absolute w-[85vw] lg:w-[98vw] -left-[180px] lg:-left-[330px] xl:-left-[360px] 2xl:-left-[360px] top-[35px] lg:top-[35px] xl:top-[40px] 2xl:top-[42px]  bg-[#D9D9D9] shadow-lg  rounded-sm p-6  z-50">
              <div className=" absolute lg:left-[340px] xl:left-[380px] 2xl:left-[380px] left-[190px] text-3xl -top-[16px]  lg:-top-[16px] xl:-top-[18px] 2xl:-top-[18px] lg:text-4xl xl:text-2xl text-[#D9D9D9]">
                {" "}
                <IoTriangle />
              </div>
              <div className="flex   flex-wrap gap-4    ">
                <div className="hover:text-[#3a3737] 2xl:w-[13%]   text-[#000000] cursor-pointer">
                  Web Development
                </div>
                <div className="hover:text-[#3a3737] 2xl:w-[13%]   text-[#000000] cursor-pointer">
                  Python
                </div>
                <div className="hover:text-[#3a3737] 2xl:w-[13%]   text-[#000000] cursor-pointer">
                  App Development
                </div>
                <div className="hover:text-[#3a3737] 2xl:w-[13%]   text-[#000000] cursor-pointer">
                  AI/ML
                </div>
                <div className="hover:text-[#3a3737] 2xl:w-[13%]   text-[#000000] cursor-pointer">
                  Graphic Design
                </div>
                <div className="hover:text-[#3a3737] 2xl:w-[13%]   text-[#000000] cursor-pointer">
                  MERN Development
                </div>
                <div className="hover:text-[#3a3737] 2xl:w-[13%]   text-[#000000] cursor-pointer">
                  Full Stack Development
                </div>
                <div className="hover:text-[#3a3737] 2xl:w-[13%]   text-[#000000] cursor-pointer">
                  Web Development
                </div>
                <div className="hover:text-[#3a3737] 2xl:w-[13%]   text-[#000000] cursor-pointer">
                  Python
                </div>
                <div className="hover:text-[#3a3737] 2xl:w-[13%]   text-[#000000] cursor-pointer">
                  App Development
                </div>
                <div className="hover:text-[#3a3737] 2xl:w-[13%]   text-[#000000] cursor-pointer">
                  AI/ML
                </div>
                <div className="hover:text-[#3a3737] 2xl:w-[13%]   text-[#000000] cursor-pointer">
                  Graphic Design
                </div>
                <div className="hover:text-[#3a3737] 2xl:w-[13%]   text-[#000000] cursor-pointer">
                  MERN Development
                </div>
                <div className="hover:text-[#3a3737] 2xl:w-[13%]   text-[#000000] cursor-pointer">
                  Full Stack Development
                </div>
              </div>
            </div>
          )}
        </div>

        <div
          onClick={() => navigate("/practice")}
          style={{ color: cours }}
          className="cursor-pointer hidden lg:block xl:text-lg font-semibold hover:text-[#020A47]"
        >
          Practice
        </div>
        <div
          className="relative group hidden lg:block"
          onMouseEnter={() => setShowDropdownBundles(true)}
          onMouseLeave={() => setShowDropdownBundles(false)}
        >
          <div
            onClick={() => navigate("/bundles")}
            style={{ color: bundle }}
            className="cursor-pointer xl:text-lg font-semibold hover:text-[#020A47]"
          >
            Bundles
          </div>

          {/* Dropdown menu */}
          {showDropdownBundles && (
            <div className="absolute    -left-[320px] lg:-left-[550px] xl:-left-[600px] 2xl:-left-[650px] top-[4vh] lg:top-[40px] xl:top-[40px] 2xl:top-[45px]  bg-[#D9D9D9] shadow-lg  w-[98vw] lg:w-[95vw]  xl:w-[95vw] rounded-sm p-6  z-50">
              <div className=" absolute lg:left-[560px] xl:left-[620px] -top-4 left-[340px] 2xl:left-[670px] 2xl:-top-[24%] 2xl:text-xl text-lg lg:-top-[20px] xl:-top-[16px] lg:text-4xl xl:text-2xl text-[#D9D9D9]">
                {" "}
                <IoTriangle />
              </div>
              <div className="flex w-full flex-wrap gap-2 justify-between">
                <div className="hover:text-[#3a3737]   text-[#000000] cursor-pointer">
                  Web Development
                </div>
                <div className="hover:text-[#3a3737]  text-[#000000] cursor-pointer">
                  Python
                </div>
                <div className="hover:text-[#3a3737]   text-[#000000] cursor-pointer">
                  App Development
                </div>
                <div className="hover:text-[#3a3737]   text-[#000000] cursor-pointer">
                  AI/ML
                </div>
                <div className="hover:text-[#3a3737]   text-[#000000] cursor-pointer">
                  Graphic Design
                </div>
                <div className="hover:text-[#3a3737]   text-[#000000] cursor-pointer">
                  MERN Development
                </div>
                <div className="hover:text-[#3a3737]   text-[#000000] cursor-pointer">
                  Full Stack Development
                </div>
              </div>
            </div>
          )}
        </div>

        <div
          onClick={() => navigate("/freelancing")}
          className="xl:text-lg font-semibold hidden lg:block"
        >
          Freelancing
        </div>
        <div
          onClick={() => navigate("/Placement")}
          style={{ color: about }}
          className="cursor-pointer   xl:text-lg font-semibold hidden lg:flex hover:text-[#020A47]"
        >
          Placement & Internship
        </div>
      </div>

      {/* Mobile Menu Button */}
      <button
        className="lg:hidden text-xl"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        {isMobileMenuOpen ? "✖" : "☰"}
      </button>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-lg z-[999] flex flex-col items-center gap-4 p-4">
          <div
            onClick={() => navigate("/")}
            className="cursor-pointer w-[80%]  flex justify-center items-center border-b-[1px] border-gray-200 py-1 "
          >
            Home
          </div>
          <div
            onClick={() => navigate("/courses")}
            className="cursor-pointer w-[80%]  flex justify-center items-center border-b-[1px] border-gray-200 py-1 "
          >
            Courses
          </div>
          <div
            onClick={() => navigate("/practice")}
            className="cursor-pointer w-[80%]  flex justify-center items-center border-b-[1px] border-gray-200 py-1 "
          >
            Practice
          </div>
          <div
            onClick={() => navigate("/bundles")}
            className="cursor-pointer w-[80%]  flex justify-center items-center border-b-[1px] border-gray-200 py-1 "
          >
            Bundles
          </div>
          <div
            onClick={() => navigate("/freelancing")}
            className="cursor-pointer w-[80%]  flex justify-center items-center border-b-[1px] border-gray-200 py-1 "
          >
            Freelancing
          </div>
          <div
            onClick={() => navigate("/Placement")}
            className="cursor-pointer w-[80%]  flex justify-center items-center border-b-[1px] border-gray-200 py-1 "
          >
            Placement & Internship
          </div>
        </div>
      )}
      <div
        onClick={() => navigate("/chat")}
        className="cursor-pointer h-[4vh]  hidden lg:ml-4 xl:lg:ml-0 lg:flex xl:text-xl justify-center lg:items-center xl:items-center gap-2"
      >
        AI <FaBell />
      </div>
    </nav>
  );
};

export default Nav;
