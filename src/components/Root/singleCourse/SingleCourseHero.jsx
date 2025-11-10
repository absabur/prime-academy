import HeroSection from '@/components/common/HeroSection';
import { fetchHeros } from '@/redux/hero/heroAction';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const SingleCourseHero = () => {
  const { course } = useSelector((state) => state.course);
  const [courseHero, setCourseHero] = useState();
  const { heros } = useSelector((state) => state.hero);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchHeros());
  }, []);

  useEffect(() => {
    let current = heros.filter((item) => item.page_name == 'single-course');
    setCourseHero(current[0]);
  }, [heros]);

  return (
    <HeroSection
      bannerImage={courseHero?.banner_image}
      title={course?.detail?.hero_text || course?.title}
      description={course?.detail?.hero_description || course?.short_description}
      className="relative"
      button1={{
        text: 'Enroll Now',
        url: '#',
      }}
    />
  );
};

export default SingleCourseHero;
