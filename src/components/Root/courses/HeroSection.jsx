import { useEffect, useState } from 'react';
import HeroSection from '../../common/HeroSection';
import { useDispatch, useSelector } from 'react-redux';
import { fetchHeros } from '@/redux/hero/heroAction';

const CourseHero = () => {
  const [courseHero, setCourseHero] = useState();
  const { heros } = useSelector((state) => state.hero);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!heros?.length) {
      dispatch(fetchHeros());
    }
  }, []);

  useEffect(() => {
    let current = heros.filter((item) => item.page_name == "courses");
    setCourseHero(current[0]);
  }, [heros]);

  return (
    <HeroSection
      bannerImage={courseHero?.banner_image}
      title={courseHero?.title}
      description={courseHero?.description}
      breadcrumbs={[
        { url: '/', text: 'Home' },
        { url: '/courses', text: 'Courses' },
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

export default CourseHero;
