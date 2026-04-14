import { profile } from "@/lib/data/style";
import { placeholderImageCredit } from "@/lib/legal";
import type { CaptureMetadata, ImageTasteTag, TasteImage } from "@/types";

type TasteSeed = {
  id: string;
  query: string;
  title: string;
  description: string;
  tags: ImageTasteTag[];
  styleProfile: Parameters<typeof profile>[0];
};

const seeds: TasteSeed[] = [
  { id: "warm-window-portrait", query: "warm portrait window light", title: "창가의 따뜻한 인물", description: "부드러운 창가 빛과 따뜻한 피부톤이 중심인 인물 사진입니다.", tags: ["warm", "portrait", "soft", "filmic"], styleProfile: { warmth: 9, portrait: 9, softness: 8, filmLike: 7, natural: 6 } },
  { id: "cool-urban-lines", query: "cool urban architecture lines", title: "차가운 도시의 선", description: "도시 구조물의 선과 차가운 색감이 또렷하게 보이는 사진입니다.", tags: ["cool", "street", "clean", "minimal"], styleProfile: { cleanDigital: 8, sharpness: 8, street: 6, contrast: 6, natural: 5 } },
  { id: "moody-night-neon", query: "moody night neon street", title: "네온이 있는 밤거리", description: "어두운 밤과 네온빛, 강한 분위기가 살아 있는 야간 거리 사진입니다.", tags: ["moody", "lowlight", "cinematic", "contrasty"], styleProfile: { night: 10, moody: 9, cinematic: 8, contrast: 8, saturation: 6 } },
  { id: "vivid-market-travel", query: "vivid travel market colors", title: "선명한 여행지 시장", description: "여행지의 사람과 색이 풍부하게 섞인 생동감 있는 사진입니다.", tags: ["vibrant", "travel", "documentary", "warm"], styleProfile: { vibrant: 9, saturation: 9, travel: 9, documentary: 6, warmth: 7 } },
  { id: "monochrome-crossing", query: "black and white street crossing", title: "흑백 거리의 순간", description: "색을 덜어내고 빛과 그림자, 사람의 움직임을 강조한 거리 사진입니다.", tags: ["monochrome", "street", "documentary", "contrasty"], styleProfile: { street: 9, documentary: 8, contrast: 9, filmLike: 7, moody: 6 } },
  { id: "clean-product-light", query: "clean minimal product photography", title: "깨끗한 제품 사진", description: "정돈된 조명과 선명한 디테일이 중심인 깨끗한 디지털 톤입니다.", tags: ["clean", "sharp", "minimal"], styleProfile: { cleanDigital: 10, sharpness: 9, natural: 6, contrast: 5 } },
  { id: "filmic-cafe-snap", query: "filmic cafe street snapshot", title: "카페 앞 필름풍 스냅", description: "일상적인 장소를 필름처럼 부드럽고 따뜻하게 담은 스냅입니다.", tags: ["filmic", "warm", "street", "soft"], styleProfile: { filmLike: 9, warmth: 8, street: 7, softness: 7, grainy: 5 } },
  { id: "clear-mountain-landscape", query: "sharp mountain landscape clear", title: "선명한 산 풍경", description: "먼 산과 하늘의 디테일이 또렷한 자연 풍경 사진입니다.", tags: ["nature", "landscape", "sharp", "clean"], styleProfile: { landscape: 10, sharpness: 9, cleanDigital: 7, natural: 8, travel: 6 } },
  { id: "cinematic-road-night", query: "cinematic car road night", title: "영화 같은 야간 도로", description: "낮은 조도와 도로의 빛이 시네마틱하게 이어지는 사진입니다.", tags: ["cinematic", "lowlight", "moody", "cool"], styleProfile: { cinematic: 10, night: 9, moody: 8, contrast: 7, cleanDigital: 5 } },
  { id: "soft-family-day", query: "soft family documentary daylight", title: "부드러운 가족 기록", description: "강한 연출보다 자연스러운 표정과 부드러운 빛이 중심인 기록 사진입니다.", tags: ["soft", "warm", "portrait", "documentary"], styleProfile: { softness: 8, warmth: 7, portrait: 7, documentary: 7, natural: 8 } },
  { id: "sharp-glass-building", query: "sharp architecture glass building", title: "유리 건축의 선명함", description: "직선, 반사, 구조의 디테일이 깔끔하게 살아 있는 건축 사진입니다.", tags: ["sharp", "clean", "cool", "minimal"], styleProfile: { sharpness: 10, cleanDigital: 8, contrast: 7, natural: 5 } },
  { id: "sunny-beach-travel", query: "sunny beach travel vibrant", title: "햇빛 강한 해변 여행", description: "밝은 햇빛과 높은 채도가 여행의 산뜻함을 보여주는 사진입니다.", tags: ["vibrant", "travel", "warm", "nature"], styleProfile: { travel: 10, vibrant: 9, saturation: 9, warmth: 8, landscape: 6 } },
  { id: "bus-stop-documentary", query: "documentary bus stop street", title: "버스 정류장의 기록", description: "평범한 거리의 장면을 과장 없이 관찰하는 다큐멘터리 사진입니다.", tags: ["documentary", "street", "natural", "filmic"], styleProfile: { documentary: 10, street: 8, natural: 8, filmLike: 6, softness: 5 } },
  { id: "shallow-depth-portrait", query: "shallow depth portrait warm", title: "얕은 심도의 인물", description: "배경을 부드럽게 흐리고 얼굴과 분위기를 강조한 인물 사진입니다.", tags: ["portrait", "soft", "warm", "cinematic"], styleProfile: { portrait: 10, softness: 8, warmth: 7, cinematic: 6, contrast: 5 } },
  { id: "high-contrast-shadow", query: "high contrast city shadow street", title: "강한 그림자의 거리", description: "햇빛과 그림자의 대비가 그래픽하게 드러나는 거리 사진입니다.", tags: ["contrasty", "street", "monochrome", "sharp"], styleProfile: { contrast: 10, street: 8, sharpness: 7, documentary: 6, filmLike: 5 } },
  { id: "minimal-white-interior", query: "minimal white interior soft light", title: "밝은 미니멀 실내", description: "여백과 부드러운 빛이 많은 차분한 실내 사진입니다.", tags: ["minimal", "clean", "soft", "cool"], styleProfile: { softness: 8, cleanDigital: 8, natural: 7, contrast: 3, sharpness: 5 } },
  { id: "warm-jazz-lowlight", query: "warm jazz bar low light", title: "작은 바의 낮은 조도", description: "따뜻한 조명과 어두운 그림자가 음악적인 분위기를 만드는 사진입니다.", tags: ["lowlight", "warm", "moody", "cinematic"], styleProfile: { warmth: 9, night: 8, moody: 9, cinematic: 8, grainy: 5 } },
  { id: "misty-forest", query: "misty forest moody landscape", title: "안개 낀 숲", description: "낮은 대비와 차분한 색으로 숲의 공기를 보여주는 풍경 사진입니다.", tags: ["nature", "moody", "soft", "cool"], styleProfile: { landscape: 8, moody: 8, softness: 8, natural: 9, contrast: 3 } },
  { id: "train-window-travel", query: "train window travel documentary", title: "기차 창가의 여행", description: "이동 중 바라보는 창밖과 순간의 감정을 담은 여행 기록입니다.", tags: ["travel", "documentary", "filmic", "warm"], styleProfile: { travel: 10, documentary: 8, filmLike: 7, warmth: 6, natural: 7 } },
  { id: "clean-action-sport", query: "clean sharp action sports photography", title: "선명한 움직임", description: "빠른 움직임을 깨끗하게 멈춰 세운 액션 중심 사진입니다.", tags: ["sharp", "clean", "vibrant", "documentary"], styleProfile: { sharpness: 10, cleanDigital: 9, documentary: 6, vibrant: 7, saturation: 6 } },
  { id: "cool-studio-portrait", query: "cool studio portrait minimal", title: "차분한 스튜디오 인물", description: "색을 절제하고 얼굴의 형태와 조명 균형을 보여주는 인물 사진입니다.", tags: ["portrait", "cool", "sharp", "minimal"], styleProfile: { portrait: 9, sharpness: 8, cleanDigital: 8, contrast: 5, natural: 6 } },
  { id: "golden-hour-street", query: "golden hour street photography", title: "골든아워 거리", description: "낮은 햇빛과 긴 그림자가 거리를 따뜻하게 만드는 사진입니다.", tags: ["street", "warm", "filmic", "contrasty"], styleProfile: { warmth: 9, street: 9, filmLike: 8, contrast: 7, documentary: 5 } },
  { id: "cozy-room-video", query: "cozy room cinematic lifestyle", title: "시네마틱 실내 라이프스타일", description: "영상처럼 보기 편한 조명과 부드러운 실내 분위기가 있는 사진입니다.", tags: ["cinematic", "warm", "clean", "soft"], styleProfile: { cinematic: 8, warmth: 8, softness: 7, cleanDigital: 7, natural: 6 } },
  { id: "blue-coast-landscape", query: "blue coast landscape travel", title: "푸른 해안 풍경", description: "시원한 색과 넓은 공간감이 살아 있는 여행 풍경 사진입니다.", tags: ["nature", "travel", "cool", "sharp"], styleProfile: { landscape: 9, travel: 9, sharpness: 8, saturation: 6, natural: 7 } },
  { id: "bw-soft-portrait", query: "black white soft portrait", title: "흑백의 부드러운 인물", description: "색 대신 표정, 질감, 부드러운 명암으로 분위기를 만드는 인물 사진입니다.", tags: ["monochrome", "portrait", "soft", "moody"], styleProfile: { portrait: 9, softness: 8, moody: 7, filmLike: 7, grainy: 5 } },
  { id: "vivid-food-table", query: "vivid food table travel", title: "풍부한 색의 테이블", description: "음식과 테이블의 색이 여행의 기억처럼 선명한 사진입니다.", tags: ["vibrant", "warm", "travel", "documentary"], styleProfile: { saturation: 9, warmth: 8, travel: 7, documentary: 6, vibrant: 9 } },
  { id: "pocket-street-snapshot", query: "compact camera street snapshot", title: "주머니 카메라의 거리 스냅", description: "작은 카메라로 빠르게 포착한 자연스러운 거리 장면입니다.", tags: ["street", "documentary", "filmic", "minimal"], styleProfile: { street: 10, documentary: 8, filmLike: 7, natural: 7, sharpness: 5 } },
  { id: "editorial-clean-portrait", query: "clean editorial portrait sharp", title: "정돈된 에디토리얼 인물", description: "상업 촬영처럼 선명하고 균형 잡힌 인물 사진입니다.", tags: ["clean", "sharp", "portrait", "minimal"], styleProfile: { cleanDigital: 9, sharpness: 9, portrait: 8, contrast: 6, natural: 6 } },
  { id: "moody-cabin-light", query: "moody cabin warm low light", title: "따뜻한 오두막의 무드", description: "어두운 실내와 따뜻한 조명이 필름 같은 분위기를 만드는 사진입니다.", tags: ["moody", "warm", "lowlight", "filmic"], styleProfile: { moody: 9, warmth: 9, night: 7, filmLike: 9, grainy: 6 } },
  { id: "park-dog-natural", query: "natural park dog documentary", title: "공원의 자연스러운 기록", description: "꾸미지 않은 빛과 움직임으로 일상을 편안하게 담은 사진입니다.", tags: ["natural", "travel", "documentary", "soft"], styleProfile: { natural: 10, documentary: 8, travel: 5, softness: 6, warmth: 5 } },
  { id: "subway-cool-motion", query: "cool subway motion street", title: "지하철의 차가운 움직임", description: "도시 이동의 리듬과 차가운 조명이 만나는 거리 사진입니다.", tags: ["cool", "street", "cinematic", "moody"], styleProfile: { street: 9, cinematic: 7, moody: 7, night: 5, contrast: 6 } },
  { id: "wildlife-sharp", query: "sharp wildlife nature photography", title: "또렷한 자연 피사체", description: "자연 속 피사체의 디테일과 순간을 선명하게 포착한 사진입니다.", tags: ["nature", "sharp", "documentary", "vibrant"], styleProfile: { landscape: 6, sharpness: 10, documentary: 8, vibrant: 7, natural: 8 } },
  { id: "cinema-couple-night", query: "cinematic couple night street", title: "밤거리의 영화적 인물", description: "인물과 도시의 밤빛이 함께 어우러지는 시네마틱한 사진입니다.", tags: ["cinematic", "portrait", "lowlight", "moody"], styleProfile: { cinematic: 10, portrait: 8, night: 9, moody: 8, warmth: 5 } },
  { id: "pastel-film-travel", query: "pastel film travel photography", title: "파스텔 필름 여행", description: "채도를 살짝 낮추고 부드러운 색으로 여행의 여운을 담은 사진입니다.", tags: ["filmic", "travel", "soft", "warm"], styleProfile: { filmLike: 9, travel: 8, softness: 8, warmth: 7, saturation: 5 } },
  { id: "clean-vlog-desk", query: "clean desk lifestyle vlog", title: "깨끗한 데스크 라이프스타일", description: "영상 썸네일처럼 밝고 정돈된 실내 생활 사진입니다.", tags: ["clean", "minimal", "sharp", "natural"], styleProfile: { cleanDigital: 9, natural: 8, sharpness: 7, contrast: 4, saturation: 5 } },
  { id: "grainy-night-film", query: "grainy film night street", title: "입자감 있는 필름 밤거리", description: "거친 입자와 어두운 색이 필름 야간 스냅의 분위기를 만듭니다.", tags: ["filmic", "lowlight", "street", "moody"], styleProfile: { filmLike: 10, grainy: 9, night: 9, street: 8, moody: 9 } },
  { id: "high-saturation-city", query: "vibrant city street color", title: "채도 높은 도시 색", description: "간판과 옷, 거리의 색이 강하게 살아 있는 도시 사진입니다.", tags: ["vibrant", "street", "contrasty", "clean"], styleProfile: { vibrant: 10, saturation: 10, street: 8, contrast: 7, cleanDigital: 6 } },
  { id: "quiet-lake-landscape", query: "quiet lake natural landscape", title: "잔잔한 호수 풍경", description: "자연스러운 색과 낮은 대비로 조용한 풍경을 보여주는 사진입니다.", tags: ["nature", "landscape", "natural", "soft"], styleProfile: { landscape: 10, natural: 9, softness: 6, saturation: 4, contrast: 4 } },
  { id: "documentary-hands", query: "documentary hands work photography", title: "손과 작업의 기록", description: "사람의 손과 작업 과정을 가까이에서 담은 다큐멘터리 사진입니다.", tags: ["documentary", "natural", "filmic", "warm"], styleProfile: { documentary: 10, natural: 8, filmLike: 6, warmth: 6, contrast: 5 } },
  { id: "fashion-flash-contrast", query: "flash fashion portrait contrast", title: "플래시 패션 인물", description: "강한 플래시와 대비로 스타일을 전면에 세운 인물 사진입니다.", tags: ["portrait", "contrasty", "sharp", "vibrant"], styleProfile: { portrait: 9, contrast: 9, sharpness: 8, saturation: 7, cleanDigital: 6 } },
  { id: "soft-flower-closeup", query: "soft flower close up photography", title: "부드러운 꽃 클로즈업", description: "얕은 심도와 부드러운 색으로 작은 피사체를 감성적으로 담은 사진입니다.", tags: ["soft", "warm", "nature", "filmic"], styleProfile: { softness: 9, warmth: 7, natural: 8, filmLike: 6, portrait: 3 } },
  { id: "blue-hour-city", query: "blue hour city skyline night", title: "블루아워 도시", description: "해가 진 직후의 푸른 빛과 도시 조명이 균형을 이루는 사진입니다.", tags: ["cool", "lowlight", "landscape", "clean"], styleProfile: { night: 8, landscape: 8, cleanDigital: 8, sharpness: 8, moody: 6 } },
  { id: "warm-wedding-documentary", query: "warm wedding documentary photography", title: "따뜻한 웨딩 기록", description: "사람의 표정과 순간을 따뜻한 톤으로 담은 기록형 인물 사진입니다.", tags: ["warm", "portrait", "documentary", "soft"], styleProfile: { warmth: 9, portrait: 8, documentary: 8, softness: 7, natural: 7 } },
  { id: "desert-travel-contrast", query: "desert travel contrast landscape", title: "사막 여행의 대비", description: "강한 햇빛과 넓은 공간, 건조한 색이 인상적인 여행 풍경입니다.", tags: ["travel", "landscape", "contrasty", "warm"], styleProfile: { travel: 9, landscape: 9, warmth: 8, contrast: 8, saturation: 6 } },
  { id: "rain-window-moody", query: "rain window moody portrait", title: "비 오는 창가의 무드", description: "창문과 빗방울, 낮은 채도가 감정을 만드는 무드 사진입니다.", tags: ["moody", "soft", "portrait", "cool"], styleProfile: { moody: 10, softness: 8, portrait: 6, natural: 6, saturation: 3 } },
  { id: "clean-nature-macro", query: "sharp clean nature macro", title: "깨끗한 자연 매크로", description: "작은 자연 피사체의 디테일을 깨끗하고 선명하게 담은 사진입니다.", tags: ["nature", "sharp", "clean", "natural"], styleProfile: { sharpness: 10, cleanDigital: 8, natural: 8, landscape: 4, contrast: 5 } },
  { id: "cinematic-travel-bus", query: "cinematic travel bus window", title: "버스 창밖의 시네마틱 여행", description: "이동 중의 창밖 풍경과 색이 영화 장면처럼 보이는 여행 사진입니다.", tags: ["cinematic", "travel", "filmic", "moody"], styleProfile: { cinematic: 9, travel: 9, filmLike: 8, moody: 7, warmth: 5 } },
  { id: "street-flash-night", query: "street flash night photography", title: "플래시가 터진 밤거리", description: "밤거리에서 플래시로 피사체를 강하게 분리한 사진입니다.", tags: ["street", "lowlight", "contrasty", "sharp"], styleProfile: { street: 9, night: 9, contrast: 9, sharpness: 8, documentary: 6 } },
  { id: "natural-child-portrait", query: "natural child portrait daylight", title: "자연광 아이 인물", description: "밝은 자연광과 자연스러운 표정이 중심인 인물 사진입니다.", tags: ["portrait", "natural", "soft", "warm"], styleProfile: { portrait: 9, natural: 9, softness: 8, warmth: 7, cleanDigital: 5 } },
  { id: "mountain-hike-documentary", query: "hiking mountain documentary travel", title: "산행의 기록", description: "여행, 풍경, 사람의 움직임이 함께 담긴 야외 다큐멘터리 사진입니다.", tags: ["travel", "landscape", "documentary", "natural"], styleProfile: { travel: 9, landscape: 9, documentary: 8, natural: 8, sharpness: 6 } },
  { id: "retro-car-film", query: "retro car film photography", title: "레트로 자동차 필름톤", description: "오래된 자동차와 필름 같은 색이 어울리는 레트로 무드 사진입니다.", tags: ["filmic", "warm", "street", "moody"], styleProfile: { filmLike: 10, warmth: 7, street: 7, moody: 7, grainy: 6 } }
];

