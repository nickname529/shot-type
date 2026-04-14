import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

const variants = {
  primary: "bg-ink text-white hover:bg-accent",
  secondary: "border border-line bg-white text-ink hover:border-ink",
  ghost: "bg-transparent text-ink hover:bg-white"
};

type Variant = keyof typeof variants;

export function Button({
  children,
  className,
  variant = "primary",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }) {
  return (
    <button
      className={cn("focus-ring inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-50", variants[variant], className)}
      {...props}
    >
      {children}
    </button>
  );
}

export function ButtonLink({
  href,
  children,
  className,
  variant = "primary"
}: {
  href: string;
  children: ReactNode;
  className?: string;
  variant?: Variant;
}) {
  return (
    <Link
      href={href}
      className={cn("focus-ring inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-semibold transition", variants[variant], className)}
    >
      {children}
    </Link>
  );
}
