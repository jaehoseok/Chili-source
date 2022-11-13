package com.ssafy.client;

import com.ssafy.dto.response.UserResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@FeignClient(name = "user-service", url = "https://k7b2071.p.ssafy.io/user-service")
public interface UserServiceClient {
    @GetMapping("/users/list")
    List<UserResponse> getUserList(
            @RequestParam("userIds") List<Long> userIds
    );
}
