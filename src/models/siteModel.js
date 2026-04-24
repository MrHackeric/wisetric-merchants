export const BRAND = {
  name: "WISETRIC MERCHANTS",
  tagline: "Electrical • Lighting • Renovation • Supply",
  location: "Karen Village, Nairobi, Kenya",
  phone: "+254 715 253 208",
  email: "info@wisetricmerchants.co.ke",
  social: {
    facebook: "https://www.facebook.com/profile.php?id=61557551807545&mibextid=rS40aB7S9Ucbxw6v",
    instagram: "https://www.instagram.com/wisetricmerchants?igsh=MTc3MzJ1MDJjbjJ3YQ==",
    tiktok: "https://www.tiktok.com/@wisetricmerchants?_t=ZM-8yyaXjniZp2&_r=1",
    twitter: "https://x.com/wisetricme69631?t=mhBtnj63VtX_MiJaLFr6EQ&s=09",
    linkedin: "https://www.linkedin.com/in/wisetric-merchants-956693226?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
  }
};

export const NAV_LINKS = [
  { id: "home", label: "Home", type: "hash" },
  { id: "services", label: "Services", type: "hash" },
  { id: "about", label: "About", type: "hash" },
  { id: "gallery", label: "Our Work", type: "hash" },
  { id: "partners", label: "Partners", type: "hash" },
  { id: "contact", label: "Contact", type: "hash" },
  { id: "portfolio", label: "Portfolio", type: "page", href: "/portfolio" },
];

export const SERVICES = [
  {
    id: 1,
    icon: "electrical",
    title: "Electrical Consultation",
    description:
      "Load analysis, system design, compliance checks, and safety audits tailored to your project.",
  },
  {
    id: 2,
    icon: "lighting",
    title: "Film & Event Lighting",
    description:
      "Creative lighting rigs, power distribution, and on-site ops for film sets, stages, and venues.",
  },
  {
    id: 3,
    icon: "renovation",
    title: "Renovation & Fit-outs",
    description:
      "Wiring upgrades, smart controls, lighting plans, and neat finishes for homes and offices.",
  },
  {
    id: 4,
    icon: "supply",
    title: "Supply of Materials",
    description:
      "Reliable supply of certified electrical cables, fixtures, panels, fittings, and accessories.",
  },
  {
    id: 5,
    icon: "support",
    title: "Maintenance & Support",
    description:
      "Preventive maintenance, emergency call-outs, and 24/7 support for critical operations.",
  },
  {
    id: 6,
    icon: "quality",
    title: "Testing & Commissioning",
    description:
      "Thorough inspections, continuity/insulation testing, and detailed hand-over documentation.",
  },
];

export const ABOUT_BULLETS = [
  "Licensed, insured, and code-compliant",
  "Project management with clear timelines",
  "Top-tier components & neat workmanship",
  "Transparent pricing and documentation",
];

export const PARTNERS = [
  { company: "FILM STUDIOS", image: "/images/filmstudios.png" },
  { company: "WOODNORKGREEN", image: "/images/woodnork.png" },
  { company: "TOYOTA KENYA", image: "/images/toyota.png" },
  { company: "RED ROOM", image: "/images/redroom.jpg" },
  { company: "ALLOY", image: "/images/alloy.jpg" },
  { company: "METROCARE HEALTH CLINIC", image: "/images/metrocare.png" },
  { company: "AIRTEL", image: "/images/airtel.png" },
  { company: "THE NAIROBI HOSPITAL", image: "/images/Nairobi_Hospital_Logo.png" },
  { company: "PHILIT TV", image: "/images/philittv.jpg" },
  { company: "MOJO PRODUCTONS", image: "/images/mojo.jpg" },
  { company: "KAA", image: "/images/kaa.jpg" },
  { company: "GEiCO iVENTS", image: "/images/geico.jpg" },
  { company: "KCAA", image: "/images/kcaa.png" },
  { company: "DISCMEN ENTERTAINMENT", image: "/images/Discmen.jpg" },
  { company: "JAMBOJET", image: "/images/jambojet.png" },
  { company: "D&R STUDIOS", image: "/images/DnRStudios.png" },
  { company: "SAFARICOM", image: "/images/safaricom.png" },
  { company: "KING DAVID HOSPITAL", image: "/images/KingDavidHospital.png" },
  { company: "CARREFOUR", image: "/images/carrefour.jpg" },
  { company: "KENYA GRIP & SPARKS LIGHTING", image: "/images/KenyaGrip.png" },
  { company: "BATA KENYA", image: "/images/bata.png" },
];

