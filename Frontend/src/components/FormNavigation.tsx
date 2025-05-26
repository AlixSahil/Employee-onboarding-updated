import React from 'react';
import { useFormContext } from '../context/FormContext';
import { ArrowLeft, ArrowRight, Save } from 'lucide-react';

interface FormNavigationProps {
  currentStep: number;
  totalSteps: number;
  onReview: () => void;
}

const FormNavigation: React.FC<FormNavigationProps> = ({ 
  currentStep, 
  totalSteps,
  onReview
}) => {
  const { goToNextStep, goToPreviousStep } = useFormContext();

  const handleNext = () => {
    if (currentStep === totalSteps) {
      onReview();
    } else {
      goToNextStep();
    }
  };

  return (
    <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-between">
      <button
        type="button"
        onClick={goToPreviousStep}
        disabled={currentStep === 1}
        className={`btn ${
          currentStep === 1 ? 'text-gray-400 cursor-not-allowed' : 'btn-secondary'
        }`}
      >
        <ArrowLeft size={16} className="mr-2" />
        Back
      </button>
      
      <button
        type="button"
        onClick={handleNext}
        className="btn btn-primary"
      >
        {currentStep === totalSteps ? (
          <>
            Review
            <Save size={16} className="ml-2" />
          </>
        ) : (
          <>
            Next
            <ArrowRight size={16} className="ml-2" />
          </>
        )}
      </button>
    </div>
  );
};

export default FormNavigation;