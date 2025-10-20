/**
 * BlogBodySection Component
 * -------------------------
 * - Layout component for a single blog post page
 * - Divides layout into main content (BlogBody) and social share (BlogShare)
 * - Uses OuterSection + InnerSection for consistent spacing and responsive layout
 */

import OuterSection from '../../common/OuterSection';
import InnerSection from '../../common/InnerSection';
import BlogBody from './BlogBody';
import BlogShare from './BlogShare';
import { blogData } from '../../../data/blogPageData';

const BlogBodySection = () => {
  return (
    <OuterSection>
      <InnerSection className="flex flex-col md:flex-row gap-lg">
        {/* Main blog content */}
        <BlogBody />

        {/* Social share sidebar */}
        <BlogShare cardData={blogData} />
      </InnerSection>
    </OuterSection>
  );
};

export default BlogBodySection;
