import React, { useState } from 'react';
import { useFormContext } from '../../context/FormContext';
import { Plus, X, Edit2 } from 'lucide-react';

const LanguageSkillsForm: React.FC = () => {
  const { formData, addItemToArray, removeItemFromArray, updateItemInArray } = useFormContext();
  const { languageSkills = [] } = formData;
  

  const [newLanguage, setNewLanguage] = useState({
    language: '',
    speaking: 'Low',
    reading: 'Low',
    writing: 'Low',
    isCustomLanguage: false
  });
  
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const proficiencyLevels = ['Low', 'Moderate', 'High'];
  const commonLanguages = [
    'English',
    'Hindi',
    'Bengali',
    'Odia',
    'Telugu',
    'Tamil',
    'Marathi',
    'Gujarati',
    'Urdu',
    'Kannada',
    'Punjabi',
    'Assamese',
    'Other'
  ];

  const handleNewLanguageChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === 'language') {
      setNewLanguage({
        ...newLanguage,
        language: value,
        isCustomLanguage: value === 'Other'
      });
    } else {
      setNewLanguage({
        ...newLanguage,
        [name]: value
      });
    }
  };

  const handleAddLanguage = () => {
    if (editingId) {
      // Update existing language
      updateItemInArray('languageSkills', editingId, newLanguage);
      setEditingId(null);
    } else {
      // Add new language
      addItemToArray('languageSkills', newLanguage);
    }
    
    // Reset form
    setNewLanguage({
      language: '',
      speaking: 'Low',
      reading: 'Low',
      writing: 'Low',
      isCustomLanguage: false
    });
  };

  const handleEditLanguage = (id: string) => {
    const language = languageSkills.find((lang: any) => lang.id === id);
    if (language) {
      const isCustom = !commonLanguages.includes(language.language);
      setNewLanguage({
        language: isCustom ? 'Other' : language.language,
        speaking: language.speaking ?? '',
        reading: language.reading ?? '',
        writing: language.writing ?? '',
        isCustomLanguage: isCustom
      });
      setEditingId(id);
    }
  };

  const handleCancelEdit = () => {
    setNewLanguage({
      language: '',
      speaking: 'Low',
      reading: 'Low',
      writing: 'Low',
      isCustomLanguage: false
    });
    setEditingId(null);
  };

  return (
    <div className="animate-slide-in">
      <div className="mb-8">
        <h3 className="font-medium text-lg text-gray-900 mb-4">Add Language Skill</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-x-4 gap-y-6">
          <div>
            <label htmlFor="language" className="form-label">Language <span className="text-red-500">*</span></label>
            {newLanguage.isCustomLanguage ? (
              <input
                type="text"
                id="language"
                name="language"
                value={newLanguage.language}
                onChange={handleNewLanguageChange}
                className="form-input"
                required
                placeholder="Enter language name"
              />
            ) : (
              <select
                id="language"
                name="language"
                value={newLanguage.language}
                onChange={handleNewLanguageChange}
                className="form-select"
                required
              >
                <option value="">Select a language</option>
                {commonLanguages.map((lang) => (
                  <option key={lang} value={lang}>{lang}</option>
                ))}
              </select>
            )}
          </div>
          <div>
            <label htmlFor="speaking" className="form-label">Speaking</label>
            <select
              id="speaking"
              name="speaking"
              value={newLanguage.speaking}
              onChange={handleNewLanguageChange}
              className="form-select"
            >
              {proficiencyLevels.map((level) => (
                <option key={`speaking-${level}`} value={level}>{level}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="reading" className="form-label">Reading</label>
            <select
              id="reading"
              name="reading"
              value={newLanguage.reading}
              onChange={handleNewLanguageChange}
              className="form-select"
            >
              {proficiencyLevels.map((level) => (
                <option key={`reading-${level}`} value={level}>{level}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="writing" className="form-label">Writing</label>
            <select
              id="writing"
              name="writing"
              value={newLanguage.writing}
              onChange={handleNewLanguageChange}
              className="form-select"
            >
              {proficiencyLevels.map((level) => (
                <option key={`writing-${level}`} value={level}>{level}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="mt-4 flex gap-2">
          <button
            type="button"
            onClick={handleAddLanguage}
            className="btn btn-primary"
            disabled={!newLanguage.language}
          >
            {editingId ? 'Update Language' : 'Add Language'}
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

      {/* List of language skills */}
      <div>
        <h3 className="font-medium text-lg text-gray-900 mb-4">Language Skills</h3>
        {languageSkills.length === 0 ? (
          <p className="text-gray-500 italic">No language skills added yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-md">
              <thead className="bg-gray-50">
                <tr>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Language</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Speaking</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reading</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Writing</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {languageSkills.map((lang: any) => (
                  <tr key={lang.id}>
                    <td className="py-3 px-4 whitespace-nowrap">{lang.language}</td>
                    <td className="py-3 px-4 whitespace-nowrap">{lang.speaking}</td>
                    <td className="py-3 px-4 whitespace-nowrap">{lang.reading}</td>
                    <td className="py-3 px-4 whitespace-nowrap">{lang.writing}</td>
                    <td className="py-3 px-4 whitespace-nowrap">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEditLanguage(lang.id)}
                          className="text-blue-600 hover:text-blue-800"
                          title="Edit"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          onClick={() => removeItemFromArray('languageSkills', lang.id)}
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

export default LanguageSkillsForm;