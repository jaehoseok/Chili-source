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

    @Builder
    public WidgetUpdateRequest(String name, Integer row, Integer col){
        this.name = name;
    }
}
