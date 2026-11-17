import { useState, useEffect } from 'react';
import { GlobalFixedBackground } from './components/GlobalFixedBackground';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ManufacturingCategories } from './components/ManufacturingCategories';
import { AcrylicCreations } from './components/AcrylicCreations';
import { HomeStats } from './components/HomeStats';
import { ManufacturingCapabilities } from './components/ManufacturingCapabilities';
import { PremiumGiftingShowcase } from './components/PremiumGiftingShowcase';
import { ClientIndustries } from './components/ClientIndustries';
import { WhyChooseUs } from './components/WhyChooseUs';
import { B2BInquiryForm } from './components/B2BInquiryForm';
import { Footer } from './components/Footer';
import { AboutPage } from './components/AboutPage/AboutPage';
import { CatalogPage } from './components/CatalogPage/CatalogPage';
import { QuoteModal } from './components/QuoteModal';
import { LegalModal } from './components/LegalModal';
import { WhatsAppContact } from './components/WhatsAppContact';
import './App.css';

export function normalizeRoutePath(rawPath: string): string {
  if (!rawPath) return '/';
  const pathWithoutQuery = rawPath.split('?')[0].split('#')[0];
  const trimmed = pathWithoutQuery.replace(/\/+$/, '') || '/';
  if (trimmed === '/catalog' || trimmed.startsWith('/catalog/')) {
    return '/catalog';
  }
  if (trimmed === '/about' || trimmed.startsWith('/about/')) {
    return '/about';
  }
  return '/';
}

