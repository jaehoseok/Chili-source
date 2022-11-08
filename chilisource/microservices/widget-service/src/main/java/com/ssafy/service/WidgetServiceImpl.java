package com.ssafy.service;

import com.ssafy.client.ProjectServiceClient;
import com.ssafy.dto.request.WidgetCreateRequest;
import com.ssafy.dto.request.WidgetLocUpdateRequest;
import com.ssafy.dto.request.WidgetUpdateRequest;
import com.ssafy.dto.response.UserProjectResponse;
import com.ssafy.dto.response.WidgetResponse;
import com.ssafy.entity.Widget;
import com.ssafy.entity.WidgetCode;
import com.ssafy.exception.DuplicateException;
import com.ssafy.exception.InternalServerErrorException;
import com.ssafy.exception.NotAuthorizedException;
import com.ssafy.exception.NotFoundException;
import com.ssafy.repository.WidgetCodeRepo;
import com.ssafy.repository.WidgetRepo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

import static com.ssafy.exception.DuplicateException.WIDGET_DUPLICATED;
import static com.ssafy.exception.InternalServerErrorException.PROJECT_COMMUNICATION_ERROR;
import static com.ssafy.exception.NotAuthorizedException.CREATE_NOT_AUTHORIZED;
import static com.ssafy.exception.NotAuthorizedException.MODIFY_NOT_AUTHORIZED;
import static com.ssafy.exception.NotFoundException.*;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
@Slf4j
public class WidgetServiceImpl implements WidgetService {
    private final WidgetRepo widgetRepo;
    private final WidgetCodeRepo widgetCodeRepo;
    private final ProjectServiceClient projectServiceClient;

    @Override
    @Transactional
    public List<WidgetResponse> getWidgetList(Long projectId) {
        // TODO : 권한 체크 feign 요청 후 해야함
        List<WidgetResponse> responses = widgetRepo.findByProjectId(projectId).stream()
                .map(widget -> {
                    return WidgetResponse.builder()
                            .id(widget.getId())
                            .widgetRow(widget.getWidgetRow())
                            .widgetCol(widget.getWidgetCol())
                            .widgetCode(widget.getWidgetCode().getId())
                            .requestUrl(widget.getWidgetCode().getRequestUrl())
                            .detailRequestUrl(widget.getWidgetCode().getDetailRequestUrl())
                            .build();
                })
                .collect(Collectors.toList());
        return responses;
    }

    @Override
    @Transactional
    public WidgetResponse createWidget(WidgetCreateRequest request, Long userId) {
        try {
            UserProjectResponse userProjectResponse = projectServiceClient.findRole(request.getProjectId(), userId);
            if(!"MASTER".equals(userProjectResponse.getRole().getId())){
                log.error("[Widget] [createWidget] USER_PROJECT_NOT_FOUND");
                throw new NotAuthorizedException(CREATE_NOT_AUTHORIZED);
            }
        }catch (NotFoundException e) {
            log.error("[Widget] [createWidget] USER_PROJECT_NOT_FOUND");
            throw new NotFoundException(USER_PROJECT_NOT_FOUND);
        }catch (Exception e){
            log.error("[Widget] [createWidget] PROJECT_COMMUNICATION_ERROR");
            throw new InternalServerErrorException(PROJECT_COMMUNICATION_ERROR);
        }
        WidgetCode widgetCode = widgetCodeRepo.findById(request.getWidgetCodeId())
                .orElseThrow(() -> {
                    log.error("[Widget] [createWidget] widget code is not found");
                    return new NotFoundException(WIDGET_CODE_NOT_FOUND);
                });
        if (widgetRepo.findByProjectIdAndWidgetCode(request.getProjectId(), widgetCode).isPresent()) {
            log.error("[Widget] [createWidget] widget is duplicated");
            throw new DuplicateException(WIDGET_DUPLICATED);
        }
        Widget widget = Widget.builder()
                .name(request.getName())
                .widgetRow(request.getWidgetRow())
                .widgetCol(request.getWidgetCol())
                .projectId(request.getProjectId())
                .widgetCode(widgetCode)
                .build();
        widgetRepo.save(widget);
        return WidgetResponse.builder()
                .id(widget.getId())
                .name(widget.getName())
                .widgetRow(widget.getWidgetRow())
                .widgetCol(widget.getWidgetCol())
                .widgetCode(widgetCode.getId())
                .requestUrl(widgetCode.getRequestUrl())
                .detailRequestUrl(widgetCode.getDetailRequestUrl())
                .build();
    }

