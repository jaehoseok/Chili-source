package com.ssafy.dto.response;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class WidgetResponse {
    private Long id;

    private String name;

    private Integer row;

    private Integer col;

    private String widgetCode;

    private String requestUrl;

    private String detailRequestUrl;

    @Builder
    public WidgetResponse(Long id, String name, Integer row, Integer col, String widgetCode, String requestUrl, String detailRequestUrl) {
        this.id = id;
        this.name = name;
        this.row = row;
        this.col = col;
        this.widgetCode = widgetCode;
        this.requestUrl = requestUrl;
        this.detailRequestUrl = detailRequestUrl;
    }
}
