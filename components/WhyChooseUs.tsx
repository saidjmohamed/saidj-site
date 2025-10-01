
import React from 'react';
import type { Feature } from '../types';
import FeatureCard from './FeatureCard';
import { ExperienceIcon, CommitmentIcon, ResultsIcon, ConfidentialityIcon } from './icons';

const WhyChooseUs: React.FC = () => {
  const features: Feature[] = [
    {
      icon: <ExperienceIcon />,
      title: 'خبرة واسعة',
      description: 'سنوات من الممارسة القانونية الناجحة في مختلف المحاكم الجزائرية.',
    },
    {
      icon: <CommitmentIcon />,
      title: 'التزام بالعميل',
      description: 'نضع مصلحة العميل أولاً ونسعى لتحقيق أهدافه بكل تفانٍ.',
    },
    {
      icon: <ResultsIcon />,
      title: 'نتائج مثبتة',
      description: 'سجل حافل بالنجاح في القضايا المعقدة وتحقيق نتائج مرضية للموكلين.',
    },
    {
      icon: <ConfidentialityIcon />,
      title: 'سرية تامة',
      description: 'نضمن السرية المطلقة لجميع معلومات الموكلين وقضاياهم.',
    },
  ];

  return (
    <section id="why-us" className="py-20 bg-white">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">لماذا تختارنا؟</h2>
        <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
          نحن لا نقدم خدمات قانونية فحسب، بل نبني علاقات ثقة مع عملائنا.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
