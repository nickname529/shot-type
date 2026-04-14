"use client";

import type { TasteImage } from "@/types";

function gradientFor(image: TasteImage) {
  const tags = image.tags;
  if (tags.includes("monochrome")) return "linear-gradient(135deg, #111 0%, #555 52%, #e7e7e2 100%)";
  if (tags.includes("lowlight") || tags.includes("moody")) return "linear-gradient(135deg, #101010 0%, #2f4858 46%, #d95f43 100%)";
  if (tags.includes("warm")) return "linear-gradient(135deg, #1f1a14 0%, #d95f43 48%, #f0c36a 100%)";
  if (tags.includes("vibrant")) return "linear-gradient(135deg, #1f8a70 0%, #d95f43 48%, #f7d154 100%)";
  if (tags.includes("cool")) return "linear-gradient(135deg, #17202a 0%, #4f86a8 52%, #e7e7e2 100%)";
  if (tags.includes("landscape") || tags.includes("nature")) return "linear-gradient(135deg, #153c32 0%, #1f8a70 48%, #c8d8a8 100%)";
  return "linear-gradient(135deg, #101010 0%, #77736c 50%, #f7f7f4 100%)";
}

export function TasteImageVisual({ image }: { image: TasteImage }) {
  return (
    <div className="relative aspect-[4/3] overflow-hidden bg-mist">
      <div className="absolute inset-0" style={{ background: gradientFor(image) }} />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.24),transparent_24%),linear-gradient(135deg,rgba(0,0,0,0.04),rgba(0,0,0,0.28))]" />
      <img
        src={image.imageUrl}
        alt=""
        className="relative h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]"
        onError={(event) => {
          event.currentTarget.style.opacity = "0";
        }}
      />
    </div>
  );
}
