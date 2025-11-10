/**
 * BlogBody Component
 * -----------------
 * - Displays the main content of a blog post
 * - Handles multi-paragraph content dynamically
 * - Supports an additional ImageContent section within the blog
 */

import DOMPurify from 'dompurify';
import { useSelector } from 'react-redux';
import ImageContent from '../../common/ImageContent';
import ReactMarkdown from 'react-markdown';
import BlogContentSkeleton from './BlogSkeleton';
import { useEffect, useState } from 'react';

const BlogBody = () => {
  const [content, setContent] = useState({});
  const { imgIconContents } = useSelector((state) => state.imgIconContent);
  const { blog, loadingBlog } = useSelector((state) => state.blog);
  useEffect(() => {
    setContent(
      imgIconContents.find(
        (item) =>
          item.page == 'single-blog' &&
          item.section_type == 'info' &&
          item.position_display == 'Top'
      )
    );
  }, [imgIconContents]);

  return (
    <div className="flex-1 md:flex-3 flex flex-col gap-lg">
      {loadingBlog && <BlogContentSkeleton />}

      {/* Blog title */}
      <h2 className="text-3xl font-bold font-heading leading-xl">{blog?.title}</h2>

      {/* Blog content paragraphs */}
      <article
        className="prose prose-sm max-w-none text-black/80 text-justify space-y-md text-heading text-base leading-lg mb-lg"
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(blog?.content),
        }}
      />

      {/* Optional featured image/content section */}
      <ImageContent data={content} ip="left" />
    </div>
  );
};

export default BlogBody;
