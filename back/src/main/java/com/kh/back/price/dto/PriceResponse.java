package com.kh.back.price.dto;

import java.math.BigDecimal;
import java.time.LocalDate;

import com.kh.back.price.entity.DailyPrice;

import lombok.AllArgsConstructor;
import lombok.Getter;

/** 프론트로 내려주는 시세 1행. 필드명은 prices.csv 컬럼명과 맞춘다. */
@Getter
@AllArgsConstructor
public class PriceResponse {

    private final String code;
    private final LocalDate date;
    private final Long open;
    private final Long high;
    private final Long low;
    private final Long close;
    private final Long volume;
    private final Long change;
    private final BigDecimal changeRate;

    public static PriceResponse from(DailyPrice p) {
        return new PriceResponse(
                p.getCode(), p.getTradeDate(),
                p.getOpen(), p.getHigh(), p.getLow(), p.getClose(),
                p.getVolume(), p.getChange(), p.getChangeRate());
    }
}
