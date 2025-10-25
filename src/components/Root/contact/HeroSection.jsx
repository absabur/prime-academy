import { useDispatch, useSelector } from 'react-redux';
import HeroSection from '../../common/HeroSection';
import { useEffect, useState } from 'react';
import { fetchHeros } from '@/redux/hero/heroAction';

const ContactHero = () => {
  const [contactHero, setContactHero] = useState();
  const { heros } = useSelector((state) => state.hero);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchHeros());
  }, []);

  useEffect(() => {
    let current = heros.filter((item) => item.page_name == "contact");
    setContactHero(current[0]);
  }, [heros]);

  return (
    <HeroSection
      bannerImage={contactHero?.banner_image}
      title={contactHero?.title}
      description={contactHero?.description}
      breadcrumbs={[
        { url: '/', text: 'Home' },
        { url: '/contact', text: 'Contact Us' },
      ]}
      button1={{
        url: contactHero?.button1_url,
        text: contactHero?.button1_text,
      }}
      button2={{
        url: contactHero?.button2_url,
        text: contactHero?.button2_text,
      }}
    />
  );
};

export default ContactHero;
