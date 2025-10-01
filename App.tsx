import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import PracticeAreas from './components/PracticeAreas';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import Footer from './components/Footer';
import FloatingButtons from './components/FloatingButtons';
import Chatbot from './components/Chatbot';
import BottomNav from './components/BottomNav';
import { LanguageProvider } from './contexts/LanguageContext';
import LegalArticles from './components/LegalArticles';
import AdminPanel from './components/AdminPanel';
import WelcomeModal from './components/WelcomeModal';

const MainSite: React.FC = () => {
    const [isChatbotOpen, setIsChatbotOpen] = useState(false);
    const [isWelcomeModalOpen, setIsWelcomeModalOpen] = useState(false);

    useEffect(() => {
        const hasSeenModal = sessionStorage.getItem('welcomeModalSeen');
        if (!hasSeenModal) {
            const timer = setTimeout(() => {
                setIsWelcomeModalOpen(true);
                sessionStorage.setItem('welcomeModalSeen', 'true');
            }, 3000); // Show after 3 seconds
            return () => clearTimeout(timer);
        }
    }, []);

    return (
        <div className="bg-slate-50 text-slate-800 pb-16 md:pb-0">
            <Header />
            <main>
                <Hero />
                <About />
                <PracticeAreas />
                <Testimonials />
                <LegalArticles />
                <FAQ />
                <Contact />
            </main>
            <Footer />
            <FloatingButtons onChatbotToggle={() => setIsChatbotOpen(prev => !prev)} />
            <Chatbot isOpen={isChatbotOpen} onClose={() => setIsChatbotOpen(false)} />
            <BottomNav />
            <WelcomeModal isOpen={isWelcomeModalOpen} onClose={() => setIsWelcomeModalOpen(false)} />
        </div>
    );
};


const App: React.FC = () => {
  const [route, setRoute] = useState(window.location.hash);

  useEffect(() => {
    const handleHashChange = () => {
      setRoute(window.location.hash);
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  return (
      <LanguageProvider>
        {route === '#admin' ? <AdminPanel /> : <MainSite />}
      </LanguageProvider>
  );
};

export default App;