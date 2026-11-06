# final project sample - ml

Python 기반 시세 데이터 적재 스크립트(Oracle DB) 및 거래량 급증 예측 서버(FastAPI)

## 사전 준비

```bash
# 1. 가상환경 생성 및 활성화 (Windows)
python -m venv .venv
.venv\Scripts\activate

# 2. 의존성 설치
pip install -r requirements.txt

# 3. DB 접속 정보 설정 (시세 적재용)
copy .env.example .env
# .env 의 DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASSWORD 를 채운다
```

## 실행 명령어

모든 명령어는 `ml` 폴더에서 실행한다.

### 1) 일별 시세 데이터 적재 (`prices.csv` -> Oracle `daily_price`)
```bash
# back/sql/price.sql 로 테이블을 먼저 생성한 뒤 실행
.venv\Scripts\python scripts\load_prices.py
```

### 2) 거래량 급증 예측 모델 학습 (`models/surge_bundle.pkl` 생성)
```bash
.venv\Scripts\python train_surge.py
```

### 3) 예측 API 서버 실행 (FastAPI, `http://localhost:8000`)
```bash
.venv\Scripts\uvicorn app.main:app --port 8000
```

- Swagger 문서: `http://localhost:8000/docs`
- 상태 확인: `GET /health`
- 거래량 급증 예측: `POST /predict/surge`

