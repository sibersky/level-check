// src/components/FlagIcon.tsx
import React from 'react';

export type FlagCode = 'en' | 'gb' | 'es' | 'de' | 'pt' | 'br' | 'ru';

interface FlagIconProps {
  country: FlagCode;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const FlagIcon: React.FC<FlagIconProps> = ({
  country,
  className = '',
  size = 'md',
}) => {
  const sizeClasses = {
    sm: 'w-4 h-3',
    md: 'w-5 h-3.5',
    lg: 'w-6 h-4',
  }[size];

  const code = country.toLowerCase();

  return (
    <span
      className={`inline-flex items-center justify-center shrink-0 rounded-[3px] overflow-hidden shadow-2xs border border-black/15 select-none ${sizeClasses} ${className}`}
      aria-hidden="true"
    >
      {/* 🇬🇧 United Kingdom */}
      {(code === 'en' || code === 'gb') && (
        <svg viewBox="0 0 60 36" className="w-full h-full object-cover">
          <clipPath id="uk-clip">
            <rect width="60" height="36" />
          </clipPath>
          <g clipPath="url(#uk-clip)">
            {/* Blue Background */}
            <rect width="60" height="36" fill="#012169" />
            {/* White diagonals */}
            <path d="M0,0 L60,36 M60,0 L0,36" stroke="#FFFFFF" strokeWidth="6" />
            {/* Red diagonals */}
            <path
              d="M0,0 L30,18 M60,0 L30,18 M60,36 L30,18 M0,36 L30,18"
              stroke="#C8102E"
              strokeWidth="2"
            />
            {/* White cross */}
            <path d="M30,0 v36 M0,18 h60" stroke="#FFFFFF" strokeWidth="10" />
            {/* Red cross */}
            <path d="M30,0 v36 M0,18 h60" stroke="#C8102E" strokeWidth="6" />
          </g>
        </svg>
      )}

      {/* 🇪🇸 Spain */}
      {code === 'es' && (
        <svg viewBox="0 0 60 40" className="w-full h-full object-cover">
          <rect width="60" height="10" fill="#AA151B" />
          <rect y="10" width="60" height="20" fill="#F1BF00" />
          <rect y="30" width="60" height="10" fill="#AA151B" />
          {/* Simplified Coat of Arms / Crest */}
          <g transform="translate(14, 15) scale(0.6)">
            <rect x="0" y="3" width="10" height="12" rx="2" fill="#AA151B" stroke="#000" strokeWidth="0.5" />
            <rect x="2" y="5" width="6" height="8" fill="#F1BF00" />
            <circle cx="5" cy="2" r="2.5" fill="#C8102E" />
            <path d="M-3,5 h2 v8 h-2 z M11,5 h2 v8 h-2 z" fill="#FFFFFF" />
          </g>
        </svg>
      )}

      {/* 🇩🇪 Germany */}
      {code === 'de' && (
        <svg viewBox="0 0 60 36" className="w-full h-full object-cover">
          <rect width="60" height="12" fill="#000000" />
          <rect y="12" width="60" height="12" fill="#DD0000" />
          <rect y="24" width="60" height="12" fill="#FFCE00" />
        </svg>
      )}

      {/* 🇵🇹 Portugal */}
      {code === 'pt' && (
        <svg viewBox="0 0 60 40" className="w-full h-full object-cover">
          <rect width="24" height="40" fill="#006600" />
          <rect x="24" width="36" height="40" fill="#FF0000" />
          {/* Armillary sphere + shield */}
          <g transform="translate(24, 20)">
            <circle r="7.5" fill="#FFCE00" stroke="#CC9900" strokeWidth="0.8" />
            <rect x="-4" y="-5" width="8" height="10" rx="1.5" fill="#FFFFFF" stroke="#CC0000" strokeWidth="0.8" />
            <rect x="-2.5" y="-3.5" width="5" height="7" fill="#002277" />
          </g>
        </svg>
      )}

      {/* 🇧🇷 Brazil */}
      {code === 'br' && (
        <svg viewBox="0 0 60 42" className="w-full h-full object-cover">
          <rect width="60" height="42" fill="#009c3b" />
          <polygon points="30,4 55,21 30,38 5,21" fill="#ffdf00" />
          <circle cx="30" cy="21" r="8" fill="#002776" />
          <path d="M23,22 Q30,17 37,21" stroke="#FFFFFF" strokeWidth="1.2" fill="none" />
        </svg>
      )}

      {/* 🇷🇺 Russia */}
      {code === 'ru' && (
        <svg viewBox="0 0 60 36" className="w-full h-full object-cover">
          <rect width="60" height="12" fill="#FFFFFF" />
          <rect y="12" width="60" height="12" fill="#0039A6" />
          <rect y="24" width="60" height="12" fill="#D52B1E" />
        </svg>
      )}
    </span>
  );
};

export default FlagIcon;
