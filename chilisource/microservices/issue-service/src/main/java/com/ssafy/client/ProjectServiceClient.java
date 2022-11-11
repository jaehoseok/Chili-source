package com.ssafy.client;

import com.ssafy.dto.request.AllGanttChartUpdateRequest;
import com.ssafy.dto.response.ProjectResponse;
import feign.Response;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.HttpHeaders;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@FeignClient(name = "project-service", url = "https://k7b2071.p.ssafy.io/project-service")
public interface ProjectServiceClient {
    @GetMapping("/project/{projectId}")
    ProjectResponse getProject(
            @RequestHeader(HttpHeaders.AUTHORIZATION) List<String> auths,
            @PathVariable("projectId") Long projectId
    );

    @PutMapping("/gantt/all")
    Response updateAllGanttChart(
            @RequestBody AllGanttChartUpdateRequest request
    );
}
