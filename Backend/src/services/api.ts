import axios from 'axios';
import { EmployeeProfile, PersonalDetails } from '../types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Employee API endpoints
export const employeeAPI = {
  // Get all employees
  getAll: async () => {
    const response = await api.get('/employees');
    return response.data;
  },

  // Get employee by personal_email
  getById: async (personalEmail: string): Promise<EmployeeProfile> => {
    const response = await api.get(`/employees/${personalEmail}`);
    return response.data;
  },

  // Create new employee
  create: async (employeeData: EmployeeProfile) => {
    const response = await api.post('/employees', employeeData);
    return response.data;
  },

  // Update employee
  update: async (personalEmail: string, employeeData: EmployeeProfile) => {
    const response = await api.put(`/employees/${personalEmail}`, employeeData);
    return response.data;
  },

  // Delete employee
  delete: async (personalEmail: string) => {
    const response = await api.delete(`/employees/${personalEmail}`);
    return response.data;
  },

  // Search employees by name, email, ID, etc.
  search: async (query: string) => {
    const response = await api.get(`/employees/search?q=${query}`);
    return response.data;
  },

  // Generate POSH document
  generatePoshDocument: async (personalEmail: string) => {
    const response = await api.get(`/employees/${personalEmail}/generate-posh`);
    return response.data;
  }
};

export default api;