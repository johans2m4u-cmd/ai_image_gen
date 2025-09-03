
import React from 'react';

const WandIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        className={className}
    >
        <path d="M15 4V2"/>
        <path d="M15 16v-2"/>
        <path d="M11.5 12.5 9 15l-4-4 2.5-2.5"/>
        <path d="m18.5 5.5 2.5 2.5"/>
        <path d="M20 9.01V6"/>
        <path d="M9 4v2"/>
        <path d="M22 15h-2"/>
        <path d="M4 9.01V6"/>
        <path d="m4.5 19.5 2.5-2.5"/>
        <path d="M9.01 20H12"/>
        <path d="m19.5 4.5-2.5 2.5"/>
        <path d="M15 22v-2"/>
        <path d="M4.01 15H2"/>
    </svg>
);

export default WandIcon;
