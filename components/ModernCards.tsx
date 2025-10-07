import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../translations';

interface ModernCardProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  gradient?: string;
  delay?: number;
  onClick?: () => void;
  children?: React.ReactNode;
}

interface InteractiveCardProps extends ModernCardProps {
  hoverEffect?: 'glow' | 'lift' | 'tilt' | 'scale';
  glowColor?: string;
}

// Modern Glass Card Component
export const ModernCard: React.FC<ModernCardProps> = ({
  title,
  description,
  icon,
  gradient = 'from-cyan-400 to-blue-600',
  delay = 0,
  onClick,
  children
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={cardRef}
      className={`
        card-modern group cursor-pointer
        transform transition-all duration-700 ease-out
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
        hover:scale-105 hover:-translate-y-2
      `}
      onClick={onClick}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {/* Gradient Border Effect */}
      <div className={`absolute inset-0 bg-gradient-to-r ${gradient} rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-xl`}></div>
      
      {/* Icon Section */}
      {icon && (
        <div className="flex justify-center mb-6">
          <div className={`
            w-16 h-16 rounded-full bg-gradient-to-r ${gradient} 
            flex items-center justify-center text-white text-2xl
            transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-12
            shadow-lg group-hover:shadow-2xl
          `}>
            {icon}
          </div>
        </div>
      )}

      {/* Content */}
      <div className="text-center relative z-10">
        <h3 className="text-xl font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-cyan-400 group-hover:to-purple-400 transition-all duration-300">
          {title}
        </h3>
        <p className="text-white/80 leading-relaxed group-hover:text-white/90 transition-colors duration-300">
          {description}
        </p>
        {children && (
          <div className="mt-6">
            {children}
          </div>
        )}
      </div>

      {/* Hover Glow Effect */}
      <div className={`absolute inset-0 bg-gradient-to-r ${gradient} rounded-xl opacity-0 group-hover:opacity-10 transition-opacity duration-500 blur-2xl`}></div>
    </div>
  );
};

