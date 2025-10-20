import { useDispatch, useSelector } from 'react-redux';
import HeroSection from '../../common/HeroSection';
import { useEffect, useState } from 'react';
import { fetchHeros } from '@/redux/hero/heroAction';

const AboutHero = () => {
  const [aboutHero, setAboutHero] = useState();
  const { heros } = useSelector((state) => state.hero);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!heros?.length) {
      dispatch(fetchHeros());
    }
  }, []);

  useEffect(() => {
    let current = heros.filter((item) => item.page_name == "about");
    setAboutHero(current[0]);
  }, [heros]);

  return (
    <HeroSection
      bannerImage={aboutHero?.banner_image}
      className="relative"
      title={aboutHero?.title}
      description={aboutHero?.description}
      breadcrumbs={[
        { url: '/', text: 'Home' },
        { url: '/about', text: 'About Us' },
      ]}
      button1={{
        url: aboutHero?.button1_url,
        text: aboutHero?.button1_text,
      }}
      button2={{
        url: aboutHero?.button2_url,
        text: aboutHero?.button2_text,
      }}
    />
  );
};

export default AboutHero;
