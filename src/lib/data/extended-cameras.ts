import { buildShopLinks } from "@/lib/data/shop-links";
import { cameras as baseCameras } from "@/lib/data/cameras";
import type { Brand, CameraBody, CameraTag, Difficulty, FilmFormat, ImageTasteTag, Purpose, StyleProfile } from "@/types";

type DigitalSeed = {
  id: string;
  brand: Brand;
  model: string;
  mount: string;
  type: string;
  sensorSize: string;
  weight: number;
  newPrice: number;
  usedPrice: number;
  level: CameraBody["beginnerLevel"];
  tags: CameraTag[];
  bias: ImageTasteTag[];
  style: Partial<StyleProfile>;
  uses: Purpose[];
};

type FilmSeed = DigitalSeed & {
  format: FilmFormat;
  operation: Difficulty;
  maintenance: Difficulty;
  era: string;
  fixed?: boolean;
};

function shopLinks(brand: Brand, model: string, type: "digital" | "film") {
  return buildShopLinks(`${brand} ${model}`, type === "film" ? "used" : "new");
}

function digitalCamera(seed: DigitalSeed): CameraBody {
  return {
    id: seed.id,
    brand: seed.brand,
    model: seed.model,
    kind: "digital",
    mount: seed.mount,
    type: seed.type,
    sensorSize: seed.sensorSize,
    weight: seed.weight,
    priceNew: seed.newPrice,
    priceUsed: seed.usedPrice,
    interchangeableLens: seed.mount !== "Fixed",
    beginnerLevel: seed.level,
    strengths: [
      seed.tags.includes("fast_af") ? "빠른 AF" : "취향이 뚜렷한 결과물",
      seed.tags.includes("video_strong") ? "영상 대응" : "사진 중심 완성도",
      seed.tags.includes("portable") ? "휴대성" : "작업 안정성"
    ],
    weaknesses: [seed.weight > 700 ? "오래 들고 다니면 무게가 느껴질 수 있음" : "상위 기종 대비 확장성은 확인 필요"],
    tags: seed.tags,
    recommendedFor: seed.uses.map((use) => ({ travel: "여행", daily: "일상", portrait: "인물", landscape: "풍경", video: "영상", vlog: "브이로그", professional: "전문 작업" })[use]),
    imageStyleBias: seed.bias,
    styleBias: seed.style,
    useCases: seed.uses,
    shopLinks: shopLinks(seed.brand, seed.model, "digital")
  };
}

function filmCamera(seed: FilmSeed): CameraBody {
  return {
    ...digitalCamera(seed),
    kind: "film",
    interchangeableLens: seed.fixed ? false : seed.mount !== "Fixed",
    sensorSize: seed.format === "120" ? "120 Film" : seed.format === "half-frame" ? "Half-frame Film" : "35mm Film",
    priceNew: seed.newPrice,
    priceUsed: seed.usedPrice,
    strengths: [
      seed.format === "120" ? "큰 네거티브와 풍부한 계조" : "필름다운 촬영 리듬",
      seed.fixed ? "렌즈 고민 없는 집중형" : "렌즈 선택으로 개성 확장",
      seed.operation === "easy" ? "입문자도 접근 쉬움" : "수동 조작의 재미"
    ],
    weaknesses: [
      seed.maintenance === "hard" ? "전자 부품과 수리 가능성을 꼭 확인해야 함" : "중고 상태에 따라 촬영 경험 차이가 큼"
    ],
    filmFormat: seed.format,
    operationDifficulty: seed.operation,
    maintenanceDifficulty: seed.maintenance,
    cameraEra: seed.era,
    shopLinks: shopLinks(seed.brand, seed.model, "film")
  };
}

