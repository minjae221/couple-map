# 앱 개발 도구 카탈로그 (GitHub 선별)

이 프로젝트/후속 앱에서 쓰는 오픈소스와 적용 절차. 새 도구 추가 시 여기에 기록.

## 적용 순서 규칙
1. 필요해질 때 추가 (미리 설치 X)
2. CDN 한 줄로 시작 → 규모 커지면 번들러(vite) 도입
3. 추가 후 이 파일에 "언제·왜·어떻게" 기록

## 카탈로그

### Dexie.js — github.com/dexie/Dexie.js
- 용도: IndexedDB 래퍼. 사진 등 대용량 브라우저 저장 (localStorage 5MB → 수 GB)
- 상태: ✅ 적용됨 (2026-09-02) — 사진=IndexedDB, 썸네일=localStorage, 백업에 photoStore 포함
- 사용: `<script src="https://unpkg.com/dexie/dist/dexie.min.js"></script>` →
  `const ddb = new Dexie("cm"); ddb.version(1).stores({photos:"id"});`
  places.photos에는 사진 id만 두고 실제 dataURL은 ddb.photos에 저장

### PhotoSwipe — github.com/dimsemenov/PhotoSwipe
- 용도: 모바일 스와이프 사진 갤러리 (핀치줌·넘기기)
- 도입 시점: 추억 상세에서 사진 여러 장 감상 UX 올릴 때
- 사용: CDN + `new PhotoSwipeLightbox({...})`, dataURL 배열 그대로 지원

### Leaflet.markercluster — github.com/Leaflet/Leaflet.markercluster
- 용도: 핀 많아지면 자동 뭉치기
- 상태: ✅ 적용됨 (하트 클러스터)
- 사용: CDN 후 `L.markerClusterGroup()`에 마커 add

### canvas-confetti — github.com/catdad/canvas-confetti
- 용도: 버킷 완료 폭죽
- 상태: ✅ 적용됨 (버킷 완료 시)

### supabase-js — github.com/supabase/supabase-js
- 용도: 무료 Postgres+Storage. 커플 실시간 공유(v2)
- 도입 시점: "백업 파일 주고받기" 대신 자동 동기화 원할 때
- 절차: supabase.com 가입(무료) → 프로젝트 생성 → URL+anon key를 index.html에
  → places/bucket 테이블 + storage 버킷 → localStorage와 병행(오프라인 캐시)

### 규모 커질 때
- vite (빌드) · workbox (PWA 자동화) · shadcn/ui+tailwind (React 전환 시)

## 배포 절차 (자동화됨)
- 수정 후: `./deploy.sh "메시지"` → GitHub Pages 반영 (호스팅 연결 후)
