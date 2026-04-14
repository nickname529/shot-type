"use client";

import { styleKeys, styleLabels } from "@/lib/data";
import type { ScoreVector, StyleProfileKey } from "@/types";

const axes: StyleProfileKey[] = ["warmth", "contrast", "softness", "sharpness", "cinematic", "natural", "moody", "portrait", "street", "travel", "landscape", "filmLike", "cleanDigital"];

function point(index: number, value: number) {
  const angle = (Math.PI * 2 * index) / axes.length - Math.PI / 2;
  const radius = 15 + Math.min(10, value) * 6;
  return [80 + Math.cos(angle) * radius, 80 + Math.sin(angle) * radius] as const;
}

export function RadarChart({ score }: { score: ScoreVector }) {
  const max = Math.max(1, ...styleKeys.map((key) => score[key] ?? 0));
  const values = axes.map((key) => ((score[key] ?? 0) / max) * 10);
  const polygon = values.map((value, index) => point(index, value).join(",")).join(" ");

  return (
    <div className="rounded-lg border border-line bg-white p-4">
      <p className="text-sm font-semibold text-ink">취향 레이더</p>
      <svg viewBox="0 0 160 160" className="mt-3 aspect-square w-full max-w-[360px]">
        {[2, 4, 6, 8, 10].map((level) => (
          <polygon
            key={level}
            points={axes.map((_, index) => point(index, level).join(",")).join(" ")}
            fill="none"
            stroke="#d8d8d2"
            strokeWidth="0.7"
          />
        ))}
        {axes.map((axis, index) => {
          const [x, y] = point(index, 10.8);
          return (
            <text key={axis} x={x} y={y} textAnchor="middle" dominantBaseline="middle" className="fill-muted text-[5px]">
              {styleLabels[axis]}
            </text>
          );
        })}
        <polygon points={polygon} fill="#1f8a70" fillOpacity="0.22" stroke="#1f8a70" strokeWidth="2" />
      </svg>
    </div>
  );
}
