import React from 'react';
import { ShieldAlert } from 'lucide-react';

interface HeaderProps {
  isBackendConnected: boolean;
}

const Header: React.FC<HeaderProps> = ({ isBackendConnected }) => {
  return (
    <header className="bg-gradient-to-r from-indigo-700 to-indigo-900 text-white p-4 md:p-6">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center mb-4 md:mb-0">
          <ShieldAlert className="w-8 h-8 mr-3 text-teal-300" />
          <h1 className="text-2xl md:text-3xl font-bold">SMS Spam Detective</h1>
        </div>
        <div className="flex items-center">
          <div className="flex items-center">
            <div 
              className={`w-3 h-3 rounded-full mr-2 ${isBackendConnected ? 'bg-green-400' : 'bg-red-500'}`}
            ></div>
            <span className="text-sm">
              {isBackendConnected ? 'API Connected' : 'API Disconnected'}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;