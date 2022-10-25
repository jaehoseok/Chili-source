package com.ssafy.service;

import com.ssafy.config.Constant;
import com.ssafy.dto.request.UserCreateRequest;
import com.ssafy.dto.response.UserResponse;
import com.ssafy.entity.User;
import com.ssafy.repository.UserRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class UserServiceImpl implements UserService {
    private final UserRepo userRepo;

    @Transactional
    @Override
    public UserResponse findUser(Constant.SocialLoginType socialLoginType, UserCreateRequest request) {
        switch (socialLoginType){
            case GOOGLE:{
                User user = userRepo.findByGoogle(request.getEmail())
                        .orElseGet(()->{
                            User newUser = User.builder()
                                .name(request.getName())
                                .socialLoginType(socialLoginType)
                                .email(request.getEmail())
                                .image(request.getImage())
                                .build();
                            userRepo.save(newUser);
                            return newUser;
                        });
                return UserResponse.builder()
                        .id(user.getId())
                        .name(user.getName())
                        .image(user.getImage())
                        .build();
            }
            default:{
                throw new IllegalArgumentException("알 수 없는 소셜 유저 형식입니다.");
            }
        }
    }
}
