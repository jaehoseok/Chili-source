package com.ssafy.service;

import com.ssafy.config.Constant;
import com.ssafy.dto.response.ServiceTokenResponse;

import java.io.IOException;

public interface OAuthService {

    public void request(Constant.SocialLoginType socialLoginType) throws IOException;

    public ServiceTokenResponse oAuthLogin(Constant.SocialLoginType socialLoginType, String code) throws IOException;
}
