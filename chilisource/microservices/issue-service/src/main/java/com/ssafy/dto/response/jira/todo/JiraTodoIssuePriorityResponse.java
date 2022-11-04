package com.ssafy.dto.response.jira.todo;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class JiraTodoIssuePriorityResponse {
    private String name;

    private String id;

    @Builder
    public JiraTodoIssuePriorityResponse(String name, String id) {
        this.name = name;
        this.id = id;
    }
}
