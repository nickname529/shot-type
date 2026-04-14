"use client";

import type { SelectHTMLAttributes } from "react";

export function SelectField({
  label,
  children,
  ...props
}: SelectHTMLAttributes<HTMLSelectElement> & { label: string }) {
  return (
    <label className="grid gap-2 text-sm">
      <span className="font-medium text-ink">{label}</span>
      <select className="focus-ring rounded-lg border border-line bg-white px-3 py-2 text-sm text-ink" {...props}>
        {children}
      </select>
    </label>
  );
}
