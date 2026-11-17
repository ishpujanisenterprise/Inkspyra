import React from 'react';

interface IconProps {
  size?: number;
  className?: string;
}

export const WeddingRingsIcon: React.FC<IconProps> = ({ size = 26, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 28 28"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    {/* Interlocking wedding rings */}
    <circle cx="10.5" cy="15.5" r="6" />
    <circle cx="17.5" cy="15.5" r="6" />
    {/* Small top diamond / sparkle motif */}
    <path d="M14 4.5L15.5 7L14 9.5L12.5 7Z" fill="currentColor" stroke="none" />
    <path d="M14 2.5V4.5" />
  </svg>
);

export const CorporateGiftIcon: React.FC<IconProps> = ({ size = 26, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 28 28"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    {/* Gift box */}
    <rect x="4" y="11" width="20" height="13" rx="2" />
    <rect x="3" y="7" width="22" height="4" rx="1.5" />
    <line x1="14" y1="7" x2="14" y2="24" />
    {/* Bow on top */}
    <path d="M14 7C12 3.5 8 3.5 8 5.5C8 7.5 14 7 14 7Z" />
    <path d="M14 7C16 3.5 20 3.5 20 5.5C20 7.5 14 7 14 7Z" />
  </svg>
);

export const PackagingBoxIcon: React.FC<IconProps> = ({ size = 26, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 28 28"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    {/* Open box / layered packaging */}
    <path d="M14 3L4 8L14 13L24 8L14 3Z" />
    <path d="M4 8V18L14 23V13" />
    <path d="M24 8V18L14 23" />
    <path d="M8.5 10.5L19.5 5" strokeDasharray="1 2" strokeWidth="1.2" />
  </svg>
);

export const MDFCreationsIcon: React.FC<IconProps> = ({ size = 26, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 28 28"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    {/* Stacked geometric laser-cut sheets */}
    <path d="M14 4L3 9.5L14 15L25 9.5L14 4Z" />
    <path d="M3 14.5L14 20L25 14.5" />
    <path d="M3 19.5L14 25L25 19.5" />
  </svg>
);

export const AcrylicCubeIcon: React.FC<IconProps> = ({ size = 26, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 28 28"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    {/* Transparent isometric 3D cube */}
    <path d="M14 3L23 8.2V18.8L14 24L5 18.8V8.2L14 3Z" />
    <path d="M14 3V13.5M23 8.2L14 13.5M5 8.2L14 13.5" />
    <path d="M14 13.5V24" />
  </svg>
);

export const DisplaysSignageIcon: React.FC<IconProps> = ({ size = 26, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 28 28"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    {/* Architectural Display / Signboard Easel */}
    <rect x="5" y="4" width="18" height="13" rx="2" />
    <line x1="8" y1="8" x2="20" y2="8" />
    <line x1="8" y1="12" x2="16" y2="12" />
    <path d="M8 17L5 25" />
    <path d="M20 17L23 25" />
    <line x1="7" y1="21" x2="21" y2="21" />
  </svg>
);

export const CustomSolutionsStarIcon: React.FC<IconProps> = ({ size = 26, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 28 28"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    {/* Bespoke 5-point star */}
    <polygon points="14,3 17.5,10.5 25.5,11.5 19.5,17 21,25 14,21 7,25 8.5,17 2.5,11.5 10.5,10.5" />
  </svg>
);

export const CategoryIcon: React.FC<{ type: string; size?: number; className?: string }> = ({
  type,
  size = 26,
  className = '',
}) => {
  switch (type) {
    case 'rings':
      return <WeddingRingsIcon size={size} className={className} />;
    case 'gift':
      return <CorporateGiftIcon size={size} className={className} />;
    case 'packaging':
      return <PackagingBoxIcon size={size} className={className} />;
    case 'mdf':
      return <MDFCreationsIcon size={size} className={className} />;
    case 'acrylic':
      return <AcrylicCubeIcon size={size} className={className} />;
    case 'signage':
      return <DisplaysSignageIcon size={size} className={className} />;
    case 'star':
    default:
      return <CustomSolutionsStarIcon size={size} className={className} />;
  }
};
