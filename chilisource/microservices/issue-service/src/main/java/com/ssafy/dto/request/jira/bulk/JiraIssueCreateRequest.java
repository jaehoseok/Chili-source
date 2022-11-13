package com.ssafy.dto.request.jira.bulk;

import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class JiraIssueCreateRequest {
    @ApiModelProperty(hidden = true)
    private JiraIssueDetailCreateRequest fields;

    @Builder
    public JiraIssueCreateRequest(JiraIssueDetailCreateRequest fields) {
        this.fields = fields;
    }
}
