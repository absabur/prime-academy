import { CheckCircle, Edit2, Image as ImageIcon, Trash2, Video, XCircle } from 'lucide-react';

const CreateImageUrl = (path) => {
  return `https://prime-api.enghasan.com${path}`;
};

const TabContentCard = ({ content, onEdit, onDelete, onToggleStatus }) => {
  const isVideo = content.media_type === 'video';
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row gap-4 relative group">
      {/* 1. Media Preview Section */}
      <div className="w-full md:w-48 h-32 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden relative border">
        {(content.video_thumbnail ?? content.image) ? (
          <img
            src={
              (content.video_thumbnail && CreateImageUrl(content.video_thumbnail)) ??
              (content.image && CreateImageUrl(content.image))
            }
            alt="preview"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-300">
            {isVideo ? <Video size={30} /> : <ImageIcon size={30} />}
          </div>
        )}

        {/* Type Badge */}
        <div className="absolute top-2 left-2 bg-black/60 text-white text-[10px] px-2 py-0.5 rounded-md uppercase font-bold flex items-center gap-1">
          {isVideo ? (
            <>
              <Video size={10} /> Video
            </>
          ) : (
            <>
              <ImageIcon size={10} /> Image
            </>
          )}
        </div>
      </div>

      {/* 2. Content Details Section */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <h4 className="font-bold text-gray-800 text-lg mb-1 line-clamp-1">
            {content.title || 'Untitled Content'}
          </h4>

          {/* Render HTML description safely, truncated */}
          <div
            className="text-sm text-gray-500 line-clamp-2 prose prose-sm max-w-none"
            dangerouslySetInnerHTML={{ __html: content.description }}
          />
        </div>

        {/* Meta info */}
        <div className="flex items-center gap-4 mt-3 text-xs text-gray-400">
          <span>Order: {content.order}</span>
          <span>
            {isVideo && content.video_provider ? `Source: ${content.video_provider}` : ''}
          </span>
        </div>
      </div>

      {/* 3. Action Buttons (Right side) */}
      <div className="flex md:flex-col gap-2 justify-start md:border-l md:pl-4 border-gray-100">
        <button
          onClick={onToggleStatus}
          className={`p-2 rounded-lg transition-colors ${content.is_active ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-500'}`}
          title="Toggle Status"
        >
          {content.is_active ? <CheckCircle size={18} /> : <XCircle size={18} />}
        </button>

        <button
          onClick={onEdit}
          className="p-2 rounded-lg bg-gray-50 text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-colors"
          title="Edit"
        >
          <Edit2 size={18} />
        </button>

        <button
          onClick={onDelete}
          className="p-2 rounded-lg bg-gray-50 text-gray-600 hover:bg-red-50 hover:text-red-600 transition-colors"
          title="Delete"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
};

export default TabContentCard;
