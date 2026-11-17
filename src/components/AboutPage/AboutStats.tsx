import React, { useState, useEffect, useRef } from 'react';

interface StatItem {
  id: string;
  target: number;
  suffix: string;
  label: string;
  formatCommas?: boolean;
}

const STATS_DATA: StatItem[] = [
  {
    id: 'exp',
    target: 8,
    suffix: '+',
    label: 'YEARS OF EXPERIENCE',
  },
  {
    id: 'projects',
    target: 10000,
    suffix: '+',
    label: 'PROJECTS COMPLETED',
    formatCommas: true,
  },
  {
    id: 'pieces',
    target: 500,
    suffix: '+',
    label: 'COMPANIES WORKED WITH',
  },
  {
    id: 'satisfaction',
    target: 98,
    suffix: '%',
    label: 'CUSTOMER SATISFACTION RATE',
  },
];

export const AboutStats: React.FC = () => {
  const [counts, setCounts] = useState<{ [key: string]: number }>({
    exp: 0,
    projects: 0,
    pieces: 0,
    satisfaction: 0,
  });
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Respect reduced-motion accessibility preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      setCounts({
        exp: 8,
        projects: 10000,
        pieces: 500,
        satisfaction: 98,
      });
      setHasAnimated(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            animateCounters();
            observer.disconnect();
          }
        });
      },
      { threshold: 0.25 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  const animateCounters = () => {
    const duration = 2000; // 2 seconds smooth count-up
    const startTime = performance.now();

    const frame = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic: decelerates gently towards the end
      const easeProgress = 1 - Math.pow(1 - progress, 3);

      const nextCounts: { [key: string]: number } = {};
      STATS_DATA.forEach((stat) => {
        nextCounts[stat.id] = Math.round(stat.target * easeProgress);
      });

      setCounts(nextCounts);

      if (progress < 1) {
        requestAnimationFrame(frame);
      } else {
        // Guarantee exact targets at end
        setCounts({
          exp: 8,
          projects: 10000,
          pieces: 500,
          satisfaction: 98,
        });
      }
    };

    requestAnimationFrame(frame);
  };

  const formatNumber = (num: number, withCommas?: boolean) => {
    if (withCommas) {
      return num.toLocaleString();
    }
    return num.toString();
  };

  return (
    <section
      ref={sectionRef}
      className="about-stats-section"
      aria-label="Company Statistics & Track Record"
    >
      <div className="about-stats-container">
        <div className="about-stats-grid">
          {STATS_DATA.map((item) => (
            <div key={item.id} className="about-stat-cell">
              <div className="about-stat-number-wrap">
                <span className="about-stat-number">
                  {formatNumber(counts[item.id], item.formatCommas)}
                </span>
                <span className="about-stat-suffix">{item.suffix}</span>
              </div>
              <p className="about-stat-label">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

