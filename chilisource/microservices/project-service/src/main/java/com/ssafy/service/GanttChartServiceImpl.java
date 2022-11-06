package com.ssafy.service;

import com.ssafy.dto.request.GanttChartCreateRequest;
import com.ssafy.dto.request.GanttChartUpdateRequest;
import com.ssafy.dto.response.GanttChartResponse;
import com.ssafy.entity.GanttChart;
import com.ssafy.entity.Project;
import com.ssafy.entity.UserProject;
import com.ssafy.exception.NotAuthorizedException;
import com.ssafy.exception.NotFoundException;
import com.ssafy.repository.GanttChartRepo;
import com.ssafy.repository.ProjectRepo;
import com.ssafy.repository.UserProjectRepo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import static com.ssafy.exception.NotAuthorizedException.*;
import static com.ssafy.exception.NotFoundException.*;

@RequiredArgsConstructor
@Service
@Transactional(readOnly = true)
@Slf4j
public class GanttChartServiceImpl implements GanttChartService {
    private final ProjectRepo projectRepo;
    private final UserProjectRepo userProjectRepo;
    private final GanttChartRepo ganttChartRepo;
    private final Sort ganttSort = Sort.by("version").and(Sort.by("startTime"));

    @Override
    public List<GanttChartResponse> getProjectGanttChartAllLatest(Long projectId, LocalDateTime start, LocalDateTime end) {
        Project project = projectRepo.findById(projectId)
                .orElseThrow(() -> {
                    log.error("[Project] [getProjectGanttChartAllLatest] PROJECT_NOT_FOUND");
                    return new NotFoundException(PROJECT_NOT_FOUND);
                });

        return getProjectGanttChartByVersion(projectId, project.getLatestGanttVersion(), start, end);
    }

    @Override
    public List<GanttChartResponse> getProjectGanttChartEachLatest(Long userId, Long projectId, LocalDateTime start, LocalDateTime end) {
        Project project = projectRepo.findById(projectId)
                .orElseThrow(() -> {
                    log.error("[Project] [getProjectGanttChartEachLatest] PROJECT_NOT_FOUND");
                    return new NotFoundException(PROJECT_NOT_FOUND);
                });

        return getProjectGanttChartByVersionEach(userId, projectId, project.getLatestGanttVersion(), start, end);
    }

    @Override
    public List<GanttChartResponse> getProjectGanttChartByVersion(Long projectId, Long version, LocalDateTime start, LocalDateTime end) {
        Project project = projectRepo.findById(projectId)
                .orElseThrow(() -> {
                    log.error("[Project] [getProjectGanttChartByVersion] PROJECT_NOT_FOUND");
                    return new NotFoundException(PROJECT_NOT_FOUND);
                });

        List<GanttChart> responses = ganttChartRepo.findByProjectAndVersionAndEndTimeGreaterThanEqualAndStartTimeLessThanEqual(project, version, start, end, ganttSort);
        return responses.stream()
                .map(ganttChart -> GanttChartResponse.builder()
                        .id(ganttChart.getId())
                        .startTime(ganttChart.getStartTime())
                        .endTime(ganttChart.getEndTime())
                        .issueSummary(ganttChart.getIssueSummary())
                        .version(ganttChart.getVersion())
                        .issueCode(ganttChart.getIssueCode())
                        .progress(ganttChart.getProgress())
                        .userId(ganttChart.getUserId())
                        .build())
                .collect(Collectors.toList());
    }

    @Override
    public List<GanttChartResponse> getProjectGanttChartByVersionEach(Long userId, Long projectId, Long version, LocalDateTime start, LocalDateTime end) {
        Project project = projectRepo.findById(projectId)
                .orElseThrow(() -> {
                    log.error("[Project] [getProjectGanttChartByVersionEach] PROJECT_NOT_FOUND");
                    return new NotFoundException(PROJECT_NOT_FOUND);
                });

        List<GanttChart> responses;
        if (userId == null) {
            responses = ganttChartRepo.findByProjectAndUserIdIsNullAndVersionAndEndTimeGreaterThanEqualAndStartTimeLessThanEqual(project, version, start, end,ganttSort);
        } else {
            responses = ganttChartRepo.findByProjectAndUserIdAndVersionAndEndTimeGreaterThanEqualAndStartTimeLessThanEqual(project, userId, version, start, end, ganttSort);
        }
        return responses.stream()
                .map(ganttChart -> GanttChartResponse.builder()
                        .id(ganttChart.getId())
                        .startTime(ganttChart.getStartTime())
                        .endTime(ganttChart.getEndTime())
                        .issueSummary(ganttChart.getIssueSummary())
                        .version(ganttChart.getVersion())
                        .issueCode(ganttChart.getIssueCode())
                        .progress(ganttChart.getProgress())
                        .userId(ganttChart.getUserId())
                        .build())
                .collect(Collectors.toList());
    }

