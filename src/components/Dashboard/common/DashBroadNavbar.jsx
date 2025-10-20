import { onSidebarToggle, SidebarClose } from '@/redux/common/commonSlice';
import { Menu, X, User, Edit, LogOut } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useRef, useEffect } from 'react';
import { FaDownLong } from 'react-icons/fa6';
import { FaChevronDown, FaSearch } from 'react-icons/fa';
import { clearAuthMessage, logout } from '@/redux/auth/authSlice';
import SwalUtils from '@/utils/sweetAlert';
import { useLocation } from 'react-router-dom';

const DashBroadNavbar = () => {
  // auth & coommon state from redux
  const dispatch = useDispatch();
  const { sidebarIsOpen } = useSelector((state) => state.common);
  const { user, message } = useSelector((state) => state.auth);
  const { pathname } = useLocation();

  useEffect(() => {
    if (message) {
      SwalUtils.success(message);
      dispatch(clearAuthMessage());
    }
  }, [message]);

  useEffect(() => {
    dispatch(SidebarClose());
  }, [pathname]);

  // 🔹 Dropdown auto-close when clicking outside
  const [openDropdown, setOpenDropdown] = useState(false);
  const dropdownRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpenDropdown(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <nav className="sticky top-0 z-30 bg-white border-b border-black/10 shadow-sm flex items-center justify-between px-lg  py-base">
      {/* 🔹 Left: Sidebar Toggle (for Mobile only) */}
      <button
        className="md:hidden p-2 rounded-lg border border-gray-200 bg-gray-50 hover:bg-gray-100 transition-colors"
        onClick={() => dispatch(onSidebarToggle())}
      >
        {sidebarIsOpen ? <X size={22} /> : <Menu size={22} />}
      </button>

      {/* 🔹 Center: Title / Greeting */}
      <h1 className="text-lg font-semibold text-gray-800 hidden sm:block font-heading">
        Welcome 👋 {user?.name ?? 'Md A Rahad Mondal'}
      </h1>

      {/* 🔹 Right: Avatar with Dropdown */}
      <div className="relative flex gap-lg items-center " ref={dropdownRef}>
        <div className="relative">
          <input
            placeholder="Search"
            className="bg-secondary-bg shadow-sm py-xsm px-xl border-none rounded-lg focus:outline-none"
            type="text"
            name=""
            id=""
          />

          <FaSearch className="absolute top-2.5 left-2 text-black/40" />
        </div>
        <button
          onClick={() => setOpenDropdown(!openDropdown)}
          className="flex items-center gap-3 focus:outline-none border border-black/10 shadow-sm py-xs px-md rounded-lg "
        >
          <img
            src="https://i.pravatar.cc/40"
            alt="User"
            className="w-9 h-9 rounded-full border hover:scale-105 transition-transform"
          />
          <div className="hidden sm:block text-left">
            <p className="text-sm font-medium text-gray-700">{user?.name ?? 'Md A Rahad'}</p>
            <p className="text-xs text-gray-500 capitalize">{user?.role ?? 'Admin'}</p>
          </div>

          <FaChevronDown />
        </button>

        {/* 🔽 Dropdown Menu */}
        {openDropdown && (
          <div className="absolute top-12 right-0 mt-2 w-48 bg-white rounded-lg shadow-around-sm border border-gray-100 py-2 animate-fadeIn">
            <button
              className="flex w-full items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => console.log('View Profile')}
            >
              <User size={16} /> View Profile
            </button>
            <button
              className="flex w-full items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => console.log('Edit Profile')}
            >
              <Edit size={16} /> Edit Profile
            </button>
            <hr className="my-1 text-black/20" />
            <button
              className="flex w-full items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
              onClick={() => dispatch(logout())}
            >
              <LogOut size={16} /> Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default DashBroadNavbar;
