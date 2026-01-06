'use client';

/**
 * Stats Section - 数据统计展示区块
 * 展示关键数字和成就
 */

import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion';
import { useRef, useEffect } from 'react';
import type { StatsSection as StatsSectionType, StatItem } from '@/types/content';
import { staggerContainer, staggerItem } from '@/lib/motion';

interface StatsSectionProps {
  data: StatsSectionType;
}

// 数字动画组件
function AnimatedNumber({ 
  value, 
  prefix = '', 
  suffix = '' 
}: { 
  value: string; 
  prefix?: string; 
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  
  // 尝试解析数字
  const numericValue = parseFloat(value.replace(/[^0-9.]/g, ''));
  const isNumeric = !isNaN(numericValue);
  
  const motionValue = useMotionValue(0);
  const rounded = useTransform(motionValue, (latest) => {
    if (value.includes('.')) {
      return latest.toFixed(1);
    }
    return Math.round(latest).toLocaleString();
  });
  
  useEffect(() => {
    if (isInView && isNumeric) {
      const controls = animate(motionValue, numericValue, {
        duration: 2,
        ease: [0.25, 0.1, 0.25, 1],
      });
      return controls.stop;
    }
  }, [isInView, isNumeric, numericValue, motionValue]);
  
  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {isNumeric ? (
        <motion.span>{rounded}</motion.span>
      ) : (
        value
      )}
      {suffix}
    </span>
  );
}

export function StatsSection({ data }: StatsSectionProps) {
  const { title, items, theme = 'dark' } = data;
  
  const isDark = theme === 'dark';
  
  return (
    <section 
      className={`
        py-[var(--section-padding)]
        ${isDark ? 'bg-black text-white' : 'bg-[#fafafa] text-[#1d1d1f]'}
      `}
    >
      <div className="section-container">
        {/* 标题 */}
        {title && (
          <motion.h2 
            className="headline-secondary text-center mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6 }}
          >
            {title}
          </motion.h2>
        )}
        
        {/* 统计数据 */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
        >
          {items.map((item, index) => (
            <motion.div
              key={index}
              className="text-center"
              variants={staggerItem}
            >
              <div className="headline-primary text-[#0071e3] mb-2">
                <AnimatedNumber 
                  value={item.value} 
                  prefix={item.prefix} 
                  suffix={item.suffix} 
                />
              </div>
              <p className={`
                body-medium
                ${isDark ? 'text-white/60' : 'text-[#86868b]'}
              `}>
                {item.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

