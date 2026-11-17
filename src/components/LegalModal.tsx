import React from 'react';
import { X, Shield, FileText } from 'lucide-react';

interface LegalModalProps {
  type: 'privacy' | 'terms' | null;
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({ type, onClose }) => {
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (type) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [type, onClose]);

  if (!type) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal-container legal-modal-container card-premium"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <button
          type="button"
          onClick={onClose}
          className="modal-close-btn"
          aria-label="Close legal modal"
        >
          <X size={20} />
        </button>

        <div className="legal-modal-header">
          {type === 'privacy' ? <Shield size={24} className="legal-icon" /> : <FileText size={24} className="legal-icon" />}
          <h3 className="modal-title">
            {type === 'privacy' ? 'Privacy Policy' : 'Terms & Conditions'}
          </h3>
        </div>

        <div className="legal-modal-body">
          {type === 'privacy' ? (
            <>
              <p>
                <strong>Effective Date:</strong> {new Date().getFullYear()}
              </p>
              <h4>1. Information Collection</h4>
              <p>
                Inkspyra Industries collects contact information (name, company name, corporate email address, and telephone number) submitted voluntarily via our B2B quotation inquiry forms solely for preparing commercial estimates and coordinating custom manufacturing projects.
              </p>
              <h4>2. Non-Disclosure &amp; Confidentiality</h4>
              <p>
                All proprietary design files, brand vectors, packaging blueprints, and dimensions uploaded or transmitted to Inkspyra Industries are treated with strict commercial confidentiality. We do not sell, rent, or transfer customer specifications to third parties.
              </p>
              <h4>3. Data Security</h4>
              <p>
                We apply standard administrative and technical protocols to protect your submitted business information against unauthorized access, alteration, or disclosure.
              </p>
              <h4>4. Inquiries</h4>
              <p>
                For privacy or data inquiries, contact our desk at <strong>info@inkspyraindustries.com</strong>.
              </p>
            </>
          ) : (
            <>
              <p>
                <strong>Effective Date:</strong> {new Date().getFullYear()}
              </p>
              <h4>1. Quotation &amp; Project Estimates</h4>
              <p>
                All estimates and quotations issued by Inkspyra Industries are based on confirmed raw material specifications, batch quantities, tooling setups, and delivery destinations.
              </p>
              <h4>2. Custom Manufacturing &amp; Tolerances</h4>
              <p>
                Laser cutting, acrylic fabrication, and rigid box assembly are carried out within industry-standard manufacturing tolerances. Pre-production physical samples or digital approval proofs are coordinated before bulk batch runs.
              </p>
              <h4>3. Payment &amp; Production Schedules</h4>
              <p>
                Production commences upon confirmation of approved artwork and agreed order commercial terms. Delivery timelines reflect factory scheduling and transit arrangements agreed in the purchase contract.
              </p>
              <h4>4. Contact</h4>
              <p>
                For business terms queries, contact our operations desk at <strong>info@inkspyraindustries.com</strong>.
              </p>
            </>
          )}
        </div>

        <div className="legal-modal-footer">
          <button type="button" onClick={onClose} className="btn btn-secondary">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
