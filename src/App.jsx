import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Footer from './components/Common/Footer.jsx';
import HomePage from './components/HomePage.jsx';
import CoursesPage from './components/CoursesPage.jsx';
import BundlesPage from './components/BundlesPage.jsx';
import AboutPage from './components/AboutPage.jsx';
import CourseDetailsPage from './components/CourseDetails/CourseDetails.jsx';
import Checkout from "./components/Common/Checkout.jsx";
import Practice from './components/PracticePage/Practice.jsx';
import QuizPage from './components/PracticePage/QuizPage.jsx';
import Confirmpass from './components/LoginPage/Confirmpass.jsx';
import Joinnow from './components/LoginPage/Joinnow.jsx';
import Login from './components/LoginPage/Login.jsx';
import ForgetResetPassword from './components/LoginPage/ForgetResetPassword.jsx';
import Forgetpass from './components/LoginPage/Forgetpass.jsx';
import Forgetpassotp from './components/LoginPage/ForgetpassOtp.jsx';
import ProtectedRoute from './components/Common/ProtectedRoute.jsx';
import Nav from './components/Common/Nav.jsx';
import Dashboard from './Dashboard/Dashboard.jsx';
import AdminDashboard from './AdminDashboard/DashboardPage/Dashboard.jsx';
import Chat from './Chatbot/Chat.jsx';
import DashboardPractice from './Dashboard/PracticePage/Practice.jsx';
import MyCourses from './Dashboard/MyCourses/MyCourses.jsx';
import CourseDetails from './Dashboard/MyCourses/CourseDetails.jsx';
import MyProject from './Dashboard/MyProject/MyProject.jsx'
import Wishlist from './Dashboard/Wishlist/Wishlist.jsx';
import AwardPoints from './Dashboard/AwardPoints/AwardPoints.jsx'
import Certification from './Dashboard/Certification/Certification.jsx';
import PurchaseHistory from './Dashboard/PurchaseHistory/PurchaseHistory.jsx';
import Affiliate from './Dashboard/Affiliate/Affiliate.jsx';
import Setting from './Dashboard/Setting/Setting.jsx';
import Support from './Dashboard/Support/Support.jsx';
import TicketDetails from './Dashboard/Support/TicketDetails.jsx';
import Payout from './AdminDashboard/Payout/Payout.jsx';

import AddCourse from './AdminDashboard/Courses/AddNewCourse/AddCourse.jsx';
import Category from './AdminDashboard/Category/CategoryPage.jsx';
import ManageCourse from './AdminDashboard/Courses/ManageCourse/ManageCourse.jsx';
import AddQuiz from './AdminDashboard/Courses/AddNewQuiz/AddQuiz.jsx'
import AddProject from './AdminDashboard/Courses/AddNewProject/AddProject.jsx';
import AddNewVideo from './AdminDashboard/Courses/AddNewVideo/AddNewVideo.jsx';
import EditCourse from './AdminDashboard/Courses/ManageCourse/EditCourse/EditCourse.jsx';
import Students from './AdminDashboard/Students/Students.jsx';
import AddStudent from './AdminDashboard/Students/AddStudent.jsx';
import EditStudent from './AdminDashboard/Students/EditStudent.jsx';
import AddBundle from './AdminDashboard/CourseBundle/AddBundle.jsx';
import NewsLetter from './AdminDashboard/NewsLetter/NewsLetter.jsx';
import PaymentPage from './AdminDashboard/PaymentHistory/PaymentPage.jsx';
import CourseBundle from './AdminDashboard/CourseBundle/CourseBundle.jsx';
import ManageCoupon from './AdminDashboard/Courses/Coupon/ManageCoupon.jsx';
import AddCoupon from './AdminDashboard/Courses/Coupon/AddCoupon.jsx';
import EditCoupon from './AdminDashboard/Courses/Coupon/EditCoupon.jsx';
import ManageBundles from './AdminDashboard/CourseBundle/ManageBundles.jsx';
import ManageSubscribers from './AdminDashboard/CourseBundle/ManageSubscribers.jsx';
import UsersStudents from './AdminDashboard/Users/Students/Students.jsx';
import UsersAddStudent from './AdminDashboard/Users/Students/AddStudent.jsx';
import UsersEditStudent from './AdminDashboard/Users/Students/EditStudent.jsx';
import Admin from './AdminDashboard/Users/Admin/Admin.jsx';
import AddAdmin from './AdminDashboard/Users/Admin/AddAdmin.jsx';
import EditAdmin from './AdminDashboard/Users/Admin/EditAdmin.jsx';
import AssignPermission from './AdminDashboard/Users/Admin/Assignpermission.jsx';
import EditBundle from './AdminDashboard/CourseBundle/EditBundle.jsx';
import PracticePage from './AdminDashboard/PracticePage/PracticePage.jsx';
import AdminWishlist from './AdminDashboard/Wishlist/Wishlist.jsx';
import PageBanner from './AdminDashboard/FrontCMS/PageBanner/PageBanner.jsx';
import AboutPageContent from './AdminDashboard/FrontCMS/AboutPage/AboutPageContent.jsx';
import Experts from './AdminDashboard/FrontCMS/Experts/Experts.jsx';
import Partners from './AdminDashboard/FrontCMS/Partners/Partners.jsx';
import FAQ from './AdminDashboard/FrontCMS/FAQ/FAQ.jsx'
import WhyArambhSkills from './AdminDashboard/FrontCMS/WhyArambhSkills/Content.jsx'
import AdminTestimonials from './AdminDashboard/FrontCMS/Testimonials/Testimonials.jsx';
import Contact from './AdminDashboard/FrontCMS/Contact/Contact.jsx';

