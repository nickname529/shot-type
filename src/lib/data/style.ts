import type { StyleProfile } from "@/types";

export const styleKeys = [
  "warmth",
  "contrast",
  "saturation",
  "softness",
  "sharpness",
  "grainy",
  "cinematic",
  "natural",
  "moody",
  "vibrant",
  "portrait",
  "street",
  "travel",
  "landscape",
  "documentary",
  "night",
  "filmLike",
  "cleanDigital"
] as const;

export const styleLabels: Record<keyof StyleProfile, string> = {
  warmth: "따뜻함",
  contrast: "대비",
  saturation: "채도",
  softness: "부드러움",
  sharpness: "선명함",
  grainy: "입자감",
  cinematic: "시네마틱",
  natural: "자연스러움",
  moody: "무드",
  vibrant: "생동감",
  portrait: "인물",
  street: "거리",
  travel: "여행",
  landscape: "풍경",
  documentary: "다큐",
  night: "야간",
  filmLike: "필름 느낌",
  cleanDigital: "깨끗한 디지털"
};

export function profile(values: Partial<StyleProfile>): StyleProfile {
  return styleKeys.reduce((acc, key) => {
    acc[key] = Math.max(0, Math.min(10, values[key] ?? 0));
    return acc;
  }, {} as StyleProfile);
}

export function averageProfiles(profiles: Array<Partial<StyleProfile>>) {
  if (!profiles.length) {
    return profile({});
  }

  const totals = styleKeys.reduce((acc, key) => {
    acc[key] = 0;
    return acc;
  }, {} as StyleProfile);

  profiles.forEach((item) => {
    styleKeys.forEach((key) => {
      totals[key] += item[key] ?? 0;
    });
  });

  return profile(
    styleKeys.reduce((acc, key) => {
      acc[key] = totals[key] / profiles.length;
      return acc;
    }, {} as Partial<StyleProfile>)
  );
}
