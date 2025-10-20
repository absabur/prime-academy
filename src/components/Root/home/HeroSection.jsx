import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchHeros } from '@/redux/hero/heroAction';

// ✅ Import the new common component
import HeroSection from '../../common/HeroSection'; // Adjust path as needed

const HomeHero = () => {
  const dispatch = useDispatch();
  const { heros } = useSelector((state) => state.hero);

  // Data fetching and selection logic remains here
  const homeHero = useMemo(() => heros?.find((item) => item.page_name === "home"), [heros]);

  useEffect(() => {
    if (!heros?.length) {
      dispatch(fetchHeros());
    }
  }, [dispatch, heros]);

  return (
    <HeroSection
      title={'GIVING YOU \n THE CONFIDENCE TO'}
      // title={homeHero?.title || 'GIVING YOU \n THE CONFIDENCE TO'}
      description={homeHero?.description}
      bannerImage={homeHero?.banner_image}
      slides={homeHero?.slides}
      from="home"
      button1={{
        url: homeHero?.button1_url,
        text: homeHero?.button1_text,
      }}
      button2={{
        url: homeHero?.button2_url,
        text: homeHero?.button2_text,
      }}
    />
  );
};

export default HomeHero;
