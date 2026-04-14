import { profile } from "@/lib/data/style";
import type { PhotoReference } from "@/types";

function image(query: string, sig: number) {
  return `https://picsum.photos/seed/ref-${encodeURIComponent(query)}-${sig + 200}/960/720`;
}

export const photoReferences: PhotoReference[] = [
  { id: "ref-film-street-warm", imageUrl: image("warm film street photography", 1), title: "따뜻한 필름 거리", styleTags: ["warm", "filmic", "street"], cameraTypeHint: "film", filmHint: "Kodak Gold 200", styleProfile: profile({ warmth: 8, filmLike: 9, street: 9 }) },
  { id: "ref-film-night-neon", imageUrl: image("cinematic night neon film", 2), title: "네온 필름 나이트", styleTags: ["cinematic", "lowlight", "moody"], cameraTypeHint: "film", filmHint: "Cinestill 800T", styleProfile: profile({ cinematic: 10, night: 10, moody: 8, filmLike: 9 }) },
  { id: "ref-digital-clean-portrait", imageUrl: image("clean sharp portrait photography", 3), title: "깨끗한 디지털 인물", styleTags: ["clean", "sharp", "portrait"], cameraTypeHint: "digital", styleProfile: profile({ cleanDigital: 10, sharpness: 9, portrait: 8 }) },
  { id: "ref-digital-travel-vivid", imageUrl: image("vivid travel photography", 4), title: "선명한 여행 색", styleTags: ["vibrant", "travel", "clean"], cameraTypeHint: "digital", styleProfile: profile({ travel: 9, vibrant: 9, cleanDigital: 8 }) },
  { id: "ref-film-portrait-soft", imageUrl: image("soft film portrait", 5), title: "부드러운 필름 인물", styleTags: ["portrait", "soft", "filmic"], cameraTypeHint: "film", filmHint: "Kodak Portra 400", styleProfile: profile({ portrait: 10, softness: 8, filmLike: 9, warmth: 7 }) },
  { id: "ref-medium-landscape", imageUrl: image("medium format landscape film", 6), title: "중형 필름 풍경", styleTags: ["landscape", "filmic", "natural"], cameraTypeHint: "film", filmHint: "Kodak Ektar 100", styleProfile: profile({ landscape: 10, natural: 8, filmLike: 9, sharpness: 8 }) },
  { id: "ref-monochrome-documentary", imageUrl: image("black white documentary street", 7), title: "흑백 다큐 거리", styleTags: ["monochrome", "documentary", "street"], cameraTypeHint: "hybrid", filmHint: "Kodak Tri-X 400", styleProfile: profile({ documentary: 10, street: 9, contrast: 9, grainy: 7 }) },
  { id: "ref-vlog-clean-room", imageUrl: image("clean lifestyle vlog room", 8), title: "밝은 라이프스타일 영상톤", styleTags: ["clean", "natural", "minimal"], cameraTypeHint: "digital", styleProfile: profile({ cleanDigital: 9, natural: 8, softness: 6 }) },
  { id: "ref-fashion-flash", imageUrl: image("flash fashion portrait", 9), title: "플래시 패션 인물", styleTags: ["portrait", "contrasty", "sharp"], cameraTypeHint: "hybrid", styleProfile: profile({ portrait: 9, contrast: 9, sharpness: 8 }) },
  { id: "ref-moody-cabin", imageUrl: image("moody warm cabin low light", 10), title: "따뜻한 저조도 무드", styleTags: ["warm", "moody", "lowlight"], cameraTypeHint: "film", filmHint: "Portra 800", styleProfile: profile({ warmth: 9, moody: 9, night: 7, filmLike: 8 }) },
  { id: "ref-blue-hour-city", imageUrl: image("blue hour city photography", 11), title: "블루아워 도시", styleTags: ["cool", "lowlight", "clean"], cameraTypeHint: "digital", styleProfile: profile({ night: 8, cleanDigital: 8, sharpness: 8 }) },
  { id: "ref-grainy-night", imageUrl: image("grainy black white night street", 12), title: "거친 입자의 밤거리", styleTags: ["filmic", "street", "moody"], cameraTypeHint: "film", filmHint: "Ilford Delta 3200", styleProfile: profile({ grainy: 10, night: 10, street: 8, moody: 9 }) },
  { id: "ref-hiking-documentary", imageUrl: image("hiking documentary travel landscape", 13), title: "산행 다큐 여행", styleTags: ["travel", "landscape", "documentary"], cameraTypeHint: "hybrid", styleProfile: profile({ travel: 9, landscape: 9, documentary: 8 }) },
  { id: "ref-pastel-travel-film", imageUrl: image("pastel film travel photography", 14), title: "파스텔 필름 여행", styleTags: ["filmic", "travel", "soft"], cameraTypeHint: "film", filmHint: "Lomography Color 400", styleProfile: profile({ filmLike: 9, travel: 8, softness: 8 }) },
  { id: "ref-clean-macro", imageUrl: image("clean sharp nature macro", 15), title: "깨끗한 자연 매크로", styleTags: ["nature", "sharp", "clean"], cameraTypeHint: "digital", styleProfile: profile({ sharpness: 10, cleanDigital: 8, natural: 8 }) },
  { id: "ref-retro-car-film", imageUrl: image("retro car film photography", 16), title: "레트로 자동차 필름톤", styleTags: ["filmic", "warm", "street"], cameraTypeHint: "film", filmHint: "Harman Phoenix 200", styleProfile: profile({ filmLike: 10, warmth: 7, street: 7 }) },
  { id: "ref-studio-product", imageUrl: image("studio product photography sharp", 17), title: "정돈된 제품 사진", styleTags: ["clean", "sharp", "minimal"], cameraTypeHint: "digital", styleProfile: profile({ cleanDigital: 10, sharpness: 10, contrast: 5 }) },
  { id: "ref-rain-window", imageUrl: image("rain window moody portrait", 18), title: "비 오는 창가 인물", styleTags: ["moody", "soft", "portrait"], cameraTypeHint: "hybrid", filmHint: "Portra 400", styleProfile: profile({ moody: 10, softness: 8, portrait: 7 }) },
  { id: "ref-desert-travel", imageUrl: image("desert travel warm landscape", 19), title: "따뜻한 사막 여행", styleTags: ["travel", "landscape", "warm"], cameraTypeHint: "hybrid", filmHint: "Kodak Ektar 100", styleProfile: profile({ travel: 9, landscape: 9, warmth: 8 }) },
  { id: "ref-quiet-lake", imageUrl: image("quiet lake natural landscape", 20), title: "잔잔한 자연 풍경", styleTags: ["natural", "landscape", "soft"], cameraTypeHint: "hybrid", styleProfile: profile({ natural: 10, landscape: 10, softness: 6 }) }
];
