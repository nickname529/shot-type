export type Brand =
  | "Sony"
  | "Fujifilm"
  | "Canon"
  | "Nikon"
  | "Leica"
  | "Ricoh"
  | "Panasonic"
  | "OM System"
  | "Kodak"
  | "Ilford"
  | "Cinestill"
  | "Lomography"
  | "Harman"
  | "Rollei"
  | "AgfaPhoto"
  | "Polaroid"
  | "Minolta"
  | "Pentax"
  | "Olympus"
  | "Contax"
  | "Mamiya"
  | "Hasselblad"
  | "Sigma"
  | "Tamron"
  | "Viltrox"
  | "Voigtlander"
  | "Zeiss";

export type BudgetRange = "under50" | "50to100" | "100to200" | "200to300" | "over300";
export type Purpose = "travel" | "daily" | "portrait" | "landscape" | "video" | "vlog" | "professional";
export type WeightPreference = "light" | "balanced" | "performance";
export type LensPreference = "want" | "neutral" | "avoid";
export type PhotoStyle = "sharp" | "filmic" | "warm" | "cool" | "contrasty" | "natural";
export type OperationStyle = "tactile" | "easy_auto" | "pro_controls";
export type UsedPreference = "possible" | "no";
export type VideoImportance = "low" | "medium" | "high";

export type CameraTag =
  | "color_warm"
  | "color_natural"
  | "color_filmic"
  | "video_strong"
  | "portable"
  | "beginner_friendly"
  | "tactile_controls"
  | "lens_ecosystem_strong"
  | "portrait_friendly"
  | "travel_friendly"
  | "lowlight_strong"
  | "premium_emotional"
  | "street_specialist"
  | "clean_digital"
  | "fast_af"
  | "weather_sealed"
  | "compact_fixed_lens"
  | "high_resolution";

export type LensTag =
  | "portrait"
  | "travel"
  | "street"
  | "cinematic"
  | "sharp"
  | "creamy_bokeh"
  | "lightweight"
  | "all_rounder"
  | "lowlight"
  | "vlog"
  | "landscape";

export type ImageTasteTag =
  | "warm"
  | "cinematic"
  | "sharp"
  | "soft"
  | "filmic"
  | "contrasty"
  | "portrait"
  | "street"
  | "travel"
  | "lowlight"
  | "moody"
  | "vibrant"
  | "clean"
  | "cool"
  | "natural"
  | "documentary"
  | "nature"
  | "landscape"
  | "monochrome"
  | "minimal";

export type BeginnerLevel = "entry" | "intermediate" | "pro";
export type LensType = "prime" | "zoom";
export type CameraKind = "digital" | "film";
export type FilmFormat = "35mm" | "120" | "instant" | "half-frame";
export type Difficulty = "easy" | "moderate" | "hard";
export type FilmType = "color_negative" | "black_white" | "slide" | "cinema" | "instant";
export type ShopLinkType = "new" | "used" | "film";
export type AffiliateLinkType = "buy" | "best_price" | "used_price" | "film";
export type AdPlacement = "results-bottom" | "explorer-bottom" | "shops-bottom" | "content-bottom";
export type Region = "서울" | "경기" | "부산" | "대구" | "광주" | "대전" | "제주" | "전국" | "해외";

export type StyleProfileKey =
  | "warmth"
  | "contrast"
  | "saturation"
  | "softness"
  | "sharpness"
  | "grainy"
  | "cinematic"
  | "natural"
  | "moody"
  | "vibrant"
  | "portrait"
  | "street"
  | "travel"
  | "landscape"
  | "documentary"
  | "night"
  | "filmLike"
  | "cleanDigital";

export type StyleProfile = Record<StyleProfileKey, number>;

export interface ShopLink {
  name: string;
  url: string;
  region: Region;
  type: ShopLinkType;
  priceHint?: string;
  note?: string;
  availabilityHint?: string;
  lastCheckedAt?: string;
  shippingHint?: string;
  trustSignal?: string;
}

export interface AffiliateLink {
  productId: string;
  vendorName: string;
  url: string;
  commissionRate: number;
  region: string;
  linkType?: AffiliateLinkType;
  label?: string;
  trackingConfigured?: boolean;
}

export interface SubscriptionPlan {
  name: string;
  price: number;
  billingPeriod: "monthly" | "yearly" | "free";
  features: string[];
  highlighted?: boolean;
}

export interface SponsoredContent {
  id: string;
  placement: AdPlacement;
  sponsorName: string;
  title: string;
  description: string;
  url: string;
  label: "광고" | "스폰서";
}

