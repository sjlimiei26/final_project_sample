import styled from 'styled-components';
import { changeClass, formatNumber } from '../utils/format';

const TableWrap = styled.div`
  overflow-x: auto;
  max-height: 480px;
  overflow-y: auto;
  background: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radiusLg};
  box-shadow: ${({ theme }) => theme.shadow};
`;

const Table = styled.table`
  width: 100%;
  min-width: 640px;
  border-collapse: collapse;

  th,
  td {
    padding: 12px 14px;
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
    text-align: right;
    white-space: nowrap;
    font-size: 14px;
  }

  th:first-child,
  td:first-child {
    text-align: left;
  }

  th {
    position: sticky;
    top: 0;
    font-size: 13px;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.muted};
    background: ${({ theme }) => theme.colors.background};
  }

  tbody tr:last-child td {
    border-bottom: none;
  }

  .up {
    color: ${({ theme }) => theme.colors.up};
    font-weight: 600;
  }

  .down {
    color: ${({ theme }) => theme.colors.down};
    font-weight: 600;
  }
`;

/** 일별 시세 표 (최근 날짜가 위로 오도록 뒤집어서 표시) */
function PriceTable({ prices }) {
  const rows = [...prices].reverse();

  return (
    <TableWrap>
      <Table>
        <thead>
          <tr>
            <th>날짜</th>
            <th>시가</th>
            <th>고가</th>
            <th>저가</th>
            <th>종가</th>
            <th>대비</th>
            <th>등락률</th>
            <th>거래량</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((p) => (
            <tr key={p.date}>
              <td>{p.date}</td>
              <td>{formatNumber(p.open)}</td>
              <td>{formatNumber(p.high)}</td>
              <td>{formatNumber(p.low)}</td>
              <td>{formatNumber(p.close)}</td>
              <td className={changeClass(p.change)}>{formatNumber(p.change)}</td>
              <td className={changeClass(p.change)}>{p.changeRate}%</td>
              <td>{formatNumber(p.volume)}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </TableWrap>
  );
}

export default PriceTable;
