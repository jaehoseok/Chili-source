package com.ssafy.client;

import com.ssafy.dto.response.JiraMySelfResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.HttpHeaders;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;

@FeignClient(name = "jira-service", url = "https://ssafy.atlassian.net/rest/api/3")
public interface JiraClient {
    @GetMapping("/myself")
    JiraMySelfResponse findMySelf(
            @RequestHeader(HttpHeaders.AUTHORIZATION) String jiraBase64
    );
}
