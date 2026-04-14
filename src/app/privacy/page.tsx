import { LegalBlock, LegalPage } from "@/components/legal/legal-page";
import { legalNotices } from "@/lib/legal";

export default function PrivacyPage() {
  return (
    <LegalPage eyebrow="Privacy Policy" title="개인정보 처리방침">
      <LegalBlock title="수집하는 데이터">
        <p>ShotType은 서비스 동작에 필요한 최소 데이터만 사용합니다. 설문 답변, 사진 취향 점수, 찜 목록, 비교 목록은 기본적으로 사용자의 브라우저 localStorage에 저장됩니다.</p>
        <p className="mt-3">이메일은 추천 결과 저장, 계정 동기화, 뉴스레터 같은 기능을 사용자가 명시적으로 선택할 때만 수집하는 항목으로 설계합니다.</p>
      </LegalBlock>

      <LegalBlock title="위치 정보">
        <p>{legalNotices.locationPrivacy}</p>
        <p className="mt-3">현재 현상소 추천은 지역 선택값만 사용하며, GPS 좌표나 실시간 위치 권한을 요구하지 않습니다.</p>
      </LegalBlock>

      <LegalBlock title="쿠키와 로컬 저장소">
        <p>서비스는 로그인 없이도 추천 흐름이 이어지도록 localStorage를 사용합니다. 향후 결제, 분석, 로그인 기능을 추가하는 경우 별도 고지와 동의 UI를 제공합니다.</p>
      </LegalBlock>

      <LegalBlock title="외부 전송과 판매">
        <p>현재 MVP는 취향 데이터를 외부 서버로 전송하지 않습니다. 개인 식별 가능한 취향 데이터를 광고주나 판매처에 판매하지 않는 것을 기본 원칙으로 합니다.</p>
      </LegalBlock>

      <LegalBlock title="제휴 링크">
        <p>{legalNotices.affiliateLong}</p>
      </LegalBlock>
    </LegalPage>
  );
}
