
import React from 'react';
import type { Service } from '../types';

interface ServiceCardProps {
  service: Service;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  return (
    <div className="bg-white p-8 rounded-lg shadow-lg text-center transform hover:-translate-y-2 transition-transform duration-300">
      <div className="text-blue-700 w-16 h-16 mx-auto mb-6 flex items-center justify-center">
        {service.icon}
      </div>
      <h3 className="text-2xl font-bold text-gray-800 mb-4">{service.title}</h3>
      <p className="text-gray-600 leading-relaxed">{service.description}</p>
    </div>
  );
};

export default ServiceCard;
