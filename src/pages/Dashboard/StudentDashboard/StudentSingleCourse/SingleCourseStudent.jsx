import ThreeColLayout from '../../../../components/Dashboard/StudentDashboard/StudentMyCourse/ThreeColLayout';
import LeftSideContent from '../../../../components/Dashboard/StudentDashboard/StudentSingleCourse/LeftSideContent';
import RightSideContent from '../../../../components/Dashboard/StudentDashboard/StudentSingleCourse/RightSideContent';

const SingleCourseStudent = () => {
  return (
    <ThreeColLayout leftComponent={<LeftSideContent />} rightComponent={<RightSideContent />} />
  );
};

export default SingleCourseStudent;
