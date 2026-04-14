import { cn } from "@/lib/utils";

export function Tag({ children, className }: { children: React.ReactNode; className?: string }) {
  return <span className={cn("inline-flex items-center rounded-lg border border-line bg-white px-2.5 py-1 text-xs text-muted", className)}>{children}</span>;
}
