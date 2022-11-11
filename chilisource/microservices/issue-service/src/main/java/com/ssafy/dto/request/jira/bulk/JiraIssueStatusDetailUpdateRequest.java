package com.ssafy.dto.request.jira.bulk;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class JiraIssueStatusDetailUpdateRequest {
    private Long id;

    @Builder
    public JiraIssueStatusDetailUpdateRequest(Long id) {
        this.id = id;
    }
}
