/**
 * BlogCards Component
 * -------------------
 * - Displays a responsive grid of blog cards
 * - Uses BlogCard component for individual card rendering
 * - Fully responsive: 1 column on mobile, 2 on medium screens, 3 on large
 * - Card data is currently static but can be replaced with API data
 */

import { useDispatch, useSelector } from 'react-redux';
import BlogCard from './BlogCard';
import { fetchBlogs } from '@/redux/blogs/blogAction';
import { useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import BlogCardSkeleton from './BlogCardSkeleton';
import NotFoundBlogs from './NotFoundBlogs';

const BlogCards = () => {
  const { blogs, pageSize, loadingBlogs } = useSelector((state) => state.blog);
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;
  const category = searchParams.get('category') || null;
  const search = searchParams.get('search') || '';
  const order = searchParams.get('order') || '';
  const previousBlogs = useRef([]);

  useEffect(() => {
    if (blogs.length > 0) previousBlogs.current = blogs; // ✅ Store last blogs
  }, [blogs]);

  // ✅ Proper debounce effect for search
  useEffect(() => {
    const handler = setTimeout(() => {
      dispatch(
        fetchBlogs({
          category,
          page: currentPage,
          page_size: pageSize,
          search,
          order: !!order ? 'published_at' : order,
        })
      );
    }, 600); // debounce delay 600ms

    return () => {
      clearTimeout(handler); // cleanup old timer before new one
    };
  }, [search, category, currentPage, dispatch, order]);

  return (
    <section className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-lg">
      {/* Show skeletons only if loading and no previous blogs */}
      {loadingBlogs && previousBlogs.current.length === 0
        ? Array.from({ length: 3 }).map((_, index) => (
            <BlogCardSkeleton index={index} key={index} />
          ))
        : (loadingBlogs ? previousBlogs.current : blogs).map((item, index) => (
            <BlogCard key={item.id || index} item={item} index={index} />
          ))}

      {/* Show "No Blogs Found" only if NOT loading AND no blogs AND we have fetched at least once */}
      {!loadingBlogs && !blogs.length && <NotFoundBlogs />}
    </section>
  );
};

export default BlogCards;
