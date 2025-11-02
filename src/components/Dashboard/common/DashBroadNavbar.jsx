import { onSidebarToggle, SidebarClose } from '@/redux/common/commonSlice';
import { Menu, X, User, Edit, LogOut } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useRef, useEffect } from 'react';
import { IoNotifications } from 'react-icons/io5';
import { FaChevronDown, FaSearch } from 'react-icons/fa';
import { clearAuthMessage, logout } from '@/redux/auth/authSlice';
import SwalUtils from '@/utils/sweetAlert';
import { useLocation, useNavigate } from 'react-router-dom';
import { changePassword, updateProfile, userProfile } from '../../../redux/auth/authAction';
import Modal from '../../common/Modal';
import { UserProfileView } from './UserProfileView';
import { getInitials } from '../../../utils/getInitials';
import ChangePassword from './ChangePassword';
import { clearAuthError } from '../../../redux/auth/authSlice';
import LoadingDashboard from './LoadingDashboard';
import UpdateProfile from './UpdateProfile';

const DashBroadNavbar = () => {
  // auth & coommon state from redux
  const dispatch = useDispatch();
  const { sidebarIsOpen } = useSelector((state) => state.common);
  const { message, profile, error, loading, user } = useSelector((state) => state.auth);
  const [modal, setModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setModal(false);
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

  useEffect(() => {
    dispatch(SidebarClose());
  }, [pathname]);

  // 🔹 Dropdown auto-close when clicking outside
  const [openDropdown, setOpenDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    dispatch(userProfile());
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpenDropdown(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const handleChangePassword = (data) => {
    dispatch(changePassword({ ...data, role: profile?.role }));
  };

  const handleUpdate = (data) => {
    dispatch(updateProfile(data));
  };

  return (
    <nav className="sticky top-0 z-30 bg-white border-b border-black/10 shadow-sm flex items-center justify-between px-lg  py-base">
      <LoadingDashboard loading={loading} />
      {modal && (
        <Modal setModal={setModal} noClose={true}>
          <div className="w-full" onClick={(e) => e.stopPropagation()}>
            {modalType === 'view' && (
              <UserProfileView
                onUpdate={() => {
                  setModal(true);
                  setModalType('edit');
                }}
                data={profile}
              />
            )}
            {modalType === 'change-password' && (
              <ChangePassword onSubmit={handleChangePassword} onCancel={() => setModal(false)} />
            )}
            {modalType === 'edit' && (
              <UpdateProfile
                onSubmit={handleUpdate}
                onCancel={() => setModal(false)}
                defaultValues={profile}
              />
            )}
          </div>
        </Modal>
      )}
      {/* 🔹 Left: Sidebar Toggle (for Mobile only) */}
      <button
        className="md:hidden p-2 rounded-lg border border-gray-200 bg-gray-50 hover:bg-gray-100 transition-colors"
        onClick={() => dispatch(onSidebarToggle())}
      >
        {sidebarIsOpen ? <X size={22} /> : <Menu size={22} />}
      </button>

      {/* 🔹 Center: Title / Greeting */}
      <h1 className="text-lg font-semibold text-gray-800 hidden sm:block font-heading">
        Welcome{' '}
        <span className="text-primary-light">
          {profile?.first_name} {profile?.last_name}
        </span>
      </h1>

      {/* 🔹 Right: Avatar with Dropdown */}
      <div className="relative flex gap-lg items-center " ref={dropdownRef}>
        {/* notifucation button*/}
        <button>
          <IoNotifications size={25} />
        </button>
        <button
          onClick={() => setOpenDropdown(!openDropdown)}
          className="flex items-center gap-3 focus:outline-none border border-black/10 shadow-sm py-xs px-md rounded-lg "
        >
          {profile?.profile?.image ? (
            <img
              src={profile?.profile?.image}
              alt={profile?.first_name + ' ' + profile?.last_name}
              className="w-9 h-9 rounded-full object-cover"
            />
          ) : (
            <div className="w-9 h-9 rounded-full bg-primary/20 text-primary flex items-center justify-center text-lg font-semibold">
              {getInitials(profile?.first_name, profile?.last_name)}
            </div>
          )}
          <div className="hidden sm:block text-left">
            <p className="text-sm font-medium text-gray-700">
              {profile?.first_name} {profile?.last_name}
            </p>
            <p className="text-xs text-gray-500 capitalize">{profile?.role}</p>
          </div>

          <FaChevronDown />
        </button>

        {/* 🔽 Dropdown Menu */}
        {openDropdown && (
          <div className="absolute top-12 right-0 mt-2 w-48 bg-white rounded-lg shadow-around-sm border border-gray-100 py-2 animate-fadeIn">
            <button
              className="flex w-full items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => {
                setModal(true);
                setModalType('view');
              }}
            >
              <User size={16} /> View Profile
            </button>
            <button
              className="flex w-full items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => {
                setModal(true);
                setModalType('change-password');
              }}
            >
              <Edit size={16} /> Change Password
            </button>
            <hr className="my-1 text-black/20" />
            <button
              className="flex w-full items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
              onClick={() => {
                SwalUtils.confirm(() => {
                  dispatch(logout());
                  if (user?.role !== 'student') {
                    navigate('/auth/login/verify-role');
                  } else {
                    navigate('/login');
                  }
                }, 'Logout');
              }}
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
