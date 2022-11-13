package com.ssafy.client;

import com.ssafy.dto.response.TokenResponse;
import org.apache.http.HttpHeaders;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;

@FeignClient(name = "auth-service", url = "https://k7b2071.p.ssafy.io/auth-service")
public interface AuthServiceClient {
    @GetMapping("/tokens/{tokenCodeId}")
    TokenResponse findToken(
            @RequestHeader(HttpHeaders.AUTHORIZATION) String accessToken,
            @PathVariable(value = "tokenCodeId") String tokenCodeId);
}
