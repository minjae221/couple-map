# 백엔드(Supabase) 연결 — 5분 절차

목적: 한 명이 추가하면 상대 폰에도 자동으로 뜨게 (지도 핀·버킷·사진 공유).
연결 전에도 앱은 정상 동작 (각자 폰에만 저장 + 백업파일 공유 방식).

## 절차 (1회)

1. https://supabase.com → 가입 (이메일, 무료 / 카드 불필요)
2. "New project" → 이름 `couple-map`, 리전 Northeast Asia (Seoul), DB 비밀번호 아무거나(보관)
3. 왼쪽 **SQL Editor** → `backend/schema.sql` 내용 전체 붙여넣기 → **Run**
4. 왼쪽 **Project Settings > API** 에서 두 값 복사:
   - Project URL  (https://xxxx.supabase.co)
   - anon public key
5. `index.html` 상단의 `const SYNC = { url: "", key: "" }` 에 두 값 입력
   (또는 Claude에게 값을 주면 대신 넣고 배포)

끝. 앱을 새로고침하면 자동 동기화 시작 (60초 주기 + 저장할 때마다).

## 주의
- anon key = 우리 데이터의 열쇠. 둘 외에 공유 금지.
- 무료 한도: DB 500MB + Storage 1GB — 사진 수천 장 수준까지 여유.
