import { buildShopLinks } from "@/lib/data/shop-links";
import { lenses as baseLenses } from "@/lib/data/lenses";
import type { Brand, Lens, LensTag, LensType, StyleProfile } from "@/types";

type LensSeed = {
  brand: Brand;
  model: string;
  mount: string;
  focal: string;
  aperture: string;
  weight: number;
  price: number;
  type: LensType;
  tags: LensTag[];
  bodies: string[];
  style?: Partial<StyleProfile>;
};

const systems: Array<{ mount: string; bodies: string[]; lenses: LensSeed[] }> = [
  {
    mount: "Sony E",
    bodies: ["Alpha a7C II", "Alpha a7 IV", "Alpha a6700"],
    lenses: [
      ["Sony", "FE 24mm F1.4 GM", "24mm", "F1.4", 445, 1650000, "prime", ["street", "vlog", "lowlight", "sharp"]],
      ["Sony", "FE 50mm F1.4 GM", "50mm", "F1.4", 516, 1850000, "prime", ["portrait", "sharp", "lowlight", "creamy_bokeh"]],
      ["Sony", "FE 85mm F1.8", "85mm", "F1.8", 371, 720000, "prime", ["portrait", "creamy_bokeh", "lowlight"]],
      ["Sony", "FE 24-70mm F2.8 GM II", "24-70mm", "F2.8", 695, 2850000, "zoom", ["all_rounder", "portrait", "sharp", "lowlight"]],
      ["Sony", "FE 16-35mm F2.8 GM II", "16-35mm", "F2.8", 547, 2950000, "zoom", ["landscape", "vlog", "travel", "sharp"]],
      ["Tamron", "20-40mm F2.8 Di III", "20-40mm", "F2.8", 365, 880000, "zoom", ["vlog", "travel", "cinematic", "lightweight"]],
      ["Sigma", "85mm F1.4 DG DN Art", "85mm", "F1.4", 630, 1350000, "prime", ["portrait", "sharp", "creamy_bokeh", "lowlight"]]
    ].map((item) => toLensSeed("Sony E", ["Alpha a7C II", "Alpha a7 IV", "Alpha a6700"], item))
  },
  {
    mount: "Fujifilm X",
    bodies: ["X-T30 II", "X-S20", "X-T5"],
    lenses: [
      ["Fujifilm", "XF 23mm F2 R WR", "23mm", "F2", 180, 560000, "prime", ["street", "travel", "lightweight"]],
      ["Fujifilm", "XF 33mm F1.4 R LM WR", "33mm", "F1.4", 360, 980000, "prime", ["street", "portrait", "sharp", "lowlight"]],
      ["Fujifilm", "XF 50mm F2 R WR", "50mm", "F2", 200, 620000, "prime", ["portrait", "lightweight", "sharp"]],
      ["Fujifilm", "XF 16-55mm F2.8 R LM WR II", "16-55mm", "F2.8", 410, 1650000, "zoom", ["all_rounder", "sharp", "travel", "portrait"]],
      ["Fujifilm", "XF 70-300mm F4-5.6 R LM OIS WR", "70-300mm", "F4-5.6", 580, 1050000, "zoom", ["travel", "landscape", "sharp"]],
      ["Viltrox", "27mm F1.2 Pro", "27mm", "F1.2", 560, 760000, "prime", ["street", "portrait", "sharp", "lowlight"]],
      ["Sigma", "10-18mm F2.8 DC DN", "10-18mm", "F2.8", 255, 780000, "zoom", ["vlog", "landscape", "travel", "lightweight"]]
    ].map((item) => toLensSeed("Fujifilm X", ["X-T30 II", "X-S20", "X-T5"], item))
  },
  {
    mount: "Canon RF",
    bodies: ["EOS R50", "EOS R8", "EOS R6 Mark II"],
    lenses: [
      ["Canon", "RF 24-50mm F4.5-6.3 IS STM", "24-50mm", "F4.5-6.3", 210, 360000, "zoom", ["travel", "lightweight", "all_rounder"]],
      ["Canon", "RF 24mm F1.8 Macro IS STM", "24mm", "F1.8", 270, 680000, "prime", ["street", "vlog", "lowlight", "lightweight"]],
      ["Canon", "RF 28mm F2.8 STM", "28mm", "F2.8", 120, 420000, "prime", ["street", "travel", "lightweight"]],
      ["Canon", "RF 24-70mm F2.8 L IS USM", "24-70mm", "F2.8", 900, 2850000, "zoom", ["all_rounder", "portrait", "sharp", "lowlight"]],
      ["Canon", "RF 70-200mm F4 L IS USM", "70-200mm", "F4", 695, 2100000, "zoom", ["portrait", "travel", "sharp"]],
      ["Sigma", "18-50mm F2.8 DC DN RF", "18-50mm", "F2.8", 300, 680000, "zoom", ["all_rounder", "travel", "sharp", "lightweight"]],
      ["Viltrox", "AF 56mm F1.7 RF", "56mm", "F1.7", 171, 280000, "prime", ["portrait", "lightweight", "creamy_bokeh"]]
    ].map((item) => toLensSeed("Canon RF", ["EOS R50", "EOS R8", "EOS R6 Mark II"], item))
  },
  {
    mount: "Nikon Z",
    bodies: ["Z fc", "Zf", "Z6 III"],
    lenses: [
      ["Nikon", "Nikkor Z 26mm F2.8", "26mm", "F2.8", 125, 620000, "prime", ["street", "travel", "lightweight"]],
      ["Nikon", "Nikkor Z 35mm F1.8 S", "35mm", "F1.8", 370, 950000, "prime", ["street", "sharp", "lowlight"]],
      ["Nikon", "Nikkor Z 85mm F1.8 S", "85mm", "F1.8", 470, 980000, "prime", ["portrait", "sharp", "creamy_bokeh"]],
      ["Nikon", "Nikkor Z 24-120mm F4 S", "24-120mm", "F4", 630, 1350000, "zoom", ["travel", "all_rounder", "landscape", "sharp"]],
      ["Nikon", "Nikkor Z 14-30mm F4 S", "14-30mm", "F4", 485, 1450000, "zoom", ["landscape", "travel", "vlog"]],
      ["Tamron", "35-150mm F2-2.8 Di III Z", "35-150mm", "F2-2.8", 1165, 2450000, "zoom", ["portrait", "all_rounder", "lowlight"]],
      ["Viltrox", "AF 20mm F2.8 Z", "20mm", "F2.8", 173, 260000, "prime", ["vlog", "landscape", "lightweight"]]
    ].map((item) => toLensSeed("Nikon Z", ["Z fc", "Zf", "Z6 III"], item))
  },
  {
    mount: "L-Mount",
    bodies: ["Lumix S5 II", "Lumix S9", "Leica SL3"],
    lenses: [
      ["Panasonic", "Lumix S 18mm F1.8", "18mm", "F1.8", 340, 980000, "prime", ["vlog", "landscape", "lowlight"]],
      ["Panasonic", "Lumix S 35mm F1.8", "35mm", "F1.8", 295, 620000, "prime", ["street", "travel", "lowlight", "lightweight"]],
      ["Panasonic", "Lumix S 85mm F1.8", "85mm", "F1.8", 355, 720000, "prime", ["portrait", "creamy_bokeh", "lightweight"]],
      ["Panasonic", "Lumix S Pro 24-70mm F2.8", "24-70mm", "F2.8", 935, 2300000, "zoom", ["all_rounder", "portrait", "sharp"]],
      ["Sigma", "16-28mm F2.8 DG DN L", "16-28mm", "F2.8", 450, 980000, "zoom", ["landscape", "vlog", "travel"]],
      ["Sigma", "45mm F2.8 DG DN Contemporary", "45mm", "F2.8", 215, 520000, "prime", ["street", "travel", "lightweight"]],
      ["Leica", "APO-Summicron-SL 50mm F2", "50mm", "F2", 740, 6900000, "prime", ["portrait", "sharp", "cinematic"]]
    ].map((item) => toLensSeed("L-Mount", ["Lumix S5 II", "Lumix S9", "Leica SL3"], item))
  },
  {
    mount: "Micro Four Thirds",
    bodies: ["OM-5", "OM-1 Mark II", "Lumix GH7"],
    lenses: [
      ["OM System", "M.Zuiko 20mm F1.4 PRO", "20mm", "F1.4", 247, 820000, "prime", ["street", "portrait", "lowlight", "cinematic"]],
      ["OM System", "M.Zuiko 8-25mm F4 PRO", "8-25mm", "F4", 411, 980000, "zoom", ["landscape", "travel", "vlog"]],
      ["OM System", "M.Zuiko 40-150mm F4 PRO", "40-150mm", "F4", 382, 980000, "zoom", ["travel", "portrait", "sharp"]],
      ["OM System", "M.Zuiko 75mm F1.8", "75mm", "F1.8", 305, 820000, "prime", ["portrait", "sharp", "creamy_bokeh"]],
      ["Panasonic", "Leica DG 25mm F1.4 II", "25mm", "F1.4", 205, 580000, "prime", ["street", "portrait", "lowlight"]],
      ["Panasonic", "Leica DG 42.5mm F1.2", "42.5mm", "F1.2", 425, 1350000, "prime", ["portrait", "creamy_bokeh", "lowlight"]],
      ["Panasonic", "Leica DG 10-25mm F1.7", "10-25mm", "F1.7", 690, 1950000, "zoom", ["vlog", "cinematic", "lowlight", "all_rounder"]]
    ].map((item) => toLensSeed("Micro Four Thirds", ["OM-5", "OM-1 Mark II", "Lumix GH7"], item))
  },
  {
    mount: "Leica M",
    bodies: ["M11", "M11 Monochrom", "M6"],
    lenses: [
      ["Leica", "Summicron-M 28mm F2 ASPH", "28mm", "F2", 257, 6200000, "prime", ["street", "sharp", "travel"]],
      ["Leica", "Summilux-M 35mm F1.4 ASPH", "35mm", "F1.4", 320, 7600000, "prime", ["street", "lowlight", "cinematic"]],
      ["Leica", "APO-Summicron-M 50mm F2", "50mm", "F2", 300, 9800000, "prime", ["portrait", "sharp", "cinematic"]],
      ["Voigtlander", "Color-Skopar 35mm F2.5", "35mm", "F2.5", 134, 620000, "prime", ["street", "travel", "lightweight"]],
      ["Voigtlander", "Nokton 40mm F1.2", "40mm", "F1.2", 315, 1250000, "prime", ["street", "lowlight", "creamy_bokeh"]],
      ["Zeiss", "Biogon T* 28mm F2.8 ZM", "28mm", "F2.8", 220, 980000, "prime", ["street", "sharp", "travel"]],
      ["Zeiss", "Planar T* 50mm F2 ZM", "50mm", "F2", 230, 850000, "prime", ["portrait", "sharp", "street"]]
    ].map((item) => toLensSeed("Leica M", ["M11", "M11 Monochrom", "M6"], item))
  },
  {
    mount: "Pentax K",
    bodies: ["K-3 Mark III", "K1000"],
    lenses: [
      ["Pentax", "HD DA 20-40mm F2.8-4 Limited", "20-40mm", "F2.8-4", 283, 780000, "zoom", ["travel", "street", "lightweight"]],
      ["Pentax", "HD FA 31mm F1.8 Limited", "31mm", "F1.8", 345, 1380000, "prime", ["street", "sharp", "lowlight"]],
      ["Pentax", "HD FA 43mm F1.9 Limited", "43mm", "F1.9", 155, 780000, "prime", ["street", "portrait", "lightweight"]],
      ["Pentax", "HD FA 77mm F1.8 Limited", "77mm", "F1.8", 270, 980000, "prime", ["portrait", "creamy_bokeh", "lightweight"]],
      ["Sigma", "18-35mm F1.8 DC HSM K", "18-35mm", "F1.8", 810, 780000, "zoom", ["cinematic", "lowlight", "sharp"]],
      ["Tamron", "90mm F2.8 Macro K", "90mm", "F2.8", 405, 520000, "prime", ["portrait", "sharp"]],
      ["Pentax", "DA 55-300mm F4.5-6.3 PLM", "55-300mm", "F4.5-6.3", 442, 620000, "zoom", ["travel", "landscape", "sharp"]]
    ].map((item) => toLensSeed("Pentax K", ["K-3 Mark III", "K1000"], item))
  },
  {
    mount: "Canon FD",
    bodies: ["AE-1 Program", "New F-1"],
    lenses: [
      ["Canon", "FD 24mm F2.8", "24mm", "F2.8", 330, 260000, "prime", ["street", "travel", "landscape"]],
      ["Canon", "FD 35mm F2 SSC", "35mm", "F2", 420, 420000, "prime", ["street", "lowlight", "cinematic"]],
      ["Canon", "FD 50mm F1.4 SSC", "50mm", "F1.4", 305, 220000, "prime", ["portrait", "street", "lowlight"]],
      ["Canon", "FD 85mm F1.8 SSC", "85mm", "F1.8", 450, 520000, "prime", ["portrait", "creamy_bokeh"]],
      ["Canon", "FD 135mm F2.5", "135mm", "F2.5", 670, 260000, "prime", ["portrait", "sharp"]],
      ["Canon", "FD 35-105mm F3.5", "35-105mm", "F3.5", 600, 220000, "zoom", ["all_rounder", "portrait"]],
      ["Canon", "FD 20-35mm F3.5 L", "20-35mm", "F3.5", 535, 750000, "zoom", ["landscape", "street", "sharp"]]
    ].map((item) => toLensSeed("Canon FD", ["AE-1 Program", "New F-1"], item))
  },
  {
    mount: "Nikon F",
    bodies: ["FM2", "F3", "F100"],
    lenses: [
      ["Nikon", "AI-S 28mm F2.8", "28mm", "F2.8", 250, 320000, "prime", ["street", "travel", "sharp"]],
      ["Nikon", "AI-S 35mm F2", "35mm", "F2", 280, 360000, "prime", ["street", "lowlight", "travel"]],
      ["Nikon", "AI-S 50mm F1.4", "50mm", "F1.4", 250, 260000, "prime", ["portrait", "street", "lowlight"]],
      ["Nikon", "AI-S 85mm F2", "85mm", "F2", 310, 360000, "prime", ["portrait", "lightweight"]],
      ["Nikon", "AF-D 35mm F2", "35mm", "F2", 205, 300000, "prime", ["street", "lightweight", "lowlight"]],
      ["Nikon", "AF-D 85mm F1.8", "85mm", "F1.8", 380, 360000, "prime", ["portrait", "creamy_bokeh"]],
      ["Nikon", "AF-S 24-70mm F2.8G", "24-70mm", "F2.8", 900, 720000, "zoom", ["all_rounder", "portrait", "sharp"]]
    ].map((item) => toLensSeed("Nikon F", ["FM2", "F3", "F100"], item))
  },
  {
    mount: "Hasselblad V",
    bodies: ["500 C/M"],
    lenses: [
      ["Hasselblad", "Zeiss Distagon 50mm F4 CFi", "50mm", "F4", 790, 980000, "prime", ["landscape", "sharp"]],
      ["Hasselblad", "Zeiss Planar 80mm F2.8 C", "80mm", "F2.8", 475, 850000, "prime", ["portrait", "street"]],
      ["Hasselblad", "Zeiss Sonnar 150mm F4 C", "150mm", "F4", 720, 680000, "prime", ["portrait", "creamy_bokeh"]],
      ["Hasselblad", "Zeiss Makro-Planar 120mm F4", "120mm", "F4", 780, 950000, "prime", ["portrait", "sharp"]],
      ["Hasselblad", "Zeiss Distagon 60mm F3.5", "60mm", "F3.5", 660, 850000, "prime", ["landscape", "travel"]],
      ["Hasselblad", "Zeiss Sonnar 250mm F5.6", "250mm", "F5.6", 1000, 620000, "prime", ["portrait", "landscape"]],
      ["Hasselblad", "Zeiss Planar 100mm F3.5", "100mm", "F3.5", 670, 1200000, "prime", ["portrait", "sharp"]]
    ].map((item) => toLensSeed("Hasselblad V", ["500 C/M"], item))
  },
  {
    mount: "Mamiya 7",
    bodies: ["7 II"],
    lenses: [
      ["Mamiya", "43mm F4.5 L", "43mm", "F4.5", 390, 1600000, "prime", ["landscape", "travel", "sharp"]],
      ["Mamiya", "50mm F4.5 L", "50mm", "F4.5", 455, 1200000, "prime", ["travel", "landscape"]],
      ["Mamiya", "65mm F4 L", "65mm", "F4", 455, 980000, "prime", ["street", "travel", "sharp"]],
      ["Mamiya", "80mm F4 L", "80mm", "F4", 290, 850000, "prime", ["street", "travel", "lightweight"]],
      ["Mamiya", "150mm F4.5 L", "150mm", "F4.5", 520, 850000, "prime", ["portrait", "sharp"]],
      ["Mamiya", "210mm F8 L", "210mm", "F8", 590, 720000, "prime", ["landscape", "portrait"]],
      ["Mamiya", "35mm Panoramic Adapter Lens", "35mm", "F4.5", 390, 1450000, "prime", ["landscape", "travel"]]
    ].map((item) => toLensSeed("Mamiya 7", ["7 II"], item))
  }
];

