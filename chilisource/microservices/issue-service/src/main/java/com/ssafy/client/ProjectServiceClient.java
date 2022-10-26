package com.ssafy.client;

import feign.Response;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "project-service", url = "http://localhost:8000/api/project-service")
public interface ProjectServiceClient {
    @GetMapping("/{id}")
    Response findProjectById(@PathVariable Long id);
}
