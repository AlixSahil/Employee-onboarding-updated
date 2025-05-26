import React from 'react';
import { Check } from 'lucide-react';

interface FormProgressProps {
  currentStep: number;
  totalSteps: number;
}

const steps = [
  'Personal Details',
  'Professional Details',
  'Nominees',
  'Mediclaim',
  'Family Info',
  'Emergency Contacts',
  'Education',
  'Work History',
  'Languages',
  'Additional Info',
  'PF Details',
  'Gratuity & Superannuation',
  'Performance'
];

const FormProgress: React.FC<FormProgressProps> = ({ currentStep, totalSteps }) => {
  const progress = (currentStep / totalSteps) * 100;
  
  return (
    <div className="px-6 pt-6 pb-2">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-800">
          Step {currentStep}: {steps[currentStep - 1]}
        </h2>
        <div className="text-sm font-medium text-blue-600">
          {Math.floor(progress)}% Complete
        </div>
      </div>
      
      <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      
      <div className="hidden md:flex justify-between mt-2">
        {steps.map((step, index) => (
          <div 
            key={index}
            className="flex flex-col items-center group"
          >
            <div 
              className={`flex items-center justify-center w-7 h-7 rounded-full transition-colors ${
                index + 1 < currentStep 
                  ? 'bg-blue-600 text-white' 
                  : index + 1 === currentStep
                  ? 'bg-blue-100 border-2 border-blue-600 text-blue-600'
                  : 'bg-gray-200 text-gray-500'
              }`}
            >
              {index + 1 < currentStep ? (
                <Check size={14} />
              ) : (
                <span className="text-xs">{index + 1}</span>
              )}
            </div>
            <span className="text-xs mt-1 text-center hidden md:block text-gray-600 group-hover:text-gray-900">
              {step}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FormProgress;