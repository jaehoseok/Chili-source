package com.ssafy.service;

import com.ssafy.dto.request.WidgetCodeCreateRequest;
import com.ssafy.dto.request.WidgetCodeUpdateRequest;
import com.ssafy.dto.response.WidgetCodeResponse;
import com.ssafy.entity.WidgetCode;
import com.ssafy.exception.DuplicateException;
import com.ssafy.exception.NotFoundException;
import com.ssafy.repository.WidgetCodeRepo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

import static com.ssafy.exception.DuplicateException.WIDGET_CODE_DUPLICATED;
import static com.ssafy.exception.NotFoundException.WIDGET_CODE_NOT_FOUND;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
@Slf4j
public class WidgetCodeServiceImpl implements WidgetCodeService {

    private final WidgetCodeRepo widgetCodeRepo;

    @Override
    public List<WidgetCodeResponse> getWidgetCodeList() {
        List<WidgetCodeResponse> responses = widgetCodeRepo.findAll().stream()
                .map(widgetCode -> WidgetCodeResponse.builder()
                        .id(widgetCode.getId())
                        .requestUrl(widgetCode.getRequestUrl())
                        .detailRequestUrl(widgetCode.getDetailRequestUrl())
                        .build())
                .collect(Collectors.toList());
        return responses;
    }

    @Override
    @Transactional
    public void createWidgetCode(WidgetCodeCreateRequest request) {
        if (widgetCodeRepo.findById(request.getId().toUpperCase()).isPresent()) {
            throw new DuplicateException(WIDGET_CODE_DUPLICATED);
        }
        WidgetCode widgetCode = WidgetCode.builder()
                .id(request.getId().toUpperCase())
                .requestUrl(request.getRequestUrl())
                .detailRequestUrl(request.getDetailRequestUrl())
                .build();
        widgetCodeRepo.save(widgetCode);
    }

    @Override
    @Transactional
    public void updateWidgetCode(WidgetCodeUpdateRequest request) {
        WidgetCode widgetCode = widgetCodeRepo.findById(request.getId().toUpperCase())
                .orElseThrow(() -> new NotFoundException(WIDGET_CODE_NOT_FOUND));
        if (widgetCodeRepo.findById(request.getId().toUpperCase()).isPresent()) {
            throw new DuplicateException(WIDGET_CODE_DUPLICATED);
        }
        widgetCode.update(request.getId().toUpperCase(), request.getRequestUrl(), request.getDetailRequestUrl());
    }

    @Override
    @Transactional
    public void deleteWidgetCode(String widgetCodeId) {
        WidgetCode widgetCode = widgetCodeRepo.findById(widgetCodeId.toUpperCase())
                .orElseThrow(() -> new NotFoundException(WIDGET_CODE_NOT_FOUND));
        widgetCodeRepo.delete(widgetCode);
    }
}
