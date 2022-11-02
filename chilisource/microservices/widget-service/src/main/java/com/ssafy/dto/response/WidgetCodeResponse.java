package com.ssafy.dto.response;

import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class WidgetCodeResponse {
    @ApiModelProperty(value = "위젯 코드 pk")
    private String id;

    @ApiModelProperty(value = "위젯 정보 조회 주소")
    private String requestUrl;

    @ApiModelProperty(value = "위젯 상세 정보 조회 주소")
    private String detailRequestUrl;

    @Builder
    public WidgetCodeResponse(String id, String requestUrl, String detailRequestUrl){
        this.id = id;
        this.requestUrl = requestUrl;
        this.detailRequestUrl = detailRequestUrl;
    }
}
