package com.ssafy.dto.request.jira;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
public class JiraIssueDescriptionContentCreateRequest {
    private String type;
    private List<JiraIssueDescriptionContentContentCreateRequest> content;

    @Builder
    public JiraIssueDescriptionContentCreateRequest(List<JiraIssueDescriptionContentContentCreateRequest> content) {
        this.type = "paragraph";
        this.content = content;
    }
}
