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
import Chatbot from './components/Chatbot';
import BottomNav from './components/BottomNav';
import LegalArticles from './components/LegalArticles';
import AdminPanel from './components/AdminPanel';
import WelcomeModal from './components/WelcomeModal';

// Lazy load components for better performance
const PerformanceOptimizer = lazy(() => import('./components/PerformanceOptimizer').catch(() => ({ default: () => null })));

// Loading Component
const LoadingSpinner: React.FC = () => (
  <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-pink-900">
    <div className="loading-spinner-modern"></div>
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

// Enhanced Section Wrapper
interface SectionProps {
  children: React.ReactNode;
  id: string;
  className?: string;
  background?: 'default' | 'glass' | 'gradient';
}

const Section: React.FC<SectionProps> = ({ children, id, className = '', background = 'default' }) => {
  const sectionRef = React.useRef<HTMLElement>(null);
  const isVisible = useIntersectionObserver(sectionRef, { threshold: 0.1 });

  const getBackgroundClass = () => {
    switch (background) {
      case 'glass':
        return 'relative overflow-hidden';
      case 'gradient':
        return 'relative bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-pink-900/20';
      default:
        return 'relative';
    }
  };

  return (
    <section
      ref={sectionRef}
      id={id}
      className={`
        section-modern py-20 md:py-32
        ${getBackgroundClass()}
        ${className}
        ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}
      `}
    >
      {background === 'glass' && (
        <>
          <div className="absolute inset-0 bg-white/5 backdrop-blur-sm" />
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-purple-500/10" />
        </>
      )}
      <div className="relative z-10">
        {children}
      </div>
    </section>
  );
};

// Main Site Component
const MainSite: React.FC = () => {
  const { language } = useLanguage();
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [isWelcomeModalOpen, setIsWelcomeModalOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Handle scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.pageYOffset / totalHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
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

  // Loading effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  // Smooth scroll to section
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Handle floating button actions
  const handleFloatingButtonAction = (action: string) => {
    console.log('Floating button action:', action);
    // Add analytics or other tracking here if needed
  };

  if (!isLoaded) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a1628] via-[#1a2744] to-[#0a1628] text-white overflow-x-hidden">
      {/* Scroll Progress Indicator */}
      <div
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-[#d4af37] via-[#f4d984] to-[#d4af37] z-50 transition-all duration-300 shadow-lg"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Premium Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#d4af37] rounded-full mix-blend-screen filter blur-3xl opacity-15 animate-float" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#3b82f6] rounded-full mix-blend-screen filter blur-3xl opacity-10 animate-float" style={{ animationDelay: '3s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#d4af37] rounded-full mix-blend-screen filter blur-3xl opacity-5 animate-pulse" />
        <div className="absolute inset-0 bg-grid-pattern opacity-20" />
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        <ModernHeader />

        <main className="relative">
          {/* Hero Section */}
          <ModernHero />

          {/* About Section */}
          <Section id="about" background="glass">
            <About />
          </Section>

          {/* Services Section */}
          <Section id="services" background="gradient">
            <PracticeAreas />
          </Section>

          {/* Articles Section */}
          <Section id="articles" background="glass">
            <LegalArticles />
          </Section>

          {/* Testimonials Section */}
          <Section id="testimonials" background="default">
            <Testimonials />
          </Section>

          {/* FAQ Section */}
          <Section id="faq" background="glass">
            <FAQ />
          </Section>

          {/* Contact Section */}
          <Section id="contact" background="gradient">
            <Contact />
          </Section>
        </main>

        <Footer />
      </div>

      {/* Interactive Elements */}
      <FloatingButtons
        onChatbotToggle={() => setIsChatbotOpen(prev => !prev)}
        onAction={handleFloatingButtonAction}
      />
      <Chatbot isOpen={isChatbotOpen} onClose={() => setIsChatbotOpen(false)} />
      <BottomNav />
      <WelcomeModal isOpen={isWelcomeModalOpen} onClose={() => setIsWelcomeModalOpen(false)} />

      {/* Performance Optimizer */}
      <Suspense fallback={null}>
        <PerformanceOptimizer />
      </Suspense>

      {/* Back to Top Button */}
      {scrollProgress > 10 && (
        <button
          onClick={() => scrollToSection('home')}
          className="
            fixed bottom-8 right-8 z-40 p-4 rounded-full
            bg-gradient-to-r from-[#d4af37] to-[#aa8a2a]
            text-[#0a1628] shadow-xl hover:shadow-2xl
            transform transition-all duration-300
            hover:scale-110 hover:-translate-y-1
            animate-bounce-in border border-[#f4d984]/30
          "
          aria-label="العودة إلى الأعلى"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      )}
    </div>
  );
};

// Main App Component
const App: React.FC = () => {
  const [route, setRoute] = useState(window.location.hash);
  const [isLoading, setIsLoading] = useState(true);

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

  // App initialization
  useEffect(() => {
    // Simulate app loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    // Preload critical resources
    try {
      const preloadFont = new FontFace('Inter', 'url(https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiJ-Ek-_EeA.woff2)');
      preloadFont.load().then(() => {
        document.fonts.add(preloadFont);
      }).catch(() => {
        // Font loading failed, ignore
      });
    } catch (error) {
      // FontFace not supported, ignore
    }

    return () => clearTimeout(timer);
  }, []);

  // Error Boundary
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const handleError = (error: ErrorEvent) => {
      console.error('App Error:', error);
      setHasError(true);
    };

    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, []);

  if (hasError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-900 to-pink-900 flex items-center justify-center text-white">
        <div className="text-center p-8">
          <h1 className="text-4xl font-bold mb-4">عذراً، حدث خطأ</h1>
          <p className="text-xl mb-8">نعتذر عن هذا الخطأ. يرجى إعادة تحميل الصفحة.</p>
          <button
            onClick={() => window.location.reload()}
            className="btn-modern btn-primary px-8 py-3"
          >
            إعادة تحميل
          </button>
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