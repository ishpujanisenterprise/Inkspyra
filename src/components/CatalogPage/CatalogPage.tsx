import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, ChevronRight, MessageSquare } from 'lucide-react';
import { CATALOG_CATEGORIES, type CatalogCategory, type CatalogProduct } from './catalogData';
import { CategoryIcon } from './CategoryIcons';
import { Footer } from '../Footer';
import './CatalogPage.css';

interface CatalogPageProps {
  initialCategory?: string;
  onOpenQuote: (productOrCategory?: string) => void;
  onNavigate: (path: string, hash?: string) => void;
  onOpenPrivacy: () => void;
  onOpenTerms: () => void;
}

export const CatalogPage: React.FC<CatalogPageProps> = ({
  initialCategory,
  onOpenQuote,
  onNavigate,
  onOpenPrivacy,
  onOpenTerms,
}) => {
  // Determine active category from query parameter, prop, or default to first category ('luxury-wedding')
  const [activeCategoryId, setActiveCategoryId] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const queryCat = params.get('category');
      if (queryCat && CATALOG_CATEGORIES.some((c) => c.id === queryCat)) {
        return queryCat;
      }
    }
    if (initialCategory && CATALOG_CATEGORIES.some((c) => c.id === initialCategory)) {
      return initialCategory;
    }
    return 'luxury-wedding';
  });

  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const categoryContentRef = useRef<HTMLDivElement>(null);

  // Sync state with URL popstate / query changes
  useEffect(() => {
    const handleUrlChange = () => {
      const params = new URLSearchParams(window.location.search);
      const queryCat = params.get('category');
      if (queryCat && CATALOG_CATEGORIES.some((c) => c.id === queryCat)) {
        setActiveCategoryId(queryCat);
      }
    };

    window.addEventListener('popstate', handleUrlChange);
    return () => window.removeEventListener('popstate', handleUrlChange);
  }, []);

  // Update document title
  useEffect(() => {
    const currentCat = CATALOG_CATEGORIES.find((c) => c.id === activeCategoryId);
    const catName = currentCat ? currentCat.name : 'Collections';
    document.title = `${catName} — Product Catalog | INKSPYRA INDUSTRIES`;
  }, [activeCategoryId]);

  const activeCategory: CatalogCategory =
    CATALOG_CATEGORIES.find((c) => c.id === activeCategoryId) || CATALOG_CATEGORIES[0];

  const handleCategorySelect = (categoryId: string) => {
    if (categoryId === activeCategoryId) return;

    setIsTransitioning(true);
    setActiveCategoryId(categoryId);

    // Update URL query parameter without full reload
    const newUrl = `/catalog?category=${categoryId}`;
    window.history.pushState({ category: categoryId }, '', newUrl);

    setTimeout(() => {
      setIsTransitioning(false);
    }, 280);

    // Gentle scroll to category content if viewed below banner
    if (categoryContentRef.current) {
      const rect = categoryContentRef.current.getBoundingClientRect();
      if (rect.top < 120) {
        categoryContentRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const handleProductClick = (product: CatalogProduct) => {
    onOpenQuote(`${activeCategory.name} — ${product.title}`);
  };

  return (
    <div className="catalog-page-wrapper" id="catalog-top">
      {/* =========================================================================
          1. HERO BANNER — Wide, Luxurious Editorial Composition
          ========================================================================= */}
      <section className="catalog-hero-banner" aria-label="Catalog Overview Banner">
        <div className="catalog-hero-container">
          {/* Left Column: Editorial Proposition */}
          <div className="catalog-hero-content-col">
            <div className="catalog-eyebrow-container">
              <span className="catalog-eyebrow-line"></span>
              <span className="catalog-eyebrow-text">OUR CATALOG</span>
              <span className="catalog-eyebrow-line"></span>
            </div>

            <h1 className="catalog-hero-headline">
              <span className="hero-navy-title">Curated Collections </span>
              <span className="hero-maroon-italic">for Every Occasion</span>
            </h1>

            <p className="catalog-hero-description">
              Bespoke packaging, décor, and display solutions crafted with precision and premium materials.
            </p>
          </div>

          {/* Right Column: Photorealistic Luxury MDF Box Composition */}
          <div className="catalog-hero-visual-col">
            <div className="catalog-hero-image-wrap">
              <img
                src="/images/catalog-hero-box.jpg"
                alt="INKSPYRA luxury laser-cut MDF gift box with burgundy satin ribbon on silk velvet"
                className="catalog-hero-img"
                width={700}
                height={400}
                loading="eager"
              />
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          2. HORIZONTAL CATEGORY NAVIGATION — 7 Refined Tiles
          ========================================================================= */}
      <section className="catalog-category-nav-section" aria-label="Product Categories Navigation">
        <div className="catalog-container">
          <div className="category-tiles-grid" role="tablist" aria-label="Catalog Categories">
            {CATALOG_CATEGORIES.map((cat) => {
              const isActive = cat.id === activeCategoryId;
              return (
                <button
                  key={cat.id}
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`catalog-panel-${cat.id}`}
                  id={`catalog-tab-${cat.id}`}
                  className={`category-nav-tile ${isActive ? 'category-nav-tile-active' : ''}`}
                  onClick={() => handleCategorySelect(cat.id)}
                >
                  <div className="category-tile-icon-wrap" aria-hidden="true">
                    <CategoryIcon type={cat.iconType} size={28} />
                  </div>
                  <span className="category-tile-name">{cat.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================================
          3. BREADCRUMBS
          ========================================================================= */}
      <div className="catalog-breadcrumbs-bar">
        <div className="catalog-container">
          <nav className="catalog-breadcrumbs-nav" aria-label="Breadcrumb">
            <ol className="breadcrumbs-list">
              <li>
                <button
                  onClick={() => onNavigate('/')}
                  className="breadcrumb-link"
                  aria-label="Go to Homepage"
                >
                  Home
                </button>
              </li>
              <li className="breadcrumb-separator" aria-hidden="true">
                <ChevronRight size={14} />
              </li>
              <li>
                <button
                  onClick={() => handleCategorySelect('luxury-wedding')}
                  className="breadcrumb-link"
                >
                  Catalog
                </button>
              </li>
              <li className="breadcrumb-separator" aria-hidden="true">
                <ChevronRight size={14} />
              </li>
              <li className="breadcrumb-current" aria-current="page">
                {activeCategory.name}
              </li>
            </ol>
          </nav>
        </div>
      </div>

      {/* =========================================================================
          4. CATEGORY CONTENT & PRODUCT CARDS
          ========================================================================= */}
      <section
        ref={categoryContentRef}
        id={`catalog-panel-${activeCategory.id}`}
        role="tabpanel"
        aria-labelledby={`catalog-tab-${activeCategory.id}`}
        className={`catalog-content-section ${isTransitioning ? 'is-fading' : 'is-visible'}`}
      >
        <div className="catalog-container">
          {/* Category Header */}
          <div className="catalog-section-header">
            <div className="category-header-eyebrow-wrap">
              <span className="category-header-line"></span>
              <span className="category-header-eyebrow">{activeCategory.eyebrow}</span>
              <span className="category-header-line"></span>
            </div>

            <h2 className="catalog-section-title">
              <span className="title-prefix">{activeCategory.headingPrefix} </span>
              <span className="title-highlight">{activeCategory.headingHighlight}</span>
            </h2>

            <p className="catalog-section-description">
              {activeCategory.description}
            </p>
          </div>

          {/* Product Cards Grid: 3 columns desktop, 2 tablet, 1 mobile */}
          <div className="catalog-products-grid">
            {activeCategory.products.map((product, idx) => (
              <article
                key={product.id}
                className="catalog-product-card"
                style={{ animationDelay: `${idx * 60}ms` }}
                onClick={() => handleProductClick(product)}
                role="button"
                tabIndex={0}
                aria-label={`${product.title} — Request a B2B Quote`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleProductClick(product);
                  }
                }}
              >
                {/* Image Frame with Smooth Zoom on Hover */}
                <div className="product-card-image-wrap">
                  <img
                    src={product.image}
                    alt={product.alt}
                    width={480}
                    height={300}
                    loading={idx < 6 ? 'eager' : 'lazy'}
                    className="product-card-img"
                  />
                  {/* Subtle Top-Left Category Tag */}
                  <span className="product-category-tag">{product.categoryLabel}</span>
                </div>

                {/* Card Bottom Bar: Title & Circular Burgundy Arrow Button */}
                <div className="product-card-footer">
                  <div className="product-card-text">
                    <h3 className="product-card-title">{product.title}</h3>
                    <p className="product-card-description">{product.description}</p>
                  </div>
                  <div className="product-card-action-btn" aria-hidden="true">
                    <ArrowRight size={17} color="#FFFFFF" strokeWidth={2.2} />
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Category 7 Bonus: Custom Solutions Dedicated Enquiry Banner */}
          {activeCategory.id === 'custom-solutions' && (
            <div className="custom-project-inquiry-banner">
              <div className="custom-banner-content">
                <div className="custom-banner-icon-badge" aria-hidden="true">
                  <MessageSquare size={28} color="#D8A858" />
                </div>
                <div className="custom-banner-text">
                  <h3 className="custom-banner-heading">Have Something Specific in Mind?</h3>
                  <p className="custom-banner-sub">
                    Share your concept with us. Our team can help transform your requirements into a custom-made product.
                  </p>
                </div>
                <button
                  onClick={() => onOpenQuote('Custom Bespoke Project')}
                  className="custom-banner-cta-btn"
                  id="catalog-discuss-custom-btn"
                  aria-label="Discuss Your Custom Project"
                >
                  <span>Discuss Your Custom Project</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Global Footer */}
      <Footer
        onOpenPrivacy={onOpenPrivacy}
        onOpenTerms={onOpenTerms}
        onNavigate={onNavigate}
      />
    </div>
  );
};
