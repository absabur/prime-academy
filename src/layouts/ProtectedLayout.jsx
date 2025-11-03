import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import DashBroadNavbar from '@/components/Dashboard/common/DashBroadNavbar';
import SideBar from '@/components/Dashboard/common/SideBar';
import NotFound from '../components/common/NotFound';
import LoadingDashboard from '../components/Dashboard/common/LoadingDashboard';

export default function ProtectedLayout() {
  const { isAuthenticated, authLoaded } = useSelector((state) => state.auth);
  const { pathname } = useLocation();

  // 🔹 Wait for Redux auth state
  if (!authLoaded) {
    return <LoadingDashboard loading={true} />;
  }

  // 🔹 Redirect if unauthenticated
  // if (!isAuthenticated) return <Navigate to="/" replace />;
  if (!isAuthenticated) {
    if (
      pathname == '/admin-dashboard' ||
      pathname == '/teacher-dashboard' ||
      pathname == '/stuff-dashboard'
    ) {
      return <Navigate to="/auth/login/verify-role" replace />;
    }

    if (pathname == '/student-dashboard') {
      return <Navigate to="/login" replace />;
    }
    return <NotFound />;
  }

  // 🔹 Main Dashboard Layout
  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-900 w-full">
      {/* Sidebar (Responsive) */}
      <SideBar />

      {/* Main Content */}
      <div className="bg-secondary-bg flex flex-col w-full max-w-[100vw] md:max-w-[calc(100vw_-_300px)] transition-all duration-300">
        <DashBroadNavbar />

        <main className="flex-1 p-lg md:p-6 overflow-x-hidden bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
