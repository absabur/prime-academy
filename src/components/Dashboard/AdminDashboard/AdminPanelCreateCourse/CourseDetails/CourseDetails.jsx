import CourseHeroForm from './CourseHeroForm';
import { useDispatch } from 'react-redux';
import SwalUtils from '../../../../../utils/sweetAlert';
import {
  createCourseDetails,
  singelCourse,
  updateCourseDetails,
} from '../../../../../redux/courseWizard/courseWizardAction';
import { useSearchParams } from 'react-router-dom';

const CourseDetails = ({ defaultValues }) => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  // Check if course details already exist
  const detailExists = defaultValues?.detail?.id;
  const detailData = defaultValues?.detail || {};

  const handleSubmit = async (data) => {
    // Handle form submission logic here
    const formDataWithCourseId = defaultValues?.id && { ...data, course: defaultValues?.id };

    // Check if course details already exist (use defaultValues.detail.id)
    const detailId = defaultValues?.detail?.id || data.id;

    if (detailId) {
      // Update existing course details
      try {
        await dispatch(updateCourseDetails({ id: detailId, detailData: data })).unwrap();
        // Refetch course data to get fresh data
        SwalUtils.success('Course details updated successfully!');
        setSearchParams((prevParams) => {
          prevParams.set('step', '5');
          return prevParams;
        });
      } catch (error) {
        SwalUtils.error(error?.message || error?.data?.message || 'Course detail Update fail');
      }
    } else {
      // Create new course details
      try {
        await dispatch(createCourseDetails(formDataWithCourseId)).unwrap();
        // Refetch course data to get fresh data
        SwalUtils.success('Course details created successfully! Proceed to the next step.');
        setSearchParams((prevParams) => {
          prevParams.set('step', '5');
          return prevParams;
        });
      } catch (error) {
        SwalUtils.error(error?.message || error?.data?.message || 'Course detail creation fail');
      }
    }
  };

  return (
    <div className="space-y-md">
      {/* Status Banner */}
      {detailExists && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-md">
          <p className="text-blue-800 font-medium">
            ✏️ Editing existing course details (ID: {detailData.id})
          </p>
          <p className="text-blue-600 text-sm mt-1">
            The form below is populated with your current course details. Make changes and save to
            update.
          </p>
        </div>
      )}

      <CourseHeroForm defaultValues={detailData} onSubmit={handleSubmit} />
    </div>
  );
};

export default CourseDetails;
