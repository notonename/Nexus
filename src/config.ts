// =============================================================================
// Site Configuration - Nexus | Security Researcher Portfolio
// Anime Hacker Aesthetic - Dark, Technical, Aggressive
// =============================================================================

// -- Site-wide settings -------------------------------------------------------
export interface SiteConfig {
  title: string;
  description: string;
  language: string;
}

export const siteConfig: SiteConfig = {
  title: "Nexus | Security Researcher & Offensive Operator",
  description: "Offensive security researcher specializing in penetration testing, vulnerability research, and red team operations.",
  language: "en",
};

// -- Hero Section -------------------------------------------------------------
export interface HeroNavItem {
  label: string;
  sectionId: string;
  icon: "disc" | "play" | "calendar" | "music";
}

export interface HeroConfig {
  backgroundImage: string;
  brandName: string;
  decodeText: string;
  decodeChars: string;
  subtitle: string;
  ctaPrimary: string;
  ctaPrimaryTarget: string;
  ctaSecondary: string;
  ctaSecondaryTarget: string;
  cornerLabel: string;
  cornerDetail: string;
  navItems: HeroNavItem[];
}

export const heroConfig: HeroConfig = {
  backgroundImage: "/hero-bg.jpg",
  brandName: "NEXUS",
  decodeText: "SECURITY RESEARCHER",
  decodeChars: "<>[]{}|/\\!@#$%^&*",
  subtitle: "Offensive Operator | Vulnerability Researcher | Red Team",
  ctaPrimary: "VIEW_ARSENAL",
  ctaPrimaryTarget: "arsenal",
  ctaSecondary: "VIEW_ENGAGEMENTS",
  ctaSecondaryTarget: "engagements",
  cornerLabel: "STATUS",
  cornerDetail: "ACTIVE // SEEKING OPPORTUNITIES",
  navItems: [
    { label: "PHILOSOPHY", sectionId: "philosophy", icon: "disc" },
    { label: "FOUNDATION", sectionId: "foundation", icon: "play" },
    { label: "ARSENAL", sectionId: "arsenal", icon: "music" },
    { label: "ENGAGEMENTS", sectionId: "engagements", icon: "calendar" },
  ],
};

// -- Album Cube Section - Repurposed for Foundation & Metrics -----------------
export interface Album {
  id: number;
  title: string;
  subtitle: string;
  image: string;
}

export interface AlbumCubeConfig {
  albums: Album[];
  cubeTextures: string[];
  scrollHint: string;
}

export const albumCubeConfig: AlbumCubeConfig = {
  albums: [
    {
      id: 1,
      title: "168+",
      subtitle: "SIMULATED LABS",
      image: "/lab-1.jpg",
    },
    {
      id: 2,
      title: "TOP 2%",
      subtitle: "GLOBAL RANK",
      image: "/lab-2.jpg",
    },
    {
      id: 3,
      title: "2X",
      subtitle: "XSS BOUNTIES",
      image: "/lab-3.jpg",
    },
    {
      id: 4,
      title: "FULL",
      subtitle: "CHAIN COMPROMISE",
      image: "/lab-4.jpg",
    },
  ],
  cubeTextures: [
    "/cube-1.jpg",
    "/cube-2.jpg",
    "/cube-3.jpg",
    "/cube-4.jpg",
    "/cube-5.jpg",
    "/cube-6.jpg",
  ],
  scrollHint: "// SCROLL TO EXPLORE",
};

// -- Parallax Gallery Section - Repurposed for Arsenal (Tools) ----------------
export interface ParallaxImage {
  id: number;
  src: string;
  alt: string;
}

export interface GalleryImage {
  id: number;
  src: string;
  title: string;
  date: string;
}

export interface ParallaxGalleryConfig {
  sectionLabel: string;
  sectionTitle: string;
  galleryLabel: string;
  galleryTitle: string;
  marqueeTexts: string[];
  endCtaText: string;
  parallaxImagesTop: ParallaxImage[];
  parallaxImagesBottom: ParallaxImage[];
  galleryImages: GalleryImage[];
}

