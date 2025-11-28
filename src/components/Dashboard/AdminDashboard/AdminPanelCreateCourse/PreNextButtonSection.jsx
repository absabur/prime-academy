import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import PrimaryButton from '../../../common/PrimaryButton';
import { useDispatch } from 'react-redux';
import { singelCourse, updateCourse } from '../../../../redux/courseWizard/courseWizardAction';
import SwalUtils from '../../../../utils/sweetAlert';

const PreNextButtonSection = ({ className = '', isForm = true }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { slug } = useParams();
  const navigate = useNavigate();
  const step = Number(searchParams.get('step')) || 1;
  const isTypeSubmit = step < 9;
  const isLastStep = step === 9;
  const dispatch = useDispatch();

  const handleNext = async () => {
    if (isLastStep) {
      try {
        const course = await dispatch(singelCourse(slug)).unwrap();
        if (!course?.data?.detail?.id) {
          SwalUtils.error('Please add course details first');
          return;
        }

        const publishedFunc = () => {
          dispatch(updateCourse({ id: course.data.id, courseData: { status: 'published' } }));
          navigate('/admin-dashboard/courses');
        };

        const draftedFunc = () => {
          dispatch(updateCourse({ id: course.data.id, courseData: { status: 'draft' } }));
          navigate('/admin-dashboard/courses');
        };

        SwalUtils.doubleOption(
          publishedFunc,
          draftedFunc,
          'Are You Published This Course?',
          'Published',
          'Draft'
        );

        return;
      } catch (error) {
        SwalUtils.error('Something went wrong!');
        return;
      }
    }
    if (!isForm) {
      setSearchParams((prev) => {
        const p = new URLSearchParams(prev);
        const currentStep = Number(p.get('step') || 0);
        p.set('step', String(currentStep + 1));
        return p;
      });
    }
  };

  const handlePre = () => {
    setSearchParams((prev) => {
      const p = new URLSearchParams(prev);
      const currentStep = Number(p.get('step') || 0);
      p.set('step', String(currentStep - 1));
      return p;
    });
  };

  return (
    <div className={`${className} flex justify-between gap-3 items-center mt-6`}>
      {/* Previous Button */}
      <PrimaryButton
        disabled={step === 1}
        onClick={handlePre}
        text="Previous Step"
        minWidth="fit"
      />

      {/* Next or Publish Button */}
      <PrimaryButton
        type={isForm && isTypeSubmit ? 'submit' : 'button'}
        onClick={handleNext}
        text={isLastStep ? 'Published' : 'Next Step'}
        minWidth="fit"
      />
    </div>
  );
};

export default PreNextButtonSection;
