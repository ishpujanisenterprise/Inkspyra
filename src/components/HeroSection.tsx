import React from 'react';
import { ArrowRight } from 'lucide-react';

interface HeroSectionProps {
  onOpenQuote: (category?: string) => void;
  onNavigate?: (path: string, hash?: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenQuote, onNavigate }) => {
  const handleCatalogClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate('/catalog');
    } else {
      const target = document.getElementById('categories');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section className="hero-section" id="home">
      {/* 1. Curved Background Transition: Burgundy Left -> Cream Right */}
      <div className="hero-bg-container" aria-hidden="true">
        {/* Organic Curved Cream Stage on the Right */}
        <svg 
          className="hero-curved-stage-svg" 
          viewBox="0 0 1600 900" 
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="creamStageGrad" x1="15%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FAF2E9" />
              <stop offset="50%" stopColor="#F5ECE1" />
              <stop offset="100%" stopColor="#EDE1D3" />
            </linearGradient>
            <radialGradient id="stageWarmGlow" cx="72%" cy="32%" r="65%">
              <stop offset="0%" stopColor="#FFFBF6" stopOpacity="0.75" />
              <stop offset="100%" stopColor="#F5ECE1" stopOpacity="0" />
            </radialGradient>
          </defs>

        {/* Large diagonal S-curve for Desktop (x~1240 down to x~520) */}
        <path
          className="curve-desktop"
          d="M 1235 0 
             C 1135 240, 935 420, 835 560 
             C 745 690, 680 790, 520 900 
             L 1600 900 
             L 1600 0 
             Z"
          fill="url(#creamStageGrad)"
        />
        <path
          className="curve-desktop"
          d="M 1235 0 
             C 1135 240, 935 420, 835 560 
             C 745 690, 680 790, 520 900 
             L 1600 900 
             L 1600 0 
             Z"
          fill="url(#stageWarmGlow)"
        />

        {/* Responsive Curve for Mobile/Tablet Stack (transitions below text) */}
        <path
          className="curve-mobile"
          d="M 1600 460 
             C 1200 490, 800 470, 450 510 
             C 250 530, 90 565, 0 620 
             L 0 900 
             L 1600 900 
             Z"
          fill="url(#creamStageGrad)"
        />
        </svg>

        {/* Soft Botanical Studio Shadow in Top-Right Corner */}
        <div className="hero-foliage-shadow" />
      </div>

      <div className="hero-layout-container">
        <div className="hero-layout-grid">
          {/* Left Column: Editorial Proposition & Luxury Typography */}
          <div className="hero-editorial-col">
            {/* Eyebrow Label with Gold Bullet */}
            <div className="hero-eyebrow-line">
              <span className="hero-eyebrow-bullet" aria-hidden="true">•</span>
              <span className="hero-eyebrow-heading">
                IDEAS CRAFTED INTO EXTRAORDINARY EXPERIENCES
              </span>
            </div>

            {/* High-Contrast Luxury Serif Headline */}
            <h1 className="hero-luxury-title">
              <span className="title-ivory-line">Luxury Packaging</span>
              <span className="title-gold-line">Solutions</span>
            </h1>

            {/* Short Supporting Description */}
            <p className="hero-lead-description">
              Precision Laser Cutting &amp; Custom Acrylic Fabrication for Premium Brands, Events, and Corporate Gifting.
            </p>

            {/* Luxury CTA Actions */}
            <div className="hero-actions-row">
              <button
                onClick={() => onOpenQuote()}
                className="hero-quote-btn"
                id="hero-request-quote-btn"
                aria-label="Request a Bulk B2B Quote"
              >
                <span>Request a Bulk B2B Quote</span>
                <ArrowRight size={17} className="hero-quote-arrow" />
              </button>

              <a
                href="/catalog"
                onClick={handleCatalogClick}
                className="hero-catalog-link"
                id="hero-explore-products-btn"
              >
                <span>Explore Our Catalog</span>
              </a>
            </div>
          </div>

          {/* Right Column: Actual Subject Product Composition (IMAGE 2) */}
          <div className="hero-product-stage-col">
            <div className="hero-product-stage-wrap">
              <img
                src="/images/hero-luxury-packaging.png"
                alt="INKSPYRA bespoke laser-cut wooden dry fruit gift box with navy hamper on marble platform"
                className="hero-product-master-img"
                width={1536}
                height={1024}
                fetchPriority="high"
                loading="eager"
                decoding="async"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
