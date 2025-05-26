import { executeQuery, executeTransaction } from '../config/database.js';
import { 
  formatDateForDB,
  formatDateResponse,
  validateRequiredFields
} from '../utils/helpers.js';
import { 
  getEmployeeByEmailQuery,
  getAllEmployeesQuery,
  createPersonalDetailsQuery,
  createProfessionalDetailsQuery,
  updatePersonalDetailsQuery,
  updateProfessionalDetailsQuery,
  deleteRelatedRecordsQueries,
  deleteEmployeeQuery,
  searchEmployeesQuery
} from '../utils/queries.js';

// @route   GET /api/employees
// @desc    Get all employees
// @access  Public
export const getAllEmployees = async (req, res, next) => {
  try {
    const result = await executeQuery(getAllEmployeesQuery);
    
    // Format response data
    const employees = result.rows.map(row => ({
      personal_email: row.PERSONAL_EMAIL,
      first_name: row.FIRST_NAME,
      last_name: row.LAST_NAME,
      poornata_id: row.POORNATA_ID,
      employee_code: row.EMPLOYEE_CODE,
      official_email: row.OFFICIAL_EMAIL,
      mobile_no: row.MOBILE_NO,
      department: row.DEPARTMENT,
      designation: row.DESIGNATION
    }));
    
    res.status(200).json({
      status: 'success',
      results: employees.length,
      data: employees
    });
  } catch (error) {
    next(error);
  }
};

// @route   GET /api/employees/:email
// @desc    Get employee by personal email
// @access  Public
export const getEmployeeByEmail = async (req, res, next) => {
  try {
    const { email } = req.params;
    
    // Get personal details
    const personalDetailsResult = await executeQuery(
      getEmployeeByEmailQuery.personalDetails,
      { email }
    );
    
    if (personalDetailsResult.rows.length === 0) {
      return res.status(404).json({
        status: 'error',
        message: 'Employee not found'
      });
    }
    
    // Get professional details
    const professionalDetailsResult = await executeQuery(
      getEmployeeByEmailQuery.professionalDetails,
      { email }
    );
    
    // Get GPA nominees
    const gpaNomineesResult = await executeQuery(
      getEmployeeByEmailQuery.gpaNominees,
      { email }
    );
    
    // Get Nischchint nominee
    const nischchintNomineeResult = await executeQuery(
      getEmployeeByEmailQuery.nischchintNominee,
      { email }
    );
    
    // Get Mediclaim dependents
    const mediclaimDependentsResult = await executeQuery(
      getEmployeeByEmailQuery.mediclaimDependents,
      { email }
    );
    
    // Get family members
    const familyMembersResult = await executeQuery(
      getEmployeeByEmailQuery.familyMembers,
      { email }
    );
    
    // Get emergency contacts
    const emergencyContactsResult = await executeQuery(
      getEmployeeByEmailQuery.emergencyContacts,
      { email }
    );
    
    // Get education records
    const educationResult = await executeQuery(
      getEmployeeByEmailQuery.education,
      { email }
    );
    
    // Get work history
    const workHistoryResult = await executeQuery(
      getEmployeeByEmailQuery.workHistory,
      { email }
    );
    
    // Get language skills
    const languageSkillsResult = await executeQuery(
      getEmployeeByEmailQuery.languageSkills,
      { email }
    );
    
    // Get additional info
    const additionalInfoResult = await executeQuery(
      getEmployeeByEmailQuery.additionalInfo,
      { email }
    );
    
    // Get performance rating
    const performanceRatingResult = await executeQuery(
      getEmployeeByEmailQuery.performanceRating,
      { email }
    );
    
    // Get PF details
    const pfDetailsResult = await executeQuery(
      getEmployeeByEmailQuery.pfDetails,
      { email }
    );
    
    // Get gratuity details
    const gratuityDetailsResult = await executeQuery(
      getEmployeeByEmailQuery.gratuityDetails,
      { email }
    );
    
    // Get superannuation details
    const superannuationDetailsResult = await executeQuery(
      getEmployeeByEmailQuery.superannuationDetails,
      { email }
    );
    
    // Format the response
    const employeeData = {
      personalDetails: formatDateResponse(personalDetailsResult.rows[0]),
      professionalDetails: professionalDetailsResult.rows.length > 0 
        ? formatDateResponse(professionalDetailsResult.rows[0])
        : null,
      gpaNominees: gpaNomineesResult.rows.map(row => formatDateResponse(row)),
      nischchintNominee: nischchintNomineeResult.rows.length > 0 
        ? formatDateResponse(nischchintNomineeResult.rows[0])
        : null,
      mediclaimDependents: mediclaimDependentsResult.rows.map(row => formatDateResponse(row)),
      familyMembers: familyMembersResult.rows.map(row => formatDateResponse(row)),
      emergencyContacts: emergencyContactsResult.rows,
      education: educationResult.rows.map(row => formatDateResponse(row)),
      workHistory: workHistoryResult.rows.map(row => formatDateResponse(row)),
      languageSkills: languageSkillsResult.rows,
      additionalInfo: additionalInfoResult.rows.length > 0 
        ? formatDateResponse(additionalInfoResult.rows[0])
        : null,
      performanceRating: performanceRatingResult.rows.length > 0 
        ? performanceRatingResult.rows[0]
        : null,
      pfDetails: pfDetailsResult.rows,
      gratuityDetails: gratuityDetailsResult.rows.map(row => formatDateResponse(row)),
      superannuationDetails: superannuationDetailsResult.rows.map(row => formatDateResponse(row))
    };
    
    res.status(200).json({
      status: 'success',
      data: employeeData
    });
  } catch (error) {
    next(error);
  }
};

