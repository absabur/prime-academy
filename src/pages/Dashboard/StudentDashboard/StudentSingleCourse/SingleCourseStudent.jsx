import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ThreeColLayout from '../../../../components/Dashboard/StudentDashboard/StudentMyCourse/ThreeColLayout';
import LeftSideContent from '../../../../components/Dashboard/StudentDashboard/StudentSingleCourse/LeftSideContent';
import RightSideContent from '../../../../components/Dashboard/StudentDashboard/StudentSingleCourse/RightSideContent';
const SingleCourseStudent = () => {
  const { courseSlug } = useParams();
  const { myCourses } = useSelector((state) => state.course);
  const [courseTitle, setCourseTitle] = useState('');

  useEffect(() => {
    // Find the course from myCourses based on slug
    const currentCourse = myCourses.find((course) => course.course_slug === courseSlug);
    if (currentCourse) {
      setCourseTitle(currentCourse.course_title);
    }
  }, [courseSlug, myCourses]);

  return (
    <>
      {courseTitle && (
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-black">{courseTitle}</h1>
        </div>
      )}
      <ThreeColLayout leftComponent={<LeftSideContent />} rightComponent={<RightSideContent />} />
    </>
  );
};

export default SingleCourseStudent;
