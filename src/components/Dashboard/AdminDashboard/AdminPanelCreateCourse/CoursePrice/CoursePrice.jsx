import { useSearchParams } from 'react-router-dom';
import CoursePricingForm from './CoursePriceFrom';
import { useDispatch } from 'react-redux';
import {
  createCoursePrice,
  singelCourse,
  updateCoursePrice,
} from '../../../../../redux/courseWizard/courseWizardAction';
import SwalUtils from '../../../../../utils/sweetAlert';

const CoursePrice = ({ defaultValues }) => {
  const dispatch = useDispatch();

  const [searchParams, setSearchParams] = useSearchParams();
  let defaultFormdata;
  if (defaultValues) {
    defaultFormdata = {
      ...defaultValues?.pricing,
    };
  } else {
    defaultFormdata = {};
  }

  const createPrice = async (formData) => {
    const dataWithCourseId = defaultValues?.id && { ...formData, course: defaultValues?.id };

    // Check if pricing already exists (check both formData.id and defaultValues.pricing.id)
    const priceId = formData?.id || defaultValues?.pricing?.id;

    if (priceId) {
      // === UPDATE MODE ===
      try {
        await dispatch(updateCoursePrice({ id: priceId, priceData: dataWithCourseId })).unwrap();
        // Refetch course data to get fresh data
        if (defaultValues?.slug) {
          await dispatch(singelCourse(defaultValues.slug));
        }
        SwalUtils.success('Price updated successfully!');
        setSearchParams((prevParams) => {
          prevParams.set('step', '3');
          return prevParams;
        });
      } catch (error) {
        SwalUtils.error('Failed to update course price:', error?.message);
      }
    } else {
      // === CREATE MODE ===
      try {
        const result = await dispatch(createCoursePrice(dataWithCourseId)).unwrap();
        if (result) {
          // Refetch course data to get fresh data
          if (defaultValues?.slug) {
            await dispatch(singelCourse(defaultValues.slug));
          }
          SwalUtils.success('Price created successfully! Proceed to the next step.');
          setSearchParams((prevParams) => {
            prevParams.set('step', '3');
            return prevParams;
          });
        }
      } catch (error) {
        SwalUtils.error('Failed to create course price:', error?.message);
      }
    }
  };

  return (
    <div>
      <CoursePricingForm
        title={'Please Update Course Price'}
        onsubmit={createPrice}
        defaultValues={defaultFormdata}
      />
    </div>
  );
};

export default CoursePrice;
