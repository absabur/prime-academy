/**
 * BlogShare Component
 * ------------------
 * - Displays social share buttons for the blog
 * - Shows author and publication date
 * - Designed for sidebar layout next to BlogBody
 */

import { dateConvertionBlogsPageBlogCard } from '@/utils/timeFormat';
import { FaShareAlt } from 'react-icons/fa';
import { FaFacebook, FaTwitter, FaLinkedin, FaWhatsapp } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Icons = {
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaWhatsapp,
};

const BlogShare = ({ cardData }) => {
  const { blog } = useSelector((state) => state.blog);

  // Make full URL
  const domain = typeof window !== 'undefined' ? window.location.origin : '';
  const fullUrl = `${domain}/${blog?.slug || ''}`;
  const encodedUrl = encodeURIComponent(fullUrl);
  const encodedText = encodeURIComponent(blog?.title || '');
  return (
    <aside className="flex-1 bg-secondary-bg px-lg py-xl space-y-md self-start w-full">
      {/* Share Section */}
      <div>
        <h2 className="font-bold text-black text-xl mb-2">Share This Article</h2>
        <div className="flex gap-3 items-center">
          <FaShareAlt aria-hidden="true" />
          {cardData.share.map((platform) => {
            const IconComponent = Icons[platform.icon];
            let shareUrl = platform.url + encodedUrl;
            if (platform.text) {
              shareUrl = platform.url + encodedUrl + '&text=' + encodedText;
            }
            return (
              <Link
                key={platform.name}
                href={shareUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`${platform.color} text-2xl hover:opacity-80 transition`}
              >
                <IconComponent />
              </Link>
            );
          })}
        </div>
      </div>
      {/* Author Section */}
      <div>
        <h2 className="font-bold text-black text-xl mb-1">Written By</h2>
        <p className="text-heading text-base leading-lg">{blog?.author?.name || 'Authority'}</p>
      </div>
      {/* Date Section */}
      <div>
        <h2 className="font-bold text-black text-xl mb-1">Date</h2>
        <p className="text-heading text-base leading-lg">
          {dateConvertionBlogsPageBlogCard(blog?.created_at)}
        </p>
      </div>
    </aside>
  );
};

export default BlogShare;
