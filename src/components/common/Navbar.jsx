import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import OuterSection from './OuterSection';
import InnerSection from './InnerSection';
import { FiMenu, FiX } from 'react-icons/fi';
import { useSelector } from 'react-redux';
import { capitalizeFirst } from '@/utils/capitalizeFirst';
import './css/navbar.css';

const Navbar = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  // ✅ UPDATED: This effect now handles all logic based on route changes
  useEffect(() => {
    if (isHome) {
      // We are ON the home page
      const handleScroll = () => setScrolled(window.scrollY > 20);

      // Check scroll position immediately on navigation to home
      handleScroll();

      // Add listener for scrolling
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    } else {
      // We are NOT on the home page
      // Force the "scrolled" state (solid background, dark text)
      setScrolled(true);
    }
  }, [isHome]); // This effect re-runs every time `isHome` changes (i.e., on navigation)

  // ✅ REFACTORED: Simplified logic
  // The navbar is only transparent if we are on the home page AND not scrolled
  const isTransparent = isHome && !scrolled;

  // Background class
  const bgClass = isTransparent ? 'bg-transparent' : 'bg-white shadow-lg';

  // Logo change
  const logoSrc = isTransparent
    ? '/assets/prime-academy-logo-full.png'
    : '/assets/prime-academy-logo-full-dark.png';

  // Text color
  const textColor = isTransparent ? 'text-white' : 'text-black';

  const navLinks = [
    { text: 'About', url: '/about' },
    // { text: 'Blogs', url: '/blogs' },
    { text: 'Courses', url: '/courses' },
    { text: 'Faqs', url: '/faqs' },
    { text: 'Contact', url: '/contact' },
    {
      text: isAuthenticated ? 'Dashboard' : 'Login',
      url: isAuthenticated ? `/${user?.role}-dashboard` : '/login',
    },
  ];

  return (
    <OuterSection
      className={`fixed top-0 left-0 w-full transition-colors duration-300 z-[100] ${bgClass}`}
      style={{ overflow: 'visible' }}
    >
      <InnerSection Tag="header" className="h-navbar py-sm flex justify-between items-center">
        {/* Logo */}
        <Link to="/" aria-label="Go to Home" onClick={() => setMenuOpen(false)}>
          <img src={logoSrc} className="w-[190px]" alt="Prime Logo" />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center justify-center gap-xl">
          {navLinks.map(({ text, url }) => {
            const isActive = location.pathname === url;
            return (
              <Link
                key={url}
                to={url}
                className={`navbar-item font-semibold transition-colors duration-200 ${
                  isActive ? 'text-primary navbar-active' : textColor
                } ${isTransparent ? 'no-scroll' : ''}`} // ✅ Uses refactored variable
              >
                {capitalizeFirst(text)}
              </Link>
            );
          })}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle Menu"
        >
          {menuOpen ? (
            <FiX className={`w-7 h-7 ${textColor}`} />
          ) : (
            <FiMenu className={`w-7 h-7 ${textColor}`} />
          )}
        </button>
      </InnerSection>

      {/* Mobile Nav Drawer */}
      {menuOpen && (
        <div className={`md:hidden bg-white shadow-lg absolute w-full top-navbar`}>
          <nav className="flex flex-col items-center gap-lg p-lg">
            {navLinks.map(({ text, url }) => {
              const isActive = location.pathname === url;
              return (
                <Link
                  key={url}
                  to={url}
                  onClick={() => setMenuOpen(false)}
                  className={`text-center navbar-item font-semibold text-lg ${
                    isActive ? 'text-primary navbar-active' : 'text-black'
                  } ${isTransparent ? 'no-scroll' : ''}`} // ✅ Uses refactored variable
                >
                  {capitalizeFirst(text)}
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </OuterSection>
  );
};

export default Navbar;
