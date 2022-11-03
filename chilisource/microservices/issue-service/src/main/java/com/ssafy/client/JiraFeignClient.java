package com.ssafy.client;

import com.ssafy.dto.request.jira.JiraIssueBulkCreateRequest;
import com.ssafy.dto.response.JiraEpicListResponse;
import com.ssafy.dto.response.jira.JiraTodoIssueListResponse;
import feign.Response;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.HttpHeaders;
import org.springframework.web.bind.annotation.*;

// TODO 개인 테스트 지라 프로젝트에서 수정하기
@FeignClient(name = "jira", url = "https://ssafy.atlassian.net/rest/api/3")
public interface JiraFeignClient {
    // 지라에 이슈 추가
    @PostMapping("/issue/bulk")
    Response addIssuesToJira(
            @RequestHeader(HttpHeaders.AUTHORIZATION) String jiraToken,
            @RequestBody JiraIssueBulkCreateRequest request
    );

    // 해당 프로젝트에서 만든 에픽 리스트 조회
    @GetMapping("/search?jql=type = \"Epic\"  ORDER BY created DESC")
    JiraEpicListResponse getJiraEpics(
            @RequestHeader(HttpHeaders.AUTHORIZATION) String jiraToken
    );

    // 해당 프로젝트에서 done이 아닌 나의 이슈 조회
    @GetMapping("/search?jql=project = \"{projectKey}\" AND assignee = currentUser() AND status IN (\"To Do\",\"In Progress\") ORDER BY created DESC)")
    JiraTodoIssueListResponse getTodoIssues(
            @RequestHeader(HttpHeaders.AUTHORIZATION) String jiraToken,
            @PathVariable("projectKey") String projectKey
    );
}