const extraDigitalSeeds: DigitalSeed[] = [
  { id: "sony-a7cr", brand: "Sony", model: "Alpha a7CR", mount: "Sony E", type: "고해상도 풀프레임 미러리스", sensorSize: "Full Frame", weight: 515, newPrice: 3650000, usedPrice: 3150000, level: "pro", tags: ["high_resolution", "portable", "fast_af", "clean_digital", "travel_friendly", "lens_ecosystem_strong"], bias: ["sharp", "clean", "landscape"], style: { sharpness: 9, cleanDigital: 9, landscape: 8, travel: 8 }, uses: ["travel", "landscape", "professional"] },
  { id: "sony-a7rv", brand: "Sony", model: "Alpha a7R V", mount: "Sony E", type: "고해상도 풀프레임 미러리스", sensorSize: "Full Frame", weight: 723, newPrice: 4450000, usedPrice: 3650000, level: "pro", tags: ["high_resolution", "fast_af", "weather_sealed", "clean_digital", "lens_ecosystem_strong"], bias: ["sharp", "clean", "landscape"], style: { sharpness: 10, cleanDigital: 9, landscape: 9 }, uses: ["landscape", "professional", "portrait"] },
  { id: "sony-a9iii", brand: "Sony", model: "Alpha a9 III", mount: "Sony E", type: "글로벌 셔터 풀프레임", sensorSize: "Full Frame", weight: 703, newPrice: 7990000, usedPrice: 6900000, level: "pro", tags: ["fast_af", "video_strong", "weather_sealed", "clean_digital", "lens_ecosystem_strong"], bias: ["sharp", "clean", "documentary"], style: { sharpness: 10, cleanDigital: 9, documentary: 8 }, uses: ["professional", "video"] },
  { id: "sony-zv1ii", brand: "Sony", model: "ZV-1 II", mount: "Fixed", type: "브이로그 콤팩트", sensorSize: "1-inch", weight: 292, newPrice: 980000, usedPrice: 720000, level: "entry", tags: ["video_strong", "portable", "beginner_friendly", "compact_fixed_lens", "clean_digital"], bias: ["clean", "travel", "vibrant"], style: { cleanDigital: 8, travel: 7, sharpness: 7 }, uses: ["vlog", "travel", "video"] },
  { id: "fujifilm-xm5", brand: "Fujifilm", model: "X-M5", mount: "Fujifilm X", type: "소형 하이브리드 미러리스", sensorSize: "APS-C", weight: 355, newPrice: 1180000, usedPrice: 980000, level: "entry", tags: ["portable", "color_filmic", "video_strong", "beginner_friendly", "travel_friendly"], bias: ["filmic", "warm", "travel"], style: { filmLike: 8, warmth: 7, travel: 8, cleanDigital: 6 }, uses: ["travel", "daily", "vlog"] },
  { id: "fujifilm-xe4", brand: "Fujifilm", model: "X-E4", mount: "Fujifilm X", type: "레인지파인더형 미러리스", sensorSize: "APS-C", weight: 364, newPrice: 1350000, usedPrice: 1180000, level: "intermediate", tags: ["portable", "color_filmic", "street_specialist", "tactile_controls", "premium_emotional"], bias: ["filmic", "street", "documentary"], style: { filmLike: 9, street: 9, warmth: 6, documentary: 7 }, uses: ["daily", "travel"] },
  { id: "fujifilm-gfx50sii", brand: "Fujifilm", model: "GFX 50S II", mount: "Fujifilm G", type: "중형 포맷 미러리스", sensorSize: "Medium Format", weight: 900, newPrice: 4700000, usedPrice: 3350000, level: "pro", tags: ["high_resolution", "color_filmic", "premium_emotional", "portrait_friendly", "weather_sealed"], bias: ["portrait", "landscape", "natural"], style: { portrait: 8, landscape: 9, natural: 9, softness: 7 }, uses: ["portrait", "landscape", "professional"] },
  { id: "canon-r5ii", brand: "Canon", model: "EOS R5 Mark II", mount: "Canon RF", type: "고성능 풀프레임 미러리스", sensorSize: "Full Frame", weight: 746, newPrice: 5600000, usedPrice: 5000000, level: "pro", tags: ["high_resolution", "video_strong", "fast_af", "portrait_friendly", "weather_sealed"], bias: ["portrait", "sharp", "clean"], style: { portrait: 9, sharpness: 9, cleanDigital: 8, warmth: 6 }, uses: ["professional", "portrait", "video"] },
  { id: "canon-r7", brand: "Canon", model: "EOS R7", mount: "Canon RF", type: "APS-C 고성능 미러리스", sensorSize: "APS-C", weight: 612, newPrice: 1650000, usedPrice: 1250000, level: "intermediate", tags: ["fast_af", "weather_sealed", "travel_friendly", "portrait_friendly", "clean_digital"], bias: ["sharp", "travel", "documentary"], style: { sharpness: 8, documentary: 7, travel: 7, cleanDigital: 7 }, uses: ["travel", "professional"] },
  { id: "canon-r100", brand: "Canon", model: "EOS R100", mount: "Canon RF", type: "초입문 미러리스", sensorSize: "APS-C", weight: 356, newPrice: 650000, usedPrice: 480000, level: "entry", tags: ["beginner_friendly", "portable", "color_warm", "portrait_friendly"], bias: ["warm", "portrait", "travel"], style: { warmth: 7, portrait: 6, cleanDigital: 5 }, uses: ["daily", "portrait"] },
  { id: "nikon-z8", brand: "Nikon", model: "Z8", mount: "Nikon Z", type: "프로 풀프레임 미러리스", sensorSize: "Full Frame", weight: 910, newPrice: 5200000, usedPrice: 4300000, level: "pro", tags: ["high_resolution", "video_strong", "fast_af", "weather_sealed", "color_natural"], bias: ["sharp", "natural", "documentary"], style: { sharpness: 9, cleanDigital: 8, natural: 8, documentary: 8 }, uses: ["professional", "video", "landscape"] },
  { id: "nikon-z30", brand: "Nikon", model: "Z30", mount: "Nikon Z", type: "브이로그 APS-C", sensorSize: "APS-C", weight: 405, newPrice: 850000, usedPrice: 620000, level: "entry", tags: ["video_strong", "portable", "beginner_friendly", "color_natural"], bias: ["natural", "clean", "travel"], style: { natural: 8, cleanDigital: 7, travel: 6 }, uses: ["vlog", "daily"] },
  { id: "nikon-z5ii", brand: "Nikon", model: "Z5 II", mount: "Nikon Z", type: "입문 풀프레임 미러리스", sensorSize: "Full Frame", weight: 700, newPrice: 1950000, usedPrice: 1650000, level: "intermediate", tags: ["lowlight_strong", "color_natural", "beginner_friendly", "portrait_friendly"], bias: ["natural", "portrait", "landscape"], style: { natural: 8, portrait: 7, landscape: 7, cleanDigital: 6 }, uses: ["portrait", "landscape", "daily"] },
  { id: "leica-sl3", brand: "Leica", model: "SL3", mount: "L-Mount", type: "프리미엄 풀프레임 미러리스", sensorSize: "Full Frame", weight: 769, newPrice: 10500000, usedPrice: 9000000, level: "pro", tags: ["premium_emotional", "high_resolution", "color_natural", "weather_sealed"], bias: ["natural", "portrait", "moody"], style: { natural: 9, portrait: 8, landscape: 8, moody: 6 }, uses: ["professional", "portrait", "landscape"] },
  { id: "leica-m11-monochrom", brand: "Leica", model: "M11 Monochrom", mount: "Leica M", type: "흑백 전용 레인지파인더", sensorSize: "Full Frame", weight: 540, newPrice: 13500000, usedPrice: 11500000, level: "pro", tags: ["premium_emotional", "tactile_controls", "street_specialist", "high_resolution"], bias: ["monochrome", "street", "documentary"], style: { street: 9, documentary: 8, moody: 8, sharpness: 9, filmLike: 7 }, uses: ["daily", "professional"] },
  { id: "panasonic-s9", brand: "Panasonic", model: "Lumix S9", mount: "L-Mount", type: "소형 풀프레임 라이프스타일", sensorSize: "Full Frame", weight: 486, newPrice: 1850000, usedPrice: 1550000, level: "intermediate", tags: ["portable", "video_strong", "color_natural", "travel_friendly"], bias: ["cinematic", "travel", "natural"], style: { cinematic: 8, travel: 8, cleanDigital: 7, natural: 7 }, uses: ["travel", "video", "vlog"] },
  { id: "panasonic-g9ii", brand: "Panasonic", model: "Lumix G9 II", mount: "Micro Four Thirds", type: "고성능 MFT 미러리스", sensorSize: "Micro Four Thirds", weight: 658, newPrice: 2300000, usedPrice: 1850000, level: "pro", tags: ["video_strong", "weather_sealed", "fast_af", "lens_ecosystem_strong", "travel_friendly"], bias: ["clean", "nature", "documentary"], style: { cleanDigital: 8, documentary: 7, landscape: 7, travel: 7 }, uses: ["video", "travel", "landscape"] },
  { id: "omsystem-tg7", brand: "OM System", model: "Tough TG-7", mount: "Fixed", type: "러기드 콤팩트", sensorSize: "1/2.3-inch", weight: 249, newPrice: 680000, usedPrice: 520000, level: "entry", tags: ["portable", "weather_sealed", "beginner_friendly", "compact_fixed_lens", "travel_friendly"], bias: ["travel", "nature", "documentary"], style: { travel: 8, documentary: 7, cleanDigital: 5 }, uses: ["travel", "landscape"] },
  { id: "omsystem-em10iv", brand: "OM System", model: "OM-D E-M10 Mark IV", mount: "Micro Four Thirds", type: "입문 MFT 미러리스", sensorSize: "Micro Four Thirds", weight: 383, newPrice: 980000, usedPrice: 720000, level: "entry", tags: ["portable", "beginner_friendly", "travel_friendly", "lens_ecosystem_strong"], bias: ["travel", "natural", "soft"], style: { travel: 8, natural: 7, softness: 5 }, uses: ["daily", "travel"] },
  { id: "pentax-k3iii", brand: "Pentax", model: "K-3 Mark III", mount: "Pentax K", type: "APS-C DSLR", sensorSize: "APS-C", weight: 820, newPrice: 2450000, usedPrice: 1850000, level: "pro", tags: ["tactile_controls", "weather_sealed", "color_natural", "premium_emotional"], bias: ["natural", "landscape", "documentary"], style: { natural: 8, documentary: 7, landscape: 8, filmLike: 5 }, uses: ["landscape", "daily"] },
  { id: "hasselblad-x2d", brand: "Hasselblad", model: "X2D 100C", mount: "Hasselblad X", type: "중형 포맷 미러리스", sensorSize: "Medium Format", weight: 895, newPrice: 12500000, usedPrice: 9800000, level: "pro", tags: ["high_resolution", "premium_emotional", "color_natural", "portrait_friendly"], bias: ["natural", "portrait", "landscape"], style: { natural: 10, portrait: 9, landscape: 9, sharpness: 9 }, uses: ["professional", "portrait", "landscape"] }
];

