import React, { useState, useRef } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../translations';

interface AppointmentData {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  service: string;
  message: string;
}

interface AppointmentBookingProps {
  isOpen: boolean;
  onClose: () => void;
}

const AppointmentBooking: React.FC<AppointmentBookingProps> = ({ isOpen, onClose }) => {
  const { language } = useLanguage();
  const t = translations[language as keyof typeof translations];
  const formRef = useRef<HTMLFormElement>(null);
  
  const [formData, setFormData] = useState<AppointmentData>({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    service: '',
    message: ''
  });
  
  const [errors, setErrors] = useState<Partial<AppointmentData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [step, setStep] = useState(1);

  // Legal services options
  const services = [
    { value: 'consultation', label: 'استشارة قانونية عامة' },
    { value: 'civil', label: 'القانون المدني' },
    { value: 'commercial', label: 'القانون التجاري' },
    { value: 'criminal', label: 'القانون الجنائي' },
    { value: 'family', label: 'قانون الأسرة' },
    { value: 'labor', label: 'قانون العمل' },
    { value: 'administrative', label: 'القانون الإداري' },
    { value: 'real-estate', label: 'قانون العقارات' },
    { value: 'other', label: 'أخرى' }
  ];

  // Available time slots
  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00'
  ];

  // Form validation
  const validateForm = (): boolean => {
    const newErrors: Partial<AppointmentData> = {};
    
    if (!formData.name.trim()) newErrors.name = 'الاسم مطلوب';
    if (!formData.email.trim()) {
      newErrors.email = 'البريد الإلكتروني مطلوب';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'البريد الإلكتروني غير صحيح';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'رقم الهاتف مطلوب';
    } else if (!/^[0-9+\-\s()]+$/.test(formData.phone)) {
      newErrors.phone = 'رقم الهاتف غير صحيح';
    }
    if (!formData.date) newErrors.date = 'التاريخ مطلوب';
    if (!formData.time) newErrors.time = 'الوقت مطلوب';
    if (!formData.service) newErrors.service = 'نوع الخدمة مطلوب';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Here you would typically send the data to your backend
      console.log('Appointment data:', formData);
      
      setSubmitStatus('success');
      setTimeout(() => {
        onClose();
        resetForm();
      }, 2000);
      
    } catch (error) {
      console.error('Error submitting appointment:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      date: '',
      time: '',
      service: '',
      message: ''
    });
    setErrors({});
    setSubmitStatus('idle');
    setStep(1);
  };

  // Handle input changes
  const handleInputChange = (field: keyof AppointmentData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  // Get minimum date (today)
  const getMinDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  // Check if date is weekend (Friday or Saturday in Algeria)
  const isWeekend = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDay();
    return day === 5 || day === 6; // Friday or Saturday
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="
        relative w-full max-w-2xl max-h-[90vh] overflow-y-auto
        bg-white rounded-2xl shadow-2xl
        animate-scale-in
      ">
        {/* Header */}
        <div className="
          sticky top-0 bg-gradient-to-r from-teal-600 to-blue-600
          text-white p-6 rounded-t-2xl
        ">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">حجز موعد استشارة</h2>
              <p className="text-teal-100">احجز استشارة قانونية مع الأستاذ سعيد محمد</p>
            </div>
            <button
              onClick={onClose}
              className="
                p-2 hover:bg-white/20 rounded-full transition-colors
                text-white hover:text-gray-200
              "
              aria-label="إغلاق"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          {/* Progress Steps */}
          <div className="flex items-center justify-center mt-6 space-x-4 rtl:space-x-reverse">
            {[1, 2, 3].map((stepNumber) => (
              <div key={stepNumber} className="flex items-center">
                <div className={`
                  w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold
                  transition-all duration-300
                  ${step >= stepNumber 
                    ? 'bg-white text-teal-600' 
                    : 'bg-teal-500 text-white border-2 border-white/30'
                  }
                `}>
                  {step > stepNumber ? (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    stepNumber
                  )}
                </div>
                {stepNumber < 3 && (
                  <div className={`
                    w-12 h-1 mx-2 rounded transition-colors
                    ${step > stepNumber ? 'bg-white' : 'bg-white/30'}
                  `} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form Content */}
        <form ref={formRef} onSubmit={handleSubmit} className="p-6">
          {/* Step 1: Personal Information */}
          {step === 1 && (
            <div className="space-y-6 animate-fade-in-up">
              <h3 className="text-xl font-bold text-gray-800 mb-4">المعلومات الشخصية</h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    الاسم الكامل *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className={`
                      w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500
                      transition-all duration-300 bg-gray-50 focus:bg-white
                      ${errors.name ? 'border-red-500' : 'border-gray-300'}
                    `}
                    placeholder="أدخل اسمك الكامل"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1 animate-fade-in">{errors.name}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    البريد الإلكتروني *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className={`
                      w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500
                      transition-all duration-300 bg-gray-50 focus:bg-white
                      ${errors.email ? 'border-red-500' : 'border-gray-300'}
                    `}
                    placeholder="example@email.com"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1 animate-fade-in">{errors.email}</p>
                  )}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  رقم الهاتف *
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className={`
                    w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500
                    transition-all duration-300 bg-gray-50 focus:bg-white
                    ${errors.phone ? 'border-red-500' : 'border-gray-300'}
                  `}
                  placeholder="+213 XXX XXX XXX"
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1 animate-fade-in">{errors.phone}</p>
                )}
              </div>
            </div>
          )}

          {/* Step 2: Appointment Details */}
          {step === 2 && (
            <div className="space-y-6 animate-fade-in-up">
              <h3 className="text-xl font-bold text-gray-800 mb-4">تفاصيل الموعد</h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    التاريخ *
                  </label>
                  <input
                    type="date"
                    value={formData.date}
                    min={getMinDate()}
                    onChange={(e) => handleInputChange('date', e.target.value)}
                    className={`
                      w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500
                      transition-all duration-300 bg-gray-50 focus:bg-white
                      ${errors.date ? 'border-red-500' : 'border-gray-300'}
                    `}
                  />
                  {errors.date && (
                    <p className="text-red-500 text-sm mt-1 animate-fade-in">{errors.date}</p>
                  )}
                  {formData.date && isWeekend(formData.date) && (
                    <p className="text-amber-600 text-sm mt-1 animate-fade-in">
                      ⚠️ المكتب مغلق في عطلة نهاية الأسبوع
                    </p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    الوقت *
                  </label>
                  <select
                    value={formData.time}
                    onChange={(e) => handleInputChange('time', e.target.value)}
                    className={`
                      w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500
                      transition-all duration-300 bg-gray-50 focus:bg-white
                      ${errors.time ? 'border-red-500' : 'border-gray-300'}
                    `}
                  >
                    <option value="">اختر الوقت</option>
                    {timeSlots.map(time => (
                      <option key={time} value={time}>{time}</option>
                    ))}
                  </select>
                  {errors.time && (
                    <p className="text-red-500 text-sm mt-1 animate-fade-in">{errors.time}</p>
                  )}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  نوع الخدمة القانونية *
                </label>
                <select
                  value={formData.service}
                  onChange={(e) => handleInputChange('service', e.target.value)}
                  className={`
                    w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500
                    transition-all duration-300 bg-gray-50 focus:bg-white
                    ${errors.service ? 'border-red-500' : 'border-gray-300'}
                  `}
                >
                  <option value="">اختر نوع الخدمة</option>
                  {services.map(service => (
                    <option key={service.value} value={service.value}>
                      {service.label}
                    </option>
                  ))}
                </select>
                {errors.service && (
                  <p className="text-red-500 text-sm mt-1 animate-fade-in">{errors.service}</p>
                )}
              </div>
            </div>
          )}

          {/* Step 3: Additional Information */}
          {step === 3 && (
            <div className="space-y-6 animate-fade-in-up">
              <h3 className="text-xl font-bold text-gray-800 mb-4">معلومات إضافية</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  وصف موجز للقضية أو الاستشارة المطلوبة
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                  rows={4}
                  className="
                    w-full px-4 py-3 border border-gray-300 rounded-lg
                    focus:ring-2 focus:ring-teal-500 focus:border-teal-500
                    transition-all duration-300 bg-gray-50 focus:bg-white
                    resize-none
                  "
                  placeholder="اكتب وصفاً موجزاً للقضية أو نوع الاستشارة المطلوبة..."
                />
              </div>
              
              {/* Summary */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-bold text-gray-800 mb-3">ملخص الموعد:</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">الاسم:</span>
                    <span className="font-medium">{formData.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">التاريخ:</span>
                    <span className="font-medium">{formData.date}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">الوقت:</span>
                    <span className="font-medium">{formData.time}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">الخدمة:</span>
                    <span className="font-medium">
                      {services.find(s => s.value === formData.service)?.label}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Success Message */}
          {submitStatus === 'success' && (
            <div className="text-center py-8 animate-bounce-in">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-green-600 mb-2">تم حجز الموعد بنجاح!</h3>
              <p className="text-gray-600">سيتم التواصل معك قريباً لتأكيد الموعد</p>
            </div>
          )}

          {/* Error Message */}
          {submitStatus === 'error' && (
            <div className="text-center py-4 animate-fade-in">
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-600">حدث خطأ أثناء حجز الموعد. يرجى المحاولة مرة أخرى.</p>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          {submitStatus === 'idle' && (
            <div className="flex justify-between pt-6 border-t">
              {step > 1 && (
                <button
                  type="button"
                  onClick={() => setStep(step - 1)}
                  className="
                    px-6 py-3 border border-gray-300 text-gray-700 rounded-lg
                    hover:bg-gray-50 transition-colors flex items-center gap-2
                  "
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  السابق
                </button>
              )}
              
              <div className="flex-1" />
              
              {step < 3 ? (
                <button
                  type="button"
                  onClick={() => {
                    if (step === 1) {
                      const stepErrors: Partial<AppointmentData> = {};
                      if (!formData.name.trim()) stepErrors.name = 'الاسم مطلوب';
                      if (!formData.email.trim()) stepErrors.email = 'البريد الإلكتروني مطلوب';
                      if (!formData.phone.trim()) stepErrors.phone = 'رقم الهاتف مطلوب';
                      
                      if (Object.keys(stepErrors).length > 0) {
                        setErrors(stepErrors);
                        return;
                      }
                    }
                    
                    if (step === 2) {
                      const stepErrors: Partial<AppointmentData> = {};
                      if (!formData.date) stepErrors.date = 'التاريخ مطلوب';
                      if (!formData.time) stepErrors.time = 'الوقت مطلوب';
                      if (!formData.service) stepErrors.service = 'نوع الخدمة مطلوب';
                      
                      if (Object.keys(stepErrors).length > 0) {
                        setErrors(stepErrors);
                        return;
                      }
                    }
                    
                    setStep(step + 1);
                  }}
                  className="
                    px-6 py-3 bg-gradient-to-r from-teal-600 to-blue-600
                    text-white rounded-lg hover:from-teal-700 hover:to-blue-700
                    transition-all transform hover:scale-105 flex items-center gap-2
                  "
                >
                  التالي
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="
                    px-8 py-3 bg-gradient-to-r from-green-600 to-teal-600
                    text-white rounded-lg hover:from-green-700 hover:to-teal-700
                    transition-all transform hover:scale-105 flex items-center gap-2
                    disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
                  "
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      جاري الحجز...
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      تأكيد الحجز
                    </>
                  )}
                </button>
              )}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default AppointmentBooking;