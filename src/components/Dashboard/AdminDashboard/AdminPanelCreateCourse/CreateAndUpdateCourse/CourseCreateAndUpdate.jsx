import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useSearchParams } from 'react-router-dom';

// Components
import CourseBenefits from '../Benefits/CourseBenefits';
import CourseBatches from '../CourseBatches/CourseBatches';
import CourseDetails from '../CourseDetails/CourseDetails';
import Modules from '../CourseModules/Modules';
import CoursePrice from '../CoursePrice/CoursePrice';
import CourseSideSection from '../CouseSideSection/CourseSideSection';
import MainCourses from '../MainCourse/MainCourses';
import CourseSuccessStories from '../SuccessStories/CourseSuccessStories';
import CourseTabSection from '../TabSection/CourseTabSection';
import WhyEnrollThisCourse from '../WhyEnroll/WhyEnrollThisCourse';

// UI
import PrimaryButton from '../../../../common/PrimaryButton';
import SecondaryButton from '../../../../common/SecondaryButton';
import DashBoardHeader from '../../../common/DashBoardHeader';

// Redux
import { singelCourse } from '../../../../../redux/courseWizard/courseWizardAction';
import { clearCourse } from '../../../../../redux/courseWizard/courseWizardSlice';
import SwalUtils from '../../../../../utils/sweetAlert';
import LoadingDashboard from '../../../common/LoadingDashboard';

const CourseCreateAndUpdate = () => {
  const dispatch = useDispatch();
  const { slug } = useParams();

  const [searchParams, setSearchParams] = useSearchParams();
  const activeStep = Number(searchParams.get('step')) || 1;

  const { courseData, courseWizardMessage, courseWizardLoading } = useSelector(
    (state) => state.courseWizard
  );

  /**
   * Fetch Course
   */
  useEffect(() => {
    const fetchCourse = async () => {
      if (slug) {
        await dispatch(singelCourse(slug)).unwrap();
      }
    };
    fetchCourse();
    return () => {
      dispatch(clearCourse());
    };
  }, [dispatch, slug, courseWizardMessage]);

  const steps = useMemo(
    () => [
      { id: 1, label: 'Courses', component: <MainCourses defaultValues={courseData} /> },
      { id: 2, label: 'Price', component: <CoursePrice defaultValues={courseData} /> },
      { id: 3, label: 'Batches', component: <CourseBatches defaultValues={courseData} /> },
      { id: 4, label: 'Course Details', component: <CourseDetails defaultValues={courseData} /> },
      { id: 5, label: 'Modules', component: <Modules defaultValues={courseData} /> },
      { id: 6, label: 'Why Enroll', component: <WhyEnrollThisCourse defaultValues={courseData} /> },
      { id: 7, label: 'Benefits', component: <CourseBenefits defaultValues={courseData} /> },
      {
        id: 8,
        label: 'Success Stories',
        component: <CourseSuccessStories defaultValues={courseData} />,
      },
      { id: 9, label: 'Side Section', component: <CourseSideSection defaultValues={courseData} /> },
      { id: 10, label: 'Tab Section', component: <CourseTabSection defaultValues={courseData} /> },
    ],
    [courseData]
  );

  /**
   * Step Change Handler
   */
  const handleStepChange = (nextStep) => {
    if (!slug && nextStep > 1) return SwalUtils.error('Please save course info first');

    if (nextStep >= 4 && !courseData?.batches?.length)
      return SwalUtils.error('Please create at least one batch first');
    if (nextStep >= 5 && !courseData?.detail?.id)
      return SwalUtils.error('Please save Course Details first');

    const newParams = new URLSearchParams();
    newParams.set('step', nextStep);
    setSearchParams(newParams);
  };

  return (
    <div className="space-y-xl">
      {courseWizardLoading && <LoadingDashboard />}
      <DashBoardHeader title={slug ? 'Edit Course' : 'Create A Course'} />
      {/* Navigation */}
      <div className="bg-white p-4 md:p-5 rounded-2xl shadow-lg w-full border-2 border-primary">
        <div className="flex flex-wrap gap-3">
          {steps.map((step) => {
            const isActive = activeStep === step.id;
            return isActive ? (
              <PrimaryButton
                key={step.id}
                onClick={() => handleStepChange(step.id)}
                text={step.label}
                minWidth="fit"
              />
            ) : (
              <SecondaryButton
                key={step.id}
                onClick={() => handleStepChange(step.id)}
                text={step.label}
                minWidth="fit"
                className="text-primary border-primary hover:text-white"
              />
            );
          })}
        </div>
      </div>

      {/* Step Content */}
      <div className="mt-6">
        {steps.map((step) =>
          activeStep === step.id ? <div key={step.id}>{step.component}</div> : null
        )}
      </div>
    </div>
  );
};

export default CourseCreateAndUpdate;
