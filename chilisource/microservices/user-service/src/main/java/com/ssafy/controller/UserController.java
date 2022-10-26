package com.ssafy.controller;

import com.ssafy.config.AwsS3Service;
import com.ssafy.config.Constant;
import com.ssafy.config.loginuser.LoginUser;
import com.ssafy.config.loginuser.User;
import com.ssafy.dto.request.UserCreateRequest;
import com.ssafy.dto.request.UserUpdateRequest;
import com.ssafy.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class UserController {
    private static final String baseURL = "https://chilisource.s3.ap-northeast-2.amazonaws.com/";
    private final UserService userService;
    private final AwsS3Service awsS3Service;

    @PostMapping("/users/{socialLoginType}")
    public ResponseEntity<?> getUser(
            @PathVariable(name = "socialLoginType") String SocialLoginPath,
            @RequestBody UserCreateRequest request) {
        Constant.SocialLoginType socialLoginType = Constant.SocialLoginType.valueOf(SocialLoginPath.toUpperCase());
        return ResponseEntity.ok(userService.getUser(socialLoginType, request));
    }

    @PutMapping("/users/name")
    public ResponseEntity<?> updateUserInfo(
            @LoginUser User user,
            @RequestBody UserUpdateRequest request
    ) {
        userService.updateUserInfo(request, user.getId());
        return ResponseEntity.ok().build();
    }

    @PutMapping("/users/image")
    public ResponseEntity<?> updateUserImage(
            @LoginUser User user,
            @RequestPart(value = "image") final MultipartFile file
    ) {
        String userImage = awsS3Service.uploadFile(file, "user/");
        userService.updateUserImage(baseURL + "user/" + userImage, user.getId());
        return ResponseEntity.ok().build();
    }

    @GetMapping("/users/list")
    public ResponseEntity<?> getUserList(
            @RequestParam List<Long> userIds
    ) {
        userService.getUserList(userIds);
        return ResponseEntity.ok().build();
    }
}
