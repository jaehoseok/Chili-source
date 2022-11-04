package com.ssafy.dto.response.jira.project;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class JiraProjectResponse {
    private String key;

    private String name;

    @Builder
    public JiraProjectResponse(String key, String name) {
        this.key = key;
        this.name = name;
    }
}
