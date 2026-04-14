import { budgetMax, defaultQuizAnswers, photoStyleLabels, purposeLabels, videoLabels, weightLabels } from "@/lib/constants";
import { cameras, filmStocks, labs, lenses, photoReferences, styleKeys, styleLabels } from "@/lib/data";
import { clamp, formatWon, unique } from "@/lib/utils";
import type {
  CameraBody,
  CameraKind,
  CameraRecommendation,
  CaptureSignalKey,
  FilmRecommendation,
  FilmStock,
  ImageTasteTag,
  LabRecommendation,
  Lens,
  LensTag,
  PhotoReference,
  QuizAnswers,
  ScoreVector,
  StyleProfile,
  StyleProfileKey,
  TasteImage
} from "@/types";

type ScoreKey = keyof ScoreVector;

function add(vector: ScoreVector, key: ScoreKey, value: number) {
  vector[key] = (vector[key] ?? 0) + value;
}

function captureKey(type: "camera" | "film" | "brand", id: string) {
  return `${type}:${id}` as CaptureSignalKey;
}

function addStyle(vector: ScoreVector, key: StyleProfileKey, value: number) {
  add(vector, key, value);
}

function dot(a: ScoreVector, b: ScoreVector) {
  return Object.entries(a).reduce((sum, [key, value]) => sum + (value ?? 0) * (b[key as ScoreKey] ?? 0), 0);
}

function magnitude(vector: ScoreVector) {
  return Math.sqrt(Object.values(vector).reduce<number>((sum, value) => sum + (value ?? 0) ** 2, 0));
}

function cosineScore(a: ScoreVector, b: ScoreVector, fallback = 58) {
  const mag = magnitude(a) * magnitude(b);
  if (!mag) return fallback;
  return clamp(Math.round((dot(a, b) / mag) * 100));
}

function fromStyleProfile(style: Partial<StyleProfile>, weight = 1): ScoreVector {
  const vector: ScoreVector = {};
  styleKeys.forEach((key) => {
    const value = style[key] ?? 0;
    if (value > 0) addStyle(vector, key, value * weight);
  });
  return vector;
}

function mergeVectors(...vectors: ScoreVector[]) {
  const merged: ScoreVector = {};
  vectors.forEach((vector) => {
    Object.entries(vector).forEach(([key, value]) => add(merged, key as ScoreKey, value ?? 0));
  });
  return merged;
}

function normalizeStyleVector(vector: ScoreVector): ScoreVector {
  const max = Math.max(1, ...styleKeys.map((key) => vector[key] ?? 0));
  const normalized: ScoreVector = {};
  styleKeys.forEach((key) => {
    const value = vector[key] ?? 0;
    if (value > 0) normalized[key] = (value / max) * 10;
  });
  return normalized;
}

function effectivePrice(camera: CameraBody, quiz: QuizAnswers) {
  return quiz.usedPreference === "possible" && camera.priceUsed ? camera.priceUsed : camera.priceNew;
}

function tagBias(camera: CameraBody): ScoreVector {
  const vector: ScoreVector = {};
  const addIf = (condition: boolean, entries: Array<[StyleProfileKey, number]>) => {
    if (condition) entries.forEach(([key, value]) => addStyle(vector, key, value));
  };

  addIf(camera.tags.includes("color_warm"), [["warmth", 8], ["natural", 4]]);
  addIf(camera.tags.includes("color_natural"), [["natural", 8], ["cleanDigital", 3]]);
  addIf(camera.tags.includes("color_filmic"), [["filmLike", 8], ["softness", 5], ["grainy", 3]]);
  addIf(camera.tags.includes("video_strong"), [["cinematic", 7], ["cleanDigital", 6]]);
  addIf(camera.tags.includes("portable"), [["travel", 7], ["documentary", 4]]);
  addIf(camera.tags.includes("street_specialist"), [["street", 9], ["documentary", 6]]);
  addIf(camera.tags.includes("portrait_friendly"), [["portrait", 8], ["softness", 4]]);
  addIf(camera.tags.includes("lowlight_strong"), [["night", 8], ["moody", 5]]);
  addIf(camera.tags.includes("high_resolution"), [["sharpness", 9], ["landscape", 6]]);
  addIf(camera.tags.includes("clean_digital"), [["cleanDigital", 9], ["sharpness", 5]]);
  addIf(camera.tags.includes("premium_emotional"), [["moody", 6], ["filmLike", 4]]);

  camera.imageStyleBias.forEach((tag) => {
    const map: Partial<Record<ImageTasteTag, Array<[StyleProfileKey, number]>>> = {
      warm: [["warmth", 6]],
      cinematic: [["cinematic", 7]],
      sharp: [["sharpness", 7]],
      soft: [["softness", 7]],
      filmic: [["filmLike", 8], ["grainy", 4]],
      contrasty: [["contrast", 7]],
      portrait: [["portrait", 7]],
      street: [["street", 7]],
      travel: [["travel", 7]],
      lowlight: [["night", 7]],
      moody: [["moody", 7]],
      vibrant: [["vibrant", 7], ["saturation", 6]],
      clean: [["cleanDigital", 7]],
      cool: [["natural", 4]],
      natural: [["natural", 7]],
      documentary: [["documentary", 7]],
      nature: [["landscape", 6], ["natural", 6]],
      landscape: [["landscape", 7]],
      monochrome: [["contrast", 6], ["documentary", 5]],
      minimal: [["cleanDigital", 5], ["natural", 5]]
    };
    map[tag]?.forEach(([key, value]) => addStyle(vector, key, value));
  });

  return vector;
}

