import { useSEO } from '@/hooks/usePageSeo';
import { useEffect, useState } from 'react';
import { fetchSeos } from '@/redux/seo/seoAction';
import { useDispatch, useSelector } from 'react-redux';
import { mapApiSeoToUseSEO } from '@/utils/mapApiSeoToUseSEO';
import PrivacyContent from '../../../components/Root/privacypolicy/PrivacyContent';
import PrivacyPolicyHero from '../../../components/Root/privacypolicy/PrivacyPolicyHero';

const PrivacyPolicy = () => {
  const [pageSeo, setPageSeo] = useState(null);
  const { seos } = useSelector((state) => state.seo);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSeos());
  }, []);

  useEffect(() => {
    setPageSeo(seos.find((item) => item.page_name == 'privacy-policy'));
  }, [seos]);

  useSEO(pageSeo ? mapApiSeoToUseSEO(pageSeo) : {});
  return (
    <>
      <PrivacyPolicyHero />
      <PrivacyContent />
    </>
  );
};

export default PrivacyPolicy;
