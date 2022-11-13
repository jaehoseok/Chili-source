package com.ssafy.dto.request.jira.bulk;

import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
public class JiraIssueDescriptionContentCreateRequest {
    @ApiModelProperty(hidden = true)
    private String type;

    @ApiModelProperty(hidden = true)
    private List<JiraIssueDescriptionContentContentCreateRequest> content;

    @Builder
    public JiraIssueDescriptionContentCreateRequest(List<JiraIssueDescriptionContentContentCreateRequest> content) {
        this.type = "paragraph";
        this.content = content;
    }
}
