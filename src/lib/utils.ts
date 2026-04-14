export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function formatWon(value: number) {
  if (value >= 100000000) {
    return `${Math.round(value / 10000000) / 10}억원`;
  }

  return `${Math.round(value / 10000).toLocaleString("ko-KR")}만원`;
}

export function clamp(value: number, min = 0, max = 100) {
  return Math.max(min, Math.min(max, value));
}

export function unique<T>(items: T[]) {
  return Array.from(new Set(items));
}
