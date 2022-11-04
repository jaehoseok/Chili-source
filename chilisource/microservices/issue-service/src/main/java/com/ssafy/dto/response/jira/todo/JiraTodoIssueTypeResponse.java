package com.ssafy.dto.response.jira.todo;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class JiraTodoIssueTypeResponse {
    private String id;

    @Builder
    public JiraTodoIssueTypeResponse(String id) {
        this.id = id;
    }
}
