package com.ssafy.dto.response.jira.todo;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
public class JiraTodoIssueListResponse {
    private List<JiraTodoIssueResponse> issues;

    @Builder
    public JiraTodoIssueListResponse(List<JiraTodoIssueResponse> issues) {
        this.issues = issues;
    }
}
