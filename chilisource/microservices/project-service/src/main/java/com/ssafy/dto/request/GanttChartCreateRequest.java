package com.ssafy.dto.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@ApiModel(value = "간트 차트 정보")
public class GanttChartCreateRequest {
    @ApiModelProperty(value = "시작 시간")
    private LocalDateTime startTime;

    @ApiModelProperty(value = "끝 시간")
    private LocalDateTime endTime;

    @ApiModelProperty(value = "이슈 요약")
    private String issueSummary;

    @ApiModelProperty(value = "간트 차트 버전")
    private Long version;

    @ApiModelProperty(value = "Jira 이슈 코드")
    private String issueCode;

    @ApiModelProperty(value = "진행도")
    private Float progress = 0F;

    @ApiModelProperty(value = "프로젝트 pk")
    private Long projectId;

    @ApiModelProperty(value = "담당자 유저 pk")
    private Long userId;

    @ApiModelProperty(value = "연결된 부모 간트 pk")
    private Long parentId;

    @Builder
    public GanttChartCreateRequest(LocalDateTime startTime, LocalDateTime endTime, String issueSummary, Long version, String issueCode, Float progress, Long projectId, Long userId, Long parentId) {
        this.startTime = startTime;
        this.endTime = endTime;
        this.issueSummary = issueSummary;
        this.version = version;
        this.issueCode = issueCode;
        this.progress = progress;
        this.projectId = projectId;
        this.userId = userId;
        this.parentId = parentId;
    }
}