export interface AdUnit {
  id: string;
  placement: AdPlacement;
  advertiserName: string;
  title: string;
  description: string;
  url: string;
}

export interface ImageCredit {
  source: string;
  author: string;
  license: string;
  sourceUrl?: string;
}

export interface CaptureMetadata {
  cameraId: string;
  cameraLabel: string;
  lensLabel?: string;
  filmStockId?: string;
  filmStockLabel?: string;
  brandHint?: Brand;
  verified: boolean;
  sourceNote: string;
}

export interface QuizAnswers {
  purpose: Purpose;
  budget: BudgetRange;
  weightPreference: WeightPreference;
  lensPreference: LensPreference;
  photoStyle: PhotoStyle;
  operationStyle: OperationStyle;
  brandPreference: Brand | "none";
  usedPreference: UsedPreference;
  videoImportance: VideoImportance;
}

export interface CameraBody {
  id: string;
  brand: Brand;
  model: string;
  kind?: CameraKind;
  mount: string;
  type: string;
  sensorSize: string;
  weight: number;
  priceNew: number;
  priceUsed?: number;
  interchangeableLens: boolean;
  beginnerLevel: BeginnerLevel;
  strengths: string[];
  weaknesses: string[];
  tags: CameraTag[];
  recommendedFor: string[];
  imageStyleBias: ImageTasteTag[];
  styleBias?: Partial<StyleProfile>;
  useCases?: Purpose[];
  shopLinks?: ShopLink[];
  filmFormat?: FilmFormat;
  operationDifficulty?: Difficulty;
  maintenanceDifficulty?: Difficulty;
  cameraEra?: string;
}

export interface Lens {
  id: string;
  brand: Brand;
  model: string;
  mount: string;
  focalLength: string;
  maxAperture: string;
  weight: number;
  price: number;
  lensType: LensType;
  tags: LensTag[];
  compatibleMounts: string[];
  recommendedUse: string[];
  reason: string;
  exampleBodies: string[];
  styleBias?: Partial<StyleProfile>;
  shopLinks?: ShopLink[];
}

export interface TasteImage {
  id: string;
  imageUrl: string;
  title: string;
  description: string;
  tags: ImageTasteTag[];
  styleProfile: StyleProfile;
  capture?: CaptureMetadata;
  credit?: ImageCredit;
  styleDescription?: string;
}

export interface FilmStock {
  id: string;
  brand: Brand;
  model: string;
  iso: number;
  type: FilmType;
  filmFormat: FilmFormat[];
  price: number;
  styleBias: Partial<StyleProfile>;
  traits: string[];
  bestFor: string[];
  shopLinks: ShopLink[];
  caution: string;
}

export interface PhotoReference {
  id: string;
  imageUrl: string;
  title: string;
  styleTags: ImageTasteTag[];
  cameraTypeHint: CameraKind | "hybrid";
  filmHint?: string;
  styleProfile: Partial<StyleProfile>;
}

export interface Lab {
  id: string;
  name: string;
  location: string;
  region: Region;
  services: string[];
  priceLevel: "low" | "medium" | "high";
  tags: Array<"budget" | "premium_scan" | "fast" | "film_push" | "bw" | "120" | "color" | "mail_in" | "travel">;
  mapLink: string;
  description: string;
  scanQuality?: "standard" | "high" | "pro";
  turnaround?: string;
  mailIn?: boolean;
  reviewSummary?: string;
}

export type CaptureSignalKey = `camera:${string}` | `film:${string}` | `brand:${string}`;
export type ScoreVector = Partial<Record<CameraTag | ImageTasteTag | LensTag | StyleProfileKey | CaptureSignalKey, number>>;

export interface CameraRecommendation {
  camera: CameraBody;
  recommendedLenses: Lens[];
  recommendedFilms?: FilmStock[];
  photoReferences?: PhotoReference[];
  userPreferenceScore: number;
  imageTasteScore: number;
  cameraProfileScore: number;
  budgetScore: number;
  conditionScore: number;
  finalMatchScore: number;
  scoreKind?: CameraKind;
  tier: "value" | "balanced" | "premium";
  reason: string;
  fitSummary: string[];
  caution: string;
}

export interface FilmRecommendation {
  film: FilmStock;
  surveyScore: number;
  imageTasteScore: number;
  conditionScore: number;
  filmStockScore: number;
  finalScore: number;
  reason: string;
  fitSummary: string[];
  photoReferences: PhotoReference[];
}

export interface LabRecommendation {
  lab: Lab;
  score: number;
  reason: string;
}

export interface FavoriteState {
  cameras: string[];
  lenses: string[];
  films: string[];
}
