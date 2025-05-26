import React, { useState } from 'react';
import { useFormContext } from '../../context/FormContext';
import { Plus, X, Edit2 } from 'lucide-react';

const WorkHistoryForm: React.FC = () => {
  const { formData, addItemToArray, removeItemFromArray, updateItemInArray } = useFormContext();
  const { workHistory = [] } = formData;

  const [newWorkHistory, setNewWorkHistory] = useState({
    company_name: '',
    designation: '',
    from_date: '',
    to_date: '',
    in_group: '',
    state: '',
    ending_ctc: ''
  });
  
  const [editingId, setEditingId] = useState<string | null>(null);

  const handleNewWorkHistoryChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewWorkHistory({
      ...newWorkHistory,
      [name]: value
    });
  };

  const handleAddWorkHistory = () => {
    if (editingId) {
      // Update existing work history
      updateItemInArray('workHistory', editingId, newWorkHistory);
      setEditingId(null);
    } else {
      // Add new work history
      addItemToArray('workHistory', newWorkHistory);
    }
    
    // Reset form
    setNewWorkHistory({
      company_name: '',
      designation: '',
      from_date: '',
      to_date: '',
      in_group: '',
      state: '',
      ending_ctc: ''
    });
  };

  const handleEditWorkHistory = (id: string) => {
    const work = workHistory.find((w: any) => w.id === id);
    if (work) {
      setNewWorkHistory({
        company_name: work.company_name,
        designation: work.designation,
        from_date: work.from_date,
        to_date: work.to_date,
        in_group: work.in_group,
        state: work.state,
        ending_ctc: work.ending_ctc
      });
      setEditingId(id);
    }
  };

  const handleCancelEdit = () => {
    setNewWorkHistory({
      company_name: '',
      designation: '',
      from_date: '',
      to_date: '',
      in_group: '',
      state: '',
      ending_ctc: ''
    });
    setEditingId(null);
  };

  return (
    <div className="animate-slide-in">
      <div className="bg-blue-50 p-4 rounded-md mb-6">
        <h3 className="font-medium text-blue-800 mb-2">Work History</h3>
        <p className="text-blue-700 text-sm">
          Please provide details of your previous employment. This information helps us understand your professional background.
        </p>
      </div>

      <div className="mb-8">
        <h3 className="font-medium text-lg text-gray-900 mb-4">Add Work Experience</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-6">
          <div>
            <label htmlFor="company_name" className="form-label">Company Name <span className="text-red-500">*</span></label>
            <input
              type="text"
              id="company_name"
              name="company_name"
              value={newWorkHistory.company_name}
              onChange={handleNewWorkHistoryChange}
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
              value={newWorkHistory.designation}
              onChange={handleNewWorkHistoryChange}
              className="form-input"
              required
            />
          </div>
          <div>
            <label htmlFor="from_date" className="form-label">From Date <span className="text-red-500">*</span></label>
            <input
              type="date"
              id="from_date"
              name="from_date"
              value={newWorkHistory.from_date}
              onChange={handleNewWorkHistoryChange}
              className="form-input"
              required
            />
          </div>
          <div>
            <label htmlFor="to_date" className="form-label">To Date <span className="text-red-500">*</span></label>
            <input
              type="date"
              id="to_date"
              name="to_date"
              value={newWorkHistory.to_date}
              onChange={handleNewWorkHistoryChange}
              className="form-input"
              required
            />
          </div>
          <div>
            <label htmlFor="in_group" className="form-label">In Group <span className="text-red-500">*</span></label>
            <select
              id="in_group"
              name="in_group"
              value={newWorkHistory.in_group}
              onChange={handleNewWorkHistoryChange}
              className="form-input"
              required
            >
              <option value="">Select</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
          <div>
            <label htmlFor="state" className="form-label">State <span className="text-red-500">*</span></label>
            <input
              type="text"
              id="state"
              name="state"
              value={newWorkHistory.state}
              onChange={handleNewWorkHistoryChange}
              className="form-input"
              required
            />
          </div>
          <div>
            <label htmlFor="ending_ctc" className="form-label">Ending CTC <span className="text-red-500">*</span></label>
            <input
              type="text"
              id="ending_ctc"
              name="ending_ctc"
              value={newWorkHistory.ending_ctc}
              onChange={handleNewWorkHistoryChange}
              className="form-input"
              required
            />
          </div>
        </div>
        <div className="mt-4 flex gap-2">
          <button
            type="button"
            onClick={handleAddWorkHistory}
            className="btn btn-primary"
            disabled={!newWorkHistory.company_name || !newWorkHistory.designation || !newWorkHistory.from_date || !newWorkHistory.to_date || !newWorkHistory.in_group || !newWorkHistory.state || !newWorkHistory.ending_ctc}
          >
            {editingId ? 'Update Work Experience' : 'Add Work Experience'}
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

      {/* List of work history entries */}
      <div>
        <h3 className="font-medium text-lg text-gray-900 mb-4">Work Experience History</h3>
        {workHistory.length === 0 ? (
          <p className="text-gray-500 italic">No work experience added yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-md">
              <thead className="bg-gray-50">
                <tr>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Designation</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">From</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">To</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">In Group</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">State</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ending CTC</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {workHistory.map((work: any) => (
                  <tr key={work.id}>
                    <td className="py-3 px-4 whitespace-nowrap">{work.company_name}</td>
                    <td className="py-3 px-4 whitespace-nowrap">{work.designation}</td>
                    <td className="py-3 px-4 whitespace-nowrap">{work.from_date}</td>
                    <td className="py-3 px-4 whitespace-nowrap">{work.to_date}</td>
                    <td className="py-3 px-4 whitespace-nowrap">{work.in_group}</td>
                    <td className="py-3 px-4 whitespace-nowrap">{work.state}</td>
                    <td className="py-3 px-4 whitespace-nowrap">{work.ending_ctc}</td>
                    <td className="py-3 px-4 whitespace-nowrap">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEditWorkHistory(work.id)}
                          className="text-blue-600 hover:text-blue-800"
                          title="Edit"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          onClick={() => removeItemFromArray('workHistory', work.id)}
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

export default WorkHistoryForm;