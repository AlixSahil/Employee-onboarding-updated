// Main entity types based on DB schema

export interface PersonalDetails {
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
}

export interface ProfessionalDetails {
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
}

export interface GPANominee {
  id?: number;
  personal_email: string;
  name: string;
  relation: string;
  dob?: string;
  age?: string;
  contribution?: string;
}

export interface NischchintNominee {
  personal_email: string;
  name: string;
  relation: string;
  dob?: string;
  age?: number;
  contribution?: string;
}

export interface MediclaimDependent {
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
}

export interface FamilyMember {
  id?: number;
  personal_email: string;
  name: string;
  relation: string;
  dob?: string;
  occupation?: string;
  marriage_anniversary?: string;
  mobile?: string;
}

export interface EmergencyContact {
  id?: number;
  personal_email: string;
  name: string;
  relation: string;
  contact_number: string;
  address?: string;
}

export interface Education {
  id?: number;
  personal_email: string;
  degree: string;
  institution: string;
  specialization?: string;
  year_of_passing?: string;
  percentage?: string;
  state?: string;
}

export interface WorkHistory {
  id?: number;
  personal_email: string;
  company_name: string;
  designation: string;
  from_date?: string;
  to_date?: string;
  in_group?: string;
  state?: string;
  ending_ctc?: string;
}

export interface LanguageSkill {
  id?: number;
  personal_email: string;
  language: string;
  speaking?: string;
  reading?: string;
  writing?: string;
}

export interface AdditionalInfo {
  personal_email: string;
  current_unit_name?: string;
  last_job_change_date?: string;
  hobbies?: string;
  total_experience?: string;
  last_promotion_date?: string;
  attended_dac?: string;
  dac_date?: string;
  special_abilities?: string;
}

export interface PerformanceRating {
  personal_email: string;
  last_year_year?: string;
  last_year_rating?: string;
  second_last_year_year?: string;
  second_last_year_rating?: string;
  third_last_year_year?: string;
  third_last_year_rating?: string;
}

export interface PFDetails {
  id?: number;
  personal_email: string;
  uan_number?: string;
  pf_number?: string;
  eps_number?: string;
  nominee_name?: string;
  nominee_relation?: string;
  share_percentage?: string;
}

export interface GratuityDetails {
  id?: number;
  personal_email: string;
  nominee_name?: string;
  nominee_relation?: string;
  share_percentage?: string;
  nominee_age?: number;
  employee_age?: number;
  confirmation_date?: string;
}

export interface SuperannuationDetails {
  id?: number;
  personal_email: string;
  nominee_name?: string;
  nominee_relation?: string;
  share_percentage?: string;
  marriage_date?: string;
  confirmation_date?: string;
}

// Complete employee profile type
export interface EmployeeProfile {
  personalDetails: PersonalDetails;
  professionalDetails: ProfessionalDetails;
  gpaNominees?: GPANominee[];
  nischchintNominee?: NischchintNominee;
  mediclaimDependents?: MediclaimDependent[];
  familyMembers?: FamilyMember[];
  emergencyContacts?: EmergencyContact[];
  education?: Education[];
  workHistory?: WorkHistory[];
  languageSkills?: LanguageSkill[];
  additionalInfo?: AdditionalInfo;
  performanceRating?: PerformanceRating;
  pfDetails?: PFDetails[];
  gratuityDetails?: GratuityDetails[];
  superannuationDetails?: SuperannuationDetails[];
}