import type { AdUnit, AffiliateLink, AdPlacement, ShopLink, SponsoredContent, SubscriptionPlan } from "@/types";
import { applyAffiliateTracking, isAffiliateTrackingConfigured } from "./affiliate-config";

type ProductCategory = "camera" | "lens" | "film";

const vendorSearchBase: Record<ProductCategory, Array<Omit<AffiliateLink, "productId" | "url"> & { urlBase: string }>> = {
  camera: [
    { vendorName: "B&H Photo", commissionRate: 2.5, region: "US/Global", linkType: "best_price", label: "최저가 보기", urlBase: "https://www.bhphotovideo.com/c/search?Ntt=" },
    { vendorName: "KEH Camera", commissionRate: 3.5, region: "US used", linkType: "used_price", label: "중고 가격 확인", urlBase: "https://www.keh.com/shop/search?q=" },
    { vendorName: "Naver Shopping", commissionRate: 1.2, region: "KR", linkType: "buy", label: "구매하기", urlBase: "https://search.shopping.naver.com/search/all?query=" }
  ],
  lens: [
    { vendorName: "B&H Photo", commissionRate: 2.5, region: "US/Global", linkType: "best_price", label: "최저가 보기", urlBase: "https://www.bhphotovideo.com/c/search?Ntt=" },
    { vendorName: "MPB", commissionRate: 3, region: "US/EU used", linkType: "used_price", label: "중고 가격 확인", urlBase: "https://www.mpb.com/en-us/search?q=" },
    { vendorName: "Naver Shopping", commissionRate: 1.2, region: "KR", linkType: "buy", label: "구매하기", urlBase: "https://search.shopping.naver.com/search/all?query=" }
  ],
  film: [
    { vendorName: "Freestyle Photo", commissionRate: 4, region: "US film", linkType: "film", label: "필름 구매", urlBase: "https://www.freestylephoto.com/search?q=" },
    { vendorName: "B&H Photo", commissionRate: 2.5, region: "US/Global", linkType: "best_price", label: "최저가 보기", urlBase: "https://www.bhphotovideo.com/c/search?Ntt=" },
    { vendorName: "Naver Shopping", commissionRate: 1.2, region: "KR", linkType: "buy", label: "구매하기", urlBase: "https://search.shopping.naver.com/search/all?query=" }
  ]
};

export const affiliateOverrides: AffiliateLink[] = [
  {
    productId: "kodak-portra-400",
    vendorName: "Freestyle Photo",
    url: "https://www.freestylephoto.com/search?q=Kodak%20Portra%20400",
    commissionRate: 4,
    region: "US film",
    linkType: "film",
    label: "필름 구매"
  },
  {
    productId: "sony-a7iv",
    vendorName: "B&H Photo",
    url: "https://www.bhphotovideo.com/c/search?Ntt=Sony%20a7%20IV",
    commissionRate: 2.5,
    region: "US/Global",
    linkType: "best_price",
    label: "최저가 보기"
  }
];

export const subscriptionPlans: SubscriptionPlan[] = [
  {
    name: "Free",
    price: 0,
    billingPeriod: "free",
    features: ["기본 카메라 추천", "기본 필름 추천", "카메라/렌즈/필름 탐색", "찜과 기본 비교"]
  },
  {
    name: "ShotType Pro",
    price: 7900,
    billingPeriod: "monthly",
    highlighted: true,
    features: ["고급 취향 분석", "상세 점수 breakdown", "렌즈 조합 추천 강화", "프로 사진가 스타일 매칭", "추천 히스토리 저장", "확장 비교 기능"]
  }
];

export const adUnits: AdUnit[] = [
  {
    id: "result-print-service",
    placement: "results-bottom",
    advertiserName: "Frame Print Studio",
    title: "추천받은 사진 스타일을 인화로 확인하기",
    description: "카메라를 고르기 전, 선호하는 톤의 인화 샘플을 작은 사이즈로 먼저 확인할 수 있습니다.",
    url: "https://example.com/ads/frame-print-studio"
  },
  {
    id: "explorer-camera-care",
    placement: "explorer-bottom",
    advertiserName: "Clean Sensor Lab",
    title: "중고 바디 구매 전 센서 점검",
    description: "중고 카메라를 고를 때 먼지, 셔터 카운트, 외관 상태를 함께 확인하세요.",
    url: "https://example.com/ads/clean-sensor-lab"
  },
  {
    id: "shops-insurance",
    placement: "shops-bottom",
    advertiserName: "Gear Cover",
    title: "카메라 장비 파손 보험 알아보기",
    description: "여행과 야외 촬영이 많다면 구매 후 장비 보호 옵션을 비교해 보세요.",
    url: "https://example.com/ads/gear-cover"
  }
];

export const sponsoredContent: SponsoredContent[] = [
  {
    id: "sponsored-film-starter",
    placement: "results-bottom",
    sponsorName: "Analog Starter Kit",
    label: "스폰서",
    title: "처음 필름을 시작하는 사람을 위한 스타터 키트",
    description: "필름 3롤, 보관 케이스, 현상 쿠폰을 묶은 입문자용 패키지입니다. 추천 순위와는 별개로 노출됩니다.",
    url: "https://example.com/sponsored/analog-starter-kit"
  }
];

export function buildAffiliateLinks(productId: string, productName: string, category: ProductCategory, fallbackLinks: ShopLink[] = []): AffiliateLink[] {
  const explicit = affiliateOverrides.filter((link) => link.productId === productId);
  if (explicit.length) return explicit.map((link) => withAffiliateTracking(link, productName));

  const generated = vendorSearchBase[category].map(({ urlBase, ...link }) => ({
    ...link,
    productId,
    url: `${urlBase}${encodeURIComponent(productName)}`
  }));

  const fallback = fallbackLinks.slice(0, 2).map((link) => ({
    productId,
    vendorName: link.name,
    url: link.url,
    commissionRate: 0,
    region: link.region,
    linkType: link.type === "used" ? "used_price" : link.type === "film" ? "film" : "buy",
    label: link.type === "used" ? "중고 가격 확인" : link.type === "film" ? "필름 구매" : "구매하기"
  } satisfies AffiliateLink));

  return [...generated, ...fallback].slice(0, 4).map((link) => withAffiliateTracking(link, productName));
}

function withAffiliateTracking(link: AffiliateLink, query: string): AffiliateLink {
  const trackingConfigured = isAffiliateTrackingConfigured(link.vendorName);
  return {
    ...link,
    url: applyAffiliateTracking(link.vendorName, link.url, query),
    commissionRate: trackingConfigured ? link.commissionRate : 0,
    trackingConfigured
  };
}

export function getAdsByPlacement(placement: AdPlacement) {
  return adUnits.filter((ad) => ad.placement === placement);
}

export function getSponsoredByPlacement(placement: AdPlacement) {
  return sponsoredContent.filter((item) => item.placement === placement);
}
