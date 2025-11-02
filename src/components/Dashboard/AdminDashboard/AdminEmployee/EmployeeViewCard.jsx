import {
  Briefcase, // New Icon for Job Title
  Building, // New Icon for Department
  CalendarCheck,
  CheckCircle,
  Hash,
  Mail,
  Phone, // New Icon for Joining Date
  User,
  XCircle,
} from 'lucide-react';

// Helper function to format the date
const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  try {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  } catch (e) {
    return 'Invalid Date';
  }
};

// This is the main component
// Note: Props are updated to match the new data structure fields
const EmployeeViewCard = ({ employee }) => {
  const {
    email,
    phone_number,
    employee_name,
    is_active,
    employee_id, // Using employee_id for the ID badge
    job_title,
    department,
    joining_date,
    employee_image,
    // Note: 'profile', 'role', 'full_name', 'student_id'
    // fields from original UI are not present in new data structure,
    // so they are commented out or replaced.
  } = employee;

  // New props mapping to the original UI structure for consistency
  const fullName = employee_name || 'User Name';
  const profileImage = employee_image || 'https://via.placeholder.com/150';
  const title = job_title || 'User Title';

  return (
    <div className="flex items-center justify-center ">
      <div className="w-full bg-white rounded-2xl shadow-2xl overflow-hidden font-sans">
        {/* === Header Section === */}
        <div className="bg-primary p-6 md:p-8">
          <div className="flex flex-col sm:flex-row items-center sm:space-x-6">
            <img
              src={profileImage}
              alt={`${fullName}'s profile`}
              className="w-28 h-28 md:w-32 md:h-32 rounded-full object-cover border-4 border-white shadow-lg flex-shrink-0"
            />
            <div className="mt-4 sm:mt-0 text-center sm:text-left">
              <h1 className="text-3xl md:text-4xl font-bold text-white">{fullName}</h1>
              <p className="text-lg md:text-xl text-white mt-1">{title}</p>
            </div>
          </div>
        </div>

        {/* --- Employment Details (NEW SECTION) --- */}
        <div className="p-6 md:p-8 border-b border-black/20">
          <h2 className="text-2xl font-semibold text-primary flex items-center space-x-2">
            <Briefcase className="w-6 h-6 text-secondary" />
            <span>Employment Details</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-4 text-black/60">
            {/* Job Title */}
            <div className="flex flex-col">
              <span className="text-sm font-medium text-black/50 flex items-center space-x-2">
                <Briefcase className="w-4 h-4" />
                <span>Job Title</span>
              </span>
              <span className="text-lg font-semibold">{job_title || 'N/A'}</span>
            </div>

            {/* Department */}
            <div className="flex flex-col">
              <span className="text-sm font-medium text-black/50 flex items-center space-x-2">
                <Building className="w-4 h-4" />
                <span>Department</span>
              </span>
              <span className="text-lg font-semibold">{department?.name || 'N/A'}</span>
            </div>

            {/* Joining Date */}
            <div className="flex flex-col">
              <span className="text-sm font-medium text-black/50 flex items-center space-x-2">
                <CalendarCheck className="w-4 h-4" />
                <span>Joining Date</span>
              </span>
              <span className="text-lg font-semibold">{formatDate(joining_date)}</span>
            </div>
          </div>
        </div>

        {/* === Body Section === */}
        <div className="p-6 md:p-8 space-y-8">
          {/* --- User Details --- */}
          <div>
            <h2 className="text-2xl font-semibold text-primary flex items-center space-x-2">
              <User className="w-6 h-6 text-secondary" />
              <span>User Status & ID</span>
            </h2>
            <div className="flex flex-wrap gap-4 mt-4">
              {/* Status Badge */}
              {is_active ? (
                <span className="flex items-center space-x-2 bg-green-100 text-green-800 font-medium px-4 py-2 rounded-full text-sm">
                  <CheckCircle className="w-5 h-5" />
                  <span>Active</span>
                </span>
              ) : (
                <span className="flex items-center space-x-2 bg-red-100 text-red-800 font-medium px-4 py-2 rounded-full text-sm">
                  <XCircle className="w-5 h-5" />
                  <span>Inactive</span>
                </span>
              )}
              {/* Employee ID Badge */}
              <span className="flex items-center space-x-2 bg-black/10 text-black/70 font-medium px-4 py-2 rounded-full text-sm">
                <Hash className="w-5 h-5" />
                <span className="font-mono">ID: {employee_id || 'N/A'}</span>
              </span>
            </div>
          </div>

          {/* --- Contact Info --- */}
          <div>
            <h2 className="text-2xl font-semibold text-primary flex items-center space-x-2">
              <Mail className="w-6 h-6 text-secondary" />
              <span>Contact Information</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 mt-4 text-black/60">
              <a href={`mailto:${email}`} className="flex items-center space-x-3 group">
                <Mail className="w-5 h-5 text-primary-light" />
                <span className="group-hover:text-primary font-medium">
                  {email || 'user@example.com'}
                </span>
              </a>
              <a href={`tel:${phone_number}`} className="flex items-center space-x-3 group">
                <Phone className="w-5 h-5 text-primary-light" />
                <span className="group-hover:text-primary font-medium">
                  {phone_number || '+1 234 567 890'}
                </span>
              </a>
            </div>
          </div>

          {/* --- Other sections (Bio, Education, Skills) are removed 
               as they are not present in the new data structure --- */}
        </div>
      </div>
    </div>
  );
};

export default EmployeeViewCard;
