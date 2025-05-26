import React from 'react';
import { useFormContext } from '../../context/FormContext';
import { Plus, Trash2 } from 'lucide-react';

const NomineesForm: React.FC = () => {
  const { formData, updateFormData } = useFormContext();
  const { gpaNominees = [], nishchintNominee = {} } = formData;

  const handleGpaNomineeChange = (index: number, e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const updatedNominees = [...gpaNominees];
    updatedNominees[index] = {
      ...updatedNominees[index],
      [name]: value
    };

    // Calculate age if DOB changes
    if (name === 'dob' && value) {
      const dob = new Date(value);
      const today = new Date();
      let age = today.getFullYear() - dob.getFullYear();
      const monthDiff = today.getMonth() - dob.getMonth();
      
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
        age--;
      }

      updatedNominees[index] = {
        ...updatedNominees[index],
        dob: value,
        age: age.toString()
      };
    }

    updateFormData('gpaNominees', updatedNominees);
  };

  const addGpaNominee = () => {
    const newNominee = {
      name: '',
      relation: '',
      dob: '',
      age: '',
      contribution: ''
    };
    updateFormData('gpaNominees', [...gpaNominees, newNominee]);
  };

  const removeGpaNominee = (index: number) => {
    const updatedNominees = gpaNominees.filter((_, i) => i !== index);
    updateFormData('gpaNominees', updatedNominees);
  };

  const handleNishchintNomineeChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    updateFormData('nishchintNominee', {
      ...nishchintNominee,
      [name]: value
    });

    // Calculate age if DOB changes
    if (name === 'dob' && value) {
      const dob = new Date(value);
      const today = new Date();
      let age = today.getFullYear() - dob.getFullYear();
      const monthDiff = today.getMonth() - dob.getMonth();
      
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
        age--;
      }

      updateFormData('nishchintNominee', {
        ...nishchintNominee,
        dob: value,
        age: age.toString()
      });
    }
  };

  return (
    <div className="animate-slide-in">
      <div className="grid grid-cols-1 gap-8">
        <div className="bg-blue-50 p-4 rounded-md mb-4">
          <h3 className="font-medium text-blue-800 mb-2">Information</h3>
          <p className="text-blue-700 text-sm">
            Please nominate individuals for your GPA (Group Personal Accident) and Nishchint policies.
            These nominees will be the beneficiaries in case of any unforeseen circumstances.
          </p>
        </div>
        
        {/* GPA Nominees */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium text-lg text-gray-900 border-b pb-2">GPA Nominees</h3>
            <button
              type="button"
              onClick={addGpaNominee}
              className="btn btn-secondary flex items-center gap-2"
            >
              <Plus size={16} />
              Add Nominee
            </button>
          </div>
          
          {gpaNominees.map((nominee, index) => (
            <div key={index} className="mb-8 p-4 border rounded-lg relative">
              {gpaNominees.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeGpaNominee(index)}
                  className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                >
                  <Trash2 size={20} />
                </button>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-6">
                <div>
                  <label htmlFor={`gpa_name_${index}`} className="form-label">Name <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    id={`gpa_name_${index}`}
                    name="name"
                    value={nominee.name}
                    onChange={(e) => handleGpaNomineeChange(index, e)}
                    className="form-input"
                    required
                  />
                </div>
                <div>
                  <label htmlFor={`gpa_relation_${index}`} className="form-label">Relation <span className="text-red-500">*</span></label>
                  <select
                    id={`gpa_relation_${index}`}
                    name="relation"
                    value={nominee.relation}
                    onChange={(e) => handleGpaNomineeChange(index, e)}
                    className="form-select"
                    required
                  >
                    <option value="">Select Relation</option>
                    <option value="Spouse">Spouse</option>
                    <option value="Child">Child</option>
                    <option value="Parent">Parent</option>
                    <option value="Sibling">Sibling</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label htmlFor={`gpa_dob_${index}`} className="form-label">Date of Birth</label>
                  <input
                    type="date"
                    id={`gpa_dob_${index}`}
                    name="dob"
                    value={nominee.dob}
                    onChange={(e) => handleGpaNomineeChange(index, e)}
                    className="form-input"
                  />
                </div>
                <div>
                  <label htmlFor={`gpa_age_${index}`} className="form-label">Age</label>
                  <input
                    type="text"
                    id={`gpa_age_${index}`}
                    name="age"
                    value={nominee.age}
                    onChange={(e) => handleGpaNomineeChange(index, e)}
                    className="form-input"
                    readOnly
                  />
                </div>
                <div>
                  <label htmlFor={`gpa_contribution_${index}`} className="form-label">% of Contribution <span className="text-red-500">*</span></label>
                  <input
                    type="number"
                    id={`gpa_contribution_${index}`}
                    name="contribution"
                    value={nominee.contribution}
                    onChange={(e) => handleGpaNomineeChange(index, e)}
                    className="form-input"
                    min="0"
                    max="100"
                    required
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Nishchint Nominee */}
        <div>
          <h3 className="font-medium text-lg text-gray-900 mb-4 border-b pb-2">Nishchint Nominee</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-6">
            <div>
              <label htmlFor="nishchint_name" className="form-label">Name <span className="text-red-500">*</span></label>
              <input
                type="text"
                id="nishchint_name"
                name="name"
                value={nishchintNominee.name}
                onChange={handleNishchintNomineeChange}
                className="form-input"
                required
              />
            </div>
            <div>
              <label htmlFor="nishchint_relation" className="form-label">Relation <span className="text-red-500">*</span></label>
              <select
                id="nishchint_relation"
                name="relation"
                value={nishchintNominee.relation}
                onChange={handleNishchintNomineeChange}
                className="form-select"
                required
              >
                <option value="">Select Relation</option>
                <option value="Spouse">Spouse</option>
                <option value="Child">Child</option>
                <option value="Parent">Parent</option>
                <option value="Sibling">Sibling</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label htmlFor="nishchint_dob" className="form-label">Date of Birth</label>
              <input
                type="date"
                id="nishchint_dob"
                name="dob"
                value={nishchintNominee.dob}
                onChange={handleNishchintNomineeChange}
                className="form-input"
              />
            </div>
            <div>
              <label htmlFor="nishchint_age" className="form-label">Age</label>
              <input
                type="text"
                id="nishchint_age"
                name="age"
                value={nishchintNominee.age}
                onChange={handleNishchintNomineeChange}
                className="form-input"
                readOnly
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NomineesForm;