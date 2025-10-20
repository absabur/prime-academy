import InnerSection from '@/components/common/InnerSection';
import OuterSection from '@/components/common/OuterSection';
import { whoEnrol } from '@/data/singleCoursePageData';
import React from 'react';
import CourseQuestionCard from './CourseQuestionCard';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

const WhoCanEnroll = () => {
  const [content, setContent] = useState({});
  const { imgIconContents } = useSelector((state) => state.imgIconContent);

  useEffect(() => {
    setContent(
      imgIconContents.filter(
        (item) =>
          item.page == 'single-course' &&
          item.section_type == 'icon' &&
          item.position_display == 'Top'
      )
    );
  }, [imgIconContents]);
  
  return (
    <OuterSection>
      <InnerSection className="space-y-lg">
        <h1 className="uppercase heading-4xl text-center">Who Can Enrol ?</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-xl">
          {content?.length &&
            content?.map((q, index) => <CourseQuestionCard key={index} question={q} />)}
        </div>
      </InnerSection>
    </OuterSection>
  );
};

export default WhoCanEnroll;
