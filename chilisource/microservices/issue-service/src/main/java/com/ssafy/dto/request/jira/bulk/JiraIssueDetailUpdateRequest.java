package com.ssafy.dto.request.jira.bulk;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class JiraIssueDetailUpdateRequest {
    private String summary;

    @Builder
    JiraIssueDetailUpdateRequest(String summary) {
        this.summary = summary;
    }
}