function cameraVector(camera: CameraBody) {
  const vector = mergeVectors(tagBias(camera), fromStyleProfile(camera.styleBias ?? {}, 1.6));
  add(vector, captureKey("camera", camera.id), 12);
  add(vector, captureKey("brand", camera.brand), 4);
  return vector;
}

export function buildSurveyProfile(quiz: QuizAnswers): ScoreVector {
  const vector: ScoreVector = {};

  const purposeMap: Record<QuizAnswers["purpose"], Array<[StyleProfileKey, number]>> = {
    travel: [["travel", 9], ["natural", 6], ["documentary", 5]],
    daily: [["street", 7], ["documentary", 7], ["natural", 6]],
    portrait: [["portrait", 10], ["softness", 6], ["warmth", 5]],
    landscape: [["landscape", 10], ["sharpness", 7], ["natural", 7]],
    video: [["cinematic", 9], ["cleanDigital", 7], ["sharpness", 5]],
    vlog: [["travel", 7], ["cleanDigital", 8], ["natural", 6]],
    professional: [["sharpness", 8], ["cleanDigital", 7], ["portrait", 5], ["landscape", 5]]
  };

  purposeMap[quiz.purpose].forEach(([key, value]) => addStyle(vector, key, value));

  if (quiz.photoStyle === "sharp") [["sharpness", 9], ["cleanDigital", 7], ["contrast", 5]].forEach(([k, v]) => addStyle(vector, k as StyleProfileKey, v as number));
  if (quiz.photoStyle === "filmic") [["filmLike", 10], ["grainy", 6], ["softness", 6], ["moody", 5]].forEach(([k, v]) => addStyle(vector, k as StyleProfileKey, v as number));
  if (quiz.photoStyle === "warm") [["warmth", 10], ["softness", 5], ["natural", 5]].forEach(([k, v]) => addStyle(vector, k as StyleProfileKey, v as number));
  if (quiz.photoStyle === "cool") [["natural", 7], ["cleanDigital", 5], ["moody", 4]].forEach(([k, v]) => addStyle(vector, k as StyleProfileKey, v as number));
  if (quiz.photoStyle === "contrasty") [["contrast", 10], ["street", 5], ["moody", 5]].forEach(([k, v]) => addStyle(vector, k as StyleProfileKey, v as number));
  if (quiz.photoStyle === "natural") [["natural", 10], ["documentary", 6], ["softness", 4]].forEach(([k, v]) => addStyle(vector, k as StyleProfileKey, v as number));

  if (quiz.weightPreference === "light") [["travel", 5], ["documentary", 3]].forEach(([k, v]) => addStyle(vector, k as StyleProfileKey, v as number));
  if (quiz.operationStyle === "tactile") [["filmLike", 5], ["documentary", 4], ["street", 3]].forEach(([k, v]) => addStyle(vector, k as StyleProfileKey, v as number));
  if (quiz.operationStyle === "easy_auto") [["cleanDigital", 4], ["natural", 4]].forEach(([k, v]) => addStyle(vector, k as StyleProfileKey, v as number));
  if (quiz.videoImportance === "high") [["cinematic", 8], ["cleanDigital", 5], ["night", 3]].forEach(([k, v]) => addStyle(vector, k as StyleProfileKey, v as number));
  if (quiz.videoImportance === "low") [["filmLike", 3], ["documentary", 3]].forEach(([k, v]) => addStyle(vector, k as StyleProfileKey, v as number));

  return vector;
}

