import type { ShopLink, ShopLinkType } from "@/types";

function encoded(query: string) {
  return encodeURIComponent(query);
}

export function buildShopLinks(query: string, type: ShopLinkType): ShopLink[] {
  const q = encoded(query);

  if (type === "film") {
    return [
      {
        name: "네이버쇼핑 필름 검색",
        url: `https://search.shopping.naver.com/search/all?query=${q}`,
        region: "전국",
        type: "film",
        priceHint: "국내 가격 비교",
        note: "재고가 자주 변하는 필름은 검색 결과에서 유통기한과 배송비를 함께 보세요.",
        availabilityHint: "실시간 검색",
        lastCheckedAt: "검색 시점 기준",
        shippingHint: "국내 배송",
        trustSignal: "여러 판매처 비교"
      },
      {
        name: "Freestyle Photo",
        url: `https://www.freestylephoto.com/search?q=${q}`,
        region: "해외",
        type: "film",
        priceHint: "해외 필름 전문샵",
        note: "희귀 흑백 필름과 대형 포맷 필름을 찾을 때 좋습니다.",
        availabilityHint: "재고 페이지 확인",
        lastCheckedAt: "검색 시점 기준",
        shippingHint: "해외 배송",
        trustSignal: "필름 전문 판매처"
      },
      {
        name: "B&H Film Store",
        url: `https://www.bhphotovideo.com/c/search?q=${q}&sts=ma`,
        region: "해외",
        type: "film",
        priceHint: "해외 신품",
        note: "색상, 포맷, ISO별 재고 확인이 쉽습니다.",
        availabilityHint: "재고 페이지 확인",
        lastCheckedAt: "검색 시점 기준",
        shippingHint: "해외 배송",
        trustSignal: "대형 리테일러"
      }
    ];
  }

  return [
    {
      name: "네이버쇼핑 가격 비교",
      url: `https://search.shopping.naver.com/search/all?query=${q}`,
      region: "전국",
      type: "new",
      priceHint: "국내 신품/병행 검색",
      note: "국내 판매가와 카드 혜택을 빠르게 비교할 수 있습니다.",
      availabilityHint: "실시간 검색",
      lastCheckedAt: "검색 시점 기준",
      shippingHint: "국내 배송",
      trustSignal: "다수 판매처 비교"
    },
    {
      name: "다나와 카메라 검색",
      url: `https://search.danawa.com/dsearch.php?query=${q}`,
      region: "전국",
      type: "new",
      priceHint: "가격 비교",
      note: "신품 최저가 흐름을 확인하기 좋습니다.",
      availabilityHint: "실시간 검색",
      lastCheckedAt: "검색 시점 기준",
      shippingHint: "국내 배송",
      trustSignal: "가격 비교 특화"
    },
    {
      name: "KEH Camera Used",
      url: `https://www.keh.com/shop/search?q=${q}`,
      region: "해외",
      type: "used",
      priceHint: "해외 중고",
      note: "상태 등급이 명확한 중고 장비를 찾을 때 참고하기 좋습니다.",
      availabilityHint: "매물 변동",
      lastCheckedAt: "검색 시점 기준",
      shippingHint: "해외 배송",
      trustSignal: "등급 표기 중고"
    },
    {
      name: "eBay Used Market",
      url: `https://www.ebay.com/sch/i.html?_nkw=${q}`,
      region: "해외",
      type: "used",
      priceHint: "글로벌 중고",
      note: "필름카메라와 단종 렌즈 매물이 많은 편입니다.",
      availabilityHint: "매물 변동",
      lastCheckedAt: "검색 시점 기준",
      shippingHint: "판매자별 상이",
      trustSignal: "희귀 매물 탐색"
    },
    {
      name: "B&H Photo Video",
      url: `https://www.bhphotovideo.com/c/search?q=${q}&sts=ma`,
      region: "해외",
      type: "new",
      priceHint: "해외 신품",
      note: "렌즈와 액세서리까지 한 번에 비교하기 쉽습니다.",
      availabilityHint: "재고 페이지 확인",
      lastCheckedAt: "검색 시점 기준",
      shippingHint: "해외 배송",
      trustSignal: "대형 리테일러"
    }
  ];
}
