import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, AlertCircle, UploadCloud, Shield, Check, RefreshCw } from 'lucide-react';

interface B2BInquiryFormProps {
  initialCategory?: string;
}

interface FormData {
  fullName: string;
  companyName: string;
  workEmail: string;
  phone: string;
  category: string;
  quantity: string;
  deliveryDate: string;
  requirements: string;
  fileName?: string;
}

interface FormErrors {
  fullName?: string;
  companyName?: string;
  workEmail?: string;
  phone?: string;
  category?: string;
  quantity?: string;
}

export const B2BInquiryForm: React.FC<B2BInquiryFormProps> = ({ initialCategory = '' }) => {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    companyName: '',
    workEmail: '',
    phone: '',
    category: initialCategory || '',
    quantity: '',
    deliveryDate: '',
    requirements: '',
    fileName: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [referenceId, setReferenceId] = useState('');

  // Synchronize initial category if passed from parent
  React.useEffect(() => {
    if (initialCategory) {
      setFormData((prev) => ({ ...prev, category: initialCategory }));
    }
  }, [initialCategory]);

  const validateField = (name: string, value: string): string | undefined => {
    switch (name) {
      case 'fullName':
        if (!value.trim()) return 'Full Name is required.';
        if (value.trim().length < 2) return 'Please enter at least 2 characters.';
        return undefined;
      case 'companyName':
        if (!value.trim()) return 'Company or Brand Name is required.';
        return undefined;
      case 'workEmail':
        if (!value.trim()) return 'Work Email is required.';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Please enter a valid email address.';
        return undefined;
      case 'phone':
        if (!value.trim()) return 'Phone or WhatsApp number is required.';
        if (!/^[\d\s+\-()]{7,18}$/.test(value)) return 'Please enter a valid phone number (min 7 digits).';
        return undefined;
      case 'category':
        if (!value) return 'Please select a product category.';
        return undefined;
      case 'quantity':
        if (!value) return 'Please select an estimated quantity.';
        return undefined;
      default:
        return undefined;
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (touched[name]) {
      const error = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        alert('File size exceeds the 10MB limit.');
        return;
      }
      setFormData((prev) => ({ ...prev, fileName: file.name }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all fields
    const validationErrors: FormErrors = {};
    const fieldsToValidate: (keyof FormErrors)[] = ['fullName', 'companyName', 'workEmail', 'phone', 'category', 'quantity'];

    fieldsToValidate.forEach((field) => {
      const error = validateField(field, formData[field]);
      if (error) {
        validationErrors[field] = error;
      }
    });

    setTouched({
      fullName: true,
      companyName: true,
      workEmail: true,
      phone: true,
      category: true,
      quantity: true,
    });

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      // Focus first error field
      const firstErrorKey = Object.keys(validationErrors)[0];
      const element = document.getElementById(`inquiry-${firstErrorKey}`);
      if (element) element.focus();
      return;
    }

    setIsSubmitting(true);

    // Simulate backend submission cleanly with generated B2B quote ticket
    setTimeout(() => {
      const genId = 'INK-' + Math.floor(100000 + Math.random() * 900000);
      setReferenceId(genId);
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 900);
  };

  const resetForm = () => {
    setFormData({
      fullName: '',
      companyName: '',
      workEmail: '',
      phone: '',
      category: '',
      quantity: '',
      deliveryDate: '',
      requirements: '',
      fileName: '',
    });
    setErrors({});
    setTouched({});
    setIsSubmitted(false);
  };

  return (
    <section className="section section-soft inquiry-section" id="contact">
      <div className="container">
        <div className="inquiry-grid">
          {/* Left Column: Context, Trust Points, Showcase */}
          <div className="inquiry-context">
            <span className="eyebrow">INQUIRE NOW</span>
            <h2 className="section-title">Let's Create Something Exceptional</h2>
            <p className="inquiry-supporting-text">
              Tell us about your project, quantity, customization requirements, and expected timeline. Our engineering and design team will review your brief and prepare a comprehensive manufacturing proposal.
            </p>

            <div className="inquiry-trust-list">
              <div className="inquiry-trust-item">
                <div className="inquiry-trust-icon">
                  <Check size={16} />
                </div>
                <div>
                  <strong>Custom Manufacturing</strong>
                  <span>Engineered to your brand's specifications</span>
                </div>
              </div>
              <div className="inquiry-trust-item">
                <div className="inquiry-trust-icon">
                  <Check size={16} />
                </div>
                <div>
                  <strong>Bulk Order Inquiries</strong>
                  <span>Volume manufacturing rates for registered businesses</span>
                </div>
              </div>
              <div className="inquiry-trust-item">
                <div className="inquiry-trust-icon">
                  <Check size={16} />
                </div>
                <div>
                  <strong>Personalized Solutions</strong>
                  <span>Laser engraving, acrylic bending, luxury box inserts</span>
                </div>
              </div>
            </div>

            <div className="inquiry-showcase-card card-premium">
              <img
                src="/images/hero-luxury-boxes.jpg"
                alt="Luxury packaging sample arrangement"
                width={500}
                height={320}
                loading="lazy"
                className="inquiry-showcase-img"
              />
              <div className="inquiry-showcase-overlay">
                <Shield size={16} className="inquiry-shield-icon" />
                <span>NDA &amp; Confidential B2B Quotations</span>
              </div>
            </div>
          </div>

          {/* Right Column: Inquiry Form Card */}
          <div className="inquiry-form-card card-premium">
            {isSubmitted ? (
              <div className="inquiry-success-view">
                <div className="inquiry-success-icon-wrap">
                  <CheckCircle2 size={48} className="inquiry-success-icon" />
                </div>
                <h3 className="inquiry-success-title">Inquiry Submitted Successfully</h3>
                <p className="inquiry-success-desc">
                  Thank you, <strong>{formData.fullName}</strong>. We have received your inquiry for{' '}
                  <strong>{formData.companyName}</strong>.
                </p>

                <div className="inquiry-ticket-box">
                  <span className="ticket-label">Inquiry Reference Number</span>
                  <span className="ticket-number">{referenceId}</span>
                  <p className="ticket-note">
                    Category: {formData.category} | Batch: {formData.quantity}
                  </p>
                </div>

                <div className="inquiry-next-steps">
                  <p>
                    <strong>What happens next:</strong>
                  </p>
                  <ul>
                    <li>Our production desk reviews technical specifications.</li>
                    <li>We will reach out to <strong>{formData.workEmail}</strong> or via WhatsApp at <strong>{formData.phone}</strong>.</li>
                    <li>Digital proof or material recommendation will be provided.</li>
                  </ul>
                </div>

                <div className="inquiry-success-actions">
                  <button
                    type="button"
                    onClick={resetForm}
                    className="btn btn-secondary"
                  >
                    <RefreshCw size={15} />
                    <span>Submit Another Inquiry</span>
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="inquiry-form" id="b2b-inquiry-form">
                <div className="form-header">
                  <h3 className="form-title">Submit Your B2B Inquiry</h3>
                  <p className="form-subtitle">Complete the details below for a prompt quotation.</p>
                </div>

                <div className="form-grid-2">
                  {/* Full Name */}
                  <div className="form-group">
                    <label htmlFor="inquiry-fullName" className="form-label">
                      Full Name <span className="required-star">*</span>
                    </label>
                    <input
                      type="text"
                      id="inquiry-fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="e.g. Vikram Mehta"
                      className={`form-input ${touched.fullName && errors.fullName ? 'form-input-error' : ''}`}
                      required
                    />
                    {touched.fullName && errors.fullName && (
                      <span className="form-error-msg">
                        <AlertCircle size={13} /> {errors.fullName}
                      </span>
                    )}
                  </div>

                  {/* Company Name */}
                  <div className="form-group">
                    <label htmlFor="inquiry-companyName" className="form-label">
                      Company / Brand Name <span className="required-star">*</span>
                    </label>
                    <input
                      type="text"
                      id="inquiry-companyName"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="e.g. Elegance Events Pvt Ltd"
                      className={`form-input ${touched.companyName && errors.companyName ? 'form-input-error' : ''}`}
                      required
                    />
                    {touched.companyName && errors.companyName && (
                      <span className="form-error-msg">
                        <AlertCircle size={13} /> {errors.companyName}
                      </span>
                    )}
                  </div>
                </div>

                <div className="form-grid-2">
                  {/* Work Email */}
                  <div className="form-group">
                    <label htmlFor="inquiry-workEmail" className="form-label">
                      Work Email <span className="required-star">*</span>
                    </label>
                    <input
                      type="email"
                      id="inquiry-workEmail"
                      name="workEmail"
                      value={formData.workEmail}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="vikram@company.com"
                      className={`form-input ${touched.workEmail && errors.workEmail ? 'form-input-error' : ''}`}
                      required
                    />
                    {touched.workEmail && errors.workEmail && (
                      <span className="form-error-msg">
                        <AlertCircle size={13} /> {errors.workEmail}
                      </span>
                    )}
                  </div>

                  {/* Phone / WhatsApp */}
                  <div className="form-group">
                    <label htmlFor="inquiry-phone" className="form-label">
                      Phone / WhatsApp Number <span className="required-star">*</span>
                    </label>
                    <input
                      type="tel"
                      id="inquiry-phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="+91 98765 43210"
                      className={`form-input ${touched.phone && errors.phone ? 'form-input-error' : ''}`}
                      required
                    />
                    {touched.phone && errors.phone && (
                      <span className="form-error-msg">
                        <AlertCircle size={13} /> {errors.phone}
                      </span>
                    )}
                  </div>
                </div>

                <div className="form-grid-2">
                  {/* Product Category */}
                  <div className="form-group">
                    <label htmlFor="inquiry-category" className="form-label">
                      Product Category <span className="required-star">*</span>
                    </label>
                    <select
                      id="inquiry-category"
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`form-select ${touched.category && errors.category ? 'form-input-error' : ''}`}
                      required
                    >
                      <option value="">Select Category</option>
                      {formData.category &&
                        ![
                          'Luxury Wedding Boxes',
                          'Festive Packaging',
                          'Corporate Hampers',
                          'Acrylic Products',
                          'Signage & Displays',
                          'Custom MDF Products',
                          'Other / Custom Project',
                        ].includes(formData.category) && (
                          <option value={formData.category}>{formData.category}</option>
                        )}
                      <option value="Luxury Wedding Boxes">Luxury Wedding Boxes</option>
                      <option value="Festive Packaging">Festive Packaging</option>
                      <option value="Corporate Hampers">Corporate Hampers</option>
                      <option value="Acrylic Products">Acrylic Products</option>
                      <option value="Signage & Displays">Signage &amp; Displays</option>
                      <option value="Custom MDF Products">Custom MDF Products</option>
                      <option value="Other / Custom Project">Other / Custom Project</option>
                    </select>
                    {touched.category && errors.category && (
                      <span className="form-error-msg">
                        <AlertCircle size={13} /> {errors.category}
                      </span>
                    )}
                  </div>

                  {/* Estimated Quantity */}
                  <div className="form-group">
                    <label htmlFor="inquiry-quantity" className="form-label">
                      Estimated Quantity <span className="required-star">*</span>
                    </label>
                    <select
                      id="inquiry-quantity"
                      name="quantity"
                      value={formData.quantity}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`form-select ${touched.quantity && errors.quantity ? 'form-input-error' : ''}`}
                      required
                    >
                      <option value="">Select Quantity Range</option>
                      <option value="50–100 units">50–100 units</option>
                      <option value="101–500 units">101–500 units</option>
                      <option value="501–1,000 units">501–1,000 units</option>
                      <option value="1,000+ units">1,000+ units</option>
                      <option value="Not decided yet">Not decided yet</option>
                    </select>
                    {touched.quantity && errors.quantity && (
                      <span className="form-error-msg">
                        <AlertCircle size={13} /> {errors.quantity}
                      </span>
                    )}
                  </div>
                </div>

                {/* Delivery Date */}
                <div className="form-group">
                  <label htmlFor="inquiry-deliveryDate" className="form-label">
                    Required Delivery Date <span className="form-label-optional">(Optional)</span>
                  </label>
                  <input
                    type="date"
                    id="inquiry-deliveryDate"
                    name="deliveryDate"
                    value={formData.deliveryDate}
                    onChange={handleChange}
                    className="form-input"
                  />
                </div>

                {/* Requirements */}
                <div className="form-group">
                  <label htmlFor="inquiry-requirements" className="form-label">
                    Customization Requirements &amp; Project Details
                  </label>
                  <textarea
                    id="inquiry-requirements"
                    name="requirements"
                    rows={3}
                    value={formData.requirements}
                    onChange={handleChange}
                    placeholder="Describe dimensions, branding details, box compartments, material preference, or special packaging needs..."
                    className="form-textarea"
                  />
                </div>

                {/* File Upload Reference */}
                <div className="form-group">
                  <label htmlFor="inquiry-file" className="form-label">
                    Artwork or Reference File <span className="form-label-optional">(Optional, Max 10MB)</span>
                  </label>
                  <div className="file-upload-box">
                    <input
                      type="file"
                      id="inquiry-file"
                      onChange={handleFileUpload}
                      accept=".pdf,.ai,.cdr,.dxf,.png,.jpg,.jpeg,.svg"
                      className="file-input-hidden"
                    />
                    <label htmlFor="inquiry-file" className="file-upload-label">
                      <UploadCloud size={20} className="file-upload-icon" />
                      <div>
                        {formData.fileName ? (
                          <span className="file-selected-name">{formData.fileName}</span>
                        ) : (
                          <span>Click to upload design files (PDF, AI, CDR, DXF, JPG)</span>
                        )}
                      </div>
                    </label>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="form-action-row">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn btn-primary form-submit-btn"
                    id="submit-b2b-inquiry-btn"
                  >
                    {isSubmitting ? (
                      <span>Validating &amp; Submitting...</span>
                    ) : (
                      <>
                        <span>Request My B2B Quote</span>
                        <ArrowRight size={16} />
                      </>
                    )}
                  </button>
                </div>

                <p className="form-privacy-notice">
                  Your information is kept strictly confidential and used solely for fulfilling your quotation request. No spam.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
