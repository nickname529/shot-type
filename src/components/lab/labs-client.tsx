"use client";

import { useMemo, useState } from "react";
import { SelectField } from "@/components/common/select-field";
import { ScoreBar } from "@/components/common/score-bar";
import { Tag } from "@/components/common/tag";
import { filmStocks } from "@/lib/data";
import { getLabRecommendations } from "@/lib/recommendation/scoring";

const scanQualityLabels = {
  standard: "표준 스캔",
  high: "고품질 스캔",
  pro: "작업용 스캔"
};

function scanQuality(lab: ReturnType<typeof getLabRecommendations>[number]["lab"]) {
  if (lab.scanQuality) return lab.scanQuality;
  if (lab.tags.includes("premium_scan") && lab.priceLevel === "high") return "pro";
  if (lab.tags.includes("premium_scan")) return "high";
  return "standard";
}

function turnaround(lab: ReturnType<typeof getLabRecommendations>[number]["lab"]) {
  if (lab.turnaround) return lab.turnaround;
  if (lab.tags.includes("fast")) return "당일~2일";
  if (lab.tags.includes("mail_in")) return "3~5일";
  return "2~4일";
}

function reviewSummary(lab: ReturnType<typeof getLabRecommendations>[number]["lab"]) {
  if (lab.reviewSummary) return lab.reviewSummary;
  if (lab.tags.includes("premium_scan")) return "색 보정과 스캔 톤을 중요하게 보는 사용자에게 평이 좋은 타입입니다.";
  if (lab.tags.includes("budget")) return "자주 찍는 사용자에게 비용 부담이 낮은 실용형 선택입니다.";
  return "컬러 네거티브를 안정적으로 맡기기 좋은 균형형 현상소입니다.";
}

function mailInLabel(lab: ReturnType<typeof getLabRecommendations>[number]["lab"]) {
  return (lab.mailIn ?? lab.tags.includes("mail_in")) ? "우편 접수" : "방문 접수";
}

export function LabsClient() {
  const [region, setRegion] = useState("서울");
  const [filmId, setFilmId] = useState(filmStocks[0]?.id ?? "");
  const [priceLevel, setPriceLevel] = useState("any");
  const film = filmStocks.find((item) => item.id === filmId);

  const recommendations = useMemo(() => getLabRecommendations({ region, film, priceLevel }).slice(0, 8), [film, priceLevel, region]);

  return (
    <div className="grid gap-6">
      <div className="grid gap-4 rounded-lg border border-line bg-white p-5 shadow-soft sm:grid-cols-3">
        <SelectField label="지역" value={region} onChange={(event) => setRegion(event.target.value)}>
          {["서울", "경기", "부산", "대구", "광주", "대전", "제주", "전국"].map((item) => (
            <option key={item} value={item}>{item}</option>
          ))}
        </SelectField>
        <SelectField label="맡길 필름" value={filmId} onChange={(event) => setFilmId(event.target.value)}>
          {filmStocks.map((item) => (
            <option key={item.id} value={item.id}>{item.brand} {item.model}</option>
          ))}
        </SelectField>
        <SelectField label="가격대" value={priceLevel} onChange={(event) => setPriceLevel(event.target.value)}>
          <option value="any">상관없음</option>
          <option value="low">가성비</option>
          <option value="medium">보통</option>
          <option value="high">고품질 스캔</option>
        </SelectField>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {recommendations.map(({ lab, score, reason }) => (
          <article key={lab.id} className="rounded-lg border border-line bg-white p-5 shadow-soft">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase text-accent">{lab.region}</p>
                <h3 className="mt-1 text-xl font-semibold text-ink">{lab.name}</h3>
                <p className="mt-1 text-sm text-muted">{lab.location}</p>
              </div>
              <a href={lab.mapLink} target="_blank" rel="noreferrer" className="rounded-lg bg-ink px-3 py-2 text-sm font-semibold text-white hover:bg-accent">
                지도 보기
              </a>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {lab.services.map((service) => <Tag key={service}>{service}</Tag>)}
              <Tag>{scanQualityLabels[scanQuality(lab)]}</Tag>
              <Tag>{turnaround(lab)}</Tag>
              <Tag>{mailInLabel(lab)}</Tag>
            </div>
            <p className="mt-4 text-sm leading-6 text-muted">{reason}</p>
            <p className="mt-2 text-sm leading-6 text-muted">{reviewSummary(lab)}</p>
            <div className="mt-4">
              <ScoreBar label="현상소 적합도" value={score} />
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
