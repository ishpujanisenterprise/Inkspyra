import React from 'react';

interface PremiumGiftingShowcaseProps {
  onExploreCollection?: () => void;
}

export const PremiumGiftingShowcase: React.FC<PremiumGiftingShowcaseProps> = ({ onExploreCollection }) => {
  const handleExploreClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (onExploreCollection) {
      onExploreCollection();
    } else {
      const el = document.getElementById('categories');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section className="gifting-fullwidth-hero" id="process" aria-label="Premium Gifting Solutions">
      <div className="gifting-hero-layout">
        {/* Left Column: Editorial Typography */}
        <div className="gifting-hero-left">
          <span className="gifting-hero-eyebrow">THE FINEST</span>

          <h2 className="gifting-hero-heading">
            <span className="gifting-heading-line">Premium Gifting</span>
            <span className="gifting-heading-line">Solutions</span>
          </h2>

          <p className="gifting-hero-description">
            Thoughtfully crafted boxes and hampers for corporate, festive, and special occasions.
          </p>

          <div className="gifting-hero-cta-wrapper">
            <a
              href="#categories"
              className="gifting-hero-btn"
              onClick={handleExploreClick}
              aria-label="Explore our collection — Bespoke Luxury Gifting and Festive Packaging by INKSPYRA INDUSTRIES"
            >
              <span>EXPLORE OUR COLLECTION</span>
              <span className="gifting-btn-arrow" aria-hidden="true">→</span>
            </a>
          </div>
        </div>

        {/* Right Column: Large Transparent Product Composition */}
        <div className="gifting-hero-right">
          <div className="gifting-product-stage">
            <img
              src="/images/file_00000000dd688211abf80fad5d7c4638.png"
              alt="INKSPYRA INDUSTRIES — Bespoke Luxury Gift Boxes, Navy and Cream Packaging, and Curated Corporate Hampers"
              width={1774}
              height={887}
              loading="lazy"
              className="gifting-transparent-png"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
