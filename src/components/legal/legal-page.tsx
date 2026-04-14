import type { ReactNode } from "react";
import { legalPageUpdatedAt } from "@/lib/legal";

export function LegalPage({ eyebrow, title, children }: { eyebrow: string; title: string; children: ReactNode }) {
  return (
    <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <p className="text-sm font-semibold text-accent">{eyebrow}</p>
      <h1 className="mt-3 text-3xl font-semibold text-ink sm:text-4xl">{title}</h1>
      <p className="mt-3 text-sm text-muted">최종 업데이트: {legalPageUpdatedAt}</p>
      <div className="prose prose-neutral mt-8 max-w-none space-y-6 text-ink">{children}</div>
    </section>
  );
}

export function LegalBlock({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="rounded-lg border border-line bg-white p-5 shadow-soft">
      <h2 className="text-xl font-semibold text-ink">{title}</h2>
      <div className="mt-3 text-sm leading-7 text-muted">{children}</div>
    </section>
  );
}
