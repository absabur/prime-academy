import AllCourse from '../../../../components/Dashboard/StudentDashboard/StudentMyCourse/AllCourse';
import NoLiveClassesCard from '../../../../components/Dashboard/StudentDashboard/StudentMyCourse/NoLiveClassCard';
import ThreeColLayout from '../../../../components/Dashboard/StudentDashboard/StudentMyCourse/ThreeColLayout';

const StudentMyCourses = () => {
  return <ThreeColLayout leftComponent={<AllCourse />} rightComponent={<NoLiveClassesCard />} />;
};

export default StudentMyCourses;
