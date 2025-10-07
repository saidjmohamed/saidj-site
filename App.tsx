import React, { useState, useEffect, Suspense, lazy } from 'react';
import { LanguageProvider } from './contexts/LanguageContext';
import { useLanguage } from './contexts/LanguageContext';

// Modern Components
import ModernHeader from './components/ModernHeader';
import ModernHero from './components/ModernHero';
import About from './components/About';
import PracticeAreas from './components/PracticeAreas';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import Footer from './components/Footer';
import FloatingButtons from './components/FloatingButtons';
import BottomNav from './components/BottomNav';
import LegalArticles from './components/LegalArticles';
import AdminPanel from './components/AdminPanel';
import WelcomeModal from './components/WelcomeModal';

// Enhanced Components
import HeroImproved from './components/HeroImproved';
import ChatbotImproved from './components/ChatbotImproved';
import AppointmentBooking from './components/AppointmentBooking';
import CertificatesGallery from './components/CertificatesGallery';
import LegalNews from './components/LegalNews';

// Lazy load components for better performance
const PerformanceOptimizer = lazy(() => import('./components/PerformanceOptimizer'));

// Enhanced Loading Component
const LoadingSpinner: React.FC = () => (
  <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-pink-900">
    <div className="relative">
      {/* Main Spinner */}
      <div className="loading-spinner-modern w-16 h-16 border-4 border-t-cyan-400 border-r-blue-400 border-b-purple-400 border-l-pink-400 rounded-full animate-spin"></div>
      
      {/* Pulsing Ring */}
      <div className="absolute inset-0 w-16 h-16 border-2 border-white/20 rounded-full animate-pulse"></div>
      
      {/* Loading Text */}
      <div className="mt-8 text-center">
        <h2 className="text-white text-xl font-semibold mb-2">جاري التحميل...</h2>
        <div className="flex justify-center space-x-1 rtl:space-x-reverse">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"
              style={{ animationDelay: `${i * 0.1}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  </div>
);

// Intersection Observer Hook for Animations
const useIntersectionObserver = (ref: React.RefObject<Element>, options = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref, options]);

  return isIntersecting;
};

// Enhanced Section Wrapper with Performance Optimizations
interface SectionProps {
  children: React.ReactNode;
  id: string;
  className?: string;
  background?: 'default' | 'glass' | 'gradient' | 'pattern';
  enableParallax?: boolean;
}

const Section: React.FC<SectionProps> = ({ 
  children, 
  id, 
  className = '', 
  background = 'default',
  enableParallax = false 
}) => {
  const sectionRef = React.useRef<HTMLElement>(null);
  const isVisible = useIntersectionObserver(sectionRef, { threshold: 0.1, rootMargin: '50px' });
  const [scrollY, setScrollY] = useState(0);

  // Parallax effect
  useEffect(() => {
    if (!enableParallax) return;
    
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [enableParallax]);

  const getBackgroundClass = () => {
    switch (background) {
      case 'glass':
        return 'relative overflow-hidden backdrop-blur-sm';
      case 'gradient':
        return 'relative bg-gradient-to-br from-purple-900/10 via-blue-900/10 to-pink-900/10';
      case 'pattern':
        return 'relative bg-gray-50 bg-opacity-50';
      default:
        return 'relative';
    }
  };

  const parallaxStyle = enableParallax ? {
    transform: `translateY(${scrollY * 0.1}px)`
  } : {};

  return (
    <section
      ref={sectionRef}
      id={id}
      className={`
        section-modern py-16 md:py-24 lg:py-32
        ${getBackgroundClass()}
        ${className}
        ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}
        transition-all duration-1000 ease-out
      `}
      style={parallaxStyle}
    >
      {background === 'glass' && (
        <>
          <div className="absolute inset-0 bg-white/5 backdrop-blur-sm" />
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-purple-500/10" />
        </>
      )}
      
      {background === 'pattern' && (
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px'
          }}
        />
      )}
      
      <div className="relative z-10">
        {children}
      </div>
    </section>
  );
};

// Enhanced Error Boundary Component
class ErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback?: React.ReactNode },
  { hasError: boolean; error?: Error }
> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="min-h-screen bg-gradient-to-br from-red-900 to-pink-900 flex items-center justify-center text-white">
          <div className="text-center p-8 max-w-md">
            <div className="text-6xl mb-4">⚠️</div>
            <h1 className="text-3xl font-bold mb-4">عذراً، حدث خطأ</h1>
            <p className="text-lg mb-8 opacity-90">نعتذر عن هذا الخطأ التقني. يرجى إعادة تحميل الصفحة أو المحاولة لاحقاً.</p>
            <button 
              onClick={() => window.location.reload()}
              className="btn-modern btn-primary px-8 py-3 bg-white text-red-900 hover:bg-gray-100"
            >
              إعادة تحميل الصفحة
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Main Site Component
const MainSite: React.FC = () => {
  const { language } = useLanguage();
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);
  const [isWelcomeModalOpen, setIsWelcomeModalOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll progress and header background
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.pageYOffset / totalHeight) * 100;
      setScrollProgress(progress);
      setIsScrolled(window.pageYOffset > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Welcome modal logic
  useEffect(() => {
    const hasSeenModal = sessionStorage.getItem('welcomeModalSeen');
    if (!hasSeenModal) {
      const timer = setTimeout(() => {
        setIsWelcomeModalOpen(true);
        sessionStorage.setItem('welcomeModalSeen', 'true');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, []);

  // Enhanced loading effect with preloading
  useEffect(() => {
    const preloadAssets = async () => {
      // Preload critical CSS
      const criticalCss = document.createElement('link');
      criticalCss.rel = 'preload';
      criticalCss.as = 'style';
      criticalCss.href = '/styles/modern-enhanced.css';
      document.head.appendChild(criticalCss);

      // Preload fonts
      const fonts = [
        'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiJ-Ek-_EeA.woff2',
        'https://fonts.gstatic.com/s/cairo/v17/SLXgc1nY6HkvalIhTp2mxdt0UX8.woff2'
      ];

      fonts.forEach(fontUrl => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'font';
        link.href = fontUrl;
        link.crossOrigin = 'anonymous';
        document.head.appendChild(link);
      });

      // Simulate loading time for smooth transition
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsLoaded(true);
    };

    preloadAssets();
  }, []);

  // Smooth scroll to section with offset for fixed header
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  // Handle floating button actions
  const handleFloatingButtonAction = (action: string) => {
    switch (action) {
      case 'chat':
        setIsChatbotOpen(true);
        break;
      case 'appointment':
        setIsAppointmentModalOpen(true);
        break;
      case 'call':
        window.open('tel:+213XXXXXXXXX', '_self');
        break;
      case 'whatsapp':
        window.open('https://wa.me/213XXXXXXXXX?text=مرحبا، أريد استشارة قانونية', '_blank');
        break;
      default:
        break;
    }
  };

  if (!isLoaded) {
    return <LoadingSpinner />;
  }

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 text-white overflow-x-hidden">
        {/* Enhanced Scroll Progress Indicator */}
        <div className="fixed top-0 left-0 w-full h-1 z-50">
          <div 
            className="h-full bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 transition-all duration-300 shadow-lg"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>

        {/* Enhanced Background Effects */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          {/* Animated Background Orbs */}
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" style={{ animationDelay: '2s' }} />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse" />
          
          {/* Floating Particles */}
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white/20 rounded-full animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 10}s`,
                animationDuration: `${5 + Math.random() * 10}s`
              }}
            />
          ))}
        </div>

        {/* Main Content */}
        <div className="relative z-10">
          <ModernHeader className={`transition-all duration-300 ${isScrolled ? 'backdrop-blur-md bg-white/10' : ''}`} />
          
          <main className="relative">
            {/* Hero Section - Using improved version */}
            <HeroImproved />
            
            {/* About Section */}
            <Section id="about" background="glass" enableParallax>
              <About />
            </Section>
            
            {/* Services Section */}
            <Section id="services" background="gradient" className="bg-white/5">
              <PracticeAreas />
            </Section>
            
            {/* Certificates Gallery Section */}
            <Section id="certificates" background="pattern">
              <CertificatesGallery />
            </Section>
            
            {/* Legal Articles Section */}
            <Section id="articles" background="glass">
              <LegalArticles />
            </Section>
            
            {/* Legal News Section */}
            <Section id="news" background="default">
              <LegalNews />
            </Section>
            
            {/* Testimonials Section */}
            <Section id="testimonials" background="gradient" enableParallax>
              <Testimonials />
            </Section>
            
            {/* FAQ Section */}
            <Section id="faq" background="glass">
              <FAQ />
            </Section>
            
            {/* Contact Section */}
            <Section id="contact" background="pattern">
              <Contact />
            </Section>
          </main>
          
          <Footer />
        </div>

        {/* Enhanced Interactive Elements */}
        <FloatingButtons onAction={handleFloatingButtonAction} />
        
        {/* Enhanced Chatbot */}
        <ChatbotImproved 
          isOpen={isChatbotOpen} 
          onClose={() => setIsChatbotOpen(false)}
        />
        
        {/* Appointment Booking Modal */}
        <AppointmentBooking
          isOpen={isAppointmentModalOpen}
          onClose={() => setIsAppointmentModalOpen(false)}
        />
        
        <BottomNav />
        <WelcomeModal isOpen={isWelcomeModalOpen} onClose={() => setIsWelcomeModalOpen(false)} />

        {/* Performance Optimizer */}
        <Suspense fallback={null}>
          <PerformanceOptimizer />
        </Suspense>

        {/* Enhanced Back to Top Button */}
        {scrollProgress > 10 && (
          <button
            onClick={() => scrollToSection('home')}
            className="
              fixed bottom-24 right-6 z-40 group
              w-14 h-14 bg-gradient-to-r from-cyan-500 to-purple-600
              text-white shadow-xl hover:shadow-2xl rounded-full
              transform transition-all duration-500 ease-out
              hover:scale-110 hover:-translate-y-2
              animate-bounce-in
            "
            aria-label="العودة إلى الأعلى"
          >
            <svg 
              className="w-6 h-6 mx-auto transition-transform group-hover:scale-110" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
            
            {/* Progress Ring */}
            <svg className="absolute inset-0 w-14 h-14 -rotate-90">
              <circle
                cx="28"
                cy="28"
                r="24"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                strokeOpacity="0.2"
              />
              <circle
                cx="28"
                cy="28"
                r="24"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                strokeDasharray={`${2 * Math.PI * 24}`}
                strokeDashoffset={`${2 * Math.PI * 24 * (1 - scrollProgress / 100)}`}
                className="transition-all duration-300"
              />
            </svg>
          </button>
        )}

        {/* Quick Actions Panel (Shows on scroll) */}
        {isScrolled && (
          <div className="
            fixed bottom-6 left-6 z-40
            bg-white/10 backdrop-blur-md rounded-2xl p-4
            border border-white/20 shadow-xl
            animate-slide-in-up
          ">
            <div className="flex flex-col gap-3">
              <button
                onClick={() => setIsAppointmentModalOpen(true)}
                className="
                  flex items-center gap-3 px-4 py-2 bg-green-600 hover:bg-green-700
                  text-white rounded-lg transition-colors text-sm font-medium
                "
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                حجز موعد
              </button>
              
              <button
                onClick={() => window.open('tel:+213XXXXXXXXX', '_self')}
                className="
                  flex items-center gap-3 px-4 py-2 bg-blue-600 hover:bg-blue-700
                  text-white rounded-lg transition-colors text-sm font-medium
                "
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                اتصال
              </button>
            </div>
          </div>
        )}
      </div>
    </ErrorBoundary>
  );
};

