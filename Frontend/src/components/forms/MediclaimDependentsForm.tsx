import React, { useState } from 'react';
import { useFormContext } from '../../context/FormContext';
import { Plus, X, Edit2 } from 'lucide-react';

const MediclaimDependentsForm: React.FC = () => {
  const { formData, updateFormData, addItemToArray, removeItemFromArray, updateItemInArray } = useFormContext();
  const { mediclaimDependents = []} = formData;

  const [newDependent, setNewDependent] = useState({
    name: '',
    relation: '',
    dob: '',
    age: '',
    gender: '',
    birthState: '',
    address: '',
    aadharNumber: '',
    maritalStatus: ''
  });
  
  const [editingId, setEditingId] = useState<string | null>(null);

  const handleNewDependentChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (name === 'dob' && value) {
      const dob = new Date(value);
      const today = new Date();
      let age = today.getFullYear() - dob.getFullYear();
      const monthDiff = today.getMonth() - dob.getMonth();
      
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
        age--;
      }
      
      setNewDependent({
        ...newDependent,
        dob: value,
        age: age.toString()
      });
    } else {
      setNewDependent({
        ...newDependent,
        [name]: value
      });
    }
  };

  const handleAddDependent = () => {
    if (editingId) {
      updateItemInArray('mediclaimDependents', editingId, newDependent);
      setEditingId(null);
    } else {
      addItemToArray('mediclaimDependents', newDependent);
    }
    
    setNewDependent({
      name: '',
      relation: '',
      dob: '',
      age: '',
      gender: '',
      birthState: '',
      address: '',
      aadharNumber: '',
      maritalStatus: ''
    });
  };

  const handleEditDependent = (id: string) => {
    const dependent = mediclaimDependents.find((dep: any) => dep.id === id);
    if (dependent) {
      setNewDependent({
        name: dependent.name,
        relation: dependent.relation,
        dob: dependent.dob ?? '',
        age: dependent.age != null ? dependent.age.toString() : '',
        gender: dependent.gender ?? '',
        birthState: dependent.birth_state ?? '',
        address: dependent.address ?? '',
        aadharNumber: dependent.aadhar_number ?? '',
        maritalStatus: dependent.marital_status ?? ''
      });
      setEditingId(id);
    }
  };

  const handleCancelEdit = () => {
    setNewDependent({
      name: '',
      relation: '',
      dob: '',
      age: '',
      gender: '',
      birthState: '',
      address: '',
      aadharNumber: '',
      maritalStatus: ''
    });
    setEditingId(null);
  };

  return (
    <div className="animate-slide-in">
      <div className="bg-blue-50 p-4 rounded-md mb-6">
        <h3 className="font-medium text-blue-800 mb-2">Information</h3>
        <p className="text-blue-700 text-sm">
          Add your dependents who will be covered under the company's mediclaim policy.
          You can include your spouse, children, and parents.
        </p>
      </div>

      <div className="mb-8">
        <h3 className="font-medium text-lg text-gray-900 mb-4">Add Dependent</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-6">
          <div>
            <label htmlFor="dependent_name" className="form-label">Name <span className="text-red-500">*</span></label>
            <input
              type="text"
              id="dependent_name"
              name="name"
              value={newDependent.name}
              onChange={handleNewDependentChange}
              className="form-input"
              required
            />
          </div>
          <div>
            <label htmlFor="dependent_relation" className="form-label">Relation <span className="text-red-500">*</span></label>
            <select
              id="dependent_relation"
              name="relation"
              value={newDependent.relation}
              onChange={handleNewDependentChange}
              className="form-select"
              required
            >
              <option value="">Select Relation</option>
              <option value="Spouse">Spouse</option>
              <option value="Child">Child</option>
              <option value="Parent">Parent</option>
              <option value="Father">Father</option>
              <option value="Mother">Mother</option>
            </select>
          </div>
          <div>
            <label htmlFor="dependent_gender" className="form-label">Gender <span className="text-red-500">*</span></label>
            <select
              id="dependent_gender"
              name="gender"
              value={newDependent.gender}
              onChange={handleNewDependentChange}
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
            <label htmlFor="dependent_dob" className="form-label">Date of Birth</label>
            <input
              type="date"
              id="dependent_dob"
              name="dob"
              value={newDependent.dob}
              onChange={handleNewDependentChange}
              className="form-input"
            />
          </div>
          <div>
            <label htmlFor="dependent_age" className="form-label">Age</label>
            <input
              type="text"
              id="dependent_age"
              name="age"
              value={newDependent.age}
              onChange={handleNewDependentChange}
              className="form-input"
              readOnly
            />
          </div>
          <div>
            <label htmlFor="dependent_maritalStatus" className="form-label">Marital Status</label>
            <select
              id="dependent_maritalStatus"
              name="maritalStatus"
              value={newDependent.maritalStatus}
              onChange={handleNewDependentChange}
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
            <label htmlFor="dependent_birthState" className="form-label">Birth State</label>
            <input
              type="text"
              id="dependent_birthState"
              name="birthState"
              value={newDependent.birthState}
              onChange={handleNewDependentChange}
              className="form-input"
            />
          </div>
          <div>
            <label htmlFor="dependent_aadharNumber" className="form-label">Aadhar Number</label>
            <input
              type="text"
              id="dependent_aadharNumber"
              name="aadharNumber"
              value={newDependent.aadharNumber}
              onChange={handleNewDependentChange}
              className="form-input"
              maxLength={12}
              pattern="[0-9]{12}"
            />
          </div>
          <div className="md:col-span-3">
            <label htmlFor="dependent_address" className="form-label">Address</label>
            <textarea
              id="dependent_address"
              name="address"
              value={newDependent.address}
              onChange={handleNewDependentChange}
              className="form-input"
              rows={3}
            />
          </div>
        </div>
        <div className="mt-4 flex gap-2">
          <button
            type="button"
            onClick={handleAddDependent}
            className="btn btn-primary"
            disabled={!newDependent.name || !newDependent.relation || !newDependent.gender}
          >
            {editingId ? 'Update Dependent' : 'Add Dependent'}
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

      {/* List of dependents */}
      <div>
        <h3 className="font-medium text-lg text-gray-900 mb-4">Dependents List</h3>
        {mediclaimDependents.length === 0 ?  (
          <p className="text-gray-500 italic">No dependents added yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-md">
              <thead className="bg-gray-50">
                <tr>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Relation</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gender</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date of Birth</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Age</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Marital Status</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {mediclaimDependents.map((dependent: any) => (
                  <tr key={dependent.id}>
                    <td className="py-3 px-4 whitespace-nowrap">{dependent.name}</td>
                    <td className="py-3 px-4 whitespace-nowrap">{dependent.relation}</td>
                    <td className="py-3 px-4 whitespace-nowrap">{dependent.gender}</td>
                    <td className="py-3 px-4 whitespace-nowrap">{dependent.dob}</td>
                    <td className="py-3 px-4 whitespace-nowrap">{dependent.age}</td>
                    <td className="py-3 px-4 whitespace-nowrap">{dependent.maritalStatus}</td>
                    <td className="py-3 px-4 whitespace-nowrap">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEditDependent(dependent.id)}
                          className="text-blue-600 hover:text-blue-800"
                          title="Edit"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          onClick={() => removeItemFromArray('mediclaimDependents', dependent.id)}
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

export default MediclaimDependentsForm;