import React, { useState } from 'react';
import { useFormContext } from '../../context/FormContext';
import { Plus, X, Edit2 } from 'lucide-react';
import type { Education } from '../../types/FormTypes' // Import interface

const EducationForm: React.FC = () => {
  const { formData, addItemToArray, removeItemFromArray, updateItemInArray } = useFormContext();
  const { education = [] } = formData as { education: Education[] }; // Ensure proper typing

  const [newEducation, setNewEducation] = useState({
    degree: '',
    institution: '',
    specialization: '',
    year_of_passing: '',
    percentage: '',
    state: ''
  });
  
  const [editingId, setEditingId] = useState<string | null>(null);

  const handleNewEducationChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewEducation({
      ...newEducation,
      [name]: value
    });
  };

  const handleAddEducation = () => {
    if (editingId) {
      // Update existing education
      updateItemInArray('education', editingId, newEducation);
      setEditingId(null);
    } else {
      // Add new education
      addItemToArray('education', newEducation);
    }
    
    // Reset form
    setNewEducation({
      degree: '',
      institution: '',
      specialization: '',
      year_of_passing: '',
      percentage: '',
      state: ''
    });
  };

  const handleEditEducation = (id: string) => {
  const edu = education.find((e: Education) => String(e.id) === id); // Safely typed
    if (edu) {
      setNewEducation({
        degree: edu.degree,
        institution: edu.institution,
        specialization: edu.specialization ?? '',
        year_of_passing: edu.year_of_passing ?? '',
        percentage: edu.percentage ?? '',
        state: edu.state ?? ''
      });
      setEditingId(id);
    }
  };

  const handleCancelEdit = () => {
    setNewEducation({
      degree: '',
      institution: '',
      specialization: '',
      year_of_passing: '',
      percentage: '',
      state: ''
    });
    setEditingId(null);
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 50 }, (_, i) => currentYear - i);

  return (
    <div className="animate-slide-in">
      <div className="mb-8">
        <h3 className="font-medium text-lg text-gray-900 mb-4">Add Education</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-6">
          <div>
            <label htmlFor="degree" className="form-label">Degree/Qualification <span className="text-red-500">*</span></label>
            <select
              id="degree"
              name="degree"
              value={newEducation.degree}
              onChange={handleNewEducationChange}
              className="form-select"
              required
            >
              <option value="">Select Degree</option>
              <option value="High School">High School</option>
              <option value="Diploma">Diploma</option>
              <option value="Bachelor's">Bachelor's</option>
              <option value="Master's">Master's</option>
              <option value="Ph.D">Ph.D</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <label htmlFor="institution" className="form-label">Institution/University <span className="text-red-500">*</span></label>
            <input
              type="text"
              id="institution"
              name="institution"
              value={newEducation.institution}
              onChange={handleNewEducationChange}
              className="form-input"
              required
            />
          </div>
          <div>
            <label htmlFor="specialization" className="form-label">Specialization/Major</label>
            <input
              type="text"
              id="specialization"
              name="specialization"
              value={newEducation.specialization}
              onChange={handleNewEducationChange}
              className="form-input"
            />
          </div>
          <div>
            <label htmlFor="year_of_passing" className="form-label">Year of Passing <span className="text-red-500">*</span></label>
            <select
              id="year_of_passing"
              name="year_of_passing"
              value={newEducation.year_of_passing}
              onChange={handleNewEducationChange}
              className="form-select"
              required
            >
              <option value="">Select Year</option>
              {years.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="percentage" className="form-label">Percentage/CGPA</label>
            <input
              type="text"
              id="percentage"
              name="percentage"
              value={newEducation.percentage}
              onChange={handleNewEducationChange}
              className="form-input"
              placeholder="E.g., 85% or 8.5 CGPA"
            />
          </div>
          <div>
            <label htmlFor="state" className="form-label">State <span className="text-red-500">*</span></label>
            <input
              type="text"
              id="state"
              name="state"
              value={newEducation.state}
              onChange={handleNewEducationChange}
              className="form-input"
              required
            />
          </div>
        </div>
        <div className="mt-4 flex gap-2">
          <button
            type="button"
            onClick={handleAddEducation}
            className="btn btn-primary"
            disabled={!newEducation.degree || !newEducation.institution || !newEducation.year_of_passing || !newEducation.state}
          >
            {editingId ? 'Update Education' : 'Add Education'}
            {!editingId && <Plus size={16} className="ml-2" />}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={handleCancelEdit}
              className="btn btn-secondary"
            >
              Cancel
            </button>
          )}
        </div>
      </div>

      {/* List of education entries */}
      <div>
        <h3 className="font-medium text-lg text-gray-900 mb-4">Education History</h3>
        {education.length === 0 ? (
          <p className="text-gray-500 italic">No education history added yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-md">
              <thead className="bg-gray-50">
                <tr>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Degree</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Institution</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Specialization</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Year</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Percentage/CGPA</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">State</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {education.map((edu: any) => (
                  <tr key={edu.id}>
                    <td className="py-3 px-4 whitespace-nowrap">{edu.degree}</td>
                    <td className="py-3 px-4 whitespace-nowrap">{edu.institution}</td>
                    <td className="py-3 px-4 whitespace-nowrap">{edu.specialization}</td>
                    <td className="py-3 px-4 whitespace-nowrap">{edu.year_of_passing}</td>
                    <td className="py-3 px-4 whitespace-nowrap">{edu.percentage}</td>
                    <td className="py-3 px-4 whitespace-nowrap">{edu.state}</td>
                    <td className="py-3 px-4 whitespace-nowrap">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEditEducation(edu.id)}
                          className="text-blue-600 hover:text-blue-800"
                          title="Edit"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          onClick={() => removeItemFromArray('education', edu.id)}
                          className="text-red-600 hover:text-red-800"
                          title="Delete"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default EducationForm;