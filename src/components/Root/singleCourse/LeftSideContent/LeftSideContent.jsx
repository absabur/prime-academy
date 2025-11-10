import TabContainSection from '@/components/common/TabContentSection';
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
import { useSelector } from 'react-redux';

const LeftSideContent = () => {
  const { course } = useSelector((state) => state.course);
  return (
    <>
      <CourseValueHeading />
      <TabContainSection tabContain={singleCourseValues} />
      {course?.detail?.why_enrol?.length && <WhoCanEnroll />}
      {course?.detail?.modules?.length && <CourseOutLine />}
      <ImgContentTop />
      {course?.detail?.benefits?.length && <BenefitsThisCourse />}
      <LetStartFrom />
      <ImgContentBottom />
      <PartnerSlider />
      {course?.detail?.success_stories?.length && <SuccessStories />}
      <OurCourse />
    </>
  );
};

export default LeftSideContent;
