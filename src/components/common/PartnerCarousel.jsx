/**
 * PartnerCarousel Component (Swiper Version)
 * ------------------------------------------
 * - Displays a scrolling carousel of partner logos
 * - Uses Swiper.js for responsiveness and autoplay
 * - Partners are defined in a local array (can later be fetched dynamically)
 */

import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/autoplay';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchBrands } from '@/redux/brands/brandsAction';

const PartnerCarousel = () => {
  const dispatch = useDispatch();
  const { brands } = useSelector((state) => state.brands);

  useEffect(() => {
    dispatch(fetchBrands());
  }, []);

  return (
    <div className="mx-auto w-full">
      <Swiper
        slidesPerGroup={1}
        loop={true}
        speed={700}
        modules={[Autoplay]}
        autoplay={{ delay: 1500, disableOnInteraction: false }}
        allowTouchMove={false}
        className="w-full"
        breakpoints={{
          0: { slidesPerView: 2 },
          464: { slidesPerView: 3 },
          768: { slidesPerView: 5 },
          1024: { slidesPerView: 7 },
        }}
      >
        {[...brands, ...brands, ...brands, ...brands, ...brands, ...brands, ...brands]
          ?.filter((brand) => brand?.is_active)
          .map((partner, i) => (
            <SwiperSlide key={i} className="flex justify-center">
              <div className="p-6 flex justify-center items-center">
                <img
                  src={partner.logo}
                  alt={`${partner.id} logo`}
                  className="h-12 mx-auto object-contain"
                  loading="lazy"
                />
              </div>
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default PartnerCarousel;
