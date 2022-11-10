package com.ssafy.dto.response.jira.sprint;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
@ApiModel(value = "스프린트 내 진행도 정보")
public class JiraSprintProgressResponse {
    @ApiModelProperty(value = "스프린트 목록")
    private List<JiraSprintResponse> sprintList;

    @ApiModelProperty(value = "스프린트 id")
    private Long sprintId;

    @ApiModelProperty(value = "스프린트에 해당되는 본인 이슈 총 개수")
    private Integer total;

    @ApiModelProperty(value = "스프린트에 해당되는 완료된 본인 이슈 개수")
    private Integer done;

    @Builder
    public JiraSprintProgressResponse(List<JiraSprintResponse> sprintList, Long sprintId, Integer total, Integer done) {
        this.sprintList = sprintList;
        this.sprintId = sprintId;
        this.total = total;
        this.done = done;
    }
}
