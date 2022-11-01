package com.ssafy.dto.request;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class JiraIssueDescriptionTextRequest {
    private String text;
    private String type;

    @Builder
    public JiraIssueDescriptionTextRequest(String text) {
        this.text = text;
        this.type = "text";
    }
}
