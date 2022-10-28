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

    @Builder
    public GanttChart(Long id, LocalDateTime startTime, LocalDateTime endTime, String issueSummary, Long version, String issueCode, Float progress, Project project, Long userId) {
        this.id = id;
        this.startTime = startTime;
        this.endTime = endTime;
        this.issueSummary = issueSummary;
        this.version = version;
        this.issueCode = issueCode;
        this.progress = progress;
        this.project = project;
        this.userId = userId;
    }

    public void update(LocalDateTime startTime, LocalDateTime endTime, String issueSummary, Long version, String issueCode, Float progress, Long userId) {
        if(!startTime.equals(null)) this.startTime = startTime;
        if(!endTime.equals(null)) this.endTime = endTime;
        if(!issueSummary.equals(null)) this.issueSummary = issueSummary;
        if(!version.equals(null)) this.version = version;
        if(!issueCode.equals(null)) this.issueCode = issueCode;
        if(!progress.equals(null)) this.progress = progress;
        if(!userId.equals(null)) this.userId = userId;
    }
}
