import React from 'react';

interface ErrorDisplayProps {
    title: string;
    message_p1: string;
    message_p2: string;
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ title, message_p1, message_p2 }) => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-slate-100 text-slate-800 p-4" dir={document.documentElement.dir || 'rtl'}>
            <div className="text-center max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md border-t-4 border-red-500">
                <svg className="w-16 h-16 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                </svg>
                <h1 className="text-3xl font-bold text-slate-900 mb-4">{title}</h1>
                <p className="text-lg text-slate-600 mb-2">{message_p1}</p>
                <p className="text-md text-slate-500">{message_p2}</p>
            </div>
        </div>
    );
};

export default ErrorDisplay;
