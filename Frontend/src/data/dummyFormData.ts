import { FormData } from '../types/FormTypes';

export const dummyFormData: FormData = {
  personalDetails: {
    personal_email: 'john.doe@email.com',
    official_email: 'john.doe@company.com',
    joining_reference_id: 'JR2023001',
    poornata_id: 'P10001',
    employee_code: 'EMP001',
    prefix: 'Mr',
    first_name: 'John',
    middle_name: 'William',
    last_name: 'Doe',
    fathers_name: 'Robert Doe',
    mothers_name: 'Mary Doe',
    dob: '1990-05-15',
    gender: 'Male',
    marital_status: 'Married',
    blood_group: 'O+',
    nationality: 'Indian',
    birth_state: 'Maharashtra',
    birth_location: 'Mumbai',
    religion: 'Hindu',
    caste: 'General',
    permanent_address: '123, Oak Street, Mumbai - 400001',
    current_address: '456, Pine Avenue, Mumbai - 400002',
    quarter_no: 'Q-123',
    pan_no: 'ABCDE1234F',
    aadhar_no: '1234-5678-9012',
    bank_name: 'State Bank of India',
    bank_account_no: '1234567890',
    ifsc_code: 'SBIN0001234',
    mobile_no: '9876543210'
  },
  professionalDetails: {
    doj_unit: 'IT Services',
    doj_group: 'Software Development',
    department: 'Engineering',
    designation: 'Senior Software Engineer',
    job_band: 'B2',
    loi_issue_date: '2023-01-15',
    new_position: 'Tech Lead',
    personal_email: 'john.doe@email.com'
  },
  dependents: [
    {
      id: 1,
      personal_email: 'john.doe@email.com',
      dependent_type: 'SPOUSE',
      name: 'Jane Doe',
      relation: 'Spouse',
      dob: '1992-08-20',
      age: 31,
      share_percentage: 100,
      address: '456, Pine Avenue, Mumbai - 400002',
      aadhar_no: '9876-5432-1098',
      marital_status: 'Married',
      occupation: 'Teacher',
      mobile_no: '9876543211',
      is_primary: 'Y',
      anniversary_date: '2016-11-25'
    },
    {
      id: 2,
      personal_email: 'john.doe@email.com',
      dependent_type: 'FAMILY',
      name: 'James Doe',
      relation: 'Son',
      dob: '2018-03-10',
      age: 5,
      share_percentage: 0,
      address: '456, Pine Avenue, Mumbai - 400002',
      aadhar_no: '1234-5678-9012',
      marital_status: 'Single',
      occupation: 'Student',
      mobile_no: '',
      is_primary: 'N',
      anniversary_date: ''
  ],

  education: [
    {
      id: 1,
      personal_email: 'john.doe@email.com',
      qualification: 'Graduate',
      institution: 'Mumbai University',
      major: 'Computer Science',
      completion_date: '2012-05-30',
      percentage: 85,
      state: 'Maharashtra'
    },
    {
      id: 2,
      personal_email: 'john.doe@email.com',
      qualification: 'Post Graduate',
      institution: 'Pune University',
      major: 'Software Engineering',
      completion_date: '2014-05-30',
      percentage: 88,
      state: 'Maharashtra'
    }
  ],
  workHistory: [
    {
      id: 1,
      personal_email: 'john.doe@email.com',
      is_in_group: 'N',
      organization: 'Tech Solutions Ltd',
      job_title: 'Software Engineer',
      start_date: '2014-06-01',
      end_date: '2018-12-31',
      location: 'Mumbai',
      ctc: 1200000
    },
    {
      id: 2,
      personal_email: 'john.doe@email.com',
      is_in_group: 'N',
      organization: 'Digital Innovations Inc',
      job_title: 'Senior Developer',
      start_date: '2019-01-01',
      end_date: '2022-12-31',
      location: 'Mumbai',
      ctc: 2400000
    }
  ],
  languageSkills: [
    {
      id: 1,
      personal_email: 'john.doe@email.com',
      language: 'English',
      speak_level: 'Fluent',
      read_level: 'Fluent',
      write_level: 'Fluent'
    },
    {
      id: 2,
      personal_email: 'john.doe@email.com',
      language: 'Hindi',
      speak_level: 'Fluent',
      read_level: 'Fluent',
      write_level: 'Fluent'
    }
  ],
  additionalInfo: {
    personal_email: 'john.doe@email.com',
    hobbies: 'Reading, Photography, Travel',
    total_experience: '8 years',
    last_promotion_date: '2022-04-01',
    performance_ratings: 'Excellent',
    special_abilities: 'Team Management, Problem Solving'
  },
  performanceRating: {
    last_year: {
      year: '2022',
      rating: 'A'
    },
    second_last_year: {
      year: '2021',
      rating: 'A'
    },
    third_last_year: {
      year: '2020',
      rating: 'B+'
    }
  },
  gpaNominees: [
    {
      id: '1',
      name: 'Jane Doe',
      relation: 'Spouse',
      percentage: '100'
    }
  ],
  nishchintNominee: {
    name: 'Jane Doe',
    relation: 'Spouse',
    dob: '1992-08-20',
    age: '31',
    contribution: '100'
  },
  mediclaimDependents: [
    {
      id: '1',
      name: 'Jane Doe',
      relation: 'Spouse',
      dob: '1992-08-20',
      age: '31'
    },
    {
      id: '2',
      name: 'James Doe',
      relation: 'Son',
      dob: '2018-03-10',
      age: '5'
    }
  ],
  spouse: {
    name: 'Jane Doe',
    dob: '1992-08-20',
    occupation: 'Teacher',
    marriage_anniversary: '2016-11-25',
    mobile: '9876543211'
  },
  familyMembers: [
    {
      id: '1',
      name: 'Robert Doe',
      relation: 'Father',
      dob: '1960-03-15',
      occupation: 'Retired'
    },
    {
      id: '2',
      name: 'Mary Doe',
      relation: 'Mother',
      dob: '1965-07-20',
      occupation: 'Homemaker'
    }
  ],
  emergencyContacts: [
    {
      id: '1',
      name: 'Jane Doe',
      relation: 'Spouse',
      mobile: '9876543211',
      address: '456, Pine Avenue, Mumbai - 400002'
    },
    {
      id: '2',
      name: 'Robert Doe',
      relation: 'Father',
      mobile: '9876543212',
      address: '789, Maple Road, Mumbai - 400003'
    }
  ],
  pfDetails: [
    {
      id: '1',
      name: 'Jane Doe',
      relation: 'Spouse',
      percentage: '100'
    }
  ],
  gratuityDetails: [
    {
      id: '1',
      name: 'Jane Doe',
      relation: 'Spouse',
      percentage: '100'
    }
  ],
  superannuationDetails: [
    {
      id: '1',
      name: 'Jane Doe',
      relation: 'Spouse',
      percentage: '100'
    }
  ]
};