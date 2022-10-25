package com.ssafy.controller;

import brave.Response;
import com.ssafy.config.Constant;
import com.ssafy.dto.request.UserCreateRequest;
import com.ssafy.service.OAuthService;
import com.ssafy.service.UserService;
import com.ssafy.social.google.GetSocialOAuthRes;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequiredArgsConstructor
public class UserController {
    private final OAuthService oAuthService;
    private final UserService userService;

    @PostMapping("/users/{socialLoginType}")
    public ResponseEntity<?> findUser(
            @PathVariable(name = "socialLoginType") String SocialLoginPath,
            @RequestBody UserCreateRequest request){
        Constant.SocialLoginType socialLoginType = Constant.SocialLoginType.valueOf(SocialLoginPath.toUpperCase());
        return ResponseEntity.ok(userService.findUser(socialLoginType, request));
    }
}