export function buildUserPreferenceScore(quiz: QuizAnswers): ScoreVector {
  return buildSurveyProfile(quiz);
}

export function expandImageTasteScore(tasteScore: ScoreVector): ScoreVector {
  return normalizeStyleVector(tasteScore);
}

function budgetScoreForCamera(camera: CameraBody, quiz: QuizAnswers) {
  const max = budgetMax[quiz.budget];
  const price = effectivePrice(camera, quiz);
  if (quiz.budget === "over300") return price >= 2500000 ? 96 : price >= 1400000 ? 82 : 70;
  if (price <= max) return clamp(92 + ((max - price) / max) * 8);
  return clamp(88 - ((price - max) / max) * 75, 8, 84);
}

export function getBudgetScore(camera: CameraBody, quiz: QuizAnswers) {
  return budgetScoreForCamera(camera, quiz);
}

function conditionScore(camera: CameraBody, quiz: QuizAnswers, kind: CameraKind) {
  let score = 70;

  if (quiz.brandPreference !== "none") score += camera.brand === quiz.brandPreference ? 12 : -4;
  if (quiz.lensPreference === "avoid") score += camera.interchangeableLens ? -18 : 18;
  if (quiz.lensPreference === "want") score += camera.interchangeableLens ? 14 : -20;
  if (quiz.weightPreference === "light") score += camera.weight <= 420 ? 18 : camera.weight <= 650 ? 6 : -18;
  if (quiz.weightPreference === "performance") score += camera.weight > 600 ? 8 : 2;

  if (kind === "digital") {
    if (quiz.videoImportance === "high") score += camera.tags.includes("video_strong") ? 18 : -10;
    if (quiz.operationStyle === "easy_auto") score += camera.tags.includes("beginner_friendly") || camera.tags.includes("fast_af") ? 10 : -4;
  }

  if (kind === "film") {
    score += (camera.styleBias?.filmLike ?? 0) * 2;
    score += (camera.styleBias?.moody ?? 0) * 0.8;
    if (quiz.videoImportance === "high") score -= 14;
    if (quiz.operationStyle === "easy_auto") score += camera.operationDifficulty === "easy" ? 12 : -8;
    if (camera.maintenanceDifficulty === "hard") score -= quiz.usedPreference === "possible" ? 3 : 8;
  }

  return clamp(score);
}

function cameraProfileScore(camera: CameraBody, quiz: QuizAnswers, kind: CameraKind) {
  let score = 62;
  if (quiz.purpose === "portrait" && camera.tags.includes("portrait_friendly")) score += 15;
  if ((quiz.purpose === "daily" || quiz.purpose === "travel") && (camera.tags.includes("portable") || camera.tags.includes("travel_friendly"))) score += 13;
  if (quiz.purpose === "landscape" && (camera.tags.includes("high_resolution") || camera.tags.includes("weather_sealed"))) score += 13;
  if ((quiz.purpose === "video" || quiz.purpose === "vlog") && camera.tags.includes("video_strong")) score += 16;
  if (quiz.operationStyle === "tactile" && camera.tags.includes("tactile_controls")) score += 14;
  if (kind === "film") score += (camera.styleBias?.filmLike ?? 0) * 1.6 + (camera.styleBias?.moody ?? 0);
  return clamp(score);
}

function recommendationTier(price: number): CameraRecommendation["tier"] {
  if (price < 1200000) return "value";
  if (price < 3200000) return "balanced";
  return "premium";
}

