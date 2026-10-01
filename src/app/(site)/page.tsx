"use client";

import dynamic from "next/dynamic";

const ScrollScene = dynamic(
  () =>
    import("@/components/three/ScrollScene").then((m) => m.ScrollScene),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-screen w-full items-center justify-center bg-[var(--bg-primary)]">
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 animate-spin rounded-full border-2 border-[var(--accent-primary)] border-t-transparent" />
          <span className="text-sm text-[var(--text-muted)]">Yükleniyor...</span>
        </div>
      </div>
    ),
  }
);

export default function HomePage() {
  return <ScrollScene />;
}
