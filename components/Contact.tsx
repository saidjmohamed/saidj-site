import React, { useState } from 'react';
import { WhatsAppIcon } from './icons';
import { useLanguage } from '../contexts/LanguageContext';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

const Contact: React.FC = () => {
  const { t, language } = useLanguage();
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1 });
  const [status, setStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus('');
    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const response = await fetch(form.action, {
        method: form.method,
        body: data,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        setStatus(t('contact_form_success'));
        form.reset();
      } else {
        const responseData = await response.json();
        if (Object.prototype.hasOwnProperty.call(responseData, 'errors')) {
          setStatus(responseData["errors"].map((error: any) => error["message"]).join(", "));
        } else {
          setStatus(t('contact_form_error'));
        }
      }
    } catch (error) {
      setStatus(t('contact_form_error'));
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <section id="contact" className="py-24 overflow-hidden relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-20"></div>

      <div
        ref={ref}
        className={`container mx-auto px-6 relative z-10 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      >
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">{t('contact_title')}</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#d4af37] via-[#f4d984] to-[#d4af37] mx-auto rounded-full mb-6"></div>
          <p className="text-lg text-white/70 max-w-2xl mx-auto leading-relaxed">
            {t('contact_description')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

          {/* Left Column: Info & Form */}
          <div className="flex flex-col gap-10">
            {/* Contact Info Card */}
            <div className="bg-gradient-to-br from-[#1a2744]/90 to-[#0a1628]/90 backdrop-blur-sm border border-[#d4af37]/20 p-8 rounded-2xl hover:border-[#d4af37]/40 transition-all duration-500">
              <h3 className="text-2xl font-bold mb-6 text-white flex items-center gap-3">
                <span className="w-10 h-10 flex items-center justify-center rounded-lg bg-gradient-to-r from-[#d4af37]/20 to-[#aa8a2a]/10 text-[#d4af37]">
                  📍
                </span>
                {t('contact_info_title')}
              </h3>
              <div className="space-y-6 text-lg">
                <div className="flex items-start group">
                  <svg className={`w-6 h-6 ${language === 'ar' ? 'ml-4' : 'mr-4'} text-[#d4af37] mt-1 flex-shrink-0 group-hover:scale-110 transition-transform`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                  <span className="text-white/80 group-hover:text-white transition-colors">{t('contact_address')}</span>
                </div>
                <div className="flex items-start group">
                  <svg className={`w-6 h-6 ${language === 'ar' ? 'ml-4' : 'mr-4'} text-[#d4af37] mt-1 flex-shrink-0 group-hover:scale-110 transition-transform`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                  <div>
                    <p className="font-semibold mb-2 text-white">{t('contact_phone_whatsapp')}</p>
                    <div className="flex flex-col space-y-2 text-start">
                      <div className="flex items-center gap-3">
                        <a href="tel:+213558357689" className="text-white/80 hover:text-[#d4af37] transition-colors text-left ltr-text" dir="ltr">+213 558 35 76 89</a>
                        <a href="https://wa.me/213558357689" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp +213 558 35 76 89"><WhatsAppIcon className="w-5 h-5 text-green-400 hover:text-green-300 hover:scale-110 transition-all" /></a>
                      </div>
                      <div className="flex items-center gap-3">
                        <a href="tel:+213662806025" className="text-white/80 hover:text-[#d4af37] transition-colors text-left ltr-text" dir="ltr">+213 662 80 60 25</a>
                        <a href="https://wa.me/213662806025" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp +213 662 80 60 25"><WhatsAppIcon className="w-5 h-5 text-green-400 hover:text-green-300 hover:scale-110 transition-all" /></a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-start group">
                  <svg className={`w-6 h-6 ${language === 'ar' ? 'ml-4' : 'mr-4'} text-[#d4af37] mt-1 group-hover:scale-110 transition-transform`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                  <a href="mailto:SAIDJ.MOHAMED@GMAIL.COM" className="text-white/80 hover:text-[#d4af37] transition-colors">SAIDJ.MOHAMED@GMAIL.COM</a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <form onSubmit={handleSubmit} action="https://formspree.io/f/xkgvanzy" method="POST" className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-white/80 mb-2">{t('contact_form_name')}</label>
                <input type="text" id="name" name="name" required className="w-full bg-[#1a2744]/80 border-2 border-[#d4af37]/20 rounded-xl py-3 px-4 text-white placeholder-white/40 focus:outline-none focus:border-[#d4af37] focus:ring-2 focus:ring-[#d4af37]/20 transition-all" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-white/80 mb-2">{t('contact_form_email')}</label>
                <input type="email" id="email" name="email" required className="w-full bg-[#1a2744]/80 border-2 border-[#d4af37]/20 rounded-xl py-3 px-4 text-white placeholder-white/40 focus:outline-none focus:border-[#d4af37] focus:ring-2 focus:ring-[#d4af37]/20 transition-all" />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-white/80 mb-2">{t('contact_form_phone')}</label>
                <input type="tel" id="phone" name="phone" className="w-full bg-[#1a2744]/80 border-2 border-[#d4af37]/20 rounded-xl py-3 px-4 text-white placeholder-white/40 focus:outline-none focus:border-[#d4af37] focus:ring-2 focus:ring-[#d4af37]/20 transition-all" />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-white/80 mb-2">{t('contact_form_message')}</label>
                <textarea id="message" name="message" rows={5} required className="w-full bg-[#1a2744]/80 border-2 border-[#d4af37]/20 rounded-xl py-3 px-4 text-white placeholder-white/40 focus:outline-none focus:border-[#d4af37] focus:ring-2 focus:ring-[#d4af37]/20 transition-all resize-none"></textarea>
              </div>
              {status && (
                <p className={`text-center py-3 px-4 rounded-xl ${status.includes('Error') || status.includes('erreur') ? 'bg-red-500/20 text-red-300 border border-red-500/30' : 'bg-green-500/20 text-green-300 border border-green-500/30'}`}>
                  {status}
                </p>
              )}
              <div>
                <button type="submit" disabled={isSubmitting} className="w-full bg-gradient-to-r from-[#d4af37] to-[#aa8a2a] hover:from-[#f4d984] hover:to-[#d4af37] text-[#0a1628] font-bold py-4 px-6 rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-[#d4af37]/20 hover:shadow-xl hover:shadow-[#d4af37]/30 hover:-translate-y-0.5">
                  {isSubmitting ? t('contact_form_sending') : t('contact_form_submit')}
                </button>
              </div>
            </form>
          </div>

          {/* Right Column: Map */}
          <div className="w-full h-96 lg:h-full lg:min-h-[650px] rounded-2xl overflow-hidden shadow-2xl border-2 border-[#d4af37]/20 hover:border-[#d4af37]/40 transition-all duration-500">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3196.486711915901!2d3.048259476348421!3d36.75832597226924!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x128fafc258ce273b%3A0x1d35a81358968499!2sSAIDJ%20MOHAMED%20AVOCAT!5e0!3m2!1sen!2sdz!4v1720542918453"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Office Location"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;