import { profile } from "@/lib/data/style";
import { placeholderImageCredit } from "@/lib/legal";
import type { CaptureMetadata, ImageTasteTag, TasteImage } from "@/types";

type FilmLookSeed = {
  id: string;
  query: string;
  title: string;
  description: string;
  tags: ImageTasteTag[];
  styleProfile: Parameters<typeof profile>[0];
};

const filmLooks: FilmLookSeed[] = [
  { id: "portra-soft-window", query: "soft warm film portrait window", title: "부드러운 포트라 인물", description: "피부톤이 자연스럽고 하이라이트가 부드럽게 이어지는 컬러 네거티브 룩입니다.", tags: ["portrait", "warm", "soft", "filmic"], styleProfile: { portrait: 10, warmth: 8, softness: 9, filmLike: 9, natural: 8 } },
  { id: "gold-sunny-trip", query: "kodak gold sunny travel film", title: "햇빛 좋은 골드 여행", description: "노란 햇빛과 여행지 색이 따뜻하게 살아나는 입문 컬러 필름 느낌입니다.", tags: ["warm", "travel", "vibrant", "filmic"], styleProfile: { warmth: 10, travel: 9, saturation: 7, vibrant: 7, filmLike: 8 } },
  { id: "ektar-vivid-landscape", query: "vivid film landscape saturated", title: "채도 높은 풍경 필름", description: "하늘과 자연색이 선명하게 올라오는 고채도 저감도 필름 룩입니다.", tags: ["landscape", "vibrant", "sharp", "travel"], styleProfile: { landscape: 10, saturation: 10, sharpness: 9, vibrant: 10, filmLike: 7 } },
  { id: "trix-street-shadow", query: "black white film street shadow", title: "트라이엑스 흑백 거리", description: "강한 그림자와 거친 입자가 거리의 순간을 힘 있게 만드는 흑백 룩입니다.", tags: ["monochrome", "street", "contrasty", "documentary"], styleProfile: { contrast: 10, grainy: 8, street: 10, documentary: 9, filmLike: 9 } },
  { id: "hp5-soft-documentary", query: "black white documentary film soft grain", title: "유연한 흑백 다큐", description: "과하게 딱딱하지 않은 흑백 톤과 적당한 입자감이 있는 다큐멘터리 룩입니다.", tags: ["monochrome", "documentary", "street", "soft"], styleProfile: { documentary: 10, street: 8, grainy: 7, contrast: 7, filmLike: 8 } },
  { id: "cinestill-neon-night", query: "cinestill neon night film photography", title: "네온 할레이션 나이트", description: "네온 주변이 번지고 밤의 색이 영화처럼 깊어지는 텅스텐 필름 룩입니다.", tags: ["cinematic", "lowlight", "moody", "filmic"], styleProfile: { cinematic: 10, night: 10, moody: 9, saturation: 7, filmLike: 10 } },
  { id: "metropolis-muted-city", query: "muted color film city street", title: "낮은 채도의 도시", description: "채도를 낮추고 대비를 세워 도시의 쓸쓸한 분위기를 강조한 필름 룩입니다.", tags: ["moody", "street", "contrasty", "filmic"], styleProfile: { moody: 10, street: 9, contrast: 8, saturation: 3, filmLike: 9 } },
  { id: "phoenix-experimental-color", query: "experimental color film street", title: "실험적인 컬러 변주", description: "색이 정확하기보다 예상 밖으로 튀는 컬러와 강한 대비를 즐기는 룩입니다.", tags: ["vibrant", "contrasty", "filmic", "street"], styleProfile: { saturation: 9, contrast: 9, vibrant: 8, grainy: 7, filmLike: 10 } },
  { id: "portra-800-indoor", query: "warm indoor film portrait low light", title: "따뜻한 실내 고감도", description: "실내 조명에서도 인물의 온기와 분위기를 유지하는 고감도 컬러 필름 룩입니다.", tags: ["portrait", "warm", "lowlight", "soft"], styleProfile: { portrait: 9, warmth: 9, night: 7, softness: 8, filmLike: 9 } },
  { id: "delta-3200-concert", query: "grainy black white concert film", title: "거친 공연 흑백", description: "입자가 크게 보이고 어두운 공연장의 에너지가 살아나는 초고감도 흑백 룩입니다.", tags: ["lowlight", "monochrome", "moody", "documentary"], styleProfile: { night: 10, grainy: 10, moody: 9, documentary: 8, contrast: 8 } },
  { id: "acros-smooth-landscape", query: "smooth black white landscape film", title: "고운 흑백 풍경", description: "입자가 작고 계조가 매끈해서 풍경과 정물을 차분하게 보여주는 흑백 룩입니다.", tags: ["landscape", "monochrome", "natural", "sharp"], styleProfile: { landscape: 9, sharpness: 9, natural: 9, filmLike: 7, contrast: 6 } },
  { id: "lomography-party-color", query: "color film party flash friends", title: "친구들과 파티 컬러", description: "플래시, 강한 색, 예측 불가능한 필름 느낌이 어울리는 캐주얼 룩입니다.", tags: ["vibrant", "portrait", "contrasty", "filmic"], styleProfile: { vibrant: 9, saturation: 9, portrait: 7, contrast: 7, grainy: 6 } },
  { id: "pastel-family-film", query: "pastel family film photography", title: "파스텔 가족 필름", description: "대비를 낮추고 따뜻한 추억처럼 남기는 부드러운 가족 기록 룩입니다.", tags: ["warm", "soft", "portrait", "documentary"], styleProfile: { warmth: 8, softness: 9, portrait: 8, documentary: 8, filmLike: 8 } },
  { id: "slide-clean-travel", query: "slide film clean travel landscape", title: "슬라이드처럼 깨끗한 여행", description: "노출이 정확할 때 선명하고 투명한 색이 살아나는 슬라이드 필름 감각입니다.", tags: ["clean", "sharp", "travel", "landscape"], styleProfile: { cleanDigital: 6, sharpness: 10, saturation: 9, travel: 9, landscape: 8 } },
  { id: "half-frame-diary", query: "half frame film diary snapshot", title: "하프프레임 다이어리", description: "완벽한 한 컷보다 작은 장면을 많이 모아 일기처럼 남기는 필름 룩입니다.", tags: ["documentary", "travel", "soft", "filmic"], styleProfile: { documentary: 9, travel: 8, filmLike: 9, grainy: 7, natural: 7 } },
  { id: "medium-format-portrait", query: "medium format film portrait soft", title: "중형 필름 인물", description: "큰 네거티브의 부드러운 계조와 분리감이 돋보이는 느린 인물 룩입니다.", tags: ["portrait", "soft", "filmic", "natural"], styleProfile: { portrait: 10, softness: 9, natural: 9, filmLike: 10, sharpness: 7 } },
  { id: "night-rain-color-film", query: "rain night color film street", title: "비 오는 컬러 밤거리", description: "젖은 도로의 반사와 어두운 색이 시네마틱하게 섞이는 야간 컬러 필름 룩입니다.", tags: ["lowlight", "cinematic", "street", "moody"], styleProfile: { night: 10, cinematic: 9, street: 8, moody: 10, filmLike: 9 } },
  { id: "minimal-bw-architecture", query: "minimal black white architecture film", title: "미니멀 흑백 건축", description: "색 없이 선과 면, 밝기 차이만으로 구조를 보여주는 정제된 흑백 룩입니다.", tags: ["monochrome", "minimal", "sharp", "contrasty"], styleProfile: { sharpness: 9, contrast: 8, natural: 6, cleanDigital: 4, filmLike: 7 } },
  { id: "warm-food-film", query: "warm food table film photography", title: "따뜻한 테이블 필름", description: "음식과 나무 테이블의 온기가 부드럽게 살아나는 일상 컬러 필름 룩입니다.", tags: ["warm", "travel", "documentary", "soft"], styleProfile: { warmth: 10, softness: 7, documentary: 6, saturation: 6, filmLike: 8 } },
  { id: "cool-fog-film", query: "foggy cool film landscape", title: "차가운 안개 필름", description: "낮은 채도와 부드러운 안개가 조용한 감정을 만드는 풍경 필름 룩입니다.", tags: ["cool", "moody", "landscape", "soft"], styleProfile: { moody: 9, landscape: 8, softness: 9, natural: 8, saturation: 3 } },
  { id: "street-flash-film", query: "street flash film photography night", title: "플래시 필름 스냅", description: "밤거리에서 플래시로 피사체를 또렷하게 분리하는 강한 거리 필름 룩입니다.", tags: ["street", "lowlight", "sharp", "contrasty"], styleProfile: { street: 10, night: 8, contrast: 9, sharpness: 8, filmLike: 8 } },
  { id: "instant-party-memory", query: "instant film party friends", title: "즉석사진 파티 기록", description: "선명한 스캔보다 바로 손에 남는 추억과 부드러운 색을 중시하는 룩입니다.", tags: ["portrait", "soft", "warm", "filmic"], styleProfile: { portrait: 7, softness: 9, warmth: 7, filmLike: 9, natural: 5 } },
  { id: "travel-market-colorplus", query: "casual color film travel market", title: "캐주얼 여행 컬러", description: "너무 비싸지 않은 필름으로 여행지의 색과 사람을 편하게 기록하는 룩입니다.", tags: ["travel", "vibrant", "documentary", "warm"], styleProfile: { travel: 9, vibrant: 7, documentary: 7, warmth: 7, filmLike: 7 } },
  { id: "fine-grain-product-film", query: "fine grain film still life", title: "고운 입자의 정물", description: "입자를 줄이고 색과 디테일을 차분하게 보여주는 저감도 필름 룩입니다.", tags: ["sharp", "clean", "natural", "filmic"], styleProfile: { sharpness: 9, natural: 8, cleanDigital: 5, filmLike: 7, contrast: 5 } }
];

