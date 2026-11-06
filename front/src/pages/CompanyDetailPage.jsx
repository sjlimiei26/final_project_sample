import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { getCompany } from '../api/companyApi';
import { fetchDailyPrices } from '../api/priceApi';
import { Card, Input, Message, SubButton } from '../components/FormElements';
import PriceChart from '../components/PriceChart';
import PriceTable from '../components/PriceTable';
import { PageSpinner } from '../components/Spinner';
import { errorMessage, formatNumber } from '../utils/format';

const TopBar = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 16px;
`;

const BackLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primary};

  &::before {
    content: '‹';
    font-size: 18px;
    line-height: 1;
  }
`;

const SummaryCard = styled(Card).attrs({ as: 'section' })`
  margin-bottom: 20px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
`;

const TitleBox = styled.div`
  h2 {
    margin-bottom: 4px;
  }

  p {
    font-size: 14px;
    color: ${({ theme }) => theme.colors.muted};
  }
`;

const FilterBar = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 12px;
`;

const RangeBox = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  input {
    width: auto;
  }
`;

const Count = styled.span`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.muted};
`;

function CompanyDetailPage() {
  const { code } = useParams();
  const [company, setCompany] = useState(null);
  const [range, setRange] = useState({ from: '', to: '' });
  const [result, setResult] = useState({ key: null, prices: [], error: null });

  const requestKey = code && `${code}|${range.from}|${range.to}`;
  const loading = requestKey !== null && result.key !== requestKey;
  const prices = loading ? [] : result.prices;

  useEffect(() => {
    getCompany(code)
      .then((res) => setCompany(res.data.data))
      .catch(() => setCompany(null));
  }, [code]);

  useEffect(() => {
    if (!requestKey) return;
    let ignore = false;
    fetchDailyPrices(code, range)
      .then((data) => !ignore && setResult({ key: requestKey, prices: data, error: null }))
      .catch((err) => !ignore && setResult({ key: requestKey, prices: [], error: errorMessage(err, err.message) }));
    return () => {
      ignore = true;
    };
  }, [requestKey, code, range]);

  const handleRangeChange = (e) => {
    setRange((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <section>
      <TopBar>
        <BackLink to="/companies">종목 목록</BackLink>
        <div style={{ display: 'flex', gap: '8px' }}>
          <SubButton as={Link} to={`/posts?code=${code}`}>
            종목 토론
          </SubButton>
          <SubButton as={Link} to={`/predict?code=${code}`}>
            거래량 급증 예측
          </SubButton>
        </div>
      </TopBar>

      <SummaryCard>
        <TitleBox>
          <h2>
            {company ? `${company.name} (${company.code})` : code}
          </h2>
          {company && (
            <p>
              {company.market} · {company.sectorName} ({company.sectorCode}) · 시가총액 {formatNumber(company.marketCap)}원
            </p>
          )}
        </TitleBox>
      </SummaryCard>

      <FilterBar>
        <RangeBox>
          <Input type="date" name="from" value={range.from} onChange={handleRangeChange} />
          <span>~</span>
          <Input type="date" name="to" value={range.to} onChange={handleRangeChange} />
          <SubButton type="button" onClick={() => setRange({ from: '', to: '' })}>
            전체 기간
          </SubButton>
        </RangeBox>
        {!loading && <Count>{prices.length.toLocaleString()}건</Count>}
      </FilterBar>

      {result.error && <Message $error>{result.error}</Message>}
      {loading ? (
        <PageSpinner />
      ) : (
        <>
          <PriceChart prices={prices} />
          <PriceTable prices={prices} />
        </>
      )}
    </section>
  );
}

export default CompanyDetailPage;
