package com.ssafy.dto.response.jira.epic;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
public class JiraEpicListResponse {
    private List<JiraEpicResponse> issues;

    @Builder
    public JiraEpicListResponse(List<JiraEpicResponse> issues) {
        this.issues = issues;
    }
}