export const parallaxGalleryConfig: ParallaxGalleryConfig = {
  sectionLabel: "// ARSENAL",
  sectionTitle: "THE TOOLKIT",
  galleryLabel: "// CATEGORIZED",
  galleryTitle: "WEAPONRY BY DOMAIN",
  marqueeTexts: [
    "BURP SUITE",
    "METASPLOIT",
    "BLOODHOUND",
    "MIMIKATZ",
    "IMPACKET",
    "NMAP",
    "SQLMAP",
    "SLIVER C2",
    "HAVOC C2",
    "RESPONDER",
  ],
  endCtaText: "INITIATE_CONTACT",
  parallaxImagesTop: [
    { id: 1, src: "/tool-1.jpg", alt: "Terminal" },
    { id: 2, src: "/tool-2.jpg", alt: "Network" },
    { id: 3, src: "/tool-3.jpg", alt: "Code" },
    { id: 4, src: "/tool-4.jpg", alt: "Server" },
    { id: 5, src: "/tool-5.jpg", alt: "Matrix" },
    { id: 6, src: "/tool-6.jpg", alt: "Cyber" },
  ],
  parallaxImagesBottom: [
    { id: 7, src: "/tool-7.jpg", alt: "Hack" },
    { id: 8, src: "/tool-8.jpg", alt: "Security" },
    { id: 9, src: "/tool-9.jpg", alt: "Binary" },
    { id: 10, src: "/tool-10.jpg", alt: "Exploit" },
    { id: 11, src: "/tool-11.jpg", alt: "Payload" },
    { id: 12, src: "/tool-12.jpg", alt: "Shell" },
  ],
  galleryImages: [
    { id: 1, src: "/cat-ad.jpg", title: "ACTIVE DIRECTORY", date: "Impacket | BloodHound | Responder" },
    { id: 2, src: "/cat-infra.jpg", title: "INFRASTRUCTURE", date: "Nmap | Rustscan | Masscan" },
    { id: 3, src: "/cat-web.jpg", title: "WEB & API", date: "Burp Suite | SQLmap | FFUF" },
    { id: 4, src: "/cat-c2.jpg", title: "C2 & POST-EX", date: "Metasploit | Sliver | Havoc" },
    { id: 5, src: "/cat-recon.jpg", title: "RECONNAISSANCE", date: "Feroxbuster | Subfinder | Assetfinder" },
    { id: 6, src: "/cat-privesc.jpg", title: "PRIVILEGE ESCALATION", date: "Mimikatz | LinPEAS | WinPEAS" },
  ],
};

// -- Tour Schedule Section - Repurposed for Featured Engagement ---------------
export interface TourDate {
  id: number;
  date: string;
  time: string;
  city: string;
  venue: string;
  status: "on-sale" | "sold-out" | "coming-soon";
  image: string;
}

export interface TourStatusLabels {
  onSale: string;
  soldOut: string;
  comingSoon: string;
  default: string;
}

export interface TourScheduleConfig {
  sectionLabel: string;
  sectionTitle: string;
  vinylImage: string;
  buyButtonText: string;
  detailsButtonText: string;
  bottomNote: string;
  bottomCtaText: string;
  statusLabels: TourStatusLabels;
  tourDates: TourDate[];
}

export const tourScheduleConfig: TourScheduleConfig = {
  sectionLabel: "// FEATURED ENGAGEMENT",
  sectionTitle: "OPERATION: PRE-AUTH TO ROOT",
  vinylImage: "/target-icon.png",
  buyButtonText: "VIEW_FULL_REPORT",
  detailsButtonText: "TECHNICAL_DETAILS",
  bottomNote: "Additional real-world findings include IDOR, DOM/Reflected XSS, API logic flaws, and sensitive information disclosure in corporate environments.",
  bottomCtaText: "INITIATE_CONTACT",
  statusLabels: {
    onSale: "COMPLETED",
    soldOut: "CLASSIFIED",
    comingSoon: "IN_PROGRESS",
    default: "PENDING",
  },
  tourDates: [
    {
      id: 1,
      date: "PHASE 01",
      time: "RECON",
      city: "STEALTH DISCOVERY",
      venue: "Service enumeration and throttled directory brute-forcing to uncover legacy admin portal",
      status: "on-sale",
      image: "/phase-recon.jpg",
    },
    {
      id: 2,
      date: "PHASE 02",
      time: "AUTH BYPASS",
      city: "SQL INJECTION",
      venue: "Manually crafted MySQL injection payload to bypass authentication mechanisms",
      status: "on-sale",
      image: "/phase-auth.jpg",
    },
    {
      id: 3,
      date: "PHASE 03",
      time: "INITIAL ACCESS",
      city: "WEB SHELL DEPLOYMENT",
      venue: "Bypassed file upload filters to deploy functional web shell and establish reverse connection",
      status: "on-sale",
      image: "/phase-shell.jpg",
    },
    {
      id: 4,
      date: "PHASE 04",
      time: "PRIVESC",
      city: "ROOT TAKEOVER",
      venue: "Exploited Python Path Environment vulnerability to hijack root-level process",
      status: "on-sale",
      image: "/phase-root.jpg",
    },
  ],
};

