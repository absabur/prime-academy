import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMyCourses } from '../../../../redux/courses/courseAction';
import ThreeColLayout from '../../../../components/Dashboard/StudentDashboard/StudentMyCourse/ThreeColLayout';
import LeftSideContent from '../../../../components/Dashboard/StudentDashboard/StudentSingleCourse/LeftSideContent';
import RightSideContent from '../../../../components/Dashboard/StudentDashboard/StudentSingleCourse/RightSideContent';
const SingleCourseStudent = () => {
  const { courseSlug, batchId } = useParams();
  const dispatch = useDispatch();
  const { myCourses } = useSelector((state) => state.course);
  const [courseTitle, setCourseTitle] = useState('');
  const [batchName, setBatchName] = useState('');

  // Fetch enrolled courses when component mounts
  useEffect(() => {
    dispatch(fetchMyCourses());
  }, [dispatch]);

  useEffect(() => {
    
    // Find the specific enrollment based on BOTH slug AND batch_id
    const currentCourse = myCourses.find((course) => course.course_slug === courseSlug && course.batch_id === batchId);
    
    if (currentCourse) {
      setCourseTitle(currentCourse.course_title);
      // Get batch name from already extracted flat properties (from Redux)
      if (currentCourse.batchName && currentCourse.batchName !== 'N/A') {
        setBatchName(currentCourse.batchName);
      }
    }
  }, [courseSlug, batchId, myCourses]);

  return (
    <>
      {courseTitle && (
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-black">
            {courseTitle}
            {batchName && <span className="text-2xl text-primary ml-2">- {batchName}</span>}
          </h1>
        </div>
      )}
      <ThreeColLayout leftComponent={<LeftSideContent batchId={batchId} />} rightComponent={<RightSideContent />} />
    </>
  );
};

export default SingleCourseStudent;
