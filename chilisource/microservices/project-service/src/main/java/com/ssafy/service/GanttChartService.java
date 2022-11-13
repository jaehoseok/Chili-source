package com.ssafy.service;

import com.ssafy.dto.request.AllGanttChartUpdateRequest;
import com.ssafy.dto.request.GanttChartCreateRequest;
import com.ssafy.dto.request.GanttChartUpdateRequest;
import com.ssafy.dto.response.GanttChartResponse;

import java.time.LocalDateTime;
import java.util.List;

public interface GanttChartService {
    // 프로젝트 내 최신 버전 전체 간트차트 조회
    List<GanttChartResponse> getProjectGanttChartAllLatest(Long projectId, LocalDateTime start, LocalDateTime end);

    // 프로젝트 내 최신 버전 개별/공통 간트차트 조회
    List<GanttChartResponse> getProjectGanttChartEachLatest(Long userId, Long projectId, LocalDateTime start, LocalDateTime end);

    // 프로젝트 내 버전 별 전체 간트차트 조회
    List<GanttChartResponse> getProjectGanttChartByVersion(Long projectId, Long version, LocalDateTime start, LocalDateTime end);

    // 프로젝트 내 버전 별 개별/공통 간트차트 조회
    List<GanttChartResponse> getProjectGanttChartByVersionEach(Long userId, Long projectId, Long version, LocalDateTime start, LocalDateTime end);

    // 간트차트 내용 추가
    void createGanttChart(Long userId, GanttChartCreateRequest request);

    // 간트차트 내용 수정
    void updateGanttChart(Long userId, GanttChartUpdateRequest request);

    // 간트차트 내용 삭제
    void deleteGanttChart(Long userId, Long ganttChartId);

    // 간트차트 복제 새 버전 생성 및 조회
    List<GanttChartResponse> duplicateGanttCharts(Long userId, Long projectId);

    // 프로젝트 내 이슈 코드 해당하는 간트차트 내용 수정
    void updateAllGanttChart(AllGanttChartUpdateRequest request);
}
