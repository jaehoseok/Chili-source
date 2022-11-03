package com.ssafy.dto.request.jira;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class JiraIssueParentCreateRequest {
    private String key;

    @Builder
    public JiraIssueParentCreateRequest(String key) {
        this.key = key;
    }
}
