package com.ssafy.dto.request;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
public class JiraIssueListCreateRequest {
    private List<JiraIssueCreateRequest> issueUpdates;

    @Builder
    public JiraIssueListCreateRequest(List<JiraIssueCreateRequest> issueUpdates) {
        this.issueUpdates = issueUpdates;
    }
}
