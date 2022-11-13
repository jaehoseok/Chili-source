package com.ssafy.dto.request.jira.bulk;

import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class JiraIssueTypeCreateRequest {
    @ApiModelProperty(hidden = true)
    private String id;

    @Builder
    public JiraIssueTypeCreateRequest(String id) {
        this.id = id;
    }
}
