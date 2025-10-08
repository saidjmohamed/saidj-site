
import React from 'react';
import type { Service } from '../types';
import ServiceCard from './ServiceCard';
import { GavelIcon, FamilyIcon, BriefcaseIcon, BuildingIcon, HomeIcon, CompensationIcon } from './icons';


const Services: React.FC = () => {
  const services: Service[] = [
    {
      icon: <GavelIcon />,
      title: 'القانون الجنائي',
      description: 'دفاع وتمثيل في جميع القضايا الجنائية من الجنح إلى الجنايات.',
    },
    {
      icon: <FamilyIcon />,
      title: 'قانون الأسرة',
      description: 'قضايا الزواج، الطلاق، الحضانة، النفقة، والميراث.',
    },
    {
      icon: <BriefcaseIcon />,
      title: 'القانون التجاري',
      description: 'تأسيس الشركات، العقود التجارية، قضايا الإفلاس والنزاعات التجارية.',
    },
    {
      icon: <BuildingIcon />,
      title: 'القانون الإداري',
      description: 'الطعون في القرارات الإدارية، قضايا الوظيفة العامة والعقود الإدارية.',
    },
    {
      icon: <HomeIcon />,
      title: 'القانون العقاري',
      description: 'نزاعات الملكية، عقود البيع والشراء، وكل ما يتعلق بالعقارات.',
    },
    {
      icon: <CompensationIcon />,
      title: 'قضايا التعويضات',
      description: 'المطالبة بالتعويضات عن حوادث المرور، الأخطاء الطبية، وإصابات العمل.',
    },
  ];

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">مجالات الخبرة</h2>
        <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
          أقدم مجموعة واسعة من الخدمات القانونية لتلبية احتياجات الأفراد والشركات على حد سواء.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
