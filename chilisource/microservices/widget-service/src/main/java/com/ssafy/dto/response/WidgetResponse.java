package com.ssafy.dto.response;

import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class WidgetResponse {
    @ApiModelProperty(value = "위젯 pk")
    private Long id;

    @ApiModelProperty(value = "위젯 이름")
    private String name;

    @ApiModelProperty(value = "위젯 위치(행)")
    private Integer row;

    @ApiModelProperty(value = "위젯 위치(열)")
    private Integer col;

    @ApiModelProperty(value = "위젯 코드 pk")
    private String widgetCode;

    @ApiModelProperty(value = "위젯 정보 조회 주소")
    private String requestUrl;

    @ApiModelProperty(value = "위젯 상세 정보 조회 주소")
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
