import React from 'react';

interface BrandLogoProps {
  light?: boolean;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({ light = false, className = '', onClick }) => {
  return (
    <a
      href="#home"
      onClick={onClick}
      className={`brand-logo-wrapper ${className}`}
      aria-label="Inkspyra Industries Home"
    >
      <div className="brand-logo-mark">
        <img
          src={light ? '/images/inkspyra-symbol-white.png' : '/images/inkspyra-symbol.png'}
          alt="Inkspyra Industries Symbol"
          className="brand-logo-img"
          width="36"
          height="42"
          loading="eager"
          decoding="async"
        />
      </div>
      <div className="brand-logo-text">
        <span className={`brand-name ${light ? 'brand-name-light' : 'brand-name-dark'}`}>
          INKSPYRA
        </span>
        <span className={`brand-tagline ${light ? 'brand-tagline-light' : 'brand-tagline-dark'}`}>
          INDUSTRIES
        </span>
      </div>
    </a>
  );
};
