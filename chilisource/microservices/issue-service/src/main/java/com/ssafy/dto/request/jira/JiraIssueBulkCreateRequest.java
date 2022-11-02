package com.ssafy.dto.request.jira;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
public class JiraIssueBulkCreateRequest {
    private List<JiraIssueCreateRequest> issueUpdates;

    @Builder
    public JiraIssueBulkCreateRequest(List<JiraIssueCreateRequest> issueUpdates) {
        this.issueUpdates = issueUpdates;
    }
}
