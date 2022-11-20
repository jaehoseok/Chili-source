package com.ssafy.dto.request;

import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class WidgetUpdateRequest {
    @ApiModelProperty(value = "위젯 이름")
    private String name;

    @ApiModelProperty(value = "위젯 주소")
    private String url;

    @Builder
    public WidgetUpdateRequest(String name){
        this.name = name;
        this.url = url;
    }
}
