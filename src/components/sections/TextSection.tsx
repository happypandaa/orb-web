'use client';

/**
 * Text Section - 纯文字内容区块
 * 适合详细说明、故事叙述
 */

import { motion } from 'framer-motion';
import Link from 'next/link';
import type { TextSection as TextSectionType } from '@/types/content';
import { staggerContainer, staggerItem } from '@/lib/motion';

interface TextSectionProps {
  data: TextSectionType;
}

// 获取背景样式
function getThemeClasses(theme: string) {
  switch (theme) {
    case 'dark':
      return 'bg-[#1d1d1f] text-white';
    case 'gray':
      return 'bg-[#f5f5f7] text-[#1d1d1f]';
    default:
      return 'bg-white text-[#1d1d1f]';
  }
}

export function TextSection({ data }: TextSectionProps) {
  const { eyebrow, title, body, links, theme = 'light' } = data;
  
  const isDark = theme === 'dark';
  const themeClasses = getThemeClasses(theme);
  const paragraphs = Array.isArray(body) ? body : [body];
  
  return (
    <section className={`py-[var(--section-padding)] ${themeClasses}`}>
      <motion.div 
        className="section-container max-w-[720px]"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerContainer}
      >
        {/* 眉标 */}
        {eyebrow && (
          <motion.p 
            className="text-[#0071e3] body-small font-semibold uppercase tracking-wider mb-4"
            variants={staggerItem}
          >
            {eyebrow}
          </motion.p>
        )}
        
        {/* 标题 */}
        <motion.h2 
          className="headline-tertiary mb-5"
          variants={staggerItem}
        >
          {title}
        </motion.h2>
        
        {/* 正文段落 */}
        {paragraphs.map((paragraph, index) => (
          <motion.p 
            key={index}
            className={`
              body-medium mb-4 last:mb-0
              ${isDark ? 'text-white/70' : 'text-[#86868b]'}
            `}
            variants={staggerItem}
          >
            {paragraph}
          </motion.p>
        ))}
        
        {/* 链接 */}
        {links && links.length > 0 && (
          <motion.div 
            className="flex flex-wrap gap-6 mt-5"
            variants={staggerItem}
          >
            {links.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                className="link-primary body-medium inline-flex items-center"
              >
                {link.text}
                <span className="ml-1">›</span>
              </Link>
            ))}
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}
