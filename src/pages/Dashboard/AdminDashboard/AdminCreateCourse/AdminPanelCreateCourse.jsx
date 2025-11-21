import { useDispatch, useSelector } from 'react-redux';
import DashBoardHeader from '../../../../components/Dashboard/common/DashBoardHeader';
import SecondaryButton from '../../../../components/common/SecondaryButton';
import PrimaryButton from '../../../../components/common/PrimaryButton';
import { goToStep, restoreFormData } from '../../../../redux/courseWizard/courseWizardSlice';
import { useEffect } from 'react';
import Modules from '../../../../components/Dashboard/AdminDashboard/AdminPanelCreateCourse/Modules';
import CoursePrice from '../../../../components/Dashboard/AdminDashboard/AdminPanelCreateCourse/CoursePrice';
import WhyEnrollThisCourse from '../../../../components/Dashboard/AdminDashboard/AdminPanelCreateCourse/WhyEnroll/WhyEnrollThisCourse';
import CourseBenefits from '../../../../components/Dashboard/AdminDashboard/AdminPanelCreateCourse/Benefits/CourseBenefits';
import CourseSideSection from '../../../../components/Dashboard/AdminDashboard/AdminPanelCreateCourse/CourseSideSection';
import CourseSuccessStories from '../../../../components/Dashboard/AdminDashboard/AdminPanelCreateCourse/SuccessStories/CourseSuccessStories';
import CourseOthersSection from '../../../../components/Dashboard/AdminDashboard/AdminPanelCreateCourse/CourseOthersSection';
import CourseDetails from '../../../../components/Dashboard/AdminDashboard/AdminPanelCreateCourse/CourseDetails/CourseDetails';
import MainCourses from '../../../../components/Dashboard/AdminDashboard/AdminPanelCreateCourse/MainCourse/MainCourses';

const AdminPanelCreateCourse = () => {
  const dispatch = useDispatch();
  const { step, formData } = useSelector((state) => state.courseWizard);

  useEffect(() => {
    const savedStep = localStorage.getItem('wizard_step');
    const savedData = localStorage.getItem('wizard_data');

    if (savedStep) dispatch(goToStep(Number(savedStep)));
    if (savedData) dispatch(restoreFormData(JSON.parse(savedData)));
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem('wizard_data', JSON.stringify(formData));
  }, [formData]);

  useEffect(() => {
    localStorage.setItem('wizard_step', step);
  }, [step]);

  return (
    <div className="space-y-xl">
      <DashBoardHeader title={'Create A Course'} />
      <div className="bg-white p-4 md:p-5 rounded-2xl shadow-lg w-full border-2 border-primary">
        <div className="flex flex-wrap justify-start gap-3 sm:gap-4">
          {[
            { key: 'Courses', text: 'Courses' },
            { key: 'Price', text: 'Price' },
            { key: 'Courses Details', text: 'Courses Details' },
            { key: 'Modules', text: 'Modules' },
            // { key: 'Coupons', text: 'Coupons' },
            { key: 'Why Enroll', text: 'Why Enroll' },
            { key: 'Benefits', text: 'Benefits' },
            { key: 'Success Stories', text: 'Success Stories' },
            { key: 'Side Section', text: 'Side Section' },
            { key: 'Others', text: 'Others' }, // course content , section tab , tabded content
          ].map((item, index) => {
            if (step === index + 1) {
              return (
                <PrimaryButton
                  onClick={() => dispatch(goToStep(index + 1))}
                  key={item.key}
                  text={item.text}
                  minWidth="fit"
                />
              );
            } else {
              return (
                <SecondaryButton
                  key={item.key}
                  text={item.text}
                  onClick={() => dispatch(goToStep(index + 1))}
                  minWidth="fit"
                  className="text-primary border-primary hover:text-white"
                />
              );
            }
          })}
        </div>
      </div>

      {step === 1 && <MainCourses defaultValues={formData?.courseInfo} />}
      {step === 2 && <CoursePrice />}
      {step === 3 && <CourseDetails />}
      {step === 4 && <Modules />}
      {/* {step === 4 && <CourseCoupons />} */}
      {step === 5 && <WhyEnrollThisCourse />}
      {step === 6 && <CourseBenefits />}
      {step === 7 && <CourseSuccessStories />}
      {step === 8 && <CourseSideSection />}
      {step === 9 && <CourseOthersSection />}
    </div>
  );
};

export default AdminPanelCreateCourse;
