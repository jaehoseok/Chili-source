package com.ssafy.dto.request.jira;

import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class JiraIssueReporterCreateRequest {
    @ApiModelProperty(hidden = true)
    private String id;

    @Builder
    public JiraIssueReporterCreateRequest(String id) {
        this.id = id;
    }
}
