package com.ssafy.controller;

import com.ssafy.config.Constant;
import com.ssafy.config.loginuser.LoginUser;
import com.ssafy.config.loginuser.User;
import com.ssafy.dto.request.TokenCodeCreateRequest;
import com.ssafy.dto.request.TokenCodeUpdateRequest;
import com.ssafy.dto.request.TokenCreateRequest;
import com.ssafy.dto.response.ServiceTokenResponse;
import com.ssafy.service.OAuthService;
import com.ssafy.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.Path;
import java.io.IOException;

@RestController
@RequiredArgsConstructor
public class AuthController {
    private final OAuthService oAuthService;
    private final AuthService authService;
    @Value("${token.refresh_token.expiration_time}")
    private Long REFRESH_EXPIRATION;

    // GOOGLE - 구현
    // KAKAO - 미구현
    // NAVER - 미구현
    @GetMapping("/login/{socialLoginType}")
    public void socialLoginRedirect(@PathVariable(name = "socialLoginType") String SocialLoginPath) throws IOException {
        Constant.SocialLoginType socialLoginType = Constant.SocialLoginType.valueOf(SocialLoginPath.toUpperCase());
        System.out.println(socialLoginType);
        oAuthService.request(socialLoginType);
    }

    @GetMapping("/login/{socialLoginType}/callback")
    public ResponseEntity<?> callback(
            @PathVariable(name = "socialLoginType") String socialLoginPath,
            @RequestParam(name = "code") String code,
            HttpServletResponse response
    ) throws IOException {
        Constant.SocialLoginType socialLoginType = Constant.SocialLoginType.valueOf(socialLoginPath.toUpperCase());
        ServiceTokenResponse tokenResponse = oAuthService.oAuthLogin(socialLoginType, code);
        // TODO : TOKEN 처리 어떻게 할 것인가 -> 쿠키? 세션? 로컬? 액세스는? 리프레쉬는?
        Cookie cookie = new Cookie("refresh-token", tokenResponse.getRefreshToken());
        cookie.setMaxAge(REFRESH_EXPIRATION.intValue());
        cookie.setHttpOnly(true);
        cookie.setSecure(true);
        cookie.setDomain("");
        cookie.setPath("/api");
        response.addCookie(cookie);
        return ResponseEntity.status(HttpStatus.OK)
                .header(HttpHeaders.AUTHORIZATION, tokenResponse.getAccessToken())
                .body(tokenResponse.getAccessToken());
    }

    @GetMapping("/refresh")
    public ResponseEntity<?> refresh(
            @CookieValue(value = "refresh-token", required = false) Cookie cookie,
            @LoginUser User user,
            HttpServletResponse response
    ) {
        try {
            return ResponseEntity.ok(authService.refresh(cookie.getValue(), user.getId()));
        } catch (RuntimeException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("로그인 만료");
        }
    }

    @GetMapping("/token-codes")
    public ResponseEntity<?> getTokenCodeList() {
        return ResponseEntity.ok(authService.getTokenCodeList());
    }

    @PostMapping("/token-codes")
    public ResponseEntity<?> createTokenCode(
            @RequestBody TokenCodeCreateRequest request
    ) {
        authService.createTokenCode(request);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/token-codes/{tokenCodeId}")
    public ResponseEntity<?> updateTokenCode(
            @PathVariable(name = "tokenCodeId") Long tokenCodeId,
            @RequestBody TokenCodeUpdateRequest request
    ) {
        authService.updateTokenCode(tokenCodeId, request);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/token-codes/{tokenCodeId}")
    public ResponseEntity<?> deleteTokenCode(
            @PathVariable(name = "tokenCodeId") Long tokenCodeId
    ) {
        authService.deleteTokenCode(tokenCodeId);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/tokens")
    public ResponseEntity<?> getToken(
            @LoginUser User user
    ) {
        return ResponseEntity.ok(authService.getToken(user.getId()));
    }

    @PostMapping("/tokens")
    public ResponseEntity<?> createToken(
            @LoginUser User user,
            @RequestBody TokenCreateRequest request
    ) {
        authService.createToken(request, user.getId());
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/tokens/{tokenCodeId}")
    public ResponseEntity<?> deleteToken(
            @LoginUser User user,
            @PathVariable(name = "tokenCodeId") Long tokenCodeId
    ) {
        authService.deleteToken(tokenCodeId, user.getId());
        return ResponseEntity.ok().build();
    }

}