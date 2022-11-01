package com.ssafy.client;

import com.ssafy.dto.response.ProjectResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "project-service", url = "https://k7b2071.p.ssafy/project-service")
public interface ProjectServiceClient {
    @GetMapping("/{project_id}")
    ProjectResponse findProject(
            @PathVariable Long project_id);
}
