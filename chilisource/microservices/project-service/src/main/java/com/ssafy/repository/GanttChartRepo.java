package com.ssafy.repository;

import com.ssafy.entity.GanttChart;
import com.ssafy.entity.Project;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface GanttChartRepo extends JpaRepository<GanttChart, Long>, GanttChartCustomRepo {
    List<GanttChart> findByProjectAndVersion(Project project, Long Version, Sort sort);

    List<GanttChart> findByProjectAndUserIdIsNull(Project project, Sort sort);

    List<GanttChart> findByProjectAndUserId(Project project, Long userId, Sort sort);

    List<GanttChart> findByProjectAndUserIdIsNullAndVersion(Project project, Long version, Sort sort);

    List<GanttChart> findByProjectAndUserIdAndVersion(Project project, Long userId, Long version, Sort sort);
}
