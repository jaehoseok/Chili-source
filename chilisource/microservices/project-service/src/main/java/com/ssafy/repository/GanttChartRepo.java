package com.ssafy.repository;

import com.ssafy.entity.GanttChart;
import com.ssafy.entity.Project;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface GanttChartRepo extends JpaRepository<GanttChart, Long>, GanttChartCustomRepo {
    List<GanttChart> findByProject(Project project);

    List<GanttChart> findByProjectAndUserIdIsNull(Project project);

    List<GanttChart> findByProjectAndUserId(Project project, Long userId);
}
