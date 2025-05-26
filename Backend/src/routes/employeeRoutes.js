import express from 'express';
import { 
  getAllEmployees,
  getEmployeeByEmail,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  searchEmployees
} from '../controllers/employeeController.js';
import { validateEmployee } from '../middleware/validationMiddleware.js';

const router = express.Router();

// @route   GET /api/employees
// @desc    Get all employees
// @access  Public
router.get('/', getAllEmployees);

// @route   GET /api/employees/search
// @desc    Search employees by query
// @access  Public
router.get('/search', searchEmployees);

// @route   GET /api/employees/:email
// @desc    Get employee by personal email
// @access  Public
router.get('/:email', getEmployeeByEmail);

// @route   POST /api/employees
// @desc    Create a new employee
// @access  Public
router.post('/', validateEmployee, createEmployee);

// @route   PUT /api/employees/:email
// @desc    Update an employee
// @access  Public
router.put('/:email', validateEmployee, updateEmployee);

// @route   DELETE /api/employees/:email
// @desc    Delete an employee
// @access  Public
router.delete('/:email', deleteEmployee);

export default router;