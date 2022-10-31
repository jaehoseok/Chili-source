package com.ssafy.repository;

import com.ssafy.entity.Widget;
import com.ssafy.entity.WidgetCode;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface WidgetRepo extends JpaRepository<Widget, Long> {
    List<Widget> findByProjectId(Long projectId);
    Optional<Widget> findByProjectIdAndWidgetCode(Long projectId, WidgetCode widgetCode);
}
