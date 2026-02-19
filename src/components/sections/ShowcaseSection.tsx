'use client';

/**
 * Showcase Section - 多项目展示区块
 * 网格布局展示多个特性/产品
 */

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import type { ShowcaseSection as ShowcaseSectionType } from '@/types/content';
import { staggerContainer, staggerItem } from '@/lib/motion';

interface ShowcaseSectionProps {
  data: ShowcaseSectionType;
}

// 获取背景样式
function getThemeClasses(theme: string) {
  switch (theme) {
    case 'dark':
      return { bg: 'bg-black text-white', card: 'bg-[#1d1d1f]' };
    case 'gray':
      return { bg: 'bg-[#f5f5f7] text-[#1d1d1f]', card: 'bg-white' };
    default:
      return { bg: 'bg-white text-[#1d1d1f]', card: 'bg-[#f5f5f7]' };
  }
}

export function ShowcaseSection({ data }: ShowcaseSectionProps) {
  const { eyebrow, title, description, items, theme = 'light' } = data;

  const isDark = theme === 'dark';
  const themeClasses = getThemeClasses(theme);

  return (
    <section id={data.id} className={`py-[var(--section-padding)] ${themeClasses.bg}`}>
      <div className="section-container section-container-wide">
        {/* 头部 */}
        <motion.div
          className="text-center mb-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
        >


          <motion.h2
            className="headline-secondary mb-4"
            variants={staggerItem}
          >
            {title}
          </motion.h2>

          {description && (
            <motion.p
              className={`
                body-large max-w-3xl mx-auto
                ${isDark ? 'text-white/70' : 'text-[#86868b]'}
              `}
              variants={staggerItem}
            >
              {description}
            </motion.p>
          )}
        </motion.div>

        {/* 网格展示 */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerContainer}
        >
          {items.map((item) => (
            <motion.div
              key={item.id}
              className={`
                group rounded-3xl overflow-hidden
                ${themeClasses.card}
                transition-transform duration-300 hover:scale-[1.02]
              `}
              variants={staggerItem}
            >
              {/* 媒体 */}
              {item.media && (
                <div className="aspect-[4/3] overflow-hidden p-8 bg-gray-50/50">
                  {item.media.type === 'image' && (
                    <Image
                      src={item.media.src}
                      alt={item.media.alt || item.title}
                      width={item.media.width || 600}
                      height={item.media.height || 450}
                      className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                    />
                  )}
                </div>
              )}

              {/* 内容 */}
              <div className="p-8">
                <h3 className="headline-tertiary text-[24px] mb-3">
                  {item.title}
                </h3>

                {item.description && (
                  <p className={`
                    body-small mb-4
                    ${isDark ? 'text-white/60' : 'text-[#86868b]'}
                  `}>
                    {item.description}
                  </p>
                )}

                {item.link && (
                  <Link
                    href={item.link.href}
                    className="link-primary body-small inline-flex items-center"
                  >
                    {item.link.text}
                    <span className="ml-1">›</span>
                  </Link>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
