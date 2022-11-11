package com.ssafy.dto.request.jira.bulk;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class JiraIssueUpdateRequest {
    private JiraIssueDetailUpdateRequest fields;

    @Builder
    public JiraIssueUpdateRequest(JiraIssueDetailUpdateRequest fields) {
        this.fields = fields;
    }
}
