'use client';

/**
 * Feature Section - 特性展示区块
 * 图文混排，支持左右布局
 */

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import {
  Lock,
  Cloud,
  Shield,
  FileText,
  Sparkles,
  Smartphone,
  Watch,
  Monitor,
  Zap,
  Globe,
  Share2
} from 'lucide-react';
import type { FeatureSection as FeatureSectionType } from '@/types/content';
import { fadeInLeft, fadeInRight, scaleIn, staggerContainer, staggerItem } from '@/lib/motion';

interface FeatureSectionProps {
  data: FeatureSectionType;
}

// 获取背景样式
function getThemeClasses(theme: string) {
  switch (theme) {
    case 'dark':
      return 'bg-black text-white';
    case 'gray':
      return 'bg-[#f5f5f7] text-[#1d1d1f]';
    default:
      return 'bg-white text-[#1d1d1f]';
  }
}

const IconMap: Record<string, any> = {
  lock: Lock,
  cloud: Cloud,
  shield: Shield,
  filetext: FileText,
  sparkles: Sparkles,
  smartphone: Smartphone,
  watch: Watch,
  monitor: Monitor,
  zap: Zap,
  globe: Globe,
  share: Share2
};

export function FeatureSection({ data }: FeatureSectionProps) {
  const {
    eyebrow,
    title,
    description,
    media,
    links,
    icons,
    layout = 'center',
    theme = 'light'
  } = data;

  const isDark = theme === 'dark';
  const themeClasses = getThemeClasses(theme);
  const isCompactScreenshot = data.id === 'ai-workflow';

  // 居中布局
  if (layout === 'center') {
    return (
      <section id={data.id} className={`py-[var(--section-padding)] ${themeClasses}`}>
        <motion.div
          className="section-container flex flex-col items-start text-left"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
        >
          {/* Icons */}
          {icons && icons.length > 0 && (
            <motion.div
              className="flex justify-start gap-4 mb-8"
              variants={staggerItem}
            >
              {icons.map((iconName, index) => {
                // Check if it's a custom SVG file path
                if (iconName.startsWith('/') || iconName.endsWith('.svg')) {
                  return (
                    <div key={index} className="w-[66px] h-[66px] flex items-center justify-center rounded-2xl overflow-hidden">
                      <Image
                        src={iconName}
                        alt=""
                        width={66}
                        height={66}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  );
                }

                const Icon = IconMap[iconName.toLowerCase()];
                if (!Icon) return null;
                return (
                  <div key={index} className="w-[66px] h-[66px] flex items-center justify-center rounded-full bg-blue-500/10 text-[#0071e3]">
                    <Icon size={32} />
                  </div>
                );
              })}
            </motion.div>
          )}



          {eyebrow && (
            <motion.p
              className="text-[#0071e3] body-small font-semibold uppercase tracking-[0.18em] mb-4"
              variants={staggerItem}
            >
              {eyebrow}
            </motion.p>
          )}

          {/* 标题 */}
          <motion.h2
            className="text-[32px] md:text-[56px] leading-[1.08] font-semibold tracking-tight mb-6 max-w-[75%]"
            variants={staggerItem}
          >
            {title}
          </motion.h2>

          {/* 描述 */}
          {description && (
            <motion.p
              className={`
                text-[17px] md:text-[21px] leading-relaxed max-w-[75%] mb-8
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
              className="mt-8 rounded-2xl overflow-hidden"
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
              className="flex flex-wrap items-center justify-start gap-6 mt-8"
              variants={staggerItem}
            >
              {links.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  className="link-primary text-[20px] inline-flex items-center"
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
    <section id={data.id} className={`py-[var(--section-padding)] ${themeClasses}`}>
      <div className="section-container section-container-wide">
        <div className={`
          grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center
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
                className="text-[#0071e3] body-small font-semibold uppercase tracking-[0.18em] mb-4"
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
              <div
                className={`
                  rounded-[24px] overflow-hidden shadow-xl bg-[#f5f5f7] p-2 md:p-3
                  ${isCompactScreenshot ? 'max-w-[320px] md:max-w-[360px] mx-auto' : ''}
                `}
              >
                {media.type === 'image' && (
                  <Image
                    src={media.src}
                    alt={media.alt || ''}
                    width={media.width || 800}
                    height={media.height || 600}
                    className="w-full h-auto rounded-[18px]"
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
                    className="w-full h-auto rounded-[18px]"
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
