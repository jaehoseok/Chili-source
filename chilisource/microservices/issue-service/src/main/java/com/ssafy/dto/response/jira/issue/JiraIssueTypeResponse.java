package com.ssafy.dto.response.jira.issue;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@ApiModel(value = "이슈 타입")
public class JiraIssueTypeResponse {
    @ApiModelProperty(value = "이슈 타입 id")
    private String id;

    @ApiModelProperty(value = "이슈 타입 이름")
    private String name;

    @Builder
    public JiraIssueTypeResponse(String id, String name) {
        this.id = id;
        this.name = name;
    }
}
