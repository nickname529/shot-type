# ShotType

사진 취향, 예산, 사용 목적, 휴대성, 렌즈 교환 여부를 함께 분석해 카메라 바디와 렌즈 조합을 추천하는 Next.js MVP입니다.

## 구현 범위

- `/` 랜딩 페이지
- `/quiz` 설문 기반 취향 테스트
- `/taste-test` 랜덤 사진 순위 기반 취향 테스트
- `/film-taste-test` 필름 결과물 사진 순위 기반 필름 룩 테스트
- `/results` 점수 기반 추천 결과와 가격대별 추천
- `/cameras` 카메라 바디 필터, 정렬, URL 파라미터 유지
- `/lenses` 렌즈 필터, 정렬, 바디 호환성 필터
- `/film-cameras` 필름카메라 포맷, 조작 난이도, 렌즈 방식 탐색
- `/films` 필름스톡 추천과 구매 링크
- `/shops` 카메라, 렌즈, 필름 구매 링크 허브
- `/labs` 지역과 필름 기준 현상소 추천
- `/compare` 바디와 렌즈 비교
- `/favorites` 찜한 항목과 저장한 추천 결과

## 추천 점수 구조

추천 엔진은 `src/lib/recommendation/scoring.ts`에 분리되어 있습니다. 설문과 사진 랭킹 결과를 18개 스타일 축으로 변환한 뒤 디지털 카메라, 필름카메라, 필름스톡을 각각 계산합니다.

```ts
finalMatchScore =
  surveyProfileScore * 0.5 +
  imageTasteProfileScore * 0.4 +
  conditionFilterScore * 0.1;
```

- `Digital Camera Score`: 편의성, AF, 영상, 휴대성, 예산 조건을 반영
- `Film Camera Score`: filmLike, moody, grainy, 조작/유지 난이도를 더 강하게 반영
- `Film Stock Score`: 필름 룩 테스트가 있으면 그 점수를 우선 사용하고, 색감, 입자, 대비, ISO, 필름 타입을 반영
- `Lab Score`: 지역, 필름 종류, 120/흑백/고품질 스캔 태그를 반영

## 데이터

- 기본 카메라 바디: `src/lib/data/cameras.ts`
- 확장 카메라 바디: `src/lib/data/extended-cameras.ts`
- 기본 렌즈: `src/lib/data/lenses.ts`
- 확장 렌즈: `src/lib/data/extended-lenses.ts`
- 필름스톡: `src/lib/data/film-stocks.ts`
- 현상소: `src/lib/data/labs.ts`
- 스타일 레퍼런스: `src/lib/data/photo-references.ts`
- 사진 취향 테스트 이미지 메타데이터: `src/lib/data/taste-images.ts`
- 필름 룩 테스트 이미지 메타데이터: `src/lib/data/film-taste-images.ts`

초기 데이터는 mock TypeScript 상수입니다. 현재 카메라 80개 이상, 렌즈 120개 이상, 필름 30개 이상, 사진 취향 이미지 50개 이상을 생성합니다. DB로 옮길 때도 같은 필드 구조를 유지하면 추천 엔진을 거의 그대로 사용할 수 있습니다.

## 실행 방법

```bash
npm install
npm run dev
```

브라우저에서 `http://localhost:3000`을 열면 됩니다.

## 무료 공개 URL 만들기

파트너스 가입 심사용 URL이 먼저 필요하다면 Vercel로 배포하는 것이 가장 빠릅니다. 자세한 순서는 `DEPLOYMENT.md`에 정리했습니다.

배포 후에는 호스팅 설정에서 `NEXT_PUBLIC_SITE_URL=https://배포된주소`를 넣고 다시 배포하세요. 그러면 metadata, `robots.txt`, `sitemap.xml`이 실제 주소를 사용합니다.

프로덕션 빌드 확인:

```bash
npm run build
npm run start
```

## Monetization setup

ShotType keeps recommendations separate from monetization. Affiliate IDs, ad placements, and sponsored content do not feed into `finalMatchScore`.

1. Apply to each affiliate program directly.
2. Register your payout bank account only inside the affiliate platform dashboard.
3. Copy `.env.example` to `.env.local`.
4. Fill the approved `NEXT_PUBLIC_AFFILIATE_*` ID, template, or query param values.
5. Restart the dev server.

Never put bank account numbers, payout credentials, card numbers, or personal identity numbers in source code, `.env.local`, localStorage, or chat. The app only stores affiliate tracking IDs/templates needed to build outbound purchase links.

## 폴더 구조

```txt
src/
  app/
    quiz/
    taste-test/
    film-taste-test/
    results/
    cameras/
    lenses/
    compare/
    favorites/
    film-cameras/
    films/
    labs/
    shops/
  components/
    camera/
    common/
    layout/
    lens/
    film/
    lab/
    shop/
    quiz/
    results/
    taste-test/
  lib/
    data/
    recommendation/
  types/
```

## 다음 개선 아이디어

- 실제 가격 API와 중고 시세 크롤러 연결
- 카메라별 샘플 사진 업로드 및 EXIF 기반 추천
- 사용자의 결과 공유 URL에 압축된 취향 벡터 포함
- 카메라와 렌즈 조합 전체 가격, 무게, 용도 점수 합산
- 관리자용 데이터 편집 UI와 DB 마이그레이션
