package com.ssafy.dto.request;

import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class WidgetCreateRequest {
    @ApiModelProperty(value = "위젯 이름")
    private String name;

    @ApiModelProperty(value = "위젯 주소")
    private String url;

    @ApiModelProperty(value = "위젯 위치(행)")
    private Long widgetRow;

    @ApiModelProperty(value = "위젯 위치(열)")
    private Long widgetCol;

    @ApiModelProperty(value = "프로젝트 pk")
    private Long projectId;

    @ApiModelProperty(value = "위젯 코드 pk")
    private String widgetCodeId;
}
