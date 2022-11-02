package com.ssafy.dto.request.jira;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class JiraIssueProjectCreateRequest {
    private String key;

    @Builder
    public JiraIssueProjectCreateRequest(String key) {
        this.key = key;
    }
}
