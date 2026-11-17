import React, { useEffect, useRef, useState } from 'react';
import { Gift, Briefcase, Layers, Package, ArrowRight } from 'lucide-react';

interface ManufacturingCategoriesProps {
  onSelectCategory?: (category: string) => void;
  onNavigate?: (path: string, hash?: string) => void;
}

export const ManufacturingCategories: React.FC<ManufacturingCategoriesProps> = ({
  onSelectCategory,
  onNavigate,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const categories = [
    {
      id: 'wedding-packaging',
      catalogCategory: 'luxury-wedding',
      title: 'Luxury Wedding &\nFestive Packaging',
      titleDisplay: 'Luxury Wedding &\nFestive Packaging',
      description: 'Premium, custom-crafted boxes for weddings, celebrations, and festive gifting.',
      cta: 'Explore Wedding Boxes',
      image: '/images/cat-wedding.jpg',
      alt: 'Luxury wedding invitation gift boxes with intricate golden MDF laser-cut filigree',
      icon: Gift,
    },
    {
      id: 'corporate-gifts',
      catalogCategory: 'corporate-gifting',
      title: 'Corporate Hampers &\nExecutive Deskware',
      titleDisplay: 'Corporate Hampers &\nExecutive Deskware',
      description: 'Branded corporate hampers and premium deskware for lasting brand impressions.',
      cta: 'Explore Corporate Gifts',
      image: '/images/cat-corporate.jpg',
      alt: 'Branded navy corporate gift box with notebook, luxury pen, and premium deskware',
      icon: Briefcase,
    },
    {
      id: 'signage-displays',
      catalogCategory: 'displays-signage',
      title: 'Architectural\nSignage & Displays',
      titleDisplay: 'Architectural\nSignage & Displays',
      description: 'Custom signage, dimensional lettering, retail displays, and branded architectural elements.',
      cta: 'Explore Signage & Displays',
      image: '/images/cat-signage.jpg',
      alt: 'Architectural dimensional illuminated signage for corporate headquarters',
      icon: Layers,
    },
  ];

  const handleCardClick = (category: typeof categories[0]) => {
    if (onNavigate) {
      onNavigate(`/catalog?category=${category.catalogCategory}`);
    } else if (onSelectCategory) {
      onSelectCategory(category.title.replace('\n', ' '));
    }
  };

  return (
    <section 
      ref={sectionRef} 
      className={`categories-showcase-section ${isVisible ? 'is-visible' : ''}`} 
      id="categories"
    >
      {/* Background Subtle Elegant Guilloche / Wave Ribbons */}
      <div className="categories-bg-waves" aria-hidden="true">
        {/* Left flowing decorative wave lines */}
        <svg className="wave-svg wave-left" viewBox="0 0 500 450" fill="none" preserveAspectRatio="none">
          <path d="M-100,20 C100,80 180,240 280,320 C340,370 420,410 500,430" stroke="#8B1A2B" strokeWidth="1.2" strokeOpacity="0.16" />
          <path d="M-100,50 C90,110 170,260 270,340 C330,390 410,425 500,445" stroke="#8B1A2B" strokeWidth="1.1" strokeOpacity="0.12" />
          <path d="M-100,80 C80,140 160,280 260,360 C320,405 400,438 500,455" stroke="#8B1A2B" strokeWidth="0.9" strokeOpacity="0.09" />
          <path d="M-100,110 C70,170 150,300 250,375 C310,418 390,448 500,465" stroke="#8B1A2B" strokeWidth="0.8" strokeOpacity="0.06" />
          <path d="M-100,140 C60,200 140,320 240,390 C300,430 380,458 500,475" stroke="#8B1A2B" strokeWidth="0.7" strokeOpacity="0.04" />
        </svg>

        {/* Right flowing decorative wave lines */}
        <svg className="wave-svg wave-right" viewBox="0 0 500 450" fill="none" preserveAspectRatio="none">
          <path d="M600,20 C400,80 320,240 220,320 C160,370 80,410 0,430" stroke="#8B1A2B" strokeWidth="1.2" strokeOpacity="0.16" />
          <path d="M600,50 C410,110 330,260 230,340 C170,390 90,425 0,445" stroke="#8B1A2B" strokeWidth="1.1" strokeOpacity="0.12" />
          <path d="M600,80 C420,140 340,280 240,360 C180,405 100,438 0,455" stroke="#8B1A2B" strokeWidth="0.9" strokeOpacity="0.09" />
          <path d="M600,110 C430,170 350,300 250,375 C190,418 110,448 0,465" stroke="#8B1A2B" strokeWidth="0.8" strokeOpacity="0.06" />
          <path d="M600,140 C440,200 360,320 260,390 C200,430 120,458 0,475" stroke="#8B1A2B" strokeWidth="0.7" strokeOpacity="0.04" />
        </svg>
      </div>

      <div className="container showcase-container">
        {/* Section Header */}
        <div className="categories-header-block">
          {/* Eyebrow with flanking maroon horizontal lines */}
          <div className="categories-eyebrow-container">
            <span className="eyebrow-line"></span>
            <span className="categories-eyebrow-text">WHAT WE CREATE</span>
            <span className="eyebrow-line"></span>
          </div>

          {/* Main Title: "Our Manufacturing" in dark navy, "Categories" in deep maroon */}
          <h2 className="categories-primary-title">
            <span className="title-navy-part">Our Manufacturing </span>
            <span className="title-maroon-part">Categories</span>
          </h2>

          {/* Subtitle */}
          <p className="categories-lead-subtitle">
            Bespoke manufacturing solutions in premium packaging, corporate gifting,<br className="hide-on-mobile" />
            and architectural displays for businesses and brands.
          </p>

          {/* Decorative Divider: Outlined Packaging/Box Icon with flanking maroon lines */}
          <div className="categories-icon-divider">
            <span className="divider-maroon-line"></span>
            <div className="box-icon-container" aria-hidden="true">
              <Package size={22} color="#8B1A2B" strokeWidth={1.5} />
            </div>
            <span className="divider-maroon-line"></span>
          </div>
        </div>

        {/* 3 Categories Cards Grid */}
        <div className="categories-cards-grid">
          {categories.map((cat, index) => {
            return (
              <article 
                key={cat.id} 
                className="category-ref-card"
                style={{ animationDelay: `${index * 150}ms` }}
                onClick={() => handleCardClick(cat)}
                tabIndex={0}
                role="button"
                aria-label={`${cat.title.replace('\n', ' ')} - ${cat.cta}`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleCardClick(cat);
                  }
                }}
              >
                {/* Upper 48-50% Card Image Area */}
                <div className="ref-card-image-wrap">
                  <img
                    src={cat.image}
                    alt={cat.alt}
                    width={420}
                    height={280}
                    loading="lazy"
                    className="ref-card-img"
                  />

                  {/* Curved Maroon Wave-shaped Divider at Bottom of Image */}
                  <div className="ref-image-wave-divider" aria-hidden="true">
                    <svg 
                      viewBox="0 0 380 50" 
                      preserveAspectRatio="none" 
                      className="wave-divider-svg"
                    >
                      {/* Deep Maroon Elegant Swelling Wave on the Right Edge */}
                      <path 
                        d="M170 50 C230 46 270 24 330 20 C352 18 368 22 380 25 L380 50 Z" 
                        fill="#8B1A2B" 
                      />
                      {/* White bottom-edge blend for smooth integration with content */}
                      <path 
                        d="M0 50 L0 26 C40 26 80 32 130 36 C180 40 220 45 280 47 L380 48 L380 50 Z" 
                        fill="#FFFFFF" 
                      />
                    </svg>
                  </div>
                </div>

                {/* Content Area */}
                <div className="ref-card-body">
                  {/* Category Heading in Dark Navy */}
                  <h3 className="ref-card-title">
                    {cat.title.split('\n').map((line, i) => (
                      <React.Fragment key={i}>
                        {line}
                        {i < cat.title.split('\n').length - 1 && <br />}
                      </React.Fragment>
                    ))}
                  </h3>

                  {/* Short Thin Maroon Underline */}
                  <div className="ref-title-underline" aria-hidden="true"></div>

                  {/* Description */}
                  <p className="ref-card-description">
                    {cat.description}
                  </p>

                  {/* Card Footer: CTA and Maroon Corner Arrow */}
                  <div className="ref-card-footer">
                    <span className="ref-card-cta">
                      {cat.cta}
                      <ArrowRight size={14} className="cta-arrow-icon" />
                    </span>
                  </div>

                  {/* Maroon Curved Corner Shape at Bottom-Right with White Right Arrow */}
                  <div className="ref-maroon-arrow-corner" aria-hidden="true">
                    <ArrowRight size={16} color="#FFFFFF" strokeWidth={2.2} className="corner-arrow-svg" />
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