function toLensSeed(mount: string, bodies: string[], item: unknown[]): LensSeed {
  const [brand, model, focal, aperture, weight, price, type, tags] = item as [Brand, string, string, string, number, number, LensType, LensTag[]];
  return {
    brand,
    model,
    mount,
    focal,
    aperture,
    weight,
    price,
    type,
    tags,
    bodies,
    style: {
      portrait: tags.includes("portrait") ? 8 : 0,
      street: tags.includes("street") ? 8 : 0,
      travel: tags.includes("travel") ? 8 : 0,
      landscape: tags.includes("landscape") ? 8 : 0,
      cinematic: tags.includes("cinematic") ? 8 : 0,
      sharpness: tags.includes("sharp") ? 8 : 4,
      softness: tags.includes("creamy_bokeh") ? 7 : 0
    }
  };
}

function buildLens(seed: LensSeed, index: number): Lens {
  const id = `${seed.mount}-${seed.model}`.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  return {
    id: `${id}-${index}`,
    brand: seed.brand,
    model: seed.model,
    mount: seed.mount,
    focalLength: seed.focal,
    maxAperture: seed.aperture,
    weight: seed.weight,
    price: seed.price,
    lensType: seed.type,
    tags: seed.tags,
    compatibleMounts: [seed.mount],
    recommendedUse: seed.tags.slice(0, 3),
    reason: `${seed.model}은 ${seed.tags.slice(0, 2).join(", ")} 성향이 뚜렷해서 바디 추천 결과의 촬영 목적을 구체적인 화각으로 이어줍니다.`,
    exampleBodies: seed.bodies,
    styleBias: seed.style,
    shopLinks: buildShopLinks(`${seed.brand} ${seed.model}`, "new")
  };
}

export const lenses: Lens[] = [
  ...baseLenses.map((lens) => ({
    ...lens,
    shopLinks: lens.shopLinks ?? buildShopLinks(`${lens.brand} ${lens.model}`, "new"),
    styleBias: lens.styleBias ?? {}
  })),
  ...systems.flatMap((system) => system.lenses).map(buildLens)
];
