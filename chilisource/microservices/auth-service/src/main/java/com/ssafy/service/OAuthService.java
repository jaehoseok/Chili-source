package com.ssafy.service;

import com.ssafy.config.Constant;
import com.ssafy.dto.response.TokenResponse;
import com.ssafy.social.google.GetSocialOAuthRes;

import java.io.IOException;

public interface OAuthService {

    public void request(Constant.SocialLoginType socialLoginType) throws IOException;

    public TokenResponse oAuthLogin(Constant.SocialLoginType socialLoginType, String code) throws IOException;
}
