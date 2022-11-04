package com.ssafy.dto.response.jira.project;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@ApiModel(value = "프로젝트 정보")
public class JiraProjectResponse {
    @ApiModelProperty(value = "프로젝트 key")
    private String key;

    @ApiModelProperty(value = "프로젝트명")
    private String name;

    @Builder
    public JiraProjectResponse(String key, String name) {
        this.key = key;
        this.name = name;
    }
}
