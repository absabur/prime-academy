import AllCourse from '../../../../components/Dashboard/StudentDashboard/StudentCourse/AllCourse';
import NoLiveClassesCard from '../../../../components/Dashboard/StudentDashboard/StudentCourse/NoLiveClassCard';
import ThreeColLayout from '../../../../components/Dashboard/StudentDashboard/StudentCourse/ThreeColLayout';

const StudentMyCourses = () => {
  return <ThreeColLayout leftComponent={<AllCourse />} rightComponent={<NoLiveClassesCard />} />;
};

export default StudentMyCourses;
