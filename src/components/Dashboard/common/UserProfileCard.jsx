import DOMPurify from 'dompurify';
import {
  Mail,
  Phone,
  BookUser,
  School,
  Wrench,
  CheckCircle,
  XCircle,
  UserCog,
  Hash,
} from 'lucide-react';

import avatar from '/assets/avatar.png';

// This is the main component
const UserProfileCard = ({ user }) => {
  const { email, phone, full_name, is_enabled, student_id, role, profile } = user;

  return (
    <div className="flex items-center justify-center">
      <div className="w-full bg-white rounded-2xl shadow-2xl overflow-hidden font-sans">
        {/* === Header Section === */}
        <div className="bg-primary p-6 md:p-8">
          <div className="flex flex-col sm:flex-row items-center sm:space-x-6">
            <img
              src={profile.image || avatar}
              alt={`${full_name}'s profile`}
              className="w-28 h-28 md:w-32 md:h-32 rounded-full object-cover border-4 border-secondary shadow-lg flex-shrink-0"
            />
            <div className="mt-4 sm:mt-0 text-center sm:text-left">
              <h1 className="text-3xl md:text-4xl font-bold text-white">
                {full_name || 'User Name'}
              </h1>
              <p className="text-lg md:text-xl text-white mt-1">{profile.title || 'User Title'}</p>
            </div>
          </div>
        </div>

        {/* === Body Section === */}
        <div className="p-6 md:p-8 space-y-8">
          {/* --- User Details --- */}
          <div>
            <h2 className="text-2xl font-semibold text-primary flex items-center space-x-2">
              <UserCog className="w-6 h-6 text-secondary" />
              <span>User Details</span>
            </h2>
            <div className="flex flex-wrap gap-4 mt-4">
              {/* Status Badge */}
              {is_enabled ? (
                <span className="flex items-center space-x-2 bg-green-100 text-green-800 font-medium px-4 py-2 rounded-full text-sm">
                  <CheckCircle className="w-5 h-5" />
                  <span>Enabled</span>
                </span>
              ) : (
                <span className="flex items-center space-x-2 bg-red-100 text-red-800 font-medium px-4 py-2 rounded-full text-sm">
                  <XCircle className="w-5 h-5" />
                  <span>Disabled</span>
                </span>
              )}
              {/* Role Badge */}
              <span className="flex items-center space-x-2 bg-blue-100 text-primary font-medium px-4 py-2 rounded-full text-sm">
                <UserCog className="w-5 h-5" />
                <span>{role || 'User Role'}</span>
              </span>
              {/* Student ID Badge */}
              <span className="flex items-center space-x-2 bg-black/10 text-black/70 font-medium px-4 py-2 rounded-full text-sm">
                <Hash className="w-5 h-5" />
                <span>{student_id || 'N/A'}</span>
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
                <span className="group-hover:text-primary ">{email || 'user@example.com'}</span>
              </a>
              <a href={`tel:${phone}`} className="flex items-center space-x-3 group">
                <Phone className="w-5 h-5 text-primary-light" />
                <span className="group-hover:text-primary ">{phone || '+1 234 567 890'}</span>
              </a>
            </div>
          </div>

          {/* --- Bio --- */}
          {profile.bio && (
            <div>
              <h2 className="text-2xl font-semibold text-primary flex items-center space-x-2 mb-md">
                <BookUser className="w-6 h-6 text-secondary" />
                <span>Biography</span>
              </h2>
              <div
                className="text-sm text-gray-700 leading-relaxed"
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(profile.bio),
                }}
              />
            </div>
          )}

          {/* --- Education --- */}
          {profile.education && (
            <div>
              <h2 className="text-2xl font-semibold text-primary flex items-center space-x-2">
                <School className="w-6 h-6 text-secondary" />
                <span>Education</span>
              </h2>
              <p className="text-black/60 leading-relaxed mt-4">{profile.education}</p>
            </div>
          )}

          {/* --- Skills --- */}
          {profile.skills && profile.skills.length > 0 && (
            <div>
              <h2 className="text-2xl font-semibold text-primary flex items-center space-x-2">
                <Wrench className="w-6 h-6 text-secondary" />
                <span>Skills</span>
              </h2>
              <div className="flex flex-wrap gap-3 mt-4">
                {profile.skills.map((skill) => (
                  <span
                    key={skill.id}
                    className="bg-primary/20 text-black font-bold px-4 py-2 rounded-full text-sm shadow-sm"
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfileCard;
