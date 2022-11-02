package com.ssafy.dto.request.jira;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class JiraIssueProjectCreateRequest {
    private String key;
    private String id;

    @Builder
    public JiraIssueProjectCreateRequest(String key, String id) {
        this.key = key;
        this.id = id;
    }
}