const sourceNote = "MVP reference capture profile. Replace with licensed EXIF-verified sample photos in production.";

const captureProfiles: Record<string, Omit<CaptureMetadata, "verified" | "sourceNote">> = {
  canonWarmPortrait: {
    cameraId: "canon-r6ii",
    cameraLabel: "Canon EOS R6 Mark II",
    lensLabel: "Canon RF 85mm F2 Macro IS STM",
    brandHint: "Canon"
  },
  fujiFilmicDaily: {
    cameraId: "fujifilm-x100vi",
    cameraLabel: "Fujifilm X100VI",
    lensLabel: "Fujinon 23mm F2 fixed lens",
    filmStockId: "kodak-portra-400",
    filmStockLabel: "Kodak Portra 400 reference look",
    brandHint: "Fujifilm"
  },
  sonyCleanSharp: {
    cameraId: "sony-a7iv",
    cameraLabel: "Sony Alpha a7 IV",
    lensLabel: "Sony FE 50mm F1.4 GM",
    brandHint: "Sony"
  },
  sonyTravelCompact: {
    cameraId: "sony-a7c-ii",
    cameraLabel: "Sony Alpha a7C II",
    lensLabel: "Sony FE 40mm F2.5 G",
    brandHint: "Sony"
  },
  fujiLandscape: {
    cameraId: "fujifilm-xt5",
    cameraLabel: "Fujifilm X-T5",
    lensLabel: "Fujinon XF 16-80mm F4 R OIS WR",
    brandHint: "Fujifilm"
  },
  nikonLandscape: {
    cameraId: "nikon-z8",
    cameraLabel: "Nikon Z8",
    lensLabel: "Nikkor Z 24-70mm F2.8 S",
    brandHint: "Nikon"
  },
  ricohStreet: {
    cameraId: "ricoh-griii",
    cameraLabel: "Ricoh GR III",
    lensLabel: "Ricoh GR 28mm F2.8 fixed lens",
    brandHint: "Ricoh"
  },
  leicaMonoStreet: {
    cameraId: "leica-m6-film",
    cameraLabel: "Leica M6",
    lensLabel: "Leica Summicron-M 35mm F2",
    filmStockId: "kodak-tri-x-400",
    filmStockLabel: "Kodak Tri-X 400",
    brandHint: "Leica"
  },
  panasonicCinematic: {
    cameraId: "panasonic-s5ii",
    cameraLabel: "Panasonic Lumix S5 II",
    lensLabel: "Lumix S 35mm F1.8",
    brandHint: "Panasonic"
  },
  leicaPremiumMood: {
    cameraId: "leica-q3",
    cameraLabel: "Leica Q3",
    lensLabel: "Summilux 28mm F1.7 fixed lens",
    brandHint: "Leica"
  },
  omTravelNature: {
    cameraId: "omsystem-om5",
    cameraLabel: "OM System OM-5",
    lensLabel: "M.Zuiko 12-45mm F4 PRO",
    brandHint: "OM System"
  },
  filmNight: {
    cameraId: "contax-t2",
    cameraLabel: "Contax T2",
    lensLabel: "Carl Zeiss Sonnar 38mm F2.8",
    filmStockId: "cinestill-800t",
    filmStockLabel: "Cinestill 800T",
    brandHint: "Contax"
  }
};

