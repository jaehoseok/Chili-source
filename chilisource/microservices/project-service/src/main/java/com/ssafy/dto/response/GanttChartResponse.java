package com.ssafy.dto.response;

import com.ssafy.entity.BaseEntity;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class GanttChartResponse extends BaseEntity {
    private Long id;

    private LocalDateTime startTime;

    private LocalDateTime endTime;

    private String issueSummary;

    private Long version;

    private String issueCode;

    private Float progress;

    private Long userId;

    @Builder
    public GanttChartResponse(Long id, LocalDateTime startTime, LocalDateTime endTime, String issueSummary, Long version, String issueCode, Float progress, Long userId) {
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
