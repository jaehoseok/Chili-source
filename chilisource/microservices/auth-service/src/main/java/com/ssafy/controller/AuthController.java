package com.ssafy.controller;

import com.ssafy.config.Constant;
import com.ssafy.dto.response.TokenResponse;
import com.ssafy.service.OAuthService;
import com.ssafy.service.AuthService;
import com.ssafy.social.google.GetSocialOAuthRes;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RestController
@RequiredArgsConstructor
public class AuthController {
    private final OAuthService oAuthService;
    private final AuthService authService;

    // GOOGLE - 구현
    // KAKAO - 미구현
    // NAVER - 미구현
    @GetMapping("/login/{socialLoginType}")
    public void socialLoginRedirect(@PathVariable(name = "socialLoginType") String SocialLoginPath) throws IOException{
        Constant.SocialLoginType socialLoginType = Constant.SocialLoginType.valueOf(SocialLoginPath.toUpperCase());
        System.out.println(socialLoginType);
        oAuthService.request(socialLoginType);
    }

    @GetMapping("/login/{socialLoginType}/callback")
    public ResponseEntity<?> callback(
            @PathVariable(name = "socialLoginType") String socialLoginPath,
            @RequestParam(name = "code") String code
    ) throws IOException{
        System.out.println(">>소셜 로그인 API 서버로부터 받은 CODE<< : " +code);
        Constant.SocialLoginType socialLoginType = Constant.SocialLoginType.valueOf(socialLoginPath.toUpperCase());
        TokenResponse tokenResponse = oAuthService.oAuthLogin(socialLoginType, code);
        return ResponseEntity.status(HttpStatus.OK)
                .header(HttpHeaders.AUTHORIZATION, tokenResponse.getAccessToken())
                .header("refreshToken", tokenResponse.getRefreshToken())
                .build();
    }
}
