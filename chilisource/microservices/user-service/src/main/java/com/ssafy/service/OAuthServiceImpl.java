package com.ssafy.service;

import com.ssafy.config.Constant;
import com.ssafy.entity.User;
import com.ssafy.repository.UserRepo;
import com.ssafy.social.google.GetSocialOAuthRes;
import com.ssafy.social.google.GoogleOAuth;
import com.ssafy.social.google.GoogleOAuthToken;
import com.ssafy.social.google.GoogleUser;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class OAuthServiceImpl implements OAuthService {
    private final UserRepo userRepo;
    private final GoogleOAuth googleOauth;
    private final HttpServletResponse response;

    @Override
    public void request(Constant.SocialLoginType socialLoginType) throws IOException {
        String redirectURL;
        switch (socialLoginType){
            case GOOGLE:{
                redirectURL = googleOauth.getOauthRedirectURL();
            }break;
            default:{
                throw new IllegalArgumentException("알 수 없는 소셜 로그인 형식입니다.");
            }
        }
        response.sendRedirect(redirectURL);
    }

    @Transactional
    @Override
    public GetSocialOAuthRes oAuthLogin(Constant.SocialLoginType socialLoginType, String code) throws IOException{
        switch (socialLoginType){
            case GOOGLE:{
                //구글로 일회성 코드를 보내 액세스 토큰이 담긴 응답객체를 받아옴
                ResponseEntity<String> accessTokenResponse= googleOauth.requestAccessToken(code);
                //응답 객체가 JSON형식으로 되어 있으므로, 이를 deserialization해서 자바 객체에 담을 것이다.
                GoogleOAuthToken oAuthToken=googleOauth.getAccessToken(accessTokenResponse);
                //액세스 토큰을 다시 구글로 보내 구글에 저장된 사용자 정보가 담긴 응답 객체를 받아온다.
                ResponseEntity<String> userInfoResponse=googleOauth.requestUserInfo(oAuthToken);
                //다시 JSON 형식의 응답 객체를 자바 객체로 역직렬화한다.
                GoogleUser googleUser= googleOauth.getUserInfo(userInfoResponse);
                System.out.println(googleUser);
                Optional<User> user = userRepo.findByGoogle(googleUser.getEmail());
                if(!user.isPresent()){
                    User newUser = User.builder()
                            .name(googleUser.getName())
                            .socialLoginType(socialLoginType)
                            .email(googleUser.getEmail())
                            .image(googleUser.getPicture())
                            .build();
                    userRepo.save(newUser);
                }else{

                }
            }
            default:{
                throw new IllegalArgumentException("알 수 없는 소셜 로그인 형식입니다.");
            }
        }
    }
}
