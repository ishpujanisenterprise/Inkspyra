import React, { useState } from 'react';
import { X, ArrowRight, CheckCircle2, Shield } from 'lucide-react';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  category?: string;
}

export const QuoteModal: React.FC<QuoteModalProps> = ({ isOpen, onClose, category = '' }) => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    category: category || 'Luxury Wedding Boxes',
    quantity: '101–500 units',
    notes: '',
  });

  const [submitted, setSubmitted] = useState(false);

  React.useEffect(() => {
    if (category) {
      setFormData((prev) => ({ ...prev, category }));
    }
  }, [category]);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSubmitted(false);
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleClose = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={handleClose}>
      <div
        className="modal-container card-premium"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-quote-title"
      >
        <button
          type="button"
          onClick={handleClose}
          className="modal-close-btn"
          aria-label="Close quote modal"
        >
          <X size={20} />
        </button>

        {submitted ? (
          <div className="modal-success-body">
            <CheckCircle2 size={44} className="modal-success-icon" />
            <h3 className="modal-title">Quote Request Received!</h3>
            <p className="modal-desc">
              Thank you for considering Inkspyra Industries. Our team is reviewing your requirements for{' '}
              <strong>{formData.category}</strong>. We will get back to you within 24 business hours at{' '}
              <strong>{formData.email}</strong>.
            </p>
            <button
              type="button"
              onClick={handleClose}
              className="btn btn-primary"
              style={{ marginTop: '1.25rem' }}
            >
              Close Window
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="modal-form">
            <span className="eyebrow">FAST B2B QUOTATION</span>
            <h3 className="modal-title" id="modal-quote-title">
              Request Project Estimate
            </h3>
            <p className="modal-subtitle">
              Get direct factory pricing, batch lead times, and customization specifications.
            </p>

            <div className="modal-form-grid">
              <div className="form-group">
                <label className="form-label">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="Your Name"
                  className="form-input"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Company Name *</label>
                <input
                  type="text"
                  required
                  placeholder="Company / Agency"
                  className="form-input"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                />
              </div>
            </div>

            <div className="modal-form-grid">
              <div className="form-group">
                <label className="form-label">Email Address *</label>
                <input
                  type="email"
                  required
                  placeholder="name@company.com"
                  className="form-input"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Phone / WhatsApp *</label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  className="form-input"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
            </div>

            <div className="modal-form-grid">
              <div className="form-group">
                <label className="form-label">Category</label>
                <select
                  className="form-select"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                >
                  <option value="Luxury Wedding Boxes">Luxury Wedding Boxes</option>
                  <option value="Festive Packaging">Festive Packaging</option>
                  <option value="Corporate Hampers">Corporate Hampers</option>
                  <option value="Acrylic Products">Acrylic Products</option>
                  <option value="Signage & Displays">Signage &amp; Displays</option>
                  <option value="Custom MDF Products">Custom MDF Products</option>
                  <option value="Other / Custom Project">Other / Custom Project</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Estimated Volume</label>
                <select
                  className="form-select"
                  value={formData.quantity}
                  onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                >
                  <option value="50–100 units">50–100 units</option>
                  <option value="101–500 units">101–500 units</option>
                  <option value="501–1,000 units">501–1,000 units</option>
                  <option value="1,000+ units">1,000+ units</option>
                  <option value="Not decided yet">Not decided yet</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Project Requirements (Optional)</label>
              <textarea
                rows={2}
                placeholder="Mention dimensions, materials, or special artwork requirements..."
                className="form-textarea"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              />
            </div>

            <div className="modal-footer">
              <div className="modal-privacy-tag">
                <Shield size={14} />
                <span>Confidential B2B Inquiry</span>
              </div>
              <button type="submit" className="btn btn-primary">
                <span>Submit Quote Request</span>
                <ArrowRight size={15} />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
