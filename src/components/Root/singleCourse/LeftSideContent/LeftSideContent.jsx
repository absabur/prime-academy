import TabContainSection from '@/components/common/TabContainSecton';
import { singleCourseValues } from '@/data/singleCoursePageData';
import React from 'react';
import CourseValueHeading from '../CourseValueHeading';
import WhoCanEnroll from '../WhoCanEnroll';
import CourseOutLine from '../CourseOutLine';
import BenefitsThisCourse from '../BenefitsThisCourse';
import PartnerSlider from '@/components/common/PartnerSlider';
import OurCourse from '@/components/common/OurCourse';
import ImgContentBottom from '../ImgContentBottom';
import LetStartFrom from '../LetStartFrom';
import SuccessStories from '../SuccessStories';
import ImgContentTop from '../ImgContentTop';

const LeftSideContent = () => {
  return (
    <>
      <CourseValueHeading />
      <TabContainSection tabContain={singleCourseValues} />
      <WhoCanEnroll />
      <CourseOutLine />
      <ImgContentTop />
      <BenefitsThisCourse />
      <LetStartFrom />
      <ImgContentBottom />
      <PartnerSlider />
      <SuccessStories />
      <OurCourse />
    </>
  );
};

export default LeftSideContent;
