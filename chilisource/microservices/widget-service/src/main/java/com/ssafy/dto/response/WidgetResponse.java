package com.ssafy.dto.response;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class WidgetResponse {
    private Long id;

    private String name;

    private String widgetCode;

    private String requestUrl;

    private String detailRequestUrl;

    @Builder
    public WidgetResponse(Long id, String name, String widgetCode, String requestUrl, String detailRequestUrl) {
        this.id = id;
        this.name = name;
        this.widgetCode = widgetCode;
        this.requestUrl = requestUrl;
        this.detailRequestUrl = detailRequestUrl;
    }
}
