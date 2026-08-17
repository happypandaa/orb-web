"use client";

import { useEffect } from "react";

export default function WikiRedirectPage() {
  useEffect(() => {
    window.location.replace("/en/wiki/");
  }, []);

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#fbfbfd] px-6 text-center text-[#6e6e73]">
      <p>Opening the OrbNote Wiki…</p>
    </main>
  );
}
