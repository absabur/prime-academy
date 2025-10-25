import { useDispatch, useSelector } from 'react-redux';
import HeroSection from '../../common/HeroSection';
import { useEffect, useState } from 'react';
import { fetchHeros } from '@/redux/hero/heroAction';

const BlogHero = () => {
  const [blogsHero, setBlogsHero] = useState();
  const { heros } = useSelector((state) => state.hero);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchHeros());
  }, []);

  useEffect(() => {
    let current = heros.filter((item) => item.page_name == 'blogs');
    setBlogsHero(current[0]);
  }, [heros]);

  return (
    <HeroSection
      bannerImage={blogsHero?.banner_image}
      title={blogsHero?.title}
      description={blogsHero?.description}
      breadcrumbs={[
        { url: '/', text: 'Home' },
        { url: '/blogs', text: 'Blogs & Resources' },
      ]}
      button1={{
        url: blogsHero?.button1_url,
        text: blogsHero?.button1_text,
      }}
      button2={{
        url: blogsHero?.button2_url,
        text: blogsHero?.button2_text,
      }}
    />
  );
};

export default BlogHero;