function lensVector(lens: Lens) {
  const vector = fromStyleProfile(lens.styleBias ?? {}, 1.4);
  const tagMap: Partial<Record<LensTag, Array<[StyleProfileKey, number]>>> = {
    portrait: [["portrait", 8]],
    travel: [["travel", 8]],
    street: [["street", 8]],
    cinematic: [["cinematic", 8]],
    sharp: [["sharpness", 8]],
    creamy_bokeh: [["softness", 7], ["portrait", 4]],
    lightweight: [["travel", 5]],
    all_rounder: [["natural", 5], ["documentary", 4]],
    lowlight: [["night", 8], ["moody", 4]],
    vlog: [["cleanDigital", 6], ["cinematic", 4]],
    landscape: [["landscape", 8]]
  };
  lens.tags.forEach((tag) => tagMap[tag]?.forEach(([key, value]) => addStyle(vector, key, value)));
  return vector;
}

export function recommendLensesForCamera(camera: CameraBody, quiz: QuizAnswers, tasteScore: ScoreVector, limit = 3) {
  if (!camera.interchangeableLens) return [];
  const preference = mergeVectors(buildSurveyProfile(quiz), expandImageTasteScore(tasteScore));
  return lenses
    .filter((lens) => lens.compatibleMounts.includes(camera.mount))
    .map((lens) => ({
      lens,
      score: cosineScore(preference, lensVector(lens), 55) + (lens.weight < 320 ? 4 : 0) + (lens.price < 800000 ? 3 : 0)
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ lens }) => lens);
}

function referencesFor(profile: ScoreVector, kind: CameraKind | "hybrid", film?: FilmStock, limit = 3) {
  return photoReferences
    .map((reference) => ({
      reference,
      score:
        cosineScore(profile, fromStyleProfile(reference.styleProfile), 55) +
        (reference.cameraTypeHint === kind || reference.cameraTypeHint === "hybrid" ? 10 : 0) +
        (film && reference.filmHint?.toLowerCase().includes(film.model.split(" ")[0].toLowerCase()) ? 6 : 0)
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ reference }) => reference);
}

function reasonForCamera(camera: CameraBody, quiz: QuizAnswers, kind: CameraKind, scores: Pick<CameraRecommendation, "userPreferenceScore" | "imageTasteScore" | "conditionScore">, recommendedLenses: Lens[]) {
  const price = formatWon(effectivePrice(camera, quiz));
  const lensText = camera.interchangeableLens
    ? `렌즈는 ${recommendedLenses.slice(0, 2).map((lens) => lens.model).join(", ")} 조합부터 보면 좋습니다.`
    : "렌즈 교환 없이 카메라 하나의 시야에 집중하는 타입입니다.";
  const filmText = kind === "film" ? " 필름다운 입자와 느린 촬영 리듬을 좋아할수록 만족도가 올라갑니다." : " AF, 편의성, 영상 같은 현대적인 촬영 흐름도 함께 고려했습니다.";

  return `${camera.brand} ${camera.model}은 ${purposeLabels[quiz.purpose]} 중심으로 찍고 ${photoStyleLabels[quiz.photoStyle]} 톤을 좋아하는 사용자에게 잘 맞습니다. 예상 실구매가는 ${price} 수준이고, 설문 ${scores.userPreferenceScore}점, 사진 취향 ${scores.imageTasteScore}점, 조건 적합도 ${scores.conditionScore}점으로 균형이 좋습니다.${filmText} ${lensText}`;
}

export function scoreCamera(camera: CameraBody, quiz: QuizAnswers, tasteScore: ScoreVector = {}): CameraRecommendation {
  const kind = camera.kind ?? "digital";
  const survey = buildSurveyProfile(quiz);
  const imageTaste = expandImageTasteScore(tasteScore);
  const profile = cameraVector(camera);
  const surveyScore = cosineScore(survey, profile);
  const tasteScoreValue = cosineScore(imageTaste, profile, 64);
  const profileScore = cameraProfileScore(camera, quiz, kind);
  const userPreferenceScore = clamp(surveyScore * 0.78 + profileScore * 0.22);
  const condition = conditionScore(camera, quiz, kind);
  const finalMatchScore = clamp(userPreferenceScore * 0.5 + tasteScoreValue * 0.4 + condition * 0.1);
  const recommendedLenses = recommendLensesForCamera(camera, quiz, tasteScore, 3);
  const recommendedFilms = kind === "film" ? getFilmStockRecommendations(quiz, tasteScore).slice(0, 3).map((item) => item.film) : undefined;
  const photoRefs = referencesFor(mergeVectors(survey, imageTaste, profile), kind, recommendedFilms?.[0], 3);

  const base = {
    camera,
    recommendedLenses,
    recommendedFilms,
    photoReferences: photoRefs,
    userPreferenceScore: Math.round(userPreferenceScore),
    imageTasteScore: Math.round(tasteScoreValue),
    cameraProfileScore: Math.round(profileScore),
    budgetScore: Math.round(budgetScoreForCamera(camera, quiz)),
    conditionScore: Math.round(condition),
    finalMatchScore: Math.round(finalMatchScore),
    scoreKind: kind,
    tier: recommendationTier(effectivePrice(camera, quiz)),
    fitSummary: unique([
      kind === "film" ? "필름카메라" : "디지털",
      purposeLabels[quiz.purpose],
      photoStyleLabels[quiz.photoStyle],
      camera.interchangeableLens ? "렌즈 확장" : "고정렌즈",
      camera.tags.includes("portable") ? "휴대성" : "",
      camera.tags.includes("video_strong") ? "영상 대응" : "",
      camera.filmFormat ? `${camera.filmFormat} 필름` : ""
    ].filter(Boolean)),
    caution: camera.weaknesses[0] ?? "구매 전 실제 상태와 그립감을 확인하세요."
  };

  return {
    ...base,
    reason: reasonForCamera(camera, quiz, kind, base, recommendedLenses)
  };
}

