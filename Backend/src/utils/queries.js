// SQL Queries for employee operations

// Get all employees with basic info
export const getAllEmployeesQuery = `
  SELECT 
    p.personal_email,
    p.first_name,
    p.last_name,
    p.poornata_id,
    p.employee_code,
    p.official_email,
    p.mobile_no,
    pd.department,
    pd.designation
  FROM 
    personal_details p
  LEFT JOIN 
    professional_details pd ON p.personal_email = pd.personal_email
  ORDER BY 
    p.first_name, p.last_name
`;

// Get employee by email with all related details
export const getEmployeeByEmailQuery = {
  personalDetails: `
    SELECT * FROM personal_details 
    WHERE personal_email = :email
  `,
  professionalDetails: `
    SELECT * FROM professional_details 
    WHERE personal_email = :email
  `,
  gpaNominees: `
    SELECT * FROM gpa_nominee 
    WHERE personal_email = :email
  `,
  nischchintNominee: `
    SELECT * FROM nischchint_nominee 
    WHERE personal_email = :email
  `,
  mediclaimDependents: `
    SELECT * FROM mediclaim_dependents 
    WHERE personal_email = :email
  `,
  familyMembers: `
    SELECT * FROM family_members 
    WHERE personal_email = :email
  `,
  emergencyContacts: `
    SELECT * FROM emergency_contacts 
    WHERE personal_email = :email
  `,
  education: `
    SELECT * FROM edu 
    WHERE personal_email = :email
  `,
  workHistory: `
    SELECT * FROM work_history 
    WHERE personal_email = :email
  `,
  languageSkills: `
    SELECT * FROM language_skills 
    WHERE personal_email = :email
  `,
  additionalInfo: `
    SELECT * FROM additional_info 
    WHERE personal_email = :email
  `,
  performanceRating: `
    SELECT * FROM performance_rating 
    WHERE personal_email = :email
  `,
  pfDetails: `
    SELECT * FROM pf_details 
    WHERE personal_email = :email
  `,
  gratuityDetails: `
    SELECT * FROM gratuity_details 
    WHERE personal_email = :email
  `,
  superannuationDetails: `
    SELECT * FROM superannuation_details 
    WHERE personal_email = :email
  `
};

// Create personal details
export const createPersonalDetailsQuery = `
  INSERT INTO personal_details (
    personal_email, official_email, joining_reference_id, poornata_id,
    employee_code, prefix, first_name, middle_name, last_name,
    fathers_name, mothers_name, dob, gender, marital_status,
    blood_group, nationality, birth_state, birth_location,
    religion, caste, permanent_address, current_address,
    quarter_no, pan_no, aadhar_no, bank_name,
    bank_account_no, ifsc_code, mobile_no
  ) VALUES (
    :personal_email, :official_email, :joining_reference_id, :poornata_id,
    :employee_code, :prefix, :first_name, :middle_name, :last_name,
    :fathers_name, :mothers_name, TO_DATE(:dob, 'YYYY-MM-DD'), :gender, :marital_status,
    :blood_group, :nationality, :birth_state, :birth_location,
    :religion, :caste, :permanent_address, :current_address,
    :quarter_no, :pan_no, :aadhar_no, :bank_name,
    :bank_account_no, :ifsc_code, :mobile_no
  )
`;

// Create professional details
export const createProfessionalDetailsQuery = `
  INSERT INTO professional_details (
    personal_email, doj_unit, doj_group, department,
    designation, job_band, loi_issue_date, confirmation_date,
    current_ctc, supervisor_name
  ) VALUES (
    :personal_email, TO_DATE(:doj_unit, 'YYYY-MM-DD'), TO_DATE(:doj_group, 'YYYY-MM-DD'),
    :department, :designation, :job_band, TO_DATE(:loi_issue_date, 'YYYY-MM-DD'),
    TO_DATE(:confirmation_date, 'YYYY-MM-DD'), :current_ctc, :supervisor_name
  )
`;

