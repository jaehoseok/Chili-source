package com.ssafy.client;

import com.ssafy.dto.request.UserCreateRequest;
import com.ssafy.dto.response.UserResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name = "user-service", url = "https://k7b2071.p.ssafy.io/user-service")
public interface UserServiceClient {
    @PostMapping("/users/{socialLoginType}")
    UserResponse findUser(
            @PathVariable(name = "socialLoginType") String SocialLoginPath,
            @RequestBody UserCreateRequest request);
}
