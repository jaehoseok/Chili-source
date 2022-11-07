package com.ssafy.service;

import com.ssafy.dto.request.WidgetCreateRequest;
import com.ssafy.dto.request.WidgetLocUpdateRequest;
import com.ssafy.dto.request.WidgetUpdateRequest;
import com.ssafy.dto.response.WidgetResponse;
import com.ssafy.entity.Widget;
import com.ssafy.entity.WidgetCode;
import com.ssafy.exception.DuplicateException;
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
import static com.ssafy.exception.NotFoundException.WIDGET_CODE_NOT_FOUND;
import static com.ssafy.exception.NotFoundException.WIDGET_NOT_FOUND;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
@Slf4j
public class WidgetServiceImpl implements WidgetService {
    private final WidgetRepo widgetRepo;
    private final WidgetCodeRepo widgetCodeRepo;

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
    public WidgetResponse createWidget(WidgetCreateRequest request) {
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
    public WidgetResponse updateWidget(WidgetUpdateRequest request, Long widgetId) {
        Widget widget = widgetRepo.findById(widgetId)
                .orElseThrow(() -> {
                    log.error("[Widget] [updateWidget] widget is not found");
                    return new NotFoundException(WIDGET_NOT_FOUND);
                });
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
    public void updateLoc(List<WidgetLocUpdateRequest> requests) {
        requests.forEach(request -> {
            Widget widget = widgetRepo.findById(request.getId())
                    .orElseThrow(() -> {
                        log.error("[Widget] [updateLoc] widget is not found");
                        return new NotFoundException(WIDGET_NOT_FOUND);
                    });
            widget.locUpdate(request.getWidgetRow(), request.getWidgetCol());
        });
    }

    @Override
    @Transactional
    public void deleteWidget(Long widgetId) {
        Widget widget = widgetRepo.findById(widgetId)
                .orElseThrow(() -> {
                    log.error("[Widget] [deleteWidget] widget is not found");
                    return new NotFoundException(WIDGET_NOT_FOUND);
                });
        widgetRepo.delete(widget);
    }

    @Override
    @Transactional
    public void deleteAllWidget(Long projectId) {
        widgetRepo.deleteAll(widgetRepo.findByProjectId(projectId));
    }
}
