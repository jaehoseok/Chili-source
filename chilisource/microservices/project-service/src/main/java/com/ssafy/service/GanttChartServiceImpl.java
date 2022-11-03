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
import org.springframework.data.domain.Sort;
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
    private final Sort ganttSort = Sort.by("version").and(Sort.by("startTime"));

    @Override
    public List<GanttChartResponse> getProjectGanttChartAllLatest(Long projectId) {
        Project project = projectRepo.findById(projectId)
                .orElseThrow(() -> new NotFoundException(PROJECT_NOT_FOUND));

        return getProjectGanttChartByVersion(projectId, project.getLatestGanttVersion());
    }

    @Override
    public List<GanttChartResponse> getProjectGanttChartEachLatest(Long userId, Long projectId) {
        Project project = projectRepo.findById(projectId)
                .orElseThrow(() -> new NotFoundException(PROJECT_NOT_FOUND));

        return getProjectGanttChartByVersionEach(userId, projectId, project.getLatestGanttVersion());
    }

    @Override
    public List<GanttChartResponse> getProjectGanttChartByVersion(Long projectId, Long version) {
        Project project = projectRepo.findById(projectId)
                .orElseThrow(() -> new NotFoundException(PROJECT_NOT_FOUND));

        List<GanttChart> responses = ganttChartRepo.findByProjectAndVersion(project, version, ganttSort);
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
    public List<GanttChartResponse> getProjectGanttChartByVersionEach(Long userId, Long projectId, Long version) {
        Project project = projectRepo.findById(projectId)
                .orElseThrow(() -> new NotFoundException(PROJECT_NOT_FOUND));

        List<GanttChart> responses;
        if (userId.equals(null)) {
            responses = ganttChartRepo.findByProjectAndUserIdIsNullAndVersion(project, version, ganttSort);
        } else {
            responses = ganttChartRepo.findByProjectAndUserIdAndVersion(project, userId, version, ganttSort);
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
                    .progress(request.getProgress())
                    .project(project)
                    .userId(request.getUserId())
                    .build();
            ganttChartRepo.save(ganttChart);
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
