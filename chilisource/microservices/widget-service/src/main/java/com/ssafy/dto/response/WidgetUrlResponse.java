package com.ssafy.dto.response;

import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class WidgetUrlResponse {
    @ApiModelProperty(value = "위젯 이름")
    private String name;

    @ApiModelProperty(value = "위젯 주소")
    private String url;

    @Builder
    public WidgetUrlResponse(String name, String url) {
        this.name = name;
        this.url = url;
    }
}
