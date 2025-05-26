import React from 'react';
import { useFormContext } from '../../context/FormContext';
import type { AdditionalInfo } from '../../types/FormTypes';

const AdditionalInfoForm: React.FC = () => {
  const { formData, updateFormData } = useFormContext();
  const additionalInfo = formData.additionalInfo || {} as AdditionalInfo;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
  updateFormData('additionalInfo', {
    ...formData.additionalInfo,
    [name]: value
  } satisfies Partial<AdditionalInfo>);
  };

  return (
    <div className="animate-slide-in">
      <div className="bg-blue-50 p-4 rounded-md mb-6">
        <h3 className="font-medium text-blue-800 mb-2">Additional Information</h3>
        <p className="text-blue-700 text-sm">
          This information helps us understand more about your interests and abilities.
          It is optional but can be beneficial for team-building and development opportunities.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-6">
        <div>
          <label htmlFor="current_unit_name" className="form-label">Current Unit Name</label>
          <input
            type="text"
            id="current_unit_name"
            name="current_unit_name"
            value={additionalInfo.current_unit_name || ''}
            onChange={handleInputChange}
            className="form-input"
            placeholder="Enter your current unit name"
          />
        </div>

        <div>
          <label htmlFor="last_job_change_date" className="form-label">Last Job Change Date</label>
          <input
            type="date"
            id="last_job_change_date"
            name="last_job_change_date"
            value={additionalInfo.last_job_change_date || ''}
            onChange={handleInputChange}
            className="form-input"
          />
        </div>

        <div>
          <label htmlFor="attended_dac" className="form-label">Have you attended DAC?</label>
          <select
            id="attended_dac"
            name="attended_dac"
            value={additionalInfo.attended_dac || ''}
            onChange={handleInputChange}
            className="form-input"
          >
            <option value="">Select an option</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>

        {additionalInfo.attended_dac === 'yes' && (
          <div>
            <label htmlFor="dac_date" className="form-label">DAC Date</label>
            <input
              type="date"
              id="dac_date"
              name="dac_date"
              value={additionalInfo.dac_date || ''}
              onChange={handleInputChange}
              className="form-input"
            />
          </div>
        )}

        <div className="md:col-span-2">
          <label htmlFor="hobbies" className="form-label">Hobbies & Interests</label>
          <textarea
            id="hobbies"
            name="hobbies"
            value={additionalInfo.hobbies || ''}
            onChange={handleInputChange}
            className="form-input h-24 resize-none"
            placeholder="Please list your hobbies and interests"
          ></textarea>
        </div>

        <div>
          <label htmlFor="total_experience" className="form-label">Total Work Experience (in years)</label>
          <input
            type="text"
            id="total_experience"
            name="total_experience"
            value={additionalInfo.total_experience || ''}
            onChange={handleInputChange}
            className="form-input"
            placeholder="E.g., 5.5"
          />
        </div>

        <div>
          <label htmlFor="last_promotion_date" className="form-label">Last Promotion Date</label>
          <input
            type="date"
            id="last_promotion_date"
            name="last_promotion_date"
            value={additionalInfo.last_promotion_date || ''}
            onChange={handleInputChange}
            className="form-input"
          />
        </div>

        <div className="md:col-span-2">
          <label htmlFor="special_abilities" className="form-label">Special Abilities / Skills</label>
          <textarea
            id="special_abilities"
            name="special_abilities"
            value={additionalInfo.special_abilities || ''}
            onChange={handleInputChange}
            className="form-input h-24 resize-none"
            placeholder="Please list any special abilities, skills, or certifications"
          ></textarea>
        </div>
      </div>
    </div>
  );
};

export default AdditionalInfoForm;