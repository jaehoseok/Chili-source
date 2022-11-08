package com.ssafy.service;

import com.ssafy.client.UserServiceClient;
import com.ssafy.config.Constant;
import com.ssafy.config.JwtUtil;
import com.ssafy.dto.request.UserCreateRequest;
import com.ssafy.dto.response.ServiceTokenResponse;
import com.ssafy.dto.response.UserResponse;
import com.ssafy.entity.Auth;
import com.ssafy.repository.AuthRepo;
import com.ssafy.social.google.GoogleOAuth;
import com.ssafy.social.google.GoogleOAuthToken;
import com.ssafy.social.google.GoogleUser;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
@Slf4j
public class OAuthServiceImpl implements OAuthService {
    private final AuthRepo authRepo;
    private final GoogleOAuth googleOauth;
    private final HttpServletResponse response;
    private final UserServiceClient userServiceClient;
    private final JwtUtil jwtUtil;
    @Value("${token.refresh_token.expiration_time}")
    private Long REFRESH_EXPIRATION;

    @Override
    public void request(Constant.SocialLoginType socialLoginType) throws IOException {
        String redirectURL;
        switch (socialLoginType) {
            case GOOGLE: {
                redirectURL = googleOauth.getOauthRedirectURL();
            }
            break;
            default: {
                throw new IllegalArgumentException("알 수 없는 소셜 로그인 형식입니다.");
            }
        }
        response.sendRedirect(redirectURL);
    }

    @Transactional
    @Override
    public ServiceTokenResponse oAuthLogin(Constant.SocialLoginType socialLoginType, String code) throws IOException {
        switch (socialLoginType) {
            case GOOGLE: {
                //구글로 일회성 코드를 보내 액세스 토큰이 담긴 응답객체를 받아옴
                ResponseEntity<String> accessTokenResponse = googleOauth.requestAccessToken(code);
                //응답 객체가 JSON형식으로 되어 있으므로, 이를 deserialization해서 자바 객체에 담을 것이다.
                GoogleOAuthToken oAuthToken = googleOauth.getAccessToken(accessTokenResponse);
                //액세스 토큰을 다시 구글로 보내 구글에 저장된 사용자 정보가 담긴 응답 객체를 받아온다.
                ResponseEntity<String> userInfoResponse = googleOauth.requestUserInfo(oAuthToken);
                //다시 JSON 형식의 응답 객체를 자바 객체로 역직렬화한다.
                GoogleUser googleUser = googleOauth.getUserInfo(userInfoResponse);
                UserCreateRequest request = UserCreateRequest.builder()
                        .name(googleUser.getName())
                        .email(googleUser.getEmail())
                        .image(googleUser.getPicture())
                        .build();
                UserResponse user = userServiceClient.findUser(socialLoginType.name(), request);
                // TODO : HTTP ONLY로 accessToken 및 refreshToken 발급 및 REDIS에 저장
                String accessToken = jwtUtil.createAccessToken(user.getId());
                String refreshToken = jwtUtil.createRefreshToken(user.getId());
                Auth auth = Auth.builder()
                        .userId(user.getId())
                        .refreshToken(refreshToken)
                        .expiration(REFRESH_EXPIRATION)
                        .build();
                authRepo.save(auth);
                return ServiceTokenResponse.builder()
                        .accessToken(accessToken)
                        .refreshToken(refreshToken)
                        .build();
            }
            default: {
                throw new IllegalArgumentException("알 수 없는 소셜 로그인 형식입니다.");
            }
        }
    }
}
