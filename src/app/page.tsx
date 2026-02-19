// src/app/page.tsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    // Detect user language
    let lang = 'en';

    if (typeof navigator !== 'undefined' && navigator.language) {
      if (navigator.language.startsWith('zh')) {
        lang = 'zh';
      }
    }

    // Redirect
    router.replace(`/${lang}`);
  }, [router]);

  // Loading UI to prevent white flash
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fafafa] dark:bg-black">
      <div className="flex flex-col items-center gap-4">
        {/* Simple OrbNote Logo / Spinner placeholder */}
        <div className="w-12 h-12 rounded-full border-2 border-t-transparent border-[#1d1d1f] dark:border-white animate-spin"></div>
      </div>
    </div>
  );
}
