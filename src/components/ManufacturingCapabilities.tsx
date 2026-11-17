import React, { useEffect, useRef } from 'react';
import { ArrowRight, Layers, Package } from 'lucide-react';

interface ManufacturingCapabilitiesProps {
  onBookOrder?: () => void;
}

export const ManufacturingCapabilities: React.FC<ManufacturingCapabilitiesProps> = ({ onBookOrder }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Autoplay configuration complying with browser policies
    video.muted = true;
    video.currentTime = 0;
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Fallback if browser requires interaction
      });
    }

    // Reset and replay from 0:00 whenever section scrolls into viewport
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && video) {
          video.currentTime = 0;
          video.play().catch(() => {});
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Custom 45-degree angled drafting pen / pencil icon matching reference
  const PencilIcon = () => (
    <svg 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="#F4E5CA" 
      strokeWidth="1.8" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
      <path d="M15 5l4 4" />
    </svg>
  );

  // Custom 8-ray laser burst icon matching reference
  const LaserBurstIcon = () => (
    <svg 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="#F4E5CA" 
      strokeWidth="1.8" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <line x1="12" y1="2" x2="12" y2="22" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
      <line x1="19.07" y1="4.93" x2="4.93" y2="19.07" />
    </svg>
  );

  return (
    <section 
      ref={sectionRef} 
      className="mfg-section" 
      id="manufacturing"
    >
      <div className="container mfg-container">
        {/* Split Screen Hero Card */}
        <div className="mfg-split-card">
          {/* Right Video Panel: Autoplays User's Actual Video */}
          <div className="mfg-video-panel">
            <video
              ref={videoRef}
              src="/videos/manufacturing-process.mp4"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              className="mfg-video-element"
              aria-label="Inkspyra in-house manufacturing process video"
            />
          </div>

          {/* Left Content Panel: Deep Navy Blue */}
          <div className="mfg-content-panel">
            {/* Background subtle maroon decorative curves */}
            <div className="mfg-panel-decorations" aria-hidden="true">
              <svg className="mfg-decor-svg" viewBox="0 0 500 680" fill="none">
                <path d="M-40,40 C60,90 140,150 240,170" stroke="#8B1A2B" strokeWidth="1.5" strokeOpacity="0.45" />
                <path d="M30,660 C150,640 260,610 380,590" stroke="#8B1A2B" strokeWidth="1.5" strokeOpacity="0.45" />
              </svg>
            </div>

            {/* Eyebrow Label with Maroon Line */}
            <div className="mfg-eyebrow-wrap">
              <span className="mfg-eyebrow">IN-HOUSE MANUFACTURING</span>
              <span className="mfg-eyebrow-line"></span>
            </div>

            {/* Editorial Heading */}
            <h2 className="mfg-main-heading">
              <span className="heading-white">From Concept</span>
              <br />
              <span className="heading-white">to </span>
              <span className="heading-cream">Creation</span>
            </h2>

            {/* Supporting Description */}
            <p className="mfg-supporting-text">
              A complete in-house setup for custom, high-quality acrylic and MDF products.
            </p>

            {/* 4 Manufacturing Capabilities Row */}
            <div className="mfg-capabilities-row">
              {/* Col 1 */}
              <div className="mfg-cap-col">
                <div className="mfg-cap-icon-wrap" aria-hidden="true">
                  <PencilIcon />
                </div>
                <span className="mfg-cap-label">
                  Design &amp;<br />Customization
                </span>
              </div>

              <div className="mfg-cap-separator" aria-hidden="true" />

              {/* Col 2 */}
              <div className="mfg-cap-col">
                <div className="mfg-cap-icon-wrap" aria-hidden="true">
                  <LaserBurstIcon />
                </div>
                <span className="mfg-cap-label">
                  CO₂ Laser<br />Cutting &amp;<br />Engraving
                </span>
              </div>

              <div className="mfg-cap-separator" aria-hidden="true" />

              {/* Col 3 */}
              <div className="mfg-cap-col">
                <div className="mfg-cap-icon-wrap" aria-hidden="true">
                  <Layers size={24} color="#F4E5CA" strokeWidth={1.8} />
                </div>
                <span className="mfg-cap-label">
                  Acrylic<br />Fabrication &amp;<br />Finishing
                </span>
              </div>

              <div className="mfg-cap-separator" aria-hidden="true" />

              {/* Col 4 */}
              <div className="mfg-cap-col">
                <div className="mfg-cap-icon-wrap" aria-hidden="true">
                  <Package size={24} color="#F4E5CA" strokeWidth={1.8} />
                </div>
                <span className="mfg-cap-label">
                  Quality Check<br />&amp; Bulk<br />Packaging
                </span>
              </div>
            </div>

            {/* Warm Cream Pill CTA Button */}
            <div className="mfg-cta-wrap">
              <button
                type="button"
                className="mfg-book-order-btn"
                onClick={onBookOrder}
                id="mfg-book-order-btn"
              >
                <span>BOOK YOUR ORDER</span>
                <ArrowRight size={16} className="mfg-cta-arrow" />
              </button>
            </div>

            {/* Curved Diagonal Transition SVG on Right Boundary */}
            <div className="mfg-curve-divider" aria-hidden="true">
              <svg 
                viewBox="0 0 100 680" 
                preserveAspectRatio="none" 
                className="mfg-curve-svg"
              >
                {/* Deep Navy Curved Extension */}
                <path 
                  d="M 0,0 L 85,0 C 85,75 60,195 35,340 C 18,450 4,560 0,680 L 0,680 Z" 
                  fill="#081D38" 
                />
                {/* Crisp White Boundary Line */}
                <path 
                  d="M 85,0 C 85,75 60,195 35,340 C 18,450 4,560 0,680" 
                  fill="none" 
                  stroke="#FFFFFF" 
                  strokeWidth="2.5" 
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
