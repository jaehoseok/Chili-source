package com.ssafy.client;

import org.springframework.cloud.openfeign.FeignClient;

@FeignClient(name = "user-service", url = "https://k7b2071.p.ssafy.io/user-service")
public interface UserServiceClient {
}
