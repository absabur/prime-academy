import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import DashBroadNavbar from '@/components/Dashboard/common/DashBroadNavbar';
import SideBar from '@/components/Dashboard/common/SideBar';
import NotFound from '../components/common/NotFound';

export default function ProtectedLayout() {
  const { isAuthenticated, authLoaded } = useSelector((state) => state.auth);

  // 🔹 Wait for Redux auth state
  if (!authLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen text-lg font-semibold">
        Loading...
      </div>
    );
  }

  // 🔹 Redirect if unauthenticated
  // if (!isAuthenticated) return <Navigate to="/" replace />;
  if (!isAuthenticated) return <NotFound />;

  // 🔹 Main Dashboard Layout
  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-900 w-full">
      {/* Sidebar (Responsive) */}
      <SideBar />

      {/* Main Content */}
      <div className="flex flex-col w-full max-w-[100vw] md:max-w-[calc(100vw_-_300px)] transition-all duration-300">
        <DashBroadNavbar />

        <main className="flex-1 p-lg md:p-6 overflow-x-hidden bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
