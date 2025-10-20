import InnerSection from '@/components/common/InnerSection';
import OuterSection from '@/components/common/OuterSection';
import { courseData } from '@/data/singleCoursePageData';
import React, { useState } from 'react';
import OutLineData from './OutLineData';

const CourseOutLine = () => {
  const [courses, setCourses] = useState(courseData.courses);

  const handelOpen = (id) => {
    const updateCourses = courses.map((course) => ({
      ...course,
      active: course.id === id ? !course.active : false,
    }));
    setCourses(updateCourses);
  };
  return (
    <OuterSection>
      <InnerSection>
        <div className="w-full md:w-1/2 mb-8 space-y-2">
          <h1 className="font-bold  text-3xl ">TECHNICAL TRAINING</h1>
          <p className="text-[16px] text-justify w-full md:w-3/4">
            The technical training component of our Level 3 IT Support apprenticeship is split into
            six practice-led courses. Each practice-led course is then split into two parts.
          </p>
        </div>
        <div className="my-3">
          {courses.map((course, index) => (
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
