import React from 'react';
import { useFormContext } from '../../context/FormContext';

const PersonalDetailsForm: React.FC = () => {
  const { formData, updateFormData } = useFormContext();
  const { personalDetails } = formData;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    updateFormData('personalDetails', {
      ...personalDetails,
      [name]: value
    });
  };

  return (
    <div className="animate-slide-in">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
          <h3 className="font-medium text-lg text-gray-900 mb-4">Contact Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-6">
            <div>
              <label htmlFor="personal_email" className="form-label">Personal Email <span className="text-red-500">*</span></label>
              <input
                type="email"
                id="personal_email"
                name="personal_email"
                value={personalDetails.personal_email}
                onChange={handleInputChange}
                className="form-input"
                required
              />
            </div>
            <div>
              <label htmlFor="official_email" className="form-label">Official Email</label>
              <input
                type="email"
                id="official_email"
                name="official_email"
                value={personalDetails.official_email}
                onChange={handleInputChange}
                className="form-input"
              />
            </div>
            <div>
              <label htmlFor="mobile_no" className="form-label">Mobile Number <span className="text-red-500">*</span></label>
              <input
                type="tel"
                id="mobile_no"
                name="mobile_no"
                value={personalDetails.mobile_no}
                onChange={handleInputChange}
                className="form-input"
                required
              />
            </div>
          </div>
        </div>

        <div className="md:col-span-2">
          <h3 className="font-medium text-lg text-gray-900 mb-4">Employee Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-6">
            <div>
              <label htmlFor="joining_reference_id" className="form-label">Joining Reference ID</label>
              <input
                type="text"
                id="joining_reference_id"
                name="joining_reference_id"
                value={personalDetails.joining_reference_id}
                onChange={handleInputChange}
                className="form-input"
              />
            </div>
            <div>
              <label htmlFor="poornata_id" className="form-label">Poornata ID</label>
              <input
                type="text"
                id="poornata_id"
                name="poornata_id"
                value={personalDetails.poornata_id}
                onChange={handleInputChange}
                className="form-input"
              />
            </div>
            <div>
              <label htmlFor="employee_code" className="form-label">Employee Code</label>
              <input
                type="text"
                id="employee_code"
                name="employee_code"
                value={personalDetails.employee_code}
                onChange={handleInputChange}
                className="form-input"
              />
            </div>
          </div>
        </div>

        <div className="md:col-span-2">
          <h3 className="font-medium text-lg text-gray-900 mb-4">Personal Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-6">
            <div>
              <label htmlFor="prefix" className="form-label">Prefix</label>
              <select
                id="prefix"
                name="prefix"
                value={personalDetails.prefix}
                onChange={handleInputChange}
                className="form-select"
              >
                <option value="">Select Prefix</option>
                <option value="Mr.">Mr.</option>
                <option value="Mrs.">Mrs.</option>
                <option value="Ms.">Ms.</option>
                <option value="Dr.">Dr.</option>
              </select>
            </div>
            <div>
              <label htmlFor="first_name" className="form-label">First Name <span className="text-red-500">*</span></label>
              <input
                type="text"
                id="first_name"
                name="first_name"
                value={personalDetails.first_name}
                onChange={handleInputChange}
                className="form-input"
                required
              />
            </div>
            <div>
              <label htmlFor="middle_name" className="form-label">Middle Name</label>
              <input
                type="text"
                id="middle_name"
                name="middle_name"
                value={personalDetails.middle_name}
                onChange={handleInputChange}
                className="form-input"
              />
            </div>
            <div>
              <label htmlFor="last_name" className="form-label">Last Name</label>
              <input
                type="text"
                id="last_name"
                name="last_name"
                value={personalDetails.last_name}
                onChange={handleInputChange}
                className="form-input"
              />
            </div>
            <div>
              <label htmlFor="fathers_name" className="form-label">Father's Name</label>
              <input
                type="text"
                id="fathers_name"
                name="fathers_name"
                value={personalDetails.fathers_name}
                onChange={handleInputChange}
                className="form-input"
              />
            </div>
            <div>
              <label htmlFor="mothers_name" className="form-label">Mother's Name</label>
              <input
                type="text"
                id="mothers_name"
                name="mothers_name"
                value={personalDetails.mothers_name}
                onChange={handleInputChange}
                className="form-input"
              />
            </div>
            <div>
              <label htmlFor="dob" className="form-label">Date of Birth <span className="text-red-500">*</span></label>
              <input
                type="date"
                id="dob"
                name="dob"
                value={personalDetails.dob}
                onChange={handleInputChange}
                className="form-input"
                required
              />
            </div>
            <div>
              <label htmlFor="birth_location" className="form-label">Birth Location</label>
              <input
                type="text"
                id="birth_location"
                name="birth_location"
                value={personalDetails.birth_location}
                onChange={handleInputChange}
                className="form-input"
              />
            </div>
            <div>
              <label htmlFor="birth_state" className="form-label">Birth State</label>
              <input
                type="text"
                id="birth_state"
                name="birth_state"
                value={personalDetails.birth_state}
                onChange={handleInputChange}
                className="form-input"
              />
            </div>
            <div>
              <label htmlFor="gender" className="form-label">Gender <span className="text-red-500">*</span></label>
              <select
                id="gender"
                name="gender"
                value={personalDetails.gender}
                onChange={handleInputChange}
                className="form-select"
                required
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label htmlFor="marital_status" className="form-label">Marital Status</label>
              <select
                id="marital_status"
                name="marital_status"
                value={personalDetails.marital_status}
                onChange={handleInputChange}
                className="form-select"
              >
                <option value="">Select Status</option>
                <option value="Single">Single</option>
                <option value="Married">Married</option>
                <option value="Divorced">Divorced</option>
                <option value="Widowed">Widowed</option>
              </select>
            </div>
            <div>
              <label htmlFor="religion" className="form-label">Religion</label>
              <input
                type="text"
                id="religion"
                name="religion"
                value={personalDetails.religion}
                onChange={handleInputChange}
                className="form-input"
              />
            </div>
            <div>
              <label htmlFor="caste" className="form-label">Caste</label>
              <input
                type="text"
                id="caste"
                name="caste"
                value={personalDetails.caste}
                onChange={handleInputChange}
                className="form-input"
              />
            </div>
            <div>
              <label htmlFor="blood_group" className="form-label">Blood Group</label>
              <select
                id="blood_group"
                name="blood_group"
                value={personalDetails.blood_group}
                onChange={handleInputChange}
                className="form-select"
              >
                <option value="">Select Blood Group</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>
            </div>
            <div>
              <label htmlFor="nationality" className="form-label">Nationality</label>
              <input
                type="text"
                id="nationality"
                name="nationality"
                value={personalDetails.nationality}
                onChange={handleInputChange}
                className="form-input"
              />
            </div>
            <div>
              <label htmlFor="quarter_no" className="form-label">Quarter Number</label>
              <input
                type="text"
                id="quarter_no"
                name="quarter_no"
                value={personalDetails.quarter_no}
                onChange={handleInputChange}
                className="form-input"
              />
            </div>
          </div>
        </div>

        <div className="md:col-span-2">
          <h3 className="font-medium text-lg text-gray-900 mb-4">Address Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-6">
            <div className="md:col-span-2">
              <label htmlFor="permanent_address" className="form-label">Permanent Address <span className="text-red-500">*</span></label>
              <textarea
                id="permanent_address"
                name="permanent_address"
                value={personalDetails.permanent_address}
                onChange={handleInputChange}
                className="form-input h-24 resize-none"
                required
              ></textarea>
            </div>
            <div className="md:col-span-2">
              <label htmlFor="current_address" className="form-label">Current Address</label>
              <textarea
                id="current_address"
                name="current_address"
                value={personalDetails.current_address}
                onChange={handleInputChange}
                className="form-input h-24 resize-none"
              ></textarea>
            </div>
          </div>
        </div>

        <div className="md:col-span-2">
          <h3 className="font-medium text-lg text-gray-900 mb-4">Financial Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-6">
            <div>
              <label htmlFor="pan_no" className="form-label">PAN Number</label>
              <input
                type="text"
                id="pan_no"
                name="pan_no"
                value={personalDetails.pan_no}
                onChange={handleInputChange}
                className="form-input"
              />
            </div>
            <div>
              <label htmlFor="aadhar_no" className="form-label">Aadhar Number</label>
              <input
                type="text"
                id="aadhar_no"
                name="aadhar_no"
                value={personalDetails.aadhar_no}
                onChange={handleInputChange}
                className="form-input"
              />
            </div>
            <div>
              <label htmlFor="bank_name" className="form-label">Bank Name</label>
              <input
                type="text"
                id="bank_name"
                name="bank_name"
                value={personalDetails.bank_name}
                onChange={handleInputChange}
                className="form-input"
              />
            </div>
            <div>
              <label htmlFor="bank_account_no" className="form-label">Bank Account Number</label>
              <input
                type="text"
                id="bank_account_no"
                name="bank_account_no"
                value={personalDetails.bank_account_no}
                onChange={handleInputChange}
                className="form-input"
              />
            </div>
            <div>
              <label htmlFor="ifsc_code" className="form-label">IFSC Code</label>
              <input
                type="text"
                id="ifsc_code"
                name="ifsc_code"
                value={personalDetails.ifsc_code}
                onChange={handleInputChange}
                className="form-input"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalDetailsForm;