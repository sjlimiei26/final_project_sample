import styled from 'styled-components';
import { changeClass, formatNumber } from '../utils/format';

const List = styled.ul`
  max-height: 560px;
  overflow-y: auto;
  background: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radiusLg};
  box-shadow: ${({ theme }) => theme.shadow};

  li {
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  }

  li:last-child {
    border-bottom: none;
  }

  button {
    width: 100%;
    padding: 10px 14px;
    border: none;
    background: none;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    font-size: 14px;
    transition: background 0.15s;
  }

  button:hover {
    background: ${({ theme }) => theme.colors.background};
  }

  button.active {
    background: ${({ theme }) => theme.colors.primarySoft};
    font-weight: 700;
  }

  .code {
    font-family: ui-monospace, Consolas, monospace;
    color: ${({ theme }) => theme.colors.text};
  }

  .close {
    margin-left: auto;
  }

  .rate {
    min-width: 60px;
    text-align: right;
    font-weight: 600;
  }

  .up {
    color: ${({ theme }) => theme.colors.up};
  }

  .down {
    color: ${({ theme }) => theme.colors.down};
  }
`;

function StockList({ stocks, selectedCode, onSelect }) {
  return (
    <List>
      {stocks.map((s) => (
        <li key={s.code}>
          <button
            type="button"
            className={s.code === selectedCode ? 'active' : ''}
            onClick={() => onSelect(s.code)}
          >
            <span className="code">{s.code}</span>
            <span className="close">{formatNumber(s.close)}</span>
            <span className={`rate ${changeClass(s.change)}`}>
              {s.changeRate > 0 ? '+' : ''}
              {s.changeRate}%
            </span>
          </button>
        </li>
      ))}
    </List>
  );
}

export default StockList;
