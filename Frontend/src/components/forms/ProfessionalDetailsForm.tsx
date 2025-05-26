import React from 'react';
import { useFormContext } from '../../context/FormContext';

const ProfessionalDetailsForm: React.FC = () => {
  const { formData, updateFormData } = useFormContext();
  const { professionalDetails, personalDetails } = formData;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    updateFormData('professionalDetails', {
      ...professionalDetails,
      [name]: value
    });
  };

  // Position options
  const positionOptions = ['staff', 'pf', 'sh', 'dh', 'fh', 'uh'];

  // Dynamically create official email if not present
  React.useEffect(() => {
    if (!professionalDetails.doj_unit && personalDetails.personal_email) {
      // This is just a simple example. In a real-world scenario, you might want to
      // consult with the backend or have more complex logic for generating the official email.
      const name = personalDetails.first_name.toLowerCase();
      updateFormData('personalDetails', {
        ...personalDetails,
        official_email: personalDetails.official_email || `${name}@companyname.com`
      });
    }
  }, [personalDetails.personal_email, personalDetails.first_name, professionalDetails.doj_unit]);

  return (
    <div className="animate-slide-in">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
          <h3 className="font-medium text-lg text-gray-900 mb-4">Professional Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-6">
            <div>
              <label htmlFor="doj_unit" className="form-label">Date of Joining (Unit) <span className="text-red-500">*</span></label>
              <input
                type="date"
                id="doj_unit"
                name="doj_unit"
                value={professionalDetails.doj_unit}
                onChange={handleInputChange}
                className="form-input"
                required
              />
            </div>
            <div>
              <label htmlFor="doj_group" className="form-label">Date of Joining (Group)</label>
              <input
                type="date"
                id="doj_group"
                name="doj_group"
                value={professionalDetails.doj_group}
                onChange={handleInputChange}
                className="form-input"
              />
            </div>
            <div>
              <label htmlFor="department" className="form-label">Department <span className="text-red-500">*</span></label>
              <input
                type="text"
                id="department"
                name="department"
                value={professionalDetails.department}
                onChange={handleInputChange}
                className="form-input"
                required
              />
            </div>
            <div>
              <label htmlFor="designation" className="form-label">Designation <span className="text-red-500">*</span></label>
              <input
                type="text"
                id="designation"
                name="designation"
                value={professionalDetails.designation}
                onChange={handleInputChange}
                className="form-input"
                required
              />
            </div>
            <div>
              <label htmlFor="job_band" className="form-label">Job Band</label>
              <input
                type="text"
                id="job_band"
                name="job_band"
                value={professionalDetails.job_band}
                onChange={handleInputChange}
                className="form-input"
              />
            </div>
            <div>
              <label htmlFor="loi_issue_date" className="form-label">LOI Issue Date</label>
              <input
                type="date"
                id="loi_issue_date"
                name="loi_issue_date"
                value={professionalDetails.loi_issue_date}
                onChange={handleInputChange}
                className="form-input"
              />
            </div>
            <div>
              <label htmlFor="position" className="form-label">New Position <span className="text-red-500">*</span></label>
              <select
                id="position"
                name="position"
                value={professionalDetails.position}
                onChange={handleInputChange}
                className="form-select"
                required
              >
                <option value="">Select Position</option>
                {positionOptions.map(position => (
                  <option key={position} value={position}>{position.toUpperCase()}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
        
        <div className="md:col-span-2 bg-blue-50 p-4 rounded-md">
          <h3 className="font-medium text-blue-800 mb-2">Note:</h3>
          <p className="text-blue-700 text-sm">
            Your personal email ({personalDetails.personal_email}) will be used for all communications until your official email is activated.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalDetailsForm;