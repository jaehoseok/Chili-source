package com.ssafy.repository;

import com.ssafy.entity.GanttChart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GanttChartRepo extends JpaRepository<GanttChart, Long>, GanttChartCustomRepo {
}
