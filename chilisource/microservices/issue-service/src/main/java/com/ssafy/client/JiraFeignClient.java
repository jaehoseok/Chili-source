package com.ssafy.client;

import com.ssafy.dto.request.jira.bulk.JiraIssueBulkCreateRequest;
import com.ssafy.dto.response.jira.epic.JiraEpicListResponse;
import com.ssafy.dto.response.jira.project.JiraProjectResponse;
import com.ssafy.dto.response.jira.sprint.JiraProjectBoardListResponse;
import com.ssafy.dto.response.jira.sprint.JiraSprintListResponse;
import com.ssafy.dto.response.jira.issue.JiraSearchIssueListResponse;
import com.ssafy.dto.response.jira.issue.JiraIssueListResponse;
import com.ssafy.dto.response.jira.issue.JiraIssueResponse;
import feign.Response;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.HttpHeaders;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

// TODO 개인 테스트 지라 프로젝트에서 수정하기
@FeignClient(name = "jira", url = "https://ssafy.atlassian.net/rest")
public interface JiraFeignClient {
    // 지라에 이슈 추가
    @PostMapping("/api/3/issue/bulk")
    Response addIssuesToJira(
            @RequestHeader(HttpHeaders.AUTHORIZATION) String jiraToken,
            @RequestBody JiraIssueBulkCreateRequest request
    );

    // 해당 프로젝트에서 만든 에픽 리스트 조회
    @GetMapping("/api/3/search?jql=type = \"Epic\"  ORDER BY created DESC")
    JiraEpicListResponse getJiraEpics(
            @RequestHeader(HttpHeaders.AUTHORIZATION) String jiraToken
    );

    // 해당 프로젝트에서 done이 아닌 나의 이슈 조회
    @GetMapping("/api/3/search?jql={query}")
    JiraIssueListResponse getTodoIssues(
            @RequestHeader(HttpHeaders.AUTHORIZATION) String jiraToken,
            @PathVariable("query") String query
    );

    // 프로젝트 리스트 조회
    @GetMapping("/api/3/project/recent")
    List<JiraProjectResponse> getProjectList(
            @RequestHeader(HttpHeaders.AUTHORIZATION) String jiraToken
    );

    // 프로젝트의 보드 조회
    @GetMapping("/agile/1.0/board")
    JiraProjectBoardListResponse getProjectBoard(
            @RequestHeader(HttpHeaders.AUTHORIZATION) String jiraToken
    );

    // 프로젝트의 스프린트 조회
    @GetMapping("/agile/1.0/board/{boardId}/sprint")
    JiraSprintListResponse getSprints(
            @RequestHeader(HttpHeaders.AUTHORIZATION) String jiraToken,
            @PathVariable(name = "boardId") Long boardId
    );

    // 개별 이슈 조회
    @GetMapping("/api/3/issue/{issueKey}")
    JiraIssueResponse getIssue(
            @RequestHeader(HttpHeaders.AUTHORIZATION) String jiraToken,
            @PathVariable(name = "issueKey") String issueKey
    );

    // JQL 검색 결과
    @GetMapping("/api/3/search?jql={query}")
    JiraSearchIssueListResponse getSearchIssues(
            @RequestHeader(HttpHeaders.AUTHORIZATION) String jiraToken,
            @PathVariable("query") String query
    );

    // 이슈 수정
    @PutMapping("/api/3/issue/{issueKey}")
    Response updateIssue(
            @RequestHeader(HttpHeaders.AUTHORIZATION) String jiraToken,
            @PathVariable("issueKey") String issueKey,
            @RequestBody Map<String, Object> request
    );

    // 이슈 상태 수정
    @PostMapping("/api/3/issue/{issueKey}/transitions")
    Response updateIssueStatus(
            @RequestHeader(HttpHeaders.AUTHORIZATION) String jiraToken,
            @PathVariable("issueKey") String issueKey,
            @RequestBody Map<String, Object> request
            );
}
