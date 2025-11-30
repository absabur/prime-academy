/**
 * Blog Page
 * ----------
 * - Displays a single blog post page
 * - Includes Hero section, Blog content with sidebar, and a course promotion section
 * - Fully reusable template: pass data to BlogBodySection for different blog posts
 */

import SingleBlogHero from '../../../components/Root/blogPage/HeroSection';
import BlogBodySection from '../../../components/Root/blogPage/BlogBodySection';
import OurCourse from '../../../components/common/OurCourse';
import { useParams } from 'react-router-dom';
import { fetchSingleBlog } from '@/redux/blogs/blogAction';
import { useSEO } from '@/hooks/usePageSeo';
import { useEffect, useState } from 'react';
import { fetchSeos } from '@/redux/seo/seoAction';
import { useDispatch, useSelector } from 'react-redux';
import { mapApiSeoToUseSEO } from '@/utils/mapApiSeoToUseSEO';
import { fetchImgIconContents } from '@/redux/imgIconContent/imgIconContentAction';
import { clearBlog } from '../../../redux/blogs/blogSlice';

const Blog = () => {
  const { blog } = useSelector((state) => state.blog);
  const dispatch = useDispatch();
  const { id } = useParams();
  const [pageSeo, setPageSeo] = useState(null);
  const { seos } = useSelector((state) => state.seo);

  useEffect(() => {
    dispatch(fetchImgIconContents({ page: import.meta.env.SINGLE_BLOG_CONTENT_PAGE_NAME }));
  }, []);

  useEffect(() => {
    // dispatch(clearBlog());
    dispatch(fetchSingleBlog(id));
  }, [id]);

  useEffect(() => {
    dispatch(fetchSeos());
  }, []);

  useEffect(() => {
    setPageSeo(seos.find((item) => item.page_name == import.meta.env.SINGLE_BLOG_SEO_PAGE_NAME));
  }, [seos]);

  const seoData = pageSeo
    ? {
        ...mapApiSeoToUseSEO(pageSeo),
        title: blog?.title || pageSeo.meta_title,
        description: blog?.description || pageSeo.meta_description,
        openGraph: {
          ...mapApiSeoToUseSEO(pageSeo).openGraph,
          title: blog?.title || pageSeo.og_title,
          description: blog?.description || pageSeo.og_description,
          image: blog?.image || pageSeo.og_image,
        },
        twitter: {
          ...mapApiSeoToUseSEO(pageSeo).twitter,
          title: blog?.title || pageSeo.twitter_title,
          description: blog?.description || pageSeo.twitter_description,
          image: blog?.image || pageSeo.twitter_image,
        },
        structuredData: {
          ...mapApiSeoToUseSEO(pageSeo).structuredData,
          name: blog?.title || pageSeo.meta_title,
          description: blog?.description || pageSeo.meta_description,
          url: `https://www.primeacademy.org/blog/${blog?.slug || id}`,
        },
      }
    : null;

  useSEO(seoData || {});

  return (
    <>
      {/* Hero banner for the blog */}
      <SingleBlogHero />

      {/* Blog content and sidebar */}
      <BlogBodySection />

      {/* Course promotion section */}
      <OurCourse />
    </>
  );
};

export default Blog;
