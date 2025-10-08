import React from 'react';

const Signature: React.FC<{ className?: string }> = ({ className }) => {
    return (
        <svg 
            className={className}
            viewBox="0 0 400 100" 
            xmlns="http://www.w3.org/2000/svg"
            aria-label="Signature of Saidj Mohamed"
        >
            <style>
                {`.signature-path {
                    stroke-dasharray: 2000;
                    stroke-dashoffset: 2000;
                    animation: draw 3s ease-in-out forwards;
                }
                @keyframes draw {
                    to {
                        stroke-dashoffset: 0;
                    }
                }`}
            </style>
            <path 
                className="signature-path"
                fill="none" 
                stroke="currentColor" 
                strokeWidth="4" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                d="M 10,70 Q 20,40 40,60 C 60,80 70,30 90,50 Q 110,70 130,50 T 170,60 C 190,70 200,40 220,60 M 240,60 C 250,40 270,80 290,50 Q 310,20 330,60 T 370,50 C 390,40 390,70 370,70" 
            />
        </svg>
    );
};

export default Signature;
