package com.ssafy.dto.request;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class JiraIssueTypeRequest {
    private String id;

    @Builder
    public JiraIssueTypeRequest(String id) {
        this.id = id;
    }
}
