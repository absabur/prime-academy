import CourseHeroForm from './CourseHeroForm';
import { useDispatch } from 'react-redux';
import SwalUtils from '../../../../../utils/sweetAlert';
import {
  createCourseDetails,
  updateCourseDetails,
} from '../../../../../redux/courseWizard/courseWizardAction';
import { useSearchParams } from 'react-router-dom';

const CourseDetails = ({ defaultValues }) => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const handleSubmit = async (data) => {
    // Handle form submission logic here
    const formDataWithCourseId = defaultValues?.id && { ...data, course: defaultValues?.id };
    if (data.id) {
      // Update existing course details
      try {
        await dispatch(updateCourseDetails({ id: data.id, detailData: data })).unwrap();
        SwalUtils.success('Course details updated successfully!');
        setSearchParams((prevParams) => {
          prevParams.set('step', '4');
          return prevParams;
        });
      } catch (error) {
        SwalUtils.error(error?.message || error?.data?.message || 'Course detail Update fail');
      }
    } else {
      // Create new course details
      try {
        await dispatch(createCourseDetails(formDataWithCourseId)).unwrap();
        SwalUtils.success('Course details created successfully! Proceed to the next step.');
        setSearchParams((prevParams) => {
          prevParams.set('step', '4');
          return prevParams;
        });
      } catch (error) {
        SwalUtils.error(error?.message || error?.data?.message || 'Course detail Update fail');
      }
    }
  };

  return (
    <>
      <CourseHeroForm defaultValues={defaultValues.detail} onSubmit={handleSubmit} />
    </>
  );
};

export default CourseDetails;
