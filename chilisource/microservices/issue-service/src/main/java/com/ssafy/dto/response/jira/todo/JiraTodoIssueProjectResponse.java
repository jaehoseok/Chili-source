package com.ssafy.dto.response.jira.todo;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@ApiModel(value = "프로젝트")
public class JiraTodoIssueProjectResponse {
    @ApiModelProperty(value = "프로젝트 id")
    private String id;

    @ApiModelProperty(value = "프로젝트 key")
    private String key;

    @Builder
    public JiraTodoIssueProjectResponse(String id, String key) {
        this.id = id;
        this.key = key;
    }
}
