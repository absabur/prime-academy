import InnerSection from '@/components/common/InnerSection';
import OuterSection from '@/components/common/OuterSection';
import { useSelector } from 'react-redux';

const CourseValueHeading = () => {
  const { course } = useSelector((state) => state.course);
  return (
    <OuterSection>
      <InnerSection style={{ paddingBottom: '0px' }}>
        <h1 className="heading-4xl">{course?.title}</h1>
        <p className="pera-sm-bold">💻 {course?.category?.name}</p>
      </InnerSection>
    </OuterSection>
  );
};

export default CourseValueHeading;
