/**
 * 官网内容数据类型定义
 * 所有 JSON 内容都遵循这些类型约束
 */

// 媒体类型
export type MediaType = 'image' | 'video' | 'lottie';

// 媒体资源
export interface Media {
  type: MediaType;
  src: string;
  alt?: string;
  poster?: string; // 视频封面
  width?: number;
  height?: number;
}

// 链接/按钮
export interface LinkItem {
  text: string;
  href: string;
  variant?: 'primary' | 'secondary' | 'text';
  external?: boolean;
}

// Section 基础类型
export interface SectionBase {
  id: string;
  type: string;
}

// Hero Section - 首屏大图
export interface HeroSection extends SectionBase {
  type: 'hero';
  title: string;
  subtitle?: string;
  description?: string;
  media?: Media;
  links?: LinkItem[];
  theme?: 'light' | 'dark';
}

// Feature Section - 特性展示
export interface FeatureSection extends SectionBase {
  type: 'feature';
  eyebrow?: string; // 小标题/标签
  title: string;
  description?: string;
  media?: Media;
  links?: LinkItem[];
  layout?: 'left' | 'right' | 'center';
  theme?: 'light' | 'dark';
}

// Showcase Section - 产品/功能展示
export interface ShowcaseSection extends SectionBase {
  type: 'showcase';
  eyebrow?: string;
  title: string;
  description?: string;
  items: ShowcaseItem[];
  theme?: 'light' | 'dark';
}

export interface ShowcaseItem {
  id: string;
  title: string;
  description?: string;
  media?: Media;
  link?: LinkItem;
}

// Stats Section - 数据统计
export interface StatsSection extends SectionBase {
  type: 'stats';
  title?: string;
  items: StatItem[];
  theme?: 'light' | 'dark';
}

export interface StatItem {
  value: string;
  label: string;
  prefix?: string;
  suffix?: string;
}

// CTA Section - 行动召唤
export interface CTASection extends SectionBase {
  type: 'cta';
  title: string;
  description?: string;
  links: LinkItem[];
  theme?: 'light' | 'dark';
}

// Text Section - 纯文字内容
export interface TextSection extends SectionBase {
  type: 'text';
  eyebrow?: string;
  title: string;
  body: string | string[]; // 支持多段落
  links?: LinkItem[];
  theme?: 'light' | 'dark';
}

// 所有 Section 类型联合
export type Section = 
  | HeroSection 
  | FeatureSection 
  | ShowcaseSection 
  | StatsSection 
  | CTASection 
  | TextSection;

// 页面数据结构
export interface PageData {
  meta: {
    title: string;
    description: string;
    keywords?: string[];
  };
  sections: Section[];
}

// 导航项
export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

// 网站全局配置
export interface SiteConfig {
  name: string;
  logo?: Media;
  navigation: NavItem[];
  footer: {
    copyright: string;
    links: NavItem[];
    social?: {
      platform: string;
      url: string;
      icon: string;
    }[];
  };
}

