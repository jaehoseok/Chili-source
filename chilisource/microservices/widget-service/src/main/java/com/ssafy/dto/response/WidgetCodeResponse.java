package com.ssafy.dto.response;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class WidgetCodeResponse {
    private String id;

    private String requestUrl;

    private String detailRequestUrl;

    @Builder
    public WidgetCodeResponse(String id, String requestUrl, String detailRequestUrl){
        this.id = id;
        this.requestUrl = requestUrl;
        this.detailRequestUrl = detailRequestUrl;
    }
}
