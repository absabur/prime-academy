import React from 'react';
import CourseValueHeading from '../CourseValueHeading';
import TabContainSection from '@/components/common/TabContainSecton';
import { singleCourseValues } from '@/data/singleCoursePageData';
import CourseOutLine from '../CourseOutLine';
import FactStat from '../FactStat';
import PartnerSlider from '@/components/common/PartnerSlider';
import SuccessStories from '../SuccessStories';
import ImgContentMiddle from '../ImgContentMiddle';

const RightSideContent = () => {
  return (
    <>
      <CourseValueHeading />
      <TabContainSection tabContain={singleCourseValues} />
      <CourseOutLine />
      <FactStat />
      <ImgContentMiddle />
      <PartnerSlider />
      <SuccessStories />
    </>
  );
};

export default RightSideContent;
