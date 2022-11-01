package com.ssafy.dto.request;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class JiraIssueProjectRequest {
    private String key;

    @Builder
    public JiraIssueProjectRequest(String key) {
        this.key = key;
    }
}
