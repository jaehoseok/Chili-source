package com.ssafy.controller;

import brave.Response;
import com.ssafy.config.AwsS3Service;
import com.ssafy.config.Constant;
import com.ssafy.config.loginuser.LoginUser;
import com.ssafy.config.loginuser.User;
import com.ssafy.dto.request.UserCreateRequest;
import com.ssafy.dto.request.UserUpdateRequest;
import com.ssafy.service.UserService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequiredArgsConstructor
@Api(tags = "유저")
public class UserController {
    private static final String baseURL = "https://chilisource.s3.ap-northeast-2.amazonaws.com/";
    private final UserService userService;
    private final AwsS3Service awsS3Service;

    @PostMapping("/users/{socialLoginType}")
    @ApiOperation(value = "유저 생성")
    public ResponseEntity<?> getUser(
            @ApiParam(value = "소셜 로그인타입 - google(구현), naver(미구현), kakao(미구현)") @PathVariable(name = "socialLoginType") String SocialLoginPath,
            @RequestBody UserCreateRequest request) {
        Constant.SocialLoginType socialLoginType = Constant.SocialLoginType.valueOf(SocialLoginPath.toUpperCase());
        return ResponseEntity.ok(userService.getUser(socialLoginType, request));
    }

    @GetMapping("/users/info")
    @ApiOperation(value = "유저 정보 조회")
    public ResponseEntity<?> getUserInfo(
            @LoginUser User user
    ) {
        return ResponseEntity.ok(userService.getUserInfo(user.getId()));
    }

    @PutMapping("/users/name")
    @ApiOperation(value = "유저 정보 수정")
    public ResponseEntity<?> updateUserInfo(
            @LoginUser User user,
            @RequestBody UserUpdateRequest request
    ) {
        userService.updateUserInfo(request, user.getId());
        return ResponseEntity.ok().build();
    }

    @PutMapping("/users/image")
    @ApiOperation(value = "유저 이미지 수정")
    public ResponseEntity<?> updateUserImage(
            @LoginUser User user,
            @ApiParam(value = "유저 이미지") @RequestPart(value = "image") final MultipartFile file
    ) {
        String userImage = awsS3Service.uploadFile(file, "user/");
        userService.updateUserImage(baseURL + "user/" + userImage, user.getId());
        return ResponseEntity.ok().build();
    }

    @PutMapping("/users/withdraw")
    @ApiOperation(value = "유저 탈퇴(비활성화)")
    public ResponseEntity<?> withdraw(
            @LoginUser User user
    ) {
        userService.withdraw(user.getId());
        return ResponseEntity.ok().build();
    }

    @GetMapping("/users/list")
    @ApiOperation(value = "유저 리스트 조회")
    public ResponseEntity<?> getUserList(
            @ApiParam(value = "유저 pk 리스트") @RequestParam List<Long> userIds
    ) {
        return ResponseEntity.ok(userService.getUserList(userIds));
    }

    @GetMapping("/users/search")
    @ApiOperation(value = "유저 검색")
    public ResponseEntity<?> searchUser(
            @ApiParam(value = "유저 email") @RequestParam String email
    ) {
        return ResponseEntity.ok(userService.getUserList(email));
    }
}
