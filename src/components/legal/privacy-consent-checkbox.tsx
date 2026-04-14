import Link from "next/link";

export function PrivacyConsentCheckbox() {
  return (
    <label className="flex items-start gap-2 rounded-lg border border-white/15 p-3 text-xs leading-5 text-white/75">
      <input type="checkbox" className="mt-1 h-4 w-4 rounded border-white/30" />
      <span>
        이메일 저장이나 유료 기능 알림을 신청할 때 개인정보 처리방침에 동의합니다.{" "}
        <Link href="/privacy" className="font-semibold text-white underline">
          방침 보기
        </Link>
      </span>
    </label>
  );
}
