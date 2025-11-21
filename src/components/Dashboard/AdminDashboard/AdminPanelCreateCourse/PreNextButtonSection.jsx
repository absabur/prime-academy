import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { nextStep, prevStep } from '../../../../redux/courseWizard/courseWizardSlice';
import PrimaryButton from '../../../common/PrimaryButton';

const PreNextButtonSection = ({ className = '', isForm = true }) => {
  const { step } = useSelector((state) => state.courseWizard);
  const dispatch = useDispatch();

  const handleNext = () => {
    if (!isForm) {
      dispatch(nextStep());
    }
  };

  const isTypeSubmit = step < 9;

  const isLastStep = step === 9;

  return (
    <div className={`${className} flex justify-between gap-3 items-center mt-6`}>
      {/* Previous Button */}
      <PrimaryButton
        disabled={step === 1}
        onClick={() => dispatch(prevStep())}
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
