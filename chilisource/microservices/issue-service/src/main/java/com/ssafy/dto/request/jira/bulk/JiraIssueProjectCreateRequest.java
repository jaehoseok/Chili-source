package com.ssafy.dto.request.jira.bulk;

import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class JiraIssueProjectCreateRequest {
    @ApiModelProperty(hidden = true)
    private String key;

    @ApiModelProperty(hidden = true)
    private String id;

    @Builder
    public JiraIssueProjectCreateRequest(String key, String id) {
        this.key = key;
        this.id = id;
    }
}
