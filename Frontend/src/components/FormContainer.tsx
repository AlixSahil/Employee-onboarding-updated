import React, { useState } from 'react';
import { useFormContext } from '../context/FormContext';
import PersonalDetailsForm from './forms/PersonalDetailsForm';
import ProfessionalDetailsForm from './forms/ProfessionalDetailsForm';
import NomineesForm from './forms/NomineesForm';
import MediclaimDependentsForm from './forms/MediclaimDependentsForm';
import FamilyInfoForm from './forms/FamilyInfoForm';
import EmergencyContactsForm from './forms/EmergencyContactsForm';
import EducationForm from './forms/EducationForm';
import WorkHistoryForm from './forms/WorkHistoryForm';
import LanguageSkillsForm from './forms/LanguageSkillsForm';
import AdditionalInfoForm from './forms/AdditionalInfoForm';
import PerformanceRatingForm from './forms/PerformanceRatingForm';
import PFDetailsForm from './forms/PFDetailsForm';
import GratuitySuperannuationForm from './forms/GratuitySuperannuationForm';
import ReviewDialog from './ReviewDialog';
import FormProgress from './FormProgress';
import FormNavigation from './FormNavigation';

const FormContainer: React.FC = () => {
  const { currentStep, totalSteps, formData } = useFormContext();
  const [showReview, setShowReview] = useState(false);

  const handleReviewSubmit = () => {
    console.log('Form submitted with data:', formData);
    setShowReview(false);
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return <PersonalDetailsForm />;
      case 2:
        return <ProfessionalDetailsForm />;
      case 3:
        return <NomineesForm />;
      case 4:
        return <MediclaimDependentsForm />;
      case 5:
        return <FamilyInfoForm />;
      case 6:
        return <EmergencyContactsForm />;
      case 7:
        return <EducationForm />;
      case 8:
        return <WorkHistoryForm />;
      case 9:
        return <LanguageSkillsForm />;
      case 10:
        return <AdditionalInfoForm />;
      case 11:
        return <PFDetailsForm />;
      case 12:
        return <GratuitySuperannuationForm />;
      case 13:
        return <PerformanceRatingForm onComplete={() => setShowReview(true)} />;
      default:
        return <PersonalDetailsForm />;
    }
  };

  return (
    <div className="relative">
      <FormProgress currentStep={currentStep} totalSteps={totalSteps} />
      
      <div className="p-6 animate-fade-in">
        {renderCurrentStep()}
      </div>
      
      <FormNavigation 
        currentStep={currentStep} 
        totalSteps={totalSteps}
        onReview={() => setShowReview(true)}
      />
      
      {showReview && (
        <ReviewDialog
          formData={formData}
          onClose={() => setShowReview(false)}
          onSubmit={handleReviewSubmit}
        />
      )}
    </div>
  );
};

export default FormContainer;