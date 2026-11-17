import React, { useState, useEffect } from 'react';
import { BrandLogo } from './BrandLogo';
import { Menu, X, ArrowRight } from 'lucide-react';

interface NavbarProps {
  onOpenQuote: (category?: string) => void;
  currentPath?: string;
  onNavigate?: (path: string, hash?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenQuote,
  currentPath = '/',
  onNavigate,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isCatalog = currentPath === '/catalog' || currentPath.startsWith('/catalog');
  const isAbout = currentPath === '/about' || currentPath.startsWith('/about');
  const isHome = !isCatalog && !isAbout;

  const [activeSection, setActiveSection] = useState(
    isAbout ? 'about' : isCatalog ? 'catalog' : 'home'
  );

  useEffect(() => {
    if (currentPath === '/about' || currentPath.startsWith('/about')) {
      setActiveSection('about');
      return;
    }
    if (currentPath === '/catalog' || currentPath.startsWith('/catalog')) {
      setActiveSection('catalog');
      return;
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = ['home', 'categories', 'acrylic', 'contact'];
      const scrollPos = window.scrollY + 120;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentPath]);

  // EXACT APPROVED 5 NAVBAR LINKS IN ORDER
  const navLinks = [
    { label: 'Home', href: '#home', path: '/', id: 'home' },
    { label: 'Catalog', href: '/catalog', path: '/catalog', id: 'catalog' },
    { label: 'Acrylic Creations', href: '#acrylic', path: '/', id: 'acrylic' },
    { label: 'About Us', href: '/about', path: '/about', id: 'about' },
    { label: 'Contact', href: '#contact', path: '/', id: 'contact' },
  ];

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    path: string,
    href: string
  ) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    // ONLY pass hash if href actually starts with '#'
    const targetHash = href.startsWith('#') ? href : undefined;

    if (onNavigate) {
      onNavigate(path, targetHash);
    } else {
      if (path === '/about' || path === '/catalog') {
        window.location.href = path;
      } else {
        if (window.location.pathname !== '/') {
          window.location.href = `/${targetHash || ''}`;
        } else if (targetHash) {
          const target = document.querySelector(targetHash);
          if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
          }
        }
      }
    }
  };

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    if (onNavigate) {
      onNavigate('/', '#home');
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <header className={`navbar-header ${isScrolled ? 'navbar-scrolled' : ''}`}>
      <div className="navbar-container">
        {/* EXTREME LEFT: INKSPYRA INDUSTRIES Logo */}
        <div className="navbar-left-col">
          <BrandLogo onClick={handleLogoClick} />
        </div>

        {/* CENTRE NAVIGATION: Home | Catalog | Acrylic Creations | About Us | Contact */}
        <nav className="navbar-desktop-nav" aria-label="Main Navigation">
          <ul className="navbar-links-list">
            {navLinks.map((link) => {
              const isActive =
                link.id === 'catalog'
                  ? isCatalog
                  : link.id === 'about'
                  ? isAbout
                  : isHome && activeSection === link.id;

              return (
                <li key={link.id} className="navbar-item">
                  <a
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.path, link.href)}
                    className={`navbar-link ${isActive ? 'navbar-link-active' : ''}`}
                  >
                    {link.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* EXTREME RIGHT: Get B2B Quote → CTA Button */}
        <div className="navbar-right-col">
          <button
            onClick={() => onOpenQuote()}
            className="navbar-cta-btn"
            id="nav-get-quote-btn"
            aria-label="Get B2B Quote"
          >
            <span>Get B2B Quote</span>
            <ArrowRight size={15} className="navbar-cta-arrow" />
          </button>

          {/* Mobile Menu Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="navbar-mobile-toggle"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="navbar-mobile-menu">
          <div className="navbar-mobile-container">
            <ul className="navbar-mobile-links">
              {navLinks.map((link) => {
                const isActive =
                  link.id === 'catalog'
                    ? isCatalog
                    : link.id === 'about'
                    ? isAbout
                    : isHome && activeSection === link.id;

                return (
                  <li key={link.id}>
                    <a
                      href={link.href}
                      onClick={(e) => handleLinkClick(e, link.path, link.href)}
                      className={`navbar-mobile-link ${isActive ? 'navbar-mobile-link-active' : ''}`}
                    >
                      {link.label}
                    </a>
                  </li>
                );
              })}
            </ul>
            <div className="navbar-mobile-actions">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenQuote();
                }}
                className="navbar-cta-btn navbar-mobile-cta"
              >
                <span>Get B2B Quote</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
