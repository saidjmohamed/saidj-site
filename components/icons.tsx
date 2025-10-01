import React from 'react';

// Updated Icons for Practice Areas for better aesthetics
export const GavelIcon: React.FC = () => ( // Represents Criminal Law with a Scales of Justice icon
    <svg xmlns="http://www.w3.org/2000/svg" className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18m-6-12h12" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 9l-3 6.75h6l-3-6.75z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M18.75 9l-3 6.75h6l-3-6.75z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 9A6.75 6.75 0 0112 2.25a6.75 6.75 0 016.75 6.75" />
    </svg>
);

export const FamilyIcon: React.FC = () => ( // Represents Family Law
    <svg xmlns="http://www.w3.org/2000/svg" className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 2.25l8.25 6v12H3.75v-12L12 2.25z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 11.25a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75v-3.75a3.75 3.75 0 013.75-3.75h0a3.75 3.75 0 013.75 3.75v3.75" />
    </svg>
);

export const BriefcaseIcon: React.FC = () => ( // Represents Commercial Law
    <svg xmlns="http://www.w3.org/2000/svg" className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.625a2.25 2.25 0 01-2.246 2.125H6.621a2.25 2.25 0 01-2.246-2.125L3.75 7.5M10 11.25h4M10 15h4m-7.5-7.5h11" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 7.5V5.625a2.25 2.25 0 00-2.25-2.25h-3a2.25 2.25 0 00-2.25 2.25v1.875" />
    </svg>
);

export const BuildingIcon: React.FC = () => ( // Represents Administrative Law
    <svg xmlns="http://www.w3.org/2000/svg" className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 3.75l7.5 4.5 7.5-4.5" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 8.25v10.5m4.5-10.5v10.5m4.5-10.5v10.5M2.25 8.25h19.5" />
    </svg>
);

export const HomeIcon: React.FC = () => ( // Represents Real Estate Law
    <svg xmlns="http://www.w3.org/2000/svg" className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 11.25l9-9 9 9" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 11.25v8.25a2.25 2.25 0 002.25 2.25h10.5a2.25 2.25 0 002.25-2.25v-8.25" />
    </svg>
);

export const DocumentIcon: React.FC = () => ( // Represents Civil Law
    <svg xmlns="http://www.w3.org/2000/svg" className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
    </svg>
);


// Fix: Added missing CompensationIcon
export const CompensationIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

// Fix: Added missing ExperienceIcon
export const ExperienceIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 100-18 9 9 0 000 18z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 17.25l-4.148 2.18 1.58-4.847L5.36 11.25l4.98-.725L12 6l1.66 4.525 4.98.725-3.072 3.333 1.58 4.847L12 17.25z" />
    </svg>
);

// Fix: Added missing CommitmentIcon
export const CommitmentIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
    </svg>
);

// Fix: Added missing ResultsIcon
export const ResultsIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-3.94-3.94m3.94 3.94l-3.94 3.94" />
    </svg>
);

// Fix: Added missing ConfidentialityIcon
export const ConfidentialityIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
    </svg>
);

export const FacebookIcon: React.FC<{className?: string}> = ({className}) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v7.028C18.343 21.128 22 16.991 22 12z"/>
    </svg>
);

export const ArrowRightIcon: React.FC<{className?: string}> = ({className}) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
    </svg>
);

export const ArrowLeftIcon: React.FC<{className?: string}> = ({className}) => (
     <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
    </svg>
);

