/**
 * RoutesComponent
 * ----------------
 * - Centralized configuration of application routes
 * - Handles layout-based route grouping (Public, Auth, Protected, Landing)
 * - Scroll-to-top on navigation
 * - Includes all project pages with fallback 404
 */

import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

// Layouts
import PublicLayout from '../layouts/PublicLayout';
import AuthLayout from '../layouts/AuthLayout';
import ProtectedLayout from '../layouts/ProtectedLayout';
import LandingLayout from '../layouts/LandingLayout';

// Common pages
import NotFound from '../components/common/NotFound';

// 🌐 Public Pages
import HomePage from '../pages/Root/Home/Home';
import BlogPage from '../pages/Root/Blogs/Blogs';
import Blog from '../pages/Root/Blog/Blog';
import Contact from '../pages/Root/Contact/Contact';
import FAQs from '../pages/Root/FAQs/FAQs';
import About from '../pages/Root/About/About';
import PrivacyPolicy from '../pages/Root/PrivacyPolicy/PrivacyPolicy';
import RefundPolicy from '../pages/Root/RefundPolicy/RefundPolicy';
import SingleCourse from '@/pages/Root/singleCourse/SingleCourse';
import CoursesPage from '@/pages/Root/Courses/Courses';

// 🌟 Landing Page
import LandingPage from '@/pages/Root/Landing/Landing';

// 🔑 Auth Pages
import LoginRole from '@/pages/Root/LoginRole/LoginRole';
import LoginStudent from '@/pages/Root/LoginStudent/LoginStudent';
import RegisterStudent from '@/pages/Root/RegisterStudent/RegisterStudent';
import VerifyEmail from '@/pages/Root/VerifyStudent/VerifyEmail';

// 🧭 Dashboard (Protected Pages)
import AdminPanelDashboard from '@/pages/Dashboard/AdminDashboard/AdminPanelDashboard/AdminPanelDashboard';
import AdminPanelCourses from '@/pages/Dashboard/AdminDashboard/AdminPanelCourses/AdminPanelCourses';
import AdminPanelStudents from '@/pages/Dashboard/AdminDashboard/AdminPanelStudents/AdminPanelStudents';
import AdminPanelTeachers from '@/pages/Dashboard/AdminDashboard/AdminPanelTeachers/AdminPanelTeachers';
import AdminPanelEmployees from '@/pages/Dashboard/AdminDashboard/AdminPanelEmployees/AdminPanelEmployees';
import AdminPanelBlogs from '@/pages/Dashboard/AdminDashboard/AdminPanelBlogs/AdminPanelBlogs';
import AdminPanelReports from '@/pages/Dashboard/AdminDashboard/AdminPanelReports/AdminPanelReports';
import ForgatePassword from '@/pages/Root/ForgatePassword/ForgatePassword';
import ResetPassword from '@/pages/Root/ResetPassword/ResetPassword';
import RoleBasedLayout from '@/layouts/RoleBasedLayout';
import AdminPanelFooter from '@/pages/Dashboard/AdminDashboard/AdminPanelFooter/AdminPanelFooter';
import AdminPanelPartner from '@/pages/Dashboard/AdminDashboard/AdminPanelPartners/AdminPanelPartners';
import AdminPanelHero from '@/pages/Dashboard/AdminDashboard/AdminPanelHero/AdminPanelHero';
import AdminContactMessages from '@/pages/Dashboard/AdminDashboard/AdminContactMessages/AdminContactMessages';
import FaqManager from '@/pages/Dashboard/AdminDashboard/AdminPanelFaqs/AdminPanelFaqs';
import AdminPanelSkills from '@/pages/Dashboard/AdminDashboard/AdminPanelSkills/AdminPanelSkills';
import AdminPanelPolicies from '@/pages/Dashboard/AdminDashboard/AdminPanelPolicies/AdminPanelPolicies';
import Policy from '../pages/Root/Policies/Policy';

function RoutesComponent() {
  const { pathname } = useLocation();

  // 🌀 Scroll to top whenever route changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <Routes>
      {/* 🌐 PUBLIC ROUTES */}
      <Route path="/" element={<PublicLayout />}>
        <Route index element={<HomePage />} />
        <Route path="blogs" element={<BlogPage />} />
        <Route path="blogs/:id" element={<Blog />} />
        <Route path="contact" element={<Contact />} />
        <Route path="faqs" element={<FAQs />} />
        <Route path="about" element={<About />} />
        <Route path="privacy-policy" element={<PrivacyPolicy />} />
        <Route path="refund-policy" element={<RefundPolicy />} />
        <Route path="courses" element={<CoursesPage />} />
        <Route path="courses/:id" element={<SingleCourse />} />
        <Route path="policy/:page_name" element={<Policy />} />
      </Route>

      {/* 🚀 LANDING PAGE */}
      <Route element={<LandingLayout />}>
        <Route path="landing-page" element={<LandingPage />} />
      </Route>

      {/* 🔑 AUTH ROUTES */}
      <Route element={<AuthLayout />}>
        <Route path="/auth/login/verify-role" element={<LoginRole />} />
        <Route path="/login" element={<LoginStudent />} />
        <Route path="/register" element={<RegisterStudent />} />
        <Route path="/verify-student" element={<VerifyEmail />} />
        <Route path="/forgot-password" element={<ForgatePassword />} />
        <Route path="/password-reset-confirm" element={<ResetPassword />} />
      </Route>

      {/* 🔐 PROTECTED ROUTES (DASHBOARD) */}
      <Route element={<ProtectedLayout />}>
        {/* Admin Routes */}
        <Route element={<RoleBasedLayout roles={['admin']} />}>
          {/* main menues  */}
          <Route path="/dashboard" element={<AdminPanelDashboard />} />
          <Route path="/dashboard/courses" element={<AdminPanelCourses />} />
          <Route path="/dashboard/students" element={<AdminPanelStudents />} />
          <Route path="/dashboard/teachers" element={<AdminPanelTeachers />} />
          <Route path="/dashboard/employees" element={<AdminPanelEmployees />} />
          <Route path="/dashboard/blog" element={<AdminPanelBlogs />} />
          <Route path="/dashboard/reports" element={<AdminPanelReports />} />
          {/* sub menues */}
          <Route path="/dashboard/footer" element={<AdminPanelFooter />} />
          <Route path="/dashboard/partners" element={<AdminPanelPartner />} />
          <Route path="/dashboard/hero-sections" element={<AdminPanelHero />} />
          <Route path="/dashboard/messages" element={<AdminContactMessages />} />
          <Route path="/dashboard/faqs" element={<FaqManager />} />
          <Route path="/dashboard/policies" element={<AdminPanelPolicies />} />
          <Route path="/dashboard/skills" element={<AdminPanelSkills />} />
        </Route>

        {/* Teacher Routes */}

        {/* Student Routes */}

        {/* Account Routes */}

        {/* Stuff Routes */}
      </Route>

      {/* 🚫 404 - Not Found */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default RoutesComponent;
