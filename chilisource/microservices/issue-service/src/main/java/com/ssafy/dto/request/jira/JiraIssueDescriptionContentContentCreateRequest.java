package com.ssafy.dto.request.jira;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class JiraIssueDescriptionContentContentCreateRequest {
    private String text;

    private String type;

    @Builder
    public JiraIssueDescriptionContentContentCreateRequest(String text) {
        this.text = text;
        this.type = "text";
    }
}
