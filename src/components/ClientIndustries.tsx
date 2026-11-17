import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';

interface ClientIndustriesProps {
  onSelectIndustry: (name?: string) => void;
}

interface IndustrySlide {
  id: string;
  number: string;
  categoryLabel: string;
  heading: string;
  description: string;
  image: string;
  alt: string;
  objectPosition: string;
  panelBg: string;
  rightPanelBg: string;
  isLightPanel: boolean;
}

const INDUSTRY_SLIDES: IndustrySlide[] = [
  {
    id: 'wedding-planners',
    number: '01',
    categoryLabel: 'WEDDING & CELEBRATION',
    heading: 'Wedding Planners',
    description:
      'Bespoke invitation boxes, wedding hampers and personalised packaging for memorable celebrations.',
    image: '/images/slider-01-wedding.png',
    alt: 'Custom floral wedding invitation box with wax seal and satin ribbon',
    objectPosition: 'center center',
    panelBg: '#D5C3B0',
    rightPanelBg: 'linear-gradient(180deg, #F0E0D5 0%, #F7E8DC 100%)',
    isLightPanel: true,
  },
  {
    id: 'architects-designers',
    number: '02',
    categoryLabel: 'ARCHITECTURAL ELEMENTS',
    heading: 'Architects & Interior Designers',
    description:
      'Custom acrylic installations, dimensional signage and decorative MDF elements.',
    image: '/images/slider-02-architects.png',
    alt: 'Architectural dimensional signage plaque with brushed metal and acrylic room markers',
    objectPosition: 'center center',
    panelBg: '#273647',
    rightPanelBg: 'linear-gradient(180deg, #F5EFE8 0%, #F5EDE7 100%)',
    isLightPanel: false,
  },
  {
    id: 'corporate-gifting',
    number: '03',
    categoryLabel: 'CORPORATE GIFTING',
    heading: 'Corporate Gifting Companies',
    description:
      'Premium executive hampers, branded gift boxes and bespoke corporate gifting collections.',
    image: '/images/slider-03-corporate.png',
    alt: 'Midnight navy executive corporate hamper box with bottle, notebook, pen, and matching bag',
    objectPosition: 'center center',
    panelBg: '#192436',
    rightPanelBg: 'linear-gradient(180deg, #F2EBE4 0%, #EAE1D7 100%)',
    isLightPanel: false,
  },
  {
    id: 'retail-lifestyle',
    number: '04',
    categoryLabel: 'RETAIL PRESENTATION',
    heading: 'Retail & Lifestyle Brands',
    description:
      'Custom retail packaging, branded product displays and premium presentation boxes.',
    image: '/images/slider-04-retail.png',
    alt: 'Olive green botanical lifestyle rigid presentation boxes, sleeve, candle hamper, and carrier bag',
    objectPosition: 'center center',
    panelBg: '#3C4628',
    rightPanelBg: 'linear-gradient(180deg, #F8ECDC 0%, #F9EADA 100%)',
    isLightPanel: false,
  },
  {
    id: 'event-agencies',
    number: '05',
    categoryLabel: 'EVENT & EXPERIENCE',
    heading: 'Event Management Agencies',
    description:
      'Custom event props, branded installations and bespoke acrylic presentation elements.',
    image: '/images/slider-05-events.png',
    alt: 'Burgundy and cream event welcome presentation with floral gift boxes, notebook, and easel signage',
    objectPosition: 'center center',
    panelBg: '#4F1B26',
    rightPanelBg: 'linear-gradient(180deg, #FAE5D9 0%, #F7E1D7 100%)',
    isLightPanel: false,
  },
  {
    id: 'wholesalers-distributors',
    number: '06',
    categoryLabel: 'BULK MANUFACTURING',
    heading: 'Wholesalers & Distributors',
    description:
      'Scalable production, consistent finishing and customised packaging for bulk requirements.',
    image: '/images/slider-06-wholesalers.png',
    alt: 'Packaging quality inspection and scalable bulk box manufacturing warehouse dispatch',
    objectPosition: 'center center',
    panelBg: '#5B362D',
    rightPanelBg: 'linear-gradient(180deg, #FEEFDD 0%, #FCE7D5 100%)',
    isLightPanel: false,
  },
];

const AUTOPLAY_INTERVAL_MS = 3500;
const TRANSITION_DURATION_MS = 950;
const SWIPE_THRESHOLD_PX = 45;

