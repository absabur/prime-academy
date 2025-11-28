import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useMemo } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
// Components Imports
import MainCourses from '../MainCourse/MainCourses';
import CoursePrice from '../CoursePrice/CoursePrice';
import CourseDetails from '../CourseDetails/CourseDetails';
import WhyEnrollThisCourse from '../WhyEnroll/WhyEnrollThisCourse';
import CourseBenefits from '../Benefits/CourseBenefits';
import CourseSuccessStories from '../SuccessStories/CourseSuccessStories';
import Modules from '../CourseModules/Modules';
import CourseSideSection from '../CouseSideSection/CourseSideSection';
import CourseTabSection from '../TabSection/CourseTabSection';
// UI Components
import PrimaryButton from '../../../../common/PrimaryButton';
import DashBoardHeader from '../../../common/DashBoardHeader';
import SecondaryButton from '../../../../common/SecondaryButton';
// Redux Actions
import { singelCourse } from '../../../../../redux/courseWizard/courseWizardAction';
import SwalUtils from '../../../../../utils/sweetAlert';
import { clearCourse } from '../../../../../redux/courseWizard/courseWizardSlice';

const CourseCreateAndUpdate = () => {
  const dispatch = useDispatch();
  const { slug } = useParams();
  // 1. SearchParams হুক সেটআপ
  const [searchParams, setSearchParams] = useSearchParams();
  // 2. URL থেকে বর্তমান স্টেপ নেওয়া। না থাকলে ডিফল্ট 1
  const activeStep = Number(searchParams.get('step')) || 1;
  // Redux থেকে step রিমুভ করা হয়েছে, শুধু ডেটা রাখা হয়েছে
  const { courseWizardMessage, courseData } = useSelector((state) => state.courseWizard);

  useEffect(() => {
    if (slug) {
      dispatch(singelCourse(slug));
    }

    return () => {
      dispatch(clearCourse());
    };
  }, [dispatch, slug, courseWizardMessage]);

  //  SECURITY CHECK / VALIDATION

  useEffect(() => {
    if (!slug && activeStep > 1) {
      setSearchParams((prevParams) => {
        prevParams.set('step', '1');
        return prevParams;
      });

      if (!courseData?.detail?.id && activeStep >= 4) {
        setSearchParams((prevParams) => {
          prevParams.set('step', '3');
          return prevParams;
        });
      }
    }
  }, [slug, activeStep, setSearchParams, courseData]);

  // Define steps configuration
  const steps = useMemo(
    () => [
      { id: 1, label: 'Courses', component: <MainCourses defaultValues={courseData} /> },
      { id: 2, label: 'Price', component: <CoursePrice defaultValues={courseData} /> },
      { id: 3, label: 'Courses Details', component: <CourseDetails defaultValues={courseData} /> },
      { id: 4, label: 'Modules', component: <Modules defaultValues={courseData} /> },
      { id: 5, label: 'Why Enroll', component: <WhyEnrollThisCourse defaultValues={courseData} /> },
      { id: 6, label: 'Benefits', component: <CourseBenefits defaultValues={courseData} /> },
      {
        id: 7,
        label: 'Success Stories',
        component: <CourseSuccessStories defaultValues={courseData} />,
      },
      { id: 8, label: 'Side Section', component: <CourseSideSection defaultValues={courseData} /> },
      { id: 9, label: 'Tab Section', component: <CourseTabSection defaultValues={courseData} /> },
    ],
    [courseData]
  );

  // 3. Handler for navigation (URL আপডেট করবে)
  const handleStepChange = (stepIndex) => {
    // Validation
    if (!slug && stepIndex > 1) {
      return SwalUtils.error('Please save course info first');
    }

    if (!courseData?.detail?.id && stepIndex >= 4) {
      return SwalUtils.error(
        'Please save Course Details first to proceed to Modules and other sections.'
      );
    }

    setSearchParams((prevParams) => {
      prevParams.set('step', stepIndex);
      return prevParams;
    });
  };

  return (
    <div className="space-y-xl">
      <DashBoardHeader title={slug ? 'Edit Course' : 'Create A Course'} />

      {/* Navigation Tabs */}
      <div className="bg-white p-4 md:p-5 rounded-2xl shadow-lg w-full border-2 border-primary">
        <div className="flex flex-wrap justify-start gap-3 sm:gap-4">
          {steps.map((item) => {
            // চেক করা হচ্ছে activeStep এর সাথে
            const isActive = activeStep === item.id;

            return isActive ? (
              <PrimaryButton
                key={item.id}
                onClick={() => handleStepChange(item.id)}
                text={item.label}
                minWidth="fit"
              />
            ) : (
              <SecondaryButton
                key={item.id}
                text={item.label}
                onClick={() => handleStepChange(item.id)}
                minWidth="fit"
                className="text-primary border-primary hover:text-white"
              />
            );
          })}
        </div>
      </div>

      {/* Dynamic Component Rendering */}
      <div className="mt-6">
        {steps.map((item) => {
          // রেন্ডারিং লজিক activeStep দিয়ে চেক করা হচ্ছে
          if (activeStep !== item.id) return null;
          return <div key={item.id}>{item.component}</div>;
        })}
      </div>
    </div>
  );
};

export default CourseCreateAndUpdate;
