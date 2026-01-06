'use client';

/**
 * Section 渲染器
 * 根据 JSON 数据自动渲染对应的 Section 组件
 */

import type { Section } from '@/types/content';
import { HeroSection } from './HeroSection';
import { FeatureSection } from './FeatureSection';
import { ShowcaseSection } from './ShowcaseSection';
import { StatsSection } from './StatsSection';
import { CTASection } from './CTASection';
import { TextSection } from './TextSection';

interface SectionRendererProps {
  sections: Section[];
}

export function SectionRenderer({ sections }: SectionRendererProps) {
  return (
    <>
      {sections.map((section) => {
        switch (section.type) {
          case 'hero':
            return <HeroSection key={section.id} data={section} />;
          case 'feature':
            return <FeatureSection key={section.id} data={section} />;
          case 'showcase':
            return <ShowcaseSection key={section.id} data={section} />;
          case 'stats':
            return <StatsSection key={section.id} data={section} />;
          case 'cta':
            return <CTASection key={section.id} data={section} />;
          case 'text':
            return <TextSection key={section.id} data={section} />;
          default:
            console.warn(`Unknown section type: ${(section as Section).type}`);
            return null;
        }
      })}
    </>
  );
}

