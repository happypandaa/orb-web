'use client';

/**
 * CTA Section - 行动召唤区块
 * 引导用户进行下一步操作
 */

import { motion } from 'framer-motion';
import Link from 'next/link';
import type { CTASection as CTASectionType } from '@/types/content';
import { staggerContainer, staggerItem } from '@/lib/motion';

interface CTASectionProps {
  data: CTASectionType;
}

export function CTASection({ data }: CTASectionProps) {
  const { title, description, links, theme = 'dark' } = data;
  
  const isDark = theme === 'dark';
  
  return (
    <section 
      id={data.id}
      className={`
        py-[var(--section-padding)]
        ${isDark 
          ? 'bg-gradient-to-b from-[#1d1d1f] to-black text-white' 
          : 'bg-gradient-to-b from-[#f5f5f7] to-white text-[#1d1d1f]'
        }
      `}
    >
      <motion.div 
        className="section-container text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerContainer}
      >
        {/* 标题 */}
        <motion.h2 
          className="headline-secondary mb-4"
          variants={staggerItem}
        >
          {title}
        </motion.h2>
        
        {/* 描述 */}
        {description && (
          <motion.p 
            className={`
              body-large max-w-2xl mx-auto mb-6
              ${isDark ? 'text-white/70' : 'text-[#86868b]'}
            `}
            variants={staggerItem}
          >
            {description}
          </motion.p>
        )}
        
        {/* 按钮组 */}
        <motion.div 
          className="flex flex-wrap items-center justify-center gap-4"
          variants={staggerItem}
        >
          {links.map((link, index) => (
            <Link
              key={index}
              href={link.href}
              target={link.external ? '_blank' : undefined}
              rel={link.external ? 'noopener noreferrer' : undefined}
              className={`
                inline-flex items-center justify-center
                px-8 py-4 rounded-full
                text-[17px] font-medium
                transition-all duration-300
                ${link.variant === 'primary' 
                  ? 'bg-[#0071e3] text-white hover:bg-[#0077ed] shadow-lg shadow-[#0071e3]/25' 
                  : link.variant === 'secondary'
                  ? isDark 
                    ? 'bg-white text-black hover:bg-white/90'
                    : 'bg-[#1d1d1f] text-white hover:bg-[#1d1d1f]/90'
                  : isDark
                  ? 'text-white hover:text-white/80'
                  : 'text-[#0071e3] hover:text-[#0077ed]'
                }
              `}
            >
              {link.text}
              {link.variant === 'text' && (
                <span className="ml-1">›</span>
              )}
            </Link>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
