package com.ssafy.service;

import com.ssafy.config.Constant;
import com.ssafy.dto.request.UserCreateRequest;
import com.ssafy.dto.response.UserResponse;

public interface UserService {
    //로그인
    public UserResponse findUser(Constant.SocialLoginType socialLoginType, UserCreateRequest request);
}
