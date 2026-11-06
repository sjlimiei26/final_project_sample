-- 기본 테이블 생성 (종목 · 회원 · 리프레시 토큰)

-- 종목
CREATE TABLE company (
    code        VARCHAR2(10)  NOT NULL PRIMARY KEY,  -- 종목코드 (예: G0001)
    name        VARCHAR2(100) NOT NULL,              -- 종목명
    sectorCode  VARCHAR2(10),                        -- 업종 코드
    sectorName  VARCHAR2(50),                        -- 업종명
    market      VARCHAR2(20),                        -- 시장 구분
    marketCap   NUMBER(20)                           -- 시가총액 (원)
);

MERGE INTO company dst
USING (
    SELECT 'G0001' AS code, '가온전자'     AS name, 'S02' AS sectorCode, '전기전자' AS sectorName, 'GX-MAIN'   AS market, 770259456000  AS marketCap FROM dual UNION ALL
    SELECT 'G0002' AS code, '단비자산운용' AS name, 'S01' AS sectorCode, '금융'     AS sectorName, 'GX-MAIN'   AS market, 1285743666000 AS marketCap FROM dual UNION ALL
    SELECT 'G0003' AS code, '보람금융지주' AS name, 'S01' AS sectorCode, '금융'     AS sectorName, 'GX-GROWTH' AS market, 114030611000  AS marketCap FROM dual UNION ALL
    SELECT 'G0004' AS code, '푸른소프트'   AS name, 'S08' AS sectorCode, 'IT서비스' AS sectorName, 'GX-MAIN'   AS market, 3450287724000 AS marketCap FROM dual UNION ALL
    SELECT 'G0005' AS code, '샛별소프트'   AS name, 'S08' AS sectorCode, 'IT서비스' AS sectorName, 'GX-MAIN'   AS market, 757112240000  AS marketCap FROM dual
) src
ON (dst.code = src.code)
WHEN NOT MATCHED THEN
    INSERT (code, name, sectorCode, sectorName, market, marketCap)
    VALUES (src.code, src.name, src.sectorCode, src.sectorName, src.market, src.marketCap);

COMMIT;

-- 회원
CREATE TABLE member (
    member_id   NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    login_id    VARCHAR2(30)  NOT NULL UNIQUE,                     -- 로그인 아이디
    password    VARCHAR2(100) NOT NULL,                            -- BCrypt 로 암호화한 값 (60자)
    nickname    VARCHAR2(30)  NOT NULL,
    created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- refresh token (로그인할 때마다 1행, 로그아웃하면 삭제)
CREATE TABLE refresh_token (
    token_id    NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    member_id   NUMBER        NOT NULL,
    token       VARCHAR2(100) NOT NULL UNIQUE,                     -- 쿠키로 보낸 값과 같은 문자열
    expires_at  TIMESTAMP     NOT NULL,                            -- 이 시각이 지나면 사용 불가
    created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    CONSTRAINT fk_refresh_token_member FOREIGN KEY (member_id) REFERENCES member (member_id) ON DELETE CASCADE
);

