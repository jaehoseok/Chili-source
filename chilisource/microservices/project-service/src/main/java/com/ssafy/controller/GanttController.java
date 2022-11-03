package com.ssafy.controller;

import com.ssafy.config.loginuser.LoginUser;
import com.ssafy.config.loginuser.User;
import com.ssafy.dto.request.GanttChartCreateRequest;
import com.ssafy.dto.request.GanttChartUpdateRequest;
import com.ssafy.dto.response.GanttChartResponse;
import com.ssafy.service.GanttChartService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/gantt")
@Api(tags = "간트 차트")
public class GanttController {
    private final GanttChartService ganttChartService;

    @GetMapping
    @ApiOperation(value = "최신 버전 간트 차트 조회")
    public ResponseEntity<List<GanttChartResponse>> getGanttChart(
            @ApiParam(value = "검색 옵션 1(모든 팀원 조회) / 2(개별 차트 조회)") @RequestParam Integer op,
            @ApiParam(value = "프로젝트 pk") @RequestParam Long projectId,
            @ApiParam(value = "검색할 유저 pk (null 일 경우 공통 차트)") @RequestParam Long userId) {
        List<GanttChartResponse> responses;
        if (op.equals(2)) {
            responses = ganttChartService.getProjectGanttChartEachLatest(userId, projectId);
        } else {
            responses = ganttChartService.getProjectGanttChartAllLatest(projectId);
        }
        return ResponseEntity.ok(responses);
    }

    @GetMapping("/version")
    @ApiOperation(value = "특정 버전 간트 차트 조회")
    public ResponseEntity<List<GanttChartResponse>> getGanttChartByVersion(
            @ApiParam(value = "검색 옵션 1(모든 팀원 조회) / 2(개별 차트 조회)") @RequestParam Integer op,
            @ApiParam(value = "프로젝트 pk") @RequestParam Long projectId,
            @ApiParam(value = "검색할 유저 pk (null 일 경우 공통 차트)") @RequestParam Long userId,
            @ApiParam(value = "검색할 간트차트 버전") @RequestParam Long version) {
        List<GanttChartResponse> responses;
        if (op.equals(2)) {
            responses = ganttChartService.getProjectGanttChartByVersion(projectId, version);
        } else {
            responses = ganttChartService.getProjectGanttChartByVersionEach(userId, projectId, version);
        }
        return ResponseEntity.ok(responses);
    }

    @PostMapping
    @ApiOperation(value = "간트 차트 내용 생성")
    public ResponseEntity<?> createGanttChart(
            @LoginUser User user,
            @RequestBody GanttChartCreateRequest request) {
        ganttChartService.createGanttChart(user.getId(), request);
        return ResponseEntity.ok().build();
    }

    @PutMapping
    @ApiOperation(value = "간트 차트 내용 수정")
    public ResponseEntity<?> updateGanttChart(
            @LoginUser User user,
            @RequestBody GanttChartUpdateRequest request) {
        ganttChartService.updateGanttChart(user.getId(), request);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{ganttChartId}")
    @ApiOperation(value = "간트 차트 내용 삭제")
    public ResponseEntity<?> deleteGanttChart(
            @LoginUser User user,
            @ApiParam(value = "간트 차트 내용 pk") @PathVariable Long ganttChartId) {
        ganttChartService.deleteGanttChart(user.getId(), ganttChartId);
        return ResponseEntity.ok().build();
    }
}