export function getRecommendations(quiz: QuizAnswers = defaultQuizAnswers, tasteScore: ScoreVector = {}) {
  return getDigitalCameraRecommendations(quiz, tasteScore);
}

export function getDigitalCameraRecommendations(quiz: QuizAnswers = defaultQuizAnswers, tasteScore: ScoreVector = {}) {
  return cameras
    .filter((camera) => (camera.kind ?? "digital") === "digital")
    .map((camera) => scoreCamera(camera, quiz, tasteScore))
    .sort((a, b) => b.finalMatchScore - a.finalMatchScore);
}

export function getFilmCameraRecommendations(quiz: QuizAnswers = defaultQuizAnswers, tasteScore: ScoreVector = {}) {
  return cameras
    .filter((camera) => camera.kind === "film")
    .map((camera) => scoreCamera(camera, quiz, tasteScore))
    .sort((a, b) => b.finalMatchScore - a.finalMatchScore);
}

function filmVector(film: FilmStock) {
  const vector = fromStyleProfile(film.styleBias, 1.8);
  add(vector, captureKey("film", film.id), 14);
  add(vector, captureKey("brand", film.brand), 4);
  return vector;
}

export function scoreFilmStock(film: FilmStock, quiz: QuizAnswers, tasteScore: ScoreVector = {}): FilmRecommendation {
  const survey = buildSurveyProfile(quiz);
  const imageTaste = expandImageTasteScore(tasteScore);
  const profile = filmVector(film);
  const surveyScore = cosineScore(survey, profile, 58);
  const imageTasteScore = cosineScore(imageTaste, profile, 62);
  let condition = 72;

  if (quiz.photoStyle === "filmic") condition += 10;
  if (quiz.photoStyle === "warm" && (film.styleBias.warmth ?? 0) > 6) condition += 8;
  if (quiz.photoStyle === "contrasty" && (film.styleBias.contrast ?? 0) > 6) condition += 8;
  if (quiz.purpose === "portrait" && (film.styleBias.portrait ?? 0) > 6) condition += 8;
  if (quiz.purpose === "landscape" && (film.styleBias.landscape ?? 0) > 6) condition += 8;
  if (quiz.videoImportance === "high") condition -= 8;
  if (film.price < 18000) condition += 4;
  if (film.iso >= 800 && ((imageTaste.night ?? 0) > 3 || quiz.purpose === "daily")) condition += 5;

  condition = clamp(condition);
  const filmStockScore = clamp(surveyScore * 0.5 + imageTasteScore * 0.4 + condition * 0.1);
  const refs = referencesFor(mergeVectors(survey, imageTaste, profile), "film", film, 3);

  return {
    film,
    surveyScore: Math.round(surveyScore),
    imageTasteScore: Math.round(imageTasteScore),
    conditionScore: Math.round(condition),
    filmStockScore: Math.round(filmStockScore),
    finalScore: Math.round(filmStockScore),
    reason: `${film.brand} ${film.model}은 ${film.traits.join(", ")} 성향이라 ${photoStyleLabels[quiz.photoStyle]} 취향과 잘 이어집니다. ISO ${film.iso}라 ${film.bestFor.slice(0, 2).join(", ")} 촬영에 현실적이고, 사진 취향 점수 ${Math.round(imageTasteScore)}점으로 결과물 방향도 잘 맞습니다.`,
    fitSummary: unique([`${film.iso} ISO`, film.type, ...film.traits.slice(0, 3), ...film.bestFor.slice(0, 2)]),
    photoReferences: refs
  };
}

