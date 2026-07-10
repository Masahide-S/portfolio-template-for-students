// ==========================================
// Core Data Types
// ==========================================

export interface Profile {
  name: string;
  description: string;
  birthDate: string;
  university: {
    name: string;
    entranceYear: number;
  };
  imageUrl: string;
  mainVisualUrl: string;
}

export interface Contact {
  github: string;
  email: string;
  twitter?: string;
  linkedin?: string;
  formspreeEndpoint?: string;
}

export interface NavItem {
  name: string;
  href: string;
}

export interface Header {
  navItems: NavItem[];
}

// ==========================================
// Skills & Certifications
// ==========================================

export interface SkillItem {
  name: string;
  iconName: string;
}

export interface SkillCategory {
  category: string;
  items: SkillItem[];
}

export interface Skills {
  categories: SkillCategory[];
}

export interface Certification {
  name: string;
  date: string;
  issuer: string;
  iconName: string;
  organization?: string;
}

export interface Certifications {
  items: Certification[];
}

// ==========================================
// Timeline
// ==========================================

export interface TimelineItem {
  date: string;
  title: string;
  description: string;
  tags: string[];
}

// ==========================================
// Awards
// ==========================================

export interface Award {
  title: string;
  organization?: string;
  date: string;
  description: string;
  tags: string[];
  keywords?: string[];
  details?: { subtitle: string; text: string }[];
}

// ==========================================
// Research & Products
// ==========================================

export interface ResearchItem {
  title: string;
  description: string;
  tags: string[];
  keywords?: string[];
  date: string;
  details?: { subtitle: string; text: string }[];
}

export interface Product {
  title: string;
  imageUrl: string;
  githubUrl?: string;
  liveUrl?: string;
  tags: string[];
  description: string;
}

// ==========================================
// Tag Styles
// ==========================================

export interface TagStyle {
  color: string;
  iconName: string;
}

export type TagStyles = Record<string, TagStyle>;

// ==========================================
// Site Data (DynamoDB)
// ==========================================

export interface SiteData {
  id: string;
  profile: Profile;
  contact: Contact;
  header: Header;
  skills: Skills;
  certifications: Certifications;
  timeline: TimelineItem[];
  awards: Award[];
  research: ResearchItem[];
  products: Product[];
}