// Import the new AdminLayout
import AdminLayout from './AdminDashboard/AdminLayout.jsx';

const App = () => {
  const [cartCount, setCartCount] = useState(0);

  const incrementCartCount = () => {
    setCartCount(cartCount + 1);
  };

  const decrementCartCount = () => {
    setCartCount(cartCount > 0 ? cartCount - 1 : 0);
  };

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        
        <div className="flex-grow">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forget-password" element={<Forgetpass />} />
            <Route path="/forgetpass-otp" element={<Forgetpassotp />} />
            <Route path="/forget-reset-password" element={<ForgetResetPassword />} />
            <Route path="/joinnow" element={<Joinnow />} />
            <Route path="/confirmpass" element={<Confirmpass />} />
            <Route path="/courses" element={<CoursesPage incrementCartCount={incrementCartCount} />} />
            <Route path="/courses/:courseId" element={<CourseDetailsPage />} />
            <Route path="/checkout" element={<ProtectedRoute element={Checkout} />} />
            <Route path="/bundles" element={<BundlesPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/practice" element={<ProtectedRoute element={Practice} />} />
            <Route path="/quiz/:topicName" element={<QuizPage />} />

            {/* Dashboard routes */}
            <Route path="/chat" element={<Chat />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/practice" element={<DashboardPractice />} />
            <Route path="/dashboard/mycourses" element={<MyCourses />} />
            <Route path="/dashboard/projects" element={<MyProject />} />
            <Route path="/dashboard/wishlist" element={<Wishlist />} />
            <Route path="/dashboard/award-points" element={<AwardPoints />} />
            <Route path="/dashboard/purchase-history" element={<PurchaseHistory />} />
            <Route path="/dashboard/certification" element={<Certification />} />
            <Route path="/dashboard/affiliate" element={<Affiliate />} />
            <Route path="/dashboard/setting" element={<Setting />} />
            <Route path="/dashboard/support" element={<Support />} />
            <Route path="/dashboard/support/ticket-details" element={<TicketDetails />} />
            <Route path="/dashboard/courses/:courseId" element={<CourseDetails />} />

            {/* Admin Dashboard Layout Route */}
            <Route path="/admin/dashboard" element={<AdminLayout />}>
              {/* Admin Dashboard nested routes */}
              <Route index element={<AdminDashboard />} /> {/* Admin Dashboard Home */}              
              <Route path="category" element={<Category/>} />
              <Route path="manageCourse" element={<ManageCourse/>} />
              <Route path="withdrawal/request" element={<Payout />} />
              <Route path="courses/add" element={<AddCourse />} />
              <Route path="quiz/add" element={<AddQuiz />} />
              <Route path="project/add" element={<AddProject />} />
              <Route path="video/add" element={<AddNewVideo />} />
              <Route path="courseedit" element={<EditCourse />} /> {/* Consider using dynamic segment like :id */}
              <Route path="students" element={<Students />} />
              <Route path="students/add" element={<AddStudent />} />
              <Route path="students/Edit" element={<EditStudent />} /> {/* Consider using dynamic segment like :id */}
              <Route path="bundle/add" element={<CourseBundle />} />
              <Route path="bundle/edit/:id" element={<EditBundle />} />
              <Route path="bundle/manage" element={<ManageBundles />} />
              <Route path="paymenthistory" element={<PaymentPage />} />
              <Route path="newsletter" element={<NewsLetter />} />
              <Route path="coupon" element={<ManageCoupon />} />
              <Route path="coupon/add" element={<AddCoupon />} />
              <Route path="coupon/edit/:id" element={<EditCoupon />} />
              <Route path="subscriber" element={<ManageSubscribers />} />
              <Route path="users/students" element={<UsersStudents />} />
              <Route path="users/students/add" element={<UsersAddStudent />} />
              <Route path="users/students/edit" element={<UsersEditStudent />} /> {/* Consider using dynamic segment like :id */}
              <Route path="users/admin" element={<Admin />} />
              <Route path="users/admin/add" element={<AddAdmin />} />
              <Route path="users/admin/edit" element={<EditAdmin />} /> {/* Consider using dynamic segment like :id */}
              <Route path="users/admin/assignpermission" element={<AssignPermission />} />
              <Route path="practice" element={<PracticePage />} />
              <Route path="wishlist" element={<AdminWishlist />} />
              <Route path="front-cms/page-banner" element={<PageBanner />} />
              <Route path="front-cms/about-page-content" element={<AboutPageContent />} />
              <Route path="front-cms/Experts" element={<Experts />} />
              <Route path="front-cms/partners" element={<Partners />} />
              <Route path="front-cms/faq" element={<FAQ />} />
              <Route path="front-cms/WhyArambhSkills" element={<WhyArambhSkills />} />
              <Route path="front-cms/testimonials" element={<AdminTestimonials />} />
              <Route path="front-cms/Contact" element={<Contact />} />
            </Route>


          </Routes>




        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;