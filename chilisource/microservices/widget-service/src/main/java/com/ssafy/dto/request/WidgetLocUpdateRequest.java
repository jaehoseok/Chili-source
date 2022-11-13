package com.ssafy.dto.request;

import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class WidgetLocUpdateRequest {
    @ApiModelProperty(value = "위젯 pk")
    private Long id;

    @ApiModelProperty(value = "위젯 위치(행)")
    private Long widgetRow;

    @ApiModelProperty(value = "위젯 위치(열)")
    private Long widgetCol;
}