export function App() {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return normalizeRoutePath(window.location.pathname);
    }
    return '/';
  });

  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('Luxury Wedding Boxes');
  const [legalModalType, setLegalModalType] = useState<'privacy' | 'terms' | null>(null);

  // Clean up any malformed duplicate route paths in address bar on initial load
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const raw = window.location.pathname;
      if (raw.startsWith('/catalog/') && raw !== '/catalog') {
        const cleanUrl = '/catalog' + (window.location.search || '') + (window.location.hash || '');
        window.history.replaceState({}, '', cleanUrl);
      } else if (raw.startsWith('/about/') && raw !== '/about') {
        const cleanUrl = '/about' + (window.location.search || '') + (window.location.hash || '');
        window.history.replaceState({}, '', cleanUrl);
      }
    }
  }, []);

  // Sync with browser back/forward buttons & initial hash links
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(normalizeRoutePath(window.location.pathname));
    };

    if (window.location.hash) {
      const targetId = window.location.hash.replace('#', '');
      const scrollToHash = () => {
        const el = document.getElementById(targetId);
        if (el) {
          el.scrollIntoView({ behavior: 'instant' as ScrollBehavior });
        }
      };
      window.setTimeout(scrollToHash, 150);
      window.addEventListener('load', scrollToHash, { once: true });
    }

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleNavigate = (path: string, hash?: string) => {
    const [rawPath, targetSearch] = path.split('?');
    const targetPathname = normalizeRoutePath(rawPath);

    // Strictly validate hash: only accept if it begins with '#'
    const validHash = hash && hash.startsWith('#') ? hash : '';
    const queryString = targetSearch ? `?${targetSearch}` : '';

    const fullUrl = targetPathname === '/'
      ? (validHash ? `/${validHash}` : (queryString ? `/${queryString}` : '/'))
      : `${targetPathname}${queryString}${validHash}`;

    if (targetPathname === currentPath) {
      if (targetSearch) {
        window.history.pushState({}, '', fullUrl);
        window.dispatchEvent(new Event('popstate'));
        return;
      }
      if (validHash && validHash !== '#home') {
        const el = document.getElementById(validHash.replace('#', ''));
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      return;
    }

    window.history.pushState({}, '', fullUrl);
    setCurrentPath(targetPathname);
    window.dispatchEvent(new Event('popstate'));

    if (validHash && validHash !== '#home') {
      setTimeout(() => {
        const el = document.getElementById(validHash.replace('#', ''));
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        } else {
          window.scrollTo({ top: 0, behavior: 'instant' });
        }
      }, 70);
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  };

  const handleOpenQuote = (category?: string) => {
    if (category) {
      setSelectedCategory(category);
    }
    setQuoteModalOpen(true);
  };

  const handleScrollToForm = (category?: string) => {
    if (currentPath !== '/') {
      handleNavigate('/', '#contact');
      if (category) setSelectedCategory(category);
      return;
    }

    if (category) {
      setSelectedCategory(category);
    }
    const formElement = document.getElementById('contact');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // IntersectionObserver for homepage section scroll reveals
  useEffect(() => {
    if (currentPath !== '/') return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );

    const sectionElements = document.querySelectorAll(
      '#home, #categories, #acrylic, #manufacturing, #process, #industries, #why-us, #contact'
    );
    sectionElements.forEach((sec) => observer.observe(sec));

    return () => observer.disconnect();
  }, [currentPath]);

  return (
    <div className="app-shell">
      {/* 0. Global Fixed Background Layer (for Homepage) */}
      {currentPath === '/' && <GlobalFixedBackground />}

      {/* 1. Global Navigation */}
      <Navbar
        onOpenQuote={handleOpenQuote}
        currentPath={currentPath}
        onNavigate={handleNavigate}
      />

      {/* 2. Page Router View */}
      {currentPath === '/catalog' ? (
        <main id="main-content" className="catalog-route-main">
          <CatalogPage
            onOpenQuote={handleOpenQuote}
            onNavigate={handleNavigate}
            onOpenPrivacy={() => setLegalModalType('privacy')}
            onOpenTerms={() => setLegalModalType('terms')}
          />
        </main>
      ) : currentPath === '/about' ? (
        <main id="main-content" className="about-route-main">
          <AboutPage
            onOpenQuote={handleOpenQuote}
            onNavigate={handleNavigate}
            onOpenPrivacy={() => setLegalModalType('privacy')}
            onOpenTerms={() => setLegalModalType('terms')}
          />
        </main>
      ) : (
        <main id="main-content">
          {/* Pinned Stationary Hero Section */}
          <HeroSection onOpenQuote={handleOpenQuote} onNavigate={handleNavigate} />

          {/* Stacking Content Layer (Smoothly scrolls up and covers the pinned hero) */}
          <div className="content-stack-flow">
            {/* Our Manufacturing Categories */}
            <ManufacturingCategories
              onSelectCategory={handleScrollToForm}
              onNavigate={handleNavigate}
            />

            {/* Custom Acrylic Creations */}
            <AcrylicCreations
              onSelectProduct={handleScrollToForm}
              onNavigate={handleNavigate}
            />

            {/* Key Metrics & Statistics Section (Following Image 1) */}
            <HomeStats />

            {/* In-House Precision Manufacturing */}
            <ManufacturingCapabilities onBookOrder={() => handleScrollToForm('In-House Manufacturing')} />

            {/* Premium Gifting Showcase */}
            <PremiumGiftingShowcase onExploreCollection={() => {
              handleNavigate('/catalog?category=corporate-gifting');
            }} />

            {/* Who We Work With */}
            <ClientIndustries onSelectIndustry={(name) => handleScrollToForm(`Industry: ${name}`)} />

            {/* Why Choose Inkspyra Industries */}
            <WhyChooseUs />

            {/* Final Conversion Section: B2B Inquiry */}
            <B2BInquiryForm initialCategory={selectedCategory} />

            {/* Global Footer on Homepage */}
            <Footer
              onOpenPrivacy={() => setLegalModalType('privacy')}
              onOpenTerms={() => setLegalModalType('terms')}
              onNavigate={handleNavigate}
            />
          </div>
        </main>
      )}

      {/* Modals & Floating Quick Actions */}
      <QuoteModal
        isOpen={quoteModalOpen}
        onClose={() => setQuoteModalOpen(false)}
        category={selectedCategory}
      />

      <LegalModal
        type={legalModalType}
        onClose={() => setLegalModalType(null)}
      />

      <WhatsAppContact phoneNumber="+919876543210" />
    </div>
  );
}

export default App;
