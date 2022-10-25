package com.ssafy.controller;

import com.ssafy.config.Constant;
import com.ssafy.dto.request.UserCreateRequest;
import com.ssafy.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @PostMapping("/users/{socialLoginType}")
    public ResponseEntity<?> findUser(
            @PathVariable(name = "socialLoginType") String SocialLoginPath,
            @RequestBody UserCreateRequest request){
        Constant.SocialLoginType socialLoginType = Constant.SocialLoginType.valueOf(SocialLoginPath.toUpperCase());
        return ResponseEntity.ok(userService.findUser(socialLoginType, request));
    }
}
