import React, { useState } from 'react';
import { FormProvider } from './context/FormContext';
import FormContainer from './components/FormContainer';
import { ChevronRight } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl">
        <div className="text-center mb-8 animate-fade-in">
          <img src="/hindalco-logo.png" alt="Hindalco Logo" className="mx-auto mb-4 h-24" />
          {/* <h1 className="text-3xl md:text-4xl font-bold text-blue-800 mb-2">Complete your Employee Onboarding in a few simple steps</h1> */}
          <p className="text-gray-600 text-lg">Complete your Employee Onboarding in a few simple steps.</p>
        </div>
        
        <div className="bg-white shadow-lg rounded-xl overflow-hidden">
          <div className="p-1 bg-gradient-to-r from-blue-500 to-indigo-600"></div>
          <FormProvider>
            <FormContainer />
          </FormProvider>
        </div>
        
        <div className="flex justify-center mt-6">
          <a href="#" className="flex items-center text-blue-600 hover:text-blue-800 transition-colors">
            <span className="mr-2">Need help? Contact support</span>
            <ChevronRight size={16} />
          </a>
        </div>
      </div>
    </div>
  );
}

export default App;