'use client';

/**
 * Motion 动效包装组件
 * 提供统一的滚动触发动画能力
 */

import { ReactNode } from 'react';
import { motion, Variants } from 'framer-motion';
import { fadeInUp } from '@/lib/motion';

interface MotionWrapperProps {
  children: ReactNode;
  variants?: Variants;
  className?: string;
  delay?: number;
  once?: boolean;
  amount?: number;
}

export function MotionWrapper({
  children,
  variants = fadeInUp,
  className = '',
  delay = 0,
  once = true,
  amount = 0.2,
}: MotionWrapperProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      variants={variants}
      className={className}
      style={{ willChange: 'opacity, transform' }}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}

// Stagger 容器组件
interface StaggerContainerProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
  initialDelay?: number;
  once?: boolean;
  amount?: number;
}

export function StaggerContainer({
  children,
  className = '',
  staggerDelay = 0.1,
  initialDelay = 0,
  once = true,
  amount = 0.2,
}: StaggerContainerProps) {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: initialDelay,
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      variants={containerVariants}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Stagger 子元素组件
interface StaggerItemProps {
  children: ReactNode;
  className?: string;
  variants?: Variants;
}

export function StaggerItem({
  children,
  className = '',
  variants,
}: StaggerItemProps) {
  const defaultVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  return (
    <motion.div
      variants={variants || defaultVariants}
      className={className}
    >
      {children}
    </motion.div>
  );
}