// @route   POST /api/employees
// @desc    Create a new employee
// @access  Public
export const createEmployee = async (req, res, next) => {
  let connection;
  
  try {
    const { 
      personalDetails,
      professionalDetails,
      gpaNominees,
      nischchintNominee,
      mediclaimDependents,
      familyMembers,
      emergencyContacts,
      education,
      workHistory,
      languageSkills,
      additionalInfo,
      performanceRating,
      pfDetails,
      gratuityDetails,
      superannuationDetails
    } = req.body;
    
    // Validate required fields
    const requiredPersonalFields = [
      'personal_email', 'first_name', 'last_name', 'permanent_address', 
      'aadhar_no', 'mobile_no'
    ];
    
    const requiredProfessionalFields = [
      'department', 'designation', 'job_band'
    ];
    
    const missingPersonalFields = validateRequiredFields(personalDetails, requiredPersonalFields);
    if (missingPersonalFields.length > 0) {
      return res.status(400).json({
        status: 'error',
        message: `Missing required personal details fields: ${missingPersonalFields.join(', ')}`
      });
    }
    
    if (professionalDetails) {
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
    
    // Format personal details
    const formattedPersonalDetails = {
      ...personalDetails,
      dob: personalDetails.dob ? formatDateForDB(personalDetails.dob) : null
    };
    
    // Format professional details
    const formattedProfessionalDetails = professionalDetails ? {
      ...professionalDetails,
      personal_email: personalDetails.personal_email,
      doj_unit: professionalDetails.doj_unit ? formatDateForDB(professionalDetails.doj_unit) : null,
      doj_group: professionalDetails.doj_group ? formatDateForDB(professionalDetails.doj_group) : null,
      loi_issue_date: professionalDetails.loi_issue_date ? formatDateForDB(professionalDetails.loi_issue_date) : null,
      confirmation_date: professionalDetails.confirmation_date ? formatDateForDB(professionalDetails.confirmation_date) : null
    } : null;
    
    // Prepare transaction queries
    const queries = [];
    
    // Insert personal details
    queries.push({
      sql: createPersonalDetailsQuery,
      params: formattedPersonalDetails
    });
    
    // Insert professional details
    if (formattedProfessionalDetails) {
      queries.push({
        sql: createProfessionalDetailsQuery,
        params: formattedProfessionalDetails
      });
    }
    
    // Insert GPA nominees
    if (gpaNominees && gpaNominees.length > 0) {
      for (const nominee of gpaNominees) {
        queries.push({
          sql: `INSERT INTO gpa_nominee (
            personal_email, name, relation, dob, age, contribution
          ) VALUES (
            :personal_email, :name, :relation, TO_DATE(:dob, 'YYYY-MM-DD'), :age, :contribution
          )`,
          params: {
            personal_email: personalDetails.personal_email,
            name: nominee.name,
            relation: nominee.relation,
            dob: nominee.dob ? formatDateForDB(nominee.dob) : null,
            age: nominee.age || null,
            contribution: nominee.contribution || null
          }
        });
      }
    }
    
    // Insert Nischchint nominee
    if (nischchintNominee) {
      queries.push({
        sql: `INSERT INTO nischchint_nominee (
          personal_email, name, relation, dob, age, contribution
        ) VALUES (
          :personal_email, :name, :relation, TO_DATE(:dob, 'YYYY-MM-DD'), :age, :contribution
        )`,
        params: {
          personal_email: personalDetails.personal_email,
          name: nischchintNominee.name,
          relation: nischchintNominee.relation,
          dob: nischchintNominee.dob ? formatDateForDB(nischchintNominee.dob) : null,
          age: nischchintNominee.age || null,
          contribution: nischchintNominee.contribution || null
        }
      });
    }
    
    // Insert Mediclaim dependents
    if (mediclaimDependents && mediclaimDependents.length > 0) {
      for (const dependent of mediclaimDependents) {
        queries.push({
          sql: `INSERT INTO mediclaim_dependents (
            personal_email, name, relation, dob, age, gender, birth_state, address, aadhar_number, marital_status
          ) VALUES (
            :personal_email, :name, :relation, TO_DATE(:dob, 'YYYY-MM-DD'), :age, :gender, :birth_state, :address, :aadhar_number, :marital_status
          )`,
          params: {
            personal_email: personalDetails.personal_email,
            name: dependent.name,
            relation: dependent.relation,
            dob: dependent.dob ? formatDateForDB(dependent.dob) : null,
            age: dependent.age || null,
            gender: dependent.gender || null,
            birth_state: dependent.birth_state || null,
            address: dependent.address || null,
            aadhar_number: dependent.aadhar_number || null,
            marital_status: dependent.marital_status || null
          }
        });
      }
    }
    
    // Insert Family members
    if (familyMembers && familyMembers.length > 0) {
      for (const member of familyMembers) {
        queries.push({
          sql: `INSERT INTO family_members (
            personal_email, name, relation, dob, occupation, marriage_anniversary, mobile
          ) VALUES (
            :personal_email, :name, :relation, TO_DATE(:dob, 'YYYY-MM-DD'), :occupation, TO_DATE(:marriage_anniversary, 'YYYY-MM-DD'), :mobile
          )`,
          params: {
            personal_email: personalDetails.personal_email,
            name: member.name,
            relation: member.relation,
            dob: member.dob ? formatDateForDB(member.dob) : null,
            occupation: member.occupation || null,
            marriage_anniversary: member.marriage_anniversary ? formatDateForDB(member.marriage_anniversary) : null,
            mobile: member.mobile || null
          }
        });
      }
    }
    
    // Insert Emergency contacts
    if (emergencyContacts && emergencyContacts.length > 0) {
      for (const contact of emergencyContacts) {
        queries.push({
          sql: `INSERT INTO emergency_contacts (
            personal_email, name, relation, contact_number, address
          ) VALUES (
            :personal_email, :name, :relation, :contact_number, :address
          )`,
          params: {
            personal_email: personalDetails.personal_email,
            name: contact.name,
            relation: contact.relation,
            contact_number: contact.contact_number,
            address: contact.address || null
          }
        });
      }
    }
    
    // Insert Education
    if (education && education.length > 0) {
      for (const edu of education) {
        queries.push({
          sql: `INSERT INTO edu (
            personal_email, degree, institution, specialization, year_of_passing, percentage, state
          ) VALUES (
            :personal_email, :degree, :institution, :specialization, :year_of_passing, :percentage, :state
          )`,
          params: {
            personal_email: personalDetails.personal_email,
            degree: edu.degree,
            institution: edu.institution,
            specialization: edu.specialization || null,
            year_of_passing: edu.year_of_passing || null,
            percentage: edu.percentage || null,
            state: edu.state || null
          }
        });
      }
    }
    
    // Insert Work history
    if (workHistory && workHistory.length > 0) {
      for (const work of workHistory) {
        queries.push({
          sql: `INSERT INTO work_history (
            personal_email, company_name, designation, from_date, to_date, in_group, state, ending_ctc
          ) VALUES (
            :personal_email, :company_name, :designation, TO_DATE(:from_date, 'YYYY-MM-DD'), TO_DATE(:to_date, 'YYYY-MM-DD'), :in_group, :state, :ending_ctc
          )`,
          params: {
            personal_email: personalDetails.personal_email,
            company_name: work.company_name || work.organization,
            designation: work.designation || work.job_title,
            from_date: work.from_date ? formatDateForDB(work.from_date) : null,
            to_date: work.to_date ? formatDateForDB(work.to_date) : null,
            in_group: work.in_group || null,
            state: work.state || null,
            ending_ctc: work.ending_ctc || work.ctc || null
          }
        });
      }
    }
    
    // Insert Language skills
    if (languageSkills && languageSkills.length > 0) {
      for (const skill of languageSkills) {
        queries.push({
          sql: `INSERT INTO language_skills (
            personal_email, language, speaking, reading, writing
          ) VALUES (
            :personal_email, :language, :speaking, :reading, :writing
          )`,
          params: {
            personal_email: personalDetails.personal_email,
            language: skill.language,
            speaking: skill.speaking || skill.speak_level || null,
            reading: skill.reading || skill.read_level || null,
            writing: skill.writing || skill.write_level || null
          }
        });
      }
    }
    
    // Insert Additional info
    if (additionalInfo) {
      queries.push({
        sql: `INSERT INTO additional_info (
          personal_email, current_unit_name, last_job_change_date, hobbies, total_experience, last_promotion_date, attended_dac, dac_date, special_abilities
        ) VALUES (
          :personal_email, :current_unit_name, TO_DATE(:last_job_change_date, 'YYYY-MM-DD'), :hobbies, :total_experience, TO_DATE(:last_promotion_date, 'YYYY-MM-DD'), :attended_dac, TO_DATE(:dac_date, 'YYYY-MM-DD'), :special_abilities
        )`,
        params: {
          personal_email: personalDetails.personal_email,
          current_unit_name: additionalInfo.current_unit_name || null,
          last_job_change_date: additionalInfo.last_job_change_date ? formatDateForDB(additionalInfo.last_job_change_date) : null,
          hobbies: additionalInfo.hobbies || null,
          total_experience: additionalInfo.total_experience || null,
          last_promotion_date: additionalInfo.last_promotion_date ? formatDateForDB(additionalInfo.last_promotion_date) : null,
          attended_dac: additionalInfo.attended_dac || null,
          dac_date: additionalInfo.dac_date ? formatDateForDB(additionalInfo.dac_date) : null,
          special_abilities: additionalInfo.special_abilities || null
        }
      });
    }
    
    // Insert Performance rating
    if (performanceRating) {
      queries.push({
        sql: `INSERT INTO performance_rating (
          personal_email, last_year_year, last_year_rating, second_last_year_year, second_last_year_rating, third_last_year_year, third_last_year_rating
        ) VALUES (
          :personal_email, :last_year_year, :last_year_rating, :second_last_year_year, :second_last_year_rating, :third_last_year_year, :third_last_year_rating
        )`,
        params: {
          personal_email: personalDetails.personal_email,
          last_year_year: performanceRating.last_year_year || null,
          last_year_rating: performanceRating.last_year || performanceRating.last_year_rating || null,
          second_last_year_year: performanceRating.second_last_year_year || null,
          second_last_year_rating: performanceRating.second_last_year || performanceRating.second_last_year_rating || null,
          third_last_year_year: performanceRating.third_last_year_year || null,
          third_last_year_rating: performanceRating.third_last_year || performanceRating.third_last_year_rating || null
        }
      });
    }
    
    // Insert PF details
    if (pfDetails && pfDetails.length > 0) {
      for (const pf of pfDetails) {
        queries.push({
          sql: `INSERT INTO pf_details (
            personal_email, uan_number, pf_number, eps_number, nominee_name, nominee_relation, share_percentage
          ) VALUES (
            :personal_email, :uan_number, :pf_number, :eps_number, :nominee_name, :nominee_relation, :share_percentage
          )`,
          params: {
            personal_email: personalDetails.personal_email,
            uan_number: pf.uan_number || null,
            pf_number: pf.pf_number || null,
            eps_number: pf.eps_number || null,
            nominee_name: pf.nominee_name || null,
            nominee_relation: pf.nominee_relation || null,
            share_percentage: pf.share_percentage || null
          }
        });
      }
    }
    
    // Insert Gratuity details
    if (gratuityDetails && gratuityDetails.length > 0) {
      for (const gratuity of gratuityDetails) {
        queries.push({
          sql: `INSERT INTO gratuity_details (
            personal_email, nominee_name, nominee_relation, share_percentage, nominee_age, employee_age, confirmation_date
          ) VALUES (
            :personal_email, :nominee_name, :nominee_relation, :share_percentage, :nominee_age, :employee_age, TO_DATE(:confirmation_date, 'YYYY-MM-DD')
          )`,
          params: {
            personal_email: personalDetails.personal_email,
            nominee_name: gratuity.nominee_name || null,
            nominee_relation: gratuity.nominee_relation || null,
            share_percentage: gratuity.share_percentage || null,
            nominee_age: gratuity.nominee_age || null,
            employee_age: gratuity.employee_age || null,
            confirmation_date: gratuity.confirmation_date ? formatDateForDB(gratuity.confirmation_date) : null
          }
        });
      }
    }
    
    // Insert Superannuation details
    if (superannuationDetails && superannuationDetails.length > 0) {
      for (const superannuation of superannuationDetails) {
        queries.push({
          sql: `INSERT INTO superannuation_details (
            personal_email, nominee_name, nominee_relation, share_percentage, marriage_date, confirmation_date
          ) VALUES (
            :personal_email, :nominee_name, :nominee_relation, :share_percentage, TO_DATE(:marriage_date, 'YYYY-MM-DD'), TO_DATE(:confirmation_date, 'YYYY-MM-DD')
          )`,
          params: {
            personal_email: personalDetails.personal_email,
            nominee_name: superannuation.nominee_name || null,
            nominee_relation: superannuation.nominee_relation || null,
            share_percentage: superannuation.share_percentage || null,
            marriage_date: superannuation.marriage_date ? formatDateForDB(superannuation.marriage_date) : null,
            confirmation_date: superannuation.confirmation_date ? formatDateForDB(superannuation.confirmation_date) : null
          }
        });
      }
    }
    
    // Execute transaction
    await executeTransaction(queries);
    
    res.status(201).json({
      status: 'success',
      message: 'Employee created successfully',
      data: {
        personal_email: personalDetails.personal_email
      }
    });
  } catch (error) {
    console.error('Error creating employee:', error);
    next(error);
  }
};

// @route   PUT /api/employees/:email
// @desc    Update an employee
// @access  Public
export const updateEmployee = async (req, res, next) => {
  try {
    const { email } = req.params;
    const { 
      personalDetails,
      professionalDetails,
      gpaNominees,
      nischchintNominee,
      mediclaimDependents,
      familyMembers,
      emergencyContacts,
      education,
      workHistory,
      languageSkills,
      additionalInfo,
      performanceRating,
      pfDetails,
      gratuityDetails,
      superannuationDetails
    } = req.body;
    
    // Check if employee exists
    const checkEmployee = await executeQuery(
      'SELECT personal_email FROM personal_details WHERE personal_email = :email',
      { email }
    );
    
    if (checkEmployee.rows.length === 0) {
      return res.status(404).json({
        status: 'error',
        message: 'Employee not found'
      });
    }
    
    // Format personal details
    const formattedPersonalDetails = personalDetails ? {
      ...personalDetails,
      dob: personalDetails.dob ? formatDateForDB(personalDetails.dob) : null,
      personal_email: email
    } : null;
    
    // Format professional details
    const formattedProfessionalDetails = professionalDetails ? {
      ...professionalDetails,
      personal_email: email,
      doj_unit: professionalDetails.doj_unit ? formatDateForDB(professionalDetails.doj_unit) : null,
      doj_group: professionalDetails.doj_group ? formatDateForDB(professionalDetails.doj_group) : null,
      loi_issue_date: professionalDetails.loi_issue_date ? formatDateForDB(professionalDetails.loi_issue_date) : null,
      confirmation_date: professionalDetails.confirmation_date ? formatDateForDB(professionalDetails.confirmation_date) : null
    } : null;
    
    // Prepare transaction queries
    const queries = [];
    
    // Update personal details
    if (formattedPersonalDetails) {
      queries.push({
        sql: updatePersonalDetailsQuery,
        params: formattedPersonalDetails
      });
    }
    
    // Update professional details
    if (formattedProfessionalDetails) {
      // Check if professional details exist
      const checkProfessional = await executeQuery(
        'SELECT personal_email FROM professional_details WHERE personal_email = :email',
        { email }
      );
      
      if (checkProfessional.rows.length === 0) {
        // Insert professional details
        queries.push({
          sql: createProfessionalDetailsQuery,
          params: formattedProfessionalDetails
        });
      } else {
        // Update professional details
        queries.push({
          sql: updateProfessionalDetailsQuery,
          params: formattedProfessionalDetails
        });
      }
    }
    
    // Update GPA nominees
    if (gpaNominees !== undefined) {
      // Delete existing nominees
      queries.push({
        sql: 'DELETE FROM gpa_nominee WHERE personal_email = :email',
        params: { email }
      });
      
      // Insert new nominees
      if (gpaNominees && gpaNominees.length > 0) {
        for (const nominee of gpaNominees) {
          queries.push({
            sql: `INSERT INTO gpa_nominee (
              personal_email, name, relation, dob, age, contribution
            ) VALUES (
              :personal_email, :name, :relation, TO_DATE(:dob, 'YYYY-MM-DD'), :age, :contribution
            )`,
            params: {
              personal_email: email,
              name: nominee.name,
              relation: nominee.relation,
              dob: nominee.dob ? formatDateForDB(nominee.dob) : null,
              age: nominee.age || null,
              contribution: nominee.contribution || null
            }
          });
        }
      }
    }
    
    // Update Nischchint nominee
    if (nischchintNominee !== undefined) {
      // Delete existing nominee
      queries.push({
        sql: 'DELETE FROM nischchint_nominee WHERE personal_email = :email',
        params: { email }
      });
      
      // Insert new nominee
      if (nischchintNominee) {
        queries.push({
          sql: `INSERT INTO nischchint_nominee (
            personal_email, name, relation, dob, age, contribution
          ) VALUES (
            :personal_email, :name, :relation, TO_DATE(:dob, 'YYYY-MM-DD'), :age, :contribution
          )`,
          params: {
            personal_email: email,
            name: nischchintNominee.name,
            relation: nischchintNominee.relation,
            dob: nischchintNominee.dob ? formatDateForDB(nischchintNominee.dob) : null,
            age: nischchintNominee.age || null,
            contribution: nischchintNominee.contribution || null
          }
        });
      }
    }
    
    // Update Mediclaim dependents
    if (mediclaimDependents !== undefined) {
      // Delete existing dependents
      queries.push({
        sql: 'DELETE FROM mediclaim_dependents WHERE personal_email = :email',
        params: { email }
      });
      
      // Insert new dependents
      if (mediclaimDependents && mediclaimDependents.length > 0) {
        for (const dependent of mediclaimDependents) {
          queries.push({
            sql: `INSERT INTO mediclaim_dependents (
              personal_email, name, relation, dob, age, gender, birth_state, address, aadhar_number, marital_status
            ) VALUES (
              :personal_email, :name, :relation, TO_DATE(:dob, 'YYYY-MM-DD'), :age, :gender, :birth_state, :address, :aadhar_number, :marital_status
            )`,
            params: {
              personal_email: email,
              name: dependent.name,
              relation: dependent.relation,
              dob: dependent.dob ? formatDateForDB(dependent.dob) : null,
              age: dependent.age || null,
              gender: dependent.gender || null,
              birth_state: dependent.birth_state || null,
              address: dependent.address || null,
              aadhar_number: dependent.aadhar_number || null,
              marital_status: dependent.marital_status || null
            }
          });
        }
      }
    }
    
    // Update Family members
    if (familyMembers !== undefined) {
      // Delete existing family members
      queries.push({
        sql: 'DELETE FROM family_members WHERE personal_email = :email',
        params: { email }
      });
      
      // Insert new family members
      if (familyMembers && familyMembers.length > 0) {
        for (const member of familyMembers) {
          queries.push({
            sql: `INSERT INTO family_members (
              personal_email, name, relation, dob, occupation, marriage_anniversary, mobile
            ) VALUES (
              :personal_email, :name, :relation, TO_DATE(:dob, 'YYYY-MM-DD'), :occupation, TO_DATE(:marriage_anniversary, 'YYYY-MM-DD'), :mobile
            )`,
            params: {
              personal_email: email,
              name: member.name,
              relation: member.relation,
              dob: member.dob ? formatDateForDB(member.dob) : null,
              occupation: member.occupation || null,
              marriage_anniversary: member.marriage_anniversary ? formatDateForDB(member.marriage_anniversary) : null,
              mobile: member.mobile || null
            }
          });
        }
      }
    }
    
    // Update Emergency contacts
    if (emergencyContacts !== undefined) {
      // Delete existing emergency contacts
      queries.push({
        sql: 'DELETE FROM emergency_contacts WHERE personal_email = :email',
        params: { email }
      });
      
      // Insert new emergency contacts
      if (emergencyContacts && emergencyContacts.length > 0) {
        for (const contact of emergencyContacts) {
          queries.push({
            sql: `INSERT INTO emergency_contacts (
              personal_email, name, relation, contact_number, address
            ) VALUES (
              :personal_email, :name, :relation, :contact_number, :address
            )`,
            params: {
              personal_email: email,
              name: contact.name,
              relation: contact.relation,
              contact_number: contact.contact_number,
              address: contact.address || null
            }
          });
        }
      }
    }
    
    // Update Education
    if (education !== undefined) {
      // Delete existing education records
      queries.push({
        sql: 'DELETE FROM edu WHERE personal_email = :email',
        params: { email }
      });
      
      // Insert new education records
      if (education && education.length > 0) {
        for (const edu of education) {
          queries.push({
            sql: `INSERT INTO edu (
              personal_email, degree, institution, specialization, year_of_passing, percentage, state
            ) VALUES (
              :personal_email, :degree, :institution, :specialization, :year_of_passing, :percentage, :state
            )`,
            params: {
              personal_email: email,
              degree: edu.degree,
              institution: edu.institution,
              specialization: edu.specialization || null,
              year_of_passing: edu.year_of_passing || null,
              percentage: edu.percentage || null,
              state: edu.state || null
            }
          });
        }
      }
    }
    
    // Update Work history
    if (workHistory !== undefined) {
      // Delete existing work history
      queries.push({
        sql: 'DELETE FROM work_history WHERE personal_email = :email',
        params: { email }
      });
      
      // Insert new work history
      if (workHistory && workHistory.length > 0) {
        for (const work of workHistory) {
          queries.push({
            sql: `INSERT INTO work_history (
              personal_email, company_name, designation, from_date, to_date, in_group, state, ending_ctc
            ) VALUES (
              :personal_email, :company_name, :designation, TO_DATE(:from_date, 'YYYY-MM-DD'), TO_DATE(:to_date, 'YYYY-MM-DD'), :in_group, :state, :ending_ctc
            )`,
            params: {
              personal_email: email,
              company_name: work.company_name || work.organization,
              designation: work.designation || work.job_title,
              from_date: work.from_date ? formatDateForDB(work.from_date) : null,
              to_date: work.to_date ? formatDateForDB(work.to_date) : null,
              in_group: work.in_group || null,
              state: work.state || null,
              ending_ctc: work.ending_ctc || work.ctc || null
            }
          });
        }
      }
    }
    
    // Update Language skills
    if (languageSkills !== undefined) {
      // Delete existing language skills
      queries.push({
        sql: 'DELETE FROM language_skills WHERE personal_email = :email',
        params: { email }
      });
      
      // Insert new language skills
      if (languageSkills && languageSkills.length > 0) {
        for (const skill of languageSkills) {
          queries.push({
            sql: `INSERT INTO language_skills (
              personal_email, language, speaking, reading, writing
            ) VALUES (
              :personal_email, :language, :speaking, :reading, :writing
            )`,
            params: {
              personal_email: email,
              language: skill.language,
              speaking: skill.speaking || skill.speak_level || null,
              reading: skill.reading || skill.read_level || null,
              writing: skill.writing || skill.write_level || null
            }
          });
        }
      }
    }
    
    // Update Additional info
    if (additionalInfo !== undefined) {
      // Check if additional info exists
      const checkAdditionalInfo = await executeQuery(
        'SELECT personal_email FROM additional_info WHERE personal_email = :email',
        { email }
      );
      
      if (checkAdditionalInfo.rows.length === 0 && additionalInfo) {
        // Insert additional info
        queries.push({
          sql: `INSERT INTO additional_info (
            personal_email, current_unit_name, last_job_change_date, hobbies, total_experience, last_promotion_date, attended_dac, dac_date, special_abilities
          ) VALUES (
            :personal_email, :current_unit_name, TO_DATE(:last_job_change_date, 'YYYY-MM-DD'), :hobbies, :total_experience, TO_DATE(:last_promotion_date, 'YYYY-MM-DD'), :attended_dac, TO_DATE(:dac_date, 'YYYY-MM-DD'), :special_abilities
          )`,
          params: {
            personal_email: email,
            current_unit_name: additionalInfo.current_unit_name || null,
            last_job_change_date: additionalInfo.last_job_change_date ? formatDateForDB(additionalInfo.last_job_change_date) : null,
            hobbies: additionalInfo.hobbies || null,
            total_experience: additionalInfo.total_experience || null,
            last_promotion_date: additionalInfo.last_promotion_date ? formatDateForDB(additionalInfo.last_promotion_date) : null,
            attended_dac: additionalInfo.attended_dac || null,
            dac_date: additionalInfo.dac_date ? formatDateForDB(additionalInfo.dac_date) : null,
            special_abilities: additionalInfo.special_abilities || null
          }
        });
      } else if (additionalInfo) {
        // Update additional info
        queries.push({
          sql: `UPDATE additional_info SET
            current_unit_name = :current_unit_name,
            last_job_change_date = TO_DATE(:last_job_change_date, 'YYYY-MM-DD'),
            hobbies = :hobbies,
            total_experience = :total_experience,
            last_promotion_date = TO_DATE(:last_promotion_date, 'YYYY-MM-DD'),
            attended_dac = :attended_dac,
            dac_date = TO_DATE(:dac_date, 'YYYY-MM-DD'),
            special_abilities = :special_abilities
            WHERE personal_email = :personal_email`,
          params: {
            personal_email: email,
            current_unit_name: additionalInfo.current_unit_name || null,
            last_job_change_date: additionalInfo.last_job_change_date ? formatDateForDB(additionalInfo.last_job_change_date) : null,
            hobbies: additionalInfo.hobbies || null,
            total_experience: additionalInfo.total_experience || null,
            last_promotion_date: additionalInfo.last_promotion_date ? formatDateForDB(additionalInfo.last_promotion_date) : null,
            attended_dac: additionalInfo.attended_dac || null,
            dac_date: additionalInfo.dac_date ? formatDateForDB(additionalInfo.dac_date) : null,
            special_abilities: additionalInfo.special_abilities || null
          }
        });
      } else {
        // Delete additional info
        queries.push({
          sql: 'DELETE FROM additional_info WHERE personal_email = :email',
          params: { email }
        });
      }
    }
    
    // Update Performance rating
    if (performanceRating !== undefined) {
      // Check if performance rating exists
      const checkPerformanceRating = await executeQuery(
        'SELECT personal_email FROM performance_rating WHERE personal_email = :email',
        { email }
      );
      
      if (checkPerformanceRating.rows.length === 0 && performanceRating) {
        // Insert performance rating
        queries.push({
          sql: `INSERT INTO performance_rating (
            personal_email, last_year_year, last_year_rating, second_last_year_year, second_last_year_rating, third_last_year_year, third_last_year_rating
          ) VALUES (
            :personal_email, :last_year_year, :last_year_rating, :second_last_year_year, :second_last_year_rating, :third_last_year_year, :third_last_year_rating
          )`,
          params: {
            personal_email: email,
            last_year_year: performanceRating.last_year_year || null,
            last_year_rating: performanceRating.last_year || performanceRating.last_year_rating || null,
            second_last_year_year: performanceRating.second_last_year_year || null,
            second_last_year_rating: performanceRating.second_last_year || performanceRating.second_last_year_rating || null,
            third_last_year_year: performanceRating.third_last_year_year || null,
            third_last_year_rating: performanceRating.third_last_year || performanceRating.third_last_year_rating || null
          }
        });
      } else if (performanceRating) {
        // Update performance rating
        queries.push({
          sql: `UPDATE performance_rating SET
            last_year_year = :last_year_year,
            last_year_rating = :last_year_rating,
            second_last_year_year = :second_last_year_year,
            second_last_year_rating = :second_last_year_rating,
            third_last_year_year = :third_last_year_year,
            third_last_year_rating = :third_last_year_rating
            WHERE personal_email = :personal_email`,
          params: {
            personal_email: email,
            last_year_year: performanceRating.last_year_year || null,
            last_year_rating: performanceRating.last_year || performanceRating.last_year_rating || null,
            second_last_year_year: performanceRating.second_last_year_year || null,
            second_last_year_rating: performanceRating.second_last_year || performanceRating.second_last_year_rating || null,
            third_last_year_year: performanceRating.third_last_year_year || null,
            third_last_year_rating: performanceRating.third_last_year || performanceRating.third_last_year_rating || null
          }
        });
      } else {
        // Delete performance rating
        queries.push({
          sql: 'DELETE FROM performance_rating WHERE personal_email = :email',
          params: { email }
        });
      }
    }
    
    // Update PF details
    if (pfDetails !== undefined) {
      // Delete existing PF details
      queries.push({
        sql: 'DELETE FROM pf_details WHERE personal_email = :email',
        params: { email }
      });
      
      // Insert new PF details
      if (pfDetails && pfDetails.length > 0) {
        for (const pf of pfDetails) {
          queries.push({
            sql: `INSERT INTO pf_details (
              personal_email, uan_number, pf_number, eps_number, nominee_name, nominee_relation, share_percentage
            ) VALUES (
              :personal_email, :uan_number, :pf_number, :eps_number, :nominee_name, :nominee_relation, :share_percentage
            )`,
            params: {
              personal_email: email,
              uan_number: pf.uan_number || null,
              pf_number: pf.pf_number || null,
              eps_number: pf.eps_number || null,
              nominee_name: pf.nominee_name || null,
              nominee_relation: pf.nominee_relation || null,
              share_percentage: pf.share_percentage || null
            }
          });
        }
      }
    }
    
    // Update Gratuity details
    if (gratuityDetails !== undefined) {
      // Delete existing gratuity details
      queries.push({
        sql: 'DELETE FROM gratuity_details WHERE personal_email = :email',
        params: { email }
      });
      
      // Insert new gratuity details
      if (gratuityDetails && gratuityDetails.length > 0) {
        for (const gratuity of gratuityDetails) {
          queries.push({
            sql: `INSERT INTO gratuity_details (
              personal_email, nominee_name, nominee_relation, share_percentage, nominee_age, employee_age, confirmation_date
            ) VALUES (
              :personal_email, :nominee_name, :nominee_relation, :share_percentage, :nominee_age, :employee_age, TO_DATE(:confirmation_date, 'YYYY-MM-DD')
            )`,
            params: {
              personal_email: email,
              nominee_name: gratuity.nominee_name || null,
              nominee_relation: gratuity.nominee_relation || null,
              share_percentage: gratuity.share_percentage || null,
              nominee_age: gratuity.nominee_age || null,
              employee_age: gratuity.employee_age || null,
              confirmation_date: gratuity.confirmation_date ? formatDateForDB(gratuity.confirmation_date) : null
            }
          });
        }
      }
    }
    
    // Update Superannuation details
    if (superannuationDetails !== undefined) {
      // Delete existing superannuation details
      queries.push({
        sql: 'DELETE FROM superannuation_details WHERE personal_email = :email',
        params: { email }
      });
      
      // Insert new superannuation details
      if (superannuationDetails && superannuationDetails.length > 0) {
        for (const superannuation of superannuationDetails) {
          queries.push({
            sql: `INSERT INTO superannuation_details (
              personal_email, nominee_name, nominee_relation, share_percentage, marriage_date, confirmation_date
            ) VALUES (
              :personal_email, :nominee_name, :nominee_relation, :share_percentage, TO_DATE(:marriage_date, 'YYYY-MM-DD'), TO_DATE(:confirmation_date, 'YYYY-MM-DD')
            )`,
            params: {
              personal_email: email,
              nominee_name: superannuation.nominee_name || null,
              nominee_relation: superannuation.nominee_relation || null,
              share_percentage: superannuation.share_percentage || null,
              marriage_date: superannuation.marriage_date ? formatDateForDB(superannuation.marriage_date) : null,
              confirmation_date: superannuation.confirmation_date ? formatDateForDB(superannuation.confirmation_date) : null
            }
          });
        }
      }
    }
    
    // Execute transaction
    if (queries.length > 0) {
      await executeTransaction(queries);
    }
    
    res.status(200).json({
      status: 'success',
      message: 'Employee updated successfully',
      data: {
        personal_email: email
      }
    });
  } catch (error) {
    console.error('Error updating employee:', error);
    next(error);
  }
};

// @route   DELETE /api/employees/:email
// @desc    Delete an employee
// @access  Public
export const deleteEmployee = async (req, res, next) => {
  try {
    const { email } = req.params;
    
    // Check if employee exists
    const checkEmployee = await executeQuery(
      'SELECT personal_email FROM personal_details WHERE personal_email = :email',
      { email }
    );
    
    if (checkEmployee.rows.length === 0) {
      return res.status(404).json({
        status: 'error',
        message: 'Employee not found'
      });
    }
    
    // Prepare transaction queries for deleting related records
    const deleteRelatedRecords = deleteRelatedRecordsQueries.map(query => ({
      sql: query,
      params: { email }
    }));
    
    // Add query to delete the employee
    deleteRelatedRecords.push({
      sql: deleteEmployeeQuery,
      params: { email }
    });
    
    // Execute transaction
    await executeTransaction(deleteRelatedRecords);
    
    res.status(200).json({
      status: 'success',
      message: 'Employee deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting employee:', error);
    next(error);
  }
};

// @route   GET /api/employees/search
// @desc    Search employees by query
// @access  Public
export const searchEmployees = async (req, res, next) => {
  try {
    const { q } = req.query;
    
    if (!q) {
      return res.status(400).json({
        status: 'error',
        message: 'Search query is required'
      });
    }
    
    const searchTerm = `%${q}%`;
    
    const result = await executeQuery(
      searchEmployeesQuery,
      { searchTerm, searchTerm, searchTerm, searchTerm, searchTerm, searchTerm }
    );
    
    // Format response data
    const employees = result.rows.map(row => ({
      personal_email: row.PERSONAL_EMAIL,
      first_name: row.FIRST_NAME,
      last_name: row.LAST_NAME,
      poornata_id: row.POORNATA_ID,
      employee_code: row.EMPLOYEE_CODE,
      official_email: row.OFFICIAL_EMAIL,
      mobile_no: row.MOBILE_NO,
      department: row.DEPARTMENT,
      designation: row.DESIGNATION
    }));
    
    res.status(200).json({
      status: 'success',
      results: employees.length,
      data: employees
    });
  } catch (error) {
    next(error);
  }
};