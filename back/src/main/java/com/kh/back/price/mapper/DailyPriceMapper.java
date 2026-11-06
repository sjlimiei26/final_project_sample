package com.kh.back.price.mapper;

import java.time.LocalDate;
import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.kh.back.price.entity.DailyPrice;

@Mapper
public interface DailyPriceMapper {

    /** 종목별 가장 최근 거래일 1행씩 (종목 목록 화면용) */
    List<DailyPrice> findLatestOfEachCode();

    List<DailyPrice> findByCodeAndTradeDateBetweenOrderByTradeDateAsc(
            @Param("code") String code, @Param("from") LocalDate from, @Param("to") LocalDate to);

    boolean existsByCode(@Param("code") String code);
}
