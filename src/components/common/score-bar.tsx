export function ScoreBar({ label, value }: { label: string; value: number }) {
  return (
    <div className="grid gap-1">
      <div className="flex items-center justify-between text-xs text-muted">
        <span>{label}</span>
        <span>{Math.round(value)}점</span>
      </div>
      <div className="h-2 overflow-hidden rounded-lg bg-mist">
        <div className="h-full rounded-lg bg-accent" style={{ width: `${Math.max(0, Math.min(100, value))}%` }} />
      </div>
    </div>
  );
}
