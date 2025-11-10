import OuterSection from './OuterSection';
import InnerSection from './InnerSection';
import PrimaryButton from './PrimaryButton';
import CourseFeatureCard from './CourseFeatureCard';
import { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import 'swiper/css';
import TabButtons from './TabButtons';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOurCourses } from '../../redux/courses/courseAction';

const OurCourse = () => {
  const { ourCourses } = useSelector((state) => state.course);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchOurCourses());
  }, [dispatch]);

  // --- Step 1: set default category from first group ---
  const [selectedCategory, setSelectedCategory] = useState(ourCourses?.[0]?.category?.name || '');

  useEffect(() => {
    if (ourCourses?.length > 0) {
      setSelectedCategory(ourCourses[0].category.name);
    }
  }, [ourCourses]);

  // --- Step 2: Find courses for selected category ---
  const selectedGroup = ourCourses?.find((g) => g.category.name === selectedCategory);
  const selectedCourses = selectedGroup?.courses || [];

  // --- Step 3: Swiper setup ---
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

        {/* ✅ Now directly use ourCourses */}
        <TabButtons
          data={ourCourses.map((g) => ({
            category: g.category.name,
          }))}
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
            slidesPerView="auto" // fixed width slides allow করে
            slidesPerGroup={1} // একবারে ১টা করে স্ক্রল হবে
            className="!items-stretch"
            style={{ padding: '10px' }}
          >
            {selectedCourses.map(
              (course) =>
                course.is_active && (
                  <SwiperSlide
                    key={course.id}
                    className="flex items-stretch !h-auto"
                    style={{ width: '320px' }} // fixed width
                  >
                    <div className="h-full">
                      <CourseFeatureCard course={course} />
                    </div>
                  </SwiperSlide>
                )
            )}
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
