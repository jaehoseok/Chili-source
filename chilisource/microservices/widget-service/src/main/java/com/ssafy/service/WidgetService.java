package com.ssafy.service;

import com.ssafy.dto.request.WidgetCreateRequest;
import com.ssafy.dto.request.WidgetLocUpdateRequest;
import com.ssafy.dto.request.WidgetUpdateRequest;
import com.ssafy.dto.response.WidgetResponse;
import com.ssafy.dto.response.WidgetUrlResponse;

import java.util.List;

public interface WidgetService {
    // 위젯 리스트 조회
    List<WidgetResponse> getWidgetList(Long projectId);

    // 위젯 주소 조회
    WidgetUrlResponse getWidgetUrl(Long projectId, String widgetCodeId);

    // 위젯 추가
    WidgetResponse createWidget(WidgetCreateRequest request, Long userId);

    // 위젯 수정
    WidgetResponse updateWidget(WidgetUpdateRequest request, Long widgetId, Long userId);

    // 위젯 순서 변경
    void updateLoc(List<WidgetLocUpdateRequest> requests, Long userId);

    // 위젯 삭제
    void deleteWidget(Long widgetId, Long userId);

    // 위젯 전체 삭제
    void deleteAllWidget(Long projectId);
}