function captureFrom(key: keyof typeof captureProfiles): CaptureMetadata {
  return { ...captureProfiles[key], verified: false, sourceNote };
}

function captureForTaste(seed: TasteSeed): CaptureMetadata {
  const tags = seed.tags;

  if (seed.id.includes("grainy-night") || (tags.includes("filmic") && tags.includes("lowlight"))) return captureFrom("filmNight");
  if (tags.includes("monochrome") && tags.includes("street")) return captureFrom("leicaMonoStreet");
  if (tags.includes("filmic") && (tags.includes("street") || tags.includes("documentary") || tags.includes("warm"))) return captureFrom("fujiFilmicDaily");
  if (tags.includes("cinematic") || tags.includes("lowlight") || tags.includes("moody")) return captureFrom("panasonicCinematic");
  if (tags.includes("portrait") && (tags.includes("warm") || tags.includes("soft"))) return captureFrom("canonWarmPortrait");
  if (tags.includes("street") || tags.includes("minimal")) return captureFrom("ricohStreet");
  if (tags.includes("landscape") && tags.includes("sharp")) return captureFrom("nikonLandscape");
  if (tags.includes("landscape") || tags.includes("nature")) return captureFrom("fujiLandscape");
  if (tags.includes("travel")) return captureFrom("sonyTravelCompact");
  if (tags.includes("clean") || tags.includes("sharp")) return captureFrom("sonyCleanSharp");
  if (tags.includes("cool")) return captureFrom("leicaPremiumMood");
  return captureFrom("sonyCleanSharp");
}

function imageUrl(query: string, index: number) {
  return `https://picsum.photos/seed/taste-${encodeURIComponent(query)}-${index + 11}/960/720`;
}

export const tasteImages: TasteImage[] = seeds.map((seed, index) => ({
  id: seed.id,
  imageUrl: imageUrl(seed.query, index),
  title: seed.title,
  description: seed.description,
  tags: seed.tags,
  styleProfile: profile(seed.styleProfile),
  capture: captureForTaste(seed),
  credit: placeholderImageCredit,
  styleDescription: seed.description
}));
