import React, { useState } from 'react';
import { X } from 'lucide-react';
import { FormData } from '../types/FormTypes';

interface ReviewDialogProps {
  formData: FormData;
  onClose: () => void;
  onSubmit: () => void;
}

const ReviewDialog: React.FC<ReviewDialogProps> = ({ formData, onClose, onSubmit }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      setError(null);

      // Dummy API endpoint - replace with your actual endpoint
      const response = await fetch('http://localhost:5000/api/employees', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit form data');
      }

      const data = await response.json();
      console.log('Form submitted successfully:', data);
      onSubmit();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while submitting the form');
      console.error('Error submitting form:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Helper function to filter dependents by type
  const getDependentsByType = (type: string) => {
    return formData.dependents?.filter(dep => dep.dependent_type === type) || [];
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-6xl max-h-[90vh] overflow-hidden flex flex-col">
        <div className="p-5 border-b border-gray-200 flex justify-between items-center sticky top-0 bg-white z-10">
          <h2 className="text-xl font-bold text-gray-800">Review Your Information</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
            disabled={isSubmitting}
          >
            <X size={24} />
          </button>
        </div>
        
        <div className="overflow-y-auto p-5 flex-grow">
          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
              <p className="text-red-600">{error}</p>
            </div>
          )}
          
          <div className="space-y-8">
            {/* Personal Details */}
            <section>
              <h3 className="text-lg font-medium text-gray-900 mb-3 border-b pb-2">Personal Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Contact Information */}
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-gray-500">Personal Email</span>
                  <span className="text-gray-800">{formData.personalDetails.personal_email}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-gray-500">Official Email</span>
                  <span className="text-gray-800">{formData.personalDetails.official_email}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-gray-500">Mobile Number</span>
                  <span className="text-gray-800">{formData.personalDetails.mobile_no}</span>
                </div>

                {/* Employee Information */}
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-gray-500">Joining Reference ID</span>
                  <span className="text-gray-800">{formData.personalDetails.joining_reference_id}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-gray-500">Poornata ID</span>
                  <span className="text-gray-800">{formData.personalDetails.poornata_id}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-gray-500">Employee Code</span>
                  <span className="text-gray-800">{formData.personalDetails.employee_code}</span>
                </div>

                {/* Personal Information */}
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-gray-500">Name</span>
                  <span className="text-gray-800">
                    {formData.personalDetails.prefix} {formData.personalDetails.first_name} {formData.personalDetails.middle_name} {formData.personalDetails.last_name}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-gray-500">Father's Name</span>
                  <span className="text-gray-800">{formData.personalDetails.fathers_name}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-gray-500">Mother's Name</span>
                  <span className="text-gray-800">{formData.personalDetails.mothers_name}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-gray-500">Date of Birth</span>
                  <span className="text-gray-800">{formData.personalDetails.dob}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-gray-500">Birth Location</span>
                  <span className="text-gray-800">{formData.personalDetails.birth_location}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-gray-500">Birth State</span>
                  <span className="text-gray-800">{formData.personalDetails.birth_state}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-gray-500">Gender</span>
                  <span className="text-gray-800">{formData.personalDetails.gender}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-gray-500">Marital Status</span>
                  <span className="text-gray-800">{formData.personalDetails.marital_status}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-gray-500">Religion</span>
                  <span className="text-gray-800">{formData.personalDetails.religion}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-gray-500">Caste</span>
                  <span className="text-gray-800">{formData.personalDetails.caste}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-gray-500">Blood Group</span>
                  <span className="text-gray-800">{formData.personalDetails.blood_group}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-gray-500">Nationality</span>
                  <span className="text-gray-800">{formData.personalDetails.nationality}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-gray-500">Quarter Number</span>
                  <span className="text-gray-800">{formData.personalDetails.quarter_no}</span>
                </div>

                {/* Address Information */}
                <div className="flex flex-col md:col-span-2">
                  <span className="text-sm font-medium text-gray-500">Permanent Address</span>
                  <span className="text-gray-800">{formData.personalDetails.permanent_address}</span>
                </div>
                <div className="flex flex-col md:col-span-2">
                  <span className="text-sm font-medium text-gray-500">Current Address</span>
                  <span className="text-gray-800">{formData.personalDetails.current_address}</span>
                </div>

                {/* Financial Information */}
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-gray-500">PAN Number</span>
                  <span className="text-gray-800">{formData.personalDetails.pan_no}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-gray-500">Aadhar Number</span>
                  <span className="text-gray-800">{formData.personalDetails.aadhar_no}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-gray-500">Bank Name</span>
                  <span className="text-gray-800">{formData.personalDetails.bank_name}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-gray-500">Bank Account Number</span>
                  <span className="text-gray-800">{formData.personalDetails.bank_account_no}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-gray-500">IFSC Code</span>
                  <span className="text-gray-800">{formData.personalDetails.ifsc_code}</span>
                </div>
              </div>
            </section>

            {/* Professional Details */}
            <section>
              <h3 className="text-lg font-medium text-gray-900 mb-3 border-b pb-2">Professional Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-gray-500">Department</span>
                  <span className="text-gray-800">{formData.professionalDetails.department}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-gray-500">Designation</span>
                  <span className="text-gray-800">{formData.professionalDetails.designation}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-gray-500">Date of Joining (Unit)</span>
                  <span className="text-gray-800">{formData.professionalDetails.doj_unit}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-gray-500">Date of Joining (Group)</span>
                  <span className="text-gray-800">{formData.professionalDetails.doj_group}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-gray-500">Job Band</span>
                  <span className="text-gray-800">{formData.professionalDetails.job_band}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-gray-500">LOI Issue Date</span>
                  <span className="text-gray-800">{formData.professionalDetails.loi_issue_date}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-gray-500">New Position</span>
                  <span className="text-gray-800">{formData.professionalDetails.new_position}</span>
                </div>
              </div>
            </section>

            {/* Dependents */}
            <section>
              <h3 className="text-lg font-medium text-gray-900 mb-3 border-b pb-2">Dependents</h3>
              <div className="space-y-6">
                {/* GPA Nominees */}
                {getDependentsByType('NOMINEE').length > 0 && (
                <div>
                  <h4 className="font-medium text-gray-700 mb-2">GPA Nominees</h4>
                  <div className="space-y-4">
                      {getDependentsByType('NOMINEE').map((nominee, index) => (
                      <div key={index} className="p-4 border rounded-lg">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="flex flex-col">
                            <span className="text-sm font-medium text-gray-500">Name</span>
                            <span className="text-gray-800">{nominee.name}</span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-sm font-medium text-gray-500">Relation</span>
                            <span className="text-gray-800">{nominee.relation}</span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-sm font-medium text-gray-500">Date of Birth</span>
                            <span className="text-gray-800">{nominee.dob}</span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-sm font-medium text-gray-500">Age</span>
                            <span className="text-gray-800">{nominee.age}</span>
                          </div>
                          <div className="flex flex-col">
                              <span className="text-sm font-medium text-gray-500">Share Percentage</span>
                              <span className="text-gray-800">{nominee.share_percentage}%</span>
                          </div>
                        </div>
                      </div>
                    ))}
                    </div>
                  </div>
                )}

                {/* Spouse Information */}
                {formData.personalDetails.marital_status === 'Married' && getDependentsByType('SPOUSE').length > 0 && (
                  <div>
                    <h4 className="font-medium text-gray-700 mb-2">Spouse Information</h4>
                    {getDependentsByType('SPOUSE').map((spouse, index) => (
                      <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-gray-500">Name</span>
                          <span className="text-gray-800">{spouse.name}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-gray-500">Date of Birth</span>
                          <span className="text-gray-800">{spouse.dob}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-gray-500">Occupation</span>
                          <span className="text-gray-800">{spouse.occupation}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-gray-500">Marriage Anniversary</span>
                          <span className="text-gray-800">{spouse.anniversary_date}</span>
                        </div>
                      </div>
                    ))}
                  </div>
            )}

            {/* Family Members */}
                {getDependentsByType('FAMILY').length > 0 && (
                  <div>
                    <h4 className="font-medium text-gray-700 mb-2">Family Members</h4>
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                        <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Relation</th>
                        <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date of Birth</th>
                        <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Occupation</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                          {getDependentsByType('FAMILY').map((member) => (
                        <tr key={member.id}>
                          <td className="py-2 px-4 whitespace-nowrap">{member.name}</td>
                          <td className="py-2 px-4 whitespace-nowrap">{member.relation}</td>
                          <td className="py-2 px-4 whitespace-nowrap">{member.dob}</td>
                          <td className="py-2 px-4 whitespace-nowrap">{member.occupation}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                  </div>
            )}

            {/* Mediclaim Dependents */}
                {getDependentsByType('MEDICLAIM').length > 0 && (
                  <div>
                    <h4 className="font-medium text-gray-700 mb-2">Mediclaim Dependents</h4>
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                        <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Relation</th>
                        <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date of Birth</th>
                        <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Age</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                          {getDependentsByType('MEDICLAIM').map((dependent) => (
                        <tr key={dependent.id}>
                          <td className="py-2 px-4 whitespace-nowrap">{dependent.name}</td>
                          <td className="py-2 px-4 whitespace-nowrap">{dependent.relation}</td>
                          <td className="py-2 px-4 whitespace-nowrap">{dependent.dob}</td>
                          <td className="py-2 px-4 whitespace-nowrap">{dependent.age}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                  </div>
            )}

            {/* Emergency Contacts */}
                {getDependentsByType('EMERGENCY').length > 0 && (
                  <div>
                    <h4 className="font-medium text-gray-700 mb-2">Emergency Contacts</h4>
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                        <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Relation</th>
                        <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact Number</th>
                        <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                          {getDependentsByType('EMERGENCY').map((contact) => (
                        <tr key={contact.id}>
                          <td className="py-2 px-4 whitespace-nowrap">{contact.name}</td>
                          <td className="py-2 px-4 whitespace-nowrap">{contact.relation}</td>
                              <td className="py-2 px-4 whitespace-nowrap">{contact.mobile_no}</td>
                          <td className="py-2 px-4 whitespace-nowrap">{contact.address}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                    </div>
                  </div>
                )}
                </div>
              </section>

            {/* Education */}
            {formData.education.length > 0 && (
              <section>
                <h3 className="text-lg font-medium text-gray-900 mb-3 border-b pb-2">Education</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Qualification</th>
                        <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Institution</th>
                        <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Major</th>
                        <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Completion Date</th>
                        <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Percentage</th>
                        <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">State</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {formData.education.map((edu) => (
                        <tr key={edu.id}>
                          <td className="py-2 px-4 whitespace-nowrap">{edu.qualification}</td>
                          <td className="py-2 px-4 whitespace-nowrap">{edu.institution}</td>
                          <td className="py-2 px-4 whitespace-nowrap">{edu.major}</td>
                          <td className="py-2 px-4 whitespace-nowrap">{edu.completion_date}</td>
                          <td className="py-2 px-4 whitespace-nowrap">{edu.percentage}</td>
                          <td className="py-2 px-4 whitespace-nowrap">{edu.state}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            )}

            {/* Work History */}
            {formData.workHistory.length > 0 && (
              <section>
                <h3 className="text-lg font-medium text-gray-900 mb-3 border-b pb-2">Work History</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Organization</th>
                        <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Job Title</th>
                        <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Start Date</th>
                        <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">End Date</th>
                        <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                        <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CTC</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {formData.workHistory.map((work) => (
                        <tr key={work.id}>
                          <td className="py-2 px-4 whitespace-nowrap">{work.organization}</td>
                          <td className="py-2 px-4 whitespace-nowrap">{work.job_title}</td>
                          <td className="py-2 px-4 whitespace-nowrap">{work.start_date}</td>
                          <td className="py-2 px-4 whitespace-nowrap">{work.end_date}</td>
                          <td className="py-2 px-4 whitespace-nowrap">{work.location}</td>
                          <td className="py-2 px-4 whitespace-nowrap">{work.ctc}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            )}

            {/* Language Skills */}
            {formData.languageSkills.length > 0 && (
              <section>
                <h3 className="text-lg font-medium text-gray-900 mb-3 border-b pb-2">Language Skills</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Language</th>
                        <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Speaking</th>
                        <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reading</th>
                        <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Writing</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {formData.languageSkills.map((lang) => (
                        <tr key={lang.id}>
                          <td className="py-2 px-4 whitespace-nowrap">{lang.language}</td>
                          <td className="py-2 px-4 whitespace-nowrap">{lang.speak_level}</td>
                          <td className="py-2 px-4 whitespace-nowrap">{lang.read_level}</td>
                          <td className="py-2 px-4 whitespace-nowrap">{lang.write_level}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            )}

            {/* Additional Info */}
            <section>
              <h3 className="text-lg font-medium text-gray-900 mb-3 border-b pb-2">Additional Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-gray-500">Total Experience</span>
                  <span className="text-gray-800">{formData.additionalInfo.total_experience}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-gray-500">Last Promotion Date</span>
                  <span className="text-gray-800">{formData.additionalInfo.last_promotion_date}</span>
                </div>
                <div className="flex flex-col md:col-span-2">
                  <span className="text-sm font-medium text-gray-500">Hobbies & Interests</span>
                  <span className="text-gray-800">{formData.additionalInfo.hobbies}</span>
                </div>
                <div className="flex flex-col md:col-span-2">
                  <span className="text-sm font-medium text-gray-500">Special Abilities</span>
                  <span className="text-gray-800">{formData.additionalInfo.special_abilities}</span>
                </div>
              </div>
            </section>

            {/* Performance Rating */}
            <section>
              <h3 className="text-lg font-medium text-gray-900 mb-3 border-b pb-2">Performance Rating</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-gray-500">Last Year</span>
                  <span className="text-gray-800">
                    {formData.performanceRating.last_year.year} - {formData.performanceRating.last_year.rating}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-gray-500">Second Last Year</span>
                  <span className="text-gray-800">
                    {formData.performanceRating.second_last_year.year} - {formData.performanceRating.second_last_year.rating}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-gray-500">Third Last Year</span>
                  <span className="text-gray-800">
                    {formData.performanceRating.third_last_year.year} - {formData.performanceRating.third_last_year.rating}
                  </span>
                </div>
              </div>
            </section>
          </div>
        </div>
        
        <div className="p-5 border-t border-gray-200 sticky bottom-0 bg-white flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="btn btn-secondary"
            disabled={isSubmitting}
          >
            Back to Edit
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="btn btn-primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Form'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewDialog;