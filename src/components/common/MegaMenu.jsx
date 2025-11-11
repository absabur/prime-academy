import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMegaCourses } from '../../redux/courses/courseAction';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { IoIosArrowRoundBack } from 'react-icons/io';
import InnerSection from './InnerSection';
import OuterSection from './OuterSection';

const MegaMenu = ({ isTransparent, textColor }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const menuRef = useRef(null);
  const hoverTimerRef = useRef(null); // <-- ADDED: To store the timer ID
  const dispatch = useDispatch();
  const location = useLocation();

  const { megaCourses, loadingMegaCourses } = useSelector((state) => state.course);

  useEffect(() => {
    if (megaCourses?.length === 0) {
      // Using strict equality
      dispatch(fetchMegaCourses());
    }
    // Dependency array is empty, this runs once.
    // Add [dispatch, megaCourses] if you intend to re-fetch if megaCourses changes.
  }, [dispatch, megaCourses]);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // --- ADDED: Handlers for hover logic ---

  // This function will handle opening the menu
  const handleOpenMenu = () => {
    // 1. Clear any "close" timer that might be running
    clearTimeout(hoverTimerRef.current);
    // 2. Open the menu (only set state if it's not already open)
    if (!isOpen) {
      setIsOpen(true);
    }
  };

  // This function will handle closing the menu
  const handleCloseMenu = () => {
    // 1. Clear any existing "open" timers (if you had them)
    clearTimeout(hoverTimerRef.current);
    // 2. Start a new timer to close the menu after a short delay (e.g., 200ms)
    hoverTimerRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 200); // 200ms delay gives time to move mouse
  };
  // ----------------------------------------

  // Desktop mega menu
  const DesktopMegaMenu = () => (
    <div
      ref={menuRef}
      className="relative"
      // --- UPDATED: Use new handlers ---
      onMouseOver={handleOpenMenu}
      onMouseLeave={handleCloseMenu}
      // ---------------------------------
    >
      <Link
        to="/courses"
        className={`navbar-item font-semibold transition-colors duration-200 flex items-center gap-1 ${
          location.pathname === '/courses' ? 'text-primary navbar-active' : textColor
        } ${textColor} ${isTransparent ? 'no-scroll' : ''}`}
      >
        Courses
        {/* <FiChevronDown
          className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        /> */}
      </Link>

      {/* Mega Menu Dropdown */}
      {isOpen && (
        <OuterSection
          className="fixed left-0 right-0 top-navbar w-full overflow-y-auto max-h-screen z-[200] flex-col"
          // --- UPDATED: Use new handlers ---
          onMouseOver={handleOpenMenu}
          onMouseLeave={handleCloseMenu}
          // ---------------------------------
        >
          <div className="h-10 w-full bg-transparent"></div>
          <OuterSection className='bg-white border-t border-primary/10 shadow-md'>
            <InnerSection className="w-full">
              {loadingMegaCourses ? (
                <div className="text-center py-8">
                  <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
                  <p className="mt-2 text-gray-600">Loading courses...</p>
                </div>
              ) : !megaCourses?.length ? (
                <div className="text-center py-8 text-gray-500">No courses available</div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {megaCourses.map((category) => (
                    <div key={category?.category?.id} className="space-y-3">
                      <h3 className="font-bold text-lg text-primary border-b-2 border-primary pb-2">
                        {category?.category?.name}
                      </h3>
                      <ul className="space-y-2">
                        {!category.courses?.length ? (
                          <li className="text-sm text-gray-400 italic">No courses yet</li>
                        ) : (
                          category.courses.map((course) => (
                            <li key={course.slug}>
                              <Link
                                to={`/courses/${course.slug}`}
                                className="text-sm text-gray-700 hover:text-primary hover:translate-x-1 transition-all duration-200 flex items-start gap-sm group"
                                onClick={() => setIsOpen(false)}
                              >
                                <span className="text-secondary group-hover:scale-125 transition-transform">
                                  •
                                </span>
                                <span className="line-clamp-2">{course.title}</span>
                              </Link>
                            </li>
                          ))
                        )}
                      </ul>
                    </div>
                  ))}
                </div>
              )}

              {/* View All Courses Link */}
              <div className="mt-6 pt-6 border-t border-gray-200 text-center">
                <Link
                  to="/courses"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-secondary transition-colors font-semibold"
                  onClick={() => setIsOpen(false)}
                >
                  View All Courses
                </Link>
              </div>
            </InnerSection>
          </OuterSection>
        </OuterSection>
      )}
    </div>
  );

  // Mobile mega menu (UNCHANGED)
  const MobileMegaMenu = () => (
    <div className="w-full">
      <Link
        to={`/courses`}
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className={`text-left w-fit mx-auto navbar-item font-semibold text-lg text-black flex items-center justify-center ${
          location.pathname === '/courses' ? 'text-primary navbar-active' : 'text-black'
        }`}
      >
        Courses
        {/* {isMobileOpen ? <FiChevronUp /> : <FiChevronDown />} */}
      </Link>

      {/* Mobile Dropdown */}
      <div
        className={`fixed bottom-0 top-0 left-0 w-full h-[calc(100dvh-130px)] z-1000 bg-white overflow-y-auto transition-all duration-300 ${
          isMobileOpen ? 'opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <button
          className="flex gap-md items-center rounded-md px-md py-xs shadow-md ml-md"
          onClick={() => setIsMobileOpen(false)}
        >
          <IoIosArrowRoundBack /> Back
        </button>
        <div className="p-md pt-3 space-y-4">
          {loadingMegaCourses ? (
            <div className="text-center py-4">
              <div className="inline-block h-6 w-6 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
            </div>
          ) : (
            <>
              {megaCourses.map((category) => (
                <div key={category?.category?.id} className="space-y-2">
                  <h4 className="font-bold text-primary text-sm border-b border-gray-300 pb-1">
                    {category?.category?.name}
                  </h4>
                  <ul className="space-y-1.5 pl-3">
                    {!category.courses?.length ? (
                      <li className="text-xs text-gray-400 italic">No courses yet</li>
                    ) : (
                      category.courses.map((course) => (
                        <li key={course.slug}>
                          <Link
                            to={`/courses/${course.slug}`}
                            className="text-sm text-gray-700 hover:text-primary flex items-start gap-sm"
                            onClick={() => setIsMobileOpen(false)}
                          >
                            <span className="text-secondary group-hover:scale-125 transition-transform">
                              •
                            </span>
                            <span className="line-clamp-2">{course.title}</span>
                          </Link>
                        </li>
                      ))
                    )}
                  </ul>
                </div>
              ))}
              <Link
                to="/courses"
                className="block text-center py-2 bg-primary text-white rounded-md text-sm font-semibold hover:bg-secondary transition-colors mt-4"
                onClick={() => setIsMobileOpen(false)}
              >
                View All Courses
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );

  return {
    DesktopMegaMenu,
    MobileMegaMenu,
  };
};

export default MegaMenu;
