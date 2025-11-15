import Footer from '@/components/common/Footer';
import Navbar from '@/components/common/Navbar';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet, useNavigate, useSearchParams } from 'react-router-dom';

export default function RoleLoginLayout() {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuthenticated) {
      const next = searchParams.get('next');
      if (next) {
        navigate(next);
      } else {
        navigate(`/${user?.role}-dashboard`);
      }
    }
  }, [isAuthenticated]);

  return (
    <div className="w-full flex flex-col min-h-screen">
      {/* Main content area; dynamic route content is injected via <Outlet /> */}
      <main className="w-full flex-1 flex flex-col items-center overflow-x-hidden">
        <Outlet />
      </main>
    </div>
  );
}
