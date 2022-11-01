package com.ssafy.dto.request;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class JiraIssueAssigneeRequest {
    private String id;

    @Builder
    public JiraIssueAssigneeRequest(String id) {
        this.id = id;
    }
}
