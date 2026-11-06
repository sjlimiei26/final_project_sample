package com.kh.back.price.entity;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

/**
 * 일별 시세 (back/sql/price.sql 의 daily_price 테이블)
 * 데이터는 ml/scripts/load_prices.py 가 적재하므로 백엔드에서는 조회만 한다.
 * 컬럼 매핑은 DailyPriceMapper.xml 의 resultMap 에서 한다.
 */
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class DailyPrice {

    private Long id;
    private String code;
    private LocalDate tradeDate;
    private Long open;
    private Long high;
    private Long low;
    private Long close;
    private Long volume;
    private Long change;
    private BigDecimal changeRate;
    private LocalDateTime updatedAt;
}
