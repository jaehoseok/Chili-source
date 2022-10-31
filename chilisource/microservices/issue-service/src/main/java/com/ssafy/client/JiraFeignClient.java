package com.ssafy.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;

@FeignClient(name = "jira")
public interface JiraFeignClient {
    // TODO bulk 로 생성하는 api로 수정
    // TODO 개인 테스트 지라 프로젝트에서 수정하기
    // TODO 파라미터에 jira에서 원하는 형식으로 json 보내주기
    @PostMapping(value = "https://ehoi-chili.atlassian.net/rest/api/3/issue")
    void addIssuesToJira();
}
