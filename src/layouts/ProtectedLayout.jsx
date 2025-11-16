import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LoadingDashboard from '../components/Dashboard/common/LoadingDashboard';
import OuterSection from '../components/common/OuterSection';
import InnerSection from '../components/common/InnerSection';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import NotFound from '../components/common/NotFound';
import { clearAuthMessage, clearAuthError } from '@/redux/auth/authSlice';
import SwalUtils from '@/utils/sweetAlert';
import { useEffect } from 'react';

export default function ProtectedLayout() {
  const { isAuthenticated, authLoaded, user } = useSelector((state) => state.auth);
  const { pathname, search, state } = useLocation();
  const { message, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  // 🔹 Current full path with query (e.g. "/checkout?course=5")
  const next = pathname + search;

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

  // 🔹 Redirect if unauthenticated
  if (!isAuthenticated) {
    if (pathname.startsWith('/checkout')) {
      return (
        <Navigate
          to={`/login?next=${encodeURIComponent(next)}`}
          replace
          state={{ fromState: state }} // 🔥 preserve checkout state
        />
      );
    } else {
      return <Navigate to={`/login?next=${encodeURIComponent(next)}`} replace />;
    }

    return <NotFound />;
  }

  if (isAuthenticated && user?.role !== 'student') {
    return <NotFound />;
  }

  // 🔹 Authenticated → Page content
  return (
    <div className="w-full flex flex-col min-h-screen">
      <Navbar />
      <main className="w-full flex-1 flex flex-col items-center overflow-x-hidden">
        <OuterSection>
          <InnerSection>
            <Outlet />
          </InnerSection>
        </OuterSection>
      </main>

      <Footer />
    </div>
  );
}
