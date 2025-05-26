import React, { useState } from 'react';
import { useFormContext } from '../../context/FormContext';

interface PFDetail {
  uanNumber: string;
  pfNumber: string;
  epsNumber: string;
  nomineeName: string;
  nomineeRelation: string;
  sharePercentage: string;
}

const PFDetailsForm: React.FC = () => {
  const { formData, updateFormData } = useFormContext();
  const [pfDetail, setPFDetail] = useState<PFDetail>({
    uanNumber: (formData.pfDetails as unknown as PFDetail)?.uanNumber || '',
    pfNumber: (formData.pfDetails as unknown as PFDetail)?.pfNumber || '',
    epsNumber: (formData.pfDetails as unknown as PFDetail)?.epsNumber || '',
    nomineeName: (formData.pfDetails as unknown as PFDetail)?.nomineeName || '',
    nomineeRelation: (formData.pfDetails as unknown as PFDetail)?.nomineeRelation || '',
    sharePercentage: (formData.pfDetails as unknown as PFDetail)?.sharePercentage || ''
  });

  const handlePFDetailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updatedPFDetail = {
      ...pfDetail,
      [name]: value
    };
    setPFDetail(updatedPFDetail);
    updateFormData('pfDetails', updatedPFDetail);
  };

  return (
    <div className="animate-slide-in">
      <div className="mb-8">
        <h3 className="font-medium text-lg text-gray-900 mb-4">PF Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-6">
          <div>
            <label htmlFor="uanNumber" className="form-label">UAN Number <span className="text-red-500">*</span></label>
            <input
              type="text"
              id="uanNumber"
              name="uanNumber"
              value={pfDetail.uanNumber}
              onChange={handlePFDetailChange}
              className="form-input"
              required
              placeholder="Enter UAN Number"
            />
          </div>
          <div>
            <label htmlFor="pfNumber" className="form-label">PF Number <span className="text-red-500">*</span></label>
            <input
              type="text"
              id="pfNumber"
              name="pfNumber"
              value={pfDetail.pfNumber}
              onChange={handlePFDetailChange}
              className="form-input"
              required
              placeholder="Enter PF Number"
            />
          </div>
          <div>
            <label htmlFor="epsNumber" className="form-label">EPS Number <span className="text-red-500">*</span></label>
            <input
              type="text"
              id="epsNumber"
              name="epsNumber"
              value={pfDetail.epsNumber}
              onChange={handlePFDetailChange}
              className="form-input"
              required
              placeholder="Enter EPS Number"
            />
          </div>
          <div>
            <label htmlFor="nomineeName" className="form-label">Nominee Name <span className="text-red-500">*</span></label>
            <input
              type="text"
              id="nomineeName"
              name="nomineeName"
              value={pfDetail.nomineeName}
              onChange={handlePFDetailChange}
              className="form-input"
              required
              placeholder="Enter Nominee Name"
            />
          </div>
          <div>
            <label htmlFor="nomineeRelation" className="form-label">Relation with Nominee <span className="text-red-500">*</span></label>
            <input
              type="text"
              id="nomineeRelation"
              name="nomineeRelation"
              value={pfDetail.nomineeRelation}
              onChange={handlePFDetailChange}
              className="form-input"
              required
              placeholder="Enter Relation"
            />
          </div>
          <div>
            <label htmlFor="sharePercentage" className="form-label">Share Percentage <span className="text-red-500">*</span></label>
            <input
              type="number"
              id="sharePercentage"
              name="sharePercentage"
              value={pfDetail.sharePercentage}
              onChange={handlePFDetailChange}
              className="form-input"
              required
              min="0"
              max="100"
              placeholder="Enter Share %"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PFDetailsForm; 