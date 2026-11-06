import styled from 'styled-components';
import { formatNumber } from '../utils/format';

const WIDTH = 720;
const HEIGHT = 240;
const PAD = 8;

const Figure = styled.figure`
  margin-bottom: 20px;
  padding: 20px;
  background: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radiusLg};
  box-shadow: ${({ theme }) => theme.shadow};

  svg {
    width: 100%;
    height: 220px;
    display: block;
  }

  figcaption {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
    font-size: 13px;
    color: ${({ theme }) => theme.colors.muted};
  }
`;

/** 종가 라인 차트 (외부 라이브러리 없이 SVG 로 그림) */
function PriceChart({ prices }) {
  if (prices.length < 2) return null;

  const closes = prices.map((p) => p.close);
  const min = Math.min(...closes);
  const max = Math.max(...closes);
  const range = max - min || 1;

  const points = closes
    .map((c, i) => {
      const x = PAD + (i / (closes.length - 1)) * (WIDTH - PAD * 2);
      const y = PAD + (1 - (c - min) / range) * (HEIGHT - PAD * 2);
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(' ');

  return (
    <Figure>
      <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} preserveAspectRatio="none" role="img" aria-label="종가 추이">
        <polyline points={points} fill="none" stroke="#2563eb" strokeWidth="1.8" />
      </svg>
      <figcaption>
        <span>{prices[0].date}</span>
        <span>
          최저 {formatNumber(min)} · 최고 {formatNumber(max)}
        </span>
        <span>{prices[prices.length - 1].date}</span>
      </figcaption>
    </Figure>
  );
}

export default PriceChart;
