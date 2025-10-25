import LandingFooter from '@/components/Root/landing/LandingFooter';
import LandingNavbar from '@/components/Root/landing/LandingNavbar';
import { Outlet } from 'react-router-dom';

export default function LandingLayout() {
  return (
    <div className="w-full flex flex-col min-h-screen">
      {/* Persistent navigation bar at the top */}
      <LandingNavbar />

      {/* Main content area; dynamic route content is injected via <Outlet /> */}
      <main className="w-full flex-1 flex flex-col items-center overflow-x-hidden">
        <Outlet />
      </main>

      {/* Footer */}
      <LandingFooter />
    </div>
  );
}
