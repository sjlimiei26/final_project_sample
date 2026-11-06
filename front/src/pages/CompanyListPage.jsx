import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { getCompanies } from '../api/companyApi';
import { fetchLatestPrices } from '../api/priceApi';
import { Message, SubButton } from '../components/FormElements';
import { PageSpinner } from '../components/Spinner';
import { changeClass, errorMessage, formatNumber } from '../utils/format';

const TableWrap = styled.div`
  overflow-x: auto;
  background: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radiusLg};
  box-shadow: ${({ theme }) => theme.shadow};
`;

const Table = styled.table`
  width: 100%;
  min-width: 680px;
  border-collapse: collapse;

  th,
  td {
    padding: 14px 16px;
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
    text-align: left;
    white-space: nowrap;
    font-size: 15px;
  }

  th {
    padding-top: 12px;
    padding-bottom: 12px;
    font-size: 13px;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.muted};
    background: ${({ theme }) => theme.colors.background};
  }

  .num {
    text-align: right;
  }

  .code {
    font-family: ui-monospace, Consolas, monospace;
    font-size: 14px;
    color: ${({ theme }) => theme.colors.muted};
  }

  .name a {
    font-weight: 600;
  }

  .name a:hover {
    color: ${({ theme }) => theme.colors.primary};
  }

  .up {
    color: ${({ theme }) => theme.colors.up};
    font-weight: 600;
  }

  .down {
    color: ${({ theme }) => theme.colors.down};
    font-weight: 600;
  }

  tbody tr:last-child td {
    border-bottom: none;
  }

  tbody tr:hover td {
    background: #f8fafc;
  }
`;

const Actions = styled.div`
  display: flex;
  gap: 6px;
  justify-content: flex-end;
`;

function CompanyListPage() {
  const [companies, setCompanies] = useState([]);
  const [priceMap, setPriceMap] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    Promise.all([
      getCompanies(1, 100).then((res) => res.data.data),
      fetchLatestPrices().catch(() => []),
    ])
      .then(([companyList, latestPrices]) => {
        setCompanies(companyList);
        const map = {};
        latestPrices.forEach((p) => {
          map[p.code] = p;
        });
        setPriceMap(map);
      })
      .catch((err) => setError(errorMessage(err)))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <PageSpinner />;
  if (error) return <Message $error>불러오지 못했습니다: {error}</Message>;

  return (
    <section>
      <h2>종목 목록</h2>
      <TableWrap>
        <Table>
          <thead>
            <tr>
              <th>코드</th>
              <th>종목명</th>
              <th>업종</th>
              <th>시장</th>
              <th className="num">최근 종가</th>
              <th className="num">등락률</th>
              <th className="num">시가총액(원)</th>
              <th className="num">바로가기</th>
            </tr>
          </thead>
          <tbody>
            {companies.map((c) => {
              const p = priceMap[c.code];
              return (
                <tr key={c.code}>
                  <td className="code">{c.code}</td>
                  <td className="name">
                    <Link to={`/companies/${c.code}`}>{c.name}</Link>
                  </td>
                  <td>{c.sectorName}</td>
                  <td>{c.market}</td>
                  <td className="num">{p ? formatNumber(p.close) : '-'}</td>
                  <td className={`num ${p ? changeClass(p.change) : ''}`}>
                    {p ? `${p.changeRate > 0 ? '+' : ''}${p.changeRate}%` : '-'}
                  </td>
                  <td className="num">{formatNumber(c.marketCap)}</td>
                  <td className="num">
                    <Actions>
                      <SubButton as={Link} to={`/companies/${c.code}`}>
                        시세
                      </SubButton>
                      <SubButton as={Link} to={`/posts?code=${c.code}`}>
                        토론
                      </SubButton>
                      <SubButton as={Link} to={`/predict?code=${c.code}`}>
                        예측
                      </SubButton>
                    </Actions>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </TableWrap>
    </section>
  );
}

export default CompanyListPage;
