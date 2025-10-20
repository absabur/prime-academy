import RefundPolicyHero from '../../../components/Root/refundpolicy/RefundPolicyHero';
import RefundContent from '../../../components/Root/refundpolicy/RefundContent';
import { useSEO } from '@/hooks/usePageSeo';
import { useEffect, useState } from 'react';
import { fetchSeos } from '@/redux/seo/seoAction';
import { useDispatch, useSelector } from 'react-redux';
import { mapApiSeoToUseSEO } from '@/utils/mapApiSeoToUseSEO';

const RefundPolicy = () => {
  const [pageSeo, setPageSeo] = useState(null);
  const { seos } = useSelector((state) => state.seo);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSeos());
  }, []);

  useEffect(() => {
    setPageSeo(seos.find((item) => item.page_name == 'refund-policy'));
  }, [seos]);

  useSEO(pageSeo ? mapApiSeoToUseSEO(pageSeo) : {});

  return (
    <>
      {/* Page Content */}
      <RefundPolicyHero />
      <RefundContent />
    </>
  );
};

export default RefundPolicy;
