import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

const VerticalScrollSection = ({ items }) => {
  if (!items?.length) {
    return;
  }

  // minimum 8 element required to start slider
  const slides = [...items, ...items, ...items, ...items, ...items, ...items, ...items, ...items];
  const [activeIndex, setActiveIndex] = useState(0);

  const getSlideColor = (slideIndex) => {
    // Calculate the position of middle and its prev next, in the range of array index
    // active element is first element of view port , so i have to add 3 to get middle element
    const middleIndex = (activeIndex + 3) % slides.length;
    const prevIndex = (activeIndex + 2) % slides.length;
    const nextIndex = (activeIndex + 4) % slides.length;

    // set color for slider element
    if (slideIndex === middleIndex) return 'text-white'; // middle element
    if (slideIndex === prevIndex || slideIndex === nextIndex) return 'text-white/60'; // next and prev of middle
    return 'text-white/20'; // ohter element
  };

  return (
    <Swiper
      direction="vertical"
      slidesPerView={7}
      slidesPerGroup={1}
      loop={true}
      speed={700}
      modules={[Autoplay]}
      autoplay={{ delay: 1000, disableOnInteraction: false }}
      allowTouchMove={false}
      onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
      className="h-[420px]"
      style={{ marginLeft: 0 }}
    >
      {slides.map((item, i) => (
        <SwiperSlide key={i}>
          <h2 className={`heading-home-hero-scroll line-clamp-1 ${getSlideColor(i)}`}>
            {item?.text}
          </h2>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default VerticalScrollSection;
