import React from 'react';

export const GlobalFixedBackground: React.FC = () => {
  return (
    <div className="global-fixed-background" aria-hidden="true">
      {/* Pure White Master Canvas */}
      <div className="global-fixed-bg-base" />

      {/* Decorative Stationary Maroon Wave Ribbons matching Acrylic Creations & Categories */}
      <div className="global-fixed-waves">
        {/* Left flowing decorative wave lines */}
        <svg 
          className="global-wave-svg global-wave-left" 
          viewBox="0 0 500 450" 
          fill="none" 
          preserveAspectRatio="none"
        >
          <path d="M-100,20 C100,80 180,240 280,320 C340,370 420,410 500,430" stroke="#8B1A2B" strokeWidth="1.2" strokeOpacity="0.16" />
          <path d="M-100,50 C90,110 170,260 270,340 C330,390 410,425 500,445" stroke="#8B1A2B" strokeWidth="1.1" strokeOpacity="0.12" />
          <path d="M-100,80 C80,140 160,280 260,360 C320,405 400,438 500,455" stroke="#8B1A2B" strokeWidth="0.9" strokeOpacity="0.09" />
          <path d="M-100,110 C70,170 150,300 250,375 C310,418 390,448 500,465" stroke="#8B1A2B" strokeWidth="0.8" strokeOpacity="0.06" />
          <path d="M-100,140 C60,200 140,320 240,390 C300,430 380,458 500,475" stroke="#8B1A2B" strokeWidth="0.7" strokeOpacity="0.04" />
        </svg>

        {/* Right flowing decorative wave lines */}
        <svg 
          className="global-wave-svg global-wave-right" 
          viewBox="0 0 500 450" 
          fill="none" 
          preserveAspectRatio="none"
        >
          <path d="M600,20 C400,80 320,240 220,320 C160,370 80,410 0,430" stroke="#8B1A2B" strokeWidth="1.2" strokeOpacity="0.16" />
          <path d="M600,50 C410,110 330,260 230,340 C170,390 90,425 0,445" stroke="#8B1A2B" strokeWidth="1.1" strokeOpacity="0.12" />
          <path d="M600,80 C420,140 340,280 240,360 C180,405 100,438 0,455" stroke="#8B1A2B" strokeWidth="0.9" strokeOpacity="0.09" />
          <path d="M600,110 C430,170 350,300 250,375 C190,418 110,448 0,465" stroke="#8B1A2B" strokeWidth="0.8" strokeOpacity="0.06" />
          <path d="M600,140 C440,200 360,320 260,390 C200,430 120,458 0,475" stroke="#8B1A2B" strokeWidth="0.7" strokeOpacity="0.04" />
        </svg>
      </div>
    </div>
  );
};