    @Override
    @Transactional
    public WidgetResponse updateWidget(WidgetUpdateRequest request, Long widgetId, Long userId) {
        Widget widget = widgetRepo.findById(widgetId)
                .orElseThrow(() -> {
                    log.error("[Widget] [updateWidget] widget is not found");
                    return new NotFoundException(WIDGET_NOT_FOUND);
                });
        try {
            UserProjectResponse userProjectResponse = projectServiceClient.findRole(widget.getProjectId(), userId);
            if(!"MASTER".equals(userProjectResponse.getRole().getId())){
                log.error("[Widget] [updateWidget] USER_PROJECT_NOT_FOUND");
                throw new NotAuthorizedException(MODIFY_NOT_AUTHORIZED);
            }
        }catch (NotFoundException e) {
            log.error("[Widget] [updateWidget] USER_PROJECT_NOT_FOUND");
            throw new NotFoundException(USER_PROJECT_NOT_FOUND);
        }catch (Exception e){
            log.error("[Widget] [updateWidget] PROJECT_COMMUNICATION_ERROR");
            throw new InternalServerErrorException(PROJECT_COMMUNICATION_ERROR);
        }
        widget.update(request.getName());
        return WidgetResponse.builder()
                .id(widget.getId())
                .name(widget.getName())
                .widgetRow(widget.getWidgetRow())
                .widgetCol(widget.getWidgetCol())
                .widgetCode(widget.getWidgetCode().getId())
                .requestUrl(widget.getWidgetCode().getRequestUrl())
                .detailRequestUrl(widget.getWidgetCode().getDetailRequestUrl())
                .build();
    }

    @Override
    @Transactional
    public void updateLoc(List<WidgetLocUpdateRequest> requests, Long userId) {
        requests.forEach(request -> {
            Widget widget = widgetRepo.findById(request.getId())
                    .orElseThrow(() -> {
                        log.error("[Widget] [updateLoc] widget is not found");
                        return new NotFoundException(WIDGET_NOT_FOUND);
                    });
            try {
                UserProjectResponse userProjectResponse = projectServiceClient.findRole(widget.getProjectId(), userId);
                if(!"MASTER".equals(userProjectResponse.getRole().getId())){
                    log.error("[Widget] [updateWidget] USER_PROJECT_NOT_FOUND");
                    throw new NotAuthorizedException(MODIFY_NOT_AUTHORIZED);
                }
            }catch (NotFoundException e) {
                log.error("[Widget] [updateWidget] USER_PROJECT_NOT_FOUND");
                throw new NotFoundException(USER_PROJECT_NOT_FOUND);
            }catch (Exception e){
                log.error("[Widget] [updateWidget] PROJECT_COMMUNICATION_ERROR");
                throw new InternalServerErrorException(PROJECT_COMMUNICATION_ERROR);
            }
            widget.locUpdate(request.getWidgetRow(), request.getWidgetCol());
        });
    }

    @Override
    @Transactional
    public void deleteWidget(Long widgetId, Long userId) {
        Widget widget = widgetRepo.findById(widgetId)
                .orElseThrow(() -> {
                    log.error("[Widget] [deleteWidget] widget is not found");
                    return new NotFoundException(WIDGET_NOT_FOUND);
                });
        try {
            UserProjectResponse userProjectResponse = projectServiceClient.findRole(widget.getProjectId(), userId);
            if(!"MASTER".equals(userProjectResponse.getRole().getId())){
                log.error("[Widget] [updateWidget] USER_PROJECT_NOT_FOUND");
                throw new NotAuthorizedException(MODIFY_NOT_AUTHORIZED);
            }
        }catch (NotFoundException e) {
            log.error("[Widget] [updateWidget] USER_PROJECT_NOT_FOUND");
            throw new NotFoundException(USER_PROJECT_NOT_FOUND);
        }catch (Exception e){
            log.error("[Widget] [updateWidget] PROJECT_COMMUNICATION_ERROR");
            throw new InternalServerErrorException(PROJECT_COMMUNICATION_ERROR);
        }
        widgetRepo.delete(widget);
    }

    @Override
    @Transactional
    public void deleteAllWidget(Long projectId) {
        widgetRepo.deleteAll(widgetRepo.findByProjectId(projectId));
    }
}
