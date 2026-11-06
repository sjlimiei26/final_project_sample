package com.kh.back.price.controller;

import java.time.LocalDate;
import java.util.List;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.kh.back.price.dto.PriceResponse;
import com.kh.back.price.service.PriceService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/prices")
@RequiredArgsConstructor
public class PriceController {

    private final PriceService priceService;

    /** GET /api/prices : 종목별 최신 시세 목록 */
    @GetMapping
    public List<PriceResponse> latest() {
        return priceService.getLatestPrices();
    }

    /** GET /api/prices/{code}?from=2025-01-01&to=2025-12-31 : 한 종목의 일별 시세 */
    @GetMapping("/{code}")
    public List<PriceResponse> daily(
            @PathVariable String code,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate from,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate to) {
        return priceService.getDailyPrices(code, from, to);
    }
}