const filmSeeds: FilmSeed[] = [
  { id: "leica-m6-film", brand: "Leica", model: "M6", mount: "Leica M", type: "35mm 레인지파인더", sensorSize: "35mm Film", weight: 575, newPrice: 7800000, usedPrice: 4500000, level: "pro", tags: ["premium_emotional", "tactile_controls", "street_specialist", "color_filmic"], bias: ["filmic", "street", "documentary", "monochrome"], style: { filmLike: 10, street: 10, documentary: 8, moody: 6 }, uses: ["daily", "travel"], format: "35mm", operation: "hard", maintenance: "moderate", era: "1984-2002 / 2022-" },
  { id: "leica-ma-film", brand: "Leica", model: "M-A", mount: "Leica M", type: "35mm 기계식 레인지파인더", sensorSize: "35mm Film", weight: 578, newPrice: 8800000, usedPrice: 6500000, level: "pro", tags: ["premium_emotional", "tactile_controls", "street_specialist", "color_filmic"], bias: ["filmic", "street", "documentary"], style: { filmLike: 10, street: 9, documentary: 9, moody: 6 }, uses: ["daily", "professional"], format: "35mm", operation: "hard", maintenance: "moderate", era: "2014-" },
  { id: "nikon-fm2", brand: "Nikon", model: "FM2", mount: "Nikon F", type: "35mm 기계식 SLR", sensorSize: "35mm Film", weight: 540, newPrice: 850000, usedPrice: 520000, level: "intermediate", tags: ["tactile_controls", "weather_sealed", "color_filmic", "lens_ecosystem_strong"], bias: ["filmic", "documentary", "street"], style: { filmLike: 9, documentary: 8, street: 7, natural: 7 }, uses: ["daily", "travel"], format: "35mm", operation: "moderate", maintenance: "moderate", era: "1982-2001" },
  { id: "nikon-f3", brand: "Nikon", model: "F3", mount: "Nikon F", type: "35mm 프로 SLR", sensorSize: "35mm Film", weight: 760, newPrice: 950000, usedPrice: 620000, level: "pro", tags: ["tactile_controls", "premium_emotional", "lens_ecosystem_strong", "color_filmic"], bias: ["filmic", "documentary", "portrait"], style: { filmLike: 9, documentary: 9, portrait: 6 }, uses: ["daily", "professional"], format: "35mm", operation: "moderate", maintenance: "moderate", era: "1980-2001" },
  { id: "nikon-f100", brand: "Nikon", model: "F100", mount: "Nikon F", type: "35mm AF SLR", sensorSize: "35mm Film", weight: 785, newPrice: 850000, usedPrice: 480000, level: "intermediate", tags: ["fast_af", "lens_ecosystem_strong", "color_filmic", "portrait_friendly"], bias: ["portrait", "filmic", "documentary"], style: { filmLike: 8, portrait: 8, documentary: 7 }, uses: ["portrait", "professional"], format: "35mm", operation: "easy", maintenance: "moderate", era: "1999-2006" },
  { id: "canon-ae1-program", brand: "Canon", model: "AE-1 Program", mount: "Canon FD", type: "35mm 전자식 SLR", sensorSize: "35mm Film", weight: 575, newPrice: 520000, usedPrice: 320000, level: "entry", tags: ["beginner_friendly", "tactile_controls", "color_filmic", "portrait_friendly"], bias: ["filmic", "warm", "portrait"], style: { filmLike: 9, warmth: 7, portrait: 7, street: 6 }, uses: ["daily", "portrait"], format: "35mm", operation: "easy", maintenance: "moderate", era: "1981-1984" },
  { id: "canon-new-f1", brand: "Canon", model: "New F-1", mount: "Canon FD", type: "35mm 프로 SLR", sensorSize: "35mm Film", weight: 795, newPrice: 950000, usedPrice: 620000, level: "pro", tags: ["tactile_controls", "premium_emotional", "lens_ecosystem_strong", "color_filmic"], bias: ["filmic", "documentary", "portrait"], style: { filmLike: 9, documentary: 8, portrait: 6 }, uses: ["professional", "daily"], format: "35mm", operation: "hard", maintenance: "moderate", era: "1981-1992" },
  { id: "canon-eos-1v", brand: "Canon", model: "EOS-1V", mount: "Canon EF", type: "35mm 프로 AF SLR", sensorSize: "35mm Film", weight: 945, newPrice: 1500000, usedPrice: 950000, level: "pro", tags: ["fast_af", "weather_sealed", "lens_ecosystem_strong", "portrait_friendly"], bias: ["filmic", "portrait", "documentary"], style: { filmLike: 8, portrait: 8, documentary: 8, sharpness: 6 }, uses: ["professional", "portrait"], format: "35mm", operation: "easy", maintenance: "hard", era: "2000-2018" },
  { id: "olympus-om1-film", brand: "Olympus", model: "OM-1", mount: "Olympus OM", type: "35mm 기계식 SLR", sensorSize: "35mm Film", weight: 510, newPrice: 520000, usedPrice: 320000, level: "intermediate", tags: ["portable", "tactile_controls", "color_filmic", "travel_friendly"], bias: ["filmic", "travel", "street"], style: { filmLike: 9, travel: 8, street: 7, natural: 6 }, uses: ["travel", "daily"], format: "35mm", operation: "moderate", maintenance: "moderate", era: "1972-1979" },
  { id: "olympus-om4ti", brand: "Olympus", model: "OM-4Ti", mount: "Olympus OM", type: "35mm 고급 SLR", sensorSize: "35mm Film", weight: 510, newPrice: 950000, usedPrice: 620000, level: "pro", tags: ["portable", "tactile_controls", "premium_emotional", "travel_friendly"], bias: ["filmic", "landscape", "natural"], style: { filmLike: 9, landscape: 8, natural: 8, sharpness: 6 }, uses: ["landscape", "travel"], format: "35mm", operation: "hard", maintenance: "hard", era: "1986-2002" },
  { id: "olympus-xa", brand: "Olympus", model: "XA", mount: "Fixed", type: "35mm 콤팩트 레인지파인더", sensorSize: "35mm Film", weight: 225, newPrice: 380000, usedPrice: 250000, level: "intermediate", tags: ["portable", "compact_fixed_lens", "street_specialist", "color_filmic"], bias: ["street", "filmic", "documentary"], style: { filmLike: 9, street: 10, documentary: 8, travel: 7 }, uses: ["daily", "travel"], format: "35mm", operation: "moderate", maintenance: "moderate", era: "1979-1985", fixed: true },
  { id: "olympus-mju-ii", brand: "Olympus", model: "mju-II", mount: "Fixed", type: "35mm AF 콤팩트", sensorSize: "35mm Film", weight: 135, newPrice: 520000, usedPrice: 380000, level: "entry", tags: ["portable", "compact_fixed_lens", "beginner_friendly", "street_specialist"], bias: ["filmic", "street", "travel"], style: { filmLike: 8, street: 8, travel: 8, softness: 5 }, uses: ["daily", "travel"], format: "35mm", operation: "easy", maintenance: "hard", era: "1997-2003", fixed: true },
  { id: "pentax-k1000", brand: "Pentax", model: "K1000", mount: "Pentax K", type: "35mm 수동 SLR", sensorSize: "35mm Film", weight: 620, newPrice: 420000, usedPrice: 260000, level: "entry", tags: ["beginner_friendly", "tactile_controls", "lens_ecosystem_strong", "color_filmic"], bias: ["filmic", "documentary", "natural"], style: { filmLike: 8, documentary: 7, natural: 7 }, uses: ["daily"], format: "35mm", operation: "moderate", maintenance: "easy", era: "1976-1997" },
  { id: "pentax-67", brand: "Pentax", model: "67", mount: "Pentax 67", type: "6x7 중형 SLR", sensorSize: "120 Film", weight: 2300, newPrice: 2300000, usedPrice: 1450000, level: "pro", tags: ["premium_emotional", "portrait_friendly", "color_filmic", "tactile_controls"], bias: ["filmic", "portrait", "landscape"], style: { filmLike: 10, portrait: 9, landscape: 8, softness: 8 }, uses: ["portrait", "landscape", "professional"], format: "120", operation: "hard", maintenance: "hard", era: "1969-1999" },
  { id: "minolta-x700", brand: "Minolta", model: "X-700", mount: "Minolta SR", type: "35mm 전자식 SLR", sensorSize: "35mm Film", weight: 505, newPrice: 420000, usedPrice: 260000, level: "entry", tags: ["beginner_friendly", "portable", "color_filmic", "portrait_friendly"], bias: ["filmic", "warm", "portrait"], style: { filmLike: 8, warmth: 7, portrait: 7, natural: 6 }, uses: ["daily", "portrait"], format: "35mm", operation: "easy", maintenance: "moderate", era: "1981-1999" },
  { id: "minolta-cle", brand: "Minolta", model: "CLE", mount: "Leica M", type: "35mm 소형 레인지파인더", sensorSize: "35mm Film", weight: 380, newPrice: 1600000, usedPrice: 980000, level: "intermediate", tags: ["portable", "street_specialist", "tactile_controls", "color_filmic"], bias: ["filmic", "street", "documentary"], style: { filmLike: 9, street: 9, travel: 8, documentary: 7 }, uses: ["daily", "travel"], format: "35mm", operation: "moderate", maintenance: "hard", era: "1980-1985" },
  { id: "contax-t2", brand: "Contax", model: "T2", mount: "Fixed", type: "35mm 프리미엄 콤팩트", sensorSize: "35mm Film", weight: 295, newPrice: 1900000, usedPrice: 1250000, level: "entry", tags: ["premium_emotional", "compact_fixed_lens", "portable", "street_specialist"], bias: ["filmic", "street", "travel"], style: { filmLike: 9, street: 8, travel: 8, sharpness: 7 }, uses: ["daily", "travel"], format: "35mm", operation: "easy", maintenance: "hard", era: "1990-2000", fixed: true },
  { id: "contax-g2", brand: "Contax", model: "G2", mount: "Contax G", type: "35mm AF 레인지파인더형", sensorSize: "35mm Film", weight: 560, newPrice: 2300000, usedPrice: 1500000, level: "intermediate", tags: ["premium_emotional", "street_specialist", "portrait_friendly", "color_filmic"], bias: ["filmic", "street", "portrait"], style: { filmLike: 9, street: 8, portrait: 8, sharpness: 7 }, uses: ["daily", "portrait"], format: "35mm", operation: "moderate", maintenance: "hard", era: "1996-2005" },
  { id: "mamiya-7ii", brand: "Mamiya", model: "7 II", mount: "Mamiya 7", type: "6x7 중형 레인지파인더", sensorSize: "120 Film", weight: 1210, newPrice: 6500000, usedPrice: 4700000, level: "pro", tags: ["premium_emotional", "high_resolution", "travel_friendly", "color_filmic"], bias: ["filmic", "landscape", "travel"], style: { filmLike: 10, landscape: 10, travel: 8, sharpness: 8 }, uses: ["travel", "landscape", "professional"], format: "120", operation: "hard", maintenance: "hard", era: "1999-2014" },
  { id: "mamiya-rb67", brand: "Mamiya", model: "RB67 Pro-S", mount: "Mamiya RB", type: "6x7 중형 스튜디오 SLR", sensorSize: "120 Film", weight: 2690, newPrice: 1500000, usedPrice: 850000, level: "pro", tags: ["portrait_friendly", "premium_emotional", "color_filmic", "tactile_controls"], bias: ["filmic", "portrait", "soft"], style: { filmLike: 10, portrait: 10, softness: 8, natural: 8 }, uses: ["portrait", "professional"], format: "120", operation: "hard", maintenance: "hard", era: "1974-1990" },
  { id: "hasselblad-500cm", brand: "Hasselblad", model: "500 C/M", mount: "Hasselblad V", type: "6x6 중형 시스템 카메라", sensorSize: "120 Film", weight: 1400, newPrice: 3500000, usedPrice: 2200000, level: "pro", tags: ["premium_emotional", "tactile_controls", "portrait_friendly", "color_filmic"], bias: ["filmic", "portrait", "minimal"], style: { filmLike: 10, portrait: 9, natural: 8, softness: 7 }, uses: ["portrait", "professional"], format: "120", operation: "hard", maintenance: "hard", era: "1970-1994" },
  { id: "fujifilm-klasse-w", brand: "Fujifilm", model: "Klasse W", mount: "Fixed", type: "35mm 프리미엄 콤팩트", sensorSize: "35mm Film", weight: 290, newPrice: 1650000, usedPrice: 1100000, level: "entry", tags: ["portable", "compact_fixed_lens", "travel_friendly", "color_filmic"], bias: ["filmic", "travel", "street"], style: { filmLike: 9, travel: 9, street: 8, natural: 7 }, uses: ["travel", "daily"], format: "35mm", operation: "easy", maintenance: "hard", era: "2006-2012", fixed: true },
  { id: "fujifilm-ga645", brand: "Fujifilm", model: "GA645", mount: "Fixed", type: "645 중형 AF 카메라", sensorSize: "120 Film", weight: 815, newPrice: 1900000, usedPrice: 1250000, level: "intermediate", tags: ["travel_friendly", "compact_fixed_lens", "color_filmic", "high_resolution"], bias: ["filmic", "travel", "landscape"], style: { filmLike: 10, travel: 8, landscape: 8, sharpness: 7 }, uses: ["travel", "landscape"], format: "120", operation: "easy", maintenance: "hard", era: "1995-2000", fixed: true },
  { id: "ricoh-gr1v", brand: "Ricoh", model: "GR1v", mount: "Fixed", type: "35mm 스냅 콤팩트", sensorSize: "35mm Film", weight: 200, newPrice: 1400000, usedPrice: 980000, level: "intermediate", tags: ["portable", "street_specialist", "compact_fixed_lens", "color_filmic"], bias: ["street", "filmic", "documentary"], style: { filmLike: 9, street: 10, documentary: 8, travel: 8 }, uses: ["daily", "travel"], format: "35mm", operation: "easy", maintenance: "hard", era: "2001-2005", fixed: true },
  { id: "leica-minilux", brand: "Leica", model: "Minilux", mount: "Fixed", type: "35mm 프리미엄 콤팩트", sensorSize: "35mm Film", weight: 330, newPrice: 1250000, usedPrice: 780000, level: "entry", tags: ["premium_emotional", "compact_fixed_lens", "portrait_friendly", "color_filmic"], bias: ["filmic", "portrait", "warm"], style: { filmLike: 9, portrait: 8, warmth: 7, moody: 5 }, uses: ["daily", "portrait"], format: "35mm", operation: "easy", maintenance: "hard", era: "1995-2003", fixed: true },
  { id: "nikon-35ti", brand: "Nikon", model: "35Ti", mount: "Fixed", type: "35mm 프리미엄 콤팩트", sensorSize: "35mm Film", weight: 310, newPrice: 1300000, usedPrice: 850000, level: "entry", tags: ["premium_emotional", "compact_fixed_lens", "portable", "street_specialist"], bias: ["filmic", "street", "travel"], style: { filmLike: 9, street: 8, travel: 8, natural: 7 }, uses: ["travel", "daily"], format: "35mm", operation: "easy", maintenance: "hard", era: "1993-1998", fixed: true },
  { id: "olympus-pen-ft", brand: "Olympus", model: "PEN FT", mount: "Olympus Pen F", type: "35mm 하프프레임 SLR", sensorSize: "Half-frame Film", weight: 600, newPrice: 750000, usedPrice: 480000, level: "intermediate", tags: ["portable", "tactile_controls", "color_filmic", "street_specialist"], bias: ["filmic", "street", "documentary"], style: { filmLike: 9, street: 8, documentary: 8, grainy: 6 }, uses: ["daily", "travel"], format: "half-frame", operation: "moderate", maintenance: "moderate", era: "1966-1972" },
  { id: "kodak-ektar-h35", brand: "Kodak", model: "Ektar H35", mount: "Fixed", type: "35mm 하프프레임 토이 카메라", sensorSize: "Half-frame Film", weight: 100, newPrice: 78000, usedPrice: 55000, level: "entry", tags: ["beginner_friendly", "portable", "compact_fixed_lens", "color_filmic"], bias: ["filmic", "travel", "soft"], style: { filmLike: 8, travel: 7, softness: 7, grainy: 7 }, uses: ["daily", "travel"], format: "half-frame", operation: "easy", maintenance: "easy", era: "2022-", fixed: true },
  { id: "pentax-17", brand: "Pentax", model: "17", mount: "Fixed", type: "35mm 하프프레임 신품 필름카메라", sensorSize: "Half-frame Film", weight: 290, newPrice: 720000, usedPrice: 620000, level: "entry", tags: ["beginner_friendly", "portable", "compact_fixed_lens", "color_filmic"], bias: ["filmic", "travel", "street"], style: { filmLike: 8, travel: 8, street: 7, natural: 6 }, uses: ["daily", "travel"], format: "half-frame", operation: "easy", maintenance: "easy", era: "2024-", fixed: true },
  { id: "canon-p", brand: "Canon", model: "P", mount: "Leica LTM", type: "35mm 기계식 레인지파인더", sensorSize: "35mm Film", weight: 570, newPrice: 650000, usedPrice: 420000, level: "intermediate", tags: ["tactile_controls", "street_specialist", "color_filmic", "premium_emotional"], bias: ["filmic", "street", "monochrome"], style: { filmLike: 9, street: 8, documentary: 7, moody: 6 }, uses: ["daily"], format: "35mm", operation: "hard", maintenance: "moderate", era: "1959-1961" },
  { id: "fujifilm-natura-classica", brand: "Fujifilm", model: "Natura Classica", mount: "Fixed", type: "35mm 저조도 콤팩트", sensorSize: "35mm Film", weight: 155, newPrice: 950000, usedPrice: 650000, level: "entry", tags: ["portable", "compact_fixed_lens", "street_specialist", "lowlight_strong"], bias: ["filmic", "lowlight", "street"], style: { filmLike: 9, night: 8, street: 8, softness: 6 }, uses: ["daily", "travel"], format: "35mm", operation: "easy", maintenance: "hard", era: "2004-2012", fixed: true },
  { id: "ricoh-auto-half", brand: "Ricoh", model: "Auto Half", mount: "Fixed", type: "35mm 하프프레임 자동카메라", sensorSize: "Half-frame Film", weight: 350, newPrice: 380000, usedPrice: 240000, level: "entry", tags: ["portable", "compact_fixed_lens", "beginner_friendly", "color_filmic"], bias: ["filmic", "documentary", "travel"], style: { filmLike: 8, documentary: 8, travel: 7, grainy: 6 }, uses: ["daily", "travel"], format: "half-frame", operation: "easy", maintenance: "moderate", era: "1962-1979", fixed: true }
];

export const cameras: CameraBody[] = [
  ...baseCameras.map((camera) => ({
    ...camera,
    kind: "digital" as const,
    useCases: camera.useCases ?? [],
    shopLinks: camera.shopLinks ?? shopLinks(camera.brand, camera.model, "digital"),
    styleBias: camera.styleBias ?? {}
  })),
  ...extraDigitalSeeds.map(digitalCamera),
  ...filmSeeds.map(filmCamera)
];
