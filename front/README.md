# final project sample - front

React 19 + Vite + React Router + Styled Components + Zustand

## 실행 명령어

모든 명령어는 `front` 폴더에서 실행한다.

```bash
# 패키지 설치 (최초 1회)
npm install
```

```bash
# 개발 서버 실행 (http://localhost:5173)
npm run dev
```

```bash
# 프로덕션 빌드 (dist/ 생성)
npm run build
```

```bash
# 빌드 결과 미리보기
npm run preview
```

```bash
# 린트 / 포맷
npm run lint
npm run format
```

## 백엔드 연동

- 개발 서버는 `/api` 요청을 `http://localhost:8080` (Spring Boot) 으로 프록시한다. (`vite.config.js`)
- 따라서 `back` 서버를 먼저 실행해 두어야 한다.

## 주요 화면 구성

| 경로 | 컴포넌트 | 설명 |
| --- | --- | --- |
| `/` | `HomePage` | 백엔드 연결 확인 |
| `/companies` | `CompanyListPage` | 종목 목록 및 최신 시세 |
| `/companies/:code` | `CompanyDetailPage` | 종목 상세 및 일별 시세 차트 · 테이블 |
| `/posts`, `/posts/:postId`, `/posts/new` | `PostListPage`, `PostDetailPage`, `PostFormPage` | 종목 토론 게시판 · 첨부파일 · 댓글 |
| `/predict` | `PredictPage` | 다음 거래일 거래량 급증 예측 (FastAPI 연동) |
| `/login`, `/signup`, `/mypage` | `LoginPage`, `SignupPage`, `MyPage` | 회원가입 · 로그인 · 내 정보 |
