import InnerSection from '@/components/common/InnerSection';
import OuterSection from '@/components/common/OuterSection';
import React, { useEffect, useState } from 'react';
import OutLineData from './OutLineData';
import { useSelector } from 'react-redux';
import DOMPurify from 'dompurify';
import { singleCourseModuleDataConversion } from '../../../utils/singleCourseModuleDataConversion';

const CourseOutLine = () => {
  const { course } = useSelector((state) => state.course);
  const [courses, setCourses] = useState();

  const handelOpen = (id) => {
    const updateCourses = courses.map((course) => ({
      ...course,
      active: course.id === id ? !course.active : false,
    }));
    setCourses(updateCourses);
  };

  useEffect(() => {
    setCourses(singleCourseModuleDataConversion(course?.detail?.modules));
  }, [course]);

  return (
    <OuterSection>
      <InnerSection>
        <div className="w-full mb-8 space-y-2">
          <h1 className="font-bold  text-3xl ">TECHNICAL TRAINING</h1>
          <div
            className="prose prose-sm max-w-none text-black/80 text-justify"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(course?.full_description),
            }}
          />
        </div>
        <div className="my-3">
          {courses?.map((course, index) => (
            <OutLineData
              key={course.id}
              course={course}
              handelOpen={handelOpen}
              index={index}
              length={courses.length}
            />
          ))}
        </div>
      </InnerSection>
    </OuterSection>
  );
};

export default CourseOutLine;