export const GALLERY = [
  { id: 1, title: "Office Renovation", category: "Commercial Electrical", image: "/images/Logo.jpg", year: 2023 },
  { id: 2, title: "Film Set Lighting", category: "Event Lighting", image: "/images/Logo.jpg", year: 2023 },
  { id: 3, title: "Smart Home Installation", category: "Residential", image: "/images/Logo.jpg", year: 2023 },
  { id: 4, title: "Retail Fit-out", category: "Commercial", image: "/images/Logo.jpg", year: 2022 },
  { id: 5, title: "Industrial Wiring", category: "Industrial", image: "/images/Logo.jpg", year: 2022 },
  { id: 6, title: "Outdoor Lighting", category: "Landscape", image: "/images/Logo.jpg", year: 2023 },
  { id: 7, title: "Emergency Repair", category: "Maintenance", image: "/images/Logo.jpg", year: 2023 },
  { id: 8, title: "Heritage Building", category: "Renovation", image: "/images/Logo.jpg", year: 2022 },
];

// ─── Portfolio ────────────────────────────────────────────────────────────────

export const PORTFOLIO_CATEGORIES = [
  "All",
  "Electrical",
  "Lighting",
  "Renovation",
  "Testing",
  "Consultation",
  "Design",
];

export const PORTFOLIO_ITEMS = [
  {
    id: 1,
    title: "Merchandise Design",
    category: "Design",
    featured: true,
    images: [
      "/images/portfolio1.jpeg",
      "/images/portfolio2.jpeg",
    ],
    description:
      "Professionally designed and printed branded merchandise collection for WISETRIC MERCHANTS, including t-shirts, caps, and tote bags that reinforce our brand identity across every touchpoint.",
    client: "WISETRIC MERCHANTS",
    year: 2024,
  },
  {
    id: 2,
    title: "Interior Renovation",
    category: "Renovation",
    featured: false,
    images: [
      "/images/interior.jpg",
    ],
    description:
      "Complete interior renovation with integrated smart lighting controls, concealed cable trays, and neat cable management for a corporate office in Westlands.",
    client: "Confidential",
    year: 2024,
  },
  {
    id: 3,
    title: "Event Lighting Setup",
    category: "Lighting",
    featured: false,
    images: [
      "/images/portfolio3.jpeg",
      "/images/portfolio5.jpeg",
    ],
    description:
      "Full event lighting rig and power distribution setup for a major concert in Nairobi — 200+ fixtures, 3-phase power, and zero downtime.",
    client: "GEiCO iVENTS",
    year: 2024,
  },
  {
    id: 4,
    title: "Electrical Consultation",
    category: "Consultation",
    featured: false,
    images: [
      "/images/portfolio4.jpeg",
      "/images/portfolio7.jpeg",
    ],
    description:
      "Load analysis, compliance audit, and complete system design for a multi-floor corporate office complex in Upper Hill, Nairobi.",
    client: "Metrocare Health Clinic",
    year: 2023,
  },
  {
    id: 5,
    title: "Custom Lighting Design",
    category: "Lighting",
    featured: false,
    images: [
      "/images/portfolio5.jpeg",
      "/images/portfolio3.jpeg",
    ],
    description:
      "Bespoke architectural lighting design for a luxury residential development in Karen — combining warm-tone LEDs with dynamic scene control.",
    client: "Confidential",
    year: 2023,
  },
  {
    id: 6,
    title: "Specialist Installation",
    category: "Electrical",
    featured: false,
    images: [
      "/images/portfolio6.jpeg",
      "/images/portfolio4.jpeg",
      "/images/portfolio8.jpeg",
    ],
    description:
      "On-site specialist electrical installation and precision repair by our certified team for a high-voltage industrial facility.",
    client: "KAA",
    year: 2023,
  },
  {
    id: 7,
    title: "System Testing & Commissioning",
    category: "Testing",
    featured: false,
    images: [
      "/images/portfolio7.jpeg",
      "/images/portfolio4.jpeg",
    ],
    description:
      "Thorough commissioning, insulation resistance, and continuity testing with detailed handover documentation and compliance certification.",
    client: "King David Hospital",
    year: 2024,
  },
  {
    id: 8,
    title: "Power Distribution",
    category: "Electrical",
    featured: false,
    images: [
      "/images/portfolio8.jpeg",
      "/images/portfolio6.jpeg",
      "/images/portfolio2.jpeg",
    ],
    description:
      "Industrial-grade power distribution system installed for a large manufacturing facility — custom panel builds, earthing, and surge protection.",
    client: "Confidential",
    year: 2022,
  },
];

// ─── Portfolio Videos ─────────────────────────────────────────────────────────

export const PORTFOLIO_VIDEOS = [
  {
    id: 1,
    title: "Indoor Lighting",
    subtitle: "A highlight of our indoor electrical and lighting work",
    src: "/videos/portfolio9.mp4",
    poster: "/images/portfolio3.jpeg",
    duration: "2:14",
    tags: ["Lighting", "Electrical", "Events"],
  },
  {
    id: 2,
    title: "Outdoor Lighting",
    subtitle: "Behind the scenes of a major film set outdoor lighting installation",
    src: "/videos/portfolio10.mp4",
    poster: "/images/portfolio5.jpeg",
    duration: "1:47",
    tags: ["Film", "Lighting", "BTS"],
  },
];