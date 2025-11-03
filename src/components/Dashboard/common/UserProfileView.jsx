import DOMPurify from 'dompurify';
import {
  BookOpen,
  Briefcase, // Skills
  Info,
  Mail,
  Phone,
  ShieldCheck, // Education
  Sparkles,
} from 'lucide-react';
import { getInitials } from '../../../utils/getInitials';
import PrimaryButton from '../../common/PrimaryButton';
import avatar from '/assets/avatar.png';

// Helper component for displaying metadata items
const InfoItem = ({ icon, label, children }) => (
  <div className="flex items-start gap-3">
    <div className="mt-1 flex-shrink-0 text-black/50">{icon}</div>
    <div>
      <h4 className="text-xs font-medium text-black/50 uppercase tracking-wider">{label}</h4>
      <div className="text-sm text-black/70">{children}</div>
    </div>
  </div>
);

// Your main modal content component
// Pass your JSON object to this component as the `data` prop
export const UserProfileView = ({ data, onUpdate }) => {
  const {
    id,
    email,
    phone,
    first_name,
    last_name,
    full_name,
    is_enabled,
    student_id,
    role,
    profile,
  } = data;

  const { title, image, bio, education, skills } = profile;

  // Check if bio is just empty HTML (like <p>&nbsp;</p>) or null
  const isBioEmpty = !bio || bio.replace(/<[^>]+>/g, '').trim() === '';

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-1">
      {/* --- Sidebar Column --- */}
      <div className="lg:col-span-1 space-y-5">
        {/* Profile Card */}
        <div className="bg-white rounded-lg border border-black/20 p-6 flex flex-col items-center text-center shadow-sm">
          {image ? (
            <img
              src={image || avatar}
              alt={full_name}
              className="w-24 h-24 rounded-full object-cover mb-4"
            />
          ) : (
            <div className="w-24 h-24 rounded-full bg-primary/10 text-primary flex items-center justify-center text-4xl font-semibold mb-4">
              {getInitials(first_name, last_name)}
            </div>
          )}

          <h2 className="text-xl font-bold text-black">{full_name}</h2>

          <div className="flex items-center gap-1.5 text-black/50 mt-1">
            <ShieldCheck size={16} className="text-pirmary-light/60" />
            <span className="text-sm font-medium">{role}</span>
          </div>

          {title && (
            <div className="flex items-center gap-1.5 text-black/50 mt-1">
              <Briefcase size={16} />
              <span className="text-sm">{title}</span>
            </div>
          )}
          <PrimaryButton onClick={onUpdate} className="mt-sm" text={`Edit Profile`} />
        </div>
        {/* Contact Card */}
        <div className="bg-white rounded-lg border border-black/20 p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-black mb-4">Contact Information</h3>
          <div className="space-y-4">
            <InfoItem icon={<Mail size={16} />} label="Email">
              <a href={`mailto:${email}`} className="text-pirmary-light/60 hover:underline">
                {email}
              </a>
            </InfoItem>
            <InfoItem icon={<Phone size={16} />} label="Phone">
              <a href={`tel:${phone}`} className="text-pirmary-light/60 hover:underline">
                {phone}
              </a>
            </InfoItem>
          </div>
        </div>
      </div>
      {/* --- Main Content Column --- */}
      <div className="lg:col-span-2 space-y-5">
        {/* Bio Card */}
        <div className="bg-white rounded-lg border border-black/20 p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <Info className="h-5 w-5 text-primary/60" />
            <h3 className="text-lg font-semibold text-black">Biography</h3>
          </div>
          {isBioEmpty ? (
            <p className="text-sm text-black/50 italic">No biography provided.</p>
          ) : (
            <div
              className="prose prose-sm max-w-none text-black/60"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(bio),
              }}
            />
          )}
        </div>

        {/* Details Card */}
        <div className="bg-white rounded-lg border border-black/20 p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-black mb-4">Other Details</h3>
          <div className="space-y-5">
            <InfoItem icon={<BookOpen size={16} />} label="Education">
              {education || 'Not provided'}
            </InfoItem>
            <InfoItem icon={<Sparkles size={16} />} label="Skills">
              {skills && skills.length > 0 ? (
                <div className="flex flex-wrap gap-2 mt-sm">
                  {skills.map((skill, index) => (
                    <span
                      key={index}
                      className="inline-block bg-primary-light/10 text-primary-light/80 text-xs font-medium px-2.5 py-0.5 rounded-full"
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              ) : (
                <span className="text-sm text-black/50 italic">No skills listed.</span>
              )}
            </InfoItem>
          </div>
        </div>
      </div>
    </div>
  );
};
