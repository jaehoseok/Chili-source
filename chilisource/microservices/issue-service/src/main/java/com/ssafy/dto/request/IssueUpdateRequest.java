package com.ssafy.dto.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@ApiModel(value = "Jira 이슈 수정")
public class IssueUpdateRequest {
    @ApiModelProperty(value = "이슈 상태", notes = "수정을 원할경우 11(To Do)/21(In Progress)/31(Done) 중 하나를 입력합니다.")
    private Long statusId;

    @ApiModelProperty(value = "이슈 요약", notes = "수정을 원할경우 변경할 Summary 내용을 입력합니다.")
    private String summary;

    @ApiModelProperty(value = "스토리 포인트", notes = "수정을 원할경우 변경할 story points 를 입력합니다.")
    private Double storyPoints;
}
