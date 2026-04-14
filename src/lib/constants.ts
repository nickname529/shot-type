import type {
  Brand,
  BudgetRange,
  LensPreference,
  OperationStyle,
  PhotoStyle,
  QuizAnswers,
  Purpose,
  UsedPreference,
  VideoImportance,
  WeightPreference
} from "@/types";

export const brands: Brand[] = [
  "Sony",
  "Fujifilm",
  "Canon",
  "Nikon",
  "Leica",
  "Ricoh",
  "Panasonic",
  "OM System",
  "Pentax",
  "Olympus",
  "Minolta",
  "Contax",
  "Mamiya",
  "Hasselblad",
  "Kodak"
];

export const budgetLabels: Record<BudgetRange, string> = {
  under50: "50만원 이하",
  "50to100": "50~100만원",
  "100to200": "100~200만원",
  "200to300": "200~300만원",
  over300: "300만원 이상"
};

export const budgetMax: Record<BudgetRange, number> = {
  under50: 500000,
  "50to100": 1000000,
  "100to200": 2000000,
  "200to300": 3000000,
  over300: 99999999
};

export const purposeLabels: Record<Purpose, string> = {
  travel: "여행",
  daily: "일상 스냅",
  portrait: "인물",
  landscape: "풍경",
  video: "영상",
  vlog: "브이로그",
  professional: "전문 작업"
};

export const weightLabels: Record<WeightPreference, string> = {
  light: "가벼움 우선",
  balanced: "적당히 균형",
  performance: "성능 우선"
};

export const lensPreferenceLabels: Record<LensPreference, string> = {
  want: "렌즈 교환 원함",
  neutral: "상관없음",
  avoid: "렌즈 교환 싫음"
};

export const photoStyleLabels: Record<PhotoStyle, string> = {
  sharp: "선명",
  filmic: "필름풍",
  warm: "따뜻함",
  cool: "차가움",
  contrasty: "콘트라스트 강함",
  natural: "자연스러움"
};

export const operationLabels: Record<OperationStyle, string> = {
  tactile: "다이얼 감성",
  easy_auto: "쉬운 자동모드",
  pro_controls: "전문가 설정 많음"
};

export const usedLabels: Record<UsedPreference, string> = {
  possible: "중고 가능",
  no: "신품 위주"
};

export const videoLabels: Record<VideoImportance, string> = {
  low: "영상 낮음",
  medium: "영상 보통",
  high: "영상 높음"
};

export const defaultQuizAnswers: QuizAnswers = {
  purpose: "travel",
  budget: "100to200",
  weightPreference: "balanced",
  lensPreference: "neutral",
  photoStyle: "natural",
  operationStyle: "easy_auto",
  brandPreference: "none",
  usedPreference: "possible",
  videoImportance: "medium"
};

export const storageKeys = {
  quiz: "shot-type-quiz",
  tasteScore: "shot-type-taste-score",
  filmTasteScore: "shot-type-film-taste-score",
  favorites: "shot-type-favorites",
  compareCameras: "shot-type-compare-cameras",
  savedResults: "shot-type-saved-results"
} as const;
