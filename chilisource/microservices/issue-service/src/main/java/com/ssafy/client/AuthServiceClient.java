package com.ssafy.client;

import com.ssafy.config.loginuser.User;
import com.ssafy.dto.response.TokenResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

@FeignClient(name = "auth-service", url = "https://k7b2071.p.ssafy.io:8000/auth-service")
public interface AuthServiceClient {
    // TODO 사용자 아이디로 1. 사용자 이메일 2. 사용자 토큰 3. 사용자 지라 고유 아이디를 받아온다
    // TODO response 수정됐는지 확인하기
    @GetMapping("/tokens")
    List<TokenResponse> getToken(User user);
}
