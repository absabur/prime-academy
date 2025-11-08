import OuterSection from './OuterSection';
import InnerSection from './InnerSection';
import PrimaryButton from './PrimaryButton';
import CourseFeatureCard from './CourseFeatureCard';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import 'swiper/css';
import TabButtons from './TabButtons';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCourses } from '../../redux/courses/courseAction';

// ✅ New prop-based version — expects flat course array as `courses`
const OurCourse = () => {
  const { courses, pageSize } = useSelector((state) => state.course);
  const dispatch = useDispatch();
  // --- Step 1: Group by category name ---
  const groupedCourses = useMemo(() => {
    const groups = {};
    courses.forEach((course) => {
      const catName = course.category?.name || 'Uncategorized';
      if (!groups[catName]) groups[catName] = [];
      groups[catName].push(course);
    });
    // convert to old compatible format
    return Object.entries(groups).map(([category, courseList]) => ({
      category,
      courses: courseList,
    }));
  }, [courses]);

  useEffect(() => {
    dispatch(
      fetchCourses({
        page: 1,
        page_size: 100,
      })
    );
  }, [pageSize]);

  // --- Step 2: Use first category as default ---
  const [selectedCategory, setSelectedCategory] = useState(groupedCourses[0]?.category || '');

  useEffect(() => {
    setSelectedCategory(groupedCourses[0]?.category);
  }, [groupedCourses]);

  // --- Step 3: Filter current courses ---
  const selectedCourses =
    groupedCourses.find((c) => c.category === selectedCategory)?.courses || [];

  const swiperRef = useRef(null);
  const [canSlidePrev, setCanSlidePrev] = useState(false);
  const [canSlideNext, setCanSlideNext] = useState(false);

  const handleSlideChange = (swiper) => {
    const atStart = swiper.isBeginning;
    const atEnd = swiper.isEnd;
    const canScroll = !(atStart && atEnd);
    setCanSlidePrev(canScroll && !atStart);
    setCanSlideNext(canScroll && !atEnd);
  };

  const handleSwiperInit = (swiper) => {
    swiperRef.current = swiper;
    handleSlideChange(swiper);
  };

  return (
    <OuterSection>
      <InnerSection className="space-y-lg">
        <h2 className="heading-4xl uppercase">Explore Our Professional Courses</h2>
        <p className="w-full md:w-3/4 lg:w-1/2 font-heading font-normal text-base text-black/70 leading-lg text-justify">
          Choose from our selection of industry-recognized qualifications designed to advance your
          career
        </p>

        {/* ✅ Compatible with new grouped data */}
        <TabButtons
          data={groupedCourses}
          selected={selectedCategory}
          setSelected={setSelectedCategory}
        />

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
            {selectedCourses.map((course) => {
              if (course?.is_active) {
                return (
                  <SwiperSlide key={course.id} className="flex items-stretch !h-auto">
                    <div className="flex-1 h-full">
                      <CourseFeatureCard course={course} />
                    </div>
                  </SwiperSlide>
                );
              }
            })}
          </Swiper>

          {canSlidePrev && (
            <button
              onClick={() => swiperRef.current?.slidePrev()}
              className="absolute z-10 left-0 top-1/2 -translate-y-1/2 bg-secondary/80 cursor-pointer text-white p-3 rounded-full shadow hover:bg-secondary transition"
            >
              <FaArrowLeft />
            </button>
          )}

          {canSlideNext && (
            <button
              onClick={() => swiperRef.current?.slideNext()}
              className="absolute z-10 right-0 top-1/2 -translate-y-1/2 bg-secondary/80 cursor-pointer text-white p-3 rounded-full shadow hover:bg-secondary transition"
            >
              <FaArrowRight />
            </button>
          )}
        </div>

        <div className="flex justify-center items-center">
          <PrimaryButton className="rounded-lg" text={'View All Courses'} href={`/courses`} />
        </div>
      </InnerSection>
    </OuterSection>
  );
};

export default OurCourse;
