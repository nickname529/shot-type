type AffiliateVendorKey = "bh" | "keh" | "mpb" | "naver" | "freestyle";

interface AffiliateVendorConfig {
  key: AffiliateVendorKey;
  vendorName: string;
  affiliateId: string;
  deepLinkTemplate: string;
  queryParam: string;
}

const vendorConfigs: AffiliateVendorConfig[] = [
  {
    key: "bh",
    vendorName: "B&H Photo",
    affiliateId: process.env.NEXT_PUBLIC_AFFILIATE_BH_ID ?? "",
    deepLinkTemplate: process.env.NEXT_PUBLIC_AFFILIATE_BH_TEMPLATE ?? "",
    queryParam: process.env.NEXT_PUBLIC_AFFILIATE_BH_QUERY_PARAM ?? ""
  },
  {
    key: "keh",
    vendorName: "KEH Camera",
    affiliateId: process.env.NEXT_PUBLIC_AFFILIATE_KEH_ID ?? "",
    deepLinkTemplate: process.env.NEXT_PUBLIC_AFFILIATE_KEH_TEMPLATE ?? "",
    queryParam: process.env.NEXT_PUBLIC_AFFILIATE_KEH_QUERY_PARAM ?? ""
  },
  {
    key: "mpb",
    vendorName: "MPB",
    affiliateId: process.env.NEXT_PUBLIC_AFFILIATE_MPB_ID ?? "",
    deepLinkTemplate: process.env.NEXT_PUBLIC_AFFILIATE_MPB_TEMPLATE ?? "",
    queryParam: process.env.NEXT_PUBLIC_AFFILIATE_MPB_QUERY_PARAM ?? ""
  },
  {
    key: "naver",
    vendorName: "Naver Shopping",
    affiliateId: process.env.NEXT_PUBLIC_AFFILIATE_NAVER_ID ?? "",
    deepLinkTemplate: process.env.NEXT_PUBLIC_AFFILIATE_NAVER_TEMPLATE ?? "",
    queryParam: process.env.NEXT_PUBLIC_AFFILIATE_NAVER_QUERY_PARAM ?? ""
  },
  {
    key: "freestyle",
    vendorName: "Freestyle Photo",
    affiliateId: process.env.NEXT_PUBLIC_AFFILIATE_FREESTYLE_ID ?? "",
    deepLinkTemplate: process.env.NEXT_PUBLIC_AFFILIATE_FREESTYLE_TEMPLATE ?? "",
    queryParam: process.env.NEXT_PUBLIC_AFFILIATE_FREESTYLE_QUERY_PARAM ?? ""
  }
];

function findVendor(vendorName: string) {
  return vendorConfigs.find((config) => config.vendorName.toLowerCase() === vendorName.toLowerCase());
}

function applyTemplate(template: string, url: string, query: string, affiliateId: string) {
  return template
    .replaceAll("{url}", encodeURIComponent(url))
    .replaceAll("{rawUrl}", url)
    .replaceAll("{query}", encodeURIComponent(query))
    .replaceAll("{id}", encodeURIComponent(affiliateId));
}

export function isAffiliateTrackingConfigured(vendorName: string) {
  const config = findVendor(vendorName);
  return Boolean(config?.affiliateId || config?.deepLinkTemplate);
}

export function applyAffiliateTracking(vendorName: string, url: string, query: string) {
  const config = findVendor(vendorName);
  if (!config) return url;

  if (config.deepLinkTemplate) {
    return applyTemplate(config.deepLinkTemplate, url, query, config.affiliateId);
  }

  if (config.affiliateId && config.queryParam) {
    const nextUrl = new URL(url);
    nextUrl.searchParams.set(config.queryParam, config.affiliateId);
    return nextUrl.toString();
  }

  return url;
}

export const affiliateSettlementPolicy = {
  storesBankAccountInApp: false,
  message:
    "계좌번호와 정산 정보는 ShotType 코드, localStorage, 환경변수에 저장하지 않습니다. 각 제휴 플랫폼의 보안 대시보드에서 직접 등록해야 합니다."
};
