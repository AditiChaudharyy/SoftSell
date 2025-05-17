import React from 'react';
import { Layers } from 'lucide-react';

const Logo = () => {
  return (
    <div className="flex items-center space-x-2">
      <Layers className="w-8 h-8 text-blue-600" />
      <span className="text-2xl font-bold text-gray-900 dark:text-white">
        Soft<span className="text-blue-600">Sell</span> India
      </span>
    </div>
  );
};

export default Logo;