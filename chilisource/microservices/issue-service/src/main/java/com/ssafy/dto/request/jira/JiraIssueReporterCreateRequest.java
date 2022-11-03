package com.ssafy.dto.request.jira;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class JiraIssueReporterCreateRequest {
    private String id;

    @Builder
    public JiraIssueReporterCreateRequest(String id) {
        this.id = id;
    }
}
