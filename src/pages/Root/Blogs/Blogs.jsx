/**
 * BlogPage Component
 * ------------------
 * - Displays the main blog listing page
 * - Sections include:
 *    1. Hero banner
 *    2. Top filter bar
 *    3. Grid/list of blog cards
 *    4. Pagination controls
 *    5. Upper footer or CTA section
 * - Fully modular: each section is a separate component
 */

import BlogHero from '../../../components/Root/blogs/HeroSection';
import BlogCardsSection from '../../../components/Root/blogs/BlogCardsSection';
import UpperFooterBlogs from '../../../components/Root/blogs/UpperFooterSection';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBlogCategories } from '@/redux/blogs/blogAction';
import PaginationSection from '@/components/common/PaginationSection';
import { useSEO } from '@/hooks/usePageSeo';
import { useEffect, useState } from 'react';
import { fetchSeos } from '@/redux/seo/seoAction';
import { mapApiSeoToUseSEO } from '@/utils/mapApiSeoToUseSEO';

const BlogPage = () => {
  const { blogPagination, pageSize, error } = useSelector((state) => state.blog);
  const dispatch = useDispatch();
  const [pageSeo, setPageSeo] = useState(null);
  const { seos } = useSelector((state) => state.seo);

  useEffect(() => {
    dispatch(fetchBlogCategories());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchSeos());
  }, []);

  useEffect(() => {
    setPageSeo(seos.find((item) => item.page_name == import.meta.env.VITE_BLOGS_SEO_PAGE_NAME));
  }, [seos]);

  useSEO(pageSeo ? mapApiSeoToUseSEO(pageSeo) : {});
  
  return (
    <>
      {/* Hero banner for blog listing */}
      <BlogHero />

      {/* Blog cards listing */}
      <BlogCardsSection />

      {/* Pagination controls for blog list */}
      <PaginationSection pagination={blogPagination} pageSize={pageSize} error={error} />

      {/* Optional upper footer or CTA section */}
      <UpperFooterBlogs />
    </>
  );
};

export default BlogPage;
