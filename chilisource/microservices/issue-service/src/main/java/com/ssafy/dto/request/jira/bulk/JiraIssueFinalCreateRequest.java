package com.ssafy.dto.request.jira.bulk;

import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class JiraIssueFinalCreateRequest {
    @ApiModelProperty(hidden = true)
    private JiraIssueBulkCreateRequest request;

    @Builder
    public JiraIssueFinalCreateRequest(JiraIssueBulkCreateRequest request) {
        this.request = request;
    }
}
