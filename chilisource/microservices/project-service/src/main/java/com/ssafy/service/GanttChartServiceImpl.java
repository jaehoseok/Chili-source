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
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

import static com.ssafy.exception.NotAuthorizedException.*;
import static com.ssafy.exception.NotFoundException.*;

@RequiredArgsConstructor
@Service
@Transactional(readOnly = true)
public class GanttChartServiceImpl implements GanttChartService {
    private final ProjectRepo projectRepo;
    private final UserProjectRepo userProjectRepo;
    private final GanttChartRepo ganttChartRepo;

    // 프로젝트 내 전체 간트차트 조회
    @Override
    public List<GanttChartResponse> getProjectGanttChart(Long projectId) {
        Project project = projectRepo.findById(projectId)
                .orElseThrow(() -> new NotFoundException(PROJECT_NOT_FOUND));

        List<GanttChart> responses = ganttChartRepo.findByProject(project);
        return responses.stream()
                .map(ganttChart -> GanttChartResponse.builder()
                        .id(ganttChart.getId())
                        .startTime(ganttChart.getStartTime())
                        .endTime(ganttChart.getEndTime())
                        .issueSummary(ganttChart.getIssueSummary())
                        .version(ganttChart.getVersion())
                        .issueCode(ganttChart.getIssueCode())
                        .userId(ganttChart.getUserId())
                        .build())
                .collect(Collectors.toList());
    }

    // 프로젝트 내 개별/공통 간트차트 조회
    @Override
    public List<GanttChartResponse> getProjectFilteredGanttChart(Long userId, Long projectId) {
        Project project = projectRepo.findById(projectId)
                .orElseThrow(() -> new NotFoundException(PROJECT_NOT_FOUND));

        List<GanttChart> responses;
        if (userId.equals(null)) {
            responses = ganttChartRepo.findByProjectAndUserIdIsNull(project);
        } else {
            responses = ganttChartRepo.findByProjectAndUserId(project, userId);
        }
        return responses.stream()
                .map(ganttChart -> GanttChartResponse.builder()
                        .id(ganttChart.getId())
                        .startTime(ganttChart.getStartTime())
                        .endTime(ganttChart.getEndTime())
                        .issueSummary(ganttChart.getIssueSummary())
                        .version(ganttChart.getVersion())
                        .issueCode(ganttChart.getIssueCode())
                        .projectId(projectId)
                        .userId(ganttChart.getUserId())
                        .build())
                .collect(Collectors.toList());
    }

    // 간트차트 내용 추가
    @Override
    @Transactional
    public void createGanttChart(Long userId, GanttChartCreateRequest request) {
        Project project = projectRepo.findById(request.getProjectId())
                .orElseThrow(() -> new NotFoundException(PROJECT_NOT_FOUND));

        UserProject userProjectManager = userProjectRepo.findByUserIdAndProjectId(userId, request.getProjectId())
                .orElseThrow(() -> new NotFoundException(USER_PROJECT_NOT_FOUND));

        if (userProjectManager.getRole().getModify() || userId.equals(request.getUserId())) {
            GanttChart ganttChart = GanttChart.builder()
                    .startTime(request.getStartTime())
                    .endTime(request.getEndTime())
                    .issueSummary(request.getIssueSummary())
                    .version(request.getVersion())
                    .issueCode(request.getIssueCode())
                    .project(project)
                    .userId(request.getUserId())
                    .build();
        } else {
            throw new NotAuthorizedException(CREATE_NOT_AUTHORIZED);
        }
    }

    // 간트차트 내용 수정
    @Override
    @Transactional
    public void updateGanttChart(Long userId, GanttChartUpdateRequest request) {
        GanttChart ganttChart = ganttChartRepo.findById(request.getId())
                .orElseThrow(() -> new NotFoundException(GANTT_CHART_NOT_FOUND));

        UserProject userProjectManager = userProjectRepo.findByUserIdAndProjectId(userId, ganttChart.getProject().getId())
                .orElseThrow(() -> new NotFoundException(USER_PROJECT_NOT_FOUND));

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
            ganttChartRepo.save(ganttChart);
        } else {
            new NotAuthorizedException(MODIFY_NOT_AUTHORIZED);
        }
    }

    // 간트차트 내용 삭제
    @Override
    @Transactional
    public void deleteGanttChart(Long userId, Long ganttChartId) {
        GanttChart ganttChart = ganttChartRepo.findById(ganttChartId)
                .orElseThrow(() -> new NotFoundException(GANTT_CHART_NOT_FOUND));

        UserProject userProjectManager = userProjectRepo.findByUserIdAndProjectId(userId, ganttChart.getProject().getId())
                .orElseThrow(() -> new NotFoundException(USER_PROJECT_NOT_FOUND));

        if (userProjectManager.getRole().getRemove() || userId.equals(ganttChart.getUserId())) {
            ganttChartRepo.delete(ganttChart);
        } else {
            new NotAuthorizedException(REMOVE_NOT_AUTHORIZED);
        }
    }
}
