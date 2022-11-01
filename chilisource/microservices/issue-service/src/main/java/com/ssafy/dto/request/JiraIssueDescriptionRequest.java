package com.ssafy.dto.request;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
public class JiraIssueDescriptionRequest {
    private String type;
    private Integer version;
    private List<JiraIssueDescriptionTypeRequest> content;

    @Builder
    public JiraIssueDescriptionRequest(List<JiraIssueDescriptionTypeRequest> content) {
        this.type = "doc";
        this.version = 1;
        this.content = content;
    }
}
