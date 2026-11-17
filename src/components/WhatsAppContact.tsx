import React, { useState, useEffect } from 'react';
import { MessageCircle } from 'lucide-react';

interface WhatsAppContactProps {
  phoneNumber?: string; // Verified business number
}

export const WhatsAppContact: React.FC<WhatsAppContactProps> = ({ phoneNumber = '+919876543210' }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show only after scrolling past hero
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!phoneNumber || !isVisible) return null;

  const cleanNumber = phoneNumber.replace(/[^0-9]/g, '');
  const message = encodeURIComponent('Hello Inkspyra Industries, I would like to inquire about custom B2B manufacturing.');
  const whatsappUrl = `https://wa.me/${cleanNumber}?text=${message}`;

  return (
    <aside className="whatsapp-floating-wrap" aria-label="WhatsApp Quick Contact">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-btn"
        aria-label="Chat with Inkspyra Industries on WhatsApp"
        id="floating-whatsapp-btn"
      >
        <MessageCircle size={24} />
        <span className="whatsapp-tooltip">Chat with B2B Desk</span>
      </a>
    </aside>
  );
};
