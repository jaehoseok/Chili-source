package com.ssafy.dto.request.jira;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class JiraIssuePriorityCreateRequest {
    private String name;

    @Builder
    public JiraIssuePriorityCreateRequest(String name) {
        this.name = name;
    }
}
