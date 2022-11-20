package com.ssafy.dto.response.jira.issue;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@ApiModel(value = "프로젝트")
public class JiraIssueProjectResponse {
    @ApiModelProperty(value = "프로젝트 id")
    private String id;

    @ApiModelProperty(value = "프로젝트 key")
    private String key;

    @ApiModelProperty(value = "프로젝트 이름")
    private String name;

    @Builder
    public JiraIssueProjectResponse(String id, String key, String name) {
        this.id = id;
        this.key = key;
        this.name = name;
    }
}
