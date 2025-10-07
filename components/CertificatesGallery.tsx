import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../translations';

interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  image: string;
  description: string;
  type: 'degree' | 'certificate' | 'award' | 'license';
}

const CertificatesGallery: React.FC = () => {
  const { language } = useLanguage();
  const t = translations[language as keyof typeof translations];
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Sample certificates data (replace with real data)
  const certificates: Certificate[] = [
    {
      id: '1',
      title: 'ماجستير في القانون العام',
      issuer: 'جامعة الجزائر',
      date: '2015',
      image: '/images/certificates/master-degree.jpg',
      description: 'درجة الماجستير في القانون العام مع مرتبة الشرف الأولى',
      type: 'degree'
    },
    {
      id: '2',
      title: 'ترخيص مزاولة المحاماة',
      issuer: 'وزارة العدل الجزائرية',
      date: '2016',
      image: '/images/certificates/law-license.jpg',
      description: 'ترخيص رسمي لمزاولة مهنة المحاماة في الجزائر',
      type: 'license'
    },
    {
      id: '3',
      title: 'شهادة التميز في القانون التجاري',
      issuer: 'نقابة المحامين',
      date: '2018',
      image: '/images/certificates/commercial-law.jpg',
      description: 'شهادة تقدير للتميز في مجال القانون التجاري والشركات',
      type: 'award'
    },
    {
      id: '4',
      title: 'دبلوم التحكيم الدولي',
      issuer: 'المعهد الدولي للتحكيم',
      date: '2019',
      image: '/images/certificates/arbitration.jpg',
      description: 'دبلوم متخصص في التحكيم التجاري الدولي',
      type: 'certificate'
    },
    {
      id: '5',
      title: 'جائزة أفضل محامي شاب',
      issuer: 'اتحاد المحامين العرب',
      date: '2020',
      image: '/images/certificates/best-lawyer-award.jpg',
      description: 'جائزة تقديرية لأفضل محامي شاب على مستوى المنطقة',
      type: 'award'
    },
    {
      id: '6',
      title: 'شهادة القانون الرقمي',
      issuer: 'معهد التكنولوجيا القانونية',
      date: '2021',
      image: '/images/certificates/digital-law.jpg',
      description: 'شهادة متخصصة في قانون التكنولوجيا والأمن السيبراني',
      type: 'certificate'
    }
  ];

  // Auto-play functionality
  useEffect(() => {
    if (isAutoPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % certificates.length);
      }, 4000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isAutoPlaying, certificates.length]);

  // Handle manual navigation
  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const nextSlide = () => {
    goToSlide((currentSlide + 1) % certificates.length);
  };

  const prevSlide = () => {
    goToSlide(currentSlide === 0 ? certificates.length - 1 : currentSlide - 1);
  };

  // Get certificate type icon
  const getCertificateIcon = (type: Certificate['type']) => {
    switch (type) {
      case 'degree':
        return (
          <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
          </svg>
        );
      case 'certificate':
        return (
          <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V4a2 2 0 00-2-2H6zm1 2a1 1 0 000 2h6a1 1 0 100-2H7zm6 7a1 1 0 011 1v3a1 1 0 11-2 0v-3a1 1 0 011-1zm-3 3a1 1 0 100 2h.01a1 1 0 100-2H10zm-4 1a1 1 0 011-1h.01a1 1 0 110 2H7a1 1 0 01-1-1zm1-4a1 1 0 100 2h.01a1 1 0 100-2H7zm2 0a1 1 0 100 2h.01a1 1 0 100-2H9zm2 0a1 1 0 100 2h.01a1 1 0 100-2H11z" clipRule="evenodd" />
          </svg>
        );
      case 'award':
        return (
          <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        );
      case 'license':
        return (
          <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 2L3 7v11c0 5.55 3.84 4.99 9 4.99s9 .56 9-4.99V7l-7-5zm0 1.99L15.99 8 10 12.01 4.01 8 10 3.99zm0 10.02L6 10.5v4.25c0 2.52 2.91 3.11 6 2.68V10.5l-2 1.51z" clipRule="evenodd" />
          </svg>
        );
    }
  };

  // Get certificate type color
  const getCertificateColor = (type: Certificate['type']) => {
    switch (type) {
      case 'degree': return 'text-blue-600 bg-blue-100';
      case 'certificate': return 'text-green-600 bg-green-100';
      case 'award': return 'text-yellow-600 bg-yellow-100';
      case 'license': return 'text-purple-600 bg-purple-100';
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            الشهادات والجوائز
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            مجموعة من الشهادات المهنية والجوائز التي تؤكد على الخبرة والتميز في مجال المحاماة
          </p>
        </div>

        {/* Main Carousel */}
        <div className="relative max-w-6xl mx-auto mb-12">
          {/* Carousel Container */}
          <div className="relative overflow-hidden rounded-2xl shadow-2xl bg-white">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {certificates.map((cert, index) => (
                <div key={cert.id} className="w-full flex-shrink-0">
                  <div className="flex flex-col lg:flex-row h-96 lg:h-80">
                    {/* Image Section */}
                    <div className="lg:w-1/2 relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-teal-500/20 to-blue-500/20" />
                      <img
                        src={cert.image}
                        alt={cert.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"><rect width="400" height="300" fill="%23f3f4f6"/><text x="200" y="150" text-anchor="middle" fill="%236b7280" font-size="16">${cert.title}</text></svg>`;
                        }}
                      />
                      
                      {/* Certificate Type Badge */}
                      <div className={`
                        absolute top-4 right-4 px-3 py-2 rounded-full
                        ${getCertificateColor(cert.type)}
                        flex items-center gap-2 font-medium text-sm
                      `}>
                        {getCertificateIcon(cert.type)}
                        <span className="hidden sm:inline">
                          {cert.type === 'degree' && 'شهادة أكاديمية'}
                          {cert.type === 'certificate' && 'شهادة مهنية'}
                          {cert.type === 'award' && 'جائزة'}
                          {cert.type === 'license' && 'ترخيص'}
                        </span>
                      </div>
                    </div>
                    
                    {/* Content Section */}
                    <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
                      <h3 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-4 leading-tight">
                        {cert.title}
                      </h3>
                      
                      <div className="flex items-center gap-4 mb-4">
                        <div className="flex items-center gap-2 text-gray-600">
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span className="font-medium">{cert.issuer}</span>
                        </div>
                        
                        <div className="flex items-center gap-2 text-gray-500">
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                          </svg>
                          <span>{cert.date}</span>
                        </div>
                      </div>
                      
                      <p className="text-gray-600 text-lg leading-relaxed mb-6">
                        {cert.description}
                      </p>
                      
                      <button
                        onClick={() => setSelectedCertificate(cert)}
                        className="
                          self-start px-6 py-3 bg-gradient-to-r from-teal-600 to-blue-600
                          text-white rounded-lg hover:from-teal-700 hover:to-blue-700
                          transition-all transform hover:scale-105 flex items-center gap-2
                        "
                      >
                        <span>عرض التفاصيل</span>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="
              absolute left-4 top-1/2 -translate-y-1/2 z-10
              w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg
              flex items-center justify-center text-gray-700 hover:bg-white
              transition-all transform hover:scale-110
            "
            aria-label="الشهادة السابقة"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button
            onClick={nextSlide}
            className="
              absolute right-4 top-1/2 -translate-y-1/2 z-10
              w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg
              flex items-center justify-center text-gray-700 hover:bg-white
              transition-all transform hover:scale-110
            "
            aria-label="الشهادة التالية"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Auto-play Toggle */}
          <button
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            className={`
              absolute bottom-4 right-4 z-10
              w-10 h-10 rounded-full shadow-lg backdrop-blur-sm
              flex items-center justify-center transition-all transform hover:scale-105
              ${isAutoPlaying ? 'bg-green-500 text-white' : 'bg-white/90 text-gray-700'}
            `}
            aria-label={isAutoPlaying ? 'إيقاف التشغيل التلقائي' : 'تشغيل تلقائي'}
          >
            {isAutoPlaying ? (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
              </svg>
            )}
          </button>
        </div>

        {/* Slide Indicators */}
        <div className="flex justify-center items-center gap-3 mb-12">
          {certificates.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`
                transition-all duration-300 rounded-full
                ${index === currentSlide 
                  ? 'w-8 h-3 bg-gradient-to-r from-teal-500 to-blue-500' 
                  : 'w-3 h-3 bg-gray-300 hover:bg-gray-400'
                }
              `}
              aria-label={`الانتقال إلى الشهادة ${index + 1}`}
            />
          ))}
        </div>

        {/* Certificates Grid Preview */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {certificates.map((cert, index) => (
            <button
              key={cert.id}
              onClick={() => goToSlide(index)}
              className={`
                relative group overflow-hidden rounded-lg transition-all duration-300
                ${index === currentSlide 
                  ? 'ring-4 ring-teal-500 shadow-lg scale-105' 
                  : 'hover:shadow-md hover:scale-102'
                }
              `}
            >
              <div className="aspect-square relative">
                <img
                  src={cert.image}
                  alt={cert.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><rect width="200" height="200" fill="%23f3f4f6"/><text x="100" y="100" text-anchor="middle" fill="%236b7280" font-size="12">${cert.title}</text></svg>`;
                  }}
                />
                
                {/* Overlay */}
                <div className="
                  absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100
                  transition-opacity duration-300 flex items-center justify-center
                ">
                  <div className={`p-2 rounded-full ${getCertificateColor(cert.type)}`}>
                    {getCertificateIcon(cert.type)}
                  </div>
                </div>
                
                {/* Current indicator */}
                {index === currentSlide && (
                  <div className="absolute inset-0 bg-gradient-to-t from-teal-500/20 to-transparent" />
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Certificate Detail Modal */}
      {selectedCertificate && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="
            relative w-full max-w-2xl max-h-[90vh] overflow-y-auto
            bg-white rounded-2xl shadow-2xl animate-scale-in
          ">
            {/* Modal Header */}
            <div className="sticky top-0 bg-gradient-to-r from-teal-600 to-blue-600 text-white p-6 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold">{selectedCertificate.title}</h3>
                <button
                  onClick={() => setSelectedCertificate(null)}
                  className="p-2 hover:bg-white/20 rounded-full transition-colors"
                  aria-label="إغلاق"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            
            {/* Modal Content */}
            <div className="p-6">
              {/* Certificate Image */}
              <div className="mb-6 rounded-lg overflow-hidden shadow-lg">
                <img
                  src={selectedCertificate.image}
                  alt={selectedCertificate.title}
                  className="w-full h-64 object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"><rect width="400" height="300" fill="%23f3f4f6"/><text x="200" y="150" text-anchor="middle" fill="%236b7280" font-size="16">${selectedCertificate.title}</text></svg>`;
                  }}
                />
              </div>
              
              {/* Certificate Details */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${getCertificateColor(selectedCertificate.type)}`}>
                    {getCertificateIcon(selectedCertificate.type)}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800">نوع الشهادة</div>
                    <div className="text-gray-600">
                      {selectedCertificate.type === 'degree' && 'شهادة أكاديمية'}
                      {selectedCertificate.type === 'certificate' && 'شهادة مهنية'}
                      {selectedCertificate.type === 'award' && 'جائزة'}
                      {selectedCertificate.type === 'license' && 'ترخيص'}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-gray-100 text-gray-600">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800">الجهة المانحة</div>
                    <div className="text-gray-600">{selectedCertificate.issuer}</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-gray-100 text-gray-600">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800">تاريخ الحصول</div>
                    <div className="text-gray-600">{selectedCertificate.date}</div>
                  </div>
                </div>
              </div>
              
              {/* Description */}
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-2">الوصف</h4>
                <p className="text-gray-600 leading-relaxed">{selectedCertificate.description}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default CertificatesGallery;