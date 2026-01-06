'use client';

/**
 * 网站底部
 * 简洁的 Apple 风格页脚
 */

import Link from 'next/link';
import type { NavItem } from '@/types/content';

interface FooterProps {
  copyright: string;
  links: NavItem[];
}

export function Footer({ copyright, links }: FooterProps) {
  return (
    <footer className="bg-[#f5f5f7] border-t border-[#d2d2d7]">
      <div className="max-w-[980px] mx-auto px-6 py-5">
        {/* 链接 */}
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-4">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[12px] text-[#424245] hover:text-[#1d1d1f] transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>
        
        {/* 版权信息 */}
        <p className="text-[12px] text-[#86868b] text-center">
          {copyright}
        </p>
      </div>
    </footer>
  );
}

