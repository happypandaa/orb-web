'use client';

import { SectionRenderer } from "@/components/sections/SectionRenderer";
import { useLocale } from "@/context/LocaleContext";
import { getSiteConfig } from "@/config/content";
import type {
  PageContent,
  Section,
  SectionConfig,
  SectionContent,
  ShowcaseSectionConfig,
  ShowcaseSectionContent,
  ShowcaseItem,
  LinkConfig,
  LinkContent,
  LinkItem,
  HeroSectionConfig,
  HeroSectionContent,
  FeatureSectionConfig,
  FeatureSectionContent,
  CTASectionConfig,
  CTASectionContent,
  TextSectionConfig,
  TextSectionContent
} from "@/types/content";

function mergeLinks(configLinks?: LinkConfig[], contentLinks?: LinkContent[]): LinkItem[] | undefined {
  if (!configLinks || !contentLinks) return undefined;
  return configLinks.map((link, index) => ({
    ...link,
    ...(contentLinks[index] || { text: '' })
  }));
}

function mergeSection(config: SectionConfig, content: SectionContent): Section {
  const common = {
    ...config,
    ...content
  };

  // Helper type guard
  const isShowcaseConfig = (c: SectionConfig): c is ShowcaseSectionConfig => c.type === 'showcase';
  const isShowcaseContent = (c: SectionContent): c is ShowcaseSectionContent => !('body' in c) && 'items' in c && !Array.isArray(c.items); // Simple check

  if (isShowcaseConfig(config) && isShowcaseContent(content)) {
    const items: ShowcaseItem[] = config.items.map(itemConfig => {
      const itemContent = content.items[itemConfig.id];
      return {
        ...itemConfig,
        ...itemContent,
        link: itemConfig.link && itemContent.link ? { ...itemConfig.link, ...itemContent.link } : undefined
      };
    });
    return {
      ...common,
      type: 'showcase', // Explicitly set for TS
      items
    } as Section;
  }

  // Handle other sections with links
  if (config.type === 'hero' && 'links' in content) {
    return {
      ...common,
      links: mergeLinks(config.links, (content as HeroSectionContent).links)
    } as Section;
  }

  if (config.type === 'feature' && 'links' in content) {
    return {
      ...common,
      links: mergeLinks(config.links, (content as FeatureSectionContent).links)
    } as Section;
  }

  if (config.type === 'cta' && 'links' in content) {
    return {
      ...common,
      links: mergeLinks(config.links, (content as CTASectionContent).links)
    } as Section;
  }

  if (config.type === 'text' && 'links' in content) {
    return {
      ...common,
      links: mergeLinks(config.links, (content as TextSectionContent).links)
    } as Section;
  }

  return common as Section;
}

export default function Home() {
  const { content, locale } = useLocale();

  const pageContent = content as unknown as PageContent;
  const siteConfig = getSiteConfig(locale);

  // Merge config and content
  // We need to ensure we map over the CONFIG sections to preserve order
  const sections: Section[] = siteConfig.sections.map(sectionConfig => {
    const sectionContent = pageContent.sections[sectionConfig.id];
    if (!sectionContent) {
      console.warn(`Missing content for section ${sectionConfig.id}`);
      return sectionConfig as unknown as Section; // Fallback or partial
    }
    return mergeSection(sectionConfig, sectionContent);
  });

  return <SectionRenderer sections={sections} />;
}
