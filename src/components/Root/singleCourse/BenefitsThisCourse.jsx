import InnerSection from '@/components/common/InnerSection';
import OuterSection from '@/components/common/OuterSection';
import { benefitsThisCourse } from '@/data/singleCoursePageData';
import React from 'react';
import CourseQuestionCard from './CourseQuestionCard';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

const BenefitsThisCourse = () => {
  const [content, setContent] = useState({});
  const { imgIconContents } = useSelector((state) => state.imgIconContent);

  useEffect(() => {
    setContent(
      imgIconContents.filter(
        (item) =>
          item.page == 'single-course' &&
          item.section_type == 'icon' &&
          item.position_display == 'Bottom'
      )
    );
  }, [imgIconContents]);

  return (
    <OuterSection>
      <InnerSection className="space-y-xl">
        <h1 className="uppercase heading-4xl text-center">BENEFITS OF INVESTING IN DATA SKILLS</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-xl ">
          {content?.length &&
            content?.map((benefit) => <CourseQuestionCard key={benefit.id} question={benefit} />)}
        </div>
      </InnerSection>
    </OuterSection>
  );
};

export default BenefitsThisCourse;
