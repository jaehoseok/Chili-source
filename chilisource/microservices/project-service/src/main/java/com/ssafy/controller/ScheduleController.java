package com.ssafy.controller;

import com.ssafy.config.loginuser.LoginUser;
import com.ssafy.config.loginuser.User;
import com.ssafy.dto.request.GanttChartCreateRequest;
import com.ssafy.dto.request.GanttChartUpdateRequest;
import com.ssafy.dto.response.GanttChartResponse;
import com.ssafy.service.GanttChartService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/gantt")
public class ScheduleController {
    private final GanttChartService ganttChartService;

    @GetMapping
    public ResponseEntity<?> getGanttChart(
            @RequestParam Integer op,
            @RequestParam Long projectId,
            @RequestParam Long userId) {
        List<GanttChartResponse> responses;
        if (op.equals(2)) {
            responses = ganttChartService.getProjectFilteredGanttChart(userId, projectId);
        } else {
            responses = ganttChartService.getProjectGanttChart(projectId);
        }
        return ResponseEntity.ok(responses);
    }

    @PostMapping
    public ResponseEntity<?> createGanttChart(
            @LoginUser User user,
            @RequestBody GanttChartCreateRequest request) {
        ganttChartService.createGanttChart(user.getId(), request);
        return ResponseEntity.ok().build();
    }

    @PutMapping
    public ResponseEntity<?> updateGanttChart(
            @LoginUser User user,
            @RequestBody GanttChartUpdateRequest request) {
        ganttChartService.updateGanttChart(user.getId(), request);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{ganttChartId}")
    public ResponseEntity<?> deleteGanttChart(
            @LoginUser User user,
            @PathVariable Long ganttChartId) {
        ganttChartService.deleteGanttChart(user.getId(), ganttChartId);
        return ResponseEntity.ok().build();
    }
}
