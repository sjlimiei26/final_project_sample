// 화면 표시용 변환 함수

// 서버가 보내는 "2026-10-13T09:21:45" → "2026.10.13 09:21"
export const formatDateTime = (value) => {
  if (!value) return '';
  const [date, time = ''] = value.split('T');
  return `${date.replaceAll('-', '.')} ${time.slice(0, 5)}`;
};

// 1536 → "1.5 KB"
export const formatFileSize = (bytes) => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
};

// 실패 응답에서 사용자에게 보여 줄 메시지를 꺼낸다
export const errorMessage = (err, fallback = '요청에 실패했습니다.') => err.response?.data?.error?.message ?? fallback;

// 숫자 천 단위 콤마 포맷
export function formatNumber(n) {
  return n == null ? '-' : Number(n).toLocaleString('ko-KR');
}

// 상승 / 하락 / 보합에 따른 클래스명
export function changeClass(change) {
  if (change > 0) return 'up';
  if (change < 0) return 'down';
  return '';
}
