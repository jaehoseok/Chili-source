package com.ssafy.service;

import com.ssafy.dto.request.WidgetCodeCreateRequest;
import com.ssafy.dto.request.WidgetCodeUpdateRequest;
import com.ssafy.dto.response.WidgetCodeResponse;

import java.util.List;

public interface WidgetCodeService {
    // 위젯 코드 조회
    List<WidgetCodeResponse> getWidgetCodeList();

    // 위젯 코드 추가
    void createWidgetCode(WidgetCodeCreateRequest request);

    // 위젯 코드 수정
    void updateWidgetCode(WidgetCodeUpdateRequest request);

    // 위젯 코드 삭제
    void deleteWidgetCode(String widgetCodeId);
}
