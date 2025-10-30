/**
 * Navbar Component
 * ----------------
 * - Displays the application logo and main navigation links
 * - Changes style dynamically based on:
 *    1. Current route (home vs. other pages)
 *    2. Scroll position (transparent vs. solid background on home)
 * - Provides consistent navigation across all pages
 */

import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import OuterSection from './OuterSection';
import InnerSection from './InnerSection';
import { FiMenu, FiX } from 'react-icons/fi'; // ✅ react-icons
import { useSelector } from 'react-redux';
import { capitalizeFirst } from '@/utils/capitalizeFirst';
import './css/navbar.css';

const Navbar = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  // Scroll effect only on home
  useEffect(() => {
    if (!isHome) return;

    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHome]);

  // Background class
  const bgClass = isHome
    ? scrolled
      ? 'bg-white shadow-lg'
      : 'bg-transparent'
    : 'bg-white shadow-lg';

  // Logo change
  const logoSrc =
    isHome && !scrolled
      ? '/assets/prime-academy-logo-full.png'
      : '/assets/prime-academy-logo-full-dark.png';

  // Text color on home
  const textColor = isHome && !scrolled ? 'text-white' : 'text-black';

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
                } ${isHome && !scrolled ? 'no-scroll' : ''}`}
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
                  } ${isHome && !scrolled ? 'no-scroll' : ''}`}
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
