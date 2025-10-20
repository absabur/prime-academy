import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

const HorizontalScrollSection = ({ items }) => {
  if (!items?.length) {
    return;
  }

  const slides = [...items, ...items, ...items];

  const [activeIndex, setActiveIndex] = useState(0); // currently visible slide

  const getSlideColor = (slideIndex) =>
    slideIndex === activeIndex ? 'text-white' : 'text-white/30';

  return (
    <Swiper
      slidesPerView={1} // only one slide visible
      slidesPerGroup={1}
      loop={true}
      speed={700}
      modules={[Autoplay]}
      autoplay={{ delay: 1500, disableOnInteraction: false }}
      allowTouchMove={false}
      onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
      className="w-full"
    >
      {slides.map((item, i) => (
        <SwiperSlide key={i} className="flex justify-center">
          <h2
            className={`heading-home-hero-scroll whitespace-nowrap uppercase ${getSlideColor(i)}`}
          >
            {item?.text}
          </h2>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default HorizontalScrollSection;
