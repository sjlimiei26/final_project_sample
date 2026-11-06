// 백엔드 시세 API 호출 모듈
// 개발 중에는 vite.config.js 의 proxy 가 /api 를 http://localhost:8080 으로 넘긴다.
// 다른 주소의 서버를 쓰려면 front/.env 에 VITE_API_BASE_URL=http://host:port 를 지정한다.
const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? ''

async function request(path, params = {}) {
  const query = new URLSearchParams(
    Object.entries(params).filter(([, v]) => v !== undefined && v !== null && v !== ''),
  ).toString()
  const res = await fetch(`${BASE_URL}${path}${query ? `?${query}` : ''}`)
  if (!res.ok) {
    const body = await res.json().catch(() => null)
    throw new Error(body?.detail ?? body?.message ?? `요청 실패 (${res.status})`)
  }
  return res.json()
}

/** 종목별 최신 시세 목록 */
export function fetchLatestPrices() {
  return request('/api/prices')
}

/** 한 종목의 일별 시세. from / to 는 'YYYY-MM-DD' (생략 시 전체 기간) */
export function fetchDailyPrices(code, { from, to } = {}) {
  return request(`/api/prices/${encodeURIComponent(code)}`, { from, to })
}