export const WhatsAppIcon: React.FC<{className?: string}> = ({className}) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 12c0 1.77.46 3.45 1.32 4.95L2 22l5.25-1.38c1.45.77 3.06 1.23 4.79 1.23h.01c5.46 0 9.91-4.45 9.91-9.91 0-5.46-4.45-9.9-9.91-9.9zM12.04 20.12h-.01c-1.48 0-2.92-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31c-.82-1.31-1.26-2.82-1.26-4.38 0-4.54 3.7-8.24 8.24-8.24 4.54 0 8.24 3.7 8.24 8.24 0 4.54-3.7 8.24-8.24 8.24zm4.52-6.14c-.25-.12-1.47-.72-1.7-.82-.22-.1-.38-.12-.54.12-.16.25-.64.82-.79.98-.15.16-.3.18-.54.06s-1.02-.38-1.94-1.2c-.72-.64-1.2-1.42-1.34-1.66-.14-.25-.02-.38.1-.5.12-.12.25-.3.38-.45.1-.12.16-.2.22-.33.06-.12.03-.25-.03-.37-.06-.12-.54-1.3-.74-1.78-.2-.48-.4-.42-.54-.42h-.47c-.16 0-.42.06-.64.3.22.25-.86 1.02-.86 2.5s.88 2.9 1 3.1c.12.2 1.73 2.64 4.2 3.72.6.26 1.06.42 1.42.54.58.18 1.11.16 1.52.1.48-.08 1.47-.6 1.68-1.18.2-.58.2-1.08.14-1.18-.06-.12-.22-.18-.47-.3z"/>
    </svg>
);

export const ChatbotIcon: React.FC<{className?: string}> = ({className}) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C6.477 2 2 6.477 2 12c0 4.142 2.553 7.69 6.09 9.256V18.5a6.5 6.5 0 0 1-4.912-6.244V12a8 8 0 1 1 16 0v.256a6.5 6.5 0 0 1-4.912 6.244v2.756A10.001 10.001 0 0 0 22 12c0-5.523-4.477-10-10-10zm-3.5 11.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm7-1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm-3.5 4a3.5 3.5 0 0 0 3.5-3.5h-7a3.5 3.5 0 0 0 3.5 3.5z"/>
    </svg>
);

export const MapPinIcon: React.FC<{className?: string}> = ({className}) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
    </svg>
);


export const CloseIcon: React.FC<{className?: string}> = ({className}) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

export const SendIcon: React.FC<{className?: string}> = ({className}) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
    <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
  </svg>
);

export const BotIcon: React.FC<{className?: string}> = ({className}) => (
    <div className={`flex items-center justify-center w-8 h-8 rounded-full bg-slate-700 text-white flex-shrink-0 ${className}`}>
        <ChatbotIcon className="w-5 h-5" />
    </div>
);

export const UserIcon: React.FC<{className?: string}> = ({className}) => (
     <div className={`flex items-center justify-center w-8 h-8 rounded-full bg-teal-500 text-white flex-shrink-0 ${className}`}>
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
    </div>
);

export const PlusIcon: React.FC<{className?: string}> = ({className}) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
  </svg>
);

export const MinusIcon: React.FC<{className?: string}> = ({className}) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" />
  </svg>
);

// Fix: Added missing GreetingIcon
export const GreetingIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.898 20.572L16.25 21l-.648-.428a2.25 2.25 0 01-1.423-1.423L13.5 18.5l.428-.648a2.25 2.25 0 011.423-1.423L16.25 16l.648.428a2.25 2.25 0 011.423 1.423l.648 1.122-.428.648a2.25 2.25 0 01-1.423 1.423z" />
    </svg>
);

export const QuoteIcon: React.FC<{className?: string}> = ({className}) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H8V9h3v7zm4 0h-3V9h3v7z" />
    </svg>
);

// Fix: Added missing BottomNavHomeIcon
export const BottomNavHomeIcon: React.FC<{className?: string}> = ({className}) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
);

// Fix: Added missing BottomNavServicesIcon
export const BottomNavServicesIcon: React.FC<{className?: string}> = ({className}) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
);

// Fix: Added missing BottomNavAboutIcon
export const BottomNavAboutIcon: React.FC<{className?: string}> = ({className}) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
);

export const BottomNavArticlesIcon: React.FC<{className?: string}> = ({className}) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
);

// Fix: Added missing BottomNavContactIcon
export const BottomNavContactIcon: React.FC<{className?: string}> = ({className}) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
);