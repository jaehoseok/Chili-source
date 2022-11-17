package com.ssafy.repository;

import com.ssafy.entity.GanttChart;
import com.ssafy.entity.Project;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface GanttChartRepo extends JpaRepository<GanttChart, Long> {
    List<GanttChart> findByProjectAndVersion(Project project, Long Version, Sort sort);

    List<GanttChart> findByProjectAndVersionAndEndTimeGreaterThanEqualAndStartTimeLessThanEqual(Project project, Long Version, LocalDateTime endTime, LocalDateTime startTime, Sort sort);

    List<GanttChart> findByProjectAndUserIdIsNullAndVersionAndEndTimeGreaterThanEqualAndStartTimeLessThanEqual(Project project, Long version, LocalDateTime endTime, LocalDateTime startTime, Sort sort);

    List<GanttChart> findByProjectAndUserIdAndVersionAndEndTimeGreaterThanEqualAndStartTimeLessThanEqual(Project project, Long userId, Long version, LocalDateTime endTime, LocalDateTime startTime, Sort sort);

    List<GanttChart> findByIssueCode(String issueCode);
}
