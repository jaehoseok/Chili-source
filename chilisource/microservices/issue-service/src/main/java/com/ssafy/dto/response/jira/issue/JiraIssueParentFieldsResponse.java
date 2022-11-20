package com.ssafy.dto.response.jira.issue;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@ApiModel(value = "에픽 링크 이름")
public class JiraIssueParentFieldsResponse {
    @ApiModelProperty(value = "에픽 링크 이름")
    private String summary;

    @Builder
    public JiraIssueParentFieldsResponse(String summary) {
        this.summary = summary;
    }
}
