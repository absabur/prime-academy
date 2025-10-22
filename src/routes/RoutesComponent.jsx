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
import PrivacyPolicy from '../pages/Root/Privacy Policy/PrivacyPolicy';
import RefundPolicy from '../pages/Root/refund/RefundPolicy';
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
import Dashboard from '@/pages/Dashboard/Dashboard/Dashboard';
import Courses from '@/pages/Dashboard/Courses/Courses';
import Students from '@/pages/Dashboard/Students/Students';
import Teachers from '@/pages/Dashboard/Teachers/Teachers';
import Employees from '@/pages/Dashboard/Employees/Employees';
import BlogDashboard from '@/pages/Dashboard/BlogDashboard/BlogDashboard';
import Reports from '@/pages/Dashboard/Reports/Reports';
import SettingsDashBroad from '@/pages/Dashboard/SettingsDashBroad/SettingsDashBroad';
import ForgatePassword from '@/pages/Root/ForgatePassword/ForgatePassword';
import ResetPassword from '@/pages/Root/ResetPassword/ResetPassword';

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
      </Route>

      {/* 🚀 LANDING PAGE */}
      <Route element={<LandingLayout />}>
        <Route path="landing-page" element={<LandingPage />} />
      </Route>

      {/* 🔑 AUTH ROUTES */}
      <Route element={<AuthLayout />}>
        <Route path="/login/role" element={<LoginRole />} />
        <Route path="/login" element={<LoginStudent />} />
        <Route path="/register" element={<RegisterStudent />} />
        <Route path="/verify-student" element={<VerifyEmail />} />
        <Route path="/forgot-password" element={<ForgatePassword />} />
        <Route path="/password-reset-confirm" element={<ResetPassword />} />
      </Route>

      {/* 🔐 PROTECTED ROUTES (DASHBOARD) */}
      <Route element={<ProtectedLayout />}>
        {/* Common Dashboard Route */}
        <Route path="/dashboard" element={<Dashboard />} />
        {/* Admin Routes */}
        <Route path="/dashboard/courses" element={<Courses />} />
        <Route path="/dashboard/students" element={<Students />} />
        <Route path="/dashboard/teachers" element={<Teachers />} />
        <Route path="/dashboard/employees" element={<Employees />} />
        <Route path="/dashboard/blog" element={<BlogDashboard />} />
        <Route path="/dashboard/reports" element={<Reports />} />
        <Route path="/dashboard/settings" element={<SettingsDashBroad />} />

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
