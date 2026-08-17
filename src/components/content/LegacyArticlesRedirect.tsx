"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function LegacyArticlesRedirect({ target }: { target: string }) {
  const router = useRouter();

  useEffect(() => {
    router.replace(target);
  }, [router, target]);

  return (
    <div className="flex min-h-[60vh] items-center justify-center bg-[#fbfbfd] px-6 text-center text-[#1d1d1f]">
      <div>
        <p className="text-[15px] text-[#86868b]">Opening the English article…</p>
        <Link href={target} className="mt-4 inline-block text-[#0066cc] hover:underline">
          Continue to the new address
        </Link>
      </div>
    </div>
  );
}
