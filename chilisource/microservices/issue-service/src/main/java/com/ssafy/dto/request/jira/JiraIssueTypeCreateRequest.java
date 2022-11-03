package com.ssafy.dto.request.jira;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class JiraIssueTypeCreateRequest {
    private String id;

    @Builder
    public JiraIssueTypeCreateRequest(String id) {
        this.id = id;
    }
}
