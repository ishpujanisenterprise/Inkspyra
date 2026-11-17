import React from 'react';
import { BrandLogo } from './BrandLogo';
import { Mail, Phone, MapPin, ArrowUp } from 'lucide-react';

interface FooterProps {
  onOpenPrivacy: () => void;
  onOpenTerms: () => void;
  onNavigate?: (path: string, hash?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenPrivacy, onOpenTerms, onNavigate }) => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string, hash: string) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(path, hash);
    } else {
      if (path === '/about') {
        window.location.href = '/about';
      } else {
        const el = document.getElementById(hash.replace('#', ''));
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  };

  return (
    <footer className="footer-wrap footer-navy-theme" aria-label="Inkspyra Industries Footer">
      <div className="container footer-container">
        <div className="footer-grid">
          {/* COLUMN 1 — INKSPYRA INDUSTRIES */}
          <div className="footer-col footer-col-brand">
            <BrandLogo
              light={true}
              onClick={(e) => {
                e.preventDefault();
                if (onNavigate) onNavigate('/', '#home');
                else window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
            <p className="footer-about-text">
              Precision-crafted MDF and acrylic solutions for luxury packaging, corporate gifting and bespoke brand experiences.
            </p>
            <div className="footer-social-links">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-icon"
                aria-label="Inkspyra on LinkedIn"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                </svg>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-icon"
                aria-label="Inkspyra on Instagram"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-icon"
                aria-label="Inkspyra on YouTube"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* COLUMN 2 — PRODUCTS */}
          <div className="footer-col">
            <h4 className="footer-heading">Products</h4>
            <ul className="footer-links-list">
              <li>
                <a href="/catalog?category=luxury-wedding" onClick={(e) => handleLinkClick(e, '/catalog?category=luxury-wedding', '')}>
                  Luxury Packaging
                </a>
              </li>
              <li>
                <a href="/catalog?category=corporate-gifting" onClick={(e) => handleLinkClick(e, '/catalog?category=corporate-gifting', '')}>
                  Corporate Gifting
                </a>
              </li>
              <li>
                <a href="/catalog?category=acrylic-creations" onClick={(e) => handleLinkClick(e, '/catalog?category=acrylic-creations', '')}>
                  Acrylic Creations
                </a>
              </li>
              <li>
                <a href="/catalog?category=displays-signage" onClick={(e) => handleLinkClick(e, '/catalog?category=displays-signage', '')}>
                  Architectural Displays
                </a>
              </li>
            </ul>
          </div>

          {/* COLUMN 3 — QUICK LINKS */}
          <div className="footer-col">
            <h4 className="footer-heading">Quick Links</h4>
            <ul className="footer-links-list">
              <li>
                <a href="#home" onClick={(e) => handleLinkClick(e, '/', '#home')}>
                  Home
                </a>
              </li>
              <li>
                <a href="/about" onClick={(e) => handleLinkClick(e, '/about', '')}>
                  About Us
                </a>
              </li>
              <li>
                <a href="/catalog" onClick={(e) => handleLinkClick(e, '/catalog', '')}>
                  Catalog &amp; Collections
                </a>
              </li>
              <li>
                <a href="#manufacturing" onClick={(e) => handleLinkClick(e, '/', '#manufacturing')}>
                  Manufacturing
                </a>
              </li>
              <li>
                <a href="#process" onClick={(e) => handleLinkClick(e, '/', '#process')}>
                  Processes
                </a>
              </li>
              <li>
                <a href="#why-us" onClick={(e) => handleLinkClick(e, '/', '#why-us')}>
                  Why Us
                </a>
              </li>
              <li>
                <a href="#contact" onClick={(e) => handleLinkClick(e, '/', '#contact')}>
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* COLUMN 4 — CONTACT */}
          <div className="footer-col footer-col-contact">
            <h4 className="footer-heading">Contact</h4>
            <ul className="footer-contact-list">
              <li className="footer-contact-item">
                <Phone size={16} className="footer-contact-icon" />
                <a href="tel:+919876543210">+91 98765 43210</a>
              </li>
              <li className="footer-contact-item">
                <Mail size={16} className="footer-contact-icon" />
                <a href="mailto:info@inkspyraindustries.com">info@inkspyraindustries.com</a>
              </li>
              <li className="footer-contact-item">
                <MapPin size={16} className="footer-contact-icon" />
                <span>New Delhi, India</span>
              </li>
            </ul>
            <div className="footer-badge-wrap">
              <span className="badge badge-gold">Pan-India B2B Dispatch</span>
            </div>
          </div>
        </div>

        {/* Sub-Footer Row */}
        <div className="footer-bottom-row">
          <p className="footer-copyright">
            &copy; {currentYear} INKSPYRA INDUSTRIES. All rights reserved.
          </p>

          <div className="footer-legal-links">
            <button type="button" onClick={onOpenPrivacy} className="footer-legal-btn">
              Privacy Policy
            </button>
            <span className="footer-legal-sep">|</span>
            <button type="button" onClick={onOpenTerms} className="footer-legal-btn">
              Terms &amp; Conditions
            </button>
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            className="footer-back-to-top"
            aria-label="Back to top of page"
          >
            <span>Top</span>
            <ArrowUp size={14} />
          </button>
        </div>
      </div>
    </footer>
  );
};
