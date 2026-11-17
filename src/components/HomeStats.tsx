import React, { useState, useEffect, useRef } from 'react';
import './HomeStats.css';

export interface StatItemConfig {
  id: string;
  target: number;
  suffix?: string;
  prefix?: string;
  label: string;
  formatCommas?: boolean;
}

export interface HomeStatsProps {
  yearsExperience?: number;
  projectsCompleted?: number;
  customerSatisfaction?: number;
  companiesWorkedWith?: number;
  customStats?: StatItemConfig[];
}

export const HomeStats: React.FC<HomeStatsProps> = ({
  yearsExperience = 8,
  projectsCompleted = 10000,
  customerSatisfaction = 98,
  companiesWorkedWith = 500,
  customStats,
}) => {
  const stats: StatItemConfig[] = customStats || [
    {
      id: 'years',
      target: yearsExperience,
      suffix: '+',
      label: 'YEARS OF EXPERIENCE',
    },
    {
      id: 'projects',
      target: projectsCompleted,
      suffix: '+',
      label: 'PROJECTS COMPLETED',
      formatCommas: true,
    },
    {
      id: 'satisfaction',
      target: customerSatisfaction,
      suffix: '%',
      label: 'CUSTOMER SATISFACTION',
    },
    {
      id: 'companies',
      target: companiesWorkedWith,
      suffix: '+',
      label: 'COMPANIES WORKED WITH',
    },
  ];

  const [counts, setCounts] = useState<{ [key: string]: number }>(() => {
    const initial: { [key: string]: number } = {};
    stats.forEach((s) => {
      initial[s.id] = 0;
    });
    return initial;
  });

  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Respect user's reduced-motion preference
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      const finalCounts: { [key: string]: number } = {};
      stats.forEach((s) => {
        finalCounts[s.id] = s.target;
      });
      setCounts(finalCounts);
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
  }, [hasAnimated, stats]);

  const animateCounters = () => {
    const duration = 2000; // 2000ms smooth count-up
    const startTime = performance.now();

    const frame = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Smooth cubic ease-out
      const easeProgress = 1 - Math.pow(1 - progress, 3);

      const nextCounts: { [key: string]: number } = {};
      stats.forEach((stat) => {
        nextCounts[stat.id] = Math.round(stat.target * easeProgress);
      });

      setCounts(nextCounts);

      if (progress < 1) {
        requestAnimationFrame(frame);
      } else {
        const finalCounts: { [key: string]: number } = {};
        stats.forEach((s) => {
          finalCounts[s.id] = s.target;
        });
        setCounts(finalCounts);
      }
    };

    requestAnimationFrame(frame);
  };

  const formatNumber = (stat: StatItemConfig, val: number) => {
    if (stat.formatCommas) {
      return val.toLocaleString('en-US');
    }
    return val.toString();
  };

  return (
    <section
      ref={sectionRef}
      className="home-stats-section"
      id="home-statistics"
      aria-label="Inkspyra Industries Statistics and Key Metrics"
    >
      <div className="container home-stats-container">
        <div className="home-stats-grid">
          {stats.map((stat) => (
            <div key={stat.id} className="home-stat-col">
              <div className="home-stat-value-wrap">
                <span className="home-stat-number">
                  {stat.prefix || ''}
                  {formatNumber(stat, counts[stat.id] ?? 0)}
                  <span className="home-stat-suffix">{stat.suffix || ''}</span>
                </span>
              </div>
              <span className="home-stat-label">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

