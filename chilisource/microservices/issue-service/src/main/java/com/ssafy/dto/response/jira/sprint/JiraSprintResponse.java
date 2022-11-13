package com.ssafy.dto.response.jira.sprint;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@ApiModel(value = "스프린트 정보")
public class JiraSprintResponse {
    @ApiModelProperty(value = "스프린트 id")
    private Long id;

    @ApiModelProperty(value = "스프린트 상태", example = "closed/active/future")
    private String state;

    @ApiModelProperty(value = "스프린트 이름")
    private String name;

    @ApiModelProperty(value = "스프린트가 소속된 보드 id")
    private Long originBoardId;

    @ApiModelProperty(value = "현 스프린트 목표")
    private String goal;

    @Builder
    public JiraSprintResponse(Long id, String state, String name, Long originBoardId, String goal) {
        this.id = id;
        this.state = state;
        this.name = name;
        this.originBoardId = originBoardId;
        this.goal = goal;
    }
}
