import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Plus, ChevronRight, UserRound } from 'lucide-react';
import { employeeAPI } from '../services/api';
import { PersonalDetails } from '../types';

const Dashboard: React.FC = () => {
  const [employees, setEmployees] = useState<PersonalDetails[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        setIsLoading(true);
        const data = await employeeAPI.getAll();
        setEmployees(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching employees:', err);
        setError('Failed to load employees. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  const filteredEmployees = employees.filter((employee) => {
    const fullName = `${employee.first_name} ${employee.middle_name || ''} ${employee.last_name}`.toLowerCase();
    return (
      fullName.includes(searchQuery.toLowerCase()) ||
      employee.personal_email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.poornata_id?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.employee_code?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Employee Dashboard</h1>
        <p className="mt-1 text-sm text-gray-600">
          Manage employee information and documentation
        </p>
      </div>

      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Search employees by name, email, or ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Link
          to="/employees/new"
          className="btn btn-primary flex items-center justify-center space-x-2"
        >
          <Plus className="h-5 w-5" />
          <span>Add Employee</span>
        </Link>
      </div>

      {isLoading ? (
        <div className="card flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700"></div>
        </div>
      ) : error ? (
        <div className="card bg-red-50 text-red-700 p-4">
          <p>{error}</p>
          <button 
            className="mt-2 text-sm font-medium underline"
            onClick={() => window.location.reload()}
          >
            Try again
          </button>
        </div>
      ) : (
        <div className="card">
          <h2 className="text-lg font-semibold mb-4">Employee Directory</h2>
          {filteredEmployees.length === 0 ? (
            <div className="text-center py-8">
              <UserRound className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No employees found</h3>
              <p className="mt-1 text-sm text-gray-500">
                {searchQuery 
                  ? "No employees match your search criteria." 
                  : "Get started by adding a new employee."}
              </p>
              {!searchQuery && (
                <div className="mt-6">
                  <Link
                    to="/employees/new"
                    className="btn btn-primary inline-flex items-center"
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    New Employee
                  </Link>
                </div>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Employee ID
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Department
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredEmployees.map((employee) => (
                    <tr key={employee.personal_email} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                            <span className="text-gray-500 font-medium">
                              {`${employee.first_name.charAt(0)}${employee.last_name.charAt(0)}`}
                            </span>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {`${employee.first_name} ${employee.middle_name || ''} ${employee.last_name}`}
                            </div>
                            <div className="text-sm text-gray-500">{employee.personal_email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{employee.personal_email}</div>
                        <div className="text-sm text-gray-500">{employee.official_email}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{employee.poornata_id || '-'}</div>
                        <div className="text-sm text-gray-500">{employee.employee_code || '-'}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        -
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Link 
                          to={`/employees/${employee.personal_email}`}
                          className="text-blue-600 hover:text-blue-900 flex items-center justify-end"
                        >
                          View
                          <ChevronRight className="ml-1 h-4 w-4" />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div className="card">
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Employee Statistics
          </h3>
          <div className="text-3xl font-bold text-blue-600 mb-1">
            {employees.length}
          </div>
          <p className="text-sm text-gray-500">Total employees registered</p>
        </div>
        
        <div className="card">
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Recent Activities
          </h3>
          <p className="text-sm text-gray-500">
            No recent activities to display
          </p>
        </div>
        
        <div className="card">
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Quick Actions
          </h3>
          <div className="space-y-2">
            <Link 
              to="/employees/new" 
              className="block text-sm text-blue-600 hover:text-blue-800 hover:underline"
            >
              Add New Employee
            </Link>
            <Link 
              to="/reports" 
              className="block text-sm text-blue-600 hover:text-blue-800 hover:underline"
            >
              Generate Reports
            </Link>
            <Link 
              to="/documents" 
              className="block text-sm text-blue-600 hover:text-blue-800 hover:underline"
            >
              Manage Documents
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;