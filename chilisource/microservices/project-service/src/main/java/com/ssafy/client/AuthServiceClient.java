package com.ssafy.client;

import com.ssafy.config.loginuser.User;
import com.ssafy.dto.response.TokenResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

@FeignClient(name = "auth-service", url = "http://localhost:8000/api/auth-service")
public interface AuthServiceClient {
    @GetMapping("/tokens")
    List<TokenResponse> getToken(User user);
}
