// Form state types
export type PersonalDetails = {
  personal_email: string;
  official_email?: string;
  joining_reference_id?: string;
  poornata_id?: string;
  employee_code?: string;
  prefix?: string;
  first_name: string;
  middle_name?: string;
  last_name: string;
  fathers_name?: string;
  mothers_name?: string;
  dob?: string;
  gender?: string;
  marital_status?: string;
  blood_group?: string;
  nationality?: string;
  birth_state?: string;
  birth_location?: string;
  religion?: string;
  caste?: string;
  permanent_address: string;
  current_address?: string;
  quarter_no?: string;
  pan_no?: string;
  aadhar_no: string;
  bank_name?: string;
  bank_account_no?: string;
  ifsc_code?: string;
  mobile_no: string;
};

export type ProfessionalDetails = {
  personal_email: string;
  doj_unit?: string;
  doj_group?: string;
  department: string;
  designation: string;
  job_band: string;
  loi_issue_date?: string;
  confirmation_date?: string;
  current_ctc?: string;
  supervisor_name?: string;
};

export type Dependent = {
  id?: number;
  personal_email: string;
  dependent_type: 'SPOUSE' | 'MEDICLAIM' | 'NOMINEE' | 'FAMILY' | 'EMERGENCY';
  name: string;
  relation: string;
  dob?: string;
  age?: number;
  share_percentage?: number;
  address?: string;
  aadhar_no?: string;
  marital_status?: string;
  occupation?: string;
  birthState?: string;
  mobile_no?: string;
  is_primary?: 'Y' | 'N';
  anniversary_date?: string;
};

export type Education = {
  id?: number;
  personal_email: string;
  degree: string;
  institution: string;
  specialization?: string;
  year_of_passing?: string;
  percentage?: string;
  state?: string;
};

export type WorkHistory = {
  id?: number;
  personal_email: string;
  company_name: string;
  designation: string;
  from_date?: string;
  to_date?: string;
  in_group?: string;
  state?: string;
  ending_ctc?: string;
};

export type LanguageSkill = {
  id?: number;
  personal_email: string;
  language: string;
  speaking?: string;
  reading?: string;
  writing?: string;
};

export type AdditionalInfo = {
  personal_email: string;
  current_unit_name?: string;
  last_job_change_date?: string;
  hobbies?: string;
  total_experience?: string;
  last_promotion_date?: string;
  attended_dac?: string;
  dac_date?: string;
  special_abilities?: string;
};

export type PerformanceRating = {
  personal_email: string;
  last_year_year?: string;
  last_year_rating?: string;
  second_last_year_year?: string;
  second_last_year_rating?: string;
  third_last_year_year?: string;
  third_last_year_rating?: string;
};

export type GPANominee = {
  id?: number;
  personal_email: string;
  name: string;
  relation: string;
  dob?: string;
  age?: string;
  contribution?: string;
};

export type NishchintNominee = {
  personal_email: string;
  name: string;
  relation: string;
  dob?: string;
  age?: number;
  contribution?: string;
};

export type MediclaimDependent = {
  id?: number;
  personal_email: string;
  name: string;
  relation: string;
  dob?: string;
  age?: number;
  gender?: string;
  birth_state?: string;
  address?: string;
  aadhar_number?: string;
  marital_status?: string;
};

export type FamilyMember = {
  id?: number;
  personal_email: string;
  name: string;
  relation: string;
  dob?: string;
  occupation?: string;
  marriage_anniversary?: string;
  mobile?: string;
};

export type EmergencyContact = {
  id?: number;
  personal_email: string;
  name: string;
  relation: string;
  contact_number: string;
  address?: string;
};

export type PFDetail = {
  id?: number;
  personal_email: string;
  uan_number?: string;
  pf_number?: string;
  eps_number?: string;
  nominee_name?: string;
  nominee_relation?: string;
  share_percentage?: string;
};

export type GratuityDetail = {
  id?: number;
  personal_email: string;
  nominee_name?: string;
  nominee_relation?: string;
  share_percentage?: string;
  nominee_age?: number;
  employee_age?: number;
  confirmation_date?: string;
};

export type SuperannuationDetail = {
  id?: number;
  personal_email: string;
  nominee_name?: string;
  nominee_relation?: string;
  share_percentage?: string;
  marriage_date?: string;
  confirmation_date?: string;
};

export type FormData = {
  personalDetails: PersonalDetails;
  professionalDetails: ProfessionalDetails;
  dependents?: Dependent[];
  education?: Education[];
  workHistory?: WorkHistory[];
  languageSkills?: LanguageSkill[];
  additionalInfo?: AdditionalInfo;
  performanceRating?: PerformanceRating;
  gpaNominees?: GPANominee[];
  nishchintNominee?: NishchintNominee;
  mediclaimDependents?: MediclaimDependent[];
  familyMembers?: FamilyMember[];
  emergencyContacts?: EmergencyContact[];
  pfDetails?: PFDetail[];
  gratuityDetails?: GratuityDetail[];
  superannuationDetails?: SuperannuationDetail[];
};