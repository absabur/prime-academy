import InnerSection from '@/components/common/InnerSection';
import OuterSection from '@/components/common/OuterSection';
import React from 'react';
import SecondaryButton from '@/components/common/SecondaryButton';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';
import StoryCard from './StoryCard';
import { success1, success2 } from '@/data/singleCoursePageData';

const SuccessStories = () => {
  return (
    <OuterSection
      className="w-full min-h-[600px] bg-cover bg-center relative"
      style={{ backgroundImage: `url(/assets/success-bg.jpg)` }}
    >
      <div
        className="absolute inset-0"
        style={{ backgroundColor: `rgba(0, 0, 0, ${60 / 100})` }}
        aria-hidden="true"
      ></div>

      {/* Content container */}
      <InnerSection className="z-10 text-white">
        <div className="flex items-center justify-between gap-xl w-full flex-col md:flex-row">
          <h3 className="text-3xl font-bold font-heading">Success Stories</h3>
          <div className="flex gap-lg">
            <Link
              to={'#'}
              className="flex items-center gap-2 mt-auto text-sm text-white/70 font-heading hover:text-white"
            >
              Lorem Ipsum Is very <FaArrowRight />
            </Link>
            <Link
              to={'#'}
              className="flex items-center gap-2 mt-auto text-sm text-white/70 font-heading hover:text-white"
            >
              Lorem Ipsum very <FaArrowRight />
            </Link>
          </div>
        </div>
        <div className="flex gap-xl mt-lg flex-col md:flex-row">
          <StoryCard story={success1} />
          <StoryCard story={success2} />
        </div>
      </InnerSection>
    </OuterSection>
  );
};

export default SuccessStories;
