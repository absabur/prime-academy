import { useDispatch } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom'; // ১. setSearchParams ইমপোর্ট করুন
import MainCourseAddEditFrom from './MainCourseAddEditFrom';
import { createCourse, updateCourse } from '../../../../../redux/courseWizard/courseWizardAction';
import SwalUtils from '../../../../../utils/sweetAlert';

const MainCourses = ({ defaultValues }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const courseId = defaultValues?.id;

  const handelAddCourse = async (data) => {
    if (courseId) {
      // === UPDATE MODE ===
      try {
        await dispatch(updateCourse({ id: courseId, courseData: data })).unwrap();
        SwalUtils.success('Course updated successfully!');
        setSearchParams((prevParams) => {
          prevParams.set('step', '2');
          return prevParams;
        });
      } catch (error) {
        SwalUtils.error('Failed to update course:', error);
      }
    } else {
      // === CREATE MODE ===
      try {
        const result = await dispatch(createCourse(data)).unwrap();
        const newCourseId = result?.slug || result?.data?.slug;
        if (newCourseId) {
          navigate(`/admin-dashboard/courses/edit/${newCourseId}?step=2`);
          SwalUtils.success('Course created successfully! Proceed to the next step.');
        }
      } catch (error) {
        SwalUtils.error('Failed to create course:', error);
      }
    }
  };

  return (
    <div>
      <MainCourseAddEditFrom onSubmit={handelAddCourse} defaultValues={defaultValues} />
    </div>
  );
};

export default MainCourses;
