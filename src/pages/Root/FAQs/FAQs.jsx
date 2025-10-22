/**
 * FAQs Page
 * ----------
 * - Renders the Frequently Asked Questions page.
 * - Includes a hero section, FAQ accordion sections, and a footer CTA.
 */

import FAQsHero from '../../../components/Root/faqs/HeroSection';
import FaqsSections from '../../../components/Root/faqs/FaqsSections';
import UpperFooterFaq from '../../../components/Root/faqs/UpperFooterSection';
import { useSEO } from '@/hooks/usePageSeo';
import { useEffect, useState } from 'react';
import { fetchSeos } from '@/redux/seo/seoAction';
import { useDispatch, useSelector } from 'react-redux';
import { mapApiSeoToUseSEO } from '@/utils/mapApiSeoToUseSEO';
import { fetchFaqs } from '@/redux/faqs/faqsAction';

const FAQs = () => {
  const [pageSeo, setPageSeo] = useState(null);
  const { seos } = useSelector((state) => state.seo);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFaqs());
  }, []);

  useEffect(() => {
    dispatch(fetchSeos());
  }, []);

  useEffect(() => {
    setPageSeo(seos.find((item) => item.page_name == 'faqs'));
  }, [seos]);

  useSEO(pageSeo ? mapApiSeoToUseSEO(pageSeo) : {});

  return (
    <>
      {/* Hero / Banner Section */}
      <FAQsHero />

      {/* FAQ Accordion Section */}
      <FaqsSections />

      {/* Call-to-Action Footer Section */}
      <UpperFooterFaq />
    </>
  );
};

export default FAQs;
