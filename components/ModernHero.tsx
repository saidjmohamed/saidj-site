import React, { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../translations';

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
}

interface FloatingElement {
  id: number;
  x: number;
  y: number;
  rotation: number;
  scale: number;
  speed: number;
}

const ModernHero: React.FC = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);
  const animationRef = useRef<number>();

  // Initialize particles
  useEffect(() => {
    const initParticles = () => {
      const newParticles: Particle[] = [];
      for (let i = 0; i < 100; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          vx: (Math.random() - 0.5) * 2,
          vy: (Math.random() - 0.5) * 2,
          size: Math.random() * 3 + 1,
          opacity: Math.random() * 0.5 + 0.2
        });
      }
      setParticles(newParticles);
    };

    initParticles();
    setIsLoaded(true);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  // Mouse tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Particle animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particles.forEach(particle => {
        // Move particles
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Wrap around screen
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // Mouse interaction
        const dx = mousePosition.x - particle.x;
        const dy = mousePosition.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 100) {
          particle.vx += (dx / distance) * 0.1;
          particle.vy += (dy / distance) * 0.1;
        }

        // Apply damping
        particle.vx *= 0.99;
        particle.vy *= 0.99;

        // Draw particle
        ctx.save();
        ctx.globalAlpha = particle.opacity;
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        // Draw connections
        particles.forEach(otherParticle => {
          if (particle.id >= otherParticle.id) return;
          
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 150) {
            ctx.save();
            ctx.globalAlpha = (1 - distance / 150) * 0.2;
            ctx.strokeStyle = '#ffffff';
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.stroke();
            ctx.restore();
          }
        });
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [particles, mousePosition]);

  return (
    <section className="hero-modern relative overflow-hidden" id="home">
      {/* Animated Background Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0"
        style={{ pointerEvents: 'none' }}
      />
      
      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-pink-900/20 z-10"></div>
      <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 via-transparent to-purple-500/10 z-10"></div>
      
      {/* Floating Geometric Shapes */}
      <div className="absolute inset-0 z-10 overflow-hidden">
        <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full opacity-20 animate-float" style={{ animationDelay: '0s' }}></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-500 rounded-lg opacity-25 animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-40 left-20 w-12 h-12 bg-gradient-to-r from-green-400 to-cyan-500 rounded-full opacity-30 animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-20 right-10 w-24 h-24 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg opacity-15 animate-float" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute top-1/3 left-1/3 w-8 h-8 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-full opacity-40 animate-float" style={{ animationDelay: '1.5s' }}></div>
        <div className="absolute top-2/3 right-1/3 w-14 h-14 bg-gradient-to-r from-rose-400 to-pink-500 rounded-lg opacity-25 animate-float" style={{ animationDelay: '2.5s' }}></div>
      </div>

      {/* Main Content */}
      <div className="relative z-20 container mx-auto px-4 py-20 min-h-screen flex items-center justify-center">
        <div className="text-center max-w-4xl mx-auto">
          {/* Animated Title */}
          <div className={`mb-8 ${isLoaded ? 'animate-fade-in-scale' : 'opacity-0'}`}>
            <h1 className="hero-title text-4xl md:text-6xl lg:text-7xl font-bold mb-4 text-gradient text-glow leading-tight">
              {t.header.title}
            </h1>
            <div className="w-32 h-1 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 mx-auto rounded-full animate-pulse-glow"></div>
          </div>

          {/* Animated Subtitle */}
          <div className={`mb-12 ${isLoaded ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.2s' }}>
            <p className="hero-subtitle text-xl md:text-2xl text-white/90 leading-relaxed max-w-3xl mx-auto">
              {t.hero.subtitle}
            </p>
          </div>

          {/* Animated Description */}
          <div className={`mb-16 ${isLoaded ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.4s' }}>
            <p className="text-lg md:text-xl text-white/80 leading-relaxed max-w-2xl mx-auto">
              {t.hero.description}
            </p>
          </div>

          {/* Animated Buttons */}
          <div className={`flex flex-col sm:flex-row gap-6 justify-center items-center ${isLoaded ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.6s' }}>
            <button className="btn-modern btn-primary group relative overflow-hidden px-8 py-4 text-lg font-semibold">
              <span className="relative z-10 flex items-center gap-3">
                <svg className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                {t.hero.contactButton}
              </span>
            </button>
            
            <button className="btn-modern btn-outline group relative overflow-hidden px-8 py-4 text-lg font-semibold">
              <span className="relative z-10 flex items-center gap-3">
                <svg className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {t.hero.learnMore}
              </span>
            </button>
          </div>

          {/* Animated Stats */}
          <div className={`mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 ${isLoaded ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.8s' }}>
            <div className="glass p-6 rounded-2xl text-center group hover:scale-105 transition-all duration-300">
              <div className="text-3xl md:text-4xl font-bold text-gradient mb-2 group-hover:animate-pulse-glow">15+</div>
              <div className="text-white/80 text-lg">{t.hero.yearsExperience}</div>
            </div>
            <div className="glass p-6 rounded-2xl text-center group hover:scale-105 transition-all duration-300">
              <div className="text-3xl md:text-4xl font-bold text-gradient mb-2 group-hover:animate-pulse-glow">500+</div>
              <div className="text-white/80 text-lg">{t.hero.successfulCases}</div>
            </div>
            <div className="glass p-6 rounded-2xl text-center group hover:scale-105 transition-all duration-300">
              <div className="text-3xl md:text-4xl font-bold text-gradient mb-2 group-hover:animate-pulse-glow">100%</div>
              <div className="text-white/80 text-lg">{t.hero.clientSatisfaction}</div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 ${isLoaded ? 'animate-bounce' : 'opacity-0'}`} style={{ animationDelay: '1s' }}>
            <div className="flex flex-col items-center gap-2 text-white/60">
              <span className="text-sm font-medium">{t.hero.scrollDown}</span>
              <svg className="w-6 h-6 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Modern Wave Effect */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden z-15">
        <svg className="relative block w-full h-20" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" 
                className="fill-white/10"></path>
        </svg>
      </div>
    </section>
  );
};

export default ModernHero;