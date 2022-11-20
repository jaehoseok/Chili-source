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
    // 프로젝트 정보 조회
    @GetMapping("/project/{projectId}")
    ProjectResponse getProject(
            @RequestHeader(HttpHeaders.AUTHORIZATION) List<String> auths,
            @PathVariable("projectId") Long projectId
    );

    // 이슈 상태 변경에 따른 간트 차트 수정
    @PutMapping("/gantt/all")
    Response updateAllGanttChart(
            @RequestBody AllGanttChartUpdateRequest request
    );
}