// Update personal details
export const updatePersonalDetailsQuery = `
  UPDATE personal_details SET
    official_email = :official_email,
    joining_reference_id = :joining_reference_id,
    poornata_id = :poornata_id,
    employee_code = :employee_code,
    prefix = :prefix,
    first_name = :first_name,
    middle_name = :middle_name,
    last_name = :last_name,
    fathers_name = :fathers_name,
    mothers_name = :mothers_name,
    dob = TO_DATE(:dob, 'YYYY-MM-DD'),
    gender = :gender,
    marital_status = :marital_status,
    blood_group = :blood_group,
    nationality = :nationality,
    birth_state = :birth_state,
    birth_location = :birth_location,
    religion = :religion,
    caste = :caste,
    permanent_address = :permanent_address,
    current_address = :current_address,
    quarter_no = :quarter_no,
    pan_no = :pan_no,
    aadhar_no = :aadhar_no,
    bank_name = :bank_name,
    bank_account_no = :bank_account_no,
    ifsc_code = :ifsc_code,
    mobile_no = :mobile_no
  WHERE personal_email = :personal_email
`;

// Update professional details
export const updateProfessionalDetailsQuery = `
  UPDATE professional_details SET
    doj_unit = TO_DATE(:doj_unit, 'YYYY-MM-DD'),
    doj_group = TO_DATE(:doj_group, 'YYYY-MM-DD'),
    department = :department,
    designation = :designation,
    job_band = :job_band,
    loi_issue_date = TO_DATE(:loi_issue_date, 'YYYY-MM-DD'),
    confirmation_date = TO_DATE(:confirmation_date, 'YYYY-MM-DD'),
    current_ctc = :current_ctc,
    supervisor_name = :supervisor_name
  WHERE personal_email = :personal_email
`;

// Delete related records queries
export const deleteRelatedRecordsQueries = [
  'DELETE FROM gpa_nominee WHERE personal_email = :email',
  'DELETE FROM nischchint_nominee WHERE personal_email = :email',
  'DELETE FROM mediclaim_dependents WHERE personal_email = :email',
  'DELETE FROM family_members WHERE personal_email = :email',
  'DELETE FROM emergency_contacts WHERE personal_email = :email',
  'DELETE FROM edu WHERE personal_email = :email',
  'DELETE FROM work_history WHERE personal_email = :email',
  'DELETE FROM language_skills WHERE personal_email = :email',
  'DELETE FROM additional_info WHERE personal_email = :email',
  'DELETE FROM performance_rating WHERE personal_email = :email',
  'DELETE FROM pf_details WHERE personal_email = :email',
  'DELETE FROM gratuity_details WHERE personal_email = :email',
  'DELETE FROM superannuation_details WHERE personal_email = :email',
  'DELETE FROM professional_details WHERE personal_email = :email'
];

// Delete employee
export const deleteEmployeeQuery = `
  DELETE FROM personal_details WHERE personal_email = :email
`;

// Search employees
export const searchEmployeesQuery = `
  SELECT 
    p.personal_email,
    p.first_name,
    p.last_name,
    p.poornata_id,
    p.employee_code,
    p.official_email,
    p.mobile_no,
    pd.department,
    pd.designation
  FROM 
    personal_details p
  LEFT JOIN 
    professional_details pd ON p.personal_email = pd.personal_email
  WHERE 
    LOWER(p.personal_email) LIKE LOWER(:searchTerm) OR
    LOWER(p.official_email) LIKE LOWER(:searchTerm) OR
    LOWER(p.first_name || ' ' || p.last_name) LIKE LOWER(:searchTerm) OR
    LOWER(p.poornata_id) LIKE LOWER(:searchTerm) OR
    LOWER(p.employee_code) LIKE LOWER(:searchTerm) OR
    LOWER(p.mobile_no) LIKE LOWER(:searchTerm)
  ORDER BY 
    p.first_name, p.last_name
`;