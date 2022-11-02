package com.ssafy.client;

import com.ssafy.dto.request.jira.JiraIssueFinalCreateRequest;
import com.ssafy.dto.response.JiraEpicListResponse;
import feign.Response;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;

@FeignClient(name = "jira", url = "https://ehoi-chili.atlassian.net/rest/api/3")
public interface JiraFeignClient {
    // TODO bulk 로 생성하는 api로 수정
    // TODO 개인 테스트 지라 프로젝트에서 수정하기
    // TODO 파라미터에 jira에서 원하는 형식으로 json 보내주기
    @PostMapping("/issue")
    Response addIssuesToJira(
            @RequestHeader("Authorization") String jiraToken,
            @RequestBody JiraIssueFinalCreateRequest request
    );

    // 해당 프로젝트에서 만든 에픽 리스트 조회
    @GetMapping("/search?jql=type = \"Epic\"  ORDER BY created DESC")
    JiraEpicListResponse getJiraEpics(
            @RequestHeader("Authorization") String jiraToken
    );
}
