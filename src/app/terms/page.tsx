import { LegalBlock, LegalPage } from "@/components/legal/legal-page";

export default function TermsPage() {
  return (
    <LegalPage eyebrow="Terms of Service" title="서비스 이용약관">
      <LegalBlock title="서비스 목적">
        <p>ShotType은 사용자의 사진 취향, 예산, 사용 목적, 휴대성 선호, 렌즈 교환 선호를 바탕으로 카메라, 렌즈, 필름, 현상소 정보를 탐색할 수 있게 돕는 추천 서비스입니다.</p>
      </LegalBlock>

      <LegalBlock title="추천 결과의 성격">
        <p>추천 결과는 개인 의견과 데이터 기반 점수를 결합한 참고 정보입니다. 특정 제품의 성능, 가격, 재고, 품질, 중고 상태, 판매자 신뢰도를 보증하지 않습니다.</p>
      </LegalBlock>

      <LegalBlock title="사용자 책임">
        <p>구매 전 사용자는 판매처의 가격, 배송, 반품, 보증, 중고 상태, 호환성을 직접 확인해야 합니다. ShotType은 외부 판매처의 거래 결과에 책임을 지지 않습니다.</p>
      </LegalBlock>

      <LegalBlock title="금지 행위">
        <p>서비스 데이터의 무단 복제, 자동 수집, 추천 결과의 허위 표시, 브랜드나 사용자에 대한 비방, 제휴 링크 조작을 금지합니다.</p>
      </LegalBlock>

      <LegalBlock title="유료 기능">
        <p>프리미엄 구독은 고급 취향 분석, 상세 점수 breakdown, 렌즈 조합 강화, 추천 히스토리 저장 같은 추가 기능을 제공하기 위한 구조입니다. 실제 결제 기능을 연결할 때는 가격, 환불, 해지 정책을 별도 표시합니다.</p>
      </LegalBlock>
    </LegalPage>
  );
}
