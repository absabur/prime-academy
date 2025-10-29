import {
  FileText,
  Image as ImageIcon,
  CheckCircle,
  XCircle,
  Link as LinkIcon,
  List,
  Hash,
  CalendarClock,
  CalendarPlus,
  LayoutTemplate,
  ExternalLink,
} from 'lucide-react';

// Helper component for displaying metadata items in the sidebar
const InfoItem = ({ icon, label, children }) => (
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
export default function ({ data }) {
  const {
    id,
    page_name,
    title,
    description,
    button1_text,
    button1_url,
    button2_text,
    button2_url,
    banner_image,
    is_active,
    slides,
    created_at,
    updated_at,
  } = data;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-1">
      {/* Main Content Column */}
      <div className="lg:col-span-2 space-y-6">
        {/* Title & Description */}
        <div className="p-4 bg-white rounded-lg border border-gray-200">
          <div className="flex items-center gap-2 mb-3">
            <FileText className="h-5 w-5 text-primary-light" />
            <h3 className="text-xl font-semibold text-black">{title}</h3>
          </div>
          <p className="text-sm text-black/50 whitespace-pre-line">{description}</p>
        </div>

        {/* Banner Image */}
        <div className="p-4 bg-white rounded-lg border border-gray-200">
          <div className="flex items-center gap-2 mb-3">
            <ImageIcon className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-medium text-black">Banner Image</h3>
          </div>
          {banner_image ? (
            <img
              src={banner_image}
              alt="Banner"
              className="w-full h-auto max-h-60 rounded-md object-cover border border-gray-300"
            />
          ) : (
            <div className="flex items-center justify-center h-40 bg-black/20 rounded-md border border-dashed text-black/50">
              No image provided
            </div>
          )}
        </div>

        {/* Slides */}
        {page_name == 'home' && (
          <div className="p-4 bg-white rounded-lg border border-gray-200">
            <div className="flex items-center gap-2 mb-3">
              <List className="h-5 w-5 text-primary-light" />
              <h3 className="text-lg font-medium text-black">Slide Texts ({slides.length})</h3>
            </div>
            <ul className="list-disc list-inside space-y-1.5 pl-2 text-sm text-black/60">
              {slides.map((slide) => (
                <li key={slide.id}>{slide.text}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Sidebar Info Column */}
      <div className="lg:col-span-1 space-y-5">
        {/* Status Card */}
        <div className="p-4 bg-white rounded-lg border border-gray-200">
          <h3 className="text-xs font-medium text-black/50 uppercase tracking-wider mb-3">
            Status
          </h3>
          {is_active ? (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-light px-3 py-1 text-sm font-medium text-white">
              <CheckCircle className="h-4 w-4" />
              Active
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-red-100 px-3 py-1 text-sm font-medium text-red-800">
              <XCircle className="h-4 w-4" />
              Inactive
            </span>
          )}
        </div>

        {/* Details Card */}
        <div className="p-4 bg-white rounded-lg border border-gray-200 space-y-4">
          <InfoItem icon={<LayoutTemplate size={16} />} label="Page Name">
            <span className="font-medium">{page_name}</span>
          </InfoItem>

          <InfoItem icon={<Hash size={16} />} label="ID">
            <span className="text-xs font-mono bg-black/10 p-1 rounded">{id}</span>
          </InfoItem>

          <InfoItem icon={<CalendarPlus size={16} />} label="Created On">
            {new Date(created_at).toLocaleString()}
          </InfoItem>

          <InfoItem icon={<CalendarClock size={16} />} label="Last Updated">
            {new Date(updated_at).toLocaleString()}
          </InfoItem>
        </div>

        {/* Buttons Card */}
        <div className="p-4 bg-white rounded-lg border border-gray-200">
          <h3 className="text-xs font-medium text-black/50 uppercase tracking-wider mb-4">
            Calls to Action
          </h3>
          <div className="space-y-3">
            {button1_text && (
              <a
                href={button1_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm font-medium text-primary-light hover:text-primary hover:underline"
              >
                <ExternalLink size={16} />
                {button1_text}
              </a>
            )}

            {button2_text && (
              <a
                href={button2_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm font-medium text-primary-light hover:text-primary hover:underline"
              >
                <ExternalLink size={16} />
                {button2_text}
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
