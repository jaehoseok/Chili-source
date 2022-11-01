package com.ssafy.dto.request;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class JiraIssueCreateRequest {
    private JiraIssueDetailCreateRequest fields;

    @Builder
    public JiraIssueCreateRequest(JiraIssueDetailCreateRequest fields) {
        this.fields = fields;
    }
}
