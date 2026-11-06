# Final Project Sample

주식 종목·시세 조회, 종목 토론 게시판, 머신러닝 기반 거래량 급증 예측을 통합한 풀스택 샘플 프로젝트입니다.

---

## 전체 구성 및 역할

- **[`back/`](./back)** : Spring Boot + MyBatis + Oracle 기반 백엔드 API 서버 ([`back/README.md`](./back/README.md))
- **[`front/`](./front)** : React + Vite 기반 프론트엔드 웹 클라이언트 ([`front/README.md`](./front/README.md))
- **[`ml/`](./ml)** : Python 시세 적재 스크립트 및 FastAPI 예측 서버 ([`ml/README.md`](./ml/README.md))

> 각 파트별 사전 준비 및 상세 실행 명령어는 **폴더별 `README.md`** 를 참고하세요.

---

## 폴더 구조

```text
final_project_sample/
├── back/                         # Spring Boot 백엔드 서버 (port: 8080)
│   ├── sql/                      # Oracle DDL 스크립트
│   │   ├── init.sql              # 종목(company), 회원(member), 리프레시 토큰(refresh_token)
│   │   ├── board.sql             # 게시글(post), 첨부파일(post_file), 댓글(comments)
│   │   └── price.sql             # 일별 시세(daily_price)
│   ├── src/main/
│   │   ├── java/com/kh/back/
│   │   │   ├── auth/             # 회원가입 · 로그인 · JWT 재발급 · 로그아웃
│   │   │   ├── member/           # 내 정보 조회
│   │   │   ├── company/          # 종목 목록 · 상세 조회
│   │   │   ├── price/            # 일별 시세 조회 및 예측용 최근 시세 조회
│   │   │   ├── post/             # 종목 토론 게시글 · 첨부파일 업로드/다운로드
│   │   │   ├── comment/          # 댓글 작성 · 목록 · 삭제
│   │   │   ├── prediction/       # FastAPI 예측 서버 연동 (MlClient)
│   │   │   ├── common/           # 공통 응답(ApiResponse), 예외 처리, JWT/Security, 파일 저장소
│   │   │   └── config/           # CORS 등 웹 설정
│   │   └── resources/
│   │       ├── mappers/          # MyBatis Mapper XML
│   │       └── application.yaml  # 서버 설정 (.env 연동)
│   ├── .env.example              # DB 접속 정보 템플릿
│   ├── pom.xml                   # Maven 설정
│   └── README.md                 # 백엔드 실행 가이드
│
├── front/                        # React 프론트엔드 (port: 5173)
│   ├── src/
│   │   ├── api/                  # Axios 클라이언트(토큰 자동 갱신) 및 도메인별 API 모듈
│   │   ├── components/           # 공통 레이아웃, 인증 가드, 시세 차트/테이블, 폼 요소
│   │   ├── pages/                # 화면 컴포넌트 (홈, 종목/시세, 토론, 예측, 로그인/가입/마이페이지)
│   │   ├── stores/               # Zustand 인증 상태 관리 (useAuthStore)
│   │   ├── styles/               # 전역 스타일(GlobalStyle) 및 테마(theme)
│   │   └── utils/                # 날짜 · 숫자 · 파일 크기 · 에러 메시지 포맷 유틸
│   ├── vite.config.js            # Vite 설정 (/api 프록시)
│   ├── package.json              # NPM 패키지 설정
│   └── README.md                 # 프론트엔드 실행 가이드
│
└── ml/                           # Python 데이터 적재 및 FastAPI 예측 서버 (port: 8000)
    ├── app/
    │   ├── main.py               # FastAPI 엔드포인트 (/health, /predict/surge)
    │   ├── features.py           # 학습 · 서빙 공통 피처 계산 로직
    │   └── schemas.py            # 요청 · 응답 Pydantic 스키마
    ├── data/
    │   └── prices.csv            # 일별 시세 원본 데이터 (90,000행)
    ├── models/
    │   ├── surge_bundle.pkl      # 학습된 RandomForest 파이프라인 + 피처/메타 번들
    │   └── meta.json             # 모델 학습 정보 및 성능 지표
    ├── scripts/
    │   └── load_prices.py        # prices.csv -> Oracle daily_price 테이블 적재 스크립트
    ├── train_surge.py            # 거래량 급증 예측 모델 학습 스크립트
    ├── .env.example              # DB 접속 정보 템플릿
    ├── requirements.txt          # Python 의존성 목록
    └── README.md                 # ML 적재 · 학습 · 서버 실행 가이드
```

---

## 권장 실행 순서 요약

1. **DB 준비 및 시세 적재**: `back/sql/*.sql` 실행 후 `ml` 폴더에서 `load_prices.py` 실행
2. **예측 서버 실행 (`ml`)**: [ml/README.md](./ml/README.md)를 참고하여 FastAPI 서버(`:8000`) 실행
3. **백엔드 서버 실행 (`back`)**: [back/README.md](./back/README.md)를 참고하여 Spring Boot 서버(`:8080`) 실행
4. **프론트엔드 실행 (`front`)**: [front/README.md](./front/README.md)를 참고하여 Vite 개발 서버(`:5173`) 실행
