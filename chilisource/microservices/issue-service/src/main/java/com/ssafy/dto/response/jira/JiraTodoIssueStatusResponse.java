package com.ssafy.dto.response.jira;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class JiraTodoIssueStatusResponse {
    private String name;

    private String id;

    @Builder
    public JiraTodoIssueStatusResponse(String name, String id) {
        this.name = name;
        this.id = id;
    }
}
