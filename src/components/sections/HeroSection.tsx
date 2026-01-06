'use client';

/**
 * Hero Section - 首屏大标题区块
 * Apple 风格的全屏视觉冲击
 */

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import type { HeroSection as HeroSectionType } from '@/types/content';
import { scaleIn, staggerContainer, staggerItem } from '@/lib/motion';

interface HeroSectionProps {
  data: HeroSectionType;
}

export function HeroSection({ data }: HeroSectionProps) {
  const { title, subtitle, description, media, links, theme = 'dark' } = data;
  
  const isDark = theme === 'dark';
  
  // 获取背景样式
  const getThemeClasses = () => {
    switch (theme) {
      case 'dark':
        return 'bg-black text-white';
      case 'gray':
        return 'bg-[#f5f5f7] text-[#1d1d1f]';
      default:
        return 'bg-white text-[#1d1d1f]';
    }
  };
  
  return (
    <section 
      className={`
        relative min-h-screen flex flex-col items-center justify-center overflow-hidden
        ${getThemeClasses()}
      `}
    >
      {/* 内容区域 */}
      <motion.div 
        className="relative z-10 section-container text-center pt-20 pb-6"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        {/* 副标题/眉标 */}
        {subtitle && (
          <motion.p 
            className={`
              body-medium mb-4
              ${isDark ? 'text-white/70' : 'text-[#86868b]'}
            `}
            variants={staggerItem}
          >
            {subtitle}
          </motion.p>
        )}
        
        {/* 主标题 */}
        <motion.h1 
          className="headline-super mb-6"
          variants={staggerItem}
          style={{ whiteSpace: 'pre-line' }}
        >
          {title}
        </motion.h1>
        
        {/* 描述文字 */}
        {description && (
          <motion.p 
            className={`
              body-large max-w-3xl mx-auto mb-10
              ${isDark ? 'text-white/80' : 'text-[#1d1d1f]/80'}
            `}
            variants={staggerItem}
          >
            {description}
          </motion.p>
        )}
        
        {/* 按钮/链接 */}
        {links && links.length > 0 && (
          <motion.div 
            className="flex flex-wrap items-center justify-center gap-4 mb-12"
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
                  px-7 py-3 rounded-full
                  text-[17px] font-medium
                  transition-all duration-300
                  ${link.variant === 'primary' 
                    ? 'bg-[#0071e3] text-white hover:bg-[#0077ed]' 
                    : link.variant === 'secondary'
                    ? isDark 
                      ? 'bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm'
                      : 'bg-black/5 text-[#1d1d1f] hover:bg-black/10'
                    : 'text-[#0071e3] hover:underline'
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
        )}
      </motion.div>
      
      {/* 产品展示图片 - 放在标题下方 */}
      {media && (
        <motion.div 
          className="relative z-10 w-full max-w-6xl mx-auto px-6 pb-10"
          initial="hidden"
          animate="visible"
          variants={scaleIn}
        >
          {media.type === 'image' && (
            <Image
              src={media.src}
              alt={media.alt || ''}
              width={media.width || 1200}
              height={media.height || 800}
              className="w-full h-auto"
              priority
            />
          )}
          {media.type === 'video' && (
            <video
              src={media.src}
              poster={media.poster}
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-auto rounded-2xl"
            />
          )}
        </motion.div>
      )}
      
      {/* 滚动提示 */}
      <motion.div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.6 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
          className={isDark ? 'text-white/50' : 'text-black/50'}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}
