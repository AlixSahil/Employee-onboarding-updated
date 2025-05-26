import React, { useState } from 'react';
import { useFormContext } from '../../context/FormContext';
import { Plus, X, Edit2 } from 'lucide-react';

const EmergencyContactsForm: React.FC = () => {
  const { formData, addItemToArray, removeItemFromArray, updateItemInArray } = useFormContext();
  const { emergencyContacts = [] } = formData;

  const [newContact, setNewContact] = useState({
    name: '',
    relation: '',
    contact_number: '',
    address: ''
  });
  
  const [editingId, setEditingId] = useState<string | null>(null);

  const handleNewContactChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewContact({
      ...newContact,
      [name]: value
    });
  };

  const handleAddContact = () => {
    if (editingId) {
      // Update existing contact
      updateItemInArray('emergencyContacts', editingId, newContact);
      setEditingId(null);
    } else {
      // Add new contact
      addItemToArray('emergencyContacts', newContact);
    }
    
    // Reset form
    setNewContact({
      name: '',
      relation: '',
      contact_number: '',
      address: ''
    });
  };

  const handleEditContact = (id: string) => {
    const contact = emergencyContacts.find((c: any) => c.id === id);
    if (contact) {
      setNewContact({
        name: contact.name,
        relation: contact.relation,
        contact_number: contact.contact_number,
        address: contact.address ?? ''
      });
      setEditingId(id);
    }
  };

  const handleCancelEdit = () => {
    setNewContact({
      name: '',
      relation: '',
      contact_number: '',
      address: ''
    });
    setEditingId(null);
  };

  return (
    <div className="animate-slide-in">
      <div className="bg-blue-50 p-4 rounded-md mb-6">
        <h3 className="font-medium text-blue-800 mb-2">Important Note</h3>
        <p className="text-blue-700 text-sm">
          Please provide at least one emergency contact who can be reached in case of an emergency.
          Ideally, this should be someone who does not live with you.
        </p>
      </div>

      <div className="mb-8">
        <h3 className="font-medium text-lg text-gray-900 mb-4">Add Emergency Contact</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-6">
          <div>
            <label htmlFor="contact_name" className="form-label">Name <span className="text-red-500">*</span></label>
            <input
              type="text"
              id="contact_name"
              name="name"
              value={newContact.name}
              onChange={handleNewContactChange}
              className="form-input"
              required
            />
          </div>
          <div>
            <label htmlFor="contact_relation" className="form-label">Relation <span className="text-red-500">*</span></label>
            <select
              id="contact_relation"
              name="relation"
              value={newContact.relation}
              onChange={handleNewContactChange}
              className="form-select"
              required
            >
              <option value="">Select Relation</option>
              <option value="Spouse">Spouse</option>
              <option value="Parent">Parent</option>
              <option value="Child">Child</option>
              <option value="Sibling">Sibling</option>
              <option value="Friend">Friend</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <label htmlFor="contact_number" className="form-label">Contact Number <span className="text-red-500">*</span></label>
            <input
              type="tel"
              id="contact_number"
              name="contact_number"
              value={newContact.contact_number}
              onChange={handleNewContactChange}
              className="form-input"
              required
            />
          </div>
          <div className="md:col-span-2">
            <label htmlFor="contact_address" className="form-label">Address</label>
            <textarea
              id="contact_address"
              name="address"
              value={newContact.address}
              onChange={handleNewContactChange}
              className="form-input h-24 resize-none"
            ></textarea>
          </div>
        </div>
        <div className="mt-4 flex gap-2">
          <button
            type="button"
            onClick={handleAddContact}
            className="btn btn-primary"
            disabled={!newContact.name || !newContact.relation || !newContact.contact_number}
          >
            {editingId ? 'Update Contact' : 'Add Contact'}
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

      {/* List of emergency contacts */}
      <div>
        <h3 className="font-medium text-lg text-gray-900 mb-4">Emergency Contacts List</h3>
        {emergencyContacts && emergencyContacts.length === 0 ? (
          <p className="text-gray-500 italic">No emergency contacts added yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-md">
              <thead className="bg-gray-50">
                <tr>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Relation</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact Number</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {emergencyContacts.map((contact: any) => (
                  <tr key={contact.id}>
                    <td className="py-3 px-4 whitespace-nowrap">{contact.name}</td>
                    <td className="py-3 px-4 whitespace-nowrap">{contact.relation}</td>
                    <td className="py-3 px-4 whitespace-nowrap">{contact.contact_number}</td>
                    <td className="py-3 px-4 whitespace-nowrap">{contact.address}</td>
                    <td className="py-3 px-4 whitespace-nowrap">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEditContact(contact.id)}
                          className="text-blue-600 hover:text-blue-800"
                          title="Edit"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          onClick={() => removeItemFromArray('emergencyContacts', contact.id)}
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

export default EmergencyContactsForm;