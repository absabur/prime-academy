import CourseValueHeading from '../CourseValueHeading';
import WhoCanEnroll from '../WhoCanEnroll';
import CourseOutLine from '../CourseOutLine';
import BenefitsThisCourse from '../BenefitsThisCourse';
import PartnerSlider from '@/components/common/PartnerSlider';
import OurCourse from '@/components/common/OurCourse';
import ImgContentBottom from '../ImgContentBottom';
import LetStartFrom from '../LetStartFrom';
import SuccessStories from '../SuccessStories';
import ImgContentTop from '../ImgContentTop';
import { useSelector } from 'react-redux';
import TabSectionCourse from '../TabSectionCourse';

const LeftSideContent = () => {
  const { course } = useSelector((state) => state.course);
  return (
    <>
      <CourseValueHeading />
      {course?.detail?.content_sections[0]?.tabs?.length ? <TabSectionCourse /> : null}
      {course?.detail?.why_enrol?.length ? <WhoCanEnroll /> : null}
      {course?.detail?.modules?.length ? <CourseOutLine /> : null}
      {course?.detail?.side_image_sections?.length ? <ImgContentTop /> : null}
      {course?.detail?.benefits?.length ? <BenefitsThisCourse /> : null}
      <LetStartFrom />
      {course?.detail?.side_image_sections?.length == 2 ? <ImgContentBottom /> : null}
      <PartnerSlider />
      {course?.detail?.success_stories?.length ? <SuccessStories /> : null}
      <OurCourse />
    </>
  );
};

export default LeftSideContent;
