'use client';

/**
 * Feature Section - 特性展示区块
 * 图文混排，支持左右布局
 */

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import type { FeatureSection as FeatureSectionType } from '@/types/content';
import { fadeInUp, fadeInLeft, fadeInRight, scaleIn, staggerContainer, staggerItem } from '@/lib/motion';

interface FeatureSectionProps {
  data: FeatureSectionType;
}

export function FeatureSection({ data }: FeatureSectionProps) {
  const { 
    eyebrow, 
    title, 
    description, 
    media, 
    links, 
    layout = 'center',
    theme = 'light' 
  } = data;
  
  const isDark = theme === 'dark';
  
  // 居中布局
  if (layout === 'center') {
    return (
      <section 
        className={`
          py-[var(--section-padding)]
          ${isDark ? 'bg-black text-white' : 'bg-[#fafafa] text-[#1d1d1f]'}
        `}
      >
        <motion.div 
          className="section-container text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
        >
          {/* 眉标 */}
          {eyebrow && (
            <motion.p 
              className="text-[#0071e3] body-small font-semibold uppercase tracking-wider mb-3"
              variants={staggerItem}
            >
              {eyebrow}
            </motion.p>
          )}
          
          {/* 标题 */}
          <motion.h2 
            className="headline-secondary mb-6"
            variants={staggerItem}
          >
            {title}
          </motion.h2>
          
          {/* 描述 */}
          {description && (
            <motion.p 
              className={`
                body-large max-w-3xl mx-auto mb-10
                ${isDark ? 'text-white/70' : 'text-[#86868b]'}
              `}
              variants={staggerItem}
            >
              {description}
            </motion.p>
          )}
          
          {/* 媒体 */}
          {media && (
            <motion.div 
              className="mt-12 rounded-2xl overflow-hidden"
              variants={scaleIn}
            >
              {media.type === 'image' && (
                <Image
                  src={media.src}
                  alt={media.alt || ''}
                  width={media.width || 1200}
                  height={media.height || 800}
                  className="w-full h-auto"
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
                  className="w-full h-auto"
                />
              )}
            </motion.div>
          )}
          
          {/* 链接 */}
          {links && links.length > 0 && (
            <motion.div 
              className="flex flex-wrap items-center justify-center gap-6 mt-10"
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
  
  // 左右布局
  const isLeft = layout === 'left';
  
  return (
    <section 
      className={`
        py-[var(--section-padding)]
        ${isDark ? 'bg-black text-white' : 'bg-[#fafafa] text-[#1d1d1f]'}
      `}
    >
      <div className="section-container section-container-wide">
        <div className={`
          grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center
          ${isLeft ? '' : 'lg:flex-row-reverse'}
        `}>
          {/* 文字内容 */}
          <motion.div 
            className={`${isLeft ? 'lg:order-1' : 'lg:order-2'}`}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
          >
            {eyebrow && (
              <motion.p 
                className="text-[#0071e3] body-small font-semibold uppercase tracking-wider mb-3"
                variants={staggerItem}
              >
                {eyebrow}
              </motion.p>
            )}
            
            <motion.h2 
              className="headline-tertiary mb-6"
              variants={staggerItem}
            >
              {title}
            </motion.h2>
            
            {description && (
              <motion.p 
                className={`
                  body-medium mb-8
                  ${isDark ? 'text-white/70' : 'text-[#86868b]'}
                `}
                variants={staggerItem}
              >
                {description}
              </motion.p>
            )}
            
            {links && links.length > 0 && (
              <motion.div 
                className="flex flex-wrap gap-6"
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
          
          {/* 媒体内容 */}
          {media && (
            <motion.div 
              className={`${isLeft ? 'lg:order-2' : 'lg:order-1'}`}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={isLeft ? fadeInRight : fadeInLeft}
            >
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                {media.type === 'image' && (
                  <Image
                    src={media.src}
                    alt={media.alt || ''}
                    width={media.width || 800}
                    height={media.height || 600}
                    className="w-full h-auto"
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
                    className="w-full h-auto"
                  />
                )}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}

