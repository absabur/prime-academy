import { useDispatch, useSelector } from 'react-redux';
import HeroSection from '../../common/HeroSection';
import { useEffect, useState } from 'react';
import { fetchHeros } from '@/redux/hero/heroAction';

const SingleBlogHero = () => {
  const { blog } = useSelector((state) => state.blog);
  const [singleBlogHero, setSingleBlogHero] = useState();
  const { heros } = useSelector((state) => state.hero);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchHeros());
  }, []);

  useEffect(() => {
    let current = heros.filter(
      (item) => item.page_name == import.meta.env.SINGLE_BLOG_CONTENT_PAGE_NAME
    );
    setSingleBlogHero(current[0]);
  }, [heros]);

  return (
    <HeroSection
      bannerImage={singleBlogHero?.banner_image}
      title={blog.title ?? singleBlogHero?.title}
      description={blog.excerpt ?? singleBlogHero?.description}
      button1={{
        url: singleBlogHero?.button1_url,
        text: singleBlogHero?.button1_text,
      }}
      button2={{
        url: singleBlogHero?.button2_url,
        text: singleBlogHero?.button2_text,
      }}
    />
  );
};

export default SingleBlogHero;
