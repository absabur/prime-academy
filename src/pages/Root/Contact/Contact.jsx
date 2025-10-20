import ContactHero from '../../../components/Root/contact/HeroSection';
import FormSection from '../../../components/Root/contact/FormSection';
import { useSEO } from '@/hooks/usePageSeo';
import Map from '@/components/Root/contact/Map';
import { useEffect, useState } from 'react';
import { fetchSeos } from '@/redux/seo/seoAction';
import { useDispatch, useSelector } from 'react-redux';
import { mapApiSeoToUseSEO } from '@/utils/mapApiSeoToUseSEO';

const Contact = () => {
  const [pageSeo, setPageSeo] = useState(null);
  const { seos } = useSelector((state) => state.seo);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSeos());
  }, []);

  useEffect(() => {
    setPageSeo(seos.find((item) => item.page_name == 'contact'));
  }, [seos]);

  useSEO(pageSeo ? mapApiSeoToUseSEO(pageSeo) : {});

  return (
    <>
      <ContactHero />
      <FormSection />
      <Map />
    </>
  );
};

export default Contact;
