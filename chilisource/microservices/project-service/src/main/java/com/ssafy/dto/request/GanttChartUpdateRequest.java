package com.ssafy.dto.request;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class GanttChartUpdateRequest {
    private Long id;

    private LocalDateTime startTime;

    private LocalDateTime endTime;

    private String issueSummary;

    private Long version;

    private String issueCode;

    private Float progress;

    private Long userId;

    @Builder
    public GanttChartUpdateRequest(Long id, LocalDateTime startTime, LocalDateTime endTime, String issueSummary, Long version, String issueCode, Float progress, Long userId) {
        this.id = id;
        this.startTime = startTime;
        this.endTime = endTime;
        this.issueSummary = issueSummary;
        this.version = version;
        this.issueCode = issueCode;
        this.progress = progress;
        this.userId = userId;
    }
}
