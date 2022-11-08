package com.ssafy.dto.response.jira.sprint;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@ApiModel(value = "현 프로젝트의 보드id 리스트")
public class JiraProjectBoardResponse {
    @ApiModelProperty(value = "보드 id")
    private Long id;

    @ApiModelProperty(value = "보드 이름")
    private String name;

    @Builder
    public JiraProjectBoardResponse(Long id, String name) {
        this.id = id;
        this.name = name;
    }
}
