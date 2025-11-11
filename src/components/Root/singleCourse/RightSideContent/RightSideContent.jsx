import React from 'react';
import CourseValueHeading from '../CourseValueHeading';
import TabContainSection from '@/components/common/TabContentSection';
import { singleCourseValues } from '@/data/singleCoursePageData';
import CourseOutLine from '../CourseOutLine';
import PartnerSlider from '@/components/common/PartnerSlider';
import OurCourse from '@/components/common/OurCourse';
import SuccessStories from '../SuccessStories';
import ImgContentMiddle from '../ImgContentMiddle';

const RightSideContent = () => {
  return (
    <>
      {/* <CourseValueHeading /> */}
      {/* <TabContainSection tabContain={singleCourseValues} /> */}
      {/* <CourseOutLine /> */}
      {/* <ImgContentMiddle /> */}
      <PartnerSlider />
      <OurCourse />
      {/* <SuccessStories /> */}
    </>
  );
};

export default RightSideContent;
