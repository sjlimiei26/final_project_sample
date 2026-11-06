-- 종목 토론 게시판 테이블 (init.sql 을 실행한 뒤 실행)

-- 게시글 — 하나의 종목에 속한다
CREATE TABLE post (
    post_id       NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_code  VARCHAR2(10)  NOT NULL,                          -- 어느 종목의 글인가
    member_id     NUMBER        NOT NULL,                          -- 작성자
    title         VARCHAR2(100) NOT NULL,
    content       CLOB          NOT NULL,
    created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,    -- 수정할 때 SQL 에서 CURRENT_TIMESTAMP 로 바꾼다
    CONSTRAINT fk_post_company FOREIGN KEY (company_code) REFERENCES company (code),
    CONSTRAINT fk_post_member  FOREIGN KEY (member_id) REFERENCES member (member_id) ON DELETE CASCADE
);

-- 첨부 파일 — 글 하나에 여러 개. 파일 자체는 서버 폴더에, 여기에는 정보만 저장한다
CREATE TABLE post_file (
    file_id        NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    post_id        NUMBER        NOT NULL,
    original_name  VARCHAR2(255) NOT NULL,                         -- 사용자가 올린 파일 이름 (다운로드할 때 이 이름으로)
    stored_name    VARCHAR2(100) NOT NULL UNIQUE,                  -- 서버에 저장한 이름 (UUID + 확장자)
    content_type   VARCHAR2(100) NOT NULL,                         -- image/png, application/pdf ...
    file_size      NUMBER(20)    NOT NULL,                         -- 바이트
    created_at     TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    CONSTRAINT fk_post_file_post FOREIGN KEY (post_id) REFERENCES post (post_id) ON DELETE CASCADE
);

-- 댓글 (Oracle 에서 COMMENT 는 예약어이므로 comments 테이블로 생성)
CREATE TABLE comments (
    comment_id  NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    post_id     NUMBER         NOT NULL,
    member_id   NUMBER         NOT NULL,
    content     VARCHAR2(1000) NOT NULL,
    created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    CONSTRAINT fk_comments_post   FOREIGN KEY (post_id) REFERENCES post (post_id) ON DELETE CASCADE,
    CONSTRAINT fk_comments_member FOREIGN KEY (member_id) REFERENCES member (member_id) ON DELETE CASCADE
);

