package com.ssafy.service;

import com.ssafy.config.Constant;
import com.ssafy.dto.request.UserCreateRequest;
import com.ssafy.dto.request.UserUpdateRequest;
import com.ssafy.dto.response.UserListResponse;
import com.ssafy.dto.response.UserResponse;

import java.util.List;

public interface UserService {
    //회원가입
    public UserResponse getUser(Constant.SocialLoginType socialLoginType, UserCreateRequest request);

    //유저정보조회
    public UserResponse getUserInfo(Long userId);

    //유저 검색
    public UserListResponse getUserList(String email);

    //유저정보수정(이름)
    public void updateUserInfo(UserUpdateRequest request, Long userId);

    // 유저정보수정(사진)
    public void updateUserImage(String image, Long userId);

    // 회원탈퇴 (비활성화)
    public void withdraw(Long userId);

    // 유저리스트 조회
    public List<UserResponse> getUserList(List<Long> userIds);
}