// Interactive Card with Mouse Tracking
export const InteractiveCard: React.FC<InteractiveCardProps> = ({
  title,
  description,
  icon,
  gradient = 'from-purple-500 to-pink-600',
  delay = 0,
  hoverEffect = 'tilt',
  glowColor = 'rgba(168, 85, 247, 0.4)',
  onClick,
  children
}) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, [delay]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setMousePosition({ x, y });
  };

  const getTransformStyle = () => {
    if (!isHovered || hoverEffect !== 'tilt') return '';
    
    const { x, y } = mousePosition;
    const centerX = cardRef.current?.offsetWidth! / 2;
    const centerY = cardRef.current?.offsetHeight! / 2;
    
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;
    
    return `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };

  const getLightPosition = () => {
    const { x, y } = mousePosition;
    return { left: x - 100, top: y - 100 };
  };

  return (
    <div
      ref={cardRef}
      className={`
        relative group cursor-pointer
        transform transition-all duration-700 ease-out
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
        ${hoverEffect === 'lift' ? 'hover:-translate-y-4' : ''}
        ${hoverEffect === 'scale' ? 'hover:scale-110' : ''}
      `}
      style={{
        transform: isHovered && hoverEffect === 'tilt' ? getTransformStyle() : undefined,
        transitionDelay: `${delay}ms`
      }}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Glass Card */}
      <div className="glass-strong p-8 rounded-2xl relative overflow-hidden">
        {/* Animated Light Effect */}
        {isHovered && (
          <div
            className="absolute w-40 h-40 pointer-events-none transition-all duration-300 ease-out"
            style={{
              ...getLightPosition(),
              background: `radial-gradient(circle, ${glowColor} 0%, transparent 70%)`,
              transform: 'translate(-50%, -50%)'
            }}
          />
        )}

        {/* Floating Particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className={`absolute w-2 h-2 bg-white/20 rounded-full animate-float opacity-0 group-hover:opacity-100 transition-opacity duration-${300 + i * 100}`}
              style={{
                left: `${20 + i * 15}%`,
                top: `${10 + (i % 3) * 30}%`,
                animationDelay: `${i * 0.2}s`,
                animationDuration: `${3 + i * 0.5}s`
              }}
            />
          ))}
        </div>

        {/* Icon with Glow */}
        {icon && (
          <div className="flex justify-center mb-6 relative">
            <div className={`
              w-20 h-20 rounded-2xl bg-gradient-to-r ${gradient}
              flex items-center justify-center text-white text-3xl
              transform transition-all duration-500
              ${isHovered ? 'scale-110 rotate-12' : ''}
              relative z-10
            `}>
              {icon}
              {isHovered && (
                <div className={`absolute inset-0 bg-gradient-to-r ${gradient} rounded-2xl blur-xl opacity-60 animate-pulse`} />
              )}
            </div>
          </div>
        )}

        {/* Content */}
        <div className="text-center relative z-10">
          <h3 className={`
            text-2xl font-bold mb-4 transition-all duration-300
            ${isHovered 
              ? 'text-transparent bg-gradient-to-r bg-clip-text from-cyan-400 to-purple-400' 
              : 'text-white'
            }
          `}>
            {title}
          </h3>
          
          <p className={`
            leading-relaxed transition-all duration-300
            ${isHovered ? 'text-white/90' : 'text-white/70'}
          `}>
            {description}
          </p>
          
          {children && (
            <div className="mt-8">
              {children}
            </div>
          )}
        </div>

        {/* Bottom Glow */}
        <div className={`
          absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${gradient}
          transform transition-all duration-300
          ${isHovered ? 'scale-x-100' : 'scale-x-0'}
        `} />
      </div>

      {/* Outer Glow Effect */}
      {hoverEffect === 'glow' && (
        <div className={`
          absolute inset-0 bg-gradient-to-r ${gradient} rounded-2xl blur-xl
          transition-opacity duration-300
          ${isHovered ? 'opacity-30' : 'opacity-0'}
        `} />
      )}
    </div>
  );
};

// Service Card with Modern Design
export const ServiceCard: React.FC<{
  service: {
    title: string;
    description: string;
    features: string[];
    icon: string;
  };
  index: number;
}> = ({ service, index }) => {
  const { language } = useLanguage();
  const gradients = [
    'from-blue-500 to-purple-600',
    'from-purple-500 to-pink-600',
    'from-pink-500 to-rose-600',
    'from-green-500 to-teal-600',
    'from-yellow-500 to-orange-600',
    'from-indigo-500 to-blue-600'
  ];

  return (
    <InteractiveCard
      title={service.title}
      description={service.description}
      gradient={gradients[index % gradients.length]}
      delay={index * 200}
      hoverEffect="tilt"
      icon={<span className="text-2xl">{service.icon}</span>}
    >
      <div className="space-y-3">
        {service.features.map((feature, featureIndex) => (
          <div
            key={featureIndex}
            className="flex items-center gap-3 text-white/80 group-hover:text-white/90 transition-colors duration-300"
          >
            <div className="w-2 h-2 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full animate-pulse" />
            <span className="text-sm">{feature}</span>
          </div>
        ))}
      </div>
    </InteractiveCard>
  );
};

// Statistics Card
export const StatCard: React.FC<{
  value: string;
  label: string;
  icon: React.ReactNode;
  delay?: number;
}> = ({ value, label, icon, delay = 0 }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const targetValue = parseInt(value.replace(/[^0-9]/g, ''));

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          
          // Animate counter
          const duration = 2000;
          const steps = 60;
          const stepValue = targetValue / steps;
          let currentStep = 0;
          
          const timer = setInterval(() => {
            if (currentStep < steps) {
              setCount(Math.floor(stepValue * currentStep));
              currentStep++;
            } else {
              setCount(targetValue);
              clearInterval(timer);
            }
          }, duration / steps);
          
          return () => clearInterval(timer);
        }
      },
      { threshold: 0.5 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, [targetValue]);

  return (
    <div
      ref={cardRef}
      className={`
        glass p-6 rounded-2xl text-center group cursor-pointer
        transform transition-all duration-700 ease-out
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
        hover:scale-105 hover:-translate-y-2
      `}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="flex justify-center mb-4">
        <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex items-center justify-center text-white text-xl group-hover:scale-110 transition-transform duration-300">
          {icon}
        </div>
      </div>
      
      <div className="text-3xl md:text-4xl font-bold text-gradient mb-2 group-hover:animate-pulse-glow">
        {count}{value.replace(/[0-9]/g, '')}
      </div>
      
      <div className="text-white/80 text-lg group-hover:text-white/90 transition-colors duration-300">
        {label}
      </div>
    </div>
  );
};

export default {
  ModernCard,
  InteractiveCard,
  ServiceCard,
  StatCard
};