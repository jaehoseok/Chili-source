package com.ssafy.dto.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@ApiModel(value = "간트 차트 수정 정보")
public class GanttChartUpdateRequest {
    @ApiModelProperty(value = "간트 차트 내용 pk")
    private Long id;

    @ApiModelProperty(value = "시작 시간")
    private LocalDateTime startTime;

    @ApiModelProperty(value = "끝 시간")
    private LocalDateTime endTime;

    @ApiModelProperty(value = "이슈 요약")
    private String issueSummary;

    @ApiModelProperty(value = "Jira 이슈 코드")
    private String issueCode;

    @ApiModelProperty(value = "진행도")
    private Float progress;

    @ApiModelProperty(value = "담당자 유저 pk")
    private Long userId;

    @ApiModelProperty(value = "연결된 부모 간트 pk")
    private Long parentId;

    @Builder
    public GanttChartUpdateRequest(Long id, LocalDateTime startTime, LocalDateTime endTime, String issueSummary, String issueCode, Float progress, Long userId, Long parentId) {
        this.id = id;
        this.startTime = startTime;
        this.endTime = endTime;
        this.issueSummary = issueSummary;
        this.issueCode = issueCode;
        this.progress = progress;
        this.userId = userId;
        this.parentId = parentId;
    }
}
