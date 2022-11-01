package com.ssafy.client;

import feign.Response;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "project-service", url = "https://k7b207.p.ssafy.io/project-service")
public interface ProjectServiceClient {
    @GetMapping("/{id}")
    Response findProjectById(@PathVariable Long id);
}
