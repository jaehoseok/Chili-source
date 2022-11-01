package com.ssafy.dto.request;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class JiraIssuePriorityRequest {
    private String name;

    @Builder
    public JiraIssuePriorityRequest(String name) {
        this.name = name;
    }
}
