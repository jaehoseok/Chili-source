package com.ssafy.dto.response.jira;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class JiraTodoIssueParentFieldsResponse {
    private String summary;

    @Builder
    public JiraTodoIssueParentFieldsResponse(String summary) {
        this.summary = summary;
    }
}
