import Footer from '@/components/common/Footer';
import Navbar from '@/components/common/Navbar';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, useNavigate, useSearchParams } from 'react-router-dom';

export default function AuthLayout() {
  const { isAuthenticated, user, cart_merged } = useSelector((state) => state.auth);

  const [searchParams] = useSearchParams(); // ✅ FIXED
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      const next = searchParams.get('next');
      if (next) {
        navigate(next);
      } else if (cart_merged) {
        navigate('/cart');
      } else {
        navigate(`/${user?.role}-dashboard`);
      }
    }
  }, [isAuthenticated]);

  return (
    <div className="w-full flex flex-col min-h-screen">
      <Navbar />
      <main className="w-full flex-1 flex flex-col items-center overflow-x-hidden mt-fnavbar">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
