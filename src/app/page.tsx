"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from 'next/image';

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
        {/* OrbNote Logo */}
        <div className="relative w-20 h-20 animate-pulse">
          <Image
            src="/icon.png"
            alt="OrbNote"
            fill
            className="object-contain rounded-2xl"
            priority
          />
        </div>
      </div>
    </div>
  );
}
