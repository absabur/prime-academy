import {
  User,
  Mail,
  Phone,
  MessageSquareText,
  CheckSquare,
  Hash,
  CalendarClock,
} from 'lucide-react';

// Helper component for the header contact info
const HeaderItem = ({ icon, label, children }) => (
  <div className="flex items-center gap-2">
    <div className="flex-shrink-0 text-black/50">{icon}</div>
    <div>
      <h4 className="text-xs font-medium text-black/40 uppercase tracking-wider">{label}</h4>
      <div className="text-sm font-medium text-black/70">{children}</div>
    </div>
  </div>
);

// Helper component for the footer metadata
const MetaItem = ({ icon, label, children }) => (
  <div className="flex items-start gap-2">
    <div className="mt-1 flex-shrink-0 text-black/50">{icon}</div>
    <div>
      <h4 className="text-xs font-medium text-black/50 uppercase tracking-wider">{label}</h4>
      <div className="text-sm text-black/70">{children}</div>
    </div>
  </div>
);

// Your main modal content component
// Pass your JSON object to this component as the `data` prop
export default function MessageDetails({ data }) {
  const { id, first_name, last_name, email, phone, message, agree_to_policy, created_at } = data;

  const fullName = `${first_name} ${last_name}`;

  return (
    <div className="bg-white rounded-lg border border-black/20 shadow-lg overflow-hidden">
      {/* Header: Sender Information */}
      <header className="p-4 sm:p-6 bg-black/5 border-b border-black/20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-4 gap-x-6">
          <HeaderItem icon={<User size={20} />} label="Sender">
            <span className="text-base font-semibold text-primary">{fullName}</span>
          </HeaderItem>

          <HeaderItem icon={<Mail size={20} />} label="Email">
            <a href={`mailto:${email}`} className="hover:underline text-primary">
              {email}
            </a>
          </HeaderItem>

          <HeaderItem icon={<Phone size={20} />} label="Phone">
            <a href={`tel:${phone}`} className="hover:underline text-primary">
              {phone}
            </a>
          </HeaderItem>
        </div>
      </header>

      {/* Body: Message Content */}
      <main className="p-4 sm:p-6 space-y-3">
        <div className="flex items-center gap-2">
          <MessageSquareText className="h-5 w-5 text-black/50" />
          <h3 className="text-lg font-semibold text-black">Message</h3>
        </div>

        {/* Using 'whitespace-pre-line' is crucial here to respect 
          the line breaks (\n) from the JSON message.
        */}
        <div className="bg-black/5 p-4 rounded-md border border-black/20">
          <p className="text-sm text-black/60 whitespace-pre-line break-words">{message}</p>
        </div>
      </main>

      {/* Footer: Metadata */}
      <footer className="p-4 sm:p-6 bg-black/5 border-t border-black/20">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-y-4 gap-x-6">
          <MetaItem icon={<CheckSquare size={16} />} label="Policy">
            {agree_to_policy ? (
              <span className="font-medium text-primary-light">Agreed</span>
            ) : (
              <span className="font-medium text-red-700">Not Agreed</span>
            )}
          </MetaItem>

          <MetaItem icon={<CalendarClock size={16} />} label="Submitted At">
            {new Date(created_at).toLocaleString()}
          </MetaItem>
        </div>
      </footer>
    </div>
  );
}
