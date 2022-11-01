package com.ssafy.dto.request;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
public class JiraIssueDescriptionTypeRequest {
    private String type;
    private List<JiraIssueDescriptionTextRequest> content;

    @Builder
    public JiraIssueDescriptionTypeRequest(List<JiraIssueDescriptionTextRequest> content) {
        this.type = "paragraph";
        this.content = content;
    }
}