// -- Footer Section -----------------------------------------------------------
export interface FooterImage {
  id: number;
  src: string;
}

export interface SocialLink {
  icon: "instagram" | "twitter" | "youtube" | "music";
  label: string;
  href: string;
}

export interface FooterConfig {
  portraitImage: string;
  portraitAlt: string;
  heroTitle: string;
  heroSubtitle: string;
  artistLabel: string;
  artistName: string;
  artistSubtitle: string;
  brandName: string;
  brandDescription: string;
  quickLinksTitle: string;
  quickLinks: string[];
  contactTitle: string;
  emailLabel: string;
  email: string;
  phoneLabel: string;
  phone: string;
  addressLabel: string;
  address: string;
  newsletterTitle: string;
  newsletterDescription: string;
  newsletterButtonText: string;
  subscribeAlertMessage: string;
  copyrightText: string;
  bottomLinks: string[];
  socialLinks: SocialLink[];
  galleryImages: FooterImage[];
}

export const footerConfig: FooterConfig = {
  portraitImage: "/footer-portrait.jpg",
  portraitAlt: "Nexus Security Researcher",
  heroTitle: "NEXUS",
  heroSubtitle: "SECURITY RESEARCHER & OFFENSIVE OPERATOR",
  artistLabel: "// OPERATOR",
  artistName: "NEXUS",
  artistSubtitle: "Offensive Security | Vulnerability Research | Red Team",
  brandName: "NEXUS",
  brandDescription: "Manual-first mindset. Deep analysis over blind automation. Seeking raw, absolute knowledge in offensive security.",
  quickLinksTitle: "// NAVIGATION",
  quickLinks: ["PHILOSOPHY", "FOUNDATION", "ARSENAL", "ENGAGEMENTS"],
  contactTitle: "// SECURE_CHANNEL",
  emailLabel: "EMAIL",
  email: "nexus@security.research",
  phoneLabel: "PGP",
  phone: "0xDEADBEEF",
  addressLabel: "LOCATION",
  address: "GLOBAL // REMOTE",
  newsletterTitle: "// INTELLIGENCE_FEED",
  newsletterDescription: "Subscribe for vulnerability research, exploit techniques, and offensive security insights.",
  newsletterButtonText: "SUBSCRIBE",
  subscribeAlertMessage: "// SUBSCRIPTION REGISTERED",
  copyrightText: "© 2025 NEXUS. ALL RIGHTS RESERVED.",
  bottomLinks: ["PRIVACY_POLICY", "TERMS_OF_SERVICE", "RESPONSIBLE_DISCLOSURE"],
  socialLinks: [
    { icon: "twitter", label: "X / TWITTER", href: "https://twitter.com" },
    { icon: "youtube", label: "YOUTUBE", href: "https://youtube.com" },
    { icon: "music", label: "GITHUB", href: "https://github.com" },
    { icon: "instagram", label: "LINKEDIN", href: "https://linkedin.com" },
  ],
  galleryImages: [
    { id: 1, src: "/gallery-1.jpg" },
    { id: 2, src: "/gallery-2.jpg" },
    { id: 3, src: "/gallery-3.jpg" },
    { id: 4, src: "/gallery-4.jpg" },
  ],
};
