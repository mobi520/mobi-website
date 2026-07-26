// ===== 站点核心类型定义 =====

// --- 站点元信息 ---
export interface SiteMeta {
  name: string;
  nameEn: string;
  role: string;
  roleEn: string;
  motto: string;
  mottoEn: string;
  readingFocus: string;
  siteUrl: string;
  resumeUrl: string;
}

// --- 导航 ---
export interface NavLink {
  label: string;
  href: string;
  disabled?: boolean;
}

export type SectionId = 'hero' | 'about' | 'projects' | 'methodology' | 'contact';

// --- Hero 区域 ---
export interface TrustAnchor {
  title: string;
  description: string;
  icon: string;
}

export interface HeroContent {
  subtitle: string;
  mainTitle: string;
  mainTitleSub: string;
  tagline: string;
  ctaText: string;
  trustAnchors: TrustAnchor[];
}

// --- 关于我 ---
export interface AboutLabel {
  icon: string;
  text: string;
}

export interface Stat {
  value: string;
  label: string;
  suffix: string;
}

export interface Interest {
  label: string;
  emoji: string;
}

export interface AboutContent {
  introTitle: string;
  labels: AboutLabel[];
  introParagraphs: string[];
  stats: Stat[];
  interests: Interest[];
}

// --- 项目 ---
export interface ProjectImage {
  src: string;
  label: string;
}

export interface ProjectLinks {
  github: string | null;
  demo: string | null;
  paper: string | null;
}

export interface ProjectFeature {
  title: string;
  description: string;
}

export interface ProjectDetail {
  overview: string;
  architecture: string;
  features: ProjectFeature[];
  techStack: string[];
  highlights: string[];
}

export interface Project {
  id: number;
  title: string;
  category: string;
  tags: string[];
  description: string;
  gradient: string;
  image: string;
  images: ProjectImage[];
  links: ProjectLinks;
  detail: ProjectDetail;
}

// --- 核心优势 ---
export interface Strength {
  id: number;
  title: string;
  icon: string;
  description: string;
}

// --- 联系 ---
export interface ContactInfo {
  wechat: string;
  email: string;
  phone: string;
  realName: string;
  school: string;
  resumeUrl: string;
  formEndpoint: string;
}

export interface ContactSectionContent {
  title: string;
  subtitle: string;
  bookingUrl: string | null;
  resumeCta: string;
}

// --- Footer ---
export interface FooterLink {
  label: string;
  href: string;
  disabled?: boolean;
}

export interface FooterSection {
  title: string;
  links: FooterLink[];
}

export interface FooterContent {
  copyright: string;
  tagline: string;
  sections: FooterSection[];
}

// --- 阅读 ---
export interface ReadingItem {
  title: string;
  author: string;
  note: string;
}

// --- Mouse Context ---
export interface MouseState {
  x: number;
  y: number;
  normalizedX: number;
  normalizedY: number;
  reduceMotion: boolean;
  isTouch: boolean;
}