export const ClientIndustries: React.FC<ClientIndustriesProps> = ({ onSelectIndustry }) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [exitingIndex, setExitingIndex] = useState<number | null>(null);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isInViewport, setIsInViewport] = useState<boolean>(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(false);
  const [isMobileViewport, setIsMobileViewport] = useState<boolean>(false);
  const [autoplayCycleKey, setAutoplayCycleKey] = useState<number>(0);

  const sliderStageRef = useRef<HTMLDivElement | null>(null);
  const transitionTimerRef = useRef<number | null>(null);
  const dragStartXRef = useRef<number | null>(null);
  const isDraggingRef = useRef<boolean>(false);

  const totalSlides = INDUSTRY_SLIDES.length;
  const activeSlide = INDUSTRY_SLIDES[activeIndex];

  // Track prefers-reduced-motion and mobile viewport width
  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const mobileQuery = window.matchMedia('(max-width: 767px)');

    const syncPreferences = () => {
      setPrefersReducedMotion(motionQuery.matches);
      setIsMobileViewport(mobileQuery.matches);
    };

    syncPreferences();
    motionQuery.addEventListener('change', syncPreferences);
    mobileQuery.addEventListener('change', syncPreferences);

    return () => {
      motionQuery.removeEventListener('change', syncPreferences);
      mobileQuery.removeEventListener('change', syncPreferences);
    };
  }, []);

  // Pause autoplay when slider is scrolled out of the viewport
  useEffect(() => {
    const stageEl = sliderStageRef.current;
    if (!stageEl) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInViewport(entry.isIntersecting);
      },
      { threshold: 0.2 }
    );

    observer.observe(stageEl);
    return () => observer.disconnect();
  }, []);

  // Core navigation handler preventing overlapping transitions
  const goToSlide = useCallback(
    (targetIndex: number, explicitDirection?: 'next' | 'prev') => {
      const normalizedIndex = (targetIndex + totalSlides) % totalSlides;
      if (isAnimating || normalizedIndex === activeIndex) return;

      const resolvedDirection: 'next' | 'prev' =
        explicitDirection ??
        (normalizedIndex > activeIndex ? 'next' : 'prev');

      setAutoplayCycleKey((prev) => prev + 1);

      if (prefersReducedMotion) {
        setActiveIndex(normalizedIndex);
        setExitingIndex(null);
        setIsAnimating(false);
        return;
      }

      setDirection(resolvedDirection);
      setExitingIndex(activeIndex);
      setActiveIndex(normalizedIndex);
      setIsAnimating(true);

      if (transitionTimerRef.current !== null) {
        window.clearTimeout(transitionTimerRef.current);
      }

      transitionTimerRef.current = window.setTimeout(() => {
        setIsAnimating(false);
        setExitingIndex(null);
        transitionTimerRef.current = null;
      }, TRANSITION_DURATION_MS);
    },
    [activeIndex, isAnimating, prefersReducedMotion, totalSlides]
  );

  const handleNext = useCallback(() => {
    goToSlide(activeIndex + 1, 'next');
  }, [activeIndex, goToSlide]);

  const handlePrev = useCallback(() => {
    goToSlide(activeIndex - 1, 'prev');
  }, [activeIndex, goToSlide]);

  // Cleanup animation timeout on unmount
  useEffect(() => {
    return () => {
      if (transitionTimerRef.current !== null) {
        window.clearTimeout(transitionTimerRef.current);
      }
    };
  }, []);

  // Determine whether autoplay should actively tick
  const isAutoplayActive =
    isInViewport &&
    !isHovered &&
    !isAnimating &&
    !prefersReducedMotion &&
    !isMobileViewport;

  // 3.5-second autoplay timer that resets after every slide change
  useEffect(() => {
    if (!isAutoplayActive) return;

    const timer = window.setInterval(() => {
      goToSlide((activeIndex + 1) % totalSlides, 'next');
    }, AUTOPLAY_INTERVAL_MS);

    return () => window.clearInterval(timer);
  }, [isAutoplayActive, activeIndex, totalSlides, goToSlide, autoplayCycleKey]);

  // Pointer & touch swipe handlers
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0 && e.pointerType === 'mouse') return;
    // Do not start drag from interactive buttons
    if ((e.target as HTMLElement).closest('button')) return;
    dragStartXRef.current = e.clientX;
    isDraggingRef.current = true;
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current || dragStartXRef.current === null) return;
    const deltaX = e.clientX - dragStartXRef.current;
    dragStartXRef.current = null;
    isDraggingRef.current = false;

    if (Math.abs(deltaX) >= SWIPE_THRESHOLD_PX) {
      if (deltaX < 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
  };

  const handlePointerCancel = () => {
    dragStartXRef.current = null;
    isDraggingRef.current = false;
  };

  // Keyboard arrow navigation when focused
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      handleNext();
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      handlePrev();
    }
  };

  const getSlideStateClass = (index: number): string => {
    if (isAnimating) {
      if (index === activeIndex) {
        return direction === 'next'
          ? 'editorial-slide-entering-next'
          : 'editorial-slide-entering-prev';
      }
      if (index === exitingIndex) {
        return direction === 'next'
          ? 'editorial-slide-exiting-next'
          : 'editorial-slide-exiting-prev';
      }
    } else if (index === activeIndex) {
      return 'editorial-slide-active';
    }
    return 'editorial-slide-idle';
  };

  return (
    <section
      className="industries-editorial-section"
      id="industries"
      aria-label="Who We Serve — Editorial Client Showcase"
    >
      {/* Premium Editorial Horizontal Heading Panel */}
      <div className="industries-editorial-heading-panel">
        <div className="industries-heading-panel-inner">
          <div className="industries-eyebrow-row">
            <span className="industries-eyebrow-rule" aria-hidden="true" />
            <span className="industries-eyebrow-text">WHO WE SERVE</span>
          </div>

          <h2 className="industries-primary-title">
            <span className="title-navy-part">Built for Brands, </span>
            <span className="title-maroon-part">Events &amp; Businesses</span>
          </h2>

          <p className="industries-lead-subtitle">
            Custom acrylic fabrication and bespoke packaging engineered for specialists across sectors — from private celebrations to national corporate rollouts.
          </p>
        </div>
      </div>

      {/* Full-Width 30/70 Split-Screen Editorial Slider */}
      <div
        ref={sliderStageRef}
        className={`editorial-slider-viewport ${
          activeSlide.isLightPanel ? 'editorial-theme-light' : 'editorial-theme-dark'
        }`}
        tabIndex={0}
        role="region"
        aria-roledescription="carousel"
        aria-label="Client Sectors Split Editorial Slider"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          handlePointerCancel();
        }}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerCancel}
        onKeyDown={handleKeyDown}
      >
        <div className="editorial-slides-track">
          {INDUSTRY_SLIDES.map((slide, idx) => {
            const stateClass = getSlideStateClass(idx);
            const isCurrent = idx === activeIndex;

            return (
              <article
                key={slide.id}
                className={`editorial-slide-frame ${stateClass} ${
                  slide.isLightPanel ? 'slide-panel-light' : 'slide-panel-dark'
                }`}
                aria-hidden={!isCurrent}
                aria-roledescription="slide"
                aria-label={`${slide.number} of 06: ${slide.heading}`}
              >
                {/* LEFT PANEL — 30% Solid Dominant-Matched Color & Editorial Copy */}
                <div
                  className="editorial-panel-left"
                  style={{ backgroundColor: slide.panelBg }}
                >
                  <div className="panel-left-inner">
                    <div className="panel-top-meta">
                      <span className="panel-slide-fraction">
                        {slide.number} &mdash; 06
                      </span>
                      <span className="panel-sector-label">{slide.categoryLabel}</span>
                    </div>

                    <div className="panel-body-copy">
                      <h3 className="panel-slide-heading">{slide.heading}</h3>
                      <p className="panel-slide-description">{slide.description}</p>
                      <button
                        type="button"
                        className="panel-inquire-action"
                        tabIndex={isCurrent ? 0 : -1}
                        aria-label={`Inquire about solutions for ${slide.heading}`}
                        onClick={() => onSelectIndustry(slide.heading)}
                      >
                        <span>Request B2B Quote</span>
                        <ArrowUpRight size={15} className="panel-inquire-icon" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* RIGHT PANEL — 70% Complete Uncropped Photograph */}
                <div
                  className="editorial-panel-right"
                  style={{ background: slide.rightPanelBg }}
                >
                  <img
                    src={slide.image}
                    alt={slide.alt}
                    draggable={false}
                    className="panel-slide-image"
                    style={{ objectPosition: slide.objectPosition }}
                    loading={idx === 0 ? 'eager' : 'lazy'}
                  />
                </div>
              </article>
            );
          })}
        </div>

        {/* Integrated Navigation Overlay Anchored to the Left Panel Footer */}
        <div className="editorial-controls-dock">
          <div className="editorial-controls-inner">
            <div className="editorial-progress-group" role="tablist" aria-label="Slide selector">
              {INDUSTRY_SLIDES.map((slide, idx) => {
                const isActive = idx === activeIndex;
                return (
                  <button
                    key={slide.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    aria-label={`View slide ${slide.number}: ${slide.heading}`}
                    className={`editorial-segment-btn ${isActive ? 'is-active' : ''}`}
                    onClick={() =>
                      goToSlide(idx, idx > activeIndex ? 'next' : 'prev')
                    }
                  >
                    <span className="editorial-segment-track">
                      {isActive && (
                        <span
                          key={`${activeIndex}-${autoplayCycleKey}`}
                          className={`editorial-segment-fill ${
                            isAutoplayActive ? 'is-running' : 'is-paused'
                          }`}
                        />
                      )}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="editorial-nav-right">
              <span className="editorial-counter-readout" aria-live="polite">
                {activeSlide.number} / 06
              </span>
              <div className="editorial-arrow-pair">
                <button
                  type="button"
                  className="editorial-arrow-btn"
                  onClick={handlePrev}
                  aria-label="Previous client category slide"
                  disabled={isAnimating}
                >
                  <ArrowLeft size={16} aria-hidden="true" />
                </button>
                <button
                  type="button"
                  className="editorial-arrow-btn"
                  onClick={handleNext}
                  aria-label="Next client category slide"
                  disabled={isAnimating}
                >
                  <ArrowRight size={16} aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
