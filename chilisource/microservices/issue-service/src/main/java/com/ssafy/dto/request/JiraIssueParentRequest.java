package com.ssafy.dto.request;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class JiraIssueParentRequest {
    private String key;

    @Builder
    public JiraIssueParentRequest(String key) {
        this.key = key;
    }
}
