export type Language = 'id' | 'en';

export type ProjectCategory = 'all' | 'ui-ux' | 'branding' | 'web-app';

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: 'ui-ux' | 'branding' | 'web-app';
  categoryLabel: {
    id: string;
    en: string;
  };
  year: string;
  client: string;
  role: {
    id: string;
    en: string;
  };
  timeline: string;
  tools: string[];
  image: string;
  summary: {
    id: string;
    en: string;
  };
  challenge: {
    id: string;
    en: string;
  };
  solution: {
    id: string;
    en: string;
  };
  impact: {
    id: string;
    en: string;
  }[];
  deliverables: string[];
}

export interface Service {
  number: string;
  title: {
    id: string;
    en: string;
  };
  description: {
    id: string;
    en: string;
  };
  deliverables: {
    id: string;
    en: string;
  }[];
}

export interface ProcessStep {
  step: string;
  title: {
    id: string;
    en: string;
  };
  description: {
    id: string;
    en: string;
  };
  duration: string;
}

export interface Testimonial {
  quote: {
    id: string;
    en: string;
  };
  name: string;
  role: string;
  company: string;
  metric: string;
}

export interface StatItem {
  number: string;
  label: {
    id: string;
    en: string;
  };
  detail: {
    id: string;
    en: string;
  };
}

export interface PortfolioConfig {
  name: string;
  roleTitle: {
    id: string;
    en: string;
  };
  tagline: string;
  heroPortrait: string;
  bio: {
    id: string;
    en: string;
  };
  email: string;
  phone: string;
  location: string;
  availability: {
    id: string;
    en: string;
  };
  socials: {
    name: string;
    url: string;
  }[];
}

export interface FullPortfolioData {
  config: PortfolioConfig;
  stats: StatItem[];
  projects: Project[];
  services: Service[];
  process: ProcessStep[];
  testimonials: Testimonial[];
}
