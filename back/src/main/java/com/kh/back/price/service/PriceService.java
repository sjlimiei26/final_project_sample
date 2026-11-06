package com.kh.back.price.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import com.kh.back.price.dto.PriceResponse;
import com.kh.back.price.mapper.DailyPriceMapper;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class PriceService {

    private final DailyPriceMapper mapper;

    /** 전 종목의 최신 시세 */
    public List<PriceResponse> getLatestPrices() {
        return mapper.findLatestOfEachCode().stream()
                .map(PriceResponse::from)
                .toList();
    }

    /** 한 종목의 기간별 일별 시세 (날짜 오름차순). from/to 를 생략하면 전체 기간 */
    public List<PriceResponse> getDailyPrices(String code, LocalDate from, LocalDate to) {
        // LocalDate.MIN/MAX 는 Oracle DATE 범위를 벗어나므로 넉넉한 실제 날짜로 대체
        LocalDate start = from != null ? from : LocalDate.of(1900, 1, 1);
        LocalDate end = to != null ? to : LocalDate.of(9999, 12, 31);
        if (start.isAfter(end)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "from 은 to 보다 이후일 수 없습니다.");
        }
        if (!mapper.existsByCode(code)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "존재하지 않는 종목입니다: " + code);
        }
        return mapper.findByCodeAndTradeDateBetweenOrderByTradeDateAsc(code, start, end).stream()
                .map(PriceResponse::from)
                .toList();
    }
}
