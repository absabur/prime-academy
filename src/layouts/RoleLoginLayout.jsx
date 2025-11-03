import Footer from '@/components/common/Footer';
import Navbar from '@/components/common/Navbar';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

export default function RoleLoginLayout() {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  return isAuthenticated ? (
    <Navigate to={`/${user?.role}-dashboard`} replace />
  ) : (
    <div className="w-full flex flex-col min-h-screen">
      {/* Main content area; dynamic route content is injected via <Outlet /> */}
      <main className="w-full flex-1 flex flex-col items-center overflow-x-hidden">
        <Outlet />
      </main>
    </div>
  );
}
