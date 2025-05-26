import React, { createContext, useContext, useState, useMemo, useCallback } from 'react';
import { AArrowDown as uuidv4 } from 'lucide-react';
import { FormData } from '../types/FormTypes';

interface FormContextType {
  formData: FormData;
  currentStep: number;
  totalSteps: number;
  updateFormData: (field: keyof FormData, value: any) => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
  goToStep: (step: number) => void;
  resetForm: () => void;
  addItemToArray: (field: keyof FormData, item: any) => void;
  removeItemFromArray: (field: keyof FormData, id: string) => void;
  updateItemInArray: (field: keyof FormData, id: string, updatedItem: any) => void;
}

const initialFormData: FormData = {
  personalDetails: {
    personal_email: '',
    official_email: '',
    joining_reference_id: '',
    poornata_id: '',
    employee_code: '',
    prefix: '',
    first_name: '',
    middle_name: '',
    last_name: '',
    fathers_name: '',
    mothers_name: '',
    dob: '',
    gender: 'Male',
    marital_status: 'Single',
    blood_group: '',
    nationality: '',
    birth_state: '',
    birth_location: '',
    religion: '',
    caste: '',
    permanent_address: '',
    current_address: '',
    quarter_no: '',
    pan_no: '',
    aadhar_no: '',
    bank_name: '',
    bank_account_no: '',
    ifsc_code: '',
    mobile_no: ''
  },
  professionalDetails: {
    personal_email: '',
    doj_unit: '',
    doj_group: '',
    department: '',
    designation: '',
    job_band: '',
    loi_issue_date: '',
   
  },
  dependents: [],
  education: [],
  workHistory: [],
  languageSkills: [],
  additionalInfo: {
    personal_email: '',
    hobbies: '',
    total_experience: '',
    last_promotion_date: '',
    special_abilities: '',
    
  },
  performanceRating: {
    last_year_year: {
      year: '',
      rating: ''
    },
    second_last_year_year: {
      year: '',
      rating: ''
    },
    third_last_year_year: {
      year: '',
      rating: ''
    }
  }
};

const FormContext = createContext<FormContextType | undefined>(undefined);

export const FormProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 13;

  const updateFormData = useCallback((field: keyof FormData, value: any) => {
    setFormData(prev => {
      const updatedData = {
        ...prev,
        [field]: value
      };

      // If updating personal details, propagate email to other sections
      if (field === 'personalDetails' && 'personal_email' in value && value.personal_email) {
        // This is just a placeholder. In a real app, you might want to propagate
        // the email to specific fields in other sections
      }

      return updatedData;
    });
  }, []);

  const goToNextStep = useCallback(() => {
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
    }
  }, [currentStep, totalSteps]);

  const goToPreviousStep = useCallback(() => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  }, [currentStep]);

  const goToStep = useCallback((step: number) => {
    if (step >= 1 && step <= totalSteps) {
      setCurrentStep(step);
    }
  }, [totalSteps]);

  const resetForm = useCallback(() => {
    setFormData(initialFormData);
    setCurrentStep(1);
  }, []);

  const addItemToArray = useCallback((field: keyof FormData, item: any) => {
    setFormData(prev => {
      const newItem = { ...item, id: String(Date.now()) };
      const currentArray = prev[field];
      if (Array.isArray(currentArray)) {
        return {
          ...prev,
          [field]: [...currentArray, newItem]
        };
      }
      return prev;
    });
  }, []);

  const removeItemFromArray = useCallback((field: keyof FormData, id: string) => {
    setFormData(prev => {
      const currentArray = prev[field];
      if (Array.isArray(currentArray)) {
        return {
          ...prev,
          [field]: currentArray.filter((item: any) => item.id !== id)
        };
      }
      return prev;
    });
  }, []);

  const updateItemInArray = useCallback((field: keyof FormData, id: string, updatedItem: any) => {
    setFormData(prev => {
      const currentArray = prev[field];
      if (Array.isArray(currentArray)) {
        return {
          ...prev,
          [field]: currentArray.map((item: any) => 
            item.id === id ? { ...item, ...updatedItem } : item
          )
        };
      }
      return prev;
    });
  }, []);

  const value = useMemo(() => ({
    formData,
    currentStep,
    totalSteps,
    updateFormData,
    goToNextStep,
    goToPreviousStep,
    goToStep,
    resetForm,
    addItemToArray,
    removeItemFromArray,
    updateItemInArray
  }), [
    formData, 
    currentStep, 
    totalSteps,
    updateFormData, 
    goToNextStep, 
    goToPreviousStep, 
    goToStep, 
    resetForm,
    addItemToArray,
    removeItemFromArray,
    updateItemInArray
  ]);

  return (
    <FormContext.Provider value={value}>
      {children}
    </FormContext.Provider>
  );
};

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (context === undefined) {
    throw new Error('useFormContext must be used within a FormProvider');
  }
  return context;
};