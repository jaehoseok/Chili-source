package com.ssafy.dto.response.jira.issue;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@ApiModel(value = "JIRA 이슈가 속해있는 스프린트")
public class JiraIssueSprintResponse {
    @ApiModelProperty(value = "스프린트 id")
    private Long id;

    @ApiModelProperty(value = "스프린트 이름")
    private String name;

    @ApiModelProperty(value = "스프린트 현 상태")
    private String state;

    @ApiModelProperty(value = "스프린트 목표")
    private String goal;

    @Builder
    public JiraIssueSprintResponse(Long id, String name, String state, String goal) {
        this.id = id;
        this.name = name;
        this.state = state;
        this.goal = goal;
    }
}
