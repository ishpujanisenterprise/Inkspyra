import React from 'react';
import { ArrowRight, Check } from 'lucide-react';

interface AboutCompanyProps {
  onDiscoverManufacturing: () => void;
}

export const AboutCompany: React.FC<AboutCompanyProps> = ({ onDiscoverManufacturing }) => {
  return (
    <section className="section section-soft about-section" id="about">
      <div className="container">
        <div className="about-grid">
          {/* Left Column: Authentic Workshop Photo */}
          <div className="about-visual">
            <div className="about-image-frame card-premium">
              <img
                src="/images/about-workshop.jpg"
                alt="Craftsman assembling precision laser-cut wooden boxes at Inkspyra Industries workshop"
                width={640}
                height={480}
                loading="lazy"
                className="about-img"
              />
              <div className="about-image-badge">
                <span className="badge badge-gold">In-House Workshop</span>
                <p>Dedicated fabrication &amp; hand-finishing bench</p>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative Story & Capabilities */}
          <div className="about-content">
            <span className="eyebrow">ABOUT INKSPYRA INDUSTRIES</span>
            <h2 className="section-title">
              Precision, Craftsmanship &amp; Thoughtful Manufacturing
            </h2>

            <div className="about-text-body">
              <p>
                At Inkspyra Industries, we bring ideas to life through customized packaging, laser-cut designs, acrylic fabrication, and business-focused manufacturing solutions.
              </p>
              <p>
                From a personalized product to a larger B2B order, our focus is on understanding the brief, choosing appropriate materials, maintaining finishing standards, and delivering a product that reflects the customer's vision.
              </p>
              <p>
                Every project begins with a conversation about requirements, specifications, quantity, and intended use.
              </p>
            </div>

            <div className="about-principles-list">
              <div className="about-principle-item">
                <div className="about-principle-icon">
                  <Check size={16} />
                </div>
                <span>Material-first engineering (MDF, Cast Acrylic, Premium Papers)</span>
              </div>
              <div className="about-principle-item">
                <div className="about-principle-icon">
                  <Check size={16} />
                </div>
                <span>Strict tolerance checks on all laser and CNC cutlines</span>
              </div>
              <div className="about-principle-item">
                <div className="about-principle-icon">
                  <Check size={16} />
                </div>
                <span>Custom batch sampling prior to large volume production runs</span>
              </div>
            </div>

            <div className="about-actions">
              <button
                type="button"
                onClick={onDiscoverManufacturing}
                className="btn btn-navy"
                id="about-discover-manufacturing-btn"
              >
                <span>Discover Our Manufacturing</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
