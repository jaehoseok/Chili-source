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

    private LocalDateTime startDate;

    private LocalDateTime endDate;

    private String content;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "project_id")
    private Project project;

    private Long userId;

    @Builder
    public GanttChart(Long id, LocalDateTime startDate, LocalDateTime endDate, String content, Project project, Long userId) {
        this.id = id;
        this.startDate = startDate;
        this.endDate = endDate;
        this.content = content;
        this.project = project;
        this.userId = userId;
    }
}
