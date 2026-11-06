# final project sample - back

Spring Boot 4 + MyBatis + Oracle (Java 17)

## 사전 준비

1. Oracle DB 테이블 생성 (`back/sql/` 순서대로 실행)
   - `back/sql/init.sql` : `company`, `member`, `refresh_token` 테이블 및 기본 종목 데이터 생성
   - `back/sql/board.sql` : `post`, `post_file`, `comments` 테이블 생성
   - `back/sql/price.sql` : `daily_price` 테이블 생성
2. `ml/scripts/load_prices.py` 로 시세 데이터 적재 (`daily_price`)
3. DB 접속 정보 설정

```bash
cp .env.example .env
# .env 의 DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASSWORD 를 채운다
```

## 의존성 설치 (Maven)
```bash
# Maven 설치 확인
mvn -v
```

```bash
# 의존성 다운로드 + 빌드 후 로컬 저장소(~/.m2)에 설치
./mvnw install -DskipTests
```

## 실행 명령어

모든 명령어는 `back` 폴더에서 실행한다. (Windows 에서는 `./mvnw` 대신 `mvnw.cmd`)

```bash
# 개발 서버 실행 (http://localhost:8080)
./mvnw spring-boot:run
```

```bash
# 컴파일
./mvnw compile
```

```bash
# 테스트
./mvnw test
```

```bash
# 빌드 (target/*.jar 생성)
./mvnw clean package
```

```bash
# 빌드한 jar 실행
java -jar target/back-0.0.1-SNAPSHOT.jar
```

## 주요 API

| 구분 | Method | URL | 설명 |
| --- | --- | --- | --- |
| 인증 | POST | `/api/v1/auth/signup` | 회원가입 |
| 인증 | POST | `/api/v1/auth/login` | 로그인 (Access Token + Refresh Token 쿠키) |
| 인증 | POST | `/api/v1/auth/refresh` | 토큰 재발급 |
| 인증 | POST | `/api/v1/auth/logout` | 로그아웃 |
| 회원 | GET | `/api/v1/members/me` | 내 정보 조회 |
| 종목 | GET | `/api/v1/companies` | 종목 목록 페이징 조회 |
| 종목 | GET | `/api/v1/companies/{code}` | 종목 단건 조회 |
| 예측 | GET | `/api/v1/companies/{code}/prediction` | 다음 거래일 거래량 급증 예측 (FastAPI 연동) |
| 시세 | GET | `/api/prices` | 종목별 최신 시세 |
| 시세 | GET | `/api/prices/{code}?from=&to=` | 한 종목의 기간별 일별 시세 |
| 게시판 | GET / POST | `/api/v1/posts` | 게시글 목록 조회 / 작성 (첨부파일 포함) |
| 게시판 | GET / PUT / DELETE | `/api/v1/posts/{postId}` | 게시글 상세 / 수정 / 삭제 |
| 게시판 | GET | `/api/v1/posts/{postId}/files/{fileId}` | 첨부파일 조회 · 다운로드 |
| 댓글 | GET / POST | `/api/v1/posts/{postId}/comments` | 댓글 목록 조회 / 작성 |
| 댓글 | DELETE | `/api/v1/posts/{postId}/comments/{commentId}` | 댓글 삭제 |
