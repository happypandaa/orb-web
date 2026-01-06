/**
 * Framer Motion 动效配置
 * 统一管理所有动画参数，保证一致性
 */

import type { Variants, Transition } from 'framer-motion';

// 基础过渡配置
export const transitions = {
  // 默认过渡 - 平滑自然
  default: {
    duration: 0.6,
    ease: [0.25, 0.1, 0.25, 1], // cubic-bezier
  } as Transition,
  
  // 快速过渡 - 响应迅速
  fast: {
    duration: 0.3,
    ease: [0.25, 0.1, 0.25, 1],
  } as Transition,
  
  // 慢速过渡 - 优雅从容
  slow: {
    duration: 0.9,
    ease: [0.25, 0.1, 0.25, 1],
  } as Transition,
  
  // 弹性过渡 - 活泼生动
  spring: {
    type: 'spring',
    stiffness: 100,
    damping: 15,
  } as Transition,
  
  // Apple 风格过渡
  apple: {
    duration: 0.7,
    ease: [0.42, 0, 0.58, 1], // ease-in-out
  } as Transition,
};

// 淡入动画
export const fadeIn: Variants = {
  hidden: { 
    opacity: 0 
  },
  visible: { 
    opacity: 1,
    transition: transitions.default,
  },
};

// 从下方淡入
export const fadeInUp: Variants = {
  hidden: { 
    opacity: 0, 
    y: 30 
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: transitions.default,
  },
};

// 从上方淡入
export const fadeInDown: Variants = {
  hidden: { 
    opacity: 0, 
    y: -30 
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: transitions.default,
  },
};

// 从左侧淡入
export const fadeInLeft: Variants = {
  hidden: { 
    opacity: 0, 
    x: -30 
  },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: transitions.default,
  },
};

// 从右侧淡入
export const fadeInRight: Variants = {
  hidden: { 
    opacity: 0, 
    x: 30 
  },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: transitions.default,
  },
};

// 缩放淡入
export const scaleIn: Variants = {
  hidden: { 
    opacity: 0, 
    scale: 0.95 
  },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: transitions.default,
  },
};

// Stagger 容器 - 子元素依次进入
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

// Stagger 子元素
export const staggerItem: Variants = {
  hidden: { 
    opacity: 0, 
    y: 20 
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: transitions.default,
  },
};

// 文字逐字显示
export const textReveal: Variants = {
  hidden: { 
    opacity: 0,
    y: '100%',
  },
  visible: { 
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

// 图片揭示效果
export const imageReveal: Variants = {
  hidden: { 
    opacity: 0,
    scale: 1.1,
  },
  visible: { 
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

// 滚动触发配置
export const scrollTrigger = {
  // 元素进入视口时触发
  whileInView: {
    once: true,
    amount: 0.2,
    margin: '-50px',
  },
  // 更激进的触发（更早触发）
  eager: {
    once: true,
    amount: 0.1,
    margin: '-100px',
  },
  // 更保守的触发（更晚触发）
  conservative: {
    once: true,
    amount: 0.4,
    margin: '0px',
  },
};

// 创建自定义 stagger 配置
export const createStagger = (
  staggerDelay: number = 0.1,
  initialDelay: number = 0
): Variants => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: staggerDelay,
      delayChildren: initialDelay,
    },
  },
});

// 创建自定义淡入动画
export const createFadeIn = (
  direction: 'up' | 'down' | 'left' | 'right' | 'none' = 'up',
  distance: number = 30,
  duration: number = 0.6
): Variants => {
  const directionMap = {
    up: { y: distance },
    down: { y: -distance },
    left: { x: distance },
    right: { x: -distance },
    none: {},
  };

  return {
    hidden: { 
      opacity: 0, 
      ...directionMap[direction],
    },
    visible: { 
      opacity: 1, 
      x: 0,
      y: 0,
      transition: {
        duration,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };
};