    // 간트차트 내용 추가
    @Override
    @Transactional
    public void createGanttChart(Long userId, GanttChartCreateRequest request) {
        Project project = projectRepo.findById(request.getProjectId())
                .orElseThrow(() -> {
                    log.error("[Project] [createGanttChart] PROJECT_NOT_FOUND");
                    return new NotFoundException(PROJECT_NOT_FOUND);
                });

        UserProject userProjectManager = userProjectRepo.findByUserIdAndProjectId(userId, request.getProjectId())
                .orElseThrow(() -> {
                    log.error("[Project] [createGanttChart] USER_PROJECT_NOT_FOUND");
                    return new NotFoundException(USER_PROJECT_NOT_FOUND);
                });

        if (userProjectManager.getRole().getModify() || userId.equals(request.getUserId())) {
            GanttChart ganttChart = GanttChart.builder()
                    .startTime(request.getStartTime())
                    .endTime(request.getEndTime())
                    .issueSummary(request.getIssueSummary())
                    .version(request.getVersion())
                    .issueCode(request.getIssueCode())
                    .progress(request.getProgress())
                    .project(project)
                    .userId(request.getUserId())
                    .build();
            ganttChartRepo.save(ganttChart);
        } else {
            log.error("[Project] [createGanttChart] CREATE_NOT_AUTHORIZED");
            throw new NotAuthorizedException(CREATE_NOT_AUTHORIZED);
        }
    }

    // 간트차트 내용 수정
    @Override
    @Transactional
    public void updateGanttChart(Long userId, GanttChartUpdateRequest request) {
        GanttChart ganttChart = ganttChartRepo.findById(request.getId())
                .orElseThrow(() -> {
                    log.error("[Project] [updateGanttChart] GANTT_CHART_NOT_FOUND");
                    return new NotFoundException(GANTT_CHART_NOT_FOUND);
                });

        UserProject userProjectManager = userProjectRepo.findByUserIdAndProjectId(userId, ganttChart.getProject().getId())
                .orElseThrow(() -> {
                    log.error("[Project] [updateGanttChart] USER_PROJECT_NOT_FOUND");
                    return new NotFoundException(USER_PROJECT_NOT_FOUND);
                });

        if (userProjectManager.getRole().getModify() || userId.equals(request.getUserId())) {
            ganttChart.update(
                    request.getStartTime(),
                    request.getEndTime(),
                    request.getIssueSummary(),
                    request.getVersion(),
                    request.getIssueCode(),
                    request.getProgress(),
                    request.getUserId()
            );
        } else {
            log.error("[Project] [updateGanttChart] MODIFY_NOT_AUTHORIZED");
            throw new NotAuthorizedException(MODIFY_NOT_AUTHORIZED);
        }
    }

    // 간트차트 내용 삭제
    @Override
    @Transactional
    public void deleteGanttChart(Long userId, Long ganttChartId) {
        GanttChart ganttChart = ganttChartRepo.findById(ganttChartId)
                .orElseThrow(() -> {
                    log.error("[Project] [deleteGanttChart] GANTT_CHART_NOT_FOUND");
                    return new NotFoundException(GANTT_CHART_NOT_FOUND);
                });

        UserProject userProjectManager = userProjectRepo.findByUserIdAndProjectId(userId, ganttChart.getProject().getId())
                .orElseThrow(() -> {
                    log.error("[Project] [deleteGanttChart] USER_PROJECT_NOT_FOUND");
                    return new NotFoundException(USER_PROJECT_NOT_FOUND);
                });

        if (userProjectManager.getRole().getRemove() || userId.equals(ganttChart.getUserId())) {
            ganttChartRepo.delete(ganttChart);
        } else {
            log.error("[Project] [deleteGanttChart] REMOVE_NOT_AUTHORIZED");
            throw new NotAuthorizedException(REMOVE_NOT_AUTHORIZED);
        }
    }

    @Override
    @Transactional
    public List<GanttChartResponse> duplicateGanttCharts(Long userId, Long projectId) {
        Project project = projectRepo.findById(projectId)
                .orElseThrow(() -> {
                    log.error("[Project] [duplicateGanttCharts] PROJECT_NOT_FOUND");
                    return new NotFoundException(PROJECT_NOT_FOUND);
                });

        UserProject userProjectManager = userProjectRepo.findByUserIdAndProjectId(userId, projectId)
                .orElseThrow(() -> {
                    log.error("[Project] [duplicateGanttCharts] USER_PROJECT_NOT_FOUND");
                    return new NotFoundException(USER_PROJECT_NOT_FOUND);
                });

        if(!userProjectManager.getRole().getName().equalsIgnoreCase("MASTER")) {
            log.error("[Project] [duplicateGanttCharts] CREATE_NOT_AUTHORIZED");
            throw new NotAuthorizedException(CREATE_NOT_AUTHORIZED);
        }

        List<GanttChart> oldGanttCharts = ganttChartRepo.findByProjectAndVersion(project, project.getLatestGanttVersion(), ganttSort);

        Long version = project.getLatestGanttVersion() + 1;
        project.updateLatestGanttVersion(version);

        List<GanttChart> responses = oldGanttCharts.stream()
                .map(oldGanttChart -> GanttChart.builder()
                        .startTime(oldGanttChart.getStartTime())
                        .endTime(oldGanttChart.getEndTime())
                        .issueSummary(oldGanttChart.getIssueSummary())
                        .version(version)
                        .issueCode(oldGanttChart.getIssueCode())
                        .progress(oldGanttChart.getProgress())
                        .build())
                .collect(Collectors.toList());

        ganttChartRepo.saveAll(responses);

        return responses.stream()
                .map(ganttChart -> GanttChartResponse.builder()
                        .id(ganttChart.getId())
                        .startTime(ganttChart.getStartTime())
                        .endTime(ganttChart.getEndTime())
                        .issueSummary(ganttChart.getIssueSummary())
                        .version(ganttChart.getVersion())
                        .issueCode(ganttChart.getIssueCode())
                        .progress(ganttChart.getProgress())
                        .userId(ganttChart.getUserId())
                        .build())
                .collect(Collectors.toList());
    }
}
