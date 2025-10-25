import HeroSection from '@/components/common/HeroSection';
import { fetchHeros } from '@/redux/hero/heroAction';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const SingleCourseHero = () => {
  const [courseHero, setCourseHero] = useState();
  const { heros } = useSelector((state) => state.hero);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchHeros());
  }, []);

  useEffect(() => {
    let current = heros.filter((item) => item.page_name == "single-course");
    setCourseHero(current[0]);
  }, [heros]);

  return (
    <HeroSection
      bannerImage={courseHero?.banner_image}
      title={courseHero?.title}
      description={courseHero?.description}
      className="relative"
      breadcrumbs={[
        { url: '/', text: 'Home' },
        { url: '/course', text: 'Course' },
        { url: '/course/1', text: '1' },
      ]}
      button1={{
        url: courseHero?.button1_url,
        text: courseHero?.button1_text,
      }}
      button2={{
        url: courseHero?.button2_url,
        text: courseHero?.button2_text,
      }}
    />
  );
};

export default SingleCourseHero;
