package com.ssafy.dto.request.jira.bulk;

import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class JiraIssueParentCreateRequest {
    @ApiModelProperty(hidden = true)
    private String key;

    @Builder
    public JiraIssueParentCreateRequest(String key) {
        this.key = key;
    }
}