export function getFilmStockRecommendations(quiz: QuizAnswers = defaultQuizAnswers, tasteScore: ScoreVector = {}) {
  return filmStocks.map((film) => scoreFilmStock(film, quiz, tasteScore)).sort((a, b) => b.finalScore - a.finalScore);
}

export function getTierRecommendations(recommendations: CameraRecommendation[]) {
  return {
    value: recommendations.find((item) => item.tier === "value") ?? recommendations[0],
    balanced: recommendations.find((item) => item.tier === "balanced") ?? recommendations[1] ?? recommendations[0],
    premium: recommendations.find((item) => item.tier === "premium") ?? recommendations[2] ?? recommendations[0]
  };
}

export function summarizeTasteProfile(quiz: QuizAnswers, tasteScore: ScoreVector) {
  const topTaste = styleKeys
    .map((key) => [key, tasteScore[key] ?? 0] as const)
    .filter(([, value]) => value > 0)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 4)
    .map(([key]) => styleLabels[key]);

  return unique([
    `${purposeLabels[quiz.purpose]} 중심`,
    `${photoStyleLabels[quiz.photoStyle]} 색감`,
    weightLabels[quiz.weightPreference],
    quiz.lensPreference === "avoid" ? "렌즈 교환보다 간편함" : quiz.lensPreference === "want" ? "렌즈 확장 선호" : "렌즈 교환 선택사항",
    `${videoLabels[quiz.videoImportance]} 비중`,
    ...topTaste
  ]);
}

export function scoreTasteSelections(selections: Array<{ image?: TasteImage; tags?: ImageTasteTag[]; styleProfile?: StyleProfile; rank: number }>) {
  const vector: ScoreVector = {};
  selections.forEach(({ image, styleProfile, rank }) => {
    const points = Math.max(1, 5 - rank);
    const source = styleProfile ?? image?.styleProfile;
    if (!source) return;
    styleKeys.forEach((key) => addStyle(vector, key, (source[key] ?? 0) * points));
    if (image?.capture) {
      add(vector, captureKey("camera", image.capture.cameraId), points * 7);
      if (image.capture.filmStockId) add(vector, captureKey("film", image.capture.filmStockId), points * 9);
      if (image.capture.brandHint) add(vector, captureKey("brand", image.capture.brandHint), points * 3);
    }
  });
  return vector;
}

export function getLabRecommendations(options: { region?: string; film?: FilmStock; priceLevel?: string } = {}): LabRecommendation[] {
  const { region = "서울", film, priceLevel = "any" } = options;

  return labs
    .map((lab) => {
      let score = 55;
      if (lab.region === region) score += 26;
      if (lab.region === "전국") score += 12;
      if (priceLevel !== "any" && lab.priceLevel === priceLevel) score += 12;
      if (film?.type === "black_white" && lab.tags.includes("bw")) score += 14;
      if (film?.filmFormat.includes("120") && lab.tags.includes("120")) score += 12;
      if (film?.type === "color_negative" && lab.tags.includes("color")) score += 10;
      if ((film?.styleBias.sharpness ?? 0) > 7 && lab.tags.includes("premium_scan")) score += 10;
      if ((film?.styleBias.grainy ?? 0) > 7 && lab.tags.includes("film_push")) score += 4;

      return {
        lab,
        score: clamp(score),
        reason: `${lab.name}은 ${lab.services.slice(0, 3).join(", ")} 서비스를 제공하고, ${film ? `${film.brand} ${film.model}` : "선택한 필름"}의 현상/스캔 흐름과 잘 맞습니다. ${lab.description}`
      };
    })
    .sort((a, b) => b.score - a.score);
}

export function getPhotoReferencesForProfile(profile: ScoreVector, kind: CameraKind | "hybrid" = "hybrid", limit = 6): PhotoReference[] {
  return referencesFor(profile, kind, undefined, limit);
}
