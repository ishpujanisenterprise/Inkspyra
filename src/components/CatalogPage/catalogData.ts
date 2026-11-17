export interface CatalogProduct {
  id: string;
  title: string;
  categoryLabel: string;
  description: string;
  image: string;
  alt: string;
}

export interface CatalogCategory {
  id: string;
  name: string;
  shortName: string;
  eyebrow: string;
  headingPrefix: string;
  headingHighlight: string;
  headingSuffix?: string;
  description: string;
  iconType: 'rings' | 'gift' | 'packaging' | 'mdf' | 'acrylic' | 'signage' | 'star';
  products: CatalogProduct[];
}

export const CATALOG_CATEGORIES: CatalogCategory[] = [
  {
    id: 'luxury-wedding',
    name: 'Luxury Wedding Collections',
    shortName: 'Wedding',
    eyebrow: 'LUXURY WEDDING COLLECTIONS',
    headingPrefix: 'Elegant Creations for',
    headingHighlight: 'Your Special Day',
    description: 'Premium wedding packaging, hampers, and décor solutions that add a touch of elegance to every celebration.',
    iconType: 'rings',
    products: [
      {
        id: 'wedding-invitation-boxes',
        title: 'Wedding Invitation Boxes',
        categoryLabel: 'Luxury Wedding',
        description: 'Premium MDF invitation boxes with intricate laser-cut patterns, personalised names and wedding details.',
        image: '/images/catalog-wedding-invitation-box.jpg',
        alt: 'Bespoke laser cut wedding invitation box with intricate floral fretwork and Inkspyra gold crest'
      },
      {
        id: 'wedding-hampers',
        title: 'Wedding Hampers',
        categoryLabel: 'Luxury Wedding',
        description: 'Luxury dry-fruit hampers with custom compartment gift boxes and premium wedding presentation.',
        image: '/images/catalog-wedding-hampers.jpg',
        alt: 'Opened luxury wedding hamper with glass jars and Inkspyra branded lid'
      },
      {
        id: 'return-gift-packaging',
        title: 'Return Gift Packaging',
        categoryLabel: 'Luxury Wedding',
        description: 'Decorative return gift boxes and personalised guest gifting solutions in elegant laser-cut designs.',
        image: '/images/catalog-return-gift-packaging.jpg',
        alt: 'Lantern-style laser cut MDF return gift packaging with satin ribbons'
      },
      {
        id: 'ceremonial-trays-platters',
        title: 'Ceremonial Trays & Platters',
        categoryLabel: 'Luxury Wedding',
        description: 'MDF decorative serving and presentation trays for ritual offerings and premium event styling.',
        image: '/images/catalog-ceremonial-trays.jpg',
        alt: 'Laser cut wooden ceremonial serving tray with intricate filigree side handles'
      },
      {
        id: 'event-decor-table-elements',
        title: 'Event Décor & Table Elements',
        categoryLabel: 'Luxury Wedding',
        description: 'Arched crystal acrylic table numbers, illuminated bases, and custom event styling elements.',
        image: '/images/catalog-event-decor-elements.jpg',
        alt: 'Arch shaped acrylic table number with floral engraving on illuminated wooden stand'
      },
      {
        id: 'custom-wedding-sets',
        title: 'Custom Wedding Sets',
        categoryLabel: 'Luxury Wedding',
        description: 'Coordinated bespoke wedding packaging collections and personalized celebration gift products.',
        image: '/images/catalog-custom-wedding-sets.jpg',
        alt: 'Multi-compartment luxury laser-cut dry fruit wedding gift set with keepsake box'
      }
    ]
  },
  {
    id: 'corporate-gifting',
    name: 'Corporate Gifting',
    shortName: 'Corporate',
    eyebrow: 'CORPORATE GIFTING',
    headingPrefix: 'Thoughtful Gifting.',
    headingHighlight: 'Lasting Impressions.',
    description: 'Distinctive corporate gifting solutions designed to celebrate relationships, recognise achievements and represent your brand.',
    iconType: 'gift',
    products: [
      {
        id: 'executive-gift-sets',
        title: 'Executive Gift Sets',
        categoryLabel: 'Corporate Gifting',
        description: 'Premium corporate gift combinations, custom presentation boxes with executive desk accessories.',
        image: '/images/catalog-executive-gift-set.jpg',
        alt: 'Luxury matte navy executive gift set with gold pen, leather notebook, and brass keychain'
      },
      {
        id: 'corporate-welcome-kits',
        title: 'Corporate Welcome Kits',
        categoryLabel: 'Corporate Gifting',
        description: 'Employee onboarding gift sets, branded desk accessories, insulated drinkware, and bespoke packaging.',
        image: '/images/catalog-corporate-welcome-kit.jpg',
        alt: 'Matte black corporate welcome kit with thermal flask, journal, and pen'
      },
      {
        id: 'dry-fruit-festive-hampers',
        title: 'Dry Fruit & Festive Hampers',
        categoryLabel: 'Corporate Gifting',
        description: 'Premium multi-compartment hampers, glass dry fruit jars, and custom festive celebration packaging.',
        image: '/images/catalog-dry-fruit-festive-hamper.jpg',
        alt: 'Festive corporate gift hamper with roasted dry fruits and gold foil accents'
      },
      {
        id: 'personalised-desk-accessories',
        title: 'Personalised Desk Accessories',
        categoryLabel: 'Corporate Gifting',
        description: 'Custom nameplates, desk organisers, cardholders, and branded executive accessories.',
        image: '/images/acrylic-nameplate.jpg',
        alt: 'Crystal clear executive acrylic nameplate with solid hardwood walnut base'
      },
      {
        id: 'awards-recognition-gifts',
        title: 'Awards & Recognition Gifts',
        categoryLabel: 'Corporate Gifting',
        description: 'Custom acrylic achievement awards, appreciation plaques, and weighted brass recognition displays.',
        image: '/images/catalog-awards-recognition.jpg',
        alt: 'Diamond-cut clear acrylic corporate achievement trophy with brushed gold base'
      },
      {
        id: 'branded-promotional-gifts',
        title: 'Branded Promotional Gifts',
        categoryLabel: 'Corporate Gifting',
        description: 'Custom corporate merchandise packaging, laser-etched timber gift boxes, and presentation sets.',
        image: '/images/catalog-branded-promotional-gifts.jpg',
        alt: 'Royal navy corporate promotional gift boxes with gold ribbon and wooden stationery'
      }
    ]
  },
  {
    id: 'premium-packaging',
    name: 'Premium Packaging',
    shortName: 'Packaging',
    eyebrow: 'PREMIUM PACKAGING',
    headingPrefix: 'Packaging That',
    headingHighlight: 'Makes an Impression.',
    description: 'Distinctive packaging crafted to elevate product presentation through thoughtful design, intricate detailing and premium finishes.',
    iconType: 'packaging',
    products: [
      {
        id: 'luxury-mdf-gift-boxes',
        title: 'Luxury MDF Gift Boxes',
        categoryLabel: 'Premium Packaging',
        description: 'Handcrafted wooden presentation boxes with gold foil detailing and bespoke velvet-lined interiors.',
        image: '/images/cat-wedding.jpg',
        alt: 'Luxury gold filigree laser-cut MDF gift box with velvet lining'
      },
      {
        id: 'laser-cut-decorative-boxes',
        title: 'Laser-Cut Decorative Boxes',
        categoryLabel: 'Premium Packaging',
        description: 'Intricate floral and geometric arabesque fretwork boxes with warm internal tone and precision joinery.',
        image: '/images/catalog-laser-cut-decorative-box.jpg',
        alt: 'Intricate laser-cut fretwork decorative wooden keepsake box on ivory velvet'
      },
      {
        id: 'premium-dry-fruit-boxes',
        title: 'Premium Dry Fruit Boxes',
        categoryLabel: 'Premium Packaging',
        description: 'Multi-compartment presentation boxes with transparent crystal acrylic lids and satin ribbon ties.',
        image: '/images/catalog-premium-dry-fruit-box.jpg',
        alt: 'Four-compartment luxury dry fruit wooden box with clear acrylic lid and burgundy ribbon'
      },
      {
        id: 'custom-product-packaging',
        title: 'Custom Product Packaging',
        categoryLabel: 'Premium Packaging',
        description: 'Tailored rigid packaging, die-cut protective inserts, and precision corporate brand embossing.',
        image: '/images/hero-luxury-boxes.jpg',
        alt: 'Bespoke rigid presentation packaging box with custom internal nesting'
      },
      {
        id: 'rigid-presentation-boxes',
        title: 'Rigid Presentation Boxes',
        categoryLabel: 'Premium Packaging',
        description: 'High-density rigid presentation boxes with magnetic closures, gold hot foil, and soft-touch finish.',
        image: '/images/cat-corporate.jpg',
        alt: 'Deep navy rigid presentation gift box with gold crest and magnetic closure'
      },
      {
        id: 'personalised-brand-packaging',
        title: 'Personalised Brand Packaging',
        categoryLabel: 'Premium Packaging',
        description: 'Bespoke corporate brand packaging with metallic hot stamping, custom textures, and ribbon pulls.',
        image: '/images/hero-luxury-packaging.png',
        alt: 'Personalised luxury brand packaging ensemble with laser-cut wood and navy boxes'
      }
    ]
  },
  {
    id: 'mdf-creations',
    name: 'MDF Creations',
    shortName: 'MDF',
    eyebrow: 'MDF CREATIONS',
    headingPrefix: 'Precision Cut.',
    headingHighlight: 'Beautifully Crafted.',
    description: 'Versatile MDF creations shaped through detailed laser cutting, engraving and custom fabrication.',
    iconType: 'mdf',
    products: [
      {
        id: 'mdf-decorative-boxes',
        title: 'MDF Decorative Boxes',
        categoryLabel: 'MDF Creations',
        description: 'Precision laser-cut wooden boxes, intricate geometric lattice filigree, and magnetic latch closures.',
        image: '/images/catalog-laser-cut-decorative-box.jpg',
        alt: 'Laser-cut MDF decorative wooden box with arabesque lattice work'
      },
      {
        id: 'mdf-wedding-invitation-boxes',
        title: 'MDF Wedding Invitation Boxes',
        categoryLabel: 'MDF Creations',
        description: 'Bespoke invitation boxes with floral jali patterns, gold metallic inserts, and personalized engravings.',
        image: '/images/catalog-wedding-invitation-box.jpg',
        alt: 'Intricate MDF wedding invitation box with engraved gold nameplate'
      },
      {
        id: 'mdf-gift-hampers',
        title: 'MDF Gift Hampers',
        categoryLabel: 'MDF Creations',
        description: 'Multi-tier festive hampers, custom internal dividers, and durable laser-joined corners.',
        image: '/images/catalog-wedding-hampers.jpg',
        alt: 'Handcrafted MDF gift hamper box with partitioned internal storage'
      },
      {
        id: 'mdf-desk-organisers',
        title: 'MDF Desk Organisers',
        categoryLabel: 'MDF Creations',
        description: 'Modular desktop stationery storage, pen caddies, mobile docks, and business card slots.',
        image: '/images/catalog-mdf-desk-organisers.jpg',
        alt: 'Precision laser-cut walnut and birch MDF multi-tier desk organiser'
      },
      {
        id: 'mdf-decorative-panels',
        title: 'MDF Decorative Panels',
        categoryLabel: 'MDF Creations',
        description: 'Architectural jali screens, geometric fretwork wall panels, and interior partition motifs.',
        image: '/images/catalog-mdf-decorative-panels.jpg',
        alt: 'Architectural laser-cut MDF geometric decorative wall panel with backlighting'
      },
      {
        id: 'mdf-custom-cutouts',
        title: 'MDF Custom Cutouts',
        categoryLabel: 'MDF Creations',
        description: 'Laser-cut 2D and 3D wooden shapes, dimensional lettering, and bespoke event backdrop motifs.',
        image: '/images/proc-laser.jpg',
        alt: 'Laser-cutting precision machine producing custom MDF decorative cutouts'
      },
      {
        id: 'mdf-trays-platters',
        title: 'MDF Trays & Platters',
        categoryLabel: 'MDF Creations',
        description: 'Laser-crafted serving trays, intricate fretwork borders, and reinforced ergonomic handles.',
        image: '/images/catalog-ceremonial-trays.jpg',
        alt: 'MDF decorative laser-cut serving tray with intricate fretwork sides'
      },
      {
        id: 'mdf-event-decor',
        title: 'MDF Event Décor',
        categoryLabel: 'MDF Creations',
        description: 'Custom celebration centerpieces, festival lantern boxes, and bespoke celebration styling elements.',
        image: '/images/catalog-return-gift-packaging.jpg',
        alt: 'MDF laser-cut lantern boxes for celebratory event decor'
      }
    ]
  },
  {
    id: 'acrylic-creations',
    name: 'Acrylic Creations',
    shortName: 'Acrylic',
    eyebrow: 'ACRYLIC CREATIONS',
    headingPrefix: 'Designed to',
    headingHighlight: 'Stand Out.',
    description: 'Custom acrylic products combining clean detailing, precision fabrication and premium presentation.',
    iconType: 'acrylic',
    products: [
      {
        id: 'personalised-acrylic-nameplates',
        title: 'Personalised Acrylic Nameplates',
        categoryLabel: 'Acrylic Creations',
        description: 'Crystal-clear cast acrylic desk nameplates, solid hardwood base, and precision laser engraving.',
        image: '/images/acrylic-nameplate.jpg',
        alt: 'Personalized crystal-clear acrylic desk nameplate with wood stand'
      },
      {
        id: 'acrylic-office-signage',
        title: 'Acrylic Office Signage',
        categoryLabel: 'Acrylic Creations',
        description: 'Minimalist corporate signage, frosted finishes, and architectural stainless steel standoffs.',
        image: '/images/acrylic-sign.jpg',
        alt: 'Minimalist crystal-clear conference room acrylic office sign'
      },
      {
        id: 'acrylic-display-stands',
        title: 'Acrylic Display Stands',
        categoryLabel: 'Acrylic Creations',
        description: 'Multi-tier showcase risers, flame-polished edges, and optical-grade UV-resistant clarity.',
        image: '/images/acrylic-display.jpg',
        alt: 'Laser cut gold and transparent custom acrylic showcase displays'
      },
      {
        id: 'acrylic-awards-plaques',
        title: 'Acrylic Awards & Recognition Plaques',
        categoryLabel: 'Acrylic Creations',
        description: 'Diamond-faceted recognition awards, frosted geometric accents, and weighted gold pedestals.',
        image: '/images/catalog-acrylic-awards-plaques.jpg',
        alt: 'Faceted crystal-clear acrylic appreciation plaque with champagne gold base'
      },
      {
        id: 'acrylic-table-decor',
        title: 'Acrylic Table Décor',
        categoryLabel: 'Acrylic Creations',
        description: 'Mirrored gold and silver centerpieces, table numbers, and bespoke celebratory accents.',
        image: '/images/acrylic-decor.jpg',
        alt: 'Laser-cut gold mirror acrylic Happy Birthday event centerpiece'
      },
      {
        id: 'acrylic-product-displays',
        title: 'Acrylic Product Displays',
        categoryLabel: 'Acrylic Creations',
        description: 'Bespoke retail showcase pedestals, illuminated counter display plinths, and anti-scratch coatings.',
        image: '/images/catalog-acrylic-product-displays.jpg',
        alt: 'Illuminated clear acrylic cylindrical showcase pedestal for luxury products'
      },
      {
        id: 'custom-acrylic-cutouts',
        title: 'Custom Acrylic Cutouts',
        categoryLabel: 'Acrylic Creations',
        description: 'Precision CNC laser cut corporate logos, dimensional signage lettering, and branding silhouettes.',
        image: '/images/proc-acrylic.jpg',
        alt: 'Precision fabrication and edge polishing of custom acrylic cutouts'
      },
      {
        id: 'branded-acrylic-accessories',
        title: 'Branded Acrylic Accessories',
        categoryLabel: 'Acrylic Creations',
        description: 'Executive desk organizers, branded acrylic coasters, card stands, and desktop stationery.',
        image: '/images/catalog-event-decor-elements.jpg',
        alt: 'Branded acrylic accessories with precision laser detailing'
      }
    ]
  },
  {
    id: 'displays-signage',
    name: 'Displays & Signage',
    shortName: 'Signage',
    eyebrow: 'DISPLAYS & SIGNAGE',
    headingPrefix: 'Make Your Brand',
    headingHighlight: 'Impossible to Miss.',
    description: 'Custom display and signage solutions designed to bring brand spaces, products and environments to life.',
    iconType: 'signage',
    products: [
      {
        id: 'reception-office-signage',
        title: 'Reception & Office Signage',
        categoryLabel: 'Displays & Signage',
        description: 'Architectural lobby identification, illuminated dimensional lettering, and premium brushed accents.',
        image: '/images/cat-signage.jpg',
        alt: 'Architectural dimensional illuminated signage for corporate headquarters'
      },
      {
        id: 'corporate-logo-displays',
        title: 'Corporate Logo Displays',
        categoryLabel: 'Displays & Signage',
        description: '3D dimensional brushed gold metal and acrylic corporate logo letters with warm LED halo backlighting.',
        image: '/images/catalog-corporate-logo-displays.jpg',
        alt: '3D dimensional brushed gold corporate logo with warm LED halo backlighting on fluted wood wall'
      },
      {
        id: 'acrylic-display-stands-signage',
        title: 'Acrylic Display Stands',
        categoryLabel: 'Displays & Signage',
        description: 'Crystal-clear counter risers, brochure holders, and point-of-sale product stands.',
        image: '/images/acrylic-display.jpg',
        alt: 'Multi-tier acrylic retail display stands with flame-polished edges'
      },
      {
        id: 'retail-product-displays',
        title: 'Retail Product Displays',
        categoryLabel: 'Displays & Signage',
        description: 'Modern stepped luxury retail display riser stands combining clear acrylic tiers with polished wood.',
        image: '/images/catalog-retail-product-displays.jpg',
        alt: 'Stepped acrylic and walnut retail product display riser in luxury boutique'
      },
      {
        id: 'event-exhibition-signage',
        title: 'Event & Exhibition Signage',
        categoryLabel: 'Displays & Signage',
        description: 'Freestanding branded totems, expo directional boards, and welcome entrance signage.',
        image: '/images/serve-events.jpg',
        alt: 'Freestanding branded event signage and exhibition branding displays'
      },
      {
        id: 'tabletop-branding-displays',
        title: 'Tabletop Branding Displays',
        categoryLabel: 'Displays & Signage',
        description: 'Compact executive meeting room displays, conference table markers, and QR standees.',
        image: '/images/acrylic-sign.jpg',
        alt: 'Tabletop acrylic branding display for conference and meeting rooms'
      },
      {
        id: 'decorative-name-boards',
        title: 'Decorative Name Boards',
        categoryLabel: 'Displays & Signage',
        description: 'Executive cabin door plates, architectural floor directory boards, and directional plaques.',
        image: '/images/acrylic-nameplate.jpg',
        alt: 'Architectural acrylic and hardwood executive door and desk name board'
      },
      {
        id: 'custom-architectural-displays',
        title: 'Custom Architectural Displays',
        categoryLabel: 'Displays & Signage',
        description: 'Bespoke multi-layered architectural wall feature installations crafted from laser-cut wood and acrylic.',
        image: '/images/catalog-custom-architectural-displays.jpg',
        alt: 'Multi-layered architectural wood and illuminated acrylic wall installation in corporate boardroom'
      }
    ]
  },
  {
    id: 'custom-solutions',
    name: 'Custom Solutions',
    shortName: 'Custom',
    eyebrow: 'CUSTOM SOLUTIONS',
    headingPrefix: 'Your Vision.',
    headingHighlight: 'Our Craftsmanship.',
    description: 'Made-to-order manufacturing solutions developed around your ideas, dimensions, materials and brand requirements.',
    iconType: 'star',
    products: [
      {
        id: 'custom-mdf-products',
        title: 'Custom MDF Products',
        categoryLabel: 'Custom Solutions',
        description: 'Bespoke laser-cut wooden assemblies, tailored dimensions, specialty joinery, and custom finishes.',
        image: '/images/proc-laser.jpg',
        alt: 'Precision laser cutting of bespoke custom MDF product assemblies'
      },
      {
        id: 'custom-acrylic-products',
        title: 'Custom Acrylic Products',
        categoryLabel: 'Custom Solutions',
        description: 'Bespoke fabrication, heat-bent acrylic shapes, frosted, tinted and optical-grade clear acrylics.',
        image: '/images/proc-acrylic.jpg',
        alt: 'Custom precision acrylic fabrication and edge finishing'
      },
      {
        id: 'bespoke-packaging-solutions',
        title: 'Bespoke Packaging Solutions',
        categoryLabel: 'Custom Solutions',
        description: 'Made-to-order luxury rigid packaging, magnetic latches, custom die-cut foam nests, and gold foil.',
        image: '/images/hero-luxury-packaging.png',
        alt: 'Bespoke luxury packaging solution with intricate laser-cut wooden gift box'
      },
      {
        id: 'personalised-corporate-gifts-custom',
        title: 'Personalised Corporate Gifts',
        categoryLabel: 'Custom Solutions',
        description: 'End-to-end custom branded gifting combinations, custom packaging, and branded merchandise.',
        image: '/images/catalog-executive-gift-set.jpg',
        alt: 'Personalized bespoke corporate gift combination set'
      },
      {
        id: 'custom-laser-cut-designs',
        title: 'Custom Laser-Cut Designs',
        categoryLabel: 'Custom Solutions',
        description: 'Complex geometric CAD patterns, architectural screens, decorative art pieces, and custom logos.',
        image: '/images/proc-quality.jpg',
        alt: 'Custom laser-cut precision patterns and quality inspection'
      },
      {
        id: 'made-to-order-display-solutions',
        title: 'Made-to-Order Display Solutions',
        categoryLabel: 'Custom Solutions',
        description: 'Full retail store display fixtures, custom exhibition setups, illuminated plinths, and vitrines.',
        image: '/images/serve-team-consultation.jpg',
        alt: 'Design consultation for made-to-order architectural display solutions'
      }
    ]
  }
];
