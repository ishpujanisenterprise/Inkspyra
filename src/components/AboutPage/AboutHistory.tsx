import React, { useState, useRef, useCallback, useEffect, useMemo } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface MilestoneItem {
  id: string;
  step: string;
  year: string;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
}

const MILESTONES: MilestoneItem[] = [
  {
    id: 'milestone-01',
    step: '01',
    year: '2018',
    title: 'THE FOUNDATION',
    description:
      'Every great creation begins with an idea. Inkspyra Industries was built around a passion for craftsmanship, thoughtful design and the ability to transform materials into meaningful products. Our foundation reflects the values that continue to guide the way we work.',
    imageSrc: '/images/about-workshop.jpg',
    imageAlt: 'Inkspyra Industries craftsman hand-assembling precision woodwork at foundation bench',
  },
  {
    id: 'milestone-02',
    step: '02',
    year: '2021',
    title: 'RESILIENCE THROUGH CHALLENGES',
    description:
      'Growth comes from learning, adapting and moving forward. Through changing requirements and new creative challenges, we continue to refine our processes, strengthen our capabilities and deliver solutions that meet the evolving needs of our clients.',
    imageSrc: '/images/proc-laser.jpg',
    imageAlt: 'High-precision CO2 laser beam cutting materials with tight mechanical tolerance',
  },
  {
    id: 'milestone-03',
    step: '03',
    year: '2024',
    title: 'A MODERN VISION',
    description:
      'Today, Inkspyra brings design thinking and precision manufacturing together. With a focus on custom packaging, corporate gifting and bespoke MDF and acrylic creations, we continue to explore new possibilities while staying committed to quality and detail.',
    imageSrc: '/images/hero-luxury-boxes.jpg',
    imageAlt: 'Collection of premium luxury rigid boxes, gold foiling, and bespoke corporate hampers',
  },
];

export const AboutHistory: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const wheelAccum = useRef(0);
  const wheelTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const total = MILESTONES.length;

  const prefersReducedMotion = useMemo(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  const transitionDuration = prefersReducedMotion ? 0 : 720; // 720ms deliberate luxury motion

  const goTo = useCallback(
    (targetIdx: number) => {
      if (isAnimating) return;
      if (targetIdx < 0 || targetIdx >= total) return;
      if (targetIdx === activeIndex) return;

      setIsAnimating(true);
      setActiveIndex(targetIdx);

      setTimeout(() => {
        setIsAnimating(false);
      }, transitionDuration + 30);
    },
    [activeIndex, isAnimating, total, transitionDuration]
  );

  const handlePrev = useCallback(() => {
    if (activeIndex > 0) goTo(activeIndex - 1);
  }, [activeIndex, goTo]);

  const handleNext = useCallback(() => {
    if (activeIndex < total - 1) goTo(activeIndex + 1);
  }, [activeIndex, total, goTo]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!stageRef.current) return;
      const rect = stageRef.current.getBoundingClientRect();
      const isInView = rect.top < window.innerHeight && rect.bottom > 0;
      if (!isInView) return;

      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handlePrev, handleNext]);

  // Horizontal wheel / trackpad gestures
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;

    const handleWheel = (e: WheelEvent) => {
      const isHorizontal = Math.abs(e.deltaX) > Math.abs(e.deltaY) * 0.6;
      if (!isHorizontal || Math.abs(e.deltaX) < 3) return;

      e.preventDefault();

      wheelAccum.current += e.deltaX;

      if (wheelTimeout.current) clearTimeout(wheelTimeout.current);
      wheelTimeout.current = setTimeout(() => {
        wheelAccum.current = 0;
      }, 200);

      const threshold = 70;
      if (wheelAccum.current > threshold) {
        handleNext();
        wheelAccum.current = 0;
      } else if (wheelAccum.current < -threshold) {
        handlePrev();
        wheelAccum.current = 0;
      }
    };

    el.addEventListener('wheel', handleWheel, { passive: false });
    return () => el.removeEventListener('wheel', handleWheel);
  }, [handlePrev, handleNext]);

  // Touch swipe handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
    touchEndX.current = null;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) return;
    const distance = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 50;

    if (distance > minSwipeDistance) {
      handleNext();
    } else if (distance < -minSwipeDistance) {
      handlePrev();
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <section className="history-editorial-section" aria-label="The History of Inkspyra Industries">
      {/* Top Header Row — Left Heading + Upper-Right Slider Navigation Controls */}
      <div className="history-editorial-top-row">
        <h2 className="history-editorial-title">HISTORY OF INKSPYRA</h2>

        {/* Slider Navigation Arrows — Positioned Outside at Upper-Right Corner */}
        <div className="history-external-nav" aria-label="Slider navigation">
          <button
            onClick={handlePrev}
            className="history-nav-btn"
            aria-label="Previous milestone"
            disabled={activeIndex === 0}
          >
            <ChevronLeft size={20} strokeWidth={1.5} />
          </button>
          <button
            onClick={handleNext}
            className="history-nav-btn"
            aria-label="Next milestone"
            disabled={activeIndex === total - 1}
          >
            <ChevronRight size={20} strokeWidth={1.5} />
          </button>
        </div>
      </div>

      {/* Horizontal Slider Stage */}
      <div
        ref={stageRef}
        className="history-slider-stage"
        style={{ '--active-idx': activeIndex } as React.CSSProperties}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        role="region"
        aria-roledescription="carousel"
        aria-label="Historical milestones carousel"
      >
        {/* Sliding Track containing all slides side-by-side */}
        <div className="history-slider-track">
          {MILESTONES.map((milestone, idx) => {
            const isCurrent = idx === activeIndex;
            const isNextPreview = idx === activeIndex + 1;
            const isPrevPreview = idx === activeIndex - 1;

            return (
              <div
                className={`history-slide ${isCurrent ? 'slide-active' : ''} ${
                  isNextPreview ? 'slide-next-peek' : ''
                } ${isPrevPreview ? 'slide-prev-peek' : ''}`}
                key={milestone.id}
                aria-hidden={!isCurrent}
                onClick={() => {
                  if (isNextPreview) handleNext();
                  if (isPrevPreview) handlePrev();
                }}
              >
                {/* LEFT PANEL — Full-Bleed Photograph */}
                <div className="history-slide-photo-panel">
                  <img
                    src={milestone.imageSrc}
                    alt={milestone.imageAlt}
                    width={960}
                    height={640}
                    loading={idx === 0 ? 'eager' : 'lazy'}
                    className="history-slide-photo"
                  />
                  {isNextPreview && (
                    <div className="history-peek-overlay" aria-hidden="true">
                      <span className="history-peek-hint">Next</span>
                    </div>
                  )}
                </div>

                {/* RIGHT PANEL — Content on Light Background */}
                <div className="history-slide-content-panel">
                  {/* Content Block — Navigation controls moved outside */}
                  <div className="history-slide-content-inner">
                    <span className="history-slide-step-label">{milestone.year}</span>
                    <h3 className="history-slide-heading">{milestone.title}</h3>
                    <p className="history-slide-description">{milestone.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
