import { useEffect, useState } from "react";
import { AiOutlineProject } from "react-icons/ai";
import { FaGraduationCap, FaUsers, FaBook, FaHeart, FaCog, FaHistory, FaUser, FaComments, FaMoneyBill, FaShoppingCart, FaCommentDots, FaHome, FaChartBar, FaChevronDown, FaChevronRight, FaList, FaPlus, FaQuestionCircle, FaProjectDiagram, FaTasks, FaClipboardList, FaRegNewspaper, FaAward } from "react-icons/fa";
import { HiMiniDocumentCurrencyRupee, HiUsers } from "react-icons/hi2";
import { PiCertificateFill, PiStudentBold } from "react-icons/pi";
import { RiAdminFill, RiShareForwardBoxLine, RiVideoAddLine } from "react-icons/ri";
import { useNavigate, useLocation } from "react-router-dom";
import { IoMenu, IoClose, IoLogoWebComponent } from "react-icons/io5";
import { MdAddchart } from "react-icons/md";
import { BiCategory, BiSolidComponent, BiSolidDiscount, BiSolidLayer } from "react-icons/bi";
import envConfig from '../../utils/envConfig';
import { GiArcheryTarget } from "react-icons/gi";

const Sidebar = ({ col }) => {
  const [user, setUser] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenuser, setIsOpenuser] = useState(false);
  const [isCourseOpen, setIsCourseOpen] = useState(false);
  const [isFrontCMSOpen, setIsFrontCMSOpen] = useState(false);
  const [isPracticeOpen, setIsPracticeOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isAffiliateOpen, setIsAffiliateOpen] = useState(false);
  const [isRewardPointsOpen, setIsRewardPointsOpen] = useState(false);
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
    <div className="overflow-auto xl:w-[300px] lg:h-screen ">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="lg:hidden fixed top-4 right-4 z-50 p-2 rounded-md bg-white shadow-md"
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
      <div className={`fixed lg:static top-0 right-0 z-50  bg-white shadow-lg border-gray-50 border-[1px] rounded-l-2xl transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}`}>
        {/* Close Button */}
        <button
          onClick={() => setIsOpen(false)}
          className="lg:hidden absolute top-4 right-4 p-2 rounded-md hover:bg-gray-100"
        >
          <IoClose className="h-6 w-6 text-[#020A47]" />
        </button>

        <div className="flex flex-col items-center justify-center p-6 border-b">
          <img
            src="https://images.unsplash.com/photo-1562572159-4efc207f5aff?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjJ8fG1vZGVsfGVufDB8fDB8fHww"
            alt="User"
            className="h-16 w-16 rounded-full mb-3 object-cover"
          />
          {user && (
            <>
              <h3 className="text-lg font-semibold text-[#020A47]">{user.name}</h3>
              <p className="text-gray-500 text-sm mt-1">{user.email}</p>
            </>
          )}
        </div>

        {/* Navigation Menu */}
        <div className="p-4">
          <ul className="space-y-2 overflow-y-auto  scrollbar-hide">
            <li onClick={() => handleNavigation('/admin/dashboard')}
              className={`flex items-center space-x-3 text-[#020A47] hover:bg-gray-100 p-3 rounded-lg cursor-pointer transition-colors ${location.pathname === '/admin/dashboard' ? col : ''}`}>
              <FaHome className="text-lg" />
              <span className="text-base font-medium">Dashboard</span>
            </li>

            <li onClick={() => handleNavigation('/admin/dashboard/category')}
              className={`flex items-center space-x-3 text-[#020A47] hover:bg-gray-100 p-3 rounded-lg cursor-pointer transition-colors ${location.pathname === '/admin/dashboard/category' ? col : ''}`}>
              <BiCategory className="text-lg" />
              <span className="text-base font-medium">Category</span>
            </li>

            <div className="relative">
              <li onClick={() => setIsCourseOpen(!isCourseOpen)}
                className={`flex items-center justify-between p-3 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors ${location.pathname.includes('/admin/dashboard/courses') ? col : ''}`}>
                <div className="flex items-center space-x-3">
                  <FaBook className="text-md" />
                  <span className="text-base font-medium">Courses</span>
                </div>
                {isCourseOpen ? <FaChevronDown className="text-sm" /> : <FaChevronRight className="text-sm" />}
              </li>

              {isCourseOpen && (
                <ul className="pl-12 mt-2 space-y-2 border-l-2 border-gray-200">
                  <li onClick={() => handleNavigation('/admin/dashboard/manageCourse')}
                    className={`flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors ${location.pathname === '/admin/dashboard/manageCourse' ? 'text-[#020A47]' : ''}`}>
                    <FaList className="text-base" />
                    <span className="text-sm font-medium">Manage Courses</span>
                  </li>
                  <li onClick={() => handleNavigation('/admin/dashboard/courses/add')}
                    className={`flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors ${location.pathname === '/admin/dashboard/courses/add' ? 'text-[#020A47]' : ''}`}>
                    <FaPlus className="text-base" />
                    <span className="text-sm font-medium">Add New Course</span>
                  </li>
                  <li onClick={() => handleNavigation('/admin/dashboard/video/add')}
                    className={`flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors ${location.pathname === '/admin/dashboard/video/add' ? 'text-[#020A47]' : ''}`}>
                    <RiVideoAddLine className="text-lg" />
                    <span className="text-sm font-medium">Add New Video</span>
                  </li>
                  <li onClick={() => handleNavigation('/admin/dashboard/quiz/add')}
                    className={`flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors ${location.pathname === '/admin/dashboard/quiz/add' ? 'text-[#020A47]' : ''}`}>
                    <FaClipboardList className="text-base" />
                    <span className="text-sm font-medium">Add New Quiz</span>
                  </li>
                  <li onClick={() => handleNavigation('/admin/dashboard/project/add')}
                    className={`flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors ${location.pathname === '/admin/dashboard/project/add' ? 'text-[#020A47]' : ''}`}>
                    <MdAddchart className="text-base" />
                    <span className="text-sm font-medium">Add New Project</span>
                  </li>
                  <li onClick={() => handleNavigation('/admin/dashboard/coupon')}
                    className={`flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors ${location.pathname === '/admin/dashboard/coupons' ? 'text-[#020A47]' : ''}`}>
                    <BiSolidDiscount className="text-base" />
                    <span className="text-sm font-medium">Coupon</span>
                  </li>
                </ul>
              )}
            </div>

            <li onClick={() => handleNavigation('/admin/dashboard/bundle/manage')}
              className={`flex items-center space-x-3 text-[#020A47] hover:bg-gray-100 p-3 rounded-lg cursor-pointer transition-colors ${location.pathname === '/admin/dashboard/bundle/manage' ? col : ''}`}>
              <BiSolidLayer className="text-xl" />
              <span className="text-base font-medium">Course Bundle</span>
            </li>

            <div className="relative">
              <li onClick={() => setIsPracticeOpen(!isPracticeOpen)}
                className={`flex items-center justify-between p-3 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors ${location.pathname.includes('/admin/dashboard/practice') ? col : ''}`}>
                <div className="flex items-center space-x-3">
                  <GiArcheryTarget className="text-md" />
                  <span className="text-base font-medium">Practice</span>
                </div>
                {isPracticeOpen ? <FaChevronDown className="text-sm" /> : <FaChevronRight className="text-sm" />}
              </li>

              {isPracticeOpen && (
                <ul className="pl-12 mt-2 space-y-2 border-l-2 border-gray-200">
                  <li onClick={() => handleNavigation('/admin/dashboard/practice/topic/add')}
                    className={`flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors ${location.pathname === '/admin/dashboard/practice/topic/add' ? 'text-[#020A47]' : ''}`}>
                    <FaPlus className="text-base" />
                    <span className="text-sm font-medium">Add Topic</span>
                  </li>
                  <li onClick={() => handleNavigation('/admin/dashboard/practice/quiz/add')}
                    className={`flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors ${location.pathname === '/admin/dashboard/practice/quiz/add' ? 'text-[#020A47]' : ''}`}>
                    <FaClipboardList className="text-base" />
                    <span className="text-sm font-medium">Add Quiz</span>
                  </li>
                </ul>
              )}
            </div>

            <li onClick={() => handleNavigation('/admin/dashboard/students')}
              className={`flex items-center space-x-3 text-[#020A47] hover:bg-gray-100 p-3 rounded-lg cursor-pointer transition-colors ${location.pathname === '/admin/dashboard/students' ? col : ''}`}>
              <FaUsers className="text-lg" />
              <span className="text-base font-medium">Students enrolled</span>
            </li>

            <li onClick={() => handleNavigation('/admin/dashboard/paymenthistory')}
              className={`flex items-center space-x-3 text-[#020A47] hover:bg-gray-100 p-3 rounded-lg cursor-pointer transition-colors ${location.pathname === '/admin/dashboard/paymenthistory' ? col : ''}`}>
              <HiMiniDocumentCurrencyRupee className="text-lg" />
              <span className="text-base font-medium">Payment History</span>
            </li>

            <div className="relative">
              <li onClick={() => setIsOpenuser(!isOpenuser)}
                className={`flex items-center justify-between p-3 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors ${location.pathname.includes('/admin/dashboard/users/students') ? col : ''}`}>
                <div className="flex items-center space-x-3">
                  <HiUsers className="text-md" />
                  <span className="text-base font-medium">Users</span>
                </div>
                {isOpenuser ? <FaChevronDown className="text-sm" /> : <FaChevronRight className="text-sm" />}
              </li>

              {isOpenuser && (
                <ul className="pl-12 mt-2 space-y-2 border-l-2 border-gray-200">
                  <li onClick={() => handleNavigation('/admin/dashboard/users/admin')}
                    className={`flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors ${location.pathname === '/admin/dashboard/users/admin' ? 'text-[#020A47]' : ''}`}>
                    <RiAdminFill className="text-base" />
                    <span className="text-sm font-medium">Admin</span>
                  </li>
                  <li onClick={() => handleNavigation('/admin/dashboard/users/students')}
                    className={`flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors ${location.pathname === '/admin/dashboard/users/students' ? 'text-[#020A47]' : ''}`}>
                    <PiStudentBold className="text-base" />
                    <span className="text-sm font-medium">Student</span>
                  </li>
                </ul>
              )}
            </div>

            <li onClick={() => handleNavigation('/admin/dashboard/wishlist')}
              className={`flex items-center space-x-3 text-[#020A47] hover:bg-gray-100 p-3 rounded-lg cursor-pointer transition-colors ${location.pathname === '/admin/dashboard/wishlist' ? col : ''}`}>
              <FaHeart className="text-lg" />
              <span className="text-base font-medium">Wishlist</span>
            </li>

            <div className="relative">
              <li onClick={() => setIsFrontCMSOpen(!isFrontCMSOpen)}
                className={`flex items-center justify-between p-3 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors ${location.pathname.includes('/admin/dashboard/front-cms') ? col : ''}`}>
                <div className="flex items-center space-x-3">
                  <BiSolidComponent className="text-md" />
                  <span className="text-base font-medium">Front CMS</span>
                </div>
                {isFrontCMSOpen ? <FaChevronDown className="text-sm" /> : <FaChevronRight className="text-sm" />}
              </li>

              {isFrontCMSOpen && (
                <ul className="pl-12 mt-2 space-y-2 border-l-2 border-gray-200">
                  <li onClick={() => handleNavigation('/admin/dashboard/front-cms/page-banner')}
                    className={`flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors ${location.pathname === '/admin/dashboard/front-cms/page-banner' ? 'text-[#020A47]' : ''}`}>
                    <IoLogoWebComponent className="text-base" />
                    <span className="text-sm font-medium">Page Banner</span>
                  </li>
                  <li onClick={() => handleNavigation('/admin/dashboard/front-cms/about-page-content')}
                    className={`flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors ${location.pathname === '/admin/dashboard/front-cms/about-page-content' ? 'text-[#020A47]' : ''}`}>
                    <IoLogoWebComponent className="text-base" />
                    <span className="text-sm font-medium">About Page Content</span>
                  </li>
                  <li onClick={() => handleNavigation('/admin/dashboard/front-cms/partners')}
                    className={`flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors ${location.pathname === '/admin/dashboard/front-cms/partners' ? 'text-[#020A47]' : ''}`}>
                    <IoLogoWebComponent className="text-base" />
                    <span className="text-sm font-medium">Partners</span>
                  </li>
                  <li onClick={() => handleNavigation('/admin/dashboard/front-cms/experts')}
                    className={`flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors ${location.pathname === '/admin/dashboard/front-cms/experts' ? 'text-[#020A47]' : ''}`}>
                    <IoLogoWebComponent className="text-base" />
                    <span className="text-sm font-medium">Experts</span>
                  </li>
                  <li onClick={() => handleNavigation('/admin/dashboard/front-cms/faq')}
                    className={`flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors ${location.pathname === '/admin/dashboard/front-cms/faq' ? 'text-[#020A47]' : ''}`}>
                    <IoLogoWebComponent className="text-base" />
                    <span className="text-sm font-medium">FAQ</span>
                  </li>
                  <li onClick={() => handleNavigation('/admin/dashboard/front-cms/WhyArambhSkills')}
                    className={`flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors ${location.pathname === '/admin/dashboard/front-cms/WhyArambhSkills' ? 'text-[#020A47]' : ''}`}>
                    <IoLogoWebComponent className="text-base" />
                    <span className="text-sm font-medium">WhyArambhSkills</span>
                  </li>
                  <li onClick={() => handleNavigation('/admin/dashboard/front-cms/testimonials')}
                    className={`flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors ${location.pathname === '/admin/dashboard/front-cms/testimonials' ? 'text-[#020A47]' : ''}`}>
                    <IoLogoWebComponent className="text-base" />
                    <span className="text-sm font-medium">Testimonials</span>
                  </li>
                  <li onClick={() => handleNavigation('/admin/dashboard/front-cms/Contact')}
                    className={`flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors ${location.pathname === '/admin/dashboard/front-cms/Contact' ? 'text-[#020A47]' : ''}`}>
                    <IoLogoWebComponent className="text-base" />
                    <span className="text-sm font-medium">Contact</span>
                  </li>
                </ul>
              )}
            </div>

            <li onClick={() => handleNavigation('/admin/dashboard/newsletter')}
              className={`flex items-center space-x-3 text-[#020A47] hover:bg-gray-100 p-3 rounded-lg cursor-pointer transition-colors ${location.pathname === '/admin/dashboard/newsletter' ? col : ''}`}>
              <FaRegNewspaper className="text-lg" />
              <span className="text-base font-medium">NewsLetter</span>
            </li>

            {/* Affiliate Section */}
            <div className="relative">
              <li onClick={() => setIsAffiliateOpen(!isAffiliateOpen)}
                className={`flex items-center justify-between p-3 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors ${location.pathname.includes('/admin/dashboard/affiliate') ? col : ''}`}>
                <div className="flex items-center space-x-3">
                  <FaChartBar className="text-md" />
                  <span className="text-base font-medium">Affiliate</span>
                </div>
                {isAffiliateOpen ? <FaChevronDown className="text-sm" /> : <FaChevronRight className="text-sm" />}
              </li>
              {isAffiliateOpen && (
                <ul className="pl-12 mt-2 space-y-2 border-l-2 border-gray-200">
                  <li onClick={() => handleNavigation('/admin/dashboard/affiliate/history')}
                    className={`flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors ${location.pathname === '/admin/dashboard/affiliate/history' ? 'text-[#020A47]' : ''}`}>
                    <FaHistory className="text-base" />
                    <span className="text-sm font-medium">History</span>
                  </li>
                  <li onClick={() => handleNavigation('/admin/dashboard/affiliate/users')}
                    className={`flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors ${location.pathname === '/admin/dashboard/affiliate/users' ? 'text-[#020A47]' : ''}`}>
                    <FaUser className="text-base" />
                    <span className="text-sm font-medium">Affiliate User</span>
                  </li>
                </ul>
              )}
            </div>
            
            {/* Reward Points Section */}
            <div className="relative">
              <li onClick={() => setIsRewardPointsOpen && setIsRewardPointsOpen(prev => !prev)}
                className={`flex items-center justify-between p-3 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors ${location.pathname.includes('/admin/dashboard/rewardpoints') ? col : ''}`}>
                <div className="flex items-center space-x-3">
                  <FaAward className="text-md" />
                  <span className="text-base font-medium">Reward Points</span>
                </div>
                {isRewardPointsOpen ? <FaChevronDown className="text-sm" /> : <FaChevronRight className="text-sm" />}
              </li>
              {isRewardPointsOpen && (
                <ul className="pl-12 mt-2 space-y-2 border-l-2 border-gray-200">
                  <li onClick={() => handleNavigation('/admin/dashboard/rewardpoints/history')}
                    className={`flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors ${location.pathname === '/admin/dashboard/rewardpoints/history' ? 'text-[#020A47]' : ''}`}>
                    <FaHistory className="text-base" />
                    <span className="text-sm font-medium">History</span>
                  </li>
                  <li onClick={() => handleNavigation('/admin/dashboard/rewardpoints/conditions')}
                    className={`flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors ${location.pathname === '/admin/dashboard/rewardpoints/conditions' ? 'text-[#020A47]' : ''}`}>
                    <FaList className="text-base" />
                    <span className="text-sm font-medium">Conditions</span>
                  </li>
                  <li onClick={() => handleNavigation('/admin/dashboard/rewardpoints/settings')}
                    className={`flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors ${location.pathname === '/admin/dashboard/rewardpoints/settings' ? 'text-[#020A47]' : ''}`}>
                    <FaCog className="text-base" />
                    <span className="text-sm font-medium">Settings</span>
                  </li>
                </ul>
              )}
            </div>

            <li onClick={() => handleNavigation('/admin/dashboard/certification')}
              className={`flex items-center space-x-3 text-[#020A47] hover:bg-gray-100 p-3 rounded-lg cursor-pointer transition-colors ${location.pathname === '/admin/dashboard/certification' ? col : ''}`}>
              <PiCertificateFill className="text-xl" />
              <span className="text-base font-medium">Certification</span>
            </li>
            
            <div className="relative">
              <li onClick={() => setIsSettingsOpen(!isSettingsOpen)}
                className={`flex items-center justify-between p-3 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors ${location.pathname.includes('/admin/dashboard/settings') ? col : ''}`}>
                <div className="flex items-center space-x-3">
                  <FaCog className="text-md" />
                  <span className="text-base font-medium">Settings</span>
                </div>
                {isSettingsOpen ? <FaChevronDown className="text-sm" /> : <FaChevronRight className="text-sm" />}
              </li>

              {isSettingsOpen && (
                <ul className="pl-12 mt-2 space-y-2 border-l-2 border-gray-200">
                  <li onClick={() => handleNavigation('/admin/dashboard/settings/general')}
                    className={`flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors ${location.pathname === '/admin/dashboard/settings/general' ? 'text-[#020A47]' : ''}`}>
                    <FaCog className="text-base" />
                    <span className="text-sm font-medium">General Settings</span>
                  </li>
                  <li onClick={() => handleNavigation('/admin/dashboard/settings/sms')}
                    className={`flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors ${location.pathname === '/admin/dashboard/settings/sms' ? 'text-[#020A47]' : ''}`}>
                    <FaComments className="text-base" />
                    <span className="text-sm font-medium">SMS Settings</span>
                  </li>
                  <li onClick={() => handleNavigation('/admin/dashboard/settings/email')}
                    className={`flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors ${location.pathname === '/admin/dashboard/settings/email' ? 'text-[#020A47]' : ''}`}>
                    <FaCommentDots className="text-base" />
                    <span className="text-sm font-medium">Email Settings</span>
                  </li>
                  <li onClick={() => handleNavigation('/admin/dashboard/settings/payment')}
                    className={`flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors ${location.pathname === '/admin/dashboard/settings/payment' ? 'text-[#020A47]' : ''}`}>
                    <FaMoneyBill className="text-base" />
                    <span className="text-sm font-medium">Payment Methods</span>
                  </li>
                  <li onClick={() => handleNavigation('/admin/dashboard/settings/backup')}
                    className={`flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors ${location.pathname === '/admin/dashboard/settings/backup' ? 'text-[#020A47]' : ''}`}>
                    <FaHistory className="text-base" />
                    <span className="text-sm font-medium">Backup History</span>
                  </li>
                </ul>
              )}
            </div>

            <li onClick={() => handleNavigation('/')}
              className="flex items-center space-x-3 p-3 text-red-600 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors">
              <RiShareForwardBoxLine className="text-lg" />
              <span className="text-base font-medium">Logout</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;