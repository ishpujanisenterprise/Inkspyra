import React from 'react';
import { Palette, ShieldCheck, Box, MessageSquareCheck } from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const benefits = [
    {
      id: 'custom-design',
      title: 'Custom Design Support',
      desc: 'Product specifications, dimensions, and custom branding tailored to the exact visual requirements of each project.',
      icon: Palette,
    },
    {
      id: 'precision-finish',
      title: 'Precision & Finish',
      desc: 'Meticulous attention to joint fitment, clean laser-cut edges, optical acrylic clarity, and tactile presentation standards.',
      icon: ShieldCheck,
    },
    {
      id: 'bulk-capability',
      title: 'Bulk Order Capability',
      desc: 'Manufacturing pipelines planned around confirmed quantities, structured batches, and reliable production schedules.',
      icon: Box,
    },
    {
      id: 'clear-communication',
      title: 'Clear Communication',
      desc: 'Direct, transparent coordination from initial brief and sample evaluation through final production and dispatch.',
      icon: MessageSquareCheck,
    },
  ];

  return (
    <section className="section section-white why-us-section" id="why-us">
      <div className="container">
        <div className="section-header-center">
          <span className="eyebrow">DEPENDABILITY &amp; EXCELLENCE</span>
          <h2 className="section-title">A Manufacturing Partner You Can Rely On</h2>
          <p className="section-subtitle">
            We focus on technical precision, material authenticity, and reliable B2B fulfillment so you can deliver exceptional products to your clients.
          </p>
        </div>

        <div className="why-us-grid">
          {benefits.map((benefit) => {
            const Icon = benefit.icon;
            return (
              <div key={benefit.id} className="why-card card-premium">
                <div className="why-icon-box">
                  <Icon size={24} className="why-icon" />
                </div>
                <h3 className="why-title">{benefit.title}</h3>
                <p className="why-desc">{benefit.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
