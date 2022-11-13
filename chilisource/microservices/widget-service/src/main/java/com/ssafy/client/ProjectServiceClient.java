package com.ssafy.client;

import com.ssafy.dto.response.ProjectResponse;
import com.ssafy.dto.response.UserProjectResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "project-service", url = "https://k7b2071.p.ssafy.io/project-service")
public interface ProjectServiceClient {
    @GetMapping("/project/{projectId}")
    ProjectResponse findProject(
            @PathVariable(value = "projectId") Long project_id);

    @GetMapping("/team/{projectId}/{userId}")
    UserProjectResponse findRole(
            @PathVariable(value = "projectId") Long projectId,
            @PathVariable(value = "userId") Long userId
    );
}
