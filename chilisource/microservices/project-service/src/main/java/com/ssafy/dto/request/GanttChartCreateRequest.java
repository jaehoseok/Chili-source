package com.ssafy.dto.request;

import com.ssafy.entity.BaseEntity;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class GanttChartCreateRequest extends BaseEntity {
    private LocalDateTime startTime;

    private LocalDateTime endTime;

    private String issueSummary;

    private Long version;

    private String issueCode;

    private Long projectId;

    private Long userId;

    @Builder
    public GanttChartCreateRequest(LocalDateTime startTime, LocalDateTime endTime, String issueSummary, Long version, String issueCode, Long projectId, Long userId) {
        this.startTime = startTime;
        this.endTime = endTime;
        this.issueSummary = issueSummary;
        this.version = version;
        this.issueCode = issueCode;
        this.projectId = projectId;
        this.userId = userId;
    }
}
