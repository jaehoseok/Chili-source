package com.ssafy.dto.response;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@ApiModel(value = "이슈")
public class IssueResponse {
    @ApiModelProperty(value = "id")
    private Long issueId;

    @ApiModelProperty(value = "이슈 타입")
    private String issueType;

    @ApiModelProperty(value = "간략 설명")
    private String summary;

    @ApiModelProperty(value = "상세 설명")
    private String description;

    @ApiModelProperty(value = "담당자")
    private String assignee;

    @ApiModelProperty(value = "우선 순위")
    private String priority;

    @ApiModelProperty(value = "에픽 링크")
    private String epicLink;

    @ApiModelProperty(value = "스프린트")
    private Long sprint;

    @ApiModelProperty(value = "스토리 포인트")
    private Double storyPoints;

    @Builder
    public IssueResponse(Long issueId, String issueType, String summary, String description, String assignee, String priority, String epicLink, Long sprint, Double storyPoints) {
        this.issueId = issueId;
        this.issueType = issueType;
        this.summary = summary;
        this.description = description;
        this.assignee = assignee;
        this.priority = priority;
        this.epicLink = epicLink;
        this.sprint = sprint;
        this.storyPoints = storyPoints;
    }
}
