import { validateRequiredFields } from '../utils/helpers.js';

/**
 * Middleware to validate employee data
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
export const validateEmployee = (req, res, next) => {
  const { personalDetails, professionalDetails } = req.body;
  
  // Check if request body exists
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({
      status: 'error',
      message: 'Request body is required'
    });
  }
  
  // Check for personal details
  if (!personalDetails) {
    return res.status(400).json({
      status: 'error',
      message: 'Personal details are required'
    });
  }
  
  // Validate required personal details fields
  const requiredPersonalFields = [
    'personal_email', 'first_name', 'last_name', 'permanent_address', 
    'aadhar_no', 'mobile_no'
  ];
  
  const missingPersonalFields = validateRequiredFields(personalDetails, requiredPersonalFields);
  if (missingPersonalFields.length > 0) {
    return res.status(400).json({
      status: 'error',
      message: `Missing required personal details fields: ${missingPersonalFields.join(', ')}`
    });
  }
  
  // Validate personal_email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(personalDetails.personal_email)) {
    return res.status(400).json({
      status: 'error',
      message: 'Personal email is not valid'
    });
  }
  
  // If professional details provided, validate required fields
  if (professionalDetails) {
    const requiredProfessionalFields = [
      'department', 'designation', 'job_band'
    ];
    
    const missingProfessionalFields = validateRequiredFields(
      professionalDetails, 
      requiredProfessionalFields
    );
    
    if (missingProfessionalFields.length > 0) {
      return res.status(400).json({
        status: 'error',
        message: `Missing required professional details fields: ${missingProfessionalFields.join(', ')}`
      });
    }
  }
  
  // Validate arrays if provided
  const validateArray = (array, name, requiredFields) => {
    if (array && Array.isArray(array)) {
      for (let i = 0; i < array.length; i++) {
        const item = array[i];
        const missingFields = validateRequiredFields(item, requiredFields);
        
        if (missingFields.length > 0) {
          return {
            valid: false,
            message: `Missing required fields in ${name}[${i}]: ${missingFields.join(', ')}`
          };
        }
      }
    }
    
    return { valid: true };
  };
  
  // Validate GPA nominees
  const gpaNomineesValidation = validateArray(
    req.body.gpaNominees,
    'gpaNominees',
    ['name', 'relation']
  );
  
  if (!gpaNomineesValidation.valid) {
    return res.status(400).json({
      status: 'error',
      message: gpaNomineesValidation.message
    });
  }
  
  // Validate Nischchint nominee
  if (req.body.nischchintNominee) {
    const missingFields = validateRequiredFields(
      req.body.nischchintNominee,
      ['name', 'relation']
    );
    
    if (missingFields.length > 0) {
      return res.status(400).json({
        status: 'error',
        message: `Missing required fields in nischchintNominee: ${missingFields.join(', ')}`
      });
    }
  }
  
  // Validate Mediclaim dependents
  const mediclaimDependentsValidation = validateArray(
    req.body.mediclaimDependents,
    'mediclaimDependents',
    ['name', 'relation']
  );
  
  if (!mediclaimDependentsValidation.valid) {
    return res.status(400).json({
      status: 'error',
      message: mediclaimDependentsValidation.message
    });
  }
  
  // Validate Family members
  const familyMembersValidation = validateArray(
    req.body.familyMembers,
    'familyMembers',
    ['name', 'relation']
  );
  
  if (!familyMembersValidation.valid) {
    return res.status(400).json({
      status: 'error',
      message: familyMembersValidation.message
    });
  }
  
  // Validate Emergency contacts
  const emergencyContactsValidation = validateArray(
    req.body.emergencyContacts,
    'emergencyContacts',
    ['name', 'relation', 'contact_number']
  );
  
  if (!emergencyContactsValidation.valid) {
    return res.status(400).json({
      status: 'error',
      message: emergencyContactsValidation.message
    });
  }
  
  // Validate Education
  const educationValidation = validateArray(
    req.body.education,
    'education',
    ['degree', 'institution']
  );
  
  if (!educationValidation.valid) {
    return res.status(400).json({
      status: 'error',
      message: educationValidation.message
    });
  }
  
  // Validate Work history
  const workHistoryValidation = validateArray(
    req.body.workHistory,
    'workHistory',
    ['company_name', 'designation']
  );
  
  if (!workHistoryValidation.valid) {
    return res.status(400).json({
      status: 'error',
      message: workHistoryValidation.message
    });
  }
  
  // Validate Language skills
  const languageSkillsValidation = validateArray(
    req.body.languageSkills,
    'languageSkills',
    ['language']
  );
  
  if (!languageSkillsValidation.valid) {
    return res.status(400).json({
      status: 'error',
      message: languageSkillsValidation.message
    });
  }
  
  // If all validations pass, continue
  next();
};