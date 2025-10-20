/**
 * OurCourse Component
 * -------------------
 * - Displays a list of courses categorized by levels (Level 3, 5, 6)
 * - Supports desktop tabs and mobile dropdown for category selection
 * - Uses OuterSection + InnerSection for consistent spacing and layout
 * - Displays course cards dynamically based on selected category
 */

import OuterSection from './OuterSection';
import InnerSection from './InnerSection';
import PrimaryButton from './PrimaryButton';
import CourseFeatureCard from './CourseFeatureCard';
import { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import 'swiper/css';
import { coursesData } from '../../data/courseData';
import TabButtons from './TabButtons';

const OurCourse = () => {
  const [selectedCategory, setSelectedCategory] = useState(coursesData[0].category);

  // Filter courses based on selected category
  const selectedCourses = coursesData.find((c) => c.category === selectedCategory).courses;

  const swiperRef = useRef(null);
  const [canSlidePrev, setCanSlidePrev] = useState(false);
  const [canSlideNext, setCanSlideNext] = useState(false);

  const handleSlideChange = (swiper) => {
    // Show next/prev buttons only if scrolling is actually possible
    const atStart = swiper.isBeginning;
    const atEnd = swiper.isEnd;
    const canScroll = !(atStart && atEnd); // if both true, no scroll needed

    setCanSlidePrev(canScroll && !atStart);
    setCanSlideNext(canScroll && !atEnd);
  };

  const handleSwiperInit = (swiper) => {
    swiperRef.current = swiper;
    handleSlideChange(swiper); // initialize button state immediately
  };

  return (
    <OuterSection>
      <InnerSection className="space-y-lg">
        {/* Section title and description */}
        <h2 className="heading-4xl uppercase">Our Course</h2>
        <p className="w-full md:w-3/4 lg:w-1/2 font-heading font-normal text-base text-black/70 leading-lg text-justify">
          UK-certified training in English, IT, and Professional Skills — designed to sharpen your
          talent and accelerate career growth
        </p>

        <TabButtons
          data={coursesData}
          selected={selectedCategory}
          setSelected={setSelectedCategory}
        />

        {/* Course cards grid */}
        <div className="relative w-full">
          <Swiper
            key={selectedCategory}
            onSwiper={handleSwiperInit}
            onSlideChange={handleSlideChange}
            loop={false}
            autoplay={false}
            allowTouchMove={false}
            spaceBetween={20}
            breakpoints={{
              0: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 4 },
            }}
            className="!items-stretch"
            style={{ padding: '10px' }}
          >
            {selectedCourses.map((course) => (
              <SwiperSlide key={course.id} className="flex items-stretch !h-auto">
                <div className="flex-1 h-full">
                  <CourseFeatureCard course={course} />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Prev Button */}
          {canSlidePrev && (
            <button
              onClick={() => swiperRef.current?.slidePrev()}
              className="absolute z-10 left-0 top-1/2 -translate-y-1/2 bg-secondary/80 cursor-pointer text-white p-3 rounded-full shadow hover:bg-secondary transition"
            >
              <FaArrowLeft />
            </button>
          )}

          {/* Next Button */}
          {canSlideNext && (
            <button
              onClick={() => swiperRef.current?.slideNext()}
              className="absolute z-10 right-0 top-1/2 -translate-y-1/2 bg-secondary/80 cursor-pointer text-white p-3 rounded-full shadow hover:bg-secondary transition"
            >
              <FaArrowRight />
            </button>
          )}
        </div>

        {/* View all courses button */}
        <div className="flex justify-center items-center">
          <PrimaryButton className="rounded-lg" text={'View All Courses'} href={`/courses`} />
        </div>
      </InnerSection>
    </OuterSection>
  );
};

export default OurCourse;
