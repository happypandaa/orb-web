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

// 链接/按钮配置
export interface LinkConfig {
  href: string;
  variant?: 'primary' | 'secondary' | 'text';
  external?: boolean;
}

// 链接/按钮内容
export interface LinkContent {
  text: string;
}

// 合并后的链接类型 (用于组件)
export interface LinkItem extends LinkConfig, LinkContent { }

// 主题类型
export type ThemeType = 'light' | 'dark' | 'gray';

// --- Base Types ---

export interface SectionConfigBase {
  id: string;
  type: string;
  theme?: ThemeType;
}

export interface SectionContentBase {
  title: string;
  description?: string;
  eyebrow?: string;
}

// --- Specific Sections ---

// Hero Section
export interface HeroSectionConfig extends SectionConfigBase {
  type: 'hero';
  layout?: 'center';
  media?: Media;
  links?: LinkConfig[];
}
export interface HeroSectionContent extends SectionContentBase {
  subtitle?: string;
  links?: LinkContent[];
}
export interface HeroSection extends HeroSectionConfig, HeroSectionContent {
  links?: LinkItem[];
}

// Feature Section
export interface FeatureSectionConfig extends SectionConfigBase {
  type: 'feature';
  layout?: 'left' | 'right' | 'center';
  media?: Media;
  links?: LinkConfig[];
}
export interface FeatureSectionContent extends SectionContentBase {
  links?: LinkContent[];
}
export interface FeatureSection extends FeatureSectionConfig, FeatureSectionContent {
  links?: LinkItem[];
}

// Showcase Section
export interface ShowcaseItemConfig {
  id: string;
  media?: Media;
  link?: LinkConfig;
}
export interface ShowcaseItemContent {
  title: string;
  description?: string;
  link?: LinkContent;
}
export interface ShowcaseItem extends ShowcaseItemConfig, ShowcaseItemContent {
  link?: LinkItem;
}

export interface ShowcaseSectionConfig extends SectionConfigBase {
  type: 'showcase';
  items: ShowcaseItemConfig[];
}
export interface ShowcaseSectionContent extends SectionContentBase {
  items: Record<string, ShowcaseItemContent>; // Keyed by item ID
}
export interface ShowcaseSection extends ShowcaseSectionConfig, Omit<ShowcaseSectionContent, 'items'> {
  items: ShowcaseItem[];
}

// Stats Section
export interface StatItem {
  value: string;
  label: string;
  prefix?: string;
  suffix?: string;
}
export interface StatsSectionConfig extends SectionConfigBase {
  type: 'stats';
}
export interface StatsSectionContent extends SectionContentBase {
  items: StatItem[];
}
export interface StatsSection extends StatsSectionConfig, StatsSectionContent { }


// CTA Section
export interface CTASectionConfig extends SectionConfigBase {
  type: 'cta';
  links: LinkConfig[];
}
export interface CTASectionContent extends SectionContentBase {
  links: LinkContent[];
}
export interface CTASection extends CTASectionConfig, CTASectionContent {
  links: LinkItem[];
}

// Text Section
export interface TextSectionConfig extends SectionConfigBase {
  type: 'text';
  links?: LinkConfig[];
}
export interface TextSectionContent extends Omit<SectionContentBase, 'description'> {
  body: string | string[]; // 支持多段落
  links?: LinkContent[];
}
export interface TextSection extends TextSectionConfig, TextSectionContent {
  description?: string; // Added to satisfy SectionContentBase if needed, but TextSection uses body
  links?: LinkItem[];
}


// --- Unions ---

export type SectionConfig =
  | HeroSectionConfig
  | FeatureSectionConfig
  | ShowcaseSectionConfig
  | StatsSectionConfig
  | CTASectionConfig
  | TextSectionConfig;

export type SectionContent =
  | HeroSectionContent
  | FeatureSectionContent
  | ShowcaseSectionContent
  | StatsSectionContent
  | CTASectionContent
  | TextSectionContent;

// 组件使用的完整类型
export type Section =
  | HeroSection
  | FeatureSection
  | ShowcaseSection
  | StatsSection
  | CTASection
  | TextSection;

// --- Page & Site Config ---

export interface PageContent {
  meta: {
    title: string;
    description: string;
    keywords?: string[];
  };
  sections: Record<string, SectionContent>; // Keyed by Section ID
  nav: Record<string, string>; // Keyed by label key
  footer: {
    copyright: string;
    privacy: string;
    terms: string;
    support: string;
    contact: string;
  };
}

export interface NavItem {
  label: string; // Key for translation
  href: string;
  children?: NavItem[];
}

export interface SiteConfig {
  name: string;
  logo?: Media;
  sections: SectionConfig[];
  navigation: NavItem[];
  footer: {
    copyright: string; // Default or key
    links: NavItem[];
  };
}

