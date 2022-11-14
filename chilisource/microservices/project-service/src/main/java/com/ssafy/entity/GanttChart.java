package com.ssafy.entity;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class GanttChart extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "gantt_chart_id")
    private Long id;

    private LocalDateTime startTime;

    private LocalDateTime endTime;

    private String issueSummary;

    private Long version;

    private String issueCode;

    private Float progress;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "project_id")
    private Project project;

    private Long userId;

    private Long parentId;

    @Builder
    public GanttChart(Long id, LocalDateTime startTime, LocalDateTime endTime, String issueSummary, Long version, String issueCode, Float progress, Project project, Long userId, Long parentId) {
        this.id = id;
        this.startTime = startTime;
        this.endTime = endTime;
        this.issueSummary = issueSummary;
        this.version = version;
        this.issueCode = issueCode;
        this.progress = progress;
        this.project = project;
        this.userId = userId;
        this.parentId = parentId;
    }

    public void update(LocalDateTime startTime, LocalDateTime endTime, String issueSummary, Long version, String issueCode, Float progress, Long userId, Long parentId) {
        if (startTime != null) this.startTime = startTime;
        if (endTime != null) this.endTime = endTime;
        if (issueSummary != null) this.issueSummary = issueSummary;
        if (version != null) this.version = version;
        if (issueCode != null) this.issueCode = issueCode;
        if (progress != null) this.progress = progress;
        if (userId != null) this.userId = userId.equals(0L) ? null : userId;
        if (parentId != null) this.parentId = parentId.equals(0L) ? null : parentId;
    }

    public void updateIssueSummary(String issueSummary) {
        this.issueSummary = issueSummary;
    }
}
