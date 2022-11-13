package com.ssafy.dto.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@ApiModel(value = "수정하려는 미들 버킷에 있는 이슈")
public class MiddleBucketIssueUpdateRequest {
    @ApiModelProperty(value = "이슈 타입", notes = "Story/Task/Bug 중 하나를 입력합니다.")
    private String issueType;

    @ApiModelProperty(value = "이슈의 간략한 설명")
    private String summary;

    @ApiModelProperty(value = "이슈의 상세 설명")
    private String description;

    @ApiModelProperty(value = "담당자", notes = "담당 팀원의 이름을 입력합니다.")
    private String assignee;

    @ApiModelProperty(value = "우선순위", notes = "Highest/High/Medium/Low/Lowest 중 하나를 입력합니다.")
    private String priority;

    @ApiModelProperty(value = "에픽 링크", notes = "에픽 이슈의 key를 입력합니다.")
    private String epicLink;

    @ApiModelProperty(value = "스프린트", notes = "스프린트를 선택합니다.")
    private Long sprint;

    @ApiModelProperty(value = "스토리 포인트")
    private Double storyPoints;
}
