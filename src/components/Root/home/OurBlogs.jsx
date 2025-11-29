/**
 * OurBlogs Component
 * -----------------
 * - Displays a preview of recent blog posts in a responsive grid
 * - Includes a heading, description, blog cards, and a call-to-action button
 * - Uses OuterSection + InnerSection for consistent layout
 * - Blog data is defined locally but can be fetched dynamically in production
 */

import OuterSection from '../../common/OuterSection';
import InnerSection from '../../common/InnerSection';
import BlogCard from './BlogCard';
import PrimaryButton from '../../common/PrimaryButton';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLatestBlogs } from '@/redux/blogs/blogAction';
import { useEffect, useState } from 'react';

const OurBlogs = () => {
  const { latestBlogs } = useSelector((state) => state.blog);
  const dispatch = useDispatch();
  const [activeBlogs, setActiveBlogs] = useState([]);

  useEffect(() => {
    if (!latestBlogs.length) {
      dispatch(fetchLatestBlogs());
    }
  }, []);

  useEffect(() => {
    if (latestBlogs.length) {
      setActiveBlogs(latestBlogs.filter((blog) => blog.show_in_home_latest));
    }
  }, [latestBlogs]);

  if (!activeBlogs.length) {
    return null;
  }

  return (
    <OuterSection>
      <InnerSection className="space-y-lg">
        {/* Section Heading */}
        <h2 className="text-primary heading-4xl text-center">Our Blogs</h2>

        {/* Section Description */}
        <p className="text-base font-normal font-heading text-black/50 text-center">
          Stay updated with the latest insights, success stories, and educational trends
        </p>

        {/* Blog Cards Grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-lg items-stretch"
          style={{ padding: '10px' }}
        >
          {activeBlogs.map((blog) => (
            <BlogCard key={blog.title} blog={blog} />
          ))}
        </div>

        {/* Call-to-Action Button */}
        <div className="flex justify-center">
          <PrimaryButton text={`View All Blogs`} href={`/blogs`} className="rounded-lg" />
        </div>
      </InnerSection>
    </OuterSection>
  );
};

export default OurBlogs;
