package com.ssafy.dto.request;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class JiraIssueReporterRequest {
    private String id;

    @Builder
    public JiraIssueReporterRequest(String id) {
        this.id = id;
    }
}
