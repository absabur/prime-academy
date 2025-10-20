/**
 * About Page Component
 * -------------------
 * - Composes multiple sections to present information about the academy
 * - Sections are imported as separate components for modularity
 * - Includes hero, values, achievements, partners, and career opportunities
 */

import AboutHero from '../../../components/Root/about/HeroSection';
import ImageContentTop from '../../../components/Root/about/ImageContentTop';
import OurValues from '../../../components/Root/about/OurValues';
import ImageContentMiddle from '../../../components/Root/about/ImageContentMiddle';
import PartnerSlider from '../../../components/common/PartnerSlider';
import ImageContentBottom from '../../../components/Root/about/ImageContentBottom';
import { useSEO } from '@/hooks/usePageSeo';
import { useEffect, useState } from 'react';
import { fetchSeos } from '@/redux/seo/seoAction';
import { useDispatch, useSelector } from 'react-redux';
import { mapApiSeoToUseSEO } from '@/utils/mapApiSeoToUseSEO';
import { fetchImgIconContents } from '@/redux/imgIconContent/imgIconContentAction';

const About = () => {
  const [pageSeo, setPageSeo] = useState(null);
  const { seos } = useSelector((state) => state.seo);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchImgIconContents({ page: 'about' }));
  }, []);

  useEffect(() => {
    dispatch(fetchSeos());
  }, []);

  useEffect(() => {
    setPageSeo(seos.find((item) => item.page_name == 'about'));
  }, [seos]);

  useSEO(pageSeo ? mapApiSeoToUseSEO(pageSeo) : {});

  return (
    <>
      {/* Hero banner for About page */}
      <AboutHero />

      {/* Who we are section */}
      <ImageContentTop />

      {/* Core values of the academy */}

      <OurValues />

      {/* Largest provider showcase */}
      <ImageContentMiddle />

      {/* Partners carousel */}
      <PartnerSlider />

      {/* Career opportunities section */}
      <ImageContentBottom />
    </>
  );
};

export default About;
