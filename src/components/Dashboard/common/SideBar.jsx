import { useState } from 'react';
import { onSidebarToggle } from '@/redux/common/commonSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';

// Icons
import {
  FaBlog,
  FaBookOpen,
  FaChalkboardTeacher,
  FaClipboardList,
  FaCogs,
  FaTachometerAlt,
  FaUserGraduate,
  FaUsers,
  FaRegEdit,
  FaTags,
  FaHandshake,
  FaImage,
  FaEnvelope,
  FaFolderOpen,
  FaFileAlt,
  FaQuestionCircle,
  FaBook,
  FaStar,
  FaSearch,
} from 'react-icons/fa';
import { IoIosArrowDown } from 'react-icons/io';

export default function SideBar() {
  const dispatch = useDispatch();
  const { sidebarIsOpen } = useSelector((state) => state.common);
  const { user } = useSelector((state) => state.auth);
  const role = user?.role || 'student';

  const menuByRole = {
    admin: [
      { name: 'Dashboard', icon: FaTachometerAlt, path: '/dashboard' },
      { name: 'Courses', icon: FaBookOpen, path: '/dashboard/courses' },
      { name: 'Students', icon: FaUserGraduate, path: '/dashboard/students' },
      { name: 'Teachers', icon: FaChalkboardTeacher, path: '/dashboard/teachers' },
      { name: 'Employee List', icon: FaUsers, path: '/dashboard/employees' },
      { name: 'Blog', icon: FaBlog, path: '/dashboard/blog' },
      { name: 'Reports Generate', icon: FaClipboardList, path: '/dashboard/reports' },
      {
        name: 'Settings',
        icon: FaCogs,
        children: [
          { name: 'Footer', icon: FaRegEdit, path: '/dashboard/footer' },
          { name: 'Partners', icon: FaHandshake, path: '/dashboard/partners' },
          { name: 'Hero Headers', icon: FaImage, path: '/dashboard/hero-sections' },
          { name: 'Messages', icon: FaEnvelope, path: '/dashboard/messages' },
          { name: 'FAQs', icon: FaQuestionCircle, path: '/dashboard/faqs' },
          { name: 'Policies', icon: FaBook, path: '/dashboard/policies' },
          { name: 'Skills', icon: FaStar, path: '/dashboard/skills' },
        ],
      },
    ],
  };

  const menuItems = menuByRole[role] || [];
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (name) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  return (
    <>
      <aside
        className={`fixed md:sticky top-0 left-0 z-40 w-[300px] max-h-screen min-h-screen h-full flex flex-col bg-primary text-white transform transition-transform duration-300 ${
          sidebarIsOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0`}
      >
        <div className="flex items-center justify-center py-lg border-b border-white/20 font-bold">
          <Link to={'/'}>
            <img src="/assets/prime-academy-logo-full.png" width={150} alt="Prime Academy" />
          </Link>
        </div>

        <nav className="flex-1 overflow-y-auto p-lg space-y-sm scrollbar-hidden">
          {menuItems.map(({ name, icon: Icon, path, children }) =>
            children ? (
              <div key={name}>
                <button
                  onClick={() => toggleDropdown(name)}
                  className="flex items-center justify-between w-full gap-md px-lg py-sm rounded-lg hover:bg-white/10 transition font-heading"
                >
                  <div className="flex items-center gap-md">
                    <Icon size={18} />
                    <span>{name}</span>
                  </div>
                  <IoIosArrowDown
                    className={`transition-transform ${openDropdown === name ? 'rotate-180' : ''}`}
                  />
                </button>

                {/* Child items */}
                {openDropdown === name && (
                  <div className="ml-10 mt-2 space-y-1">
                    {children.map((child) => (
                      <NavLink
                        key={child.path}
                        to={child.path}
                        className={({ isActive }) =>
                          `flex items-center gap-md px-3 py-2 rounded-md text-sm ${
                            isActive
                              ? 'bg-secondary-light text-primary font-semibold'
                              : 'hover:bg-white/10'
                          }`
                        }
                        onClick={() => dispatch(onSidebarToggle())}
                      >
                        {child.icon && <child.icon size={14} />} {/* ✅ icon added */}
                        {child.name}
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <NavLink
                key={path}
                to={path}
                end
                className={({ isActive }) =>
                  `flex items-center gap-md px-lg py-sm rounded-lg transition font-heading ${
                    isActive ? 'bg-secondary-light text-primary font-semibold' : 'hover:bg-white/10'
                  }`
                }
                onClick={() => dispatch(onSidebarToggle())}
              >
                <Icon size={18} />
                <span>{name}</span>
              </NavLink>
            )
          )}
        </nav>

        <p className="border-t border-white/20 p-lg text-sm text-center mt-auto">
          2025 © Prime Academy.
        </p>
      </aside>

      {sidebarIsOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => dispatch(onSidebarToggle())}
        ></div>
      )}
    </>
  );
}
