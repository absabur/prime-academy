/**
 * HomePage Component
 * -----------------
 * - Serves as the main landing page of the website
 * - Composes multiple sections to create the full homepage experience
 * - Sections are imported as separate components for modularity and maintainability
 */

import HomeHero from '../../../components/Root/home/HeroSection';
import IconContentsTop from '../../../components/Root/home/IconContentsTop';
import ImageContentBottom from '../../../components/Root/home/ImageContentBottom';
import KnowUs from '../../../components/Root/home/KnowUs';
import OurBlogs from '../../../components/Root/home/OurBlogs';
import ImageContentTop from '../../../components/Root/home/ImageContentTop';
import OurCourse from '../../../components/common/OurCourse';
import PartnerSlider from '../../../components/common/PartnerSlider';
import { useSEO } from '@/hooks/usePageSeo';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { fetchSeos } from '@/redux/seo/seoAction';
import { mapApiSeoToUseSEO } from '@/utils/mapApiSeoToUseSEO';
import { fetchImgIconContents } from '@/redux/imgIconContent/imgIconContentAction';

const HomePage = () => {
  const [pageSeo, setPageSeo] = useState(null);
  const { seos } = useSelector((state) => state.seo);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchImgIconContents({ page: import.meta.env.VITE_HOME_CONTENT_PAGE_NAME }));
  }, []);

  useEffect(() => {
    dispatch(fetchSeos());
  }, []);

  useEffect(() => {
    setPageSeo(seos.find((item) => item.page_name == import.meta.env.VITE_HOME_SEO_PAGE_NAME));
  }, [seos]);

  useSEO(pageSeo ? mapApiSeoToUseSEO(pageSeo) : {});

  return (
    <>
      {/* Hero banner with CTA */}
      <HomeHero />

      {/* About Prime Academy section */}
      <ImageContentBottom />

      {/* Courses showcase */}
      <OurCourse />

      {/* Partner logos carousel */}
      <PartnerSlider />

      {/* Image content section with optional video */}
      <ImageContentTop />

      {/* Key features of the academy */}
      {/* <IconContentsTop /> */}

      {/* Statistics and achievements */}
      <KnowUs />

      {/* Latest blog posts */}
      <OurBlogs />
    </>
  );
};

export default HomePage;
