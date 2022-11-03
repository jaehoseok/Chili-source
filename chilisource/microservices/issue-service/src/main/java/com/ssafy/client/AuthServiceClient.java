package com.ssafy.client;

import com.ssafy.dto.response.TokenResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.HttpHeaders;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;

import java.util.List;

@FeignClient(name = "auth-service", url = "https://k7b2071.p.ssafy.io/auth-service")
public interface AuthServiceClient {
    // TODO 사용자 아이디로 1. 사용자 이메일 2. 사용자 토큰 3. 사용자 지라 고유 아이디를 받아온다
    // TODO response 수정됐는지 확인하기
    @GetMapping("/tokens/{tokenCodeId}")
    TokenResponse getToken(
            @RequestHeader(HttpHeaders.AUTHORIZATION) List<String> auths,
            @PathVariable(name = "tokenCodeId") String tokenCodeId
    );
}
