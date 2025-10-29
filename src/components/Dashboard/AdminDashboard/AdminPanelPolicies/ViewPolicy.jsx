import DOMPurify from 'dompurify';
import { FileText, Hash, CalendarClock, CalendarPlus, LayoutTemplate } from 'lucide-react';

// Helper component for displaying metadata items
const InfoItem = ({ icon, label, children }) => (
  <div className="flex items-start gap-2 ml-auto">
    <div className="mt-1 flex-shrink-0 text-black/50">{icon}</div>
    <div>
      <h4 className="text-xs font-medium text-black/50 uppercase tracking-wider">{label}</h4>
      <div className="text-sm text-black">{children}</div>
    </div>
  </div>
);

const ViewPolicy = ({ data }) => {
  if (!data) return null;

  const { title, page_name, content } = data;

  return (
    <div className="p-1">
      {/* Main Content Column */}
      <div className="bg-white rounded-lg border border-black/20 p-4 sm:p-6">
        <div className="flex items-center gap-2 mb-4 pb-4 border-b border-black/20">
          <FileText className="h-5 w-5 text-primary" />
          <h3 className="text-xl font-semibold text-black">{title}</h3>
          <InfoItem icon={<LayoutTemplate size={16} />} label="Page Name">
            <span className="font-medium">{page_name}</span>
          </InfoItem>
        </div>

        {/* This is the most important part.
          The 'prose' class from @tailwindcss/typography will style all the
          HTML (p, h1, ul, etc.) that comes from your 'content' field.
        */}
        <div
          className="policy-wrapper leading-relaxed"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(content),
          }}
        />
      </div>
    </div>
  );
};

export default ViewPolicy;
