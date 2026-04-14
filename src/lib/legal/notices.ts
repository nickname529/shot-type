import type { ImageCredit } from "@/types";

export const legalNotices = {
  affiliateShort: "제휴 링크 포함: 이 링크를 통해 구매하면 ShotType이 수수료를 받을 수 있습니다.",
  affiliateLong:
    "ShotType은 일부 구매 링크에 제휴 코드를 포함할 수 있습니다. 제휴 수수료는 추천 점수와 순위에 영향을 주지 않으며, 추천 결과는 취향 점수와 조건 적합도만으로 계산됩니다.",
  recommendationDisclaimer:
    "추천은 사용자가 입력한 취향과 공개 스펙, 내부 mock 데이터를 바탕으로 한 참고용 의견입니다. 실제 구매 전 가격, 재고, 보증, 중고 상태를 판매처에서 직접 확인해 주세요.",
  sponsoredSeparation:
    "스폰서 콘텐츠와 광고는 추천 알고리즘과 분리되어 표시되며, 유료 노출인 경우 반드시 광고 또는 스폰서 라벨을 붙입니다.",
  locationPrivacy:
    "현상소 추천은 사용자가 선택한 지역만 사용합니다. 브라우저 위치 권한을 요청하지 않으며 위치 데이터를 서버에 저장하지 않습니다.",
  privacyMinimum:
    "취향 데이터는 기본적으로 기기 안의 localStorage에 저장됩니다. 이메일은 저장/공유 기능을 확장할 때 선택적으로만 받을 수 있습니다.",
  bankAccountSafety:
    "계좌번호와 정산 정보는 앱 코드, localStorage, 환경변수에 저장하지 않습니다. 제휴 수익 정산 계좌는 각 제휴 플랫폼의 보안 대시보드에서 직접 등록해야 합니다."
};

export const placeholderImageCredit: ImageCredit = {
  source: "Lorem Picsum placeholder image service",
  author: "Various source photographers",
  license: "Placeholder imagery for MVP prototyping. Replace with licensed or owned images before commercial launch.",
  sourceUrl: "https://picsum.photos"
};

export const legalPageUpdatedAt = "2026-04-14";
