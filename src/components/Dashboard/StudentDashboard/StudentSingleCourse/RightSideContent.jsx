import NoLiveClassesCard from '../StudentMyCourse/NoLiveClassCard';
import { CourseCompletedCard, JobPlacementCard, PrivateGroupCard } from './RightContent';

const RightSideContent = () => {
  return (
    <div>
      <NoLiveClassesCard />
      <JobPlacementCard />
      <PrivateGroupCard />
      <CourseCompletedCard />
    </div>
  );
};

export default RightSideContent;
