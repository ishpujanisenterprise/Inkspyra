import React, { useEffect, useRef, useState } from 'react';
import { Layers, Briefcase, Diamond, ShieldCheck, Boxes, ArrowRight } from 'lucide-react';

interface AcrylicCreationsProps {
  onSelectProduct?: (productName: string) => void;
  onNavigate?: (path: string, hash?: string) => void;
}

export const AcrylicCreations: React.FC<AcrylicCreationsProps> = ({ onSelectProduct, onNavigate }) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.12 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Custom Balloons Icon for Event & Celebration Décor matching reference
  const BalloonsIcon = () => (
    <svg 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="#981B35" 
      strokeWidth="1.8" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="M12 2a4.5 4.5 0 0 0-4.5 4.5c0 3 4.5 7 4.5 7s4.5-4 4.5-7A4.5 4.5 0 0 0 12 2z" />
      <path d="M7 6a3.5 3.5 0 0 0-3.5 3.5c0 2.5 3.5 5.5 3.5 5.5" />
      <path d="M17 6a3.5 3.5 0 0 1 3.5 3.5c0 2.5-3.5 5.5-3.5 5.5" />
      <path d="M12 13.5v7.5" />
      <path d="M10 18l2 3 2-3" />
    </svg>
  );

  // Custom Nameplate Badge Icon for Personalized Acrylic Nameplates
  const NameplateIcon = () => (
    <svg 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="#981B35" 
      strokeWidth="1.8" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <rect x="3" y="5" width="18" height="12" rx="2.5" />
      <path d="M7 17v3h10v-3" />
      <path d="M8 10h8" />
    </svg>
  );

  // Stacked Acrylic Sheets Icon matching reference header
  const StackedAcrylicSheetsIcon = () => (
    <svg 
      width="28" 
      height="28" 
      viewBox="0 0 28 28" 
      fill="none" 
      stroke="#981B35" 
      strokeWidth="1.7" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="M14 2L2 8l12 6 12-6-12-6z" />
      <path d="M2 14l12 6 12-6" />
      <path d="M2 20l12 6 12-6" />
    </svg>
  );

  const acrylicCards = [
    {
      id: 'acrylic-nameplates',
      title: 'Personalized Acrylic\nNameplates',
      description: 'Custom nameplates for desks and cabins with premium finishes and brand detailing.',
      image: '/images/acrylic-nameplate.jpg',
      alt: 'Personalized crystal clear acrylic desk nameplate with wood stand',
      renderIcon: () => <NameplateIcon />,
    },
    {
      id: 'acrylic-decor',
      title: 'Event & Celebration\nDécor',
      description: 'Acrylic cutouts, table décor, standees, and branding elements for special occasions.',
      image: '/images/acrylic-decor.jpg',
      alt: 'Laser-cut gleaming gold mirror acrylic Happy Birthday event centerpiece',
      renderIcon: () => <BalloonsIcon />,
    },
    {
      id: 'acrylic-signage',
      title: 'Office & Reception\nSignage',
      description: 'Elegant acrylic signage for offices, meeting rooms, and reception areas.',
      image: '/images/acrylic-sign.jpg',
      alt: 'Minimalist crystal-clear conference room acrylic office sign',
      renderIcon: () => <Briefcase size={22} color="#981B35" strokeWidth={1.8} />,
    },
    {
      id: 'acrylic-displays',
      title: 'Custom Acrylic\nDisplays',
      description: 'Bespoke product displays, retail fixtures, and brand showcase solutions.',
      image: '/images/acrylic-display.jpg',
      alt: 'Botanical laser cut gold and transparent custom acrylic showcase displays',
      renderIcon: () => <Layers size={22} color="#981B35" strokeWidth={1.8} />,
    },
  ];

  const features = [
    {
      icon: <Diamond size={20} color="#981B35" strokeWidth={1.8} />,
      label: 'Laser & CNC Precision',
    },
    {
      icon: <Layers size={20} color="#981B35" strokeWidth={1.8} />,
      label: 'Custom Designs',
    },
    {
      icon: <ShieldCheck size={20} color="#981B35" strokeWidth={1.8} />,
      label: 'Premium Finishes',
    },
    {
      icon: <Boxes size={20} color="#981B35" strokeWidth={1.8} />,
      label: 'Brand-Focused Solutions',
    },
  ];

  const handleCardClick = (cardTitle: string) => {
    if (onNavigate) {
      onNavigate('/catalog?category=acrylic-creations');
    } else if (onSelectProduct) {
      onSelectProduct(cardTitle);
    }
  };

  return (
    <section 
      ref={sectionRef} 
      className={`acrylic-showcase-section ${isVisible ? 'is-visible' : ''}`} 
      id="acrylic"
    >
      {/* Background Subtle Wave Lines on far left and right */}
      <div className="acrylic-bg-waves" aria-hidden="true">
        <svg className="acrylic-wave-svg acrylic-wave-left" viewBox="0 0 500 450" fill="none" preserveAspectRatio="none">
          <path d="M-100,20 C100,80 180,240 280,320 C340,370 420,410 500,430" stroke="#981B35" strokeWidth="1.2" strokeOpacity="0.15" />
          <path d="M-100,50 C90,110 170,260 270,340 C330,390 410,425 500,445" stroke="#981B35" strokeWidth="1.1" strokeOpacity="0.11" />
          <path d="M-100,80 C80,140 160,280 260,360 C320,405 400,438 500,455" stroke="#981B35" strokeWidth="0.9" strokeOpacity="0.08" />
          <path d="M-100,110 C70,170 150,300 250,375 C310,418 390,448 500,465" stroke="#981B35" strokeWidth="0.8" strokeOpacity="0.05" />
        </svg>

        <svg className="acrylic-wave-svg acrylic-wave-right" viewBox="0 0 500 450" fill="none" preserveAspectRatio="none">
          <path d="M600,20 C400,80 320,240 220,320 C160,370 80,410 0,430" stroke="#981B35" strokeWidth="1.2" strokeOpacity="0.15" />
          <path d="M600,50 C410,110 330,260 230,340 C170,390 90,425 0,445" stroke="#981B35" strokeWidth="1.1" strokeOpacity="0.11" />
          <path d="M600,80 C420,140 340,280 240,360 C180,405 100,438 0,455" stroke="#981B35" strokeWidth="0.9" strokeOpacity="0.08" />
          <path d="M600,110 C430,170 350,300 250,375 C190,418 110,448 0,465" stroke="#981B35" strokeWidth="0.8" strokeOpacity="0.05" />
        </svg>
      </div>

      <div className="container acrylic-container">
        {/* Section Header — Clean Centered Composition matching Manufacturing Categories */}
        <div className="acrylic-header-block">
          {/* Eyebrow with flanking thin maroon lines */}
          <div className="acrylic-eyebrow-container">
            <span className="acrylic-eyebrow-line"></span>
            <span className="acrylic-eyebrow-text">CUSTOM</span>
            <span className="acrylic-eyebrow-line"></span>
          </div>

          {/* Main Heading: Acrylic (Navy) Creations (Maroon) */}
          <h2 className="acrylic-primary-title">
            <span className="title-navy-part">Acrylic </span>
            <span className="title-maroon-part">Creations</span>
          </h2>

          {/* Subtitle */}
          <p className="acrylic-lead-subtitle">
            Precision-crafted acrylic solutions — from custom cut displays to branded décor, <br className="hide-on-mobile" />
            designed to elevate your spaces, events, and brand presence.
          </p>

          {/* Decorative Stacked Acrylic Sheets Icon with flanking lines */}
          <div className="acrylic-icon-divider">
            <span className="acrylic-divider-maroon-line"></span>
            <div className="acrylic-sheets-icon-box" aria-hidden="true">
              <StackedAcrylicSheetsIcon />
            </div>
            <span className="acrylic-divider-maroon-line"></span>
          </div>
        </div>

        {/* 4 Product Category Cards Grid */}
        <div className="acrylic-cards-grid">
          {acrylicCards.map((card, index) => (
            <article 
              key={card.id} 
              className="acrylic-ref-card"
              style={{ animationDelay: `${index * 130}ms` }}
              onClick={() => handleCardClick(card.title.replace('\n', ' '))}
              role="button"
              tabIndex={0}
              aria-label={`${card.title.replace('\n', ' ')} — Request a Quote`}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleCardClick(card.title.replace('\n', ' '));
                }
              }}
            >
              {/* Card Image Area (50-55% of card height) */}
              <div className="acrylic-card-image-wrap">
                <img
                  src={card.image}
                  alt={card.alt}
                  width={380}
                  height={250}
                  loading="lazy"
                  className="acrylic-card-img"
                />

                {/* Curved Maroon Wave-shaped Divider at Bottom of Image */}
                <div className="acrylic-image-wave-divider" aria-hidden="true">
                  <svg 
                    viewBox="0 0 320 48" 
                    preserveAspectRatio="none" 
                    className="wave-divider-svg"
                  >
                    {/* Deep Maroon Swoosh Wave along bottom-right edge */}
                    <path 
                      d="M130 48 C180 45 220 24 275 19 C295 17 310 21 320 24 L320 48 Z" 
                      fill="#981B35" 
                    />
                    {/* White bottom blend */}
                    <path 
                      d="M0 48 L0 25 C30 25 65 31 110 35 C150 39 190 44 240 46 L320 47 L320 48 Z" 
                      fill="#FFFFFF" 
                    />
                  </svg>
                </div>
              </div>

              {/* Card Content Area */}
              <div className="acrylic-card-body">
                {/* Category Title in Dark Navy */}
                <h3 className="acrylic-card-title">
                  {card.title.split('\n').map((line, i) => (
                    <React.Fragment key={i}>
                      {line}
                      {i < card.title.split('\n').length - 1 && <br />}
                    </React.Fragment>
                  ))}
                </h3>

                {/* Small Maroon Underline */}
                <div className="acrylic-title-underline" aria-hidden="true"></div>

                {/* Description */}
                <p className="acrylic-card-description">
                  {card.description}
                </p>

                {/* Bottom-Right Maroon Arrow Corner (visual only) */}
                <div className="acrylic-maroon-arrow-corner" aria-hidden="true">
                  <ArrowRight size={16} color="#FFFFFF" strokeWidth={2.2} className="corner-arrow-svg" />
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Bottom Feature Strip */}
        <div className="acrylic-features-strip">
          {features.map((feat, index) => (
            <React.Fragment key={index}>
              <div className="feature-strip-item">
                <div className="feature-strip-icon">{feat.icon}</div>
                <span className="feature-strip-text">{feat.label}</span>
              </div>
              {index < features.length - 1 && (
                <span className="feature-strip-separator" aria-hidden="true"></span>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};
