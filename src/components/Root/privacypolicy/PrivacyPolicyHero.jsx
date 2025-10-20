import { useEffect, useState } from 'react';
import HeroSection from '../../common/HeroSection';
import { useDispatch, useSelector } from 'react-redux';
import { fetchHeros } from '@/redux/hero/heroAction';

const PrivacyPolicyHero = () => {
  const [ppHero, setPpHero] = useState();
  const { heros } = useSelector((state) => state.hero);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!heros?.length) {
      dispatch(fetchHeros());
    }
  }, []);

  useEffect(() => {
    let current = heros.filter((item) => item.page_name == "privacy-policy");
    setPpHero(current[0]);
  }, [heros]);

  return (
    <HeroSection
      bannerImage={ppHero?.banner_image}
      className="relative"
      title={ppHero?.title}
      description={ppHero?.description}
      breadcrumbs={[
        { url: '/', text: 'Home' },
        { url: '/privacy-policy', text: 'PrivacyPolicy' },
      ]}
      button1={{
        url: ppHero?.button1_url,
        text: ppHero?.button1_text,
      }}
      button2={{
        url: ppHero?.button2_url,
        text: ppHero?.button2_text,
      }}
    />
  );
};

export default PrivacyPolicyHero;