// Main App Component with Enhanced Features
const App: React.FC = () => {
  const [route, setRoute] = useState(window.location.hash);
  const [isLoading, setIsLoading] = useState(true);
  const [appError, setAppError] = useState<Error | null>(null);

  // Handle route changes
  useEffect(() => {
    const handleHashChange = () => {
      setRoute(window.location.hash);
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  // App initialization with enhanced error handling
  useEffect(() => {
    const initializeApp = async () => {
      try {
        // Simulate app initialization
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Register Service Worker for PWA capabilities (if available)
        if ('serviceWorker' in navigator) {
          try {
            await navigator.serviceWorker.register('/sw.js');
            console.log('Service Worker registered successfully');
          } catch (swError) {
            console.warn('Service Worker registration failed:', swError);
          }
        }

        // Setup performance monitoring
        if ('performance' in window && 'PerformanceObserver' in window) {
          const observer = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
              if (entry.entryType === 'navigation') {
                console.log('Page Load Performance:', {
                  loadTime: entry.loadEventEnd - entry.loadEventStart,
                  domContentLoaded: entry.domContentLoadedEventEnd - entry.domContentLoadedEventStart,
                  firstContentfulPaint: entry.responseEnd - entry.requestStart
                });
              }
            }
          });
          
          observer.observe({ entryTypes: ['navigation', 'paint'] });
        }

        setIsLoading(false);
      } catch (error) {
        console.error('App initialization error:', error);
        setAppError(error as Error);
        setIsLoading(false);
      }
    };

    initializeApp();
  }, []);

  // Global error handler
  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      console.error('Global error:', event.error);
      setAppError(event.error);
    };

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      console.error('Unhandled promise rejection:', event.reason);
      setAppError(new Error(event.reason));
    };

    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handleUnhandledRejection);

    return () => {
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
    };
  }, []);

  // Error Recovery
  const handleErrorRecovery = () => {
    setAppError(null);
    window.location.reload();
  };

  if (appError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-900 to-pink-900 flex items-center justify-center text-white">
        <div className="text-center p-8 max-w-lg">
          <div className="text-8xl mb-6">💥</div>
          <h1 className="text-4xl font-bold mb-4">خطأ في النظام</h1>
          <p className="text-xl mb-2 opacity-90">
            نعتذر، حدث خطأ غير متوقع في التطبيق
          </p>
          <p className="text-sm mb-8 opacity-75">
            {appError.message}
          </p>
          <div className="flex gap-4 justify-center">
            <button 
              onClick={handleErrorRecovery}
              className="btn-modern btn-primary px-8 py-3 bg-white text-red-900 hover:bg-gray-100"
            >
              إعادة تحميل التطبيق
            </button>
            <button 
              onClick={() => window.location.href = 'mailto:support@saidjlawyer.com'}
              className="btn-modern px-8 py-3 border-2 border-white text-white hover:bg-white hover:text-red-900"
            >
              الإبلاغ عن المشكلة
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <LanguageProvider>
      <div className="app-container custom-scrollbar">
        {route === '#admin' ? (
          <Suspense fallback={<LoadingSpinner />}>
            <AdminPanel />
          </Suspense>
        ) : (
          <MainSite />
        )}
      </div>
    </LanguageProvider>
  );
};

export default App;