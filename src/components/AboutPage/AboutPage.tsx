import React, { useEffect } from 'react';
import { AboutStats } from './AboutStats';
import { AboutHistory } from './AboutHistory';
import { Footer } from '../Footer';
import './AboutPage.css';

interface AboutPageProps {
  onOpenQuote?: (category?: string) => void;
  onNavigate: (path: string, hash?: string) => void;
  onOpenPrivacy: () => void;
  onOpenTerms: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({
  onNavigate,
  onOpenPrivacy,
  onOpenTerms,
}) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    document.title = 'About Us — INKSPYRA INDUSTRIES | Precision Manufacturing & Luxury Packaging';
  }, []);

  return (
    <div className="about-page-wrap" id="about-top">
      {/* =========================================================================
          SECTION ONE — ABOUT US INTRODUCTION
          Exact Reference Layout (Single Large Dominant Photo + Clean Editorial Text)
          ========================================================================= */}
      <section className="about-intro-section" aria-label="About Inkspyra Industries Introduction">
        <div className="about-intro-container">
          {/* Left Column: One Large Dominant Photograph */}
          <div className="about-intro-visual-col">
            <div className="about-intro-img-frame">
              <img
                src="/images/about-workshop.jpg"
                alt="Inkspyra Industries precision manufacturing workshop and craftsmanship bench"
                width={800}
                height={700}
                loading="eager"
                className="about-intro-img"
              />
            </div>
          </div>

          {/* Right Column: Clean Editorial Heading & Description */}
          <div className="about-intro-content-col">
            <h1 className="about-intro-heading">ABOUT US</h1>
            <p className="about-intro-description">
              At Inkspyra Industries, we bring ideas to life through precision-crafted MDF and acrylic solutions. From luxury packaging and corporate gifting to bespoke displays and custom creations, we combine thoughtful design, skilled craftsmanship and modern manufacturing to create products that make a lasting impression.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION THREE — COMPANY STATISTICS
          Placed immediately after Introduction as instructed
          ========================================================================= */}
      <AboutStats />

      {/* =========================================================================
          SECTION TWO — HISTORY OF INKSPYRA
          Horizontal Storytelling Milestone Experience
          ========================================================================= */}
      <AboutHistory />

      {/* =========================================================================
          SECTION FOUR — PREMIUM DEEP NAVY FOOTER
          ========================================================================= */}
      <Footer
        onOpenPrivacy={onOpenPrivacy}
        onOpenTerms={onOpenTerms}
        onNavigate={onNavigate}
      />
    </div>
  );
};

