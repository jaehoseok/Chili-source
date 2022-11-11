package com.ssafy.dto.request.jira.bulk;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class JiraIssueStatusUpdateRequest {
    private JiraIssueStatusDetailUpdateRequest transition;

    @Builder
    public JiraIssueStatusUpdateRequest(JiraIssueStatusDetailUpdateRequest transition) {
        this.transition = transition;
    }
}
