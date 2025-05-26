import React, { useState } from 'react';
import { useFormContext } from '../../context/FormContext';
import { Plus, X, Edit2 } from 'lucide-react';

const FamilyInfoForm: React.FC = () => {
  const { formData, updateFormData, addItemToArray, removeItemFromArray, updateItemInArray } = useFormContext();
  const { spouse, familyMembers, personalDetails } = formData;

  const [newFamilyMember, setNewFamilyMember] = useState({
    name: '',
    relation: '',
    dob: '',
    occupation: '',
    mobile: ''
  });
  
  const [editingId, setEditingId] = useState<string | null>(null);

  const handleSpouseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateFormData('spouse', {
      ...spouse,
      [name]: value
    });
  };

  const handleNewFamilyMemberChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewFamilyMember({
      ...newFamilyMember,
      [name]: value
    });
  };

  const handleAddFamilyMember = () => {
    if (editingId) {
      // Update existing family member
      updateItemInArray('familyMembers', editingId, newFamilyMember);
      setEditingId(null);
    } else {
      // Add new family member
      addItemToArray('familyMembers', newFamilyMember);
    }
    
    // Reset form
    setNewFamilyMember({
      name: '',
      relation: '',
      dob: '',
      occupation: '',
      mobile: ''
    });
  };

  const handleEditFamilyMember = (id: string) => {
    const member = familyMembers.find((mem: any) => mem.id === id);
    if (member) {
      setNewFamilyMember({
        name: member.name,
        relation: member.relation,
        dob: member.dob,
        occupation: member.occupation,
        mobile: member.mobile
      });
      setEditingId(id);
    }
  };

  const handleCancelEdit = () => {
    setNewFamilyMember({
      name: '',
      relation: '',
      dob: '',
      occupation: '',
      mobile: ''
    });
    setEditingId(null);
  };

  // Show spouse section only if marital status is Married
  const showSpouseSection = personalDetails.marital_status === "Married";

  return (
    <div className="animate-slide-in">
      {showSpouseSection && (
        <div className="mb-8">
          <h3 className="font-medium text-lg text-gray-900 mb-4 border-b pb-2">Spouse Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-6">
            <div>
              <label htmlFor="spouse_name" className="form-label">Name</label>
              <input
                type="text"
                id="spouse_name"
                name="name"
                value={spouse.name}
                onChange={handleSpouseChange}
                className="form-input"
              />
            </div>
            <div>
              <label htmlFor="spouse_dob" className="form-label">Date of Birth</label>
              <input
                type="date"
                id="spouse_dob"
                name="dob"
                value={spouse.dob}
                onChange={handleSpouseChange}
                className="form-input"
              />
            </div>
            <div>
              <label htmlFor="spouse_occupation" className="form-label">Occupation</label>
              <input
                type="text"
                id="spouse_occupation"
                name="occupation"
                value={spouse.occupation}
                onChange={handleSpouseChange}
                className="form-input"
              />
            </div>
            <div>
              <label htmlFor="spouse_mobile" className="form-label">Mobile Number</label>
              <input
                type="tel"
                id="spouse_mobile"
                name="mobile"
                value={spouse.mobile}
                onChange={handleSpouseChange}
                className="form-input"
                pattern="[0-9]{10}"
                placeholder="10 digit mobile number"
              />
            </div>
            <div>
              <label htmlFor="marriage_anniversary" className="form-label">Marriage Anniversary</label>
              <input
                type="date"
                id="marriage_anniversary"
                name="marriage_anniversary"
                value={spouse.marriage_anniversary}
                onChange={handleSpouseChange}
                className="form-input"
              />
            </div>
          </div>
        </div>
      )}

      <div className="mb-8">
        <h3 className="font-medium text-lg text-gray-900 mb-4">Add Family Member</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-6">
          <div>
            <label htmlFor="family_name" className="form-label">Name <span className="text-red-500">*</span></label>
            <input
              type="text"
              id="family_name"
              name="name"
              value={newFamilyMember.name}
              onChange={handleNewFamilyMemberChange}
              className="form-input"
              required
            />
          </div>
          <div>
            <label htmlFor="family_relation" className="form-label">Relation <span className="text-red-500">*</span></label>
            <select
              id="family_relation"
              name="relation"
              value={newFamilyMember.relation}
              onChange={handleNewFamilyMemberChange}
              className="form-select"
              required
            >
              <option value="">Select Relation</option>
              <option value="Father">Father</option>
              <option value="Mother">Mother</option>
              <option value="Brother">Brother</option>
              <option value="Sister">Sister</option>
              <option value="Son">Son</option>
              <option value="Daughter">Daughter</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <label htmlFor="family_dob" className="form-label">Date of Birth</label>
            <input
              type="date"
              id="family_dob"
              name="dob"
              value={newFamilyMember.dob}
              onChange={handleNewFamilyMemberChange}
              className="form-input"
            />
          </div>
          <div>
            <label htmlFor="family_occupation" className="form-label">Occupation</label>
            <input
              type="text"
              id="family_occupation"
              name="occupation"
              value={newFamilyMember.occupation}
              onChange={handleNewFamilyMemberChange}
              className="form-input"
            />
          </div>
          <div>
            <label htmlFor="family_mobile" className="form-label">Mobile Number</label>
            <input
              type="tel"
              id="family_mobile"
              name="mobile"
              value={newFamilyMember.mobile}
              onChange={handleNewFamilyMemberChange}
              className="form-input"
              pattern="[0-9]{10}"
              placeholder="10 digit mobile number"
            />
          </div>
        </div>
        <div className="mt-4 flex gap-2">
          <button
            type="button"
            onClick={handleAddFamilyMember}
            className="btn btn-primary"
            disabled={!newFamilyMember.name || !newFamilyMember.relation}
          >
            {editingId ? 'Update Family Member' : 'Add Family Member'}
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

      {/* List of family members */}
      <div>
        <h3 className="font-medium text-lg text-gray-900 mb-4">Family Members List</h3>
        {familyMembers.length === 0 ? (
          <p className="text-gray-500 italic">No family members added yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-md">
              <thead className="bg-gray-50">
                <tr>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Relation</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date of Birth</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Occupation</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mobile</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {familyMembers.map((member: any) => (
                  <tr key={member.id}>
                    <td className="py-3 px-4 whitespace-nowrap">{member.name}</td>
                    <td className="py-3 px-4 whitespace-nowrap">{member.relation}</td>
                    <td className="py-3 px-4 whitespace-nowrap">{member.dob}</td>
                    <td className="py-3 px-4 whitespace-nowrap">{member.occupation}</td>
                    <td className="py-3 px-4 whitespace-nowrap">{member.mobile}</td>
                    <td className="py-3 px-4 whitespace-nowrap">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEditFamilyMember(member.id)}
                          className="text-blue-600 hover:text-blue-800"
                          title="Edit"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          onClick={() => removeItemFromArray('familyMembers', member.id)}
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

export default FamilyInfoForm;