import { onSidebarToggle } from '@/redux/common/commonSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';

// 🔹 সব আইকন এক জায়গা থেকে (react-icons)
import {
  FaBlog, // Dashboard
  FaBookOpen, // Settings
  FaBox, // Students / Results
  FaChalkboardTeacher, // Payments
  FaClipboardList, // Assignments / Reports
  FaCogs, // Blog
  FaFileInvoice,
  FaTachometerAlt, // Inventory
  FaTools, // Courses
  FaUserGraduate, // Teachers
  FaUsers, // Invoices
  FaWallet,
} from 'react-icons/fa';

export default function SideBar() {
  const dispatch = useDispatch();
  const { sidebarIsOpen } = useSelector((state) => state.common);
  const { user } = useSelector((state) => state.auth);
  const role = user?.role || 'student';

  // 🔹 Sidebar menu by role
  const menuByRole = {
    admin: [
      { name: 'Dashboard', icon: FaTachometerAlt, path: '/dashboard' },
      { name: 'Courses', icon: FaBookOpen, path: '/dashboard/courses' },
      { name: 'Students', icon: FaUserGraduate, path: '/dashboard/students' },
      { name: 'Teachers', icon: FaChalkboardTeacher, path: '/dashboard/teachers' },
      { name: 'Employee List', icon: FaUsers, path: '/dashboard/employees' },
      { name: 'Blog', icon: FaBlog, path: '/dashboard/blog' },
      { name: 'Reports Generate', icon: FaClipboardList, path: '/dashboard/reports' },
      { name: 'Settings', icon: FaCogs, path: '/dashboard/settings' },
    ],
    teacher: [
      { name: 'Dashboard', icon: FaTachometerAlt, path: '/dashboard' },
      { name: 'My Classes', icon: FaBookOpen, path: '/dashboard/classes' },
      { name: 'Assignments', icon: FaClipboardList, path: '/dashboard/assignments' },
    ],
    student: [
      { name: 'Dashboard', icon: FaTachometerAlt, path: '/dashboard' },
      { name: 'Courses', icon: FaBookOpen, path: '/dashboard/courses' },
      { name: 'Results', icon: FaUserGraduate, path: '/dashboard/results' },
    ],
    account: [
      { name: 'Dashboard', icon: FaTachometerAlt, path: '/dashboard' },
      { name: 'Payments', icon: FaWallet, path: '/dashboard/payments' },
      { name: 'Invoices', icon: FaFileInvoice, path: '/dashboard/invoices' },
    ],
    stuff: [
      { name: 'Dashboard', icon: FaTachometerAlt, path: '/dashboard' },
      { name: 'Inventory', icon: FaBox, path: '/dashboard/inventory' },
      { name: 'Maintenance', icon: FaTools, path: '/dashboard/maintenance' },
    ],
  };

  const menuItems = menuByRole[role] || [];

  return (
    <>
      {/* 🔹 Sidebar */}
      <aside
        className={`fixed md:sticky top-0 left-0 z-40 w-[300px] max-h-screen min-h-screen h-full flex flex-col bg-primary text-white transform transition-transform duration-300 ease-in-out ${
          sidebarIsOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0`}
      >
        <div className="flex items-center justify-center py-lg border-b border-white/20 font-bold">
          <Link to={'/'}>
            <img src="/assets/prime-academy-logo-full.png" width={150} alt="Prime Academy" />
          </Link>
        </div>

        <nav className="flex-1 overflow-y-auto p-lg space-y-sm">
          {menuItems.map(({ name, icon: Icon, path }) => (
            <NavLink
              key={path}
              to={path}
              end
              className={({ isActive }) =>
                `flex items-center gap-md px-lg py-sm rounded-lg transition font-heading${
                  isActive ? ' bg-secondary-light text-primary font-semibold' : 'hover:bg-white/10'
                }`
              }
              onClick={() => dispatch(onSidebarToggle())}
            >
              <Icon size={18} />
              <span>{name}</span>
            </NavLink>
          ))}
        </nav>

        <p className="border-t border-white/20 p-lg text-sm text-center mt-auto">
          2025 © Prime Academy.
        </p>
      </aside>

      {/* 🔹 Overlay (Mobile) */}
      {sidebarIsOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => dispatch(onSidebarToggle())}
        ></div>
      )}
    </>
  );
}
