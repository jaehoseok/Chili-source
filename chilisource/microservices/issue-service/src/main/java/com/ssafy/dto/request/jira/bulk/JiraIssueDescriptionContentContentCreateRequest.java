package com.ssafy.dto.request.jira.bulk;

import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class JiraIssueDescriptionContentContentCreateRequest {
    @ApiModelProperty(hidden = true)
    private String text;

    @ApiModelProperty(hidden = true)
    private String type;

    @Builder
    public JiraIssueDescriptionContentContentCreateRequest(String text) {
        this.text = text;
        this.type = "text";
    }
}
