package com.ssafy.dto.response.jira;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class JiraTodoIssueProjectResponse {
    private String id;

    private String key;

    @Builder
    public JiraTodoIssueProjectResponse(String id, String key) {
        this.id = id;
        this.key = key;
    }
}
