package com.ssafy.dto.request.jira;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class JiraIssueAssigneeCreateRequest {
    private String id;

    @Builder
    public JiraIssueAssigneeCreateRequest(String id) {
        this.id = id;
    }
}
