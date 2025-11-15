import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import DashBroadNavbar from '@/components/Dashboard/common/DashBroadNavbar';
import SideBar from '@/components/Dashboard/common/SideBar';
import NotFound from '../components/common/NotFound';
import LoadingDashboard from '../components/Dashboard/common/LoadingDashboard';
import { clearAuthMessage, clearAuthError } from '@/redux/auth/authSlice';
import SwalUtils from '@/utils/sweetAlert';
import { useEffect } from 'react';

export default function ProtectedLayoutDashboard() {
  const { isAuthenticated, authLoaded } = useSelector((state) => state.auth);
  const { pathname, search } = useLocation();
  const { message, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  // Full current URL path + query preserved
  const next = pathname + search; // e.g. /admin/users?page=2
  useEffect(() => {
    if (message) {
      SwalUtils.success(message);
      dispatch(clearAuthMessage());
    }
  }, [message]);

  useEffect(() => {
    if (error) {
      SwalUtils.error(error);
      dispatch(clearAuthError());
    }
  }, [error]);

  if (!authLoaded) {
    return <LoadingDashboard loading={true} />;
  }

  if (!isAuthenticated) {
    // Admin / Teacher / Stuff
    if (
      pathname.startsWith('/admin') ||
      pathname.startsWith('/teacher') ||
      pathname.startsWith('/stuff')
    ) {
      return <Navigate to={`/auth/login/verify-role?next=${encodeURIComponent(next)}`} replace />;
    }

    // Student
    if (pathname.startsWith('/student')) {
      return <Navigate to={`/login?next=${encodeURIComponent(next)}`} replace />;
    }

    return <NotFound />;
  }

  // Authenticated → Show layout
  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-900 w-full">
      <SideBar />
      <div className="bg-secondary-bg flex flex-col w-full max-w-[100vw] md:max-w-[calc(100vw_-_300px)] transition-all duration-300">
        <DashBroadNavbar />
        <main className="flex-1 p-lg md:p-6 overflow-x-hidden bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
