package com.ssafy.dto.response.jira.issue;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@ApiModel(value = "이슈에 대한 간략한 설명")
public class JiraIssueSummaryResponse {
    @ApiModelProperty(value = "이슈에 대한 간략한 설명")
    private String summary;

    @Builder
    public JiraIssueSummaryResponse(String summary) {
        this.summary = summary;
    }
}
