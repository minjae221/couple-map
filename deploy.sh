#!/usr/bin/env bash
# 사용법: ./deploy.sh "바꾼 내용"  → 커밋 + 푸시 → GitHub Pages 자동 배포
set -e
cd "$(dirname "$0")"
git add -A
git commit -m "${1:-update}" || echo "(변경 없음)"
git push origin main
echo "✅ 푸시 완료 — 1~2분 후 사이트에 반영됩니다"
