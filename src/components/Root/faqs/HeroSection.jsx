import { useEffect, useState } from 'react';
import HeroSection from '../../common/HeroSection';
import { useDispatch, useSelector } from 'react-redux';
import { fetchHeros } from '@/redux/hero/heroAction';

const FAQsHero = () => {
  const [faqsHero, setFaqsHero] = useState();
  const { heros } = useSelector((state) => state.hero);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!heros?.length) {
      dispatch(fetchHeros());
    }
  }, []);

  useEffect(() => {
    let current = heros.filter((item) => item.page_name == "faqs");
    setFaqsHero(current[0]);
  }, [heros]);

  return (
    <HeroSection
      bannerImage={faqsHero?.banner_image}
      title={faqsHero?.title}
      description={faqsHero?.description}
      updatedDate="16th March 2023"
      breadcrumbs={[
        { url: '/', text: 'Home' },
        { url: '/faqs', text: 'FAQs' },
      ]}
      button1={{
        url: faqsHero?.button1_url,
        text: faqsHero?.button1_text,
      }}
      button2={{
        url: faqsHero?.button2_url,
        text: faqsHero?.button2_text,
      }}
    />
  );
};

export default FAQsHero;
