
import React from 'react';
import type { Feature } from '../types';

interface FeatureCardProps {
  feature: Feature;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ feature }) => {
  return (
    <div className="bg-gray-50 p-6 rounded-lg text-center border border-gray-200">
      <div className="text-yellow-500 w-12 h-12 mx-auto mb-4 flex items-center justify-center">
        {feature.icon}
      </div>
      <h3 className="text-xl font-bold text-gray-800 mb-2">{feature.title}</h3>
      <p className="text-gray-600">{feature.description}</p>
    </div>
  );
};

export default FeatureCard;
