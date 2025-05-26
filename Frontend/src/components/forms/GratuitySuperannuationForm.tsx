import React, { useState } from 'react';
import { useFormContext } from '../../context/FormContext';

interface GratuityDetail {
  nomineeName: string;
  nomineeRelation: string;
  sharePercentage: string;
  nomineeAge: string;
  confirmationDate: string;
  employeeAge: string;
}

interface SuperannuationDetail {
  nomineeName: string;
  nomineeRelation: string;
  sharePercentage: string;
  marriageDate: string;
  confirmationDate: string;
}

const GratuitySuperannuationForm: React.FC = () => {
  const { formData, updateFormData } = useFormContext();
  
  const [gratuityDetail, setGratuityDetail] = useState<GratuityDetail>({
    nomineeName: (formData.gratuityDetails as unknown as GratuityDetail)?.nomineeName || '',
    nomineeRelation: (formData.gratuityDetails as unknown as GratuityDetail)?.nomineeRelation || '',
    sharePercentage: (formData.gratuityDetails as unknown as GratuityDetail)?.sharePercentage || '',
    nomineeAge: (formData.gratuityDetails as unknown as GratuityDetail)?.nomineeAge || '',
    confirmationDate: (formData.gratuityDetails as unknown as GratuityDetail)?.confirmationDate || '',
    employeeAge: (formData.gratuityDetails as any)?.employeeAge || ''
  });

  const [superannuationDetail, setSuperannuationDetail] = useState<SuperannuationDetail>({
    nomineeName: (formData.superannuationDetails as unknown as SuperannuationDetail)?.nomineeName || '',
    nomineeRelation: (formData.superannuationDetails as unknown as SuperannuationDetail)?.nomineeRelation || '',
    sharePercentage: (formData.superannuationDetails as unknown as SuperannuationDetail)?.sharePercentage || '',
    marriageDate: (formData.superannuationDetails as unknown as SuperannuationDetail)?.marriageDate || '',
    confirmationDate: (formData.superannuationDetails as unknown as SuperannuationDetail)?.confirmationDate || ''
  });

  const handleGratuityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updatedDetail = {
      ...gratuityDetail,
      [name]: value
    };
    setGratuityDetail(updatedDetail);
    updateFormData('gratuityDetails', updatedDetail);
  };

  const handleSuperannuationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updatedDetail = {
      ...superannuationDetail,
      [name]: value
    };
    setSuperannuationDetail(updatedDetail);
    updateFormData('superannuationDetails', updatedDetail);
  };

  return (
    <div className="animate-slide-in">
      {/* Gratuity Form */}
      <div className="mb-8">
        <h3 className="font-medium text-lg text-gray-900 mb-4">Gratuity Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-6">
          <div>
            <label htmlFor="gratuityNomineeName" className="form-label">Nominee Name <span className="text-red-500">*</span></label>
            <input
              type="text"
              id="gratuityNomineeName"
              name="nomineeName"
              value={gratuityDetail.nomineeName}
              onChange={handleGratuityChange}
              className="form-input"
              required
              placeholder="Enter Nominee Name"
            />
          </div>
          <div>
            <label htmlFor="gratuityNomineeRelation" className="form-label">Relation <span className="text-red-500">*</span></label>
            <input
              type="text"
              id="gratuityNomineeRelation"
              name="nomineeRelation"
              value={gratuityDetail.nomineeRelation}
              onChange={handleGratuityChange}
              className="form-input"
              required
              placeholder="Enter Relation"
            />
          </div>
          <div>
            <label htmlFor="gratuitySharePercentage" className="form-label">Share Percentage <span className="text-red-500">*</span></label>
            <input
              type="number"
              id="gratuitySharePercentage"
              name="sharePercentage"
              value={gratuityDetail.sharePercentage}
              onChange={handleGratuityChange}
              className="form-input"
              required
              min="0"
              max="100"
              placeholder="Enter Share %"
            />
          </div>
          <div>
            <label htmlFor="gratuityEmployeeAge" className="form-label">Employee Age <span className="text-red-500">*</span></label>
            <input
              type="number"
              id="gratuityEmployeeAge"
              name="employeeAge"
              value={gratuityDetail.employeeAge}
              onChange={handleGratuityChange}
              className="form-input"
              required
              min="0"
              placeholder="Enter Employee Age"
            />
          </div>
          <div>
            <label htmlFor="gratuityNomineeAge" className="form-label">Nominee Age <span className="text-red-500">*</span></label>
            <input
              type="number"
              id="gratuityNomineeAge"
              name="nomineeAge"
              value={gratuityDetail.nomineeAge}
              onChange={handleGratuityChange}
              className="form-input"
              required
              min="0"
              placeholder="Enter Age"
            />
          </div>
          <div>
            <label htmlFor="gratuityConfirmationDate" className="form-label">Date of Confirmation <span className="text-red-500">*</span></label>
            <input
              type="date"
              id="gratuityConfirmationDate"
              name="confirmationDate"
              value={gratuityDetail.confirmationDate}
              onChange={handleGratuityChange}
              className="form-input"
              required
            />
          </div>
        </div>
      </div>

      {/* Superannuation Form */}
      <div className="mb-8">
        <h3 className="font-medium text-lg text-gray-900 mb-4">Superannuation Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-6">
          <div>
            <label htmlFor="superannuationNomineeName" className="form-label">Nominee Name <span className="text-red-500">*</span></label>
            <input
              type="text"
              id="superannuationNomineeName"
              name="nomineeName"
              value={superannuationDetail.nomineeName}
              onChange={handleSuperannuationChange}
              className="form-input"
              required
              placeholder="Enter Nominee Name"
            />
          </div>
          <div>
            <label htmlFor="superannuationNomineeRelation" className="form-label">Relation <span className="text-red-500">*</span></label>
            <input
              type="text"
              id="superannuationNomineeRelation"
              name="nomineeRelation"
              value={superannuationDetail.nomineeRelation}
              onChange={handleSuperannuationChange}
              className="form-input"
              required
              placeholder="Enter Relation"
            />
          </div>
          <div>
            <label htmlFor="superannuationSharePercentage" className="form-label">Share Percentage <span className="text-red-500">*</span></label>
            <input
              type="number"
              id="superannuationSharePercentage"
              name="sharePercentage"
              value={superannuationDetail.sharePercentage}
              onChange={handleSuperannuationChange}
              className="form-input"
              required
              min="0"
              max="100"
              placeholder="Enter Share %"
            />
          </div>
          <div>
            <label htmlFor="superannuationMarriageDate" className="form-label">Marriage Date <span className="text-red-500">*</span></label>
            <input
              type="date"
              id="superannuationMarriageDate"
              name="marriageDate"
              value={superannuationDetail.marriageDate}
              onChange={handleSuperannuationChange}
              className="form-input"
              required
            />
          </div>
          <div>
            <label htmlFor="superannuationConfirmationDate" className="form-label">Date of Confirmation <span className="text-red-500">*</span></label>
            <input
              type="date"
              id="superannuationConfirmationDate"
              name="confirmationDate"
              value={superannuationDetail.confirmationDate}
              onChange={handleSuperannuationChange}
              className="form-input"
              required
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GratuitySuperannuationForm; 