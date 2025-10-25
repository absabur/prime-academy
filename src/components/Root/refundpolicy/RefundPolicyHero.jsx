import { useEffect, useState } from 'react';
import HeroSection from '../../common/HeroSection';
import { useDispatch, useSelector } from 'react-redux';
import { fetchHeros } from '@/redux/hero/heroAction';

const RefundPolicyHero = () => {
  const [rpHero, setRpHero] = useState();
  const { heros } = useSelector((state) => state.hero);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchHeros());
  }, []);

  useEffect(() => {
    let current = heros.filter((item) => item.page_name == "refund-policy");
    setRpHero(current[0]);
  }, [heros]);

  return (
    <HeroSection
      bannerImage={rpHero?.banner_image}
      className="relative"
      title={rpHero?.title}
      description={rpHero?.description}
      breadcrumbs={[
        { url: '/', text: 'Home' },
        { url: '/privacy-policy', text: 'PrivacyPolicy' },
      ]}
      button1={{
        url: rpHero?.button1_url,
        text: rpHero?.button1_text,
      }}
      button2={{
        url: rpHero?.button2_url,
        text: rpHero?.button2_text,
      }}
    />
  );
};

export default RefundPolicyHero;