const sourceNote = "MVP reference capture profile. Replace with licensed EXIF-verified sample photos in production.";

const captureProfiles: Record<string, Omit<CaptureMetadata, "verified" | "sourceNote">> = {
  "portra-soft-window": {
    cameraId: "canon-eos-1v",
    cameraLabel: "Canon EOS-1V",
    lensLabel: "Canon EF 85mm F1.8",
    filmStockId: "kodak-portra-400",
    filmStockLabel: "Kodak Portra 400",
    brandHint: "Canon"
  },
  "gold-sunny-trip": {
    cameraId: "olympus-mju-ii",
    cameraLabel: "Olympus mju-II",
    lensLabel: "Olympus 35mm F2.8 fixed lens",
    filmStockId: "kodak-gold-200",
    filmStockLabel: "Kodak Gold 200",
    brandHint: "Olympus"
  },
  "ektar-vivid-landscape": {
    cameraId: "mamiya-7ii",
    cameraLabel: "Mamiya 7 II",
    lensLabel: "Mamiya N 80mm F4",
    filmStockId: "kodak-ektar-100",
    filmStockLabel: "Kodak Ektar 100",
    brandHint: "Mamiya"
  },
  "trix-street-shadow": {
    cameraId: "leica-m6-film",
    cameraLabel: "Leica M6",
    lensLabel: "Leica Summicron-M 35mm F2",
    filmStockId: "kodak-tri-x-400",
    filmStockLabel: "Kodak Tri-X 400",
    brandHint: "Leica"
  },
  "hp5-soft-documentary": {
    cameraId: "nikon-fm2",
    cameraLabel: "Nikon FM2",
    lensLabel: "Nikkor 35mm F2",
    filmStockId: "ilford-hp5",
    filmStockLabel: "Ilford HP5 Plus",
    brandHint: "Nikon"
  },
  "cinestill-neon-night": {
    cameraId: "contax-t2",
    cameraLabel: "Contax T2",
    lensLabel: "Carl Zeiss Sonnar 38mm F2.8",
    filmStockId: "cinestill-800t",
    filmStockLabel: "Cinestill 800T",
    brandHint: "Contax"
  },
  "metropolis-muted-city": {
    cameraId: "ricoh-gr1v",
    cameraLabel: "Ricoh GR1v",
    lensLabel: "Ricoh GR 28mm F2.8",
    filmStockId: "lomography-metropolis",
    filmStockLabel: "Lomography Metropolis",
    brandHint: "Ricoh"
  },
  "phoenix-experimental-color": {
    cameraId: "pentax-17",
    cameraLabel: "Pentax 17",
    lensLabel: "HD Pentax 25mm F3.5",
    filmStockId: "harman-phoenix-200",
    filmStockLabel: "Harman Phoenix 200",
    brandHint: "Pentax"
  },
  "portra-800-indoor": {
    cameraId: "canon-eos-1v",
    cameraLabel: "Canon EOS-1V",
    lensLabel: "Canon EF 50mm F1.4",
    filmStockId: "kodak-portra-800",
    filmStockLabel: "Kodak Portra 800",
    brandHint: "Canon"
  },
  "delta-3200-concert": {
    cameraId: "nikon-f100",
    cameraLabel: "Nikon F100",
    lensLabel: "Nikkor 50mm F1.4",
    filmStockId: "ilford-delta-3200",
    filmStockLabel: "Ilford Delta 3200",
    brandHint: "Nikon"
  },
  "acros-smooth-landscape": {
    cameraId: "fujifilm-ga645",
    cameraLabel: "Fujifilm GA645",
    lensLabel: "Fujinon 60mm F4",
    filmStockId: "fujifilm-acros-100",
    filmStockLabel: "Fujifilm Acros 100",
    brandHint: "Fujifilm"
  },
  "lomography-party-color": {
    cameraId: "olympus-xa",
    cameraLabel: "Olympus XA",
    lensLabel: "Zuiko 35mm F2.8",
    filmStockId: "lomography-color-800",
    filmStockLabel: "Lomography Color Negative 800",
    brandHint: "Olympus"
  },
  "pastel-family-film": {
    cameraId: "minolta-x700",
    cameraLabel: "Minolta X-700",
    lensLabel: "Minolta MD 50mm F1.7",
    filmStockId: "kodak-portra-400",
    filmStockLabel: "Kodak Portra 400",
    brandHint: "Minolta"
  },
  "slide-clean-travel": {
    cameraId: "nikon-f3",
    cameraLabel: "Nikon F3",
    lensLabel: "Nikkor 28mm F2.8",
    filmStockId: "cinestill-50d",
    filmStockLabel: "Cinestill 50D",
    brandHint: "Nikon"
  },
  "half-frame-diary": {
    cameraId: "kodak-ektar-h35",
    cameraLabel: "Kodak Ektar H35",
    lensLabel: "Kodak 22mm F9.5 fixed lens",
    filmStockId: "kodak-colorplus-200",
    filmStockLabel: "Kodak ColorPlus 200",
    brandHint: "Kodak"
  },
  "medium-format-portrait": {
    cameraId: "hasselblad-500cm",
    cameraLabel: "Hasselblad 500CM",
    lensLabel: "Carl Zeiss Planar 80mm F2.8",
    filmStockId: "kodak-portra-160",
    filmStockLabel: "Kodak Portra 160",
    brandHint: "Hasselblad"
  },
  "night-rain-color-film": {
    cameraId: "leica-minilux",
    cameraLabel: "Leica Minilux",
    lensLabel: "Summarit 40mm F2.4",
    filmStockId: "cinestill-800t",
    filmStockLabel: "Cinestill 800T",
    brandHint: "Leica"
  },
  "minimal-bw-architecture": {
    cameraId: "canon-new-f1",
    cameraLabel: "Canon New F-1",
    lensLabel: "Canon FD 35mm F2",
    filmStockId: "ilford-delta-100",
    filmStockLabel: "Ilford Delta 100",
    brandHint: "Canon"
  },
  "warm-food-film": {
    cameraId: "olympus-pen-ft",
    cameraLabel: "Olympus Pen FT",
    lensLabel: "Zuiko 38mm F1.8",
    filmStockId: "kodak-gold-200",
    filmStockLabel: "Kodak Gold 200",
    brandHint: "Olympus"
  },
  "cool-fog-film": {
    cameraId: "olympus-om4ti",
    cameraLabel: "Olympus OM-4 Ti",
    lensLabel: "Zuiko 50mm F1.8",
    filmStockId: "ilford-fp4",
    filmStockLabel: "Ilford FP4 Plus",
    brandHint: "Olympus"
  },
  "street-flash-film": {
    cameraId: "contax-g2",
    cameraLabel: "Contax G2",
    lensLabel: "Carl Zeiss Biogon 28mm F2.8",
    filmStockId: "kodak-ultramax-400",
    filmStockLabel: "Kodak Ultramax 400",
    brandHint: "Contax"
  },
  "instant-party-memory": {
    cameraId: "kodak-ektar-h35",
    cameraLabel: "Instant snapshot profile",
    lensLabel: "Built-in instant lens profile",
    filmStockId: "instax-mini-color",
    filmStockLabel: "Fujifilm Instax Mini Color",
    brandHint: "Fujifilm"
  },
  "travel-market-colorplus": {
    cameraId: "pentax-k1000",
    cameraLabel: "Pentax K1000",
    lensLabel: "SMC Pentax-M 50mm F1.7",
    filmStockId: "kodak-colorplus-200",
    filmStockLabel: "Kodak ColorPlus 200",
    brandHint: "Pentax"
  },
  "fine-grain-product-film": {
    cameraId: "nikon-f3",
    cameraLabel: "Nikon F3",
    lensLabel: "Micro-Nikkor 55mm F2.8",
    filmStockId: "kodak-tmax-400",
    filmStockLabel: "Kodak T-Max 400",
    brandHint: "Nikon"
  }
};

function captureForFilmLook(id: string): CaptureMetadata {
  const capture = captureProfiles[id] ?? captureProfiles["portra-soft-window"];
  return { ...capture, verified: false, sourceNote };
}

function imageUrl(query: string, index: number) {
  return `https://picsum.photos/seed/film-${encodeURIComponent(query)}-${index + 500}/960/720`;
}

export const filmTasteImages: TasteImage[] = filmLooks.map((look, index) => ({
  id: look.id,
  imageUrl: imageUrl(look.query, index),
  title: look.title,
  description: look.description,
  tags: look.tags,
  styleProfile: profile(look.styleProfile),
  capture: captureForFilmLook(look.id),
  credit: placeholderImageCredit,
  styleDescription: look.description
}));
