-- 일별 시세 테이블
-- 테이블을 생성한 후 ml/scripts/load_prices.py 로 파일 데이터를 적재
CREATE TABLE daily_price (
    id      NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    code    VARCHAR2(20)    NOT NULL,
    "date"  DATE            NOT NULL,
    open    NUMBER(20),
    high    NUMBER(20),
    low     NUMBER(20),
    close   NUMBER(20),
    volume  NUMBER(20),
    "change" NUMBER(20),
    "changeRate"  NUMBER(6, 2),
    -- 수집 시간이나 출처 등 따로 필요한 정보는 자유롭게 추가
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uk_code_date UNIQUE (code, "date")
)