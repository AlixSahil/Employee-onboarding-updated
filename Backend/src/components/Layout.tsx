import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Users, Home, FileText, Settings, BarChart, LogOut } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path ? 'bg-blue-700 text-white' : 'text-gray-300 hover:bg-blue-700 hover:text-white';
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="hidden md:flex md:flex-shrink-0">
        <div className="flex flex-col w-64 bg-blue-800">
          <div className="flex items-center h-16 px-4">
            <h1 className="text-xl font-bold text-white">HR Portal</h1>
          </div>
          <div className="flex flex-col flex-1 overflow-y-auto">
            <nav className="flex-1 px-2 py-4 space-y-1">
              <Link to="/" className={`flex items-center px-4 py-2 text-sm font-medium rounded-md ${isActive('/')}`}>
                <Home className="mr-3 h-5 w-5" />
                Dashboard
              </Link>
              <Link to="/employees" className={`flex items-center px-4 py-2 text-sm font-medium rounded-md ${isActive('/employees')}`}>
                <Users className="mr-3 h-5 w-5" />
                Employees
              </Link>
              <Link to="/reports" className={`flex items-center px-4 py-2 text-sm font-medium rounded-md ${isActive('/reports')}`}>
                <BarChart className="mr-3 h-5 w-5" />
                Reports
              </Link>
              <Link to="/documents" className={`flex items-center px-4 py-2 text-sm font-medium rounded-md ${isActive('/documents')}`}>
                <FileText className="mr-3 h-5 w-5" />
                Documents
              </Link>
              <Link to="/settings" className={`flex items-center px-4 py-2 text-sm font-medium rounded-md ${isActive('/settings')}`}>
                <Settings className="mr-3 h-5 w-5" />
                Settings
              </Link>
            </nav>
            <div className="flex-shrink-0 flex border-t border-blue-700 p-4">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <img className="h-10 w-10 rounded-full" src="https://images.pexels.com/photos/5439153/pexels-photo-5439153.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Admin user" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-white">Admin User</p>
                  <div className="flex items-center text-xs text-gray-300 hover:text-white cursor-pointer">
                    <LogOut className="mr-1 h-4 w-4" />
                    <span>Logout</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile header */}
      <div className="md:hidden bg-blue-800 text-white w-full h-16 flex items-center px-4 fixed top-0 z-10">
        <h1 className="text-xl font-bold">HR Portal</h1>
      </div>

      {/* Main content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <main className="flex-1 relative overflow-y-auto focus:outline-none pt-16 md:pt-0 pb-6">
          <div className="px-4 sm:px-6 md:px-8 py-6">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default Layout;