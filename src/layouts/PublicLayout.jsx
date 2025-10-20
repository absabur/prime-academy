/**
 * PublicLayout
 * -------------
 * - Defines the shared layout for all public-facing pages
 * - Includes a Navbar (header), main content area, and Footer
 * - Uses <Outlet /> from react-router-dom to render child routes
 * - Ensures consistent UI and responsive structure across pages
 */

import { Outlet } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";

const PublicLayout = () => {
  return (
    <div className="w-full flex flex-col min-h-screen">
      {/* Persistent navigation bar at the top */}
      <Navbar />

      {/* Main content area; dynamic route content is injected via <Outlet /> */}
      <main className="w-full flex-1 flex flex-col items-center overflow-x-hidden">
        <Outlet />
      </main>

      {/* Persistent footer at the bottom */}
      <Footer />
    </div>
  );
};

export default PublicLayout;
