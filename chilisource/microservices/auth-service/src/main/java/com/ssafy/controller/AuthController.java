package com.ssafy.controller;

import com.ssafy.config.Constant;
import com.ssafy.config.loginuser.LoginUser;
import com.ssafy.config.loginuser.User;
import com.ssafy.dto.request.TokenCodeCreateRequest;
import com.ssafy.dto.request.TokenCodeUpdateRequest;
import com.ssafy.dto.request.TokenCreateRequest;
import com.ssafy.dto.response.ServiceTokenResponse;
import com.ssafy.repository.TokenRepo;
import com.ssafy.service.OAuthService;
import com.ssafy.service.AuthService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
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
@Api(tags = "인증")
public class AuthController {
    private final OAuthService oAuthService;
    private final AuthService authService;
    @Value("${token.refresh_token.expiration_time}")
    private Long REFRESH_EXPIRATION;

    // GOOGLE - 구현
    // KAKAO - 미구현
    // NAVER - 미구현
    @GetMapping("/login/{socialLoginType}")
    @ApiOperation(value = "소셜 로그인 - google(구현), naver(미구현), kakao(미구현)")
    public void socialLoginRedirect(
            @ApiParam(value = "소셜 로그인 타입 pk") @PathVariable(name = "socialLoginType") String SocialLoginPath
    ) throws IOException {
        Constant.SocialLoginType socialLoginType = Constant.SocialLoginType.valueOf(SocialLoginPath.toUpperCase());
        oAuthService.request(socialLoginType);
    }

    @GetMapping("/login/{socialLoginType}/callback")
    @ApiOperation(value = "로그인 토큰 발급")
    public ResponseEntity<?> callback(
            @ApiParam(value = "소셜 로그인 타입") @PathVariable(name = "socialLoginType") String socialLoginPath,
            @ApiParam(value = "해당 소셜 로그인시 받은 코드") @RequestParam(name = "code") String code,
            HttpServletResponse response
    ) throws IOException {
        Constant.SocialLoginType socialLoginType = Constant.SocialLoginType.valueOf(socialLoginPath.toUpperCase());
        ServiceTokenResponse tokenResponse = oAuthService.oAuthLogin(socialLoginType, code);
        Cookie cookie = new Cookie("refresh-token", tokenResponse.getRefreshToken());
        cookie.setMaxAge(REFRESH_EXPIRATION.intValue());
        cookie.setHttpOnly(true);
        cookie.setSecure(true);
        cookie.setDomain("");
        cookie.setPath("/");
        response.addCookie(cookie);
        return ResponseEntity.status(HttpStatus.OK)
                .header(HttpHeaders.AUTHORIZATION, tokenResponse.getAccessToken()).build();
    }

    @GetMapping("/refresh")
    @ApiOperation(value = "액세스 토큰 재발급")
    public ResponseEntity<?> refresh(
            @CookieValue("refresh-token") String refreshToken,
            @LoginUser User user
    ) {
        try {
            return ResponseEntity.ok(authService.refresh(refreshToken, user.getId()));
        } catch (RuntimeException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("로그인 만료");
        }
    }

    @GetMapping("/token-codes")
    @ApiOperation(value = "토큰 코드 리스트 조회")
    public ResponseEntity<?> getTokenCodeList() {
        return ResponseEntity.ok(authService.getTokenCodeList());
    }

    @PostMapping("/token-codes")
    @ApiOperation(value = "토큰 코드 생성")
    public ResponseEntity<?> createTokenCode(
            @RequestBody TokenCodeCreateRequest request
    ) {
        authService.createTokenCode(request);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/token-codes/{tokenCodeId}")
    @ApiOperation(value = "토큰 코드 수정")
    public ResponseEntity<?> updateTokenCode(
            @ApiParam(value = "토큰 코드 pk") @PathVariable(name = "tokenCodeId") String tokenCodeId,
            @RequestBody TokenCodeUpdateRequest request
    ) {
        authService.updateTokenCode(tokenCodeId.toUpperCase(), request);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/token-codes/{tokenCodeId}")
    @ApiOperation(value = "토큰 코드 삭제")
    public ResponseEntity<?> deleteTokenCode(
            @ApiParam(value = "토큰 코드 pk") @PathVariable(name = "tokenCodeId") String tokenCodeId
    ) {
        authService.deleteTokenCode(tokenCodeId.toUpperCase());
        return ResponseEntity.ok().build();
    }

    @GetMapping("/tokens")
    @ApiOperation(value = "연동한 토큰 리스트 조회")
    public ResponseEntity<?> getTokenList(
            @LoginUser User user
    ) {
        return ResponseEntity.ok(authService.getTokenList(user.getId()));
    }

    @GetMapping("/tokens/{tokenCodeId}")
    @ApiOperation(value = "연동한 특정 토큰 조회")
    public ResponseEntity<?> getToken(
            @LoginUser User user,
            @ApiParam(value = "토큰 코드 pk") @PathVariable(name = "tokenCodeId") String tokenCodeId
    ) {
        return ResponseEntity.ok(authService.getToken(tokenCodeId.toUpperCase(), user.getId()));
    }

    @PostMapping("/tokens")
    @ApiOperation(value = "토큰 연동")
    public ResponseEntity<?> createToken(
            @LoginUser User user,
            @RequestBody TokenCreateRequest request
    ) {
        authService.createToken(request, user.getId());
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/tokens/{tokenCodeId}")
    @ApiOperation(value = "토큰 연동 해제")
    public ResponseEntity<?> deleteToken(
            @LoginUser User user,
            @ApiParam(value = "토큰 코드 pk") @PathVariable(name = "tokenCodeId") String tokenCodeId
    ) {
        authService.deleteToken(tokenCodeId.toUpperCase(), user.getId());
        return ResponseEntity.ok().build();
    }

}
