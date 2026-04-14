import { LegalBlock, LegalPage } from "@/components/legal/legal-page";
import { legalNotices, placeholderImageCredit } from "@/lib/legal";

export default function DisclaimerPage() {
  return (
    <LegalPage eyebrow="Disclaimer" title="고지 및 책임 제한">
      <LegalBlock title="추천은 참고용입니다">
        <p>{legalNotices.recommendationDisclaimer}</p>
        <p className="mt-3">추천 문장은 특정 브랜드를 비방하거나 보증하기 위한 표현이 아니라, 사용자가 입력한 조건과 취향 벡터에 대한 설명입니다.</p>
      </LegalBlock>

      <LegalBlock title="제휴 마케팅 고지">
        <p>{legalNotices.affiliateLong}</p>
        <p className="mt-3">구매 버튼 근처에는 “제휴 링크 포함” 문구를 표시하고, 외부 링크에는 sponsored 관계를 명시합니다.</p>
        <p className="mt-3">{legalNotices.bankAccountSafety}</p>
      </LegalBlock>

      <LegalBlock title="광고와 스폰서 콘텐츠">
        <p>{legalNotices.sponsoredSeparation}</p>
        <p className="mt-3">광고, 스폰서 콘텐츠, 제휴 링크는 추천 엔진의 finalMatchScore 계산에 사용하지 않습니다.</p>
      </LegalBlock>

      <LegalBlock title="이미지 저작권">
        <p>현재 MVP의 취향 테스트 이미지는 실제 상용 사진 라이브러리가 아니라 placeholder 이미지 구조를 사용합니다.</p>
        <dl className="mt-3 grid gap-2">
          <div><dt className="font-semibold text-ink">source</dt><dd>{placeholderImageCredit.source}</dd></div>
          <div><dt className="font-semibold text-ink">author</dt><dd>{placeholderImageCredit.author}</dd></div>
          <div><dt className="font-semibold text-ink">license</dt><dd>{placeholderImageCredit.license}</dd></div>
        </dl>
        <p className="mt-3">상용 출시 전에는 자체 촬영, 라이선스 구매, 명확한 출처 표기가 가능한 무료 라이선스 이미지로 교체해야 합니다.</p>
      </LegalBlock>

      <LegalBlock title="법률 자문 아님">
        <p>이 페이지는 서비스 운영을 위한 일반적인 고지 초안입니다. 실제 법적 효력과 관할권별 요구사항은 변호사 또는 전문 자문을 통해 검토해야 합니다.</p>
      </LegalBlock>
    </LegalPage>
  );
}
